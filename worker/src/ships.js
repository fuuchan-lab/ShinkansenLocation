// 日本近海の旅客船を aisstream.io の AIS データから集める。
// 位置と船種は別のメッセージで届く（船種は約6分おき）ため、接続を保ったまま貯めておく。

const AIS_URL = 'wss://stream.aisstream.io/v0/stream';
// [[南西の緯度, 経度], [北東の緯度, 経度]]
const BOX = [[23.5, 122.5], [46.0, 149.0]];
const MESSAGE_TYPES = ['PositionReport', 'StandardClassBPositionReport', 'ExtendedClassBPositionReport', 'ShipStaticData', 'StaticDataReport'];
const STALE_MS = 15 * 60 * 1000;
const isPassenger = (type) => type >= 60 && type <= 69;

export class ShipStore {
  /** MMSI -> 位置 */
  positions = new Map();
  /** MMSI -> 船名・船種など（旅客船以外も一時的に持つ） */
  statics = new Map();
  /** 状態確認用: 受信したメッセージの種類ごとの件数など */
  stats = { messages: 0, byType: {}, lastError: '' };

  handle(msg) {
    this.stats.messages++;
    if (msg.error) this.stats.lastError = String(msg.error);
    const kind = msg.MessageType ?? 'unknown';
    this.stats.byType[kind] = (this.stats.byType[kind] ?? 0) + 1;
    const mmsi = msg.MetaData?.MMSI;
    if (!mmsi) return;
    const type = msg.MessageType;
    const body = msg.Message?.[type];
    if (!body) return;
    if (type === 'PositionReport' || type === 'StandardClassBPositionReport' || type === 'ExtendedClassBPositionReport') {
      const { Latitude: lat, Longitude: lon } = body;
      if (Math.abs(lat) > 90 || Math.abs(lon) > 180) return;
      this.positions.set(mmsi, {
        lat, lon, sog: body.Sog, cog: body.Cog, hdg: body.TrueHeading, at: Date.now(),
        name: (msg.MetaData.ShipName ?? '').trim(),
      });
      if (type === 'ExtendedClassBPositionReport') this.merge(mmsi, { type: body.Type, name: body.Name });
    } else if (type === 'ShipStaticData') {
      const d = body.Dimension ?? {};
      this.merge(mmsi, { name: body.Name, type: body.Type, dest: body.Destination, len: (d.A ?? 0) + (d.B ?? 0) });
    } else if (type === 'StaticDataReport') {
      if (body.ReportA?.Valid) this.merge(mmsi, { name: body.ReportA.Name });
      if (body.ReportB?.Valid) this.merge(mmsi, { type: body.ReportB.ShipType });
    }
  }

  merge(mmsi, info) {
    const cur = this.statics.get(mmsi) ?? {};
    for (const [k, v] of Object.entries(info)) {
      if (v === undefined || v === null || v === '') continue;
      cur[k] = typeof v === 'string' ? v.trim() : v;
    }
    this.statics.set(mmsi, cur);
  }

  /** [MMSI, 船名, 緯度, 経度, 速力kn, 針路, 船首方位, 船種, 行先, 位置の古さ秒, 全長m] */
  passengers() {
    const now = Date.now();
    const out = [];
    for (const [mmsi, p] of this.positions) {
      if (now - p.at > STALE_MS) {
        this.positions.delete(mmsi);
        continue;
      }
      const s = this.statics.get(mmsi);
      if (!s || !isPassenger(s.type)) continue;
      out.push([
        mmsi, s.name || p.name || '', round(p.lat, 5), round(p.lon, 5), p.sog ?? null,
        p.cog != null && p.cog < 360 ? p.cog : null,
        p.hdg != null && p.hdg < 360 ? p.hdg : null,
        s.type, s.dest ?? '', Math.round((now - p.at) / 1000), s.len || null,
      ]);
    }
    return out;
  }

  /** 保存用: 旅客船の船名・船種だけ（再起動後すぐ表示できるように） */
  passengerStatics() {
    return [...this.statics].filter(([, s]) => isPassenger(s.type));
  }
}

const round = (x, d) => Math.round(x * 10 ** d) / 10 ** d;

