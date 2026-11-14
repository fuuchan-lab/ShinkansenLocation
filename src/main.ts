import * as maplibregl from 'maplibre-gl';
import type { GeoJSONSource, StyleSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url';
import './style.css';
import { buildRoutes, loadData, type Airport, type GeoJSONData, type Line, type Route, type Timetable, type Train } from './data';
import { aircraftAt, aircraftLabel, fetchAircraft, LIVE_API, type Aircraft } from './aircraft';
import { addIcons, PLANE_COLORS, SHIP_COLOR } from './icons';
import { fetchShips, shipAt, shipLabel, type Ship } from './ships';
import { advance, formatTime, jstNowMinutes, placeAt, stateAt, trainId, type TrainState } from './simulate';

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

const OFFICIAL: Record<string, { label: string; url: string }> = {
  jrc: { label: 'JR東海 運行情報', url: 'https://traininfo.jr-central.co.jp/shinkansen/sp/ja/ti08.html' },
  jrw: { label: 'JR西日本 運行情報', url: 'https://trafficinfo.westjr.co.jp/sanyo.html' },
  jre: { label: 'JR東日本 運行情報', url: 'https://traininfo.jreast.co.jp/train_info/shinkansen.aspx' },
  jrh: { label: 'JR北海道 運行情報', url: 'https://www3.jrhokkaido.co.jp/webunkou/' },
  jrk: { label: 'JR九州 運行情報', url: 'https://www.jrkyushu.co.jp/trains/info/' },
};
const HOKURIKU_WEST = new Set(['糸魚川', '黒部宇奈月温泉', '富山', '新高岡', '金沢', '小松', '加賀温泉', '芦原温泉', '福井', '越前たけふ', '敦賀']);
function officialFor(line: string, station: string) {
  if (line === 'tokaido') return OFFICIAL.jrc;
  if (line === 'sanyo') return OFFICIAL.jrw;
  if (line === 'kyushu' || line === 'nishikyushu') return OFFICIAL.jrk;
  if (line === 'hokkaido') return OFFICIAL.jrh;
  if (line === 'hokuriku' && HOKURIKU_WEST.has(station)) return OFFICIAL.jrw;
  return OFFICIAL.jre;
}

const SEA = '#bed2ff'; // 地理院タイル（淡色地図）の海の色

const style: StyleSpecification = {
  version: 8,
  glyphs: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
  sources: {
    gsi: {
      type: 'raster',
      tiles: ['https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png'],
      tileSize: 256,
      maxzoom: 18,
      attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener">国土地理院</a> | 国土数値情報 | Natural Earth'
        + ' | 航空機: <a href="https://adsb.lol" target="_blank" rel="noopener">adsb.lol</a> (ODbL), <a href="https://www.adsbdb.com" target="_blank" rel="noopener">adsbdb</a>',
    },
  },
  layers: [
    { id: 'sea', type: 'background', paint: { 'background-color': SEA } },
    { id: 'gsi', type: 'raster', source: 'gsi' },
  ],
};

// 沖縄（与那国島・波照間島）から北海道（北方領土）まで
const JAPAN: [[number, number], [number, number]] = [[122.8, 24.0], [148.9, 45.6]];

// バンドラ経由だと既定の Worker の場所を解決できないため明示する
maplibregl.setWorkerUrl(workerUrl);

const map = new maplibregl.Map({
  container: 'map',
  style,
  bounds: JAPAN,
  fitBoundsOptions: { padding: { top: 120, bottom: 20, left: 10, right: 10 } },
  maxBounds: [[114, 16], [158, 52]],
  attributionControl: { compact: true },
  dragRotate: false,
  pitchWithRotate: false,
  renderWorldCopies: false,
});
map.touchZoomRotate.disableRotation();
if (import.meta.env.DEV) Object.assign(window, { __map: map });
map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');
map.addControl(new maplibregl.GeolocateControl({ positionOptions: { enableHighAccuracy: false } }), 'bottom-right');

// ---- 時刻（現在時刻 or 指定時刻からの再生） ----
const clock = { base: null as number | null, realStart: 0, speed: 1 };
function nowMinutes(): number {
  if (clock.base === null) return jstNowMinutes();
  return (clock.base + ((Date.now() - clock.realStart) / 60000) * clock.speed) % 1440;
}
function setClock(base: number | null, speed = clock.speed) {
  clock.base = base;
  clock.speed = speed;
  clock.realStart = Date.now();
}
/** 時刻表の時刻（24時台あり）と比べるための現在時刻 */
const serviceTime = (now: number) => (now < 180 ? now + 1440 : now);

// ---- 状態 ----
let lines: Line[] = [];
let airports: Airport[] = [];
let mask: GeoJSONData;
let routes = new Map<string, Route>();
let timetable: Timetable;
const lineColor = new Map<string, string>();
const hiddenLines = new Set<string>();

/** line: その駅から出ていく区間の路線 */
interface StationEntry { train: Train; arr: number; dep: number; dir: 1 | -1; dest: string; first: boolean; last: boolean; line: string }
const stationIndex = new Map<string, StationEntry[]>();

type Sheet =
  | { kind: 'train'; id: string }
  | { kind: 'station'; name: string; dir: 1 | -1 }
  | { kind: 'aircraft'; hex: string }
  | { kind: 'ship'; mmsi: number }
  | null;
let sheet: Sheet = null;
let follow = false;
let scrollToNow = false;

// 1分ごとの推定（states）と、その間を推定速度で動かした表示位置（shown）
let states: TrainState[] = [];
let statesAt = 0;
let updatedReal = 0;
const corrections = new Map<string, number>();
const shown = new Map<string, { km: number; pos: [number, number] }>();
const CORRECTION_MS = 3000;

// 飛行中の航空機と旅客船（30秒ごとに取得し、その間は速度と向きで進める）
let aircraft: Aircraft[] = [];
let ships: Ship[] = [];
const LIVE_INTERVAL_MS = 30_000;
const showPlanes = { domestic: loadSetting('planes.domestic', true), international: loadSetting('planes.international', true) };
let showShips = loadSetting('ships', true);
function loadSetting(key: string, fallback: boolean): boolean {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : v === '1';
  } catch {
    return fallback;
  }
}
function saveSetting(key: string, value: boolean) {
  try {
    localStorage.setItem(key, value ? '1' : '0');
  } catch {
    // 保存できなくても表示には影響しない
  }
}

