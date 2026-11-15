import * as maplibregl from 'maplibre-gl';
import type { GeoJSONSource, StyleSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url';
import './style.css';
import { buildRoutes, distKm, loadData, type Airport, type GeoJSONData, type Line, type Route, type Timetable, type Train } from './data';
import { aircraftAt, aircraftLabel, fetchAircraft, LIVE_API, type Aircraft } from './aircraft';
import { inArea, setArea, type AreaFeature } from './area';
import { addIcons, PLANE_COLORS, SHIP_COLOR } from './icons';
import { fetchShips, shipAt, shipLabel, type Ship } from './ships';
import { advance, formatTime, jstNowMinutes, placeAt, stateAt, trainId, type TrainState } from './simulate';
import { airportCode } from './names-en';
import { fetchSchedule, ScheduleError, SCHEDULE_KEY, testKey, type Scheduled, type ScheduleErrorKind } from './schedule';
import { airportName, lang, lineName, lineShort, setLang, station, t, trainLabel, trainTitle, type Lang } from './i18n';
import { effectiveTheme, getTheme, onThemeChange, setTheme, type Theme } from './theme';
import { getApiKey, GOOGLE_CLIENT_ID, isFav, onUserChange, setApiKey, preloadGoogle, refresh as refreshUser, saveSettings, signIn, signOut, toggleFav, user, type FavKind } from './user';

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

const OFFICIAL = {
  jrc: 'https://traininfo.jr-central.co.jp/shinkansen/sp/ja/ti08.html',
  jrw: 'https://trafficinfo.westjr.co.jp/sanyo.html',
  jre: 'https://traininfo.jreast.co.jp/train_info/shinkansen.aspx',
  jrh: 'https://www3.jrhokkaido.co.jp/webunkou/',
  jrk: 'https://www.jrkyushu.co.jp/trains/info/',
};
const HOKURIKU_WEST = new Set(['糸魚川', '黒部宇奈月温泉', '富山', '新高岡', '金沢', '小松', '加賀温泉', '芦原温泉', '福井', '越前たけふ', '敦賀']);
function officialFor(line: string, station: string): { label: string; url: string } {
  const key: keyof typeof OFFICIAL = line === 'tokaido' ? 'jrc'
    : line === 'sanyo' || (line === 'hokuriku' && HOKURIKU_WEST.has(station)) ? 'jrw'
    : line === 'kyushu' || line === 'nishikyushu' ? 'jrk'
    : line === 'hokkaido' ? 'jrh'
    : 'jre';
  return { label: t().official[key], url: OFFICIAL[key] };
}

const SEA = '#bed2ff'; // 地理院タイル（淡色地図）の海の色
// 配色ごとの色。ダークモードは地図の画像を反転して暗くし、範囲の外は海より暗い色にする
const PALETTE = {
  light: { sea: SEA, outside: '#ffffff', eez: '#3d6fb6', casing: '#ffffff', text: '#222222', textMuted: '#4a5568', halo: '#ffffff',
    ship: SHIP_COLOR, plane: '#8a6a00', planeIntl: '#d6247e' },
  dark: { sea: '#1a2332', outside: '#0b0f14', eez: '#7fa8e0', casing: '#0b0f14', text: '#e6edf3', textMuted: '#aab4c2', halo: '#0b0f14',
    ship: '#5fc4ff', plane: '#ffd84d', planeIntl: '#ff8fc4' },
};

const style: StyleSpecification = {
  version: 8,
  glyphs: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
  sources: {
    gsi: {
      type: 'raster',
      tiles: ['https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png'],
      tileSize: 256,
      maxzoom: 18,
      // 言語を切り替えても変わらないので、日本語・英語のどちらでも分かる表記にする
      attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener">国土地理院 GSI Japan</a> | 国土数値情報 MLIT'
        + ' | EEZ: <a href="https://www.marineregions.org" target="_blank" rel="noopener">Marine Regions</a> (CC BY 4.0)'
        + ' | ✈ <a href="https://adsb.lol" target="_blank" rel="noopener">adsb.lol</a> (ODbL), <a href="https://www.adsbdb.com" target="_blank" rel="noopener">adsbdb</a>'
        + ' | ⛴ <a href="https://aisstream.io" target="_blank" rel="noopener">aisstream.io</a>',
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
  // 対象範囲（EEZ: 東経122〜158度・北緯17〜48度）に少し余白を足した範囲
  maxBounds: [[114, 12], [166, 53]],
  attributionControl: { compact: true },
  dragRotate: false,
  pitchWithRotate: false,
  renderWorldCopies: false,
});
map.touchZoomRotate.disableRotation();
if (import.meta.env.DEV) Object.assign(window, { __map: map });
map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');
// 現在地: 起動時に取得して少し拡大した位置に寄せ、その後も動きに合わせて表示する
const geolocate = new maplibregl.GeolocateControl({
  positionOptions: { enableHighAccuracy: true },
  trackUserLocation: true,
  fitBoundsOptions: { maxZoom: 9 },
});
map.addControl(geolocate, 'bottom-right');
geolocate.once('geolocate', (e: { coords: GeolocationCoordinates }) => {
  // 対象範囲の外（海外など）にいるときは日本全体の表示に戻す
  if (!inArea([e.coords.longitude, e.coords.latitude])) map.fitBounds(JAPAN, { padding: 40 });
});

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
let area: AreaFeature;
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
  | { kind: 'airport'; name: string; intl: boolean }
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

// 登録した（トラッキング中の）もの。飛行機は便名・コールサイン・機体のどれで登録しても一致させる
/** 登録に使うキー: 登録済みならそのキー、未登録なら 便名 → コールサイン → 機体（hex） */
const aircraftKey = (a: Aircraft) => [a.flight, a.callsign, a.hex].find((k) => k && isFav('aircraft', k)) ?? (a.flight || a.callsign || a.hex);
const aircraftFav = (a: Aircraft) => isFav('aircraft', aircraftKey(a));
const shipFav = (s: Ship) => isFav('ship', String(s.mmsi));

// 駅に停車中の列車は、のりば（番線）のように線路と直角方向へ並べる。
// 左側通行なので、下り・上りそれぞれ進行方向の左側に、到着順に詰めて並べる（推定）。
const platforms = new Map<string, Map<string, number>>(); // `${駅}|${路線}|${向き}` -> 列車id -> 並び順
const slotShown = new Map<string, number>();
const TRACK_SPACING = 13; // 少し重なる程度の間隔（アイコン幅18に対して）
// 列車アイコンの大きさ [ズーム, 倍率]（地図の表示設定と、のりばの間隔の計算で共用）
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
  area = data.area;
  setArea(area);
  routes = buildRoutes(data.network);
  for (const l of lines) lineColor.set(l.id, l.color);
  buildStationIndex();
  await new Promise<void>((resolve) => (map.loaded() ? resolve() : map.once('load', () => resolve())));
  await addIcons(map, lines);
  addLayers();
  buildLineFilter();
  requestAnimationFrame(frame);
  // 出典表記は長いので最初はたたむ（ⓘで開ける）
  document.querySelector('.maplibregl-ctrl-attrib')?.classList.remove('maplibregl-compact-show');
  // 位置情報が使えれば現在地に寄せる（許可されなければ日本全体のまま）
  if ('geolocation' in navigator) geolocate.trigger();
  setupUser();
  if (LIVE_API) {
    startPolling(async () => {
      aircraft = (await fetchAircraft(aircraft)).filter((a) => inArea([a.lon, a.lat]));
      if (sheet?.kind === 'aircraft' || sheet?.kind === 'airport') renderSheet();
      renderMyPanel();
    });
    startPolling(async () => {
      ships = (await fetchShips(ships)).filter((s) => inArea([s.lon, s.lat]));
      if (sheet?.kind === 'ship') renderSheet();
      renderMyPanel();
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

// 登録した（トラッキング中の）ものは縁取りの太いアイコン（icons.ts の「-fav」）にする
const FAV: maplibregl.ExpressionSpecification = ['==', ['get', 'fav'], true];
const FAV_SUFFIX: maplibregl.ExpressionSpecification = ['case', FAV, '-fav', ''];

/** ライト・ダークに合わせて、地図の色（背景・地図画像・範囲外・線・文字）を切り替える */
function applyMapTheme() {
  if (!map.getLayer('mask')) return;
  const dark = effectiveTheme() === 'dark';
  const c = PALETTE[dark ? 'dark' : 'light'];
  map.setPaintProperty('sea', 'background-color', c.sea);
  // 地図画像（淡色地図）は、ダークでは明暗を反転して色相を戻す（白地・黒文字 → 暗い地・明るい文字）
  map.setPaintProperty('gsi', 'raster-brightness-min', dark ? 0.9 : 0);
  map.setPaintProperty('gsi', 'raster-brightness-max', dark ? 0.1 : 1);
  map.setPaintProperty('gsi', 'raster-hue-rotate', dark ? 180 : 0);
  map.setPaintProperty('gsi', 'raster-saturation', dark ? -0.2 : 0);
  map.setPaintProperty('mask', 'fill-color', c.outside);
  map.setPaintProperty('eez-line', 'line-color', c.eez);
  map.setPaintProperty('line-casing', 'line-color', c.casing);
  const text = (id: string, color: maplibregl.ExpressionSpecification | string) => {
    map.setPaintProperty(id, 'text-color', color);
    map.setPaintProperty(id, 'text-halo-color', c.halo);
  };
  text('airport', c.textMuted);
  text('station', c.text);
  text('ships-label', c.ship);
  text('aircraft-label', ['case', ['get', 'intl'], c.planeIntl, c.plane]);
  // 列車の名前は路線の色。ダークでは暗い路線色が沈むので明るい文字にする
  text('trains-label', dark ? c.text : ['get', 'color']);
}

const TAPPABLE = ['train-hit', 'station', 'airport', 'aircraft', 'ships'];
const AIRPORT_LABEL: maplibregl.ExpressionSpecification = ['format',
  ['get', 'title'], {},
  ['case', ['==', ['get', 'code'], ''], '', ['concat', '\n', ['get', 'code']]], { 'font-scale': 0.9 },
];

function addLayers() {
  map.addSource('mask', { type: 'geojson', data: mask });
  map.addSource('area', { type: 'geojson', data: area as unknown as GeoJSONData });
  map.addSource('lines', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: lines.map((l) => ({ type: 'Feature', properties: { id: l.id, color: l.color }, geometry: { type: 'LineString', coordinates: l.coords } })),
    },
  });
  for (const l of lines) {
    for (const s of l.stations) {
      const st = stationMap.get(s.name) ?? { name: s.name, lng: s.lng, lat: s.lat, lines: [] };
      st.lines.push(l.id);
      stationMap.set(s.name, st);
    }
  }
  map.addSource('stations', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
  drawStations();
  map.addSource('airports', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
  drawAirports();
  map.addSource('trains', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
  map.addSource('aircraft', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
  map.addSource('ships', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });

  // 対象範囲（日本の排他的経済水域）の外は白く隠し、境界を破線で示す
  map.addLayer({ id: 'mask', type: 'fill', source: 'mask', paint: { 'fill-color': PALETTE.light.outside, 'fill-antialias': false } });
  map.addLayer({
    id: 'eez-line', type: 'line', source: 'area',
    layout: { 'line-join': 'round' },
    paint: { 'line-color': '#3d6fb6', 'line-width': ['interpolate', ['linear'], ['zoom'], 4, 1, 8, 2], 'line-dasharray': [3, 2], 'line-opacity': 0.8 },
  });
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
      // 駅名と同じタイミングで出す: 定期便のある空港は主要駅と同じ 6.5、そのほかの飛行場は 7.5 から。
      // 空港名の下に改行して 3 文字の空港コード（HND など）
      'text-field': ['step', ['zoom'], '',
        6.5, ['case', ['==', ['get', 'code'], ''], '', AIRPORT_LABEL],
        7.5, AIRPORT_LABEL],
      'text-font': ['Noto Sans Regular'],
      'text-size': 11,
      'text-offset': [0, 1.2],
      'text-anchor': 'top',
      'text-optional': true,
    },
    paint: { 'text-color': '#4a5568', 'text-halo-color': '#fff', 'text-halo-width': 1.5 },
  });
  map.addLayer({
    id: 'station', type: 'symbol', source: 'stations',
    layout: {
      // お気に入りの駅は縮小しても出す
      'icon-image': ['step', ['zoom'], ['case', FAV, 'station-fav', ''], 6, ['case', FAV, 'station-fav', 'station']],
      'icon-size': ['interpolate', ['linear'], ['zoom'], 6, ['case', ['==', ['get', 'major'], 1], 0.6, 0.45], 10, 0.9],
      'icon-allow-overlap': true,
      'symbol-sort-key': ['case', FAV, -1, ['-', 1, ['get', 'major']]],
      // 主要駅（路線の接続駅）とお気に入りの駅は早めに、その他の駅はズームしてから駅名を出す
      'text-field': ['step', ['zoom'], ['case', FAV, ['get', 'title'], ''],
        6.5, ['case', ['any', FAV, ['==', ['get', 'major'], 1]], ['get', 'title'], ''], 7.5, ['get', 'title']],
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
      'icon-image': ['case', FAV, 'ship-fav', 'ship'],
      'icon-size': ['interpolate', ['linear'], ['zoom'], 4, 0.45, 7, 0.65, 10, 0.95],
      'icon-rotate': ['get', 'heading'],
      'icon-rotation-alignment': 'map',
      'icon-allow-overlap': true,
      'icon-ignore-placement': true,
    },
  });
  map.addLayer({
    id: 'ship-selected', type: 'circle', source: 'ships',
    filter: ['==', ['get', 'mmsi'], -1],
    paint: { 'circle-radius': 15, 'circle-color': 'rgba(0,0,0,0)', 'circle-stroke-color': '#111', 'circle-stroke-width': 2.5 },
  });
  map.addLayer({
    id: 'aircraft', type: 'symbol', source: 'aircraft',
    layout: {
      'icon-image': ['concat', ['case', ['get', 'intl'], 'plane-international', 'plane-domestic'], FAV_SUFFIX],
      'icon-size': ['interpolate', ['linear'], ['zoom'], 4, 0.45, 7, 0.65, 10, 0.9],
      'icon-rotate': ['get', 'heading'],
      'icon-rotation-alignment': 'map',
      'icon-allow-overlap': true,
      'icon-ignore-placement': true,
      'symbol-sort-key': ['get', 'alt'],
    },
  });
  // 拡大したら、アイコンの上へ列車名・便名・船名を出す（トラッキング中のものは縮小しても出す）
  const label = (source: string, color: maplibregl.ExpressionSpecification | string) =>
    map.addLayer({
      id: `${source}-label`, type: 'symbol', source,
      layout: {
        'text-field': ['step', ['zoom'], ['case', FAV, ['get', 'label'], ''], 7, ['get', 'label']],
        'symbol-sort-key': ['case', FAV, 0, 1],
        'text-font': ['Noto Sans Regular'],
        'text-size': 12,
        'text-offset': [0, -1.6],
        'text-anchor': 'bottom',
        'text-allow-overlap': false,
      },
      paint: { 'text-color': color, 'text-halo-color': '#fff', 'text-halo-width': 2 },
    });
  label('ships', SHIP_COLOR);
  label('aircraft', ['case', ['get', 'intl'], '#d6247e', '#8a6a00']);
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
      'icon-image': ['concat', 'train-', ['get', 'line'], FAV_SUFFIX],
      'icon-size': ['interpolate', ['linear'], ['zoom'], ...ICON_SCALE.flat()],
      'icon-rotate': ['get', 'bearing'],
      'icon-rotation-alignment': 'map',
      'icon-allow-overlap': true,
      'icon-ignore-placement': true,
    },
  });
  label('trains', ['get', 'color']);
  // タップしやすいように透明な大きめの当たり判定
  map.addLayer({
    id: 'train-hit', type: 'circle', source: 'trains',
    paint: { 'circle-radius': 18, 'circle-color': '#000', 'circle-opacity': 0 },
  });

  applyMapTheme();
  onThemeChange(applyMapTheme);

  map.on('click', (e) => {
    // 列車・駅・空港・飛行機・船のうち、タップした位置に最も近いもの
    const r = 14;
    const near = map
      .queryRenderedFeatures([[e.point.x - r, e.point.y - r], [e.point.x + r, e.point.y + r]], { layers: TAPPABLE })
      .map((f) => ({ f, d: map.project((f.geometry as { coordinates: [number, number] }).coordinates).dist(e.point) }))
      .sort((a, b) => a.d - b.d)[0];
    if (!near) {
      if (sheet) closeSheet();
    } else if (near.f.layer.id === 'station') {
      openStation(String(near.f.properties!.name));
    } else if (near.f.layer.id === 'airport') {
      openAirport(String(near.f.properties!.name));
    } else if (near.f.layer.id === 'aircraft') {
      openAircraft(String(near.f.properties!.hex));
    } else if (near.f.layer.id === 'ships') {
      openShip(Number(near.f.properties!.mmsi));
    } else {
      openTrain(String(near.f.properties!.id));
    }
  });
  for (const layer of TAPPABLE) {
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

const stationMap = new Map<string, { name: string; lng: number; lat: number; lines: string[] }>();
/** 駅（お気に入りの駅は縁取りを太くするので、登録を変えたら描き直す） */
function drawStations() {
  setData('stations', [...stationMap.values()].map((s) => ({
    type: 'Feature',
    properties: { name: s.name, title: station(s.name), lines: `,${s.lines.join(',')},`, major: s.lines.length > 1 ? 1 : 0, fav: isFav('station', s.name) },
    geometry: { type: 'Point', coordinates: [s.lng, s.lat] },
  })));
}

/** 空港（言語を切り替えたら描き直す） */
function drawAirports() {
  setData('airports', airports.map((a) => ({
    type: 'Feature',
    properties: { name: a.name, title: airportName(a.name), code: airportCode(a.name) },
    geometry: { type: 'Point', coordinates: [a.lng, a.lat] },
  })));
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
    ship.innerHTML = `<span class="ship-mark"></span>${t().ships}`;
    ship.setAttribute('aria-pressed', String(showShips));
    ship.addEventListener('click', () => {
      showShips = !showShips;
      saveSetting('ships', showShips);
      saveSettings({ ships: showShips });
      ship.classList.toggle('on', showShips);
      ship.setAttribute('aria-pressed', String(showShips));
      drawLive();
    });
    for (const [key, label] of [['domestic', t().domestic], ['international', t().international]] as const) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `chip plane ${showPlanes[key] ? 'on' : ''}`;
      b.style.setProperty('--c', PLANE_COLORS[key]);
      b.innerHTML = `<span class="plane-mark">✈</span>${label}`;
      b.setAttribute('aria-pressed', String(showPlanes[key]));
      b.addEventListener('click', () => {
        showPlanes[key] = !showPlanes[key];
        saveSetting(`planes.${key}`, showPlanes[key]);
        saveSettings({ [key]: showPlanes[key] });
        b.classList.toggle('on', showPlanes[key]);
        b.setAttribute('aria-pressed', String(showPlanes[key]));
        drawLive();
      });
      nav.appendChild(b);
    }
    nav.appendChild(ship);
    nav.appendChild(Object.assign(document.createElement('span'), { className: 'chip-sep' }));
  }
  for (const l of lines) {
    const b = document.createElement('button');
    b.type = 'button';
    const visible = !hiddenLines.has(l.id);
    b.className = `chip ${visible ? 'on' : ''}`;
    b.style.setProperty('--c', l.color);
    b.innerHTML = `<span class="swatch"></span>${lineShort(l)}`;
    b.setAttribute('aria-pressed', String(visible));
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
  placeLineFilter();
}
const placeLineFilter = () =>
  document.documentElement.style.setProperty('--filter-bottom', `${Math.ceil($('line-filter').getBoundingClientRect().bottom) + 8}px`);
window.addEventListener('resize', placeLineFilter);

// ---- 位置の更新 ----
let lastMinute = -1;
let lastDraw = 0;
let lastLiveDraw = 0;

function frame(t: number) {
  const now = nowMinutes();
  const minute = Math.floor(now);
  if (minute !== lastMinute) {
    lastMinute = minute;
    update(now);
  }
  // 列車は 10fps 程度で十分。飛行機・船は 250ms で動く距離が拡大時でも 1px 程度なので 4fps
  if (t - lastDraw >= 100) {
    lastDraw = t;
    draw(now);
  }
  if (t - lastLiveDraw >= 250) {
    lastLiveDraw = t;
    drawLive();
  }
  requestAnimationFrame(frame);
}

type Feature = { type: 'Feature'; properties: Record<string, unknown>; geometry: { type: 'Point'; coordinates: [number, number] } };
const setData = (source: string, features: Feature[]) =>
  (map.getSource(source) as GeoJSONSource | undefined)?.setData({ type: 'FeatureCollection', features });

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

  $('clock-count').dataset.trains = states.length ? t().running(states.length) : t().noService;
  $('clock').classList.toggle('sim', clock.base !== null);
  renderSheet();
  renderMyPanel();
}

