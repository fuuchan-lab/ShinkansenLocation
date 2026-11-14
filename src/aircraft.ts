// 飛行中の航空機（Cloudflare Worker 経由で adsb.lol から取得）
import type { LngLat } from './data';

export const AIRCRAFT_API: string = import.meta.env.VITE_AIRCRAFT_API ?? '';

export interface Aircraft {
  hex: string;
  callsign: string;
  lat: number;
  lon: number;
  /** 気圧高度 ft */
  alt: number | null;
  /** 対地速度 kt */
  gs: number | null;
  /** 機首の向き（度）。針路 → 前回位置からの向き → 到着地の方向 の順に決める */
  heading: number | null;
  type: string;
  reg: string;
  intl: boolean;
  /** この位置を観測した時刻（ms） */
  at: number;
  from: string;
  to: string;
}

type Row = [
  string, string, number, number, number | null, number | null, number | null, string, string, 0 | 1, number,
  string, string, number | null, number | null,
];

const rad = (d: number) => (d * Math.PI) / 180;
function bearing([lon1, lat1]: LngLat, [lon2, lat2]: LngLat): number {
  const y = Math.sin(rad(lon2 - lon1)) * Math.cos(rad(lat2));
  const x = Math.cos(rad(lat1)) * Math.sin(rad(lat2)) - Math.sin(rad(lat1)) * Math.cos(rad(lat2)) * Math.cos(rad(lon2 - lon1));
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}
const movedKm = ([lon1, lat1]: LngLat, [lon2, lat2]: LngLat) =>
  Math.hypot((lon2 - lon1) * 111.32 * Math.cos(rad(lat1)), (lat2 - lat1) * 111.32);

/** prev: 前回取得した機体（針路が送られていない機体の向きの推定に使う） */
export async function fetchAircraft(prev: Aircraft[]): Promise<Aircraft[]> {
  const res = await fetch(AIRCRAFT_API);
  if (!res.ok) throw new Error(`aircraft ${res.status}`);
  const data = (await res.json()) as { now: number; ac: Row[] };
  const before = new Map(prev.map((a) => [a.hex, a]));
  return data.ac.map(([hex, callsign, lat, lon, alt, gs, track, type, reg, intl, seen, from, to, destLat, destLon]) => {
    let heading = track;
    const p = before.get(hex);
    if (heading === null && p && movedKm([p.lon, p.lat], [lon, lat]) > 0.5) heading = bearing([p.lon, p.lat], [lon, lat]);
    if (heading === null && destLat !== null && destLon !== null) heading = bearing([lon, lat], [destLon, destLat]);
    if (heading === null && p) heading = p.heading;
    return { hex, callsign, lat, lon, alt, gs, heading, type, reg, intl: intl === 1, at: data.now - seen * 1000, from, to };
  });
}

/** 観測位置から対地速度・機首の向きのまま進めた位置（最大3分先まで） */
export function aircraftAt(a: Aircraft, ms: number): LngLat {
  if (!a.gs || a.heading === null) return [a.lon, a.lat];
  const hours = Math.min(Math.max(0, ms - a.at), 180_000) / 3_600_000;
  const km = a.gs * 1.852 * hours;
  const t = rad(a.heading);
  return [a.lon + (km * Math.sin(t)) / (111.32 * Math.cos(rad(a.lat))), a.lat + (km * Math.cos(t)) / 111.32];
}

export const aircraftLabel = (a: Aircraft) => a.callsign || a.reg || a.hex.toUpperCase();