// 駅に停車中の列車は、のりば（番線）のように線路と直角方向へ並べる。
// 左側通行なので、下り・上りそれぞれ進行方向の左側に、到着順に詰めて並べる（推定）。
const platforms = new Map<string, Map<string, number>>(); // `${駅}|${路線}|${向き}` -> 列車id -> 並び順
const slotShown = new Map<string, number>();
const TRACK_SPACING = 13; // 少し重なる程度の間隔（アイコン幅18に対して）
const ICON_SCALE: [number, number][] = [[4, 0.32], [6, 0.5], [8, 0.75], [12, 1.1]];
function iconScale(z: number): number {
  if (z <= ICON_SCALE[0][0]) return ICON_SCALE[0][1];
  for (let i = 1; i < ICON_SCALE.length; i++) {
    const [z1, s1] = ICON_SCALE[i];
    const [z0, s0] = ICON_SCALE[i - 1];
    if (z <= z1) return s0 + ((s1 - s0) * (z - z0)) / (z1 - z0);
  }
  return ICON_SCALE[ICON_SCALE.length - 1][1];
}

// 東京駅の東海道と東北のように、路線が違えばのりばも別
const platformKey = (st: TrainState) => `${routes.get(st.train.r)!.stations[st.at].name}|${st.line}|${st.dir}`;

function assignPlatforms(list: TrainState[]) {
  const stopped = new Map<string, string>();
  for (const st of list) {
    if (st.speed === 0) stopped.set(st.id, platformKey(st));
  }
  for (const [key, slots] of platforms) {
    for (const id of slots.keys()) if (stopped.get(id) !== key) slots.delete(id);
    if (!slots.size) platforms.delete(key);
  }
  for (const [id, key] of stopped) {
    const slots = platforms.get(key) ?? new Map<string, number>();
    if (!slots.has(id)) {
      const used = new Set(slots.values());
      let n = 0;
      while (used.has(n)) n++;
      slots.set(id, n);
    }
    platforms.set(key, slots);
  }
}
const slotOf = (st: TrainState) => (st.speed === 0 ? platforms.get(platformKey(st))?.get(st.id) ?? 0 : 0);

async function init() {
  const data = await loadData();
  lines = data.network.lines;
  timetable = data.timetable;
  airports = data.airports;
  mask = data.mask;
  routes = buildRoutes(data.network);
  for (const l of lines) lineColor.set(l.id, l.color);
  buildStationIndex();
  await new Promise<void>((resolve) => (map.loaded() ? resolve() : map.once('load', () => resolve())));
  await addIcons(map, lines);
  addLayers();
  buildLineFilter();
  requestAnimationFrame(frame);
  if (LIVE_API) {
    startPolling(async () => {
      aircraft = await fetchAircraft(aircraft);
      if (sheet?.kind === 'aircraft') renderSheet();
    });
    startPolling(async () => {
      ships = await fetchShips(ships);
      if (sheet?.kind === 'ship') renderSheet();
    });
  }
}

/** 一定間隔で取得する。画面が見えていないときは取得しない */
function startPolling(load: () => Promise<void>) {
  let timer = 0;
  const poll = async () => {
    clearTimeout(timer);
    try {
      await load();
    } catch (err) {
      console.warn(err);
    }
    if (!document.hidden) timer = window.setTimeout(poll, LIVE_INTERVAL_MS);
  };
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) poll();
  });
  poll();
}

function buildStationIndex() {
  for (const tr of timetable.trains) {
    const route = routes.get(tr.r)!;
    const s = tr.s;
    const first = route.stations[s[0][0]];
    const last = route.stations[s[s.length - 1][0]];
    const dir = last.km >= first.km ? 1 : -1;
    s.forEach(([idx, arr, dep, stop], k) => {
      if (!stop) return;
      const name = route.stations[idx].name;
      const list = stationIndex.get(name) ?? [];
      // 駅間は、経路上で後ろ側の駅が属する路線に含まれる
      const nextIdx = k + 1 < s.length ? s[k + 1][0] : idx;
      const line = route.stations[Math.max(idx, nextIdx)].line;
      list.push({ train: tr, arr, dep, dir, dest: last.name, first: k === 0, last: k === s.length - 1, line });
      stationIndex.set(name, list);
    });
  }
  for (const list of stationIndex.values()) list.sort((a, b) => a.dep - b.dep);
}

