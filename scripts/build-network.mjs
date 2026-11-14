// 国土数値情報「鉄道データ（N02）」から新幹線の路線形状・駅の距離程を生成する。
// 使い方: node scripts/build-network.mjs <N02のUTF-8 GeoJSONがあるディレクトリ>
// 出力: public/data/network.json
import fs from 'node:fs';
import path from 'node:path';
import { LINES, ROUTES } from './lines.config.mjs';

const dir = process.argv[2];
if (!dir) {
  console.error('usage: node scripts/build-network.mjs <N02 UTF-8 directory>');
  process.exit(1);
}
const pick = (suffix) => {
  const f = fs.readdirSync(dir).find((n) => n.endsWith(suffix));
  if (!f) throw new Error(`${suffix} not found in ${dir}`);
  return JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
};
const sections = pick('_RailroadSection.geojson').features;
const stationFeatures = pick('_Station.geojson').features;

const R = 6371.0088;
const rad = (d) => (d * Math.PI) / 180;
function dist([lng1, lat1], [lng2, lat2]) {
  const dLat = rad(lat2 - lat1);
  const dLng = rad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

const lineStrings = (geom) => (geom.type === 'LineString' ? [geom.coordinates] : geom.type === 'MultiLineString' ? geom.coordinates : []);
const isJR = (p) => String(p.N02_004).includes('旅客鉄道');

function buildGraph(n02) {
  const nodes = new Map(); // key -> {c, adj: Map(key -> km)}
  const node = (c) => {
    const k = `${c[0]},${c[1]}`;
    if (!nodes.has(k)) nodes.set(k, { c, adj: new Map() });
    return k;
  };
  for (const f of sections) {
    if (f.properties.N02_003 !== n02 || !isJR(f.properties)) continue;
    for (const ls of lineStrings(f.geometry)) {
      for (let i = 1; i < ls.length; i++) {
        const a = node(ls[i - 1]);
        const b = node(ls[i]);
        if (a === b) continue;
        const d = dist(ls[i - 1], ls[i]);
        nodes.get(a).adj.set(b, d);
        nodes.get(b).adj.set(a, d);
      }
    }
  }
  if (!nodes.size) throw new Error(`no sections for ${n02}`);
  // 端点どうしの小さな隙間をつなぐ
  const ends = [...nodes].filter(([, v]) => v.adj.size === 1);
  for (let i = 0; i < ends.length; i++) {
    for (let j = i + 1; j < ends.length; j++) {
      const d = dist(ends[i][1].c, ends[j][1].c);
      if (d < 0.3 && !ends[i][1].adj.has(ends[j][0])) {
        ends[i][1].adj.set(ends[j][0], d);
        ends[j][1].adj.set(ends[i][0], d);
      }
    }
  }
  return nodes;
}

function stationPoint(name, n02) {
  const cands = stationFeatures.filter((f) => f.properties.N02_005 === name && isJR(f.properties));
  const exact = cands.filter((f) => f.properties.N02_003 === n02);
  const list = exact.length ? exact : cands;
  if (!list.length) throw new Error(`station not found: ${name} (${n02})`);
  const pts = list.flatMap((f) => lineStrings(f.geometry).flat());
  const lng = pts.reduce((s, p) => s + p[0], 0) / pts.length;
  const lat = pts.reduce((s, p) => s + p[1], 0) / pts.length;
  return [lng, lat];
}

function nearestNode(nodes, c) {
  let best = null;
  let bd = Infinity;
  for (const [k, v] of nodes) {
    const d = dist(c, v.c);
    if (d < bd) { bd = d; best = k; }
  }
  if (bd > 2) console.warn(`  ! station snapped ${bd.toFixed(2)}km away`);
  return best;
}

function shortestPath(nodes, from, to) {
  const distTo = new Map([[from, 0]]);
  const prev = new Map();
  const heap = [[0, from]];
  const push = (x) => {
    heap.push(x);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p][0] <= heap[i][0]) break;
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  };
  const pop = () => {
    const top = heap[0];
    const last = heap.pop();
    if (heap.length) {
      heap[0] = last;
      let i = 0;
      for (;;) {
        const l = 2 * i + 1, r = l + 1;
        let m = i;
        if (l < heap.length && heap[l][0] < heap[m][0]) m = l;
        if (r < heap.length && heap[r][0] < heap[m][0]) m = r;
        if (m === i) break;
        [heap[m], heap[i]] = [heap[i], heap[m]];
        i = m;
      }
    }
    return top;
  };
  while (heap.length) {
    const [d, k] = pop();
    if (k === to) break;
    if (d > distTo.get(k)) continue;
    for (const [n, w] of nodes.get(k).adj) {
      const nd = d + w;
      if (nd < (distTo.get(n) ?? Infinity)) {
        distTo.set(n, nd);
        prev.set(n, k);
        push([nd, n]);
      }
    }
  }
  if (!distTo.has(to)) throw new Error('path not found');
  const out = [to];
  while (out[out.length - 1] !== from) out.push(prev.get(out[out.length - 1]));
  return out.reverse().map((k) => nodes.get(k).c);
}