/** 前回の推定から推定速度で進めた位置を描画する */
function draw(now: number) {
  const elapsed = (now - statesAt + 1440) % 1440;
  const fade = Math.max(0, 1 - (performance.now() - updatedReal) / CORRECTION_MS);
  shown.clear();
  const spacing = TRACK_SPACING * iconScale(map.getZoom());
  const ids = new Set<string>();
  const features = states.map((st): Feature => {
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
      type: 'Feature',
      properties: { id: st.id, line: st.line, color: lineColor.get(st.line) ?? '#333', label: trainLabel(st.train.n, st.train.no), bearing, fav: isFav('train', st.id) },
      geometry: { type: 'Point', coordinates: [at.lng, at.lat] },
    };
  });
  for (const id of slotShown.keys()) if (!ids.has(id)) slotShown.delete(id);
  setData('trains', features);
  const time = formatTime(Math.floor(now));
  const clockTime = $('clock-time');
  if (clockTime.textContent !== time) clockTime.textContent = time;

  if (sheet?.kind === 'train' && follow) {
    const p = shown.get(sheet.id);
    // ズームなどのアニメーション中は邪魔しない
    if (p && !map.isMoving()) map.jumpTo({ center: p.pos });
  }
}

/** 飛行機・旅客船は現在時刻の位置（時刻指定・早送りの影響を受けない） */
function drawLive() {
  const ms = Date.now();
  const visible = aircraft.filter((a) => (a.intl ? showPlanes.international : showPlanes.domestic));
  setData('aircraft', visible.map((a) => ({
    type: 'Feature',
    properties: { hex: a.hex, intl: a.intl, heading: a.heading ?? 0, alt: a.alt ?? 0, label: aircraftLabel(a), fav: aircraftFav(a) },
    geometry: { type: 'Point', coordinates: aircraftAt(a, ms) },
  })));

  const shipList = showShips ? ships : [];
  setData('ships', shipList.map((s) => ({
    type: 'Feature',
    properties: { mmsi: s.mmsi, heading: s.heading ?? 0, label: shipLabel(s), fav: shipFav(s) },
    geometry: { type: 'Point', coordinates: shipAt(s, ms) },
  })));

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

function openAirport(name: string) {
  // 国内線の便があれば国内線のタブ、なければ国際線のタブから
  const code = airportCode(name);
  const intl = !!code && !airportFlights(code).some((f) => !f.a.intl) && airportFlights(code).some((f) => f.a.intl);
  sheet = { kind: 'airport', name, intl };
  follow = false;
  scrollToNow = true;
  loadSchedule(code);
  const ap = airports.find((a) => a.name === name);
  showSheet(ap ? [ap.lng, ap.lat] : undefined, map.getZoom());
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
  else if (sheet?.kind === 'airport') html = airportSheet(sheet.name, sheet.intl);
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

/** 見出しに置く登録ボタン（ログイン機能がないときは出さない） */
function favButton(kind: FavKind, id: string, label: string): string {
  if (!GOOGLE_CLIENT_ID) return '';
  const on = isFav(kind, id);
  const text = kind === 'station' ? t().favStation : on ? t().tracking : t().track;
  return `<button type="button" class="fav-btn ${on ? 'on' : ''}" aria-pressed="${on}" data-fav-kind="${kind}" data-fav-id="${escapeHtml(id)}" data-fav-label="${escapeHtml(label)}">
    <span aria-hidden="true">${on ? '★' : '☆'}</span>${text}</button>`;
}
const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function trainSheet(id: string): string {
  const cur = states.find((s) => s.id === id);
  if (!cur) return '';
  const route = routes.get(cur.train.r)!;
  const s = cur.train.s;
  const tx = t();
  const key = (k: number) => route.stations[s[k][0]].name;
  const name = (k: number) => station(key(k));
  const dest = name(s.length - 1);
  const color = lineColor.get(cur.line) ?? '#333';
  const here = route.stations[cur.at].name;
  const curK = s.findIndex((x) => x[0] === cur.at);
  const status = cur.stopped
    ? tx.stoppedAt(station(here))
    : tx.runningBetween(station(here), curK + 1 < s.length ? name(curK + 1) : dest);
  const speed = cur.stopped ? '' : `<span class="speed">${tx.speed(Math.round(cur.speed / 5) * 5)}</span>`;
  const next = cur.nextStop !== null ? tx.nextStop(name(cur.nextStop), formatTime(s[cur.nextStop][1])) : '';
  const off = officialFor(cur.line, here);
  const stops = s
    .map((x, k) => ({ x, k }))
    .filter(({ x }) => x[3] === 1)
    .map(({ x, k }) => {
      const passed = cur.stopped ? k < curK : k <= curK;
      const now = cur.stopped && k === curK;
      const time = k === 0 ? tx.dep(formatTime(x[2]))
        : k === s.length - 1 ? tx.arr(formatTime(x[1]))
        : `${tx.arr(formatTime(x[1]))} ${tx.dep(formatTime(x[2]))}`;
      return `<li class="${passed ? 'passed' : ''} ${now ? 'now' : ''}"><button type="button" class="st" data-station="${key(k)}">${name(k)}</button><span class="tm">${time}</span></li>`;
    })
    .join('');

  return `
    <div class="sheet-head" style="--c:${color}">
      <span class="arrow"></span>
      <h2>${trainTitle(cur.train.n, cur.train.no)}</h2>
      <span class="sub">${tx.bound(dest)}</span>
      ${favButton('train', id, trainTitle(cur.train.n, cur.train.no))}
    </div>
    <p class="status">${status}${speed}</p>
    <p class="next">${next}</p>
    <div class="actions">
      <button type="button" id="follow-btn" class="${follow ? 'on' : ''}">${follow ? tx.following : tx.follow}</button>
      <a href="${off.url}" target="_blank" rel="noopener">${off.label} ↗</a>
    </div>
    <ol class="stops">${stops}</ol>
    <p class="small">${tx.trainNote}</p>`;
}

function stationSheet(name: string, dir: 1 | -1): string {
  const all = stationIndex.get(name) ?? [];
  const deps = (d: 1 | -1) => all.filter((e) => e.dir === d && !e.last);
  // 片方向しか発車しない駅（終着駅）はその方向を表示
  if (!deps(dir).length && deps(-dir as 1 | -1).length) dir = -dir as 1 | -1;
  const list = deps(dir);
  const now = serviceTime(nowMinutes());
  const running = new Set(states.map((s) => s.id));
  const tx = t();

  const headed = (d: 1 | -1) => {
    const count = new Map<string, number>();
    for (const e of deps(d)) count.set(e.dest, (count.get(e.dest) ?? 0) + 1);
    const top = [...count].sort((a, b) => b[1] - a[1]).slice(0, 2).map(([n]) => station(n));
    return top.length ? tx.toward(top) : '';
  };
  const tab = (d: 1 | -1, label: string) =>
    deps(d).length ? `<button type="button" class="tab ${d === dir ? 'on' : ''}" data-dir="${d}"><b>${label}</b><span>${headed(d)}</span></button>` : '';

  const lineChips = lines
    .filter((l) => l.stations.some((s) => s.name === name))
    .map((l) => `<span class="line-chip" style="--c:${l.color}">${lineName(l)}</span>`)
    .join('');

  const curHour = Math.floor(now / 60);
  let marked = false;
  const hours = new Map<number, string[]>();
  for (const e of list) {
    const h = Math.floor(e.dep / 60);
    const rows = hours.get(h) ?? [];
    if (!marked && e.dep >= now) {
      rows.push(`<li class="now-line"><span>${tx.now(formatTime(now))}</span></li>`);
      marked = true;
    }
    const id = trainId(e.train);
    const color = lineColor.get(e.line) ?? '#333';
    rows.push(`
      <li class="${e.dep < now ? 'passed' : ''}">
        <button type="button" class="dep" ${running.has(id) ? `data-train="${id}"` : 'disabled'}>
          <span class="t">${String(Math.floor(e.dep % 60)).padStart(2, '0')}</span>
          <span class="nm" style="--c:${color}">${trainLabel(e.train.n, e.train.no)}</span>
          <span class="dest">${tx.bound(station(e.dest))}${e.first ? ` <small>${tx.origin}</small>` : ''}</span>
          ${running.has(id) ? `<span class="live">${tx.live}</span>` : ''}
        </button>
      </li>`);
    hours.set(h, rows);
  }
  if (!marked && list.length) {
    const h = Math.floor(list[list.length - 1].dep / 60);
    hours.get(h)!.push(`<li class="now-line"><span>${tx.nowEnded(formatTime(now))}</span></li>`);
  }
  const table = [...hours]
    .map(([h, rows]) => `<section class="hour ${h === curHour ? 'cur' : ''}"><div class="h"><span>${h % 24}<small>${tx.hour}</small></span></div><ul>${rows.join('')}</ul></section>`)
    .join('');

  return `
    <div class="sticky">
      <div class="sheet-head station">
        <span class="st-icon"></span>
        <h2>${station(name)}</h2>
        <span class="sub">${tx.timetable}</span>
        ${favButton('station', name, tx.stationOf(station(name)))}
      </div>
      <div class="line-chips">${lineChips}</div>
      <div class="tabs">${tab(1, tx.down)}${tab(-1, tx.up)}</div>
    </div>
    <div class="timetable">${table || `<p class="small">${tx.noDepartures}</p>`}</div>
    <p class="small">${tx.stationNote}</p>`;
}

const compass = (deg: number) => t().compass[Math.round(deg / 45) % 8];

function aircraftSheet(hex: string): string {
  const a = aircraft.find((x) => x.hex === hex);
  if (!a) return '';
  const tx = t();
  const color = a.intl ? PLANE_COLORS.international : PLANE_COLORS.domestic;
  const num = (x: number) => x.toLocaleString(lang === 'en' ? 'en-US' : 'ja-JP');
  const rows: [string, string][] = [];
  if (a.flight && a.callsign) rows.push([tx.callsign, a.callsign]);
  if (a.from && a.to) rows.push([tx.route, `${a.from} → ${a.to}`]);
  if (a.alt !== null) rows.push([tx.altitude, `${num(Math.round(a.alt / 100) * 100)} ft (${tx.about(num(Math.round((a.alt * 0.3048) / 10) * 10))} m)`]);
  if (a.gs !== null) rows.push([tx.groundSpeed, `${Math.round(a.gs)} kt (${tx.about(num(Math.round((a.gs * 1.852) / 10) * 10))} km/h)`]);
  if (a.heading !== null) rows.push([tx.heading, `${Math.round(a.heading)}° (${compass(a.heading)})`]);
  if (a.type) rows.push([tx.aircraftType, a.type]);
  if (a.reg) rows.push([tx.registration, a.reg]);
  const age = Math.round((Date.now() - a.at) / 1000);
  return `
    <div class="sheet-head" style="--c:${color}">
      <span class="plane-mark big">✈</span>
      <h2>${aircraftLabel(a)}</h2>
      <span class="badge-type">${a.intl ? tx.international : tx.domestic}</span>
      ${favButton('aircraft', aircraftKey(a), aircraftLabel(a))}
    </div>
    <dl class="facts">${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>
    <div class="actions">
      <a href="https://adsb.lol/?icao=${a.hex}" target="_blank" rel="noopener">${tx.moreOn('adsb.lol')}</a>
    </div>
    <p class="small">${tx.aircraftNote(age)}</p>`;
}

function shipSheet(mmsi: number): string {
  const s = ships.find((x) => x.mmsi === mmsi);
  if (!s) return '';
  const tx = t();
  const rows: [string, string][] = [];
  rows.push([tx.status, s.moving ? tx.underway : tx.moored]);
  if (s.sog !== null) rows.push([tx.shipSpeed, `${s.sog.toFixed(1)} ${tx.knots} (${tx.about(String(Math.round(s.sog * 1.852)))} km/h)`]);
  if (s.heading !== null) rows.push([tx.bow, `${Math.round(s.heading)}° (${compass(s.heading)})`]);
  if (s.dest) rows.push([tx.destination, escapeHtml(s.dest)]);
  if (s.length) rows.push([tx.length, `${tx.about(String(s.length))} m`]);
  rows.push(['MMSI', String(s.mmsi)]);
  const age = Math.round((Date.now() - s.at) / 1000);
  return `
    <div class="sheet-head" style="--c:${SHIP_COLOR}">
      <span class="ship-mark big"></span>
      <h2>${escapeHtml(shipLabel(s))}</h2>
      <span class="badge-type ship">${tx.ship}</span>
      ${favButton('ship', String(s.mmsi), shipLabel(s))}
    </div>
    <dl class="facts">${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>
    <div class="actions">
      <a href="https://www.vesselfinder.com/vessels/details/${s.mmsi}" target="_blank" rel="noopener">${tx.moreOn('VesselFinder')}</a>
    </div>
    <p class="small">${tx.shipNote(age)}</p>`;
}

/**
 * 空港を発着して今飛んでいる便。arr: 到着予定（その空港へ向かう）/ 出発した便。
 * minutes: 到着までの分（到着予定）・出発してからの分（出発した便）を、残りの距離と今の速度から推定
 */
function airportFlights(code: string) {
  const ap = airports.find((x) => airportCode(x.name) === code);
  const ms = Date.now();
  const out: { a: Aircraft; arr: boolean; minutes: number | null }[] = [];
  for (const a of aircraft) {
    const arr = a.to === code;
    if (!arr && a.from !== code) continue;
    const km = ap ? distKm(aircraftAt(a, ms), [ap.lng, ap.lat]) : null;
    out.push({ a, arr, minutes: km !== null && a.gs ? (km / (a.gs * 1.852)) * 60 : null });
  }
  return out;
}

const ARRIVAL_WINDOW_MIN = 120;

/** 空港ごとの発着予定（API キーを登録しているときだけ取得する） */
const schedules = new Map<string, { dep?: Scheduled[]; arr?: Scheduled[]; error?: ScheduleErrorKind; detail?: string; loading: boolean }>();
async function loadSchedule(code: string) {
  const key = getApiKey(SCHEDULE_KEY);
  if (!key || !code) return;
  schedules.set(code, { loading: true });
  const done = (v: { dep?: Scheduled[]; arr?: Scheduled[]; error?: ScheduleErrorKind; detail?: string }) => {
    schedules.set(code, { ...v, loading: false });
    if (sheet?.kind === 'airport' && airportCode(sheet.name) === code) renderSheet();
  };
  try {
    const [dep, arr] = await Promise.all([fetchSchedule(code, 'dep', key), fetchSchedule(code, 'arr', key)]);
    done({ dep, arr });
  } catch (err) {
    done(err instanceof ScheduleError ? { error: err.kind, detail: err.kind === 'other' ? err.message : '' } : { error: 'other' });
  }
}

function airportSheet(name: string, intl: boolean): string {
  const tx = t();
  const code = airportCode(name);
  const flights = code ? airportFlights(code) : [];
  const now = jstNowMinutes();
  // 利用者が API キーを登録していれば、時刻表（出発は今後12時間・到着は前後2時間）を出す。なければ、いま飛んでいる便だけ
  const key = getApiKey(SCHEDULE_KEY);
  const sched = code ? schedules.get(code) : undefined;
  const hasSched = !!(sched && (sched.dep || sched.arr));
  const count = (i: boolean) => hasSched
    ? [...(sched!.dep ?? []), ...(sched!.arr ?? [])].filter((x) => x.intl === i).length
    : flights.filter((f) => f.a.intl === i).length;
  const tab = (i: boolean, label: string) =>
    `<button type="button" class="tab ${i === intl ? 'on' : ''}" data-intl="${i ? 1 : 0}"><b>${label}</b><span>${count(i)}</span></button>`;

  const row = ({ a, arr, minutes }: (typeof flights)[number]) => {
    const time = minutes === null ? '--:--' : formatTime(arr ? now + minutes : now - minutes + 1440);
    const color = a.intl ? '#d6247e' : '#8a6a00';
    const other = arr ? tx.fromAirport(a.from) : tx.toAirport(a.to);
    const alt = a.alt !== null ? `${Math.round(a.alt / 100) * 100} ft` : '';
    return `
      <li>
        <button type="button" class="dep" data-aircraft="${a.hex}">
          <span class="tt">${tx.approx(time)}</span>
          <span class="nm" style="--c:${color}">${escapeHtml(aircraftLabel(a))}</span>
          <span class="dest">${other}${a.type ? ` <small>${escapeHtml(a.type)}</small>` : ''}</span>
          <span class="alt">${alt}</span>
        </button>
      </li>`;
  };
  const list = flights.filter((f) => f.a.intl === intl);
  const section = (title: string, items: typeof flights) =>
    items.length ? `<section class="flights"><h3>${title}</h3><ul>${items.map(row).join('')}</ul></section>` : '';
  // 到着予定は 2 時間以内を早い順、出発した便（飛行中）は新しい順。出発した便は飛行中のものだけなので 12 時間以内に収まる
  const arrivals = list.filter((f) => f.arr && (f.minutes ?? 0) <= ARRIVAL_WINDOW_MIN).sort((x, y) => (x.minutes ?? 1e9) - (y.minutes ?? 1e9));
  const departures = list.filter((f) => !f.arr).sort((x, y) => (x.minutes ?? 1e9) - (y.minutes ?? 1e9));
  const live = section(tx.arriving, arrivals) + section(tx.departed, departures) || `<p class="small">${tx.noFlights}</p>`;

  // 時刻表の 1 行。飛行中の便と便名が合えば、タップで現在位置へ
  const hhmm = (ms: number) => new Date(ms + 9 * 3600e3).toISOString().slice(11, 16);
  const schedRow = (s: Scheduled) => {
    const num = s.number.replace(/\s/g, '');
    const a = aircraft.find((x) => x.flight === num || x.callsign === num);
    const late = Math.round((s.time - s.scheduled) / 60000);
    const status = tx.statuses[s.status] ?? s.status;
    const cls = s.status === 'Canceled' ? 'cancel' : s.status === 'Delayed' || late >= 10 ? 'delayed' : '';
    return `
      <li>
        <button type="button" class="dep ${a ? 'live-match' : ''}" ${a ? `data-aircraft="${a.hex}"` : 'disabled'}>
          <span class="tt">${hhmm(s.time)}</span>
          <span class="nm" style="--c:${s.intl ? '#d6247e' : '#8a6a00'}">${escapeHtml(s.number)}</span>
          <span class="dest">${escapeHtml(s.otherName)} ${escapeHtml(s.otherCode)}${s.model ? ` <small>${escapeHtml(s.model)}</small>` : ''}</span>
          <span class="sched-status ${cls}">${escapeHtml(status)}${late >= 10 ? ` +${late}` : ''}${a ? ` · ${tx.inFlight}` : ''}</span>
        </button>
      </li>`;
  };
  const schedSection = (title: string, rows: Scheduled[] | undefined) => {
    const items = (rows ?? []).filter((x) => x.intl === intl);
    return `<section class="flights"><h3>${title}</h3>${items.length ? `<ul>${items.map(schedRow).join('')}</ul>` : `<p class="small" style="padding:8px">${tx.schedEmpty}</p>`}</section>`;
  };
  let notice = '';
  if (code && !key) notice = `<div class="need-key"><p>${tx.needKey}</p><button type="button" data-open-keys>${tx.needKeyButton}</button></div>`;
  else if (code && sched?.loading) notice = `<p class="small" style="padding:8px">${tx.schedLoading}</p>`;
  else if (code && sched?.error) notice = `<p class="small" style="padding:8px;color:#d93025">${tx.keyErrors[sched.error]}${sched.detail ? ` (${escapeHtml(sched.detail)})` : ''}</p>`;
  const body = !code ? `<p class="small">${tx.noCode}</p>`
    : hasSched ? notice + schedSection(tx.schedDepartures, sched!.dep) + schedSection(tx.schedArrivals, sched!.arr)
    : notice + live;

  return `
    <div class="sticky">
      <div class="sheet-head station">
        <span class="ap-icon"></span>
        <h2>${airportName(name)}</h2>
        <span class="sub">${code ? `${code} · ` : ''}${tx.airportFlights}</span>
      </div>
      ${code ? `<div class="tabs">${tab(false, tx.domestic)}${tab(true, tx.international)}</div>` : ''}
    </div>
    <div class="timetable">${body}</div>
    ${hasSched ? `<p class="small">${tx.schedNote}</p>` : `${arrivals.length ? `<p class="small">${tx.etaNote}</p>` : ''}<p class="small">${tx.airportNote}</p>`}
    ${code ? `<div class="actions"><a href="https://www.flightradar24.com/data/airports/${code.toLowerCase()}" target="_blank" rel="noopener">${tx.schedules('Flightradar24')}</a></div>` : ''}`;
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
  body.querySelectorAll<HTMLButtonElement>('[data-fav-kind]').forEach((b) =>
    b.addEventListener('click', () => {
      const { favKind, favId, favLabel } = b.dataset;
      // ゲストは閲覧のみ: ログインを案内する
      if (!toggleFav(favKind as FavKind, { id: favId!, label: favLabel! })) openMyPanel(t().loginToRegister);
    }),
  );
  body.querySelectorAll<HTMLButtonElement>('[data-dir]').forEach((b) =>
    b.addEventListener('click', () => {
      if (sheet?.kind !== 'station') return;
      sheet.dir = Number(b.dataset.dir) as 1 | -1;
      scrollToNow = true;
      renderSheet();
    }),
  );
  body.querySelectorAll<HTMLButtonElement>('[data-intl]').forEach((b) =>
    b.addEventListener('click', () => {
      if (sheet?.kind !== 'airport') return;
      sheet.intl = b.dataset.intl === '1';
      renderSheet();
    }),
  );
  body.querySelectorAll<HTMLButtonElement>('[data-aircraft]').forEach((b) =>
    b.addEventListener('click', () => openAircraft(b.dataset.aircraft!)),
  );
  body.querySelectorAll<HTMLButtonElement>('[data-open-keys]').forEach((b) =>
    b.addEventListener('click', () => openMyPanel('', true)),
  );
}

// ---- マイリスト（ログインと、登録した列車・飛行機・船・駅） ----
const USER_ICON = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zm0 2c-4.4 0-8 2.2-8 5v1.5h16V19c0-2.8-3.6-5-8-5z"/></svg>';
let myNotice = '';

function setupUser() {
  // ログイン機能（GOOGLE_CLIENT_ID）がなくても、個人設定（API キー）のためにボタンは出す
  const btn = $('my-btn');
  btn.hidden = false;
  btn.addEventListener('click', () => ($('my-panel').hidden ? openMyPanel() : togglePanel('my-panel', false)));
  $('my-close').addEventListener('click', () => togglePanel('my-panel', false));
  onUserChange(() => {
    renderMyButton();
    drawStations();
    renderSheet();
    renderMyPanel();
    renderKeys();
    applySavedSettings();
    renderSettingsNote();
  });
  renderSettingsNote();
  // 他の端末で登録した内容を取り込む
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) refreshUser();
  });
  renderMyButton();
  refreshUser();
}

