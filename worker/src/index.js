// 日本周辺を飛行中の航空機と、旅客船の位置を返す Cloudflare Worker。
// 航空機: adsb.lol から集め、国内線・国際線を判定する。
// 旅客船: ships.js の Durable Object が aisstream.io の AIS データを集める。GET /ships -> { now, connected, ships: [...] }
// GET /aircraft -> { now, ac: [[hex, callsign, lat, lon, 高度ft, 対地速度kt, 針路, 機種, 登録記号, 国際線=1/国内線=0, 位置の古さ秒, 出発, 到着, 到着地の緯度, 経度, 便名(NH1098 など)]] }
//
// 無料枠に収めるため:
// - 結果は 30 秒キャッシュし、上流へのアクセスは 30 秒に 1 回にする
// - 1 回の実行の外部リクエストは 50 件まで
//   （取得 12 + やり直し 12 + 経路照会 16 + キャッシュの読み書き 最大 6 = 46 件）

const CACHE_SECONDS = 30;
const ROUTE_LOOKUPS_PER_RUN = 16;
const ROUTE_CACHE_URL = 'https://cache.internal/routes-v3';
// 直近にうまく取れた航空機の結果（上流が不調なときに使う）
const LAST_GOOD_URL = 'https://cache.internal/aircraft-last-good';

// 半径 250 海里の円で、沖縄から北海道まで・伊豆小笠原と周辺の空域を覆う
const CIRCLES = [
  [25.0, 124.5], [27.5, 128.5], [31.5, 130.5], [35.0, 131.0], [34.0, 135.0], [36.0, 138.5],
  [39.5, 141.0], [43.5, 143.0], [40.0, 137.0], [36.5, 144.0], [31.0, 140.5], [26.5, 142.5],
];
// 日本の排他的経済水域を囲む範囲（細かい判定はフロントエンドで行う）
const BBOX = { w: 122, s: 17, e: 158, n: 48 };

// 国内線だけの会社 / 国際線だけの会社 / 両方飛ぶ会社（経路を照会する）
const DOMESTIC = new Set(['ADO', 'SNJ', 'SFJ', 'IBX', 'FDA', 'JTA', 'RAC', 'JAC', 'NTH', 'ORC', 'AHX', 'JLJ', 'AKX', 'TOK', 'SKY']);
const INTERNATIONAL_JP = new Set(['TZP', 'NCA']);
const MIXED_JP = new Set(['JAL', 'ANA', 'APJ', 'JJP']);

const json = (body, status = 200, extra = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*', ...extra },
  });

export { ShipTracker } from './ships.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname !== '/aircraft' && url.pathname !== '/ships') return json({ error: 'not found' }, 404);

    const cache = caches.default;
    const key = new Request(`${url.origin}${url.pathname}`);
    const hit = await cache.match(key);
    if (hit) return hit;

    let maxAge = CACHE_SECONDS;
    let body;
    if (url.pathname === '/aircraft') {
      body = await collect(cache, ctx);
      if (body) {
        ctx.waitUntil(cache.put(LAST_GOOD_URL, json(body, 200, { 'cache-control': 'public, max-age=300' })));
      } else {
        // 上流の取得が半分以上失敗したときは、直近にうまく取れた結果を返す（すぐ取り直せるよう短くキャッシュ）
        body = (await cache.match(LAST_GOOD_URL).then((r) => r?.json()).catch(() => null)) ?? { now: Date.now(), ac: [] };
        maxAge = 10;
      }
    } else {
      // 旅客船は Durable Object が AIS に接続して集めている
      body = await env.SHIPS.get(env.SHIPS.idFromName('japan')).fetch(request).then((r) => r.json());
    }
    const res = json(body, 200, { 'cache-control': `public, max-age=${maxAge}` });
    ctx.waitUntil(cache.put(key, res.clone()));
    return res;
  },
};

// 失敗したら 1 回だけやり直す。失敗なら null
async function fetchCircle(lat, lon, retry = true) {
  try {
    const r = await fetch(`https://api.adsb.lol/v2/lat/${lat}/lon/${lon}/dist/250`, {
      headers: { 'user-agent': 'ShinkansenLocation (github.com/fuuchan-lab/ShinkansenLocation)' },
    });
    if (!r.ok) throw new Error(String(r.status));
    return (await r.json()).ac ?? [];
  } catch {
    return retry ? fetchCircle(lat, lon, false) : null;
  }
}

