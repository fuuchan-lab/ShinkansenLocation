// フェリーの航路と時刻（scripts/ferries.config.mjs）から、推定位置の計算に使うデータを作る。
// 港と港の間の線は、陸地（Natural Earth 10m）を避ける最短の経路を格子の上で探して作る。
// 使い方: node scripts/build-ferries.mjs <ne_10m_land.geojson と ne_10m_minor_islands.geojson があるディレクトリ>
// 出力: public/data/ferries.json
import fs from 'node:fs';
import path from 'node:path';
import { PORTS, ROUTES } from './ferries.config.mjs';

const dir = process.argv[2];
if (!dir) {
  console.error('usage: node scripts/build-ferries.mjs <Natural Earth geojson directory>');
  process.exit(1);
}

// ---- 陸地の格子（1 マス 0.01 度 ≒ 1km） ----
const W0 = 122, S0 = 24, E0 = 150, N0 = 46.5, RES = 0.01;
const NX = Math.round((E0 - W0) / RES), NY = Math.round((N0 - S0) / RES);
const land = new Uint8Array(NX * NY);
const gx = (lon) => (lon - W0) / RES;
const gy = (lat) => (lat - S0) / RES;
const lonOf = (x) => W0 + (x + 0.5) * RES;
const latOf = (y) => S0 + (y + 0.5) * RES;

/** 多角形（外周と穴）を偶奇規則で塗る */
function fillPolygon(rings) {
  let minY = Infinity, maxY = -Infinity;
  for (const r of rings) for (const [, lat] of r) { minY = Math.min(minY, lat); maxY = Math.max(maxY, lat); }
  const y0 = Math.max(0, Math.floor(gy(minY))), y1 = Math.min(NY - 1, Math.ceil(gy(maxY)));
  for (let y = y0; y <= y1; y++) {
    const lat = latOf(y);
    const xs = [];
    for (const r of rings) {
      for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
        const [xa, ya] = r[i], [xb, yb] = r[j];
        if ((ya > lat) !== (yb > lat)) xs.push(xa + ((lat - ya) / (yb - ya)) * (xb - xa));
      }
    }
    xs.sort((a, b) => a - b);
    for (let k = 0; k + 1 < xs.length; k += 2) {
      const a = Math.max(0, Math.ceil(gx(xs[k]) - 0.5)), b = Math.min(NX - 1, Math.floor(gx(xs[k + 1]) - 0.5));
      for (let x = a; x <= b; x++) land[y * NX + x] = 1;
    }
  }
}
for (const file of ['ne_10m_land.geojson', 'ne_10m_minor_islands.geojson']) {
  const p = path.join(dir, file);
  if (!fs.existsSync(p)) continue;
  for (const f of JSON.parse(fs.readFileSync(p, 'utf8')).features) {
    const g = f.geometry;
    const polys = g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : [];
    for (const poly of polys) {
      const bb = poly[0].reduce((b, [x, y]) => [Math.min(b[0], x), Math.min(b[1], y), Math.max(b[2], x), Math.max(b[3], y)], [Infinity, Infinity, -Infinity, -Infinity]);
      if (bb[2] < W0 || bb[0] > E0 || bb[3] < S0 || bb[1] > N0) continue;
      fillPolygon(poly);
    }
  }
}

// 陸からの距離（マス）。岸に近いところは少し通りにくくして、沖寄りの自然な線にする
const dist = new Uint16Array(NX * NY).fill(65535);
{
  const q = new Int32Array(NX * NY);
  let h = 0, t = 0;
  for (let i = 0; i < land.length; i++) if (land[i]) { dist[i] = 0; q[t++] = i; }
  while (h < t) {
    const i = q[h++], x = i % NX, y = (i - x) / NX, d = dist[i] + 1;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= NX || ny >= NY) continue;
      const j = ny * NX + nx;
      if (dist[j] > d) { dist[j] = d; q[t++] = j; }
    }
  }
}
const NEAR = 4; // この距離（マス）より岸に近いと割り増し

/** 港の位置から、いちばん近い海のマス */
function snapToWater([lon, lat]) {
  const x0 = Math.floor(gx(lon)), y0 = Math.floor(gy(lat));
  for (let r = 0; r < 60; r++) {
    let best = -1, bd = Infinity;
    for (let y = y0 - r; y <= y0 + r; y++) for (let x = x0 - r; x <= x0 + r; x++) {
      if (Math.max(Math.abs(x - x0), Math.abs(y - y0)) !== r || x < 0 || y < 0 || x >= NX || y >= NY) continue;
      const i = y * NX + x;
      if (land[i]) continue;
      const d = (x - x0) ** 2 + (y - y0) ** 2;
      if (d < bd) { bd = d; best = i; }
    }
    if (best >= 0) return best;
  }
  throw new Error(`no water near ${lon},${lat}`);
}

