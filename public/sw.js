// オフラインでも、新幹線の推定表示と、一度見た地図を使えるようにする
// 飛行機・旅客船・空港の発着は中継サーバーの最新データが要るので、キャッシュしない（取れなければ今まで通りの表示のまま）
const VERSION = 'v1';
const APP = `norimono-app-${VERSION}`;
const TILES = `norimono-tiles-${VERSION}`;
const MAX_TILES = 1500;

const TILE_HOST = 'cyberjapandata.gsi.go.jp';
const GLYPH_HOST = 'tiles.openfreemap.org';
/** アプリの中で重ねて開く説明のページ */
const DOCS = ['/help.html', '/privacy.html', '/favicon.ico', '/apple-touch-icon.png'];

/** 最初の起動は SW がまだ働いていないので、ページが読む js・css もここで取っておく */
async function precache() {
  const c = await caches.open(APP);
  await c.addAll(['/icon-32.png', '/icon-48.png', '/icon-192.png', '/manifest.webmanifest', '/data/network.json', '/data/timetable.json', '/data/airports.json', '/data/area.json', '/data/ferries.json']).catch(() => {});
  // ヘルプ・プライバシーポリシーも、一度も開いていなくてもオフラインで見られるように最初に取っておく
  await Promise.all(DOCS.map((d) => c.add(d).catch(() => {})));
  const res = await fetch('/', { cache: 'no-cache' });
  await c.put('/', res.clone());
  const html = await res.text();
  const files = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map((m) => m[1]);
  await Promise.all(files.map((f) => c.add(f).catch(() => {})));
}

self.addEventListener('install', (e) => {
  e.waitUntil(precache().catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== APP && k !== TILES).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

async function putIfOk(cache, req, res) {
  if (res && (res.ok || res.type === 'opaque')) await cache.put(req, res.clone());
  return res;
}

/** 先にキャッシュを返し、裏で更新する */
async function staleWhileRevalidate(req) {
  const cache = await caches.open(APP);
  const hit = await cache.match(req, { ignoreVary: true });
  const net = fetch(req).then((r) => putIfOk(cache, req, r)).catch(() => hit);
  return hit || net;
}

/** 変わらないファイル（名前にハッシュが付く）はキャッシュを優先 */
async function cacheFirst(req, name) {
  const cache = await caches.open(name);
  const hit = await cache.match(req, { ignoreVary: true });
  if (hit) return hit;
  const res = await fetch(req);
  await putIfOk(cache, req, res);
  return res;
}

/** ページは、ネットワークを優先（新しい版をすぐ使う）。つながらなければキャッシュ */
async function networkFirst(req) {
  const cache = await caches.open(APP);
  try {
    const res = await Promise.race([
      fetch(req),
      new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 4000)),
    ]);
    await putIfOk(cache, '/', res);
    return res;
  } catch (err) {
    const hit = await cache.match("/", { ignoreVary: true });
    if (hit) return hit;
    throw err;
  }
}

/** 説明のページは、ネットワークを優先（新しい版を見せる）。つながらない・遅い時は保存したもの */
async function docNetworkFirst(req) {
  const cache = await caches.open(APP);
  const key = new URL(req.url).pathname;
  try {
    const res = await Promise.race([
      fetch(req),
      new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 4000)),
    ]);
    if (res.ok) await cache.put(key, res.clone());
    return res;
  } catch (err) {
    const hit = await cache.match(key, { ignoreVary: true });
    if (hit) return hit;
    throw err;
  }
}

async function trimTiles() {
  const cache = await caches.open(TILES);
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - MAX_TILES; i++) await cache.delete(keys[i]); // 古いものから消す
}
let trimTimer = 0;

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    if (req.mode === 'navigate' && (url.pathname === '/' || url.pathname === '/index.html')) {
      e.respondWith(networkFirst(req));
    } else if (url.pathname === '/help.html' || url.pathname === '/privacy.html') {
      e.respondWith(docNetworkFirst(req));
    } else if (url.pathname.startsWith('/assets/')) {
      e.respondWith(cacheFirst(req, APP));
    } else {
      e.respondWith(staleWhileRevalidate(req));
    }
  } else if (url.hostname === TILE_HOST) {
    e.respondWith(cacheFirst(req, TILES).finally(() => {
      clearTimeout(trimTimer);
      trimTimer = setTimeout(trimTiles, 5000);
    }));
  } else if (url.hostname === GLYPH_HOST) {
    e.respondWith(cacheFirst(req, TILES));
  }
});

// ページが読み込んだ同じサイトのファイル（MapLibre の Worker など、HTML に書かれないもの）も取っておく
self.addEventListener('message', (e) => {
  if (e.data?.type !== 'cache-urls') return;
  e.waitUntil(caches.open(APP).then((c) => Promise.all((e.data.urls || []).map((u) => c.match(u, { ignoreVary: true }).then((hit) => hit || c.add(u).catch(() => {}))))));
});
