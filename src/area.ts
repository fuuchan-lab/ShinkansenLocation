// アプリの対象範囲（陸地を含む日本の排他的経済水域）
import type { LngLat } from './data';

export interface AreaFeature {
  type: 'Feature';
  properties: Record<string, unknown>;
  geometry: { type: 'MultiPolygon'; coordinates: LngLat[][][] };
}

let polygons: LngLat[][] = [];

export function setArea(area: AreaFeature) {
  // 外周のみ（穴は build-area.mjs で埋めてある）
  polygons = area.geometry.coordinates.map((p) => p[0]);
}

/** 範囲内か（範囲が未設定なら常に true） */
export function inArea([x, y]: LngLat): boolean {
  if (!polygons.length) return true;
  return polygons.some((ring) => {
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i];
      const [xj, yj] = ring[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  });
}
