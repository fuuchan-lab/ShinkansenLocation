// オフライン対応: Service Worker の登録、オフラインの表示、日本全体の地図の先読み
import type { LngLat } from './data';

/** 日本全体の範囲（main.ts の JAPAN と同じ） */
const JAPAN: [LngLat, LngLat] = [[122.8, 24.0], [148.9, 45.6]];
const TILE_URL = 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png';
const PREFETCH_KEY = 'tiles.prefetch.v1';

function tileXY(lon: number, lat: number, z: number): [number, number] {
  const n = 2 ** z;
  const rad = (lat * Math.PI) / 180;
  return [Math.floor(((lon + 180) / 360) * n), Math.floor(((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * n)];
}

/** ズーム 4〜7 の日本全体のタイル（約 300 枚）を一度だけ先に取り、オフラインでも全体が見えるようにする */
async function prefetchTiles() {
  try {
    if (localStorage.getItem(PREFETCH_KEY)) return;
  } catch {
    return;
  }
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (conn?.saveData || conn?.effectiveType === '2g' || conn?.effectiveType === 'slow-2g') return;
  const urls: string[] = [];
  for (let z = 4; z <= 7; z++) {
    const [x0, y1] = tileXY(JAPAN[0][0], JAPAN[0][1], z);
    const [x1, y0] = tileXY(JAPAN[1][0], JAPAN[1][1], z);
    for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) urls.push(TILE_URL.replace('{z}', String(z)).replace('{x}', String(x)).replace('{y}', String(y)));
  }
  let i = 0;
  const worker = async () => {
    while (i < urls.length) {
      const u = urls[i++];
      try {
        await fetch(u, { mode: 'cors' });
      } catch {
        return; // つながらなくなったら中止（次回また試す）
      }
    }
  };
  await Promise.all([worker(), worker(), worker()]);
  if (i >= urls.length) {
    try {
      localStorage.setItem(PREFETCH_KEY, String(Date.now()));
    } catch {
      // 記録できなくても影響しない
    }
  }
}

export function setupOffline(onChange?: (online: boolean) => void) {
  const badge = document.getElementById('offline-badge');
  const update = () => {
    if (badge) badge.hidden = navigator.onLine;
    onChange?.(navigator.onLine);
  };
  window.addEventListener('online', update);
  window.addEventListener('offline', update);
  update();

  if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(async () => {
        const reg = await navigator.serviceWorker.ready;
        const urls = performance.getEntriesByType('resource').map((r) => r.name).filter((u) => u.startsWith(location.origin + '/assets/'));
        reg.active?.postMessage({ type: 'cache-urls', urls });
      }).catch(() => {});
      // 起動の処理を邪魔しないよう、少し待って先読みする
      setTimeout(() => prefetchTiles().catch(() => {}), 8000);
    });
  }
}
