// 空港の発着の「ふだんの時刻」を、飛行中の便の観測から作る（どの航空会社の便でも使える。登録・料金は不要）。
// 経路の分かった便について、出発地の近くで見えた位置から離陸の時刻を、到着地の近くで見えた位置から着陸の時刻を、
// 距離と速度で推定する。便ごとに最近 8 日分を覚え、空港を開いたときに「いつもこの時刻ごろ」として返す。
// ShipTracker と同じ Durable Object に置く（常に動いているので、無料枠の稼働時間を増やさない）。

const HOUR = 3600e3;
const DAY = 24 * HOUR;
// 空港からこの距離・高度までの位置だけで推定する（遠い位置からの推定は誤差が大きい）
const NEAR_KM = 80;
const LOW_FT = 15000;
// この時間内の観測は、同じ運航とみなす（夜をまたぐ国際線も 1 回の運航として数える）
const SAME_LEG_MS = 4 * HOUR;
const KEEP_DAYS = 8;
// 何日も見えない便は忘れる（運休・ダイヤ改正）
const DROP_MS = 14 * DAY;
// 「ふだんの時刻」を出すのに必要な、最近 7 日で見えた日数
const MIN_DAYS = 2;

const jstDate = (ms) => new Date(ms + 9 * HOUR).toISOString().slice(0, 10);
const jstMin = (ms) => {
  const d = new Date(ms + 9 * HOUR);
  return d.getUTCHours() * 60 + d.getUTCMinutes();
};
const rad = (d) => (d * Math.PI) / 180;
const distKm = (lat1, lon1, lat2, lon2) =>
  Math.hypot((lon2 - lon1) * 111.32 * Math.cos(rad((lat1 + lat2) / 2)), (lat2 - lat1) * 111.32);

/** 日付をまたぐ時刻（23:50 と 0:10 など）も正しく真ん中を取る */
function medianMin(mins) {
  const base = mins[0];
  const rel = mins.map((m) => ((m - base + 720 + 1440) % 1440) - 720).sort((a, b) => a - b);
  const mid = rel[Math.floor(rel.length / 2)];
  return (((base + mid) % 1440) + 1440) % 1440;
}

export class FlightLog {
  /** `コールサイン|出発|到着` -> { cs, n, from, to, intl, leg, seen, days: { 日付: [離陸ms, そのときの距離km, 着陸ms, そのときの距離km] } } */
  records = new Map();
  /** 保存していない変更のある便 */
  dirty = new Set();
  /** 保存から消す便 */
  removed = new Set();

  load(entries) {
    for (const [k, r] of entries) this.records.set(k.slice(2), r);
  }

  /** obs: [コールサイン, 便名, 出発, 到着, 国際線=1, 緯度, 経度, 高度ft, 対地速度kt, 出発地の緯度, 経度, 到着地の緯度, 経度] */
  observe(now, obs) {
    for (const [cs, n, from, to, intl, lat, lon, alt, gs, fLat, fLon, tLat, tLon] of obs) {
      if (!cs || !from || !to || !gs || gs < 60 || alt == null) continue;
      const key = `${cs}|${from}|${to}`;
      let r = this.records.get(key);
      if (!r) {
        r = { cs, n, from, to, intl, leg: '', seen: 0, days: {} };
        this.records.set(key, r);
      }
      if (now - r.seen > SAME_LEG_MS) r.leg = jstDate(now);
      r.seen = now;
      r.n = n || r.n;
      r.intl = intl;
      if (alt >= LOW_FT) continue;
      const day = (r.days[r.leg] ??= [null, null, null, null]);
      const kmh = gs * 1.852;
      // 空港にいちばん近い位置での推定を残す
      const dFrom = fLat != null ? distKm(lat, lon, fLat, fLon) : Infinity;
      if (dFrom < NEAR_KM && (day[1] === null || dFrom < day[1])) {
        day[0] = Math.round(now - (dFrom / kmh) * HOUR);
        day[1] = Math.round(dFrom * 10) / 10;
        this.dirty.add(key);
      }
      const dTo = tLat != null ? distKm(lat, lon, tLat, tLon) : Infinity;
      if (dTo < NEAR_KM && (day[3] === null || dTo < day[3])) {
        day[2] = Math.round(now + (dTo / kmh) * HOUR);
        day[3] = Math.round(dTo * 10) / 10;
        this.dirty.add(key);
      }
    }
  }

  /** 古い日・見えなくなった便を消す */
  prune(now) {
    const oldest = jstDate(now - KEEP_DAYS * DAY);
    for (const [key, r] of this.records) {
      if (now - r.seen > DROP_MS) {
        this.records.delete(key);
        this.dirty.delete(key);
        this.removed.add(key);
        continue;
      }
      for (const d of Object.keys(r.days)) {
        if (d < oldest) {
          delete r.days[d];
          this.dirty.add(key);
        }
      }
    }
  }

  /**
   * 空港の発着のふだんの時刻。
   * 各行: [コールサイン, 便名, 相手の空港, 国際線=1, ふだんの時刻（日本時間の0時からの分）, 最近7日で見えた日数, 直近16時間に観測した時刻ms|null]
   */
  airport(code, now) {
    const since = jstDate(now - 7 * DAY);
    const out = { dep: [], arr: [] };
    for (const r of this.records.values()) {
      for (const [dir, i, other] of [['dep', 0, r.to], ['arr', 2, r.from]]) {
        if ((dir === 'dep' ? r.from : r.to) !== code) continue;
        const seen = Object.entries(r.days).filter(([d, v]) => d > since && v[i] !== null);
        if (seen.length < MIN_DAYS) continue;
        const recent = Math.max(...seen.map(([, v]) => v[i]));
        out[dir].push([
          r.cs, r.n ?? '', other, r.intl ? 1 : 0, medianMin(seen.map(([, v]) => jstMin(v[i]))), seen.length,
          now - recent < 16 * HOUR ? recent : null,
        ]);
      }
    }
    return out;
  }
}
