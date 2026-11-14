// 日本以外を隠すためのマスク（日本の周りに穴をあけた多角形）を生成する。
// 使い方: node scripts/build-mask.mjs <Natural Earth ne_10m_admin_0_countries.geojson>
// 出力: public/data/mask.json
import fs from 'node:fs';
import * as turf from '@turf/turf';

const src = process.argv[2];
if (!src) {
  console.error('usage: node scripts/build-mask.mjs <ne_10m_admin_0_countries.geojson>');
  process.exit(1);
}
const countries = JSON.parse(fs.readFileSync(src, 'utf8')).features;
const japan = countries.find((f) => f.properties.ADMIN === 'Japan');
const russia = countries.find((f) => f.properties.ADMIN === 'Russia');

// 北方領土（Natural Earth ではロシアに含まれる）
const inBox = (poly, [w, s, e, n]) => poly[0].every(([x, y]) => x >= w && x <= e && y >= s && y <= n);
const northern = russia.geometry.coordinates.filter((p) => inBox(p, [145.3, 43.2, 149.0, 45.7]));
// 竹島・尖閣諸島（小さな島はデータにないことがあるため点で補う）
const islets = [turf.point([131.865, 37.241]), turf.point([123.48, 25.75])].map((p) => turf.buffer(p, 6, { units: 'kilometers' }));

const land = turf.multiPolygon([...japan.geometry.coordinates, ...northern]);
// 海岸線が地図タイルとずれても切れないよう少し広げる
const buffered = turf.buffer(land, 10, { units: 'kilometers' });
const area = turf.union(turf.featureCollection([buffered, ...islets]));
const simple = turf.simplify(area, { tolerance: 0.01, highQuality: true });

const world = turf.bboxPolygon([90, -10, 190, 70]);
const mask = turf.difference(turf.featureCollection([world, simple]));
mask.geometry.coordinates = JSON.parse(JSON.stringify(mask.geometry.coordinates, (_, v) => (typeof v === 'number' ? Math.round(v * 1e4) / 1e4 : v)));
mask.properties = { attribution: 'Natural Earth' };

fs.writeFileSync('public/data/mask.json', JSON.stringify(mask));
console.log(`wrote public/data/mask.json (${(fs.statSync('public/data/mask.json').size / 1024).toFixed(0)} KB, northern polygons: ${northern.length})`);
