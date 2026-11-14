// workerd を使わずに Node.js で Worker を動かす簡易テスト（Cache API は Map で代用）
// 使い方: node test/run-local.mjs [port]
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

const worker = (await import('../src/index.js')).default;
const port = Number(process.argv[2] ?? 8787);
http
  .createServer(async (req, res) => {
    const pending = [];
    const ctx = { waitUntil: (p) => pending.push(p) };
    const t = Date.now();
    const r = await worker.fetch(new Request(`http://localhost:${port}${req.url}`), {}, ctx);
    await Promise.all(pending);
    res.writeHead(r.status, Object.fromEntries(r.headers));
    res.end(Buffer.from(await r.arrayBuffer()));
    console.log(`${req.url} ${r.status} ${Date.now() - t}ms`);
  })
  .listen(port, () => console.log(`listening on http://localhost:${port}`));