/** Cloudflare Workers では fetch の Upgrade で接続する（new WebSocket では外向きに繋がらない） */
async function open(url) {
  if (typeof WebSocketPair === 'undefined') {
    // Node.js（test/run-local.mjs）
    const ws = new WebSocket(url);
    ws.binaryType = 'arraybuffer';
    await new Promise((resolve, reject) => {
      ws.addEventListener('open', resolve, { once: true });
      ws.addEventListener('error', reject, { once: true });
    });
    return ws;
  }
  const res = await fetch(url.replace(/^wss:/, 'https:'), { headers: { Upgrade: 'websocket' } });
  if (!res.webSocket) throw new Error(`upgrade failed: ${res.status}`);
  res.webSocket.accept();
  return res.webSocket;
}

export async function connect(apiKey, store, onClose) {
  store.stats.opened = false;
  const ws = await open(AIS_URL);
  store.stats.opened = true;
  // 接続後すぐ（3秒以内）に購読内容を送る
  ws.send(JSON.stringify({ APIKey: apiKey, BoundingBoxes: [BOX], FilterMessageTypes: MESSAGE_TYPES }));
  const decoder = new TextDecoder();
  ws.addEventListener('message', (e) => {
    try {
      store.handle(JSON.parse(typeof e.data === 'string' ? e.data : decoder.decode(e.data)));
    } catch (err) {
      store.stats.lastError = `parse: ${err}`;
    }
  });
  ws.addEventListener('close', (e) => {
    store.stats.lastClose = `${e.code} ${e.reason ?? ''}`.trim();
    onClose();
  });
  ws.addEventListener('error', (e) => {
    store.stats.lastError = `ws: ${e.message ?? e.type}`;
    onClose();
  });
  return ws;
}

// 誰も見ていない状態がこれだけ続いたら接続を切る（無料枠の節約）
const IDLE_MS = 10 * 60 * 1000;
const ALARM_MS = 30 * 1000;

/** AIS への接続を保つ Durable Object（日本全体で1つ） */
export class ShipTracker {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.store = new ShipStore();
    this.ws = null;
    this.lastRequest = 0;
    state.blockConcurrencyWhile(async () => {
      const saved = await state.storage.get('statics');
      if (saved) this.store.statics = new Map(saved);
    });
  }

  async ensureConnected() {
    if (!this.env.AISSTREAM_API_KEY || this.connecting) return;
    if (this.ws && this.ws.readyState <= 1) return;
    this.connecting = true;
    try {
      this.ws = await connect(this.env.AISSTREAM_API_KEY, this.store, () => {
        this.ws = null;
      });
    } catch (err) {
      this.store.stats.lastError = `connect: ${err}`;
      this.ws = null;
    } finally {
      this.connecting = false;
    }
  }

  /** 一時的な診断: 世界全体で数秒だけ購読し、届く件数と日本近海の件数を数える */
  async probe() {
    const ws = await open(AIS_URL);
    ws.send(JSON.stringify({ APIKey: this.env.AISSTREAM_API_KEY, BoundingBoxes: [[[-90, -180], [90, 180]]], FilterMessageTypes: ['PositionReport'] }));
    const decoder = new TextDecoder();
    const out = { total: 0, japan: 0, sample: null, raw: '' };
    ws.addEventListener('message', (e) => {
      const text = typeof e.data === 'string' ? e.data : decoder.decode(e.data);
      if (!out.raw) out.raw = text.slice(0, 300);
      out.total++;
      try {
        const m = JSON.parse(text).MetaData;
        if (m && m.latitude > 23 && m.latitude < 47 && m.longitude > 122 && m.longitude < 150) {
          out.japan++;
          out.sample ??= m;
        }
      } catch {}
    });
    await new Promise((r) => setTimeout(r, 8000));
    ws.close();
    return Response.json(out);
  }

  async fetch(request) {
    if (new URL(request.url).pathname === '/ships-probe') return this.probe();
    this.lastRequest = Date.now();
    await this.ensureConnected();
    if ((await this.state.storage.getAlarm()) === null) await this.state.storage.setAlarm(Date.now() + ALARM_MS);
    const ships = this.store.passengers();
    return Response.json({
      now: Date.now(),
      connected: !!this.ws,
      // 状態確認用（映らないときの切り分け）
      stats: { ...this.store.stats, positions: this.store.positions.size, statics: this.store.statics.size, readyState: this.ws?.readyState ?? null },
      ships,
    });
  }

  async alarm() {
    await this.state.storage.put('statics', this.store.passengerStatics());
    if (Date.now() - this.lastRequest > IDLE_MS) {
      this.ws?.close();
      this.ws = null;
      return;
    }
    await this.ensureConnected();
    await this.state.storage.setAlarm(Date.now() + ALARM_MS);
  }
}