// ---- A*（8 方向）。経度方向の 1 マスは緯度に応じて短い ----
const g = new Float64Array(NX * NY);
const from = new Int32Array(NX * NY);
const stamp = new Uint32Array(NX * NY);
const done = new Uint32Array(NX * NY);
let run = 0;
const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];

function astar(a, b) {
  run++;
  const bx = b % NX, by = (b - bx) / NX;
  const h = (i) => {
    const x = i % NX, y = (i - x) / NX;
    const c = Math.cos((latOf(y) * Math.PI) / 180);
    return Math.hypot((x - bx) * c, y - by);
  };
  // 二分ヒープ
  const heap = [], key = [];
  const push = (i, f) => {
    heap.push(i); key.push(f);
    let k = heap.length - 1;
    while (k > 0) {
      const p = (k - 1) >> 1;
      if (key[p] <= key[k]) break;
      [heap[p], heap[k]] = [heap[k], heap[p]]; [key[p], key[k]] = [key[k], key[p]];
      k = p;
    }
  };
  const pop = () => {
    const top = heap[0];
    const li = heap.pop(), lk = key.pop();
    if (heap.length) {
      heap[0] = li; key[0] = lk;
      let k = 0;
      for (;;) {
        const l = 2 * k + 1, r = l + 1;
        let m = k;
        if (l < heap.length && key[l] < key[m]) m = l;
        if (r < heap.length && key[r] < key[m]) m = r;
        if (m === k) break;
        [heap[m], heap[k]] = [heap[k], heap[m]]; [key[m], key[k]] = [key[k], key[m]];
        k = m;
      }
    }
    return top;
  };
  stamp[a] = run; g[a] = 0; from[a] = -1;
  push(a, h(a));
  while (heap.length) {
    const i = pop();
    if (i === b) break;
    if (done[i] === run) continue;
    done[i] = run;
    const x = i % NX, y = (i - x) / NX;
    const c = Math.cos((latOf(y) * Math.PI) / 180);
    for (const [dx, dy] of DIRS) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= NX || ny >= NY) continue;
      const j = ny * NX + nx;
      if (land[j]) continue;
      const step = Math.hypot(dx * c, dy) * (1 + 2 * Math.max(0, NEAR - dist[j]) / NEAR);
      const ng = g[i] + step;
      if (stamp[j] !== run || ng < g[j]) {
        stamp[j] = run; g[j] = ng; from[j] = i;
        push(j, ng + h(j));
      }
    }
  }
  if (stamp[b] !== run) throw new Error('no route');
  const cells = [];
  for (let i = b; i !== -1; i = from[i]) cells.push(i);
  return cells.reverse();
}

/** 2 つのマスの間に陸がないか */
function clear(i, j) {
  const xi = i % NX, yi = (i - xi) / NX, xj = j % NX, yj = (j - xj) / NX;
  const n = Math.max(Math.abs(xj - xi), Math.abs(yj - yi)) * 2;
  for (let k = 1; k < n; k++) {
    const x = Math.round(xi + ((xj - xi) * k) / n), y = Math.round(yi + ((yj - yi) * k) / n);
    if (land[y * NX + x]) return false;
  }
  return true;
}

/** 見通せる限り直線でつなぐ（格子のぎざぎざを取る） */
function pull(cells) {
  const out = [cells[0]];
  let i = 0;
  while (i < cells.length - 1) {
    let j = cells.length - 1;
    while (j > i + 1 && !clear(cells[i], cells[j])) j--;
    out.push(cells[j]);
    i = j;
  }
  return out;
}

const r5 = (v) => Math.round(v * 1e4) / 1e4;
const cellLngLat = (i) => { const x = i % NX; return [r5(lonOf(x)), r5(latOf((i - x) / NX))]; };

/** 港 a から港 b までの線。via（経由点）があれば順に通る */
function seaPath(a, b, via = []) {
  const pts = [PORTS[a].pos, ...via, PORTS[b].pos];
  const cells = [];
  for (let k = 0; k + 1 < pts.length; k++) {
    const s = snapToWater(pts[k]), e = snapToWater(pts[k + 1]);
    const part = astar(s, e);
    cells.push(...(k ? part.slice(1) : part));
  }
  const line = pull(cells).map(cellLngLat);
  // 両端は港の位置そのもの
  return [PORTS[a].pos.map(r5), ...line, PORTS[b].pos.map(r5)];
}

