// 駅名・列車名・路線名・空港名の英語表記（駅名は JR 各社の公式のローマ字表記に合わせる）

export const STATIONS: Record<string, string> = {
  東京: 'Tokyo', 品川: 'Shinagawa', 新横浜: 'Shin-Yokohama', 小田原: 'Odawara', 熱海: 'Atami', 三島: 'Mishima',
  新富士: 'Shin-Fuji', 静岡: 'Shizuoka', 掛川: 'Kakegawa', 浜松: 'Hamamatsu', 豊橋: 'Toyohashi', 三河安城: 'Mikawa-Anjo',
  名古屋: 'Nagoya', 岐阜羽島: 'Gifu-Hashima', 米原: 'Maibara', 京都: 'Kyoto', 新大阪: 'Shin-Osaka', 新神戸: 'Shin-Kobe',
  西明石: 'Nishi-Akashi', 姫路: 'Himeji', 相生: 'Aioi', 岡山: 'Okayama', 新倉敷: 'Shin-Kurashiki', 福山: 'Fukuyama',
  新尾道: 'Shin-Onomichi', 三原: 'Mihara', 東広島: 'Higashi-Hiroshima', 広島: 'Hiroshima', 新岩国: 'Shin-Iwakuni',
  徳山: 'Tokuyama', 新山口: 'Shin-Yamaguchi', 厚狭: 'Asa', 新下関: 'Shin-Shimonoseki', 小倉: 'Kokura', 博多: 'Hakata',
  新鳥栖: 'Shin-Tosu', 久留米: 'Kurume', 筑後船小屋: 'Chikugo-Funagoya', 新大牟田: 'Shin-Omuta', 新玉名: 'Shin-Tamana',
  熊本: 'Kumamoto', 新八代: 'Shin-Yatsushiro', 新水俣: 'Shin-Minamata', 出水: 'Izumi', 川内: 'Sendai (Kagoshima)',
  鹿児島中央: 'Kagoshima-Chuo', 武雄温泉: 'Takeo-Onsen', 嬉野温泉: 'Ureshino-Onsen', 新大村: 'Shin-Omura', 諫早: 'Isahaya',
  長崎: 'Nagasaki', 上野: 'Ueno', 大宮: 'Omiya', 小山: 'Oyama', 宇都宮: 'Utsunomiya', 那須塩原: 'Nasushiobara',
  新白河: 'Shin-Shirakawa', 郡山: 'Koriyama', 福島: 'Fukushima', 白石蔵王: 'Shiroishi-Zao', 仙台: 'Sendai', 古川: 'Furukawa',
  くりこま高原: 'Kurikoma-Kogen', 一ノ関: 'Ichinoseki', 水沢江刺: 'Mizusawa-Esashi', 北上: 'Kitakami', 新花巻: 'Shin-Hanamaki',
  盛岡: 'Morioka', いわて沼宮内: 'Iwate-Numakunai', 二戸: 'Ninohe', 八戸: 'Hachinohe', 七戸十和田: 'Shichinohe-Towada',
  新青森: 'Shin-Aomori', 奥津軽いまべつ: 'Okutsugaru-Imabetsu', 木古内: 'Kikonai', 新函館北斗: 'Shin-Hakodate-Hokuto',
  熊谷: 'Kumagaya', 本庄早稲田: 'Honjo-Waseda', 高崎: 'Takasaki', 上毛高原: 'Jomo-Kogen', 越後湯沢: 'Echigo-Yuzawa',
  浦佐: 'Urasa', 長岡: 'Nagaoka', 燕三条: 'Tsubame-Sanjo', 新潟: 'Niigata', 安中榛名: 'Annaka-Haruna', 軽井沢: 'Karuizawa',
  佐久平: 'Sakudaira', 上田: 'Ueda', 長野: 'Nagano', 飯山: 'Iiyama', 上越妙高: 'Joetsumyoko', 糸魚川: 'Itoigawa',
  黒部宇奈月温泉: 'Kurobe-Unazukionsen', 富山: 'Toyama', 新高岡: 'Shin-Takaoka', 金沢: 'Kanazawa', 小松: 'Komatsu',
  加賀温泉: 'Kagaonsen', 芦原温泉: 'Awaraonsen', 福井: 'Fukui', 越前たけふ: 'Echizen-Takefu', 敦賀: 'Tsuruga',
  米沢: 'Yonezawa', 高畠: 'Takahata', 赤湯: 'Akayu', かみのやま温泉: 'Kaminoyama-Onsen', 山形: 'Yamagata', 天童: 'Tendo',
  さくらんぼ東根: 'Sakurambo-Higashine', 村山: 'Murayama', 大石田: 'Oishida', 新庄: 'Shinjo', 雫石: 'Shizukuishi',
  田沢湖: 'Tazawako', 角館: 'Kakunodate', 大曲: 'Omagari', 秋田: 'Akita',
};

