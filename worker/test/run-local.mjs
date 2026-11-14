// workerd を使わずに Node.js で Worker を動かす簡易テスト（Cache API・Durable Object はメモリで代用）
// 使い方: node test/run-local.mjs [port]
//   worker/.dev.vars に AISSTREAM_API_KEY があれば AIS に接続する。
//   なければ /ships は疑似データ（東京湾など）を返す。
import fs from 'node:fs';
import http from 'node:http';

const store = new Map();
globalThis.caches = {
  default: {
    async match(req) {
      const key = typeof req === 'string' ? req : req.url;
      const hit = store.get(key);
      if (!hit || hit.expires < Date.now()) return undefined;
      return new Response(hit.body, { headers: hit.headers });
    },
    async put(req, res) {
      const key = typeof req === 'string' ? req : req.url;
      const age = Number(/max-age=(\d+)/.exec(res.headers.get('cache-control') ?? '')?.[1] ?? 0);
      store.set(key, { body: await res.text(), headers: Object.fromEntries(res.headers), expires: Date.now() + age * 1000 });
    },
  },
};

const vars = {};
try {
  for (const line of fs.readFileSync(new URL('../.dev.vars', import.meta.url), 'utf8').split(/\r?\n/)) {
    const m = /^\s*([A-Z_]+)\s*=\s*"?([^"]*)"?\s*$/.exec(line);
    if (m) vars[m[1]] = m[2];
  }
} catch {
  // .dev.vars がなければ疑似データ
}

const mod = await import('../src/index.js');
const worker = mod.default;

// Durable Object の代用
const doStorage = new Map();
let alarmTimer = null;
const state = {
  storage: {
    get: async (k) => doStorage.get(k),
    put: async (k, v) => void doStorage.set(k, v),
    getAlarm: async () => (alarmTimer ? 1 : null),
    setAlarm: async (t) => {
      clearTimeout(alarmTimer);
      alarmTimer = setTimeout(() => {
        alarmTimer = null;
        tracker.alarm();
      }, Math.max(0, t - Date.now()));
    },
  },
  blockConcurrencyWhile: (fn) => fn(),
};
const tracker = new mod.ShipTracker(state, vars);
const fixture = () => {
  const t = Date.now() / 1000;
  return Response.json({
    now: Date.now(), connected: false,
    ships: [
      [431000001, 'TEST FERRY A', 35.45 + 0.02 * Math.sin(t / 600), 139.78, 14.5, 200, 198, 60, 'KISARAZU', 5, 120],
      [431000002, 'TEST FERRY B', 35.38, 139.80, 0.1, null, 75, 69, '', 30, 80],
      [431000003, 'TEST LINER', 33.95, 131.0, 20.0, 95, 96, 60, 'OSAKA', 12, 190],
    ],
  });
};
const env = {
  ...vars,
  SHIPS: {
    idFromName: () => 'japan',
    get: () => ({ fetch: async (req) => (vars.AISSTREAM_API_KEY ? tracker.fetch(req) : fixture()) }),
  },
};

const port = Number(process.argv[2] ?? 8787);
http
  .createServer(async (req, res) => {
    const pending = [];
    const ctx = { waitUntil: (p) => pending.push(p) };
    const t = Date.now();
    const r = await worker.fetch(new Request(`http://localhost:${port}${req.url}`), env, ctx);
    await Promise.all(pending);
    res.writeHead(r.status, Object.fromEntries(r.headers));
    res.end(Buffer.from(await r.arrayBuffer()));
    console.log(`${req.url} ${r.status} ${Date.now() - t}ms`);
  })
  .listen(port, () => console.log(`listening on http://localhost:${port} (AIS: ${vars.AISSTREAM_API_KEY ? 'live' : 'fixture'})`));