// Douglas-Peucker（メートル単位の簡易平面近似）
function simplify(pts, tolKm) {
  if (pts.length < 3) return pts;
  const lat0 = rad(pts[0][1]);
  const xy = pts.map(([lng, lat]) => [rad(lng) * Math.cos(lat0) * R, rad(lat) * R]);
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [s, e] = stack.pop();
    const [x1, y1] = xy[s], [x2, y2] = xy[e];
    const L = Math.hypot(x2 - x1, y2 - y1) || 1e-9;
    let md = 0, mi = -1;
    for (let i = s + 1; i < e; i++) {
      const d = Math.abs((x2 - x1) * (y1 - xy[i][1]) - (x1 - xy[i][0]) * (y2 - y1)) / L;
      if (d > md) { md = d; mi = i; }
    }
    if (md > tolKm) { keep[mi] = 1; stack.push([s, mi], [mi, e]); }
  }
  return pts.filter((_, i) => keep[i]);
}

const round = (c) => [Math.round(c[0] * 1e5) / 1e5, Math.round(c[1] * 1e5) / 1e5];

const lines = [];
for (const line of LINES) {
  console.log(line.name);
  const coords = [];
  const stations = [];
  let km = 0;
  for (const part of line.parts) {
    const nodes = buildGraph(part.n02);
    const snapped = part.stations.map((s) => {
      const p = stationPoint(s, part.n02);
      return { name: s, p, node: nearestNode(nodes, p) };
    });
    for (let i = 0; i < snapped.length; i++) {
      const st = snapped[i];
      if (i === 0) {
        if (!coords.length) coords.push(round(nodes.get(st.node).c));
        if (!stations.length) stations.push({ name: st.name, km: 0, lng: st.p[0], lat: st.p[1] });
        continue;
      }
      const seg = simplify(shortestPath(nodes, snapped[i - 1].node, st.node), 0.015);
      for (let j = 1; j < seg.length; j++) {
        km += dist(seg[j - 1], seg[j]);
        coords.push(round(seg[j]));
      }
      stations.push({ name: st.name, km: Math.round(km * 1000) / 1000, lng: st.p[0], lat: st.p[1] });
    }
  }
  console.log(`  ${stations.length} stations, ${km.toFixed(1)} km, ${coords.length} pts`);
  lines.push({ id: line.id, name: line.name, color: line.color, operator: line.operator, coords, stations: stations.map((s) => ({ ...s, lng: round([s.lng, s.lat])[0], lat: round([s.lng, s.lat])[1] })) });
}

// 経路（直通運転）: 路線の区間をつなげて駅の距離程を振り直す
const routes = ROUTES.map((r) => {
  const stations = [];
  let offset = 0;
  for (const [lineId, from, to] of r.parts) {
    const line = lines.find((l) => l.id === lineId);
    const i0 = line.stations.findIndex((s) => s.name === from);
    const i1 = line.stations.findIndex((s) => s.name === to);
    if (i0 < 0 || i1 < 0 || i1 <= i0) throw new Error(`bad route part ${lineId} ${from}-${to}`);
    const base = line.stations[i0].km;
    for (let i = stations.length ? i0 + 1 : i0; i <= i1; i++) {
      stations.push({ name: line.stations[i].name, km: Math.round((offset + line.stations[i].km - base) * 1000) / 1000, line: lineId });
    }
    offset += line.stations[i1].km - base;
  }
  return { id: r.id, parts: r.parts, stations };
});

const out = {
  attribution: '国土数値情報（鉄道データ）N02 国土交通省 を加工して作成',
  lines,
  routes,
};
fs.mkdirSync('public/data', { recursive: true });
fs.writeFileSync('public/data/network.json', JSON.stringify(out));
console.log(`wrote public/data/network.json (${(fs.statSync('public/data/network.json').size / 1024).toFixed(0)} KB)`);