function addLayers() {
  map.addSource('mask', { type: 'geojson', data: mask });
  map.addSource('lines', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: lines.map((l) => ({ type: 'Feature', properties: { id: l.id, color: l.color }, geometry: { type: 'LineString', coordinates: l.coords } })),
    },
  });
  const stationMap = new Map<string, { name: string; lng: number; lat: number; lines: string[] }>();
  for (const l of lines) {
    for (const s of l.stations) {
      const st = stationMap.get(s.name) ?? { name: s.name, lng: s.lng, lat: s.lat, lines: [] };
      st.lines.push(l.id);
      stationMap.set(s.name, st);
    }
  }
  map.addSource('stations', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [...stationMap.values()].map((s) => ({
        type: 'Feature',
        properties: { name: s.name, lines: `,${s.lines.join(',')},`, major: s.lines.length > 1 ? 1 : 0 },
        geometry: { type: 'Point', coordinates: [s.lng, s.lat] },
      })),
    },
  });
  map.addSource('airports', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: airports.map((a) => ({ type: 'Feature', properties: { name: a.name }, geometry: { type: 'Point', coordinates: [a.lng, a.lat] } })),
    },
  });
  map.addSource('trains', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
  map.addSource('aircraft', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
  map.addSource('ships', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });

  // 日本以外を海の色で隠す
  map.addLayer({ id: 'mask', type: 'fill', source: 'mask', paint: { 'fill-color': SEA, 'fill-antialias': false } });
  map.addLayer({
    id: 'line-casing', type: 'line', source: 'lines',
    layout: { 'line-join': 'round', 'line-cap': 'round' },
    paint: { 'line-color': '#ffffff', 'line-width': ['interpolate', ['linear'], ['zoom'], 4, 6, 8, 11, 12, 17] },
  });
  map.addLayer({
    id: 'line-main', type: 'line', source: 'lines',
    layout: { 'line-join': 'round', 'line-cap': 'round' },
    paint: { 'line-color': ['get', 'color'], 'line-width': ['interpolate', ['linear'], ['zoom'], 4, 3.5, 8, 7, 12, 11] },
  });
  map.addLayer({
    id: 'airport', type: 'symbol', source: 'airports', minzoom: 6,
    layout: {
      'icon-image': 'airport',
      'icon-size': ['interpolate', ['linear'], ['zoom'], 6, 0.65, 10, 1],
      'icon-allow-overlap': true,
      'text-field': ['step', ['zoom'], '', 7, ['get', 'name']],
      'text-font': ['Noto Sans Regular'],
      'text-size': 11,
      'text-offset': [0, 1.2],
      'text-anchor': 'top',
      'text-optional': true,
    },
    paint: { 'text-color': '#4a5568', 'text-halo-color': '#fff', 'text-halo-width': 1.5 },
  });
  map.addLayer({
    id: 'station', type: 'symbol', source: 'stations', minzoom: 6,
    layout: {
      'icon-image': 'station',
      'icon-size': ['interpolate', ['linear'], ['zoom'], 6, ['case', ['==', ['get', 'major'], 1], 0.6, 0.45], 10, 0.9],
      'icon-allow-overlap': true,
      'symbol-sort-key': ['-', 1, ['get', 'major']],
      // 主要駅（路線の接続駅）は早めに、その他の駅はズームしてから駅名を出す
      'text-field': ['step', ['zoom'], '', 6.5, ['case', ['==', ['get', 'major'], 1], ['get', 'name'], ''], 7.5, ['get', 'name']],
      'text-font': ['Noto Sans Regular'],
      'text-size': ['interpolate', ['linear'], ['zoom'], 7, 11, 11, 14],
      'text-offset': [0, 1.3],
      'text-anchor': 'top',
      'text-optional': true,
    },
    paint: { 'text-color': '#222', 'text-halo-color': '#fff', 'text-halo-width': 1.5 },
  });
  // 旅客船・飛行機は列車の下に描く
  map.addLayer({
    id: 'ships', type: 'symbol', source: 'ships',
    layout: {
      'icon-image': 'ship',
      'icon-size': ['interpolate', ['linear'], ['zoom'], 4, 0.45, 7, 0.65, 10, 0.95],
      'icon-rotate': ['get', 'heading'],
      'icon-rotation-alignment': 'map',
      'icon-allow-overlap': true,
      'icon-ignore-placement': true,
      'text-field': ['step', ['zoom'], '', 8, ['get', 'label']],
      'text-font': ['Noto Sans Regular'],
      'text-size': 11,
      'text-offset': [0, 1.5],
      'text-anchor': 'top',
      'text-optional': true,
    },
    paint: { 'text-color': '#005f8f', 'text-halo-color': '#fff', 'text-halo-width': 1.5 },
  });
  map.addLayer({
    id: 'ship-selected', type: 'circle', source: 'ships',
    filter: ['==', ['get', 'mmsi'], -1],
    paint: { 'circle-radius': 15, 'circle-color': 'rgba(0,0,0,0)', 'circle-stroke-color': '#111', 'circle-stroke-width': 2.5 },
  });
  map.addLayer({
    id: 'aircraft', type: 'symbol', source: 'aircraft',
    layout: {
      'icon-image': ['case', ['get', 'intl'], 'plane-international', 'plane-domestic'],
      'icon-size': ['interpolate', ['linear'], ['zoom'], 4, 0.45, 7, 0.65, 10, 0.9],
      'icon-rotate': ['get', 'heading'],
      'icon-rotation-alignment': 'map',
      'icon-allow-overlap': true,
      'icon-ignore-placement': true,
      'symbol-sort-key': ['get', 'alt'],
      'text-field': ['step', ['zoom'], '', 7.5, ['get', 'label']],
      'text-font': ['Noto Sans Regular'],
      'text-size': 11,
      'text-offset': [0, 1.4],
      'text-anchor': 'top',
      'text-optional': true,
    },
    paint: { 'text-color': '#5a4a00', 'text-halo-color': '#fff', 'text-halo-width': 1.5 },
  });
  map.addLayer({
    id: 'aircraft-selected', type: 'circle', source: 'aircraft',
    filter: ['==', ['get', 'hex'], ''],
    paint: { 'circle-radius': 15, 'circle-color': 'rgba(0,0,0,0)', 'circle-stroke-color': '#111', 'circle-stroke-width': 2.5 },
  });
  map.addLayer({
    id: 'train-selected', type: 'circle', source: 'trains',
    filter: ['==', ['get', 'id'], ''],
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 4, 12, 8, 16, 12, 20],
      'circle-color': 'rgba(255,255,255,0.6)',
      'circle-stroke-color': '#111',
      'circle-stroke-width': 2.5,
    },
  });
  map.addLayer({
    id: 'train', type: 'symbol', source: 'trains',
    layout: {
      'icon-image': ['concat', 'train-', ['get', 'line']],
      'icon-size': ['interpolate', ['linear'], ['zoom'], 4, 0.32, 6, 0.5, 8, 0.75, 12, 1.1],
      'icon-rotate': ['get', 'bearing'],
      'icon-rotation-alignment': 'map',
      'icon-allow-overlap': true,
      'icon-ignore-placement': true,
    },
  });
  map.addLayer({
    id: 'train-label', type: 'symbol', source: 'trains', minzoom: 7,
    layout: {
      'text-field': ['get', 'label'],
      'text-font': ['Noto Sans Regular'],
      'text-size': 12,
      'text-offset': [0, -1.6],
      'text-anchor': 'bottom',
      'text-allow-overlap': false,
    },
    paint: { 'text-color': ['get', 'color'], 'text-halo-color': '#fff', 'text-halo-width': 2 },
  });
  // タップしやすいように透明な大きめの当たり判定
  map.addLayer({
    id: 'train-hit', type: 'circle', source: 'trains',
    paint: { 'circle-radius': 18, 'circle-color': '#000', 'circle-opacity': 0 },
  });

  map.on('click', (e) => {
    // 列車と駅のうち、タップした位置に最も近いもの
    const r = 14;
    const near = map
      .queryRenderedFeatures([[e.point.x - r, e.point.y - r], [e.point.x + r, e.point.y + r]], { layers: ['train-hit', 'station', 'aircraft', 'ships'] })
      .map((f) => ({ f, d: map.project((f.geometry as { coordinates: [number, number] }).coordinates).dist(e.point) }))
      .sort((a, b) => a.d - b.d)[0];
    if (!near) {
      if (sheet) closeSheet();
    } else if (near.f.layer.id === 'station') {
      openStation(String(near.f.properties!.name));
    } else if (near.f.layer.id === 'aircraft') {
      openAircraft(String(near.f.properties!.hex));
    } else if (near.f.layer.id === 'ships') {
      openShip(Number(near.f.properties!.mmsi));
    } else {
      openTrain(String(near.f.properties!.id));
    }
  });
  for (const layer of ['train-hit', 'station', 'aircraft', 'ships']) {
    map.on('mouseenter', layer, () => (map.getCanvas().style.cursor = 'pointer'));
    map.on('mouseleave', layer, () => (map.getCanvas().style.cursor = ''));
  }
  map.on('dragstart', () => {
    if (follow) {
      follow = false;
      renderSheet();
    }
  });
}

