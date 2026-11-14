// 推定時刻表のもとになる運転パターン（実際のダイヤとは異なります）
// from/to: 始発・終着駅（上り列車は自動で逆向きを生成）
// stops: 途中停車駅（'all' は各駅停車） / times: 始発駅の発車時刻

const hm = (s) => {
  const [h, m] = s.split(':').map(Number);
  return h * 60 + m;
};
export const every = (from, to, interval) => {
  const out = [];
  for (let t = hm(from); t <= hm(to); t += interval) out.push(t);
  return out;
};
export const at = (...list) => list.map(hm);

// 列車種別: v=最高運転速度(km/h) dwell=標準停車時間(分) color=地図上の色
export const TYPES = {
  のぞみ: { v: 300, dwell: 1, color: '#f5a200' },
  ひかり: { v: 285, dwell: 1.5, color: '#e5392f' },
  こだま: { v: 285, dwell: 4, color: '#2f7fd8' },
  みずほ: { v: 300, dwell: 1, color: '#ff7a00' },
  さくら: { v: 300, dwell: 1.5, color: '#e8689b' },
  つばめ: { v: 260, dwell: 1, color: '#a31621' },
  かもめ: { v: 260, dwell: 1, color: '#d81e2b' },
  はやぶさ: { v: 320, dwell: 1, color: '#00a650' },
  こまち: { v: 320, dwell: 1, color: '#d7004b' },
  やまびこ: { v: 275, dwell: 1.5, color: '#4c5fc0' },
  つばさ: { v: 275, dwell: 1.5, color: '#9b59b6' },
  なすの: { v: 275, dwell: 1.5, color: '#1fa39a' },
  とき: { v: 275, dwell: 1.5, color: '#e0457b' },
  たにがわ: { v: 240, dwell: 1.5, color: '#6aa84f' },
  かがやき: { v: 260, dwell: 1, color: '#b8860b' },
  はくたか: { v: 260, dwell: 1.5, color: '#3d7bbf' },
  あさま: { v: 260, dwell: 1.5, color: '#7e57c2' },
  つるぎ: { v: 260, dwell: 1.5, color: '#c0392b' },
};

// 路線ごとの速度上限と、加減速による余分な時間（分/区間）
export const LINE_SPEED = {
  tokaido: { v: 250, penalty: 3, overrides: [['東京', '品川', 80], ['品川', '新横浜', 150]] },
  sanyo: { v: 270, penalty: 3 },
  kyushu: { v: 240, penalty: 3 },
  nishikyushu: { v: 230, penalty: 2.5 },
  tohoku: { v: 290, penalty: 3, overrides: [['東京', '上野', 70], ['上野', '大宮', 100], ['大宮', '宇都宮', 240], ['盛岡', '新青森', 260]] },
  hokkaido: { v: 160, penalty: 3 },
  joetsu: { v: 240, penalty: 3 },
  hokuriku: { v: 240, penalty: 3 },
  yamagata: { v: 100, penalty: 2 },
  akita: { v: 100, penalty: 2 },
};

// 駅ごとの最低停車時間（分）。分割併合・折り返しなど。
export const STATION_DWELL = { 新大阪: 2, 博多: 2, 盛岡: 2, 福島: 2, 大曲: 4, 新青森: 2, 仙台: 1.5, 長野: 1.5, 金沢: 1.5 };

const 東海道Nozomi = ['品川', '新横浜', '名古屋', '京都'];