export const TRAINS: Record<string, string> = {
  のぞみ: 'Nozomi', ひかり: 'Hikari', こだま: 'Kodama', みずほ: 'Mizuho', さくら: 'Sakura', つばめ: 'Tsubame', かもめ: 'Kamome',
  はやぶさ: 'Hayabusa', はやて: 'Hayate', やまびこ: 'Yamabiko', なすの: 'Nasuno', こまち: 'Komachi', つばさ: 'Tsubasa',
  とき: 'Toki', たにがわ: 'Tanigawa', かがやき: 'Kagayaki', はくたか: 'Hakutaka', あさま: 'Asama', つるぎ: 'Tsurugi',
};

export const LINES: Record<string, string> = {
  tokaido: 'Tokaido Shinkansen', sanyo: 'Sanyo Shinkansen', kyushu: 'Kyushu Shinkansen', nishikyushu: 'Nishi-Kyushu Shinkansen',
  tohoku: 'Tohoku Shinkansen', hokkaido: 'Hokkaido Shinkansen', joetsu: 'Joetsu Shinkansen', hokuriku: 'Hokuriku Shinkansen',
  yamagata: 'Yamagata Shinkansen', akita: 'Akita Shinkansen',
};

/** 空港名から「空港」「飛行場」を除いた部分 */
const AIRPORTS: Record<string, string> = {
  長崎: 'Nagasaki', 北九州: 'Kitakyushu', 茨城: 'Ibaraki', 隠岐: 'Oki', 伊丹: 'Osaka Itami', 礼文: 'Rebun', 利尻: 'Rishiri',
  帯広: 'Obihiro', 釧路: 'Kushiro', 中標津: 'Nakashibetsu', 女満別: 'Memanbetsu', 紋別: 'Monbetsu', 旭川: 'Asahikawa',
  新千歳: 'New Chitose', 丘珠: 'Sapporo Okadama', 函館: 'Hakodate', 青森: 'Aomori', 三沢: 'Misawa', 大館能代: 'Odate-Noshiro',
  秋田: 'Akita', 花巻: 'Hanamaki', 庄内: 'Shonai', 山形: 'Yamagata', 仙台: 'Sendai', 福島: 'Fukushima', 調布: 'Chofu',
  神津島: 'Kozushima', 大島: 'Oshima', 新島: 'Niijima', 三宅島: 'Miyakejima', 八丈島: 'Hachijojima', 県営名古屋: 'Nagoya Komaki',
  八尾: 'Yao', 南紀白浜: 'Nanki-Shirahama', 新潟: 'Niigata', 佐渡: 'Sado', 壱岐: 'Iki', 対馬: 'Tsushima', 福江: 'Goto-Fukue',
  天草: 'Amakusa', 鹿児島: 'Kagoshima', 種子島: 'Tanegashima', 屋久島: 'Yakushima', 熊本: 'Kumamoto', 宮崎: 'Miyazaki',
  大分県央: 'Oita Kenou', 高知: 'Kochi', 松山: 'Matsuyama', 高松: 'Takamatsu', 徳島: 'Tokushima', 沖永良部: 'Okinoerabu',
  与論: 'Yoron', 北大東: 'Kitadaito', 南大東: 'Minamidaito', 伊江島: 'Iejima', 久米島: 'Kumejima', 宮古: 'Miyako',
  下地島: 'Shimojishima', 波照間: 'Hateruma', 与那国: 'Yonaguni', 多良間: 'Tarama', 松本: 'Matsumoto', 能登: 'Noto',
  富山: 'Toyama', 小松: 'Komatsu', 福井: 'Fukui', 但馬: 'Tajima', 鳥取: 'Tottori', 岡山: 'Okayama', 岡南: 'Okayama Konan',
  出雲: 'Izumo', 広島: 'Hiroshima', 石見: 'Iwami', 山口宇部: 'Yamaguchi Ube', 福岡: 'Fukuoka', 佐賀: 'Saga',
  徳之島: 'Tokunoshima', 喜界: 'Kikai', 慶良間: 'Kerama', 粟国: 'Aguni', 静岡: 'Shizuoka', 関西: 'Kansai',
  中部国際: 'Chubu Centrair', 大分: 'Oita', 神戸: 'Kobe', 奄美: 'Amami', 上五島: 'Kamigoto', 小値賀: 'Ojika', 成田: 'Narita',
  米子: 'Yonago', 稚内: 'Wakkanai', 石垣: 'New Ishigaki', 岩国錦帯橋: 'Iwakuni Kintaikyo', 奥尻: 'Okushiri', 羽田: 'Haneda',
  那覇: 'Naha',
};