function applyLineFilter() {
  const visible = lines.filter((l) => !hiddenLines.has(l.id)).map((l) => l.id);
  map.setFilter('line-casing', ['in', ['get', 'id'], ['literal', visible]]);
  map.setFilter('line-main', ['in', ['get', 'id'], ['literal', visible]]);
  map.setFilter('station', ['any', ...visible.map((id) => ['in', `,${id},`, ['get', 'lines']])] as maplibregl.FilterSpecification);
  refresh();
}

function buildLineFilter() {
  const nav = $('line-filter');
  nav.innerHTML = '';
  if (LIVE_API) {
    const ship = document.createElement('button');
    ship.type = 'button';
    ship.className = `chip ${showShips ? 'on' : ''}`;
    ship.style.setProperty('--c', SHIP_COLOR);
    ship.innerHTML = '<span class="ship-mark"></span>旅客船';
    ship.setAttribute('aria-pressed', String(showShips));
    ship.addEventListener('click', () => {
      showShips = !showShips;
      saveSetting('ships', showShips);
      ship.classList.toggle('on', showShips);
      ship.setAttribute('aria-pressed', String(showShips));
      draw(nowMinutes());
    });
    for (const [key, label] of [['domestic', '国内線'], ['international', '国際線']] as const) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `chip plane ${showPlanes[key] ? 'on' : ''}`;
      b.style.setProperty('--c', PLANE_COLORS[key]);
      b.innerHTML = `<span class="plane-mark">✈</span>${label}`;
      b.setAttribute('aria-pressed', String(showPlanes[key]));
      b.addEventListener('click', () => {
        showPlanes[key] = !showPlanes[key];
        saveSetting(`planes.${key}`, showPlanes[key]);
        b.classList.toggle('on', showPlanes[key]);
        b.setAttribute('aria-pressed', String(showPlanes[key]));
        draw(nowMinutes());
      });
      nav.appendChild(b);
    }
    nav.appendChild(ship);
    nav.appendChild(Object.assign(document.createElement('span'), { className: 'chip-sep' }));
  }
  for (const l of lines) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip on';
    b.style.setProperty('--c', l.color);
    b.innerHTML = `<span class="swatch"></span>${l.name.replace('新幹線', '')}`;
    b.setAttribute('aria-pressed', 'true');
    b.addEventListener('click', () => {
      if (hiddenLines.has(l.id)) hiddenLines.delete(l.id);
      else hiddenLines.add(l.id);
      const on = !hiddenLines.has(l.id);
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', String(on));
      applyLineFilter();
    });
    nav.appendChild(b);
  }
  const place = () => document.documentElement.style.setProperty('--filter-bottom', `${Math.ceil(nav.getBoundingClientRect().bottom) + 8}px`);
  place();
  window.addEventListener('resize', place);
}

