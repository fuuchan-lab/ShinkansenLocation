// 旅客船（Cloudflare Worker 経由で aisstream.io の AIS データから取得）
import { bearing, deadReckon, LIVE_API, movedKm } from './aircraft';
import type { LngLat } from './data';

export interface Ship {
  mmsi: number;
  name: string;
  lat: number;
  lon: number;
  /** 速力 kn */
  sog: number | null;
  /** 船首の向き（度）。航行中は進んでいる向き（COG）、停泊中は船首方位 */
  heading: number | null;
  moving: boolean;
  type: number;
  dest: string;
  /** 全長 m */
  length: number | null;
  /** この位置を受信した時刻（ms） */
  at: number;
}

type Row = [number, string, number, number, number | null, number | null, number | null, number, string, number, number | null];

/** 止まっているとみなす速力（kn） */
const MOORED_KNOTS = 1;

export async function fetchShips(prev: Ship[]): Promise<Ship[]> {
  const res = await fetch(`${LIVE_API}/ships`);
  if (!res.ok) throw new Error(`ships ${res.status}`);
  const data = (await res.json()) as { now: number; ships: Row[] };
  const before = new Map(prev.map((s) => [s.mmsi, s]));
  return data.ships.map(([mmsi, name, lat, lon, sog, cog, hdg, type, dest, age, length]) => {
    const moving = (sog ?? 0) >= MOORED_KNOTS;
    const p = before.get(mmsi);
    let heading = moving ? cog ?? hdg : hdg ?? cog;
    if (heading === null && p && movedKm([p.lon, p.lat], [lon, lat]) > 0.05) heading = bearing([p.lon, p.lat], [lon, lat]);
    if (heading === null && p) heading = p.heading;
    return { mmsi, name, lat, lon, sog, heading, moving, type, dest, length, at: data.now - age * 1000 };
  });
}

/** 航行中は速力と針路で進めた位置、停泊中は受信位置 */
export const shipAt = (s: Ship, ms: number): LngLat => (s.moving ? deadReckon(s.lon, s.lat, s.sog, s.heading, ms - s.at) : [s.lon, s.lat]);

export const shipLabel = (s: Ship) => s.name || `MMSI ${s.mmsi}`;