/** 空港の IATA コード（定期便の経路と照らし合わせる。コードのない飛行場は載せない） */
const IATA: Record<string, string> = {
  長崎: 'NGS', 北九州: 'KKJ', 茨城: 'IBR', 隠岐: 'OKI', 伊丹: 'ITM', 礼文: 'RBJ', 利尻: 'RIS', 帯広: 'OBO', 釧路: 'KUH',
  中標津: 'SHB', 女満別: 'MMB', 紋別: 'MBE', 旭川: 'AKJ', 新千歳: 'CTS', 丘珠: 'OKD', 函館: 'HKD', 青森: 'AOJ', 三沢: 'MSJ',
  大館能代: 'ONJ', 秋田: 'AXT', 花巻: 'HNA', 庄内: 'SYO', 山形: 'GAJ', 仙台: 'SDJ', 福島: 'FKS', 大島: 'OIM', 三宅島: 'MYE',
  八丈島: 'HAC', 県営名古屋: 'NKM', 南紀白浜: 'SHM', 新潟: 'KIJ', 佐渡: 'SDS', 壱岐: 'IKI', 対馬: 'TSJ', 福江: 'FUJ',
  天草: 'AXJ', 鹿児島: 'KOJ', 種子島: 'TNE', 屋久島: 'KUM', 熊本: 'KMJ', 宮崎: 'KMI', 高知: 'KCZ', 松山: 'MYJ', 高松: 'TAK',
  徳島: 'TKS', 沖永良部: 'OKE', 与論: 'RNJ', 北大東: 'KTD', 南大東: 'MMD', 伊江島: 'IEJ', 久米島: 'UEO', 宮古: 'MMY',
  下地島: 'SHI', 波照間: 'HTR', 与那国: 'OGN', 多良間: 'TRA', 松本: 'MMJ', 能登: 'NTQ', 富山: 'TOY', 小松: 'KMQ', 福井: 'FKJ',
  但馬: 'TJH', 鳥取: 'TTJ', 岡山: 'OKJ', 出雲: 'IZO', 広島: 'HIJ', 石見: 'IWJ', 山口宇部: 'UBJ', 福岡: 'FUK', 佐賀: 'HSG',
  徳之島: 'TKN', 喜界: 'KKX', 慶良間: 'KJP', 粟国: 'AGJ', 静岡: 'FSZ', 関西: 'KIX', 中部国際: 'NGO', 大分: 'OIT', 神戸: 'UKB',
  奄美: 'ASJ', 成田: 'NRT', 米子: 'YGJ', 稚内: 'WKJ', 石垣: 'ISG', 岩国錦帯橋: 'IWK', 奥尻: 'OIR', 羽田: 'HND', 那覇: 'OKA',
};

const baseName = (name: string) => /^(.*?)(空港|飛行場)$/.exec(name)?.[1] ?? name;
export const airportCode = (name: string): string => IATA[baseName(name)] ?? '';

const BY_CODE = new Map(Object.entries(IATA).map(([base, code]) => [code, base]));
/** 日本の空港（国際線かどうかの判定に使う） */
export const isJapanAirport = (code: string) => BY_CODE.has(code);
/** 発着の一覧の相手の空港: 日本の空港は「伊丹 ITM」、それ以外はコードだけ */
export function airportByCode(code: string, en: boolean): string {
  const base = BY_CODE.get(code);
  if (!base) return code;
  return `${en ? (AIRPORTS[base] ?? base) : base} ${code}`;
}

export function airport(name: string): string {
  const m = /^(.*?)(空港|飛行場)$/.exec(name);
  if (!m || !AIRPORTS[m[1]]) return name;
  return `${AIRPORTS[m[1]]} ${m[2] === '空港' ? 'Airport' : 'Airfield'}`;
}