// ---- 位置の更新 ----
let lastMinute = -1;
let lastDraw = 0;

function frame(t: number) {
  const now = nowMinutes();
  const minute = Math.floor(now);
  if (minute !== lastMinute) {
    lastMinute = minute;
    update(now);
  }
  // 描画は 10fps 程度で十分
  if (t - lastDraw >= 100) {
    lastDraw = t;
    draw(now);
  }
  requestAnimationFrame(frame);
}

/** 時刻表から推定位置を計算し直す（1分ごと） */
function update(now: number) {
  const next: TrainState[] = [];
  for (const tr of timetable.trains) {
    const st = stateAt(tr, routes.get(tr.r)!, now);
    if (st && !hiddenLines.has(st.line)) next.push(st);
  }
  // 推定速度で進めていた位置との差は、数秒かけて埋める
  corrections.clear();
  for (const st of next) {
    const prev = shown.get(st.id);
    if (prev && Math.abs(prev.km - st.km) < 20) corrections.set(st.id, prev.km - st.km);
  }
  assignPlatforms(next);
  states = next;
  statesAt = now;
  updatedReal = performance.now();

  $('clock-count').dataset.trains = states.length ? `運行中 ${states.length}本` : '運行時間外';
  $('clock').classList.toggle('sim', clock.base !== null);
  renderSheet();
}

/** 前回の推定から推定速度で進めた位置を描画する */
function draw(now: number) {
  const elapsed = (now - statesAt + 1440) % 1440;
  const fade = Math.max(0, 1 - (performance.now() - updatedReal) / CORRECTION_MS);
  shown.clear();
  const spacing = TRACK_SPACING * iconScale(map.getZoom());
  const ids = new Set<string>();
  const features = states.map((st) => {
    const route = routes.get(st.train.r)!;
    const km = advance(st, elapsed) + (corrections.get(st.id) ?? 0) * fade;
    const { pos, bearing } = placeAt(route, km, st.dir);
    shown.set(st.id, { km, pos });
    ids.add(st.id);
    // 進行方向の左側へずらす（走行中は複線の片側、停車中はのりばの並び順）
    const prevSlot = slotShown.get(st.id);
    const slot = prevSlot === undefined ? slotOf(st) : prevSlot + (slotOf(st) - prevSlot) * 0.25;
    slotShown.set(st.id, slot);
    const b = (bearing * Math.PI) / 180;
    const d = (slot + 0.5) * spacing;
    const p = map.project(pos);
    const at = map.unproject([p.x - Math.cos(b) * d, p.y - Math.sin(b) * d]);
    return {
      type: 'Feature' as const,
      properties: { id: st.id, line: st.line, color: lineColor.get(st.line) ?? '#333', label: `${st.train.n}${st.train.no}`, bearing },
      geometry: { type: 'Point' as const, coordinates: [at.lng, at.lat] },
    };
  });
  for (const id of slotShown.keys()) if (!ids.has(id)) slotShown.delete(id);
  (map.getSource('trains') as GeoJSONSource | undefined)?.setData({ type: 'FeatureCollection', features });
  drawAircraft();
  $('clock-time').textContent = formatTime(Math.floor(now));

  if (sheet?.kind === 'train' && follow) {
    const p = shown.get(sheet.id);
    // ズームなどのアニメーション中は邪魔しない
    if (p && !map.isMoving()) map.jumpTo({ center: p.pos });
  }
}

/** 飛行機・旅客船は現在時刻の位置（時刻指定・早送りの影響を受けない） */
function drawAircraft() {
  const ms = Date.now();
  const visible = aircraft.filter((a) => (a.intl ? showPlanes.international : showPlanes.domestic));
  const features = visible.map((a) => ({
    type: 'Feature' as const,
    properties: { hex: a.hex, intl: a.intl, heading: a.heading ?? 0, alt: a.alt ?? 0, label: aircraftLabel(a) },
    geometry: { type: 'Point' as const, coordinates: aircraftAt(a, ms) },
  }));
  (map.getSource('aircraft') as GeoJSONSource | undefined)?.setData({ type: 'FeatureCollection', features });

  const shipList = showShips ? ships : [];
  (map.getSource('ships') as GeoJSONSource | undefined)?.setData({
    type: 'FeatureCollection',
    features: shipList.map((s) => ({
      type: 'Feature' as const,
      properties: { mmsi: s.mmsi, heading: s.heading ?? 0, label: shipLabel(s) },
      geometry: { type: 'Point' as const, coordinates: shipAt(s, ms) },
    })),
  });

  const count = $('clock-count');
  const live = LIVE_API ? `${visible.length ? ` ✈${visible.length}` : ''}${shipList.length ? ` ⛴${shipList.length}` : ''}` : '';
  const text = (count.dataset.trains ?? '') + live;
  if (count.textContent !== text) count.textContent = text;
}

