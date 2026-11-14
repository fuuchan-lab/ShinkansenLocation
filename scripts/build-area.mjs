// アプリの対象範囲（陸地を含む日本の排他的経済水域）と、範囲外を隠すマスクを生成する。
// 使い方: node scripts/build-area.mjs <Marine Regions の EEZ GeoJSON>
//   取得例: https://geo.vliz.be/geoserver/MarineRegions/wfs?service=WFS&version=1.0.0&request=GetFeature
//           &typeName=MarineRegions:eez&outputFormat=application/json&propertyName=mrgid,geoname,the_geom
//           &cql_filter=mrgid%20IN%20(8487,48950,48954,48955)
//   8487: 日本の EEZ / 48950: 北方領土 / 48954: 尖閣諸島 / 48955: 竹島（日本が主張する区域）
// 出力: public/data/area.json（対象範囲）, public/data/mask.json（範囲外）
import fs from 'node:fs';
import * as turf from '@turf/turf';

const src = process.argv[2];
if (!src) {
  console.error('usage: node scripts/build-area.mjs <eez.geojson>');
  process.exit(1);
}
const features = JSON.parse(fs.readFileSync(src, 'utf8')).features;

const merged = features.length > 1 ? turf.union(turf.featureCollection(features)) : features[0];
// 外周だけを残す: 陸地（EEZ では穴になっている）や範囲内の抜けも対象範囲に含める
const polys = merged.geometry.type === 'Polygon' ? [merged.geometry.coordinates] : merged.geometry.coordinates;
const outer = turf.multiPolygon(polys.map((p) => [p[0]]));
const area = turf.simplify(outer, { tolerance: 0.01, highQuality: true });

const roundCoords = (f) => {
  f.geometry.coordinates = JSON.parse(JSON.stringify(f.geometry.coordinates, (_, v) => (typeof v === 'number' ? Math.round(v * 1e4) / 1e4 : v)));
  return f;
};
area.properties = { attribution: 'Marine Regions (VLIZ) World EEZ, CC BY 4.0 を加工して作成' };
roundCoords(area);

const world = turf.bboxPolygon([100, -10, 190, 70]);
const mask = roundCoords(turf.difference(turf.featureCollection([world, area])));
mask.properties = {};

fs.writeFileSync('public/data/area.json', JSON.stringify(area));
fs.writeFileSync('public/data/mask.json', JSON.stringify(mask));
const kb = (f) => (fs.statSync(f).size / 1024).toFixed(0);
console.log(`area: ${area.geometry.coordinates.length} polygons, ${kb('public/data/area.json')} KB / bbox ${turf.bbox(area).map((x) => x.toFixed(2)).join(', ')}`);
console.log(`mask: ${kb('public/data/mask.json')} KB`);