/** 同時に limit 件までに抑えて順に実行する（上流に一度に大量に送らない） */
async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: limit }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await fn(items[i]);
      }
    }),
  );
  return out;
}

/** 半分以上の円で取得に失敗したら null */
async function collect(cache, ctx) {
  const lists = await mapLimit(CIRCLES, 4, ([lat, lon]) => fetchCircle(lat, lon));
  if (lists.filter((l) => l === null).length > CIRCLES.length / 2) return null;

  const byHex = new Map();
  for (const a of lists.flat().filter(Boolean)) {
    if (a.lat == null || a.lon == null || a.alt_baro === 'ground') continue;
    if (a.lon < BBOX.w || a.lon > BBOX.e || a.lat < BBOX.s || a.lat > BBOX.n) continue;
    if ((a.seen_pos ?? 0) > 60) continue;
    const prev = byHex.get(a.hex);
    if (!prev || (a.seen_pos ?? 0) < (prev.seen_pos ?? 0)) byHex.set(a.hex, a);
  }

  // 経路のキャッシュ（コールサイン -> [出発IATA, 到着IATA, 国際線?, 到着地の緯度, 経度, 便名] / null=不明）
  const routes = (await cache.match(ROUTE_CACHE_URL).then((r) => (r ? r.json() : {})).catch(() => ({})));
  const pending = [];
  for (const a of byHex.values()) {
    const cs = (a.flight ?? '').trim();
    if (MIXED_JP.has(cs.slice(0, 3)) && !(cs in routes) && !pending.includes(cs)) pending.push(cs);
  }
  const looked = await Promise.all(
    pending.slice(0, ROUTE_LOOKUPS_PER_RUN).map((cs) =>
      fetch(`https://api.adsbdb.com/v0/callsign/${encodeURIComponent(cs)}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          const f = d?.response?.flightroute;
          if (!f?.origin || !f?.destination) return [cs, null];
          const intl = f.origin.country_iso_name !== 'JP' || f.destination.country_iso_name !== 'JP';
          return [cs, [
            f.origin.iata_code, f.destination.iata_code, intl ? 1 : 0,
            round(f.destination.latitude, 3), round(f.destination.longitude, 3), f.callsign_iata ?? '',
          ]];
        })
        .catch(() => [cs, undefined]),
    ),
  );
  let changed = false;
  for (const [cs, r] of looked) {
    if (r === undefined) continue; // 通信エラーは次回やり直す
    routes[cs] = r;
    changed = true;
  }
  if (changed) {
    ctx.waitUntil(cache.put(ROUTE_CACHE_URL, new Response(JSON.stringify(routes), { headers: { 'cache-control': 'public, max-age=43200' } })));
  }

  const ac = [...byHex.values()].map((a) => {
    const cs = (a.flight ?? '').trim();
    const route = routes[cs];
    return [
      a.hex, cs, round(a.lat, 4), round(a.lon, 4),
      typeof a.alt_baro === 'number' ? a.alt_baro : a.alt_geom ?? null,
      a.gs ?? null, a.track ?? a.true_heading ?? null, a.t ?? '', a.r ?? '',
      route ? route[2] : classify(cs, a.r ?? ''),
      round(a.seen_pos ?? 0, 1), route?.[0] ?? '', route?.[1] ?? '', route?.[3] ?? null, route?.[4] ?? null, route?.[5] ?? '',
    ];
  });
  return { now: Date.now(), ac };
}

/** 経路がわからないときの判定: 国際線=1 / 国内線=0 */
function classify(callsign, reg) {
  const m = /^([A-Z]{3})\d/.exec(callsign);
  if (m) {
    const op = m[1];
    if (DOMESTIC.has(op) || MIXED_JP.has(op)) return 0;
    if (INTERNATIONAL_JP.has(op)) return 1;
    return 1; // 外国の航空会社は国内の区間を運航できない
  }
  // 航空会社以外（自家用・官公庁など）は登録国で判定
  return reg.startsWith('JA') ? 0 : 1;
}

const round = (x, d) => (x == null ? null : Math.round(x * 10 ** d) / 10 ** d);