// ---- 個人設定：API キー（空港の発着予定。利用者が自分のキーを登録する） ----
let keysOpen = false;
let keyMessage: { kind: 'ok' | 'err' | 'busy'; text: string } | null = null;

/** 入力中の内容が消えないよう、自分の操作のときだけ描き直す（1 分ごとの描き直しとは別にしている） */
function renderKeys() {
  const el = $('my-keys');
  const tx = t();
  const key = getApiKey(SCHEDULE_KEY);
  const where = user.account ? tx.keysWhereSignedIn : tx.keysWhereGuest;
  const typed = (el.querySelector<HTMLInputElement>('#key-input')?.value) ?? '';
  el.innerHTML = `
    <details class="keys" ${keysOpen ? 'open' : ''}>
      <summary>${tx.keysTitle}</summary>
      <p class="small">${tx.keysIntro}</p>
      <ol>${tx.keysSteps.map((s) => `<li>${s}</li>`).join('')}</ol>
      <p class="small">${tx.keysNote}</p>
      ${key ? `<p class="key-state ok">${tx.keyRegistered(escapeHtml(key.slice(-4)))}</p>` : ''}
      <input id="key-input" type="password" autocomplete="off" spellcheck="false" placeholder="${tx.keyPlaceholder}" value="${escapeHtml(typed)}">
      <div class="key-actions">
        <button type="button" id="key-save" class="primary" ${keyMessage?.kind === 'busy' ? 'disabled' : ''}>${tx.keySaveTest}</button>
        ${key ? `<button type="button" id="key-delete">${tx.keyDelete}</button>` : ''}
      </div>
      ${keyMessage ? `<p class="key-state ${keyMessage.kind === 'ok' ? 'ok' : keyMessage.kind === 'err' ? 'err' : ''}">${escapeHtml(keyMessage.text)}</p>` : ''}
      <p class="small">${where} ${tx.keysPrivacy}</p>
    </details>`;
  el.querySelector('details')!.addEventListener('toggle', (e) => (keysOpen = (e.target as HTMLDetailsElement).open));
  el.querySelector('#key-save')!.addEventListener('click', async () => {
    const value = (el.querySelector<HTMLInputElement>('#key-input')!.value || key).trim();
    if (!value) return;
    keyMessage = { kind: 'busy', text: tx.keyTesting };
    renderKeys();
    try {
      await testKey(value);
      setApiKey(SCHEDULE_KEY, value);
      schedules.clear();
      keyMessage = { kind: 'ok', text: tx.keyOk };
    } catch (err) {
      const kind = err instanceof ScheduleError ? err.kind : 'other';
      keyMessage = { kind: 'err', text: `${tx.keyErrors[kind]}${kind === 'other' && err instanceof Error ? ` (${err.message})` : ''}` };
    }
    (el.querySelector<HTMLInputElement>('#key-input')!).value = '';
    renderKeys();
    if (sheet?.kind === 'airport') {
      loadSchedule(airportCode(sheet.name));
      renderSheet();
    }
  });
  el.querySelector('#key-delete')?.addEventListener('click', () => {
    setApiKey(SCHEDULE_KEY, '');
    schedules.clear();
    keyMessage = null;
    renderKeys();
    renderSheet();
  });
}

