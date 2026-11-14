import * as maplibregl from 'maplibre-gl';
import type { GeoJSONSource, StyleSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url';
import './style.css';
import { buildRoutes, loadData, type Airport, type Line, type Route, type Timetable } from './data';
import { addIcons } from './icons';
import { formatTime, jstNowMinutes, stateAt, type TrainState } from './simulate';

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

const style: StyleSpecification = {
  version: 8,
  glyphs: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
  sources: {
    gsi: {
      type: 'raster',
      tiles: ['https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png'],
      tileSize: 256,
      maxzoom: 18,
      attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener">国土地理院</a> | 路線: 国土数値情報',
    },
  },
  layers: [{ id: 'gsi', type: 'raster', source: 'gsi' }],
};

const JAPAN: [[number, number], [number, number]] = [[129.6, 31.3], [141.6, 42.1]];

// バンドラ経由だと既定の Worker の場所を解決できないため明示する
maplibregl.setWorkerUrl(workerUrl);

const map = new maplibregl.Map({
  container: 'map',
  style,
  bounds: JAPAN,
  fitBoundsOptions: { padding: { top: 110, bottom: 40, left: 20, right: 20 } },
  maxBounds: [[120, 20], [155, 50]],
  attributionControl: { compact: true },
  dragRotate: false,
  pitchWithRotate: false,
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

// ---- 状態 ----
let lines: Line[] = [];
let airports: Airport[] = [];
let routes = new Map<string, Route>();
let timetable: Timetable;
const hiddenLines = new Set<string>();
let selected: string | null = null;
let follow = false;
let states: TrainState[] = [];

async function init() {
  const data = await loadData();
  lines = data.network.lines;
  timetable = data.timetable;
  airports = data.airports;
  routes = buildRoutes(data.network);
  await new Promise<void>((resolve) => (map.loaded() ? resolve() : map.once('load', () => resolve())));
  await addIcons(map);
  addLayers();
  buildLineFilter();
  tick();
  setInterval(tick, 500);
}

function addLayers() {
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
  map.addLayer({
    id: 'train-selected', type: 'circle', source: 'trains',
    filter: ['==', ['get', 'id'], ''],
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 4, 11, 8, 15, 12, 19],
      'circle-color': 'rgba(0,0,0,0)',
      'circle-stroke-color': '#111',
      'circle-stroke-width': 3,
    },
  });
  map.addLayer({
    id: 'train', type: 'circle', source: 'trains',
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 4, 5, 8, 8, 12, 11],
      'circle-color': ['get', 'color'],
      'circle-stroke-color': '#ffffff',
      'circle-stroke-width': ['interpolate', ['linear'], ['zoom'], 4, 1.5, 10, 2.5],
    },
  });
  map.addLayer({
    id: 'train-label', type: 'symbol', source: 'trains', minzoom: 7,
    layout: {
      'text-field': ['get', 'label'],
      'text-font': ['Noto Sans Regular'],
      'text-size': 12,
      'text-offset': [0, -1.4],
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
    const hit = map.queryRenderedFeatures(e.point, { layers: ['train-hit'] });
    if (hit.length) {
      // 重なっているときは中心に最も近い列車
      const best = hit
        .map((f) => ({ f, d: map.project((f.geometry as { coordinates: [number, number] }).coordinates).dist(e.point) }))
        .sort((a, b) => a.d - b.d)[0].f;
      select(String(best.properties!.id));
    } else if (selected) {
      select(null);
    }
  });
  map.on('mouseenter', 'train-hit', () => (map.getCanvas().style.cursor = 'pointer'));
  map.on('mouseleave', 'train-hit', () => (map.getCanvas().style.cursor = ''));
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
  tick();
}

function buildLineFilter() {
  const nav = $('line-filter');
  nav.innerHTML = '';
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
}

