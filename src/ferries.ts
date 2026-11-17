// 主要なフェリー航路の推定位置（public/data/ferries.json。scripts/build-ferries.mjs で生成）。
// 日本近海の沖合は AIS の受信局がほとんどないため、時刻表から位置を推定して表示する。
// AIS で実際の位置が届いている船は、そちらを使う（推定は出さない）
import type { LngLat } from './data';
import { lang } from './i18n';
import type { Ship } from './ships';

interface FerryData {
  /** [名前, 英語名, 経度, 緯度] */
  ports: [string, string, number, number][];
  routes: { id: string; op: string; opEn: string; name: string; nameEn: string; url: string }[];
  legs: LngLat[][];
  /**
   * r: 航路, d: 運航する曜日のビット（日=1…土=64）, on: 運航する日だけ（1970-01-01 からの日数）,
   * ev: [何日ごと, 基準の日], ex: 運休日, pr: 運航する期間, s: [港, 着(分), 発(分)]（出発日の 0 時から）, l: 区間の線（負は逆向き）
   */
  sailings: {
    r: number; d: number; on?: number[]; ev?: [number, number]; ex?: number[]; pr?: [number, number][];
    ship: string; mmsi: number | null; s: [number, number | null, number | null][]; l: number[];
  }[];
  /** [船名, 英語名, MMSI, 航路] */
  ships: [string, string, number | null, number][];
}

export interface FerryEstimate {
  route: FerryData['routes'][number];
  /** 区間の出発港・到着港（寄港中は同じ港） */
  from: string;
  fromEn: string;
  to: string;
  toEn: string;
  /** 出発・到着の時刻（その日の 0 時からの分。日をまたぐと 1440 以上） */
  dep: number;
  arr: number;
  /** 寄港中 */
  inPort: boolean;
  /** 始発港と終着港 */
  origin: string;
  originEn: string;
  terminus: string;
  terminusEn: string;
}

/** 推定位置の船（Ship と同じ形で、推定の情報を持つ） */
export interface FerryShip extends Ship {
  est: FerryEstimate;
  /** 船の英語名（AIS の船名と照らし合わせる） */
  nameEn: string;
  pos: LngLat;
}

let data: FerryData | null = null;
/** 区間ごとの累積距離（km） */
let legKm: number[][] = [];

export async function loadFerries(): Promise<void> {
  const res = await fetch('/data/ferries.json');
  if (!res.ok) throw new Error(`ferries ${res.status}`);
  data = (await res.json()) as FerryData;
  legKm = data.legs.map((line) => {
    const acc = [0];
    for (let i = 1; i < line.length; i++) acc.push(acc[i - 1] + km(line[i - 1], line[i]));
    return acc;
  });
}

const R = 6371;
const rad = (d: number) => (d * Math.PI) / 180;
function km(a: LngLat, b: LngLat): number {
  const dLat = rad(b[1] - a[1]), dLon = rad(b[0] - a[0]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[1])) * Math.cos(rad(b[1])) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