/** ログイン中に保存した設定（言語・表示・レイヤー）を、この端末にも反映する。違うものだけ変えるので何度呼んでもよい */
function applySavedSettings() {
  const s = user.data.settings;
  if (!user.account) return;
  if (s.lang && s.lang !== lang) applyLanguage(s.lang);
  if (s.theme && s.theme !== getTheme()) {
    setTheme(s.theme);
    renderThemeButtons();
  }
  let layers = false;
  for (const key of ['domestic', 'international'] as const) {
    const v = s[key];
    if (v !== undefined && v !== showPlanes[key]) {
      showPlanes[key] = v;
      saveSetting(`planes.${key}`, v);
      layers = true;
    }
  }
  if (s.ships !== undefined && s.ships !== showShips) {
    showShips = s.ships;
    saveSetting('ships', s.ships);
    layers = true;
  }
  if (layers) {
    buildLineFilter();
    drawLive();
  }
}

function renderSettingsNote() {
  $('settings-note').textContent = GOOGLE_CLIENT_ID ? (user.account ? t().settingsSynced : t().settingsGuest) : '';
}

function renderThemeButtons() {
  document.querySelectorAll<HTMLButtonElement>('[data-set-theme]').forEach((b) => b.classList.toggle('on', b.dataset.setTheme === getTheme()));
}
document.querySelectorAll<HTMLButtonElement>('[data-set-theme]').forEach((b) =>
  b.addEventListener('click', () => {
    setTheme(b.dataset.setTheme as Theme);
    renderThemeButtons();
    saveSettings({ theme: getTheme() });
  }),
);
renderThemeButtons();

