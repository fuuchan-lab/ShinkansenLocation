// 日本周辺を飛行中の航空機と、旅客船の位置を返す Cloudflare Worker。
// 航空機: adsb.lol から集め、国内線・国際線を判定する。
// 旅客船: ships.js の Durable Object が aisstream.io の AIS データを集める。GET /ships -> { now, connected, ships: [...] }
// GET /aircraft -> { now, ac: [[hex, callsign, lat, lon, 高度ft, 対地速度kt, 針路, 機種, 登録記号, 国際線=1/国内線=0, 位置の古さ秒, 出発, 到着, 到着地の緯度, 経度, 便名(NH1098 など)]] }
// GET /vessels?bbox=南,西,北,東 -> { now, connected, ships: [...] }: 海ログ（OceanLog）用。範囲内のすべての船（行の形は /ships と同じ。0.1 度単位、1 度四方まで）
// GET /airport?code=HND -> { now, usual: { dep, arr }, official: { dep, arr } | null }
//   usual: 飛行中の便の観測から作った、ふだんの離陸・着陸の時刻（flights.js。全社の便）
//   official: 公共交通オープンデータセンターの JAL・ANA の発着情報（secret の ODPT_KEY があるときだけ）
// 2 分ごとの定期実行（wrangler.toml の crons）で飛行機を集め、便の観測を Durable Object に渡す（誰も見ていなくても覚えるため）
//
// 無料枠に収めるため:
// - 結果は 30 秒キャッシュし、上流へのアクセスは 30 秒に 1 回にする（定期実行は 2 分に 1 回）
// - 1 回の実行の外部リクエストは 50 件まで
//   （取得 12 + やり直し 12 + 経路照会 16 + キャッシュの読み書き 最大 6 + Durable Object 1 = 47 件）

const CACHE_SECONDS = 30;
const AIRPORT_CACHE_SECONDS = 300;
const ROUTE_LOOKUPS_PER_RUN = 16;
const ROUTE_CACHE_URL = 'https://cache.internal/routes-v4';
const ODPT_API = 'https://api.odpt.org/api/v4';
// 直近にうまく取れた航空機の結果（上流が不調なときに使う）
const LAST_GOOD_URL = 'https://cache.internal/aircraft-last-good';

// 半径 250 海里の円で、沖縄から北海道まで・伊豆小笠原と周辺の空域を覆う
const CIRCLES = [
  [25.0, 124.5], [27.5, 128.5], [31.5, 130.5], [35.0, 131.0], [34.0, 135.0], [36.0, 138.5],
  [39.5, 141.0], [43.5, 143.0], [40.0, 137.0], [36.5, 144.0], [31.0, 140.5], [26.5, 142.5],
];
// 日本の排他的経済水域を囲む範囲（細かい判定はフロントエンドで行う）
const BBOX = { w: 122, s: 17, e: 158, n: 48 };

// 国内線だけの会社 / 国際線だけの会社 / 両方飛ぶ会社（経路の照会を優先する）。経路が分からない便の判定に使う
const DOMESTIC = new Set(['ADO', 'SNJ', 'SFJ', 'IBX', 'FDA', 'JTA', 'RAC', 'JAC', 'NTH', 'ORC', 'AHX', 'JLJ', 'AKX', 'TOK', 'SKY']);
const INTERNATIONAL_JP = new Set(['TZP', 'NCA']);
const MIXED_JP = new Set(['JAL', 'ANA', 'APJ', 'JJP']);
// 航空会社の便のコールサイン（3文字の会社コード＋便の番号）
const AIRLINE_FLIGHT = /^[A-Z]{3}\d/;

const json = (body, status = 200, extra = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*', ...extra },
  });

export { ShipTracker } from './ships.js';
import { parseBox } from './ships.js';

const PATHS = new Set(['/aircraft', '/ships', '/vessels', '/airport']);

const tracker = (env) => env.SHIPS.get(env.SHIPS.idFromName('japan'));

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (!PATHS.has(url.pathname)) return json({ error: 'not found' }, 404);
    const code = url.searchParams.get('code') ?? '';
    if (url.pathname === '/airport' && !/^[A-Z]{3}$/.test(code)) return json({ error: 'bad code' }, 400);
    const bbox = url.searchParams.get('bbox') ?? '';
    if (url.pathname === '/vessels' && !parseBox(bbox)) return json({ error: 'bad bbox' }, 400);

    const cache = caches.default;
    const query = url.pathname === '/airport' ? `?code=${code}` : url.pathname === '/vessels' ? `?bbox=${bbox}` : '';
    const key = new Request(`${url.origin}${url.pathname}${query}`);
    const hit = await cache.match(key);
    if (hit) return hit;

    let maxAge = CACHE_SECONDS;
    let body;
    if (url.pathname === '/airport') {
      const [usual, official] = await Promise.all([
        tracker(env).fetch(`https://tracker/airport?code=${code}`).then((r) => r.json()),
        env.ODPT_KEY ? fetchOfficial(code, env.ODPT_KEY) : null,
      ]);
      body = { now: Date.now(), usual, official };
      maxAge = AIRPORT_CACHE_SECONDS;
    } else if (url.pathname === '/aircraft') {
      body = (await collect(cache, ctx))?.body;
      if (body) {
        ctx.waitUntil(cache.put(LAST_GOOD_URL, json(body, 200, { 'cache-control': 'public, max-age=300' })));
      } else {
        // 上流の取得が半分以上失敗したときは、直近にうまく取れた結果を返す（すぐ取り直せるよう短くキャッシュ）
        body = (await cache.match(LAST_GOOD_URL).then((r) => r?.json()).catch(() => null)) ?? { now: Date.now(), ac: [] };
        maxAge = 10;
      }
    } else {
      // 旅客船・海ログの船は Durable Object が AIS に接続して集めている
      body = await tracker(env).fetch(request).then((r) => r.json());
    }
    const res = json(body, 200, { 'cache-control': `public, max-age=${maxAge}` });
    ctx.waitUntil(cache.put(key, res.clone()));
    return res;
  },

  /** 定期実行: 飛行機を集め、便の観測を Durable Object に渡す（空港の発着のふだんの時刻を作るため） */
  async scheduled(event, env, ctx) {
    const cache = caches.default;
    const got = await collect(cache, ctx);
    if (!got) return;
    ctx.waitUntil(cache.put(LAST_GOOD_URL, json(got.body, 200, { 'cache-control': 'public, max-age=300' })));
    await tracker(env).fetch('https://tracker/flights/observe', { method: 'POST', body: JSON.stringify({ now: got.body.now, obs: got.obs }) });
  },
};

