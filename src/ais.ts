// 利用者自身の aisstream.io の API キーで、ブラウザから直接 AIS を受信する。
// 開発者の中継サーバーや開発者のキーは使わない（受信のしかたは Worker と同じ worker/src/ships.js）。
// 船種（旅客船か）は約6分おきにしか届かないので、分かった旅客船の船名・船種はこの端末に保存して、次回すぐ使う。
import { connect, ShipStore, type ShipRow } from '../worker/src/ships.js';

const STATICS_KEY = 'ais.statics';
let ws: WebSocket | null = null;
let store: ShipStore | null = null;
let currentKey = '';
let saveTimer = 0;

function loadStatics(s: ShipStore) {
  try {
    const saved = JSON.parse(localStorage.getItem(STATICS_KEY) ?? 'null') as ReturnType<ShipStore['passengerStatics']> | null;
    if (saved) s.statics = new Map(saved);
  } catch {
    // 読めなければ、届くのを待つ
  }
}
function saveStatics() {
  try {
    if (store) localStorage.setItem(STATICS_KEY, JSON.stringify(store.passengerStatics()));
  } catch {
    // 保存できなくても表示には影響しない
  }
}

/**
 * 中継サーバーから受け取った旅客船の船名・船種を覚えておく（最初の 5 分のあいだ）。
 * 自分のキーで受信を始めたときに、船種が届くのを待たずに表示できる
 */
export function rememberShips(list: { mmsi: number; name: string; type: number }[]) {
  try {
    const saved = new Map(JSON.parse(localStorage.getItem(STATICS_KEY) ?? '[]') as ReturnType<ShipStore['passengerStatics']>);
    for (const s of list) saved.set(s.mmsi, { ...saved.get(s.mmsi), name: s.name, type: s.type });
    localStorage.setItem(STATICS_KEY, JSON.stringify([...saved]));
  } catch {
    // 覚えられなくても、届くのを待てば表示できる
  }
  if (store) for (const s of list) if (!store.statics.has(s.mmsi)) store.statics.set(s.mmsi, { name: s.name, type: s.type });
}

/** 受信を始める（同じキーで受信中なら何もしない）。切れたら 10 秒後につなぎ直す */
export function startAis(key: string) {
  if (key === currentKey && (ws || store)) return;
  stopAis();
  currentKey = key;
  const s = new ShipStore();
  loadStatics(s);
  store = s;
  saveTimer = window.setInterval(saveStatics, 60_000);
  const open = () =>
    connect(key, s, () => {
      ws = null;
      if (currentKey === key) setTimeout(() => currentKey === key && !ws && open(), 10_000);
    })
      .then((w) => (ws = w))
      .catch(() => {
        if (currentKey === key) setTimeout(() => currentKey === key && !ws && open(), 10_000);
      });
  open();
}

export function stopAis() {
  saveStatics();
  currentKey = '';
  clearInterval(saveTimer);
  ws?.close();
  ws = null;
  store = null;
}

/** 受信した旅客船（Worker の /ships と同じ形） */
export const aisShips = (): { now: number; ships: ShipRow[] } | null => (store ? { now: Date.now(), ships: store.passengers() } : null);

/** キーが使えるかを確かめる（つないで、エラーが返らずに受信できれば OK） */
export function testAisKey(key: string): Promise<boolean> {
  return new Promise((resolve) => {
    let done = false;
    const finish = (ok: boolean) => {
      if (done) return;
      done = true;
      try {
        sock.close();
      } catch {
        // すでに閉じている
      }
      resolve(ok);
    };
    const sock = new WebSocket('wss://stream.aisstream.io/v0/stream');
    sock.onopen = () => sock.send(JSON.stringify({ APIKey: key, BoundingBoxes: [[[17, 122], [48, 158]]], FilterMessageTypes: ['PositionReport'] }));
    sock.onmessage = async (e) => {
      const text = typeof e.data === 'string' ? e.data : await (e.data as Blob).text();
      finish(!/"error"/i.test(text));
    };
    sock.onerror = () => finish(false);
    sock.onclose = () => finish(false);
    setTimeout(() => finish(false), 15_000);
  });
}
