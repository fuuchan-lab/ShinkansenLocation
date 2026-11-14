// 時刻表から、ある時刻の列車位置を推定する
import { pointAt, type LngLat, type Route, type Train } from './data';

export interface TrainState {
  train: Train;
  id: string;
  pos: LngLat;
  bearing: number;
  /** 経路内の駅index。停車中ならその駅、走行中なら直前に出た駅 */
  at: number;
  stopped: boolean;
  /** 次の停車駅（s の添字） */
  nextStop: number | null;
  line: string;
  /** 推定速度 km/h（停車中は0） */
  speed: number;
  /** 経路上の距離程 */
  km: number;
  /** 経路の距離程が増える向きに走るなら 1、逆なら -1 */
  dir: 1 | -1;
  /** 次の停車駅の距離程（推定速度で進めるときに行き過ぎないための上限） */
  limitKm: number;
}

export const trainId = (t: Train) => `${t.n}${t.no}`;

/** 始発駅で発車前からホームにいる時間・終着駅で到着後に残る時間（分） */
const BEFORE_DEPARTURE = 8;
const AFTER_ARRIVAL = 5;

const easeIn = (f: number) => f * f;
const easeOut = (f: number) => 1 - (1 - f) * (1 - f);
const easeBoth = (f: number) => f * f * (3 - 2 * f);

/** t: 0:00 からの分（日本時間）。深夜帯は前日からの続き（24時台）として扱う */
export function stateAt(train: Train, route: Route, now: number): TrainState | null {
  const s = train.s;
  const t = now < 180 ? now + 1440 : now;
  const lastK = s.length - 1;
  if (t < s[0][2] - BEFORE_DEPARTURE || t > s[lastK][1] + AFTER_ARRIVAL) return null;

  const nextStopFrom = (k: number) => {
    for (let j = k; j < s.length; j++) if (s[j][3] === 1) return j;
    return null;
  };
  const station = (k: number) => route.stations[s[k][0]];
  const dir = station(s.length - 1).km >= station(0).km ? 1 : -1;
  const heading = (b: number) => (dir === 1 ? b : (b + 180) % 360);

  for (let k = 0; k < s.length; k++) {
    const [idx] = s[k];
    const dep = s[k][2];
    // 始発駅では発車前から、終着駅では到着後もしばらくホームにいる
    const arr = k === 0 ? dep - BEFORE_DEPARTURE : s[k][1];
    const until = k === lastK ? arr + AFTER_ARRIVAL : dep;
    if (t >= arr && t <= until) {
      const km = station(k).km;
      const { pos, bearing } = pointAt(route, km);
      const nextStop = nextStopFrom(k + 1);
      return {
        train, id: trainId(train), pos, bearing: heading(bearing), at: idx, stopped: s[k][3] === 1, nextStop,
        line: station(k).line, speed: 0, km, dir, limitKm: km,
      };
    }
    if (k + 1 < s.length && t > dep && t < s[k + 1][1]) {
      const a = station(k);
      const b = station(k + 1);
      const span = s[k + 1][1] - dep;
      const f = (t - dep) / span;
      const fromStop = s[k][3] === 1;
      const toStop = s[k + 1][3] === 1;
      const ease = fromStop && toStop ? easeBoth : fromStop ? easeIn : toStop ? easeOut : (x: number) => x;
      const e = ease(f);
      const km = a.km + (b.km - a.km) * e;
      const { pos, bearing } = pointAt(route, km);
      // 速度 = 区間の平均速度 × 加減速カーブの傾き
      const f1 = Math.max(0, f - 0.001);
      const f2 = Math.min(1, f + 0.001);
      const slope = (ease(f2) - ease(f1)) / (f2 - f1);
      const speed = Math.abs(slope * (b.km - a.km)) / (span / 60);
      const nextStop = nextStopFrom(k + 1);
      const limitKm = nextStop !== null ? station(nextStop).km : station(s.length - 1).km;
      return {
        train, id: trainId(train), pos, bearing: heading(bearing), at: idx, stopped: false, nextStop,
        line: b.line, speed, km, dir, limitKm,
      };
    }
  }
  return null;
}

/** 前回の推定から minutes 分たったときの距離程（推定速度のまま進め、次の停車駅で止める） */
export function advance(st: TrainState, minutes: number): number {
  if (st.speed <= 0) return st.km;
  const km = st.km + (st.dir * st.speed * minutes) / 60;
  return st.dir === 1 ? Math.min(km, st.limitKm) : Math.max(km, st.limitKm);
}

/** 距離程の地点と、進行方向に合わせた向き */
export function placeAt(route: Route, km: number, dir: 1 | -1): { pos: LngLat; bearing: number } {
  const { pos, bearing } = pointAt(route, km);
  return { pos, bearing: dir === 1 ? bearing : (bearing + 180) % 360 };
}

export function formatTime(min: number): string {
  const m = Math.round(min) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
}

/** 現在の日本時間を 0:00 からの分で返す */
export function jstNowMinutes(date = new Date()): number {
  const ms = date.getTime() + 9 * 3600 * 1000;
  return ((ms / 60000) % 1440 + 1440) % 1440;
}