function renderMyButton() {
  const btn = $('my-btn');
  const a = user.account;
  btn.innerHTML = a?.picture ? `<img src="${escapeHtml(a.picture)}" alt="" referrerpolicy="no-referrer">` : USER_ICON;
  btn.classList.toggle('signed-in', !!a);
  btn.setAttribute('aria-label', a ? `${t().myList} (${a.name})` : t().myListLogin);
}

function openMyPanel(notice = '', showKeys = false) {
  myNotice = notice;
  if (GOOGLE_CLIENT_ID) preloadGoogle().catch(() => {}); // ログインのポップアップをタップ直後に開けるように
  if (showKeys) keysOpen = true;
  togglePanel('my-panel', true);
  renderMyPanel();
  renderKeys();
  if (showKeys) $('my-keys').scrollIntoView({ block: 'nearest' });
}

function renderMyPanel() {
  if ($('my-panel').hidden) return;
  const el = $('my-main');
  const a = user.account;
  const fav = user.data.favorites;
  const tx = t();
  const account = a
    ? `<div class="account">
        ${a.picture ? `<img src="${escapeHtml(a.picture)}" alt="" referrerpolicy="no-referrer">` : ''}
        <div><b>${escapeHtml(a.name)}</b><span class="small">${user.busy ? tx.saving : tx.savedToDrive}</span></div>
        <button type="button" id="sign-out">${tx.signOut}</button>
      </div>`
    : `<div class="account guest">
        <p>${tx.guest}</p>
        ${GOOGLE_CLIENT_ID ? `<p class="small">${tx.guestNote}</p>
        <button type="button" id="sign-in" class="primary" ${user.busy ? 'disabled' : ''}>${user.busy ? tx.signingIn : tx.signIn}</button>` : ''}
      </div>`;
  const message = user.error || myNotice;

  const now = Date.now();
  const row = (kind: FavKind, id: string, label: string, status: string, open: string) => `
    <li>
      <button type="button" class="my-item" ${open ? `data-open="${open}"` : 'disabled'}><b>${escapeHtml(label)}</b><span>${status}</span></button>
      <button type="button" class="fav-btn on icon" aria-label="${tx.unregister}" data-fav-kind="${kind}" data-fav-id="${escapeHtml(id)}" data-fav-label="${escapeHtml(label)}">★</button>
    </li>`;
  const section = (title: string, items: string[]) => (items.length ? `<h3>${title}</h3><ul class="my-list">${items.join('')}</ul>` : '');
  const trains = fav.train.map((f) => {
    // 名前は表示中の言語で作り直す（登録したときの言語で保存されているため）
    const tr = timetable.trains.find((x) => trainId(x) === f.id);
    const label = tr ? trainTitle(tr.n, tr.no) : f.label;
    const st = states.find((s) => s.id === f.id);
    if (!st) return row('train', f.id, label, tx.noService, '');
    const here = station(routes.get(st.train.r)!.stations[st.at].name);
    return row('train', f.id, label, st.stopped ? tx.stoppedAtShort(here) : tx.leftShort(here), `train:${f.id}`);
  });
  const planes = fav.aircraft.map((f) => {
    const p = aircraft.find((x) => aircraftKey(x) === f.id);
    if (!p) return row('aircraft', f.id, f.label, tx.notFlying, '');
    const alt = p.alt !== null ? ` · ${tx.altitude} ${Math.round(p.alt / 100) * 100} ft` : '';
    return row('aircraft', f.id, f.label, `${tx.flying}${p.from && p.to ? ` · ${p.from} → ${p.to}` : ''}${alt}`, `aircraft:${p.hex}`);
  });
  const boats = fav.ship.map((f) => {
    const s = ships.find((x) => String(x.mmsi) === f.id);
    if (!s) return row('ship', f.id, f.label, tx.notReceived, '');
    return row('ship', f.id, f.label, `${s.moving ? tx.underway : tx.moored} · ${tx.minutesAgo(Math.round((now - s.at) / 60000))}`, `ship:${s.mmsi}`);
  });
  const favStations = fav.station.map((f) => row('station', f.id, tx.stationOf(station(f.id)), tx.openTimetable, `station:${f.id}`));
  const lists = section(tx.trains, trains) + section(tx.aircraft, planes) + section(tx.ships, boats) + section(tx.stations, favStations);

  el.innerHTML = `
    <h2>${tx.myList}</h2>
    ${account}
    ${message ? `<p class="notice">${escapeHtml(message)}</p>` : ''}
    ${a ? lists || `<p class="small">${tx.empty}</p>` : ''}
    <p class="small privacy-link"><a href="${tx.privacyUrl}" target="_blank" rel="noopener">${tx.privacy}</a></p>`;
  $('my-close').textContent = tx.close;

  el.querySelector('#sign-in')?.addEventListener('click', () => {
    myNotice = '';
    signIn();
  });
  el.querySelector('#sign-out')?.addEventListener('click', () => signOut());
  el.querySelectorAll<HTMLButtonElement>('[data-open]').forEach((b) =>
    b.addEventListener('click', () => {
      const [kind, id] = b.dataset.open!.split(/:(.*)/s);
      togglePanel('my-panel', false);
      if (kind === 'train') openTrain(id);
      else if (kind === 'aircraft') openAircraft(id);
      else if (kind === 'ship') openShip(Number(id));
      else openStation(id);
    }),
  );
  el.querySelectorAll<HTMLButtonElement>('[data-fav-kind]').forEach((b) =>
    b.addEventListener('click', () => toggleFav(b.dataset.favKind as FavKind, { id: b.dataset.favId!, label: b.dataset.favLabel! })),
  );
}