// ---- 時刻 ----
/** "HH:MM" または "HH:MM+1"（翌日）→ 出発日の 0 時からの分 */
function minutes(s) {
  if (s == null) return null;
  const m = /^(\d{1,2}):(\d{2})(?:\+(\d))?$/.exec(s);
  if (!m) throw new Error(`bad time ${s}`);
  return +m[1] * 60 + +m[2] + (m[3] ? +m[3] * 1440 : 0);
}
const DAY = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
/** 運航する曜日のビット（日=1, 月=2, …, 土=64）。"daily" か "mon,wed,fri" の形 */
function daysMask(s = 'daily') {
  if (s === 'daily') return 127;
  return s.split(',').reduce((m, d) => m | (1 << DAY[d.trim().toLowerCase()]), 0);
}
/** "2026-11-17" → 1970-01-01 からの日数 */
const dayNum = (s) => Math.round(Date.parse(`${s}T00:00:00Z`) / 86400000);
/**
 * 運航日。days は次のどれか:
 *  "daily" / "mon,wed,fri"（曜日）
 *  { dates: ["2026-11-20", …] }（その日だけ）
 *  { every: 2, from: "2026-11-01" }（from から every 日ごと）
 * どれにも except: ["2026-11-24", …]（運休日）を足せる
 * period: [["2026-11-01", "2026-12-10"], …] があれば、その期間だけ運航する
 */
function days(spec = 'daily', except = [], period = null) {
  const out = { d: 127 };
  if (period) out.pr = period.map(([a, b]) => [dayNum(a), dayNum(b)]);
  if (typeof spec === 'string') out.d = daysMask(spec);
  else if (spec.dates) out.on = spec.dates.map(dayNum);
  else if (spec.every) out.ev = [spec.every, dayNum(spec.from)];
  const ex = [...(spec.except ?? []), ...except];
  if (ex.length) out.ex = ex.map(dayNum);
  return out;
}

// ---- 出力 ----
const portNames = Object.keys(PORTS);
const portIndex = new Map(portNames.map((n, i) => [n, i]));
const legs = new Map(); // "a>b" -> 線（逆向きは同じ線を逆にたどる）
const out = { ports: portNames.map((n) => [PORTS[n].name ?? n, PORTS[n].en, ...PORTS[n].pos.map(r5)]), routes: [], legs: [], sailings: [] };
const legIndex = (a, b, route) => {
  const k = `${a}>${b}`, rk = `${b}>${a}`;
  if (legs.has(k)) return legs.get(k);
  if (legs.has(rk)) return -1 - legs.get(rk); // 負は逆向き
  const via = route.via?.[k] ?? route.via?.[rk]?.slice().reverse() ?? [];
  const line = seaPath(a, b, via);
  out.legs.push(line);
  legs.set(k, out.legs.length - 1);
  return out.legs.length - 1;
};

let n = 0;
for (const route of ROUTES) {
  const ri = out.routes.length;
  out.routes.push({ id: route.id, op: route.operator, opEn: route.operatorEn, name: route.name, nameEn: route.nameEn, url: route.url ?? '' });
  for (const s of route.sailings) {
    const stops = s.stops.map(([port, arr, dep]) => {
      if (!portIndex.has(port)) throw new Error(`${route.id}: unknown port ${port}`);
      return [portIndex.get(port), minutes(arr), minutes(dep)];
    });
    const ls = [];
    for (let k = 0; k + 1 < s.stops.length; k++) ls.push(legIndex(s.stops[k][0], s.stops[k + 1][0], route));
    out.sailings.push({ r: ri, ...days(s.days, s.except, s.period), ship: s.ship ?? '', mmsi: s.mmsi ?? null, s: stops, l: ls });
    n++;
  }
}
out.ships = ROUTES.flatMap((r) => (r.ships ?? []).map((sh) => [sh.name, sh.en ?? '', sh.mmsi ?? null, out.routes.findIndex((x) => x.id === r.id)]));
fs.writeFileSync(new URL('../public/data/ferries.json', import.meta.url), JSON.stringify(out));
console.log(`routes ${out.routes.length} sailings ${n} legs ${out.legs.length} points ${out.legs.reduce((a, l) => a + l.length, 0)}`);
