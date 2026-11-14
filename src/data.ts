// network.json / timetable.json の型と、経路ジオメトリの組み立て

export type LngLat = [number, number];

export interface Station { name: string; km: number; lng: number; lat: number }
export interface Line { id: string; name: string; color: string; operator: string; coords: LngLat[]; stations: Station[] }
export interface RouteStation { name: string; km: number; line: string }
export interface RouteDef { id: string; parts: [string, string, string][]; stations: RouteStation[] }
export interface Network { attribution: string; lines: Line[]; routes: RouteDef[] }

/** [経路内の駅index, 着(分), 発(分), 停車=1/通過=0] */
export type TimetableStop = [number, number, number, 0 | 1];
export interface Train { n: string; no: number; r: string; s: TimetableStop[] }
export interface Timetable { note: string; types: Record<string, { color: string }>; trains: Train[] }

/** 距離程つきの折れ線 */
export interface Route {
  id: string;
  stations: RouteStation[];
  coords: LngLat[];
  kms: number[];
}

const R = 6371.0088;
const rad = (d: number) => (d * Math.PI) / 180;
export function distKm([lng1, lat1]: LngLat, [lng2, lat2]: LngLat): number {
  const dLat = rad(lat2 - lat1);
  const dLng = rad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function cumulative(coords: LngLat[]): number[] {
  const kms = [0];
  for (let i = 1; i < coords.length; i++) kms.push(kms[i - 1] + distKm(coords[i - 1], coords[i]));
  return kms;
}

/** 路線の区間をつないで経路の折れ線を作る（駅は折れ線の頂点上にある） */
export function buildRoutes(network: Network): Map<string, Route> {
  const lineGeom = new Map(network.lines.map((l) => [l.id, { line: l, kms: cumulative(l.coords) }]));
  const routes = new Map<string, Route>();
  for (const def of network.routes) {
    const coords: LngLat[] = [];
    for (const [lineId, from, to] of def.parts) {
      const g = lineGeom.get(lineId)!;
      const k0 = g.line.stations.find((s) => s.name === from)!.km;
      const k1 = g.line.stations.find((s) => s.name === to)!.km;
      const eps = 1e-3;
      g.line.coords.forEach((c, i) => {
        if (g.kms[i] >= k0 - eps && g.kms[i] <= k1 + eps) {
          if (!coords.length || coords[coords.length - 1][0] !== c[0] || coords[coords.length - 1][1] !== c[1]) coords.push(c);
        }
      });
    }
    routes.set(def.id, { id: def.id, stations: def.stations, coords, kms: cumulative(coords) });
  }
  return routes;
}

/** 経路上の距離程 km の地点と進行方位（度） */
export function pointAt(route: Route, km: number): { pos: LngLat; bearing: number } {
  const { coords, kms } = route;
  let lo = 0;
  let hi = kms.length - 1;
  if (km <= 0) hi = 1;
  else if (km >= kms[hi]) lo = hi - 1;
  else {
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (kms[mid] <= km) lo = mid;
      else hi = mid;
    }
  }
  const a = coords[lo];
  const b = coords[hi];
  const f = Math.min(1, Math.max(0, (km - kms[lo]) / (kms[hi] - kms[lo] || 1)));
  const pos: LngLat = [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
  const y = Math.sin(rad(b[0] - a[0])) * Math.cos(rad(b[1]));
  const x = Math.cos(rad(a[1])) * Math.sin(rad(b[1])) - Math.sin(rad(a[1])) * Math.cos(rad(b[1])) * Math.cos(rad(b[0] - a[0]));
  const bearing = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
  return { pos, bearing };
}

export interface Airport { name: string; lng: number; lat: number }

export async function loadData(): Promise<{ network: Network; timetable: Timetable; airports: Airport[] }> {
  const base = import.meta.env.BASE_URL;
  const get = <T>(file: string) => fetch(`${base}data/${file}`).then((r) => r.json() as Promise<T>);
  const [network, timetable, airports] = await Promise.all([
    get<Network>('network.json'),
    get<Timetable>('timetable.json'),
    get<{ airports: Airport[] }>('airports.json'),
  ]);
  return { network, timetable, airports: airports.airports };
}
