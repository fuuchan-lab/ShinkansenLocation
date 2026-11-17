// 雨雲レーダー（気象庁の高解像度降水ナウキャストの実況）を、地図の上に半透明で重ねる
// 範囲の外を白く隠す層（mask）の下に入れるので、範囲外の雨は出ない。新幹線・飛行機・船はこの上に描く
import * as maplibregl from 'maplibre-gl';

const BASE = 'https://www.jma.go.jp/bosai/jmatile/data/nowc';
const TIMES_URL = `${BASE}/targetTimes_N1.json`;
/** 気象庁の実況は 5 分ごと */
const INTERVAL_MS = 5 * 60_000;
const OPACITY = { light: 0.55, dark: 0.7 };
export const RAIN_COLOR = '#2f7de1';

let map: maplibregl.Map;
let visible = false;
let time = ''; // いま重ねている実況の時刻（UTC の yyyyMMddHHmmss）
let timer = 0;
let onTime: (label: string) => void = () => {};

// 気象庁の画像は拡大段階が偶数（4・6・8・10）のものしかない（奇数は空の画像が返る）。
// そこで独自の読み込み口（jmarain://）を通し、奇数の段階は一つ上の偶数の段階の画像の 1/4 を切り出して拡大する
const tileUrl = (t: string) => `jmarain://${t}/{z}/{x}/{y}`;
const jmaUrl = (t: string, z: number, x: number, y: number) => `${BASE}/${t}/none/${t}/surf/hrpns/${z}/${x}/${y}.png`;

async function loadTile(url: string, signal: AbortSignal): Promise<ArrayBuffer> {
  const [t, z, x, y] = url.replace('jmarain://', '').split('/').map((v, i) => (i ? Number(v) : v)) as [string, number, number, number];
  if (z % 2 === 0) {
    const res = await fetch(jmaUrl(t, z, x, y), { signal });
    if (!res.ok) throw new Error(`rain tile ${res.status}`);
    return res.arrayBuffer();
  }
  const res = await fetch(jmaUrl(t, z - 1, x >> 1, y >> 1), { signal });
  if (!res.ok) throw new Error(`rain tile ${res.status}`);
  const half = 128;
  const img = await createImageBitmap(await res.blob(), (x & 1) * half, (y & 1) * half, half, half,
    { resizeWidth: 256, resizeHeight: 256, resizeQuality: 'pixelated' });
  const canvas = new OffscreenCanvas(256, 256);
  canvas.getContext('2d')!.drawImage(img, 0, 0);
  img.close();
  return (await canvas.convertToBlob({ type: 'image/png' })).arrayBuffer();
}

maplibregl.addProtocol('jmarain', async (params, abort) => ({ data: await loadTile(params.url, abort.signal) }));

/** 実況の時刻を日本時間の「HH:MM」にする */
function jstLabel(t: string): string {
  const d = new Date(Date.UTC(+t.slice(0, 4), +t.slice(4, 6) - 1, +t.slice(6, 8), +t.slice(8, 10), +t.slice(10, 12)));
  return new Intl.DateTimeFormat('ja-JP', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', hour12: false }).format(d);
}

/** いちばん新しい実況の時刻を気象庁から読む */
async function latestTime(): Promise<string> {
  const res = await fetch(TIMES_URL, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`rain ${res.status}`);
  const list = (await res.json()) as { basetime: string; validtime: string }[];
  // 実況は basetime と validtime が同じもの
  const now = list.filter((x) => x.basetime === x.validtime).map((x) => x.basetime).sort();
  if (!now.length) throw new Error('rain: no time');
  return now[now.length - 1];
}

/** 時刻が分かるまでは出さない（存在しない画像を読みに行かない） */
function applyVisibility() {
  if (map?.getLayer('rain')) map.setLayoutProperty('rain', 'visibility', visible && time ? 'visible' : 'none');
}

async function update() {
  window.clearTimeout(timer);
  if (!visible) return;
  try {
    const t = await latestTime();
    if (t !== time) {
      time = t;
      const src = map.getSource('rain') as maplibregl.RasterTileSource | undefined;
      src?.setTiles([tileUrl(t)]);
      applyVisibility();
      onTime(jstLabel(t));
    }
  } catch (err) {
    console.warn(err); // 取れなければ、いま出ている雨雲のまま
  }
  if (visible && !document.hidden) timer = window.setTimeout(update, INTERVAL_MS);
}

/** 雨雲の層を足す。beforeId の層の下に入れる */
export function addRainLayer(m: maplibregl.Map, beforeId: string, show: boolean, timeChanged: (label: string) => void) {
  map = m;
  visible = show;
  onTime = timeChanged;
  map.addSource('rain', {
    type: 'raster',
    // 時刻が分かるまでは何も出さない（最初の読み込みで差し替える）
    tiles: [tileUrl('00000000000000')],
    tileSize: 256,
    minzoom: 4,
    maxzoom: 10, // 気象庁の画像は 10 まで。それより拡大したら引き伸ばす
    attribution: '☂ <a href="https://www.jma.go.jp/bosai/nowc/" target="_blank" rel="noopener">気象庁 JMA</a>',
  });
  map.addLayer({
    id: 'rain', type: 'raster', source: 'rain',
    layout: { visibility: 'none' },
    paint: { 'raster-opacity': OPACITY.light, 'raster-fade-duration': 0, 'raster-resampling': 'nearest' },
  }, beforeId);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) update();
  });
  update();
}

export function setRainVisible(show: boolean) {
  visible = show;
  applyVisibility();
  update();
}

export function applyRainTheme(dark: boolean) {
  if (map?.getLayer('rain')) map.setPaintProperty('rain', 'raster-opacity', OPACITY[dark ? 'dark' : 'light']);
}

/** いま重ねている雨雲の時刻（日本時間の HH:MM）。まだなければ空 */
export const rainTime = () => (time ? jstLabel(time) : '');