function tick() {
  if (!timetable) return;
  const now = nowMinutes();
  states = [];
  for (const tr of timetable.trains) {
    const st = stateAt(tr, routes.get(tr.r)!, now);
    if (st && !hiddenLines.has(st.line)) states.push(st);
  }
  const src = map.getSource('trains') as GeoJSONSource | undefined;
  src?.setData({
    type: 'FeatureCollection',
    features: states.map((s) => ({
      type: 'Feature',
      properties: { id: s.id, color: timetable.types[s.train.n]?.color ?? '#333', label: `${s.train.n}${s.train.no}` },
      geometry: { type: 'Point', coordinates: s.pos },
    })),
  });
  $('clock-time').textContent = formatTime(Math.floor(now));
  $('clock-count').textContent = states.length ? `運行中 ${states.length}本` : '運行時間外';
  $('clock').classList.toggle('sim', clock.base !== null);

  const cur = states.find((s) => s.id === selected);
  if (selected && cur && follow) map.easeTo({ center: cur.pos, duration: 450, easing: (x) => x });
  if (selected) renderSheet();
}

function select(id: string | null) {
  selected = id;
  map.setFilter('train-selected', ['==', ['get', 'id'], id ?? '']);
  renderSheet();
  // シートに隠れない位置に列車が来るよう、地図の余白を設定
  const sheet = $('sheet');
  const desktop = matchMedia('(min-width: 768px)').matches;
  const padding = sheet.hidden ? { top: 0, bottom: 0, left: 0, right: 0 }
    : desktop ? { top: 0, bottom: 0, left: sheet.offsetWidth + 12, right: 0 }
    : { top: 110, bottom: sheet.offsetHeight, left: 0, right: 0 };
  const cur = states.find((s) => s.id === id);
  if (cur) {
    follow = true;
    map.easeTo({ center: cur.pos, zoom: Math.max(map.getZoom(), 8), padding, duration: 600 });
  } else {
    map.easeTo({ padding, duration: 300 });
  }
}

function renderSheet() {
  const sheet = $('sheet');
  const cur = states.find((s) => s.id === selected);
  if (!selected || !cur) {
    sheet.hidden = true;
    document.body.classList.remove('has-sheet');
    if (selected && !cur) selected = null;
    return;
  }
  sheet.hidden = false;
  document.body.classList.add('has-sheet');
  const route = routes.get(cur.train.r)!;
  const s = cur.train.s;
  const name = (k: number) => route.stations[s[k][0]].name;
  const dest = name(s.length - 1);
  const color = timetable.types[cur.train.n]?.color ?? '#333';
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
      return `<li class="${passed ? 'passed' : ''} ${now ? 'now' : ''}"><span class="st">${name(k)}</span><span class="tm">${time}</span></li>`;
    })
    .join('');

  $('sheet-body').innerHTML = `
    <div class="train-head" style="--c:${color}">
      <span class="dot"></span>
      <h2>${cur.train.n} ${cur.train.no}号</h2>
      <span class="dest">${dest}行</span>
    </div>
    <p class="status">${status}${speed}</p>
    <p class="next">${next}</p>
    <div class="actions">
      <button type="button" id="follow-btn" class="${follow ? 'on' : ''}">${follow ? '追従中' : '列車を追従'}</button>
      <a href="${off.url}" target="_blank" rel="noopener">${off.label} ↗</a>
    </div>
    <ol class="stops">${stops}</ol>
    <p class="small">時刻・号数は推定値です。</p>`;
  $('follow-btn').addEventListener('click', () => {
    follow = !follow;
    if (follow) map.easeTo({ center: cur.pos, duration: 500 });
    renderSheet();
  });
}

// ---- パネル操作 ----
function togglePanel(id: string, force?: boolean) {
  const el = $(id);
  const open = force ?? el.hidden;
  for (const p of ['time-panel', 'info-panel']) $(p).hidden = true;
  el.hidden = !open;
}
$('sheet-close').addEventListener('click', () => select(null));
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
  tick();
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
  tick();
});

init().catch((err) => {
  console.error(err);
  $('clock-count').textContent = 'データの読み込みに失敗しました';
});