/** 表示時刻や路線の表示を変えたときにすぐ反映する */
function refresh() {
  const now = nowMinutes();
  lastMinute = Math.floor(now);
  update(now);
  draw(now);
}

// ---- 下のシート（列車・駅） ----
function openTrain(id: string) {
  sheet = { kind: 'train', id };
  follow = true;
  showSheet(shown.get(id)?.pos, 8);
}

function openStation(name: string, dir: 1 | -1 = 1) {
  sheet = { kind: 'station', name, dir };
  follow = false;
  scrollToNow = true;
  const f = map.querySourceFeatures('stations', { filter: ['==', ['get', 'name'], name] })[0];
  showSheet(f ? ((f.geometry as { coordinates: [number, number] }).coordinates) : undefined, 9);
}

function openAircraft(hex: string) {
  sheet = { kind: 'aircraft', hex };
  follow = false;
  const a = aircraft.find((x) => x.hex === hex);
  showSheet(a ? aircraftAt(a, Date.now()) : undefined, map.getZoom());
}

function openShip(mmsi: number) {
  sheet = { kind: 'ship', mmsi };
  follow = false;
  const s = ships.find((x) => x.mmsi === mmsi);
  showSheet(s ? shipAt(s, Date.now()) : undefined, map.getZoom());
}

function closeSheet() {
  sheet = null;
  follow = false;
  showSheet();
}

/** シートを描画し、対象がシートに隠れない位置に来るよう地図を動かす */
function showSheet(center?: [number, number], minZoom = 8) {
  map.setFilter('train-selected', ['==', ['get', 'id'], sheet?.kind === 'train' ? sheet.id : '']);
  map.setFilter('aircraft-selected', ['==', ['get', 'hex'], sheet?.kind === 'aircraft' ? sheet.hex : '']);
  map.setFilter('ship-selected', ['==', ['get', 'mmsi'], sheet?.kind === 'ship' ? sheet.mmsi : -1]);
  renderSheet();
  const el = $('sheet');
  const desktop = matchMedia('(min-width: 768px)').matches;
  const padding = el.hidden ? { top: 0, bottom: 0, left: 0, right: 0 }
    : desktop ? { top: 0, bottom: 0, left: el.offsetWidth + 12, right: 0 }
    : { top: 110, bottom: el.offsetHeight, left: 0, right: 0 };
  if (center) map.easeTo({ center, zoom: Math.max(map.getZoom(), minZoom), padding, duration: 600 });
  else map.easeTo({ padding, duration: 300 });
}

function renderSheet() {
  const el = $('sheet');
  let html = '';
  if (sheet?.kind === 'train') html = trainSheet(sheet.id);
  else if (sheet?.kind === 'station') html = stationSheet(sheet.name, sheet.dir);
  else if (sheet?.kind === 'aircraft') html = aircraftSheet(sheet.hex);
  else if (sheet?.kind === 'ship') html = shipSheet(sheet.mmsi);
  if (!html) {
    // 列車が終着した・飛行機や船が範囲外に出たなどで表示対象がなくなった
    if (sheet && sheet.kind !== 'station') sheet = null;
    el.hidden = true;
    document.body.classList.remove('has-sheet');
    return;
  }
  el.hidden = false;
  document.body.classList.add('has-sheet');
  $('sheet-body').innerHTML = html;
  bindSheet();
  // 固定表示する見出しの高さ（時刻表の「○時」もその下に固定する）
  const headH = el.querySelector<HTMLElement>('.sticky')?.offsetHeight ?? 0;
  el.style.setProperty('--head-h', `${headH}px`);
  if (scrollToNow) {
    scrollToNow = false;
    const mark = el.querySelector<HTMLElement>('.now-line');
    el.scrollTop = mark ? mark.offsetTop - headH - (el.clientHeight - headH) / 3 : 0;
  }
}