function bearingOf(a: LngLat, b: LngLat): number {
  const y = Math.sin(rad(b[0] - a[0])) * Math.cos(rad(b[1]));
  const x = Math.cos(rad(a[1])) * Math.sin(rad(b[1])) - Math.sin(rad(a[1])) * Math.cos(rad(b[1])) * Math.cos(rad(b[0] - a[0]));
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

/** 区間の線の上で、出発から frac（0〜1）進んだ位置と向き */
function along(leg: number, frac: number): { pos: LngLat; heading: number; km: number } {
  const rev = leg < 0;
  const i = rev ? -1 - leg : leg;
  const line = data!.legs[i], acc = legKm[i];
  const total = acc[acc.length - 1];
  const d = (rev ? 1 - frac : frac) * total;
  let k = 1;
  while (k < acc.length - 1 && acc[k] < d) k++;
  const a = line[k - 1], b = line[k];
  const f = acc[k] === acc[k - 1] ? 0 : (d - acc[k - 1]) / (acc[k] - acc[k - 1]);
  const pos: LngLat = [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
  return { pos, heading: rev ? bearingOf(b, a) : bearingOf(a, b), km: total };
}

/** 決まった番号（MMSI が分からない船の代わり）。航路と始発の時刻から作るので、データを作り直しても変わりにくい */
function syntheticId(route: string, port: number, dep: number): number {
  let h = 0;
  for (const c of `${route}:${port}:${dep}`) h = (h * 31 + c.charCodeAt(0)) | 0;
  return -(Math.abs(h) % 1_000_000_000) - 1;
}

/** その日（1970-01-01 からの日数、日本時間）に出る便か */
function runsOn(s: FerryData['sailings'][number], day: number): boolean {
  if (s.ex?.includes(day)) return false;
  if (s.pr && !s.pr.some(([a, b]) => day >= a && day <= b)) return false;
  if (s.on) return s.on.includes(day);
  if (s.ev) return (((day - s.ev[1]) % s.ev[0]) + s.ev[0]) % s.ev[0] === 0;
  return !!(s.d & (1 << ((day + 4) % 7))); // 1970-01-01 は木曜
}

/**
 * 表示する時刻の、航行中・寄港中のフェリー。
 * minutes: 表示する時刻（日本時間の 0 時からの分）、today: 日本時間の今日（1970-01-01 からの日数）
 */
export function estimateFerries(minutes: number, today: number, ms: number): FerryShip[] {
  if (!data) return [];
  const out: FerryShip[] = [];
  for (const s of data.sailings) {
    const first = s.s[0], last = s.s[s.s.length - 1];
    const start = first[2]!, end = last[1]!;
    // 何日前に出た便か（長い航路は 2 日以上かかる）
    for (let back = 0; back * 1440 <= end; back++) {
      const t = minutes + back * 1440;
      if (t < start || t > end) continue;
      if (!runsOn(s, today - back)) continue;
      const est = place(s, t);
      if (!est) continue;
      const route = data.routes[s.r];
      const name = s.ship;
      const shipInfo = data.ships.find((x) => x[0] === name && x[3] === s.r);
      const mmsi = s.mmsi ?? shipInfo?.[2] ?? syntheticId(route.id, first[0], start);
      const [o, oe] = data.ports[first[0]], [d, de] = data.ports[last[0]];
      const p = (i: number) => data!.ports[i];
      out.push({
        mmsi,
        // 船名が分からない便は航路名で表す
        name: (lang === 'en' ? shipInfo?.[1] : name) || name || (lang === 'en' ? route.nameEn : route.name),
        lat: est.pos[1],
        lon: est.pos[0],
        sog: est.knots,
        heading: est.heading,
        moving: !est.inPort,
        type: 60,
        dest: '',
        length: null,
        at: ms,
        pos: est.pos,
        nameEn: shipInfo?.[1] ?? '',
        est: {
          route, from: p(est.from)[0], fromEn: p(est.from)[1], to: p(est.to)[0], toEn: p(est.to)[1],
          dep: est.dep, arr: est.arr, inPort: est.inPort, origin: o, originEn: oe, terminus: d, terminusEn: de,
        },
      });
    }
  }
  return out;
}

function place(s: FerryData['sailings'][number], t: number) {
  for (let k = 0; k < s.s.length; k++) {
    const [port, arr, dep] = s.s[k];
    // 途中の港に寄港中
    if (arr !== null && dep !== null && t >= arr && t <= dep) {
      const [, , lon, lat] = data!.ports[port];
      const prevLeg = s.l[k - 1];
      return { pos: [lon, lat] as LngLat, heading: along(prevLeg, 1).heading, knots: 0, inPort: true, from: port, to: port, dep, arr };
    }
    const next = s.s[k + 1];
    if (!next || dep === null || next[1] === null) continue;
    if (t >= dep && t <= next[1]) {
      const frac = next[1] === dep ? 1 : (t - dep) / (next[1] - dep);
      const a = along(s.l[k], frac);
      const knots = next[1] > dep ? a.km / ((next[1] - dep) / 60) / 1.852 : 0;
      return { pos: a.pos, heading: a.heading, knots, inPort: false, from: port, to: next[0], dep, arr: next[1] };
    }
  }
  return null;
}

/** 船名を比べるための形（AIS の英字名と、データの英語名をそろえる） */
export const normName = (s: string) => s.toUpperCase().replace(/[^A-Z0-9]/g, '').replace(/^MV|NO(?=\d)/g, '');

/** AIS で位置が届いている船と同じ船の推定は除く（MMSI か英語名が一致） */
export function withoutReceived(est: FerryShip[], received: Ship[]): FerryShip[] {
  const ids = new Set(received.map((s) => s.mmsi));
  const names = new Set(received.map((s) => normName(s.name)).filter(Boolean));
  return est.filter((f) => !ids.has(f.mmsi) && !(f.nameEn && names.has(normName(f.nameEn))));
}

/** 分（日をまたぐと 1440 以上）を HH:MM に */
export const hhmm = (m: number) => {
  const v = ((Math.round(m) % 1440) + 1440) % 1440;
  return `${String(Math.floor(v / 60)).padStart(2, '0')}:${String(v % 60).padStart(2, '0')}`;
};
