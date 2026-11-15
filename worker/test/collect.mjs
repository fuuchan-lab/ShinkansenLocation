// 調査用: aisstream に一定時間つなぎ、受け取った船の船名・船種を JSON に書き出す
// 使い方: node test/collect.mjs <秒> <出力ファイル>（.dev.vars の AISSTREAM_API_KEY を使う）
import fs from 'node:fs';
import { connect, ShipStore } from '../src/ships.js';

const seconds = Number(process.argv[2] ?? 300);
const out = process.argv[3] ?? 'ships-collected.json';
const key = /AISSTREAM_API_KEY\s*=\s*"?([^"\r\n]+)"?/.exec(fs.readFileSync(new URL('../.dev.vars', import.meta.url), 'utf8'))?.[1];
if (!key) throw new Error('AISSTREAM_API_KEY not found in .dev.vars');

const store = new ShipStore();
const ws = await connect(key, store, () => {});
await new Promise((r) => setTimeout(r, seconds * 1000));
ws.close();
const rows = [...store.positions].map(([mmsi, p]) => ({ mmsi, lat: p.lat, lon: p.lon, sog: p.sog, posName: p.name, ...store.statics.get(mmsi) }));
fs.writeFileSync(out, JSON.stringify({ stats: store.stats, rows }, null, 1));
console.log(`positions ${store.positions.size} statics ${store.statics.size} messages ${store.stats.messages}`);