function trainSheet(id: string): string {
  const cur = states.find((s) => s.id === id);
  if (!cur) return '';
  const route = routes.get(cur.train.r)!;
  const s = cur.train.s;
  const name = (k: number) => route.stations[s[k][0]].name;
  const dest = name(s.length - 1);
  const color = lineColor.get(cur.line) ?? '#333';
  const here = route.stations[cur.at].name;
  const curK = s.findIndex((x) => x[0] === cur.at);
  const status = cur.stopped
    ? `<b>${here}</b> に停車中`
    : `<b>${here}</b> → <b>${curK + 1 < s.length ? name(curK + 1) : dest}</b> 間を走行中`;
  const speed = cur.stopped ? '' : `<span class="speed">約 ${Math.round(cur.speed / 5) * 5} km/h</span>`;
  const next = cur.nextStop !== null ? `次の停車駅 <b>${name(cur.nextStop)}</b> ${formatTime(s[cur.nextStop][1])}着` : '';
  const off = officialFor(cur.line, here);
  const stops = s
    .map((x, k) => ({ x, k }))
    .filter(({ x }) => x[3] === 1)
    .map(({ x, k }) => {
      const passed = cur.stopped ? k < curK : k <= curK;
      const now = cur.stopped && k === curK;
      const time = k === 0 ? `${formatTime(x[2])}発` : k === s.length - 1 ? `${formatTime(x[1])}着` : `${formatTime(x[1])}着 ${formatTime(x[2])}発`;
      return `<li class="${passed ? 'passed' : ''} ${now ? 'now' : ''}"><button type="button" class="st" data-station="${name(k)}">${name(k)}</button><span class="tm">${time}</span></li>`;
    })
    .join('');

  return `
    <div class="sheet-head" style="--c:${color}">
      <span class="arrow"></span>
      <h2>${cur.train.n} ${cur.train.no}号</h2>
      <span class="sub">${dest}行</span>
    </div>
    <p class="status">${status}${speed}</p>
    <p class="next">${next}</p>
    <div class="actions">
      <button type="button" id="follow-btn" class="${follow ? 'on' : ''}">${follow ? '追従中' : '列車を追従'}</button>
      <a href="${off.url}" target="_blank" rel="noopener">${off.label} ↗</a>
    </div>
    <ol class="stops">${stops}</ol>
    <p class="small">時刻・号数は推定値です。駅名をタップするとその駅の時刻表を表示します。</p>`;
}

function stationSheet(name: string, dir: 1 | -1): string {
  const all = stationIndex.get(name) ?? [];
  const deps = (d: 1 | -1) => all.filter((e) => e.dir === d && !e.last);
  // 片方向しか発車しない駅（終着駅）はその方向を表示
  if (!deps(dir).length && deps(-dir as 1 | -1).length) dir = -dir as 1 | -1;
  const list = deps(dir);
  const now = serviceTime(nowMinutes());
  const running = new Set(states.map((s) => s.id));

  const headed = (d: 1 | -1) => {
    const count = new Map<string, number>();
    for (const e of deps(d)) count.set(e.dest, (count.get(e.dest) ?? 0) + 1);
    const top = [...count].sort((a, b) => b[1] - a[1]).slice(0, 2).map(([n]) => n);
    return top.length ? `${top.join('・')}方面` : '';
  };
  const tab = (d: 1 | -1, label: string) =>
    deps(d).length ? `<button type="button" class="tab ${d === dir ? 'on' : ''}" data-dir="${d}"><b>${label}</b><span>${headed(d)}</span></button>` : '';

  const lineChips = lines
    .filter((l) => l.stations.some((s) => s.name === name))
    .map((l) => `<span class="line-chip" style="--c:${l.color}">${l.name}</span>`)
    .join('');

  const curHour = Math.floor(now / 60);
  let marked = false;
  const hours = new Map<number, string[]>();
  for (const e of list) {
    const h = Math.floor(e.dep / 60);
    const rows = hours.get(h) ?? [];
    if (!marked && e.dep >= now) {
      rows.push(`<li class="now-line"><span>いま ${formatTime(now)}</span></li>`);
      marked = true;
    }
    const id = trainId(e.train);
    const color = lineColor.get(e.line) ?? '#333';
    rows.push(`
      <li class="${e.dep < now ? 'passed' : ''}">
        <button type="button" class="dep" ${running.has(id) ? `data-train="${id}"` : 'disabled'}>
          <span class="t">${String(Math.floor(e.dep % 60)).padStart(2, '0')}</span>
          <span class="nm" style="--c:${color}">${e.train.n}${e.train.no}</span>
          <span class="dest">${e.dest}行${e.first ? ' <small>始発</small>' : ''}</span>
          ${running.has(id) ? '<span class="live">運行中</span>' : ''}
        </button>
      </li>`);
    hours.set(h, rows);
  }
  if (!marked && list.length) {
    const h = Math.floor(list[list.length - 1].dep / 60);
    hours.get(h)!.push(`<li class="now-line"><span>いま ${formatTime(now)}（本日の発車は終了）</span></li>`);
  }
  const table = [...hours]
    .map(([h, rows]) => `<section class="hour ${h === curHour ? 'cur' : ''}"><div class="h"><span>${h % 24}<small>時</small></span></div><ul>${rows.join('')}</ul></section>`)
    .join('');

  return `
    <div class="sticky">
      <div class="sheet-head station">
        <span class="st-icon"></span>
        <h2>${name}</h2>
        <span class="sub">駅 時刻表</span>
      </div>
      <div class="line-chips">${lineChips}</div>
      <div class="tabs">${tab(1, '下り')}${tab(-1, '上り')}</div>
    </div>
    <div class="timetable">${table || '<p class="small">発車する列車はありません。</p>'}</div>
    <p class="small">推定時刻表です。「運行中」の列車をタップすると現在位置を表示します。</p>`;
}

const COMPASS = ['北', '北東', '東', '南東', '南', '南西', '西', '北西'];