// ---- 要望・不具合の送信（GitHub の Issue の作成画面を、本文を入れた状態で開く） ----
const ISSUES_URL = 'https://github.com/fuuchan-lab/norimono-radar/issues/new';
function renderRequestForm() {
  const tx = t();
  $('request-title').textContent = tx.requestTitle;
  $('request-text').setAttribute('placeholder', tx.requestPlaceholder);
  $('request-send').textContent = tx.requestSend;
  $('request-note').textContent = tx.requestNote;
}
$('request-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const text = ($('request-text') as HTMLTextAreaElement).value.trim();
  if (!text) return;
  const c = map.getCenter();
  // どの画面・言語で書かれたか分かるように、状況を添える
  const body = `${text}\n\n---\n画面: ${location.href}\n言語: ${lang} / 地図: ${c.lng.toFixed(3)}, ${c.lat.toFixed(3)} z${map.getZoom().toFixed(1)} / ${navigator.userAgent}`;
  const title = text.split('\n')[0].slice(0, 60);
  const params = new URLSearchParams({ title, body: body.slice(0, 4000) });
  window.open(`${ISSUES_URL}?${params}`, '_blank', 'noopener');
});

// ---- 言語の切り替え（地図はそのままで、文言と名前を描き直す） ----
function applyLanguage(l: Lang) {
  setLang(l);
  document.title = t().title;
  renderRequestForm();
  document.querySelectorAll<HTMLButtonElement>('[data-set-lang]').forEach((b) => b.classList.toggle('on', b.dataset.setLang === l));
  renderSettingsNote();
  if (!timetable) return; // データの読み込み前（読み込み後に今の言語で描く）
  buildLineFilter();
  drawStations();
  drawAirports();
  renderMyButton();
  renderKeys();
  refresh();
}
document.querySelectorAll<HTMLButtonElement>('[data-set-lang]').forEach((b) =>
  b.addEventListener('click', () => {
    applyLanguage(b.dataset.setLang as Lang);
    saveSettings({ lang });
  }),
);
document.title = t().title;
renderRequestForm();
document.querySelectorAll<HTMLButtonElement>('[data-set-lang]').forEach((b) => b.classList.toggle('on', b.dataset.setLang === lang));

// ---- パネル操作 ----
function togglePanel(id: string, force?: boolean) {
  const el = $(id);
  const open = force ?? el.hidden;
  for (const p of ['time-panel', 'info-panel', 'my-panel']) $(p).hidden = true;
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
  $('clock-count').textContent = t().loadFailed;
});