export const SERVICES = [
  // 東海道・山陽
  { name: 'のぞみ', route: 'west', from: '東京', to: '博多', stops: [...東海道Nozomi, '新大阪', '新神戸', '岡山', '広島', '小倉'], times: every('06:00', '19:00', 30) },
  { name: 'のぞみ', route: 'west', from: '東京', to: '新大阪', stops: 東海道Nozomi, times: [...every('06:10', '21:10', 30), ...every('06:20', '21:20', 30)] },
  { name: 'ひかり', route: 'west', from: '東京', to: '新大阪', stops: ['品川', '新横浜', '静岡', '浜松', '名古屋', '岐阜羽島', '米原', '京都'], times: every('06:03', '21:03', 60) },
  { name: 'ひかり', route: 'west', from: '東京', to: '岡山', stops: ['品川', '新横浜', '小田原', '名古屋', '京都', '新大阪', '新神戸', '姫路'], times: every('06:33', '19:33', 60) },
  { name: 'こだま', route: 'west', from: '東京', to: '新大阪', stops: 'all', times: every('06:26', '20:26', 60) },
  { name: 'こだま', route: 'west', from: '東京', to: '名古屋', stops: 'all', times: every('06:56', '21:56', 60) },
  { name: 'みずほ', route: 'west', from: '新大阪', to: '鹿児島中央', stops: ['新神戸', '岡山', '広島', '小倉', '博多', '熊本'], times: at('06:00', '06:20', '07:00', '08:00', '17:00', '18:00', '19:00') },
  { name: 'さくら', route: 'west', from: '新大阪', to: '鹿児島中央', stops: ['新神戸', '姫路', '岡山', '福山', '広島', '徳山', '新山口', '小倉', '博多', '新鳥栖', '久留米', '熊本', '川内'], times: every('07:30', '19:30', 60) },
  { name: 'ひかり', route: 'west', from: '新大阪', to: '博多', stops: ['新神戸', '西明石', '姫路', '相生', '岡山', '福山', '三原', '広島', '徳山', '新山口', '小倉'], times: every('07:10', '19:10', 120) },
  { name: 'こだま', route: 'west', from: '新大阪', to: '博多', stops: 'all', times: every('06:00', '19:00', 60) },
  // 九州
  { name: 'さくら', route: 'west', from: '博多', to: '鹿児島中央', stops: ['新鳥栖', '久留米', '筑後船小屋', '熊本', '新八代', '出水', '川内'], times: every('06:15', '22:15', 60) },
  { name: 'つばめ', route: 'west', from: '博多', to: '熊本', stops: 'all', times: every('06:00', '23:00', 60) },
  { name: 'つばめ', route: 'west', from: '博多', to: '鹿児島中央', stops: 'all', times: every('06:45', '21:45', 120) },
  { name: 'かもめ', route: 'nishikyushu', from: '武雄温泉', to: '長崎', stops: 'all', times: every('06:00', '22:30', 45) },
  // 東北・北海道・秋田・山形
  { name: 'はやぶさ', route: 'tohoku', from: '東京', to: '新函館北斗', stops: ['上野', '大宮', '仙台', '盛岡', '八戸', '新青森', '木古内'], times: every('06:32', '18:32', 120) },
  { name: 'はやぶさ', route: 'tohoku', from: '東京', to: '新青森', stops: ['上野', '大宮', '仙台', '盛岡', '二戸', '八戸', '七戸十和田'], times: every('07:32', '19:32', 120) },
  { name: 'こまち', route: 'akita', from: '東京', to: '秋田', stops: ['上野', '大宮', '仙台', '盛岡', '雫石', '田沢湖', '角館', '大曲'], times: every('06:32', '19:32', 60) },
  { name: 'やまびこ', route: 'tohoku', from: '東京', to: '仙台', stops: ['上野', '大宮', '宇都宮', '郡山', '福島'], times: every('06:40', '21:40', 60) },
  { name: 'つばさ', route: 'yamagata', from: '東京', to: '新庄', stops: ['上野', '大宮', '宇都宮', '郡山', '福島', '米沢', '高畠', '赤湯', 'かみのやま温泉', '山形', '天童', 'さくらんぼ東根', '村山', '大石田'], times: every('06:40', '20:40', 120) },
  { name: 'つばさ', route: 'yamagata', from: '東京', to: '山形', stops: ['上野', '大宮', '宇都宮', '郡山', '福島', '米沢', '高畠', '赤湯', 'かみのやま温泉'], times: every('07:40', '21:40', 120) },
  { name: 'やまびこ', route: 'tohoku', from: '東京', to: '盛岡', stops: 'all', times: every('06:04', '19:04', 120) },
  { name: 'なすの', route: 'tohoku', from: '東京', to: '那須塩原', stops: 'all', times: every('06:20', '22:20', 60) },
  // 上越
  { name: 'とき', route: 'joetsu', from: '東京', to: '新潟', stops: ['上野', '大宮', '高崎', '越後湯沢', '浦佐', '長岡', '燕三条'], times: every('06:08', '21:08', 60) },
  { name: 'たにがわ', route: 'joetsu', from: '東京', to: '越後湯沢', stops: ['上野', '大宮', '熊谷', '本庄早稲田', '高崎', '上毛高原'], times: every('06:52', '21:52', 60) },
  // 北陸
  { name: 'かがやき', route: 'hokuriku', from: '東京', to: '敦賀', stops: ['上野', '大宮', '長野', '富山', '金沢', '福井'], times: every('06:16', '19:46', 90) },
  { name: 'はくたか', route: 'hokuriku', from: '東京', to: '金沢', stops: ['上野', '大宮', '高崎', '軽井沢', '佐久平', '上田', '長野', '飯山', '上越妙高', '糸魚川', '黒部宇奈月温泉', '富山', '新高岡'], times: every('06:24', '20:24', 60) },
  { name: 'あさま', route: 'hokuriku', from: '東京', to: '長野', stops: ['上野', '大宮', '高崎', '安中榛名', '軽井沢', '佐久平', '上田'], times: every('06:00', '22:00', 60) },
  { name: 'つるぎ', route: 'hokuriku', from: '金沢', to: '敦賀', stops: 'all', times: every('06:00', '22:30', 60) },
];
