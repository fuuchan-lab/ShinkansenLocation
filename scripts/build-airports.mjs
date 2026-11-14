// 国土数値情報「空港データ（C28）」から空港の位置を生成する。
// 使い方: node scripts/build-airports.mjs <C28のUTF-8 GeoJSONがあるディレクトリ>
// 出力: public/data/airports.json
import fs from 'node:fs';
import path from 'node:path';

const dir = process.argv[2];
if (!dir) {
  console.error('usage: node scripts/build-airports.mjs <C28 UTF-8 directory>');
  process.exit(1);
}
const file = fs.readdirSync(dir).find((n) => n.endsWith('_Airport.geojson'));
const features = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8')).features;

// 正式名称より通称のほうが分かりやすい空港
const ALIAS = {
  東京国際空港: '羽田空港', 成田国際空港: '成田空港', 大阪国際空港: '伊丹空港', 関西国際空港: '関西空港',
  中部国際空港: '中部国際空港', 名古屋飛行場: '県営名古屋空港', 百里飛行場: '茨城空港', 札幌飛行場: '丘珠空港',
  三沢飛行場: '三沢空港', 小松飛行場: '小松空港', 徳島飛行場: '徳島空港', 美保飛行場: '米子空港',
  岩国飛行場: '岩国錦帯橋空港', 但馬飛行場: '但馬空港', 天草飛行場: '天草空港', 新石垣空港: '石垣空港',
};

const rings =(g) => (g.type === 'Polygon' ? [g.coordinates[0]] : g.type === 'MultiPolygon' ? g.coordinates.map((p) => p[0]) : []);

const byName = new Map();
for (const f of features) {
  const name = String(f.properties.C28_005).replace(/[（(].*[)）]$/, '');
  const pts = byName.get(name) ?? [];
  for (const r of rings(f.geometry)) pts.push(...r);
  byName.set(name, pts);
}

const airports = [...byName].map(([name, pts]) => {
  const lng = pts.reduce((s, p) => s + p[0], 0) / pts.length;
  const lat = pts.reduce((s, p) => s + p[1], 0) / pts.length;
  return { name: ALIAS[name] ?? name, lng: Math.round(lng * 1e5) / 1e5, lat: Math.round(lat * 1e5) / 1e5 };
});

fs.writeFileSync('public/data/airports.json', JSON.stringify({ attribution: '国土数値情報（空港データ）C28 国土交通省 を加工して作成', airports }));
console.log(`wrote ${airports.length} airports`);