/**
 * 公共交通オープンデータセンターの JAL・ANA の発着情報（出発・到着）。取れなければ null。
 * 各行: { n: 便名の一覧, s: 状態, t: 定刻 "HH:MM", e: 見込み, a: 実績, o: 相手の空港, g: ゲート, m: ターミナル }
 */
async function fetchOfficial(code, key) {
  const ap = `odpt.Airport:${code}`;
  const tail = (v) => (typeof v === 'string' ? v.slice(v.lastIndexOf(':') + 1) : '');
  const first = (v) => (Array.isArray(v) ? v[0] : v);
  const get = async (type, field) => {
    const r = await fetch(`${ODPT_API}/odpt:${type}?odpt:${field}=${ap}&acl:consumerKey=${encodeURIComponent(key)}`);
    if (!r.ok) throw new Error(`odpt ${r.status}`);
    // 絞り込みが効かなくても、その空港の便だけにする
    return ((await r.json()) ?? []).filter((x) => x[`odpt:${field}`] === ap);
  };
  try {
    const [dep, arr] = await Promise.all([get('FlightInformationDeparture', 'departureAirport'), get('FlightInformationArrival', 'arrivalAirport')]);
    const row = (x, kind) => ({
      n: [x['odpt:flightNumber'] ?? []].flat(),
      s: tail(x['odpt:flightStatus']),
      t: x[`odpt:scheduled${kind}Time`] ?? '',
      e: x[`odpt:estimated${kind}Time`] ?? '',
      a: x[`odpt:actual${kind}Time`] ?? '',
      o: tail(first(kind === 'Departure' ? x['odpt:destinationAirport'] : x['odpt:originAirport'])),
      g: x[`odpt:${kind.toLowerCase()}Gate`] ?? '',
      m: x[`odpt:${kind.toLowerCase()}AirportTerminal`] ? tail(x[`odpt:${kind.toLowerCase()}AirportTerminal`]) : '',
    });
    return { dep: dep.map((x) => row(x, 'Departure')), arr: arr.map((x) => row(x, 'Arrival')) };
  } catch {
    return null;
  }
}

// 失敗したら 1 回だけやり直す。失敗なら null
async function fetchCircle(lat, lon, retry = true) {
  try {
    const r = await fetch(`https://api.adsb.lol/v2/lat/${lat}/lon/${lon}/dist/250`, {
      headers: { 'user-agent': 'NorimonoRadar (github.com/fuuchan-lab/norimono-radar)' },
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

/**
 * 半分以上の円で取得に失敗したら null。
 * obs: 経路の分かった便の観測 [コールサイン, 便名, 出発, 到着, 国際線=1, 緯度, 経度, 高度ft, 対地速度kt, 出発地の緯度, 経度, 到着地の緯度, 経度]
 */
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

  // 経路のキャッシュ（コールサイン -> [出発IATA, 到着IATA, 国際線?, 到着地の緯度, 経度, 便名, 出発地の緯度, 経度] / null=不明）
  const routes = (await cache.match(ROUTE_CACHE_URL).then((r) => (r ? r.json() : {})).catch(() => ({})));
  const pending = [];
  // 空港の発着一覧に出すため、航空会社の便はすべて経路を調べる（国内線・国際線の両方を飛ぶ会社を優先）
  for (const a of byHex.values()) {
    const cs = (a.flight ?? '').trim();
    if (AIRLINE_FLIGHT.test(cs) && !(cs in routes) && !pending.includes(cs)) pending.push(cs);
  }
  pending.sort((x, y) => Number(MIXED_JP.has(y.slice(0, 3))) - Number(MIXED_JP.has(x.slice(0, 3))));
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
            round(f.origin.latitude, 3), round(f.origin.longitude, 3),
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
  const obs = [];
  for (const a of byHex.values()) {
    const cs = (a.flight ?? '').trim();
    const route = routes[cs];
    if (!route || typeof a.alt_baro !== 'number') continue;
    obs.push([cs, route[5], route[0], route[1], route[2], a.lat, a.lon, a.alt_baro, a.gs ?? null, route[6] ?? null, route[7] ?? null, route[3], route[4]]);
  }
  return { body: { now: Date.now(), ac }, obs };
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