function aircraftSheet(hex: string): string {
  const a = aircraft.find((x) => x.hex === hex);
  if (!a) return '';
  const color = a.intl ? PLANE_COLORS.international : PLANE_COLORS.domestic;
  const num = (x: number) => x.toLocaleString('ja-JP');
  const rows: [string, string][] = [];
  if (a.from && a.to) rows.push(['経路', `${a.from} → ${a.to}`]);
  if (a.alt !== null) rows.push(['高度', `${num(Math.round(a.alt / 100) * 100)} ft（約 ${num(Math.round((a.alt * 0.3048) / 10) * 10)} m）`]);
  if (a.gs !== null) rows.push(['対地速度', `${Math.round(a.gs)} kt（約 ${num(Math.round((a.gs * 1.852) / 10) * 10)} km/h）`]);
  if (a.heading !== null) rows.push(['進行方向', `${Math.round(a.heading)}°（${COMPASS[Math.round(a.heading / 45) % 8]}）`]);
  if (a.type) rows.push(['機種', a.type]);
  if (a.reg) rows.push(['登録記号', a.reg]);
  const age = Math.round((Date.now() - a.at) / 1000);
  return `
    <div class="sheet-head" style="--c:${color}">
      <span class="plane-mark big">✈</span>
      <h2>${aircraftLabel(a)}</h2>
      <span class="badge-type">${a.intl ? '国際線' : '国内線'}</span>
    </div>
    <dl class="facts">${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>
    <div class="actions">
      <a href="https://adsb.lol/?icao=${a.hex}" target="_blank" rel="noopener">adsb.lol で詳しく見る ↗</a>
    </div>
    <p class="small">ADS-B の受信データ（約${age}秒前の位置から推定）。国内線・国際線は便名の経路から判定し、不明な場合は航空会社や登録国から推定しています。</p>`;
}

function shipSheet(mmsi: number): string {
  const s = ships.find((x) => x.mmsi === mmsi);
  if (!s) return '';
  const rows: [string, string][] = [];
  rows.push(['状態', s.moving ? '航行中' : '停泊中・停船中']);
  if (s.sog !== null) rows.push(['速力', `${s.sog.toFixed(1)} ノット（約 ${Math.round(s.sog * 1.852)} km/h）`]);
  if (s.heading !== null) rows.push(['船首の向き', `${Math.round(s.heading)}°（${COMPASS[Math.round(s.heading / 45) % 8]}）`]);
  if (s.dest) rows.push(['行先（AIS）', s.dest]);
  if (s.length) rows.push(['全長', `約 ${s.length} m`]);
  rows.push(['MMSI', String(s.mmsi)]);
  const age = Math.round((Date.now() - s.at) / 1000);
  return `
    <div class="sheet-head" style="--c:${SHIP_COLOR}">
      <span class="ship-mark big"></span>
      <h2>${shipLabel(s)}</h2>
      <span class="badge-type ship">旅客船</span>
    </div>
    <dl class="facts">${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>
    <div class="actions">
      <a href="https://www.vesselfinder.com/vessels/details/${s.mmsi}" target="_blank" rel="noopener">VesselFinder で詳しく見る ↗</a>
    </div>
    <p class="small">AIS の受信データ（約${age}秒前の位置から推定）。行先は船から送られた文字をそのまま表示しています。</p>`;
}

function bindSheet() {
  const body = $('sheet-body');
  body.querySelector('#follow-btn')?.addEventListener('click', () => {
    follow = !follow;
    if (follow && sheet?.kind === 'train') {
      const p = shown.get(sheet.id);
      if (p) map.easeTo({ center: p.pos, duration: 500 });
    }
    renderSheet();
  });
  body.querySelectorAll<HTMLButtonElement>('[data-station]').forEach((b) =>
    b.addEventListener('click', () => openStation(b.dataset.station!)),
  );
  body.querySelectorAll<HTMLButtonElement>('[data-train]').forEach((b) =>
    b.addEventListener('click', () => openTrain(b.dataset.train!)),
  );
  body.querySelectorAll<HTMLButtonElement>('[data-dir]').forEach((b) =>
    b.addEventListener('click', () => {
      if (sheet?.kind !== 'station') return;
      sheet.dir = Number(b.dataset.dir) as 1 | -1;
      scrollToNow = true;
      renderSheet();
    }),
  );
}

// ---- パネル操作 ----
function togglePanel(id: string, force?: boolean) {
  const el = $(id);
  const open = force ?? el.hidden;
  for (const p of ['time-panel', 'info-panel']) $(p).hidden = true;
  el.hidden = !open;
}
$('sheet-close').addEventListener('click', closeSheet);
$('clock').addEventListener('click', () => {
  ($('time-input') as HTMLInputElement).value = formatTime(nowMinutes());
  togglePanel('time-panel');
});
$('info-btn').addEventListener('click', () => togglePanel('info-panel'));
$('info-close').addEventListener('click', () => togglePanel('info-panel', false));
$('time-input').addEventListener('change', (e) => {
  const v = (e.target as HTMLInputElement).value;
  if (!v) return;
  const [h, m] = v.split(':').map(Number);
  setClock(h * 60 + m);
  scrollToNow = true;
  refresh();
});
document.querySelectorAll<HTMLButtonElement>('.speed button').forEach((b) =>
  b.addEventListener('click', () => {
    setClock(nowMinutes(), Number(b.dataset.speed));
    document.querySelectorAll('.speed button').forEach((x) => x.classList.toggle('on', x === b));
  }),
);
$('time-now').addEventListener('click', () => {
  setClock(null, 1);
  document.querySelectorAll('.speed button').forEach((x) => x.classList.toggle('on', (x as HTMLButtonElement).dataset.speed === '1'));
  togglePanel('time-panel', false);
  scrollToNow = true;
  refresh();
});

init().catch((err) => {
  console.error(err);
  $('clock-count').textContent = 'データの読み込みに失敗しました';
});
