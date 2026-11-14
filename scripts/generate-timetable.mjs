// 運転パターンから推定時刻表を生成する。
// 使い方: node scripts/generate-timetable.mjs
// 入力: public/data/network.json / 出力: public/data/timetable.json
//
// 出力形式: 同じ停車パターンの列車は時刻のずれだけが違うので、パターンと始発時刻に分けて持つ
//   patterns[]: { n: 列車名, r: 経路id, s: [[経路内の駅index, 着, 発, 停車=1/通過=0], ...] }（時刻は始発駅の発車からの分）
//   trains[]:   [パターンの添字, 号数, 始発駅の発車時刻]（0:00 からの分・日本時間）
// 実際の時刻表データに差し替える場合は、trains[] に { n, no, r, s }（s の時刻は 0:00 からの分）を直接書いてもよい
import fs from 'node:fs';
import { SERVICES, TYPES, LINE_SPEED, STATION_DWELL } from './services.config.mjs';

const network = JSON.parse(fs.readFileSync('public/data/network.json', 'utf8'));
const LAST_ARRIVAL = 24 * 60 + 30;
const r1 = (x) => Math.round(x * 10) / 10;

function segmentSpeed(lineId, a, b, typeV) {
  const ls = LINE_SPEED[lineId];
  // 速度制限区間（例: 盛岡〜新青森）に含まれる駅間か
  const line = network.lines.find((l) => l.id === lineId);
  const idx = (s) => line.stations.findIndex((x) => x.name === s);
  for (const [x, y, v] of ls.overrides ?? []) {
    const lo = Math.min(idx(x), idx(y)), hi = Math.max(idx(x), idx(y));
    if (idx(a) >= lo && idx(b) >= lo && idx(a) <= hi && idx(b) <= hi) return Math.min(typeV, v);
  }
  return Math.min(typeV, ls.v);
}

function buildTrain(svc, dep, reverse) {
  const route = network.routes.find((r) => r.id === svc.route);
  const iFrom = route.stations.findIndex((s) => s.name === svc.from);
  const iTo = route.stations.findIndex((s) => s.name === svc.to);
  if (iFrom < 0 || iTo < 0) throw new Error(`${svc.name}: station not on route ${svc.route}`);
  let idxs = [];
  for (let i = iFrom; i <= iTo; i++) idxs.push(i);
  if (reverse) idxs = idxs.reverse();
  const type = TYPES[svc.name];
  const stopSet = new Set(svc.stops === 'all' ? route.stations.map((s) => s.name) : [...svc.stops, svc.from, svc.to]);

  const s = [];
  let t = dep;
  let legStart = 0; // 現在の走行区間の始点（停車駅）
  for (let k = 0; k < idxs.length; k++) {
    const st = route.stations[idxs[k]];
    const isStop = stopSet.has(st.name);
    if (k === 0) {
      s.push([idxs[k], t, t, 1]);
      continue;
    }
    const prev = route.stations[idxs[k - 1]];
    // 駅間は、経路上で後ろ側の駅が属する路線に含まれる
    const segLine = route.stations[Math.max(idxs[k], idxs[k - 1])].line;
    const v = segmentSpeed(segLine, prev.name, st.name, type.v);
    let run = (Math.abs(st.km - prev.km) / v) * 60;
    const penalty = LINE_SPEED[segLine].penalty;
    if (k - 1 === legStart) run += penalty / 2; // 発車後の加速
    if (isStop) run += penalty / 2; // 到着前の減速
    t += run;
    if (isStop) {
      const last = k === idxs.length - 1;
      const dwell = last ? 0 : Math.max(type.dwell, STATION_DWELL[st.name] ?? 0);
      s.push([idxs[k], r1(t), r1(t + dwell), 1]);
      t += dwell;
      legStart = k;
    } else {
      s.push([idxs[k], r1(t), r1(t), 0]);
    }
  }
  return s;
}

const trains = [];
for (const reverse of [false, true]) {
  for (const svc of SERVICES) {
    if (!TYPES[svc.name]) throw new Error(`unknown type ${svc.name}`);
    for (const dep of svc.times) {
      const s = buildTrain(svc, dep, reverse);
      if (s[s.length - 1][1] > LAST_ARRIVAL) continue;
      trains.push({ n: svc.name, r: svc.route, dir: reverse ? 'up' : 'down', s });
    }
  }
}

// 号数: 下りは奇数・上りは偶数を、始発時刻順に振る（実際の号数とは異なる）
const counters = {};
trains.sort((a, b) => a.s[0][2] - b.s[0][2]);
for (const tr of trains) {
  const key = `${tr.n}/${tr.dir}`;
  counters[key] = (counters[key] ?? 0) + 1;
  tr.no = tr.dir === 'down' ? counters[key] * 2 - 1 : counters[key] * 2;
  delete tr.dir;
}

const patterns = [];
const patternIndex = new Map();
const rows = trains.map((tr) => {
  const dep = tr.s[0][2];
  const s = tr.s.map(([idx, arr, d, stop]) => [idx, r1(arr - dep), r1(d - dep), stop]);
  const key = JSON.stringify([tr.n, tr.r, s]);
  if (!patternIndex.has(key)) {
    patternIndex.set(key, patterns.length);
    patterns.push({ n: tr.n, r: tr.r, s });
  }
  return [patternIndex.get(key), tr.no, dep];
});

const out = {
  note: '運転パターンから計算した推定時刻表です。実際の時刻・号数とは異なります。',
  patterns,
  trains: rows,
};
fs.writeFileSync('public/data/timetable.json', JSON.stringify(out));
console.log(`wrote ${trains.length} trains / ${patterns.length} patterns (${(fs.statSync('public/data/timetable.json').size / 1024).toFixed(0)} KB)`);

// 所要時間の確認用
const route = (id) => network.routes.find((r) => r.id === id);
const fmt = (m) => `${Math.floor(m / 60)}:${String(Math.round(m % 60)).padStart(2, '0')}`;
const seen = new Set();
for (const tr of trains) {
  const a = route(tr.r).stations[tr.s[0][0]].name;
  const b = route(tr.r).stations[tr.s[tr.s.length - 1][0]].name;
  const key = `${tr.n} ${a}→${b}`;
  if (seen.has(key)) continue;
  seen.add(key);
  console.log(`  ${key}  ${fmt(tr.s[tr.s.length - 1][1] - tr.s[0][2])}`);
}
