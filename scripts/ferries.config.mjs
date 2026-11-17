// 主要なフェリー航路と時刻（推定位置の表示用）。node scripts/build-ferries.mjs で public/data/ferries.json を作る。
// 2026-11-17 時点の各社の時刻表などから作成。運航日が不定の航路・便は除いている。ダイヤが変わったら直す。
// 港の位置はおおよそ（数百 m ずれることがある）。days / except / period の書き方は build-ferries.mjs を参照
// 太平洋フェリーの名古屋発（隔日）の基準日は仮の値（要確認）
export const PORTS = {
 "名古屋": {
  "name": "名古屋",
  "en": "Nagoya",
  "pos": [
   136.853,
   35.062
  ]
 },
 "仙台": {
  "name": "仙台",
  "en": "Sendai",
  "pos": [
   141.0053,
   38.2745
  ]
 },
 "苫小牧": {
  "name": "苫小牧",
  "en": "Tomakomai",
  "pos": [
   141.6339,
   42.6371
  ]
 },
 "大洗": {
  "name": "大洗",
  "en": "Oarai",
  "pos": [
   140.5735,
   36.3093
  ]
 },
 "八戸": {
  "name": "八戸",
  "en": "Hachinohe",
  "pos": [
   141.507,
   40.5481
  ]
 },
 "青森": {
  "name": "青森",
  "en": "Aomori",
  "pos": [
   140.7161,
   40.8462
  ]
 },
 "函館": {
  "name": "函館",
  "en": "Hakodate",
  "pos": [
   140.7105,
   41.8078
  ]
 },
 "大間": {
  "name": "大間",
  "en": "Oma",
  "pos": [
   140.8989,
   41.5262
  ]
 },
 "函館#2": {
  "name": "函館",
  "en": "Hakodate",
  "pos": [
   140.72,
   41.7953
  ]
 },
 "久里浜": {
  "name": "久里浜",
  "en": "Kurihama",
  "pos": [
   139.714,
   35.2205
  ]
 },
 "金谷": {
  "name": "金谷",
  "en": "Kanaya",
  "pos": [
   139.818,
   35.1695
  ]
 },
 "東京(竹芝)": {
  "name": "東京",
  "en": "Tokyo (Takeshiba)",
  "pos": [
   139.7627,
   35.6541
  ]
 },
 "横浜(大さん橋)": {
  "name": "横浜",
  "en": "Yokohama",
  "pos": [
   139.6476,
   35.4517
  ]
 },
 "大島(岡田)": {
  "name": "大島",
  "en": "Oshima (Okata)",
  "pos": [
   139.3906,
   34.7906
  ]
 },
 "大島(元町)": {
  "name": "大島",
  "en": "Oshima (Motomachi)",
  "pos": [
   139.3525,
   34.752
  ]
 },
 "利島": {
  "name": "利島",
  "en": "Toshima",
  "pos": [
   139.281,
   34.5324
  ]
 },
 "新島": {
  "name": "新島",
  "en": "Niijima",
  "pos": [
   139.254,
   34.3735
  ]
 },
 "式根島(野伏)": {
  "name": "式根島",
  "en": "Shikinejima (Nobushi)",
  "pos": [
   139.2153,
   34.3336
  ]
 },
 "神津島(前浜)": {
  "name": "神津島",
  "en": "Kozushima",
  "pos": [
   139.1298,
   34.2108
  ]
 },
 "三宅島(錆ヶ浜)": {
  "name": "三宅島",
  "en": "Miyakejima (Sabigahama)",
  "pos": [
   139.4782,
   34.0682
  ]
 },
 "御蔵島": {
  "name": "御蔵島",
  "en": "Mikurajima",
  "pos": [
   139.5899,
   33.8972
  ]
 },
 "八丈島(底土)": {
  "name": "八丈島",
  "en": "Hachijojima (Sokodo)",
  "pos": [
   139.8212,
   33.1236
  ]
 },
 "熱海": {
  "name": "熱海",
  "en": "Atami",
  "pos": [
   139.0761,
   35.0894
  ]
 },
 "伊東": {
  "name": "伊東",
  "en": "Ito",
  "pos": [
   139.101,
   34.973
  ]
 },
 "下田": {
  "name": "下田",
  "en": "Shimoda",
  "pos": [
   138.947,
   34.674
  ]
 },
 "父島(二見)": {
  "name": "父島",
  "en": "Chichijima (Futami)",
  "pos": [
   142.192,
   27.094
  ]
 },
 "清水(江尻)": {
  "name": "清水",
  "en": "Shimizu (Ejiri)",
  "pos": [
   138.4925,
   35.015
  ]
 },
 "土肥": {
  "name": "土肥",
  "en": "Toi",
  "pos": [
   138.7869,
   34.9056
  ]
 },
 "鳥羽": {
  "name": "鳥羽",
  "en": "Toba",
  "pos": [
   136.8468,
   34.4805
  ]
 },
 "伊良湖": {
  "name": "伊良湖",
  "en": "Irago",
  "pos": [
   137.02,
   34.58
  ]
 },
 "東京(有明)": {
  "name": "東京",
  "en": "Tokyo (Ariake)",
  "pos": [
   139.7957,
   35.6173
  ]
 },
 "徳島(沖洲)": {
  "name": "徳島",
  "en": "Tokushima (Okinosu)",
  "pos": [
   134.5967,
   34.054
  ]
 },
 "新門司": {
  "name": "新門司",
  "en": "Shin-Moji",
  "pos": [
   130.9895,
   33.8812
  ]
 },
 "神戸(三宮)": {
  "name": "神戸",
  "en": "Kobe (Sannomiya)",
  "pos": [
   135.1989,
   34.6825
  ]
 },
 "宮崎": {
  "name": "宮崎",
  "en": "Miyazaki",
  "pos": [
   131.4598,
   31.9076
  ]
 },
 "横須賀": {
  "name": "横須賀",
  "en": "Yokosuka",
  "pos": [
   139.6782,
   35.2835
  ]
 },
 "舞鶴": {
  "name": "舞鶴",
  "en": "Maizuru",
  "pos": [
   135.3919,
   35.4816
  ]
 },
 "小樽": {
  "name": "小樽",
  "en": "Otaru",
  "pos": [
   141.0171,
   43.1905
  ]
 },
 "敦賀": {
  "name": "敦賀",
  "en": "Tsuruga",
  "pos": [
   136.0723,
   35.6786
  ]
 },
 "苫小牧東": {
  "name": "苫小牧東",
  "en": "Tomakomai-Higashi",
  "pos": [
   141.8196,
   42.61
  ]
 },
 "新潟": {
  "name": "新潟",
  "en": "Niigata",
  "pos": [
   139.0687,
   37.9381
  ]
 },
 "秋田": {
  "name": "秋田",
  "en": "Akita",
  "pos": [
   140.0586,
   39.755
  ]
 },
 "両津": {
  "name": "両津",
  "en": "Ryotsu",
  "pos": [
   138.4381,
   38.0817
  ]
 },
 "直江津": {
  "name": "直江津",
  "en": "Naoetsu",
  "pos": [
   138.2508,
   37.1825
  ]
 },
 "小木": {
  "name": "小木",
  "en": "Ogi",
  "pos": [
   138.2822,
   37.8163
  ]
 },
 "七類": {
  "name": "七類",
  "en": "Shichirui",
  "pos": [
   133.2292,
   35.5712
  ]
 },
 "境港": {
  "name": "境港",
  "en": "Sakaiminato",
  "pos": [
   133.2229,
   35.5454
  ]
 },
 "西郷": {
  "name": "西郷",
  "en": "Saigo",
  "pos": [
   133.3351,
   36.2035
  ]
 },
 "菱浦": {
  "name": "菱浦",
  "en": "Hishiura",
  "pos": [
   133.0774,
   36.1048
  ]
 },
 "別府": {
  "name": "別府",
  "en": "Beppu (Nishinoshima)",
  "pos": [
   133.0416,
   36.1077
  ]
 },
 "来居": {
  "name": "来居",
  "en": "Kurii",
  "pos": [
   133.0394,
   36.0249
  ]
 },
 "稚内": {
  "name": "稚内",
  "en": "Wakkanai",
  "pos": [
   141.6834,
   45.4157
  ]
 },
 "鴛泊": {
  "name": "鴛泊",
  "en": "Oshidomari (Rishiri)",
  "pos": [
   141.2283,
   45.2414
  ]
 },
 "香深": {
  "name": "香深",
  "en": "Kafuka (Rebun)",
  "pos": [
   141.0461,
   45.2984
  ]
 },
 "沓形": {
  "name": "沓形",
  "en": "Kutsugata (Rishiri)",
  "pos": [
   141.1297,
   45.1886
  ]
 },
 "江差": {
  "name": "江差",
  "en": "Esashi",
  "pos": [
   140.1233,
   41.8681
  ]
 },
 "奥尻": {
  "name": "奥尻",
  "en": "Okushiri",
  "pos": [
   139.5173,
   42.1747
  ]
 },
 "羽幌": {
  "name": "羽幌",
  "en": "Haboro",
  "pos": [
   141.6989,
   44.3714
  ]
 },
 "焼尻": {
  "name": "焼尻",
  "en": "Yagishiri",
  "pos": [
   141.4283,
   44.4425
  ]
 },
 "天売": {
  "name": "天売",
  "en": "Teuri",
  "pos": [
   141.3273,
   44.4388
  ]
 },
 "岩船": {
  "name": "岩船",
  "en": "Iwafune",
  "pos": [
   139.4322,
   38.1882
  ]
 },
 "粟島": {
  "name": "粟島",
  "en": "Awashima",
  "pos": [
   139.2547,
   38.4675
  ]
 },
 "博多": {
  "name": "博多",
  "en": "Hakata",
  "pos": [
   130.3997,
   33.6042
  ]
 },
 "郷ノ浦": {
  "name": "郷ノ浦",
  "en": "Gonoura (Iki)",
  "pos": [
   129.6853,
   33.7423
  ]
 },
 "芦辺": {
  "name": "芦辺",
  "en": "Ashibe (Iki)",
  "pos": [
   129.7533,
   33.8096
  ]
 },
 "厳原": {
  "name": "厳原",
  "en": "Izuhara (Tsushima)",
  "pos": [
   129.2913,
   34.1979
  ]
 },
 "比田勝": {
  "name": "比田勝",
  "en": "Hitakatsu (Tsushima)",
  "pos": [
   129.4695,
   34.656
  ]
 },
 "唐津東": {
  "name": "唐津東",
  "en": "Karatsu-Higashi",
  "pos": [
   129.9636,
   33.4696
  ]
 },
 "印通寺": {
  "name": "印通寺",
  "en": "Indoji (Iki)",
  "pos": [
   129.755,
   33.7416
  ]
 },
 "大阪南港（南港フェリーターミナル）": {
  "name": "大阪南港",
  "en": "Osaka Nanko Ferry Terminal",
  "pos": [
   135.4324,
   34.6197
  ]
 },
 "新門司港（名門大洋フェリーターミナル）": {
  "name": "新門司港",
  "en": "Shin-Moji",
  "pos": [
   130.9855,
   33.8712
  ]
 },
 "泉大津港": {
  "name": "泉大津港",
  "en": "Izumiotsu",
  "pos": [
   135.3961,
   34.5184
  ]
 },
 "新門司港（阪九第2ターミナル）": {
  "name": "新門司港",
  "en": "Shin-Moji Hankyu Terminal 2",
  "pos": [
   130.9896,
   33.8834
  ]
 },
 "神戸港（六甲アイランド 阪九フェリー）": {
  "name": "神戸港",
  "en": "Kobe Rokko Island",
  "pos": [
   135.284,
   34.6966
  ]
 },
 "新門司港（阪九第1ターミナル）": {
  "name": "新門司港",
  "en": "Shin-Moji Hankyu Terminal 1",
  "pos": [
   130.99,
   33.8853
  ]
 },
 "大阪南港（さんふらわあターミナル）": {
  "name": "大阪南港",
  "en": "Osaka Nanko Sunflower Terminal",
  "pos": [
   135.4113,
   34.6373
  ]
 },
 "別府港（さんふらわあターミナル）": {
  "name": "別府港",
  "en": "Beppu",
  "pos": [
   131.5039,
   33.3053
  ]
 },
 "志布志港": {
  "name": "志布志港",
  "en": "Shibushi",
  "pos": [
   131.1047,
   31.4628
  ]
 },
 "神戸港（六甲アイランド さんふらわあ）": {
  "name": "神戸港",
  "en": "Kobe Rokko Island",
  "pos": [
   135.2825,
   34.697
  ]
 },
 "大分港（さんふらわあ）": {
  "name": "大分港",
  "en": "Oita Port",
  "pos": [
   131.5887,
   33.2457
  ]
 },
 "東予港": {
  "name": "東予港",
  "en": "Toyo",
  "pos": [
   133.1185,
   33.9298
  ]
 },
 "新居浜東港": {
  "name": "新居浜東港",
  "en": "Niihama Higashi Port",
  "pos": [
   133.3323,
   33.9874
  ]
 },
 "神戸六甲港（おれんじホープ）": {
  "name": "神戸六甲港",
  "en": "Kobe Rokko",
  "pos": [
   135.284,
   34.6966
  ]
 },
 "八幡浜港": {
  "name": "八幡浜港",
  "en": "Yawatahama",
  "pos": [
   132.4147,
   33.4585
  ]
 },
 "臼杵港": {
  "name": "臼杵港",
  "en": "Usuki",
  "pos": [
   131.8168,
   33.1232
  ]
 },
 "別府観光港（宇和島運輸）": {
  "name": "別府観光港",
  "en": "Beppu Kanko Port",
  "pos": [
   131.5034,
   33.302
  ]
 },
 "三崎港": {
  "name": "三崎港",
  "en": "Misaki",
  "pos": [
   132.1176,
   33.3904
  ]
 },
 "佐賀関港": {
  "name": "佐賀関港",
  "en": "Saganoseki",
  "pos": [
   131.8653,
   33.2499
  ]
 },
 "広島港（宇品）": {
  "name": "広島港",
  "en": "Hiroshima Port (Ujina)",
  "pos": [
   132.4551,
   34.3527
  ]
 },
 "呉港（呉中央桟橋）": {
  "name": "呉港",
  "en": "Kure",
  "pos": [
   132.557,
   34.2408
  ]
 },
 "松山観光港": {
  "name": "松山観光港",
  "en": "Matsuyama Kanko Port",
  "pos": [
   132.7043,
   33.8886
  ]
 },
 "柳井港": {
  "name": "柳井港",
  "en": "Yanai",
  "pos": [
   132.134,
   33.9578
  ]
 },
 "三津浜港": {
  "name": "三津浜港",
  "en": "Mitsuhama (Matsuyama)",
  "pos": [
   132.718,
   33.864
  ]
 },
 "伊保田港": {
  "name": "伊保田港",
  "en": "Ihota (Suo-Oshima)",
  "pos": [
   132.4391,
   33.9442
  ]
 },
 "神戸三宮フェリーターミナル": {
  "name": "神戸三宮フェリーターミナル",
  "en": "Kobe Sannomiya Ferry Terminal",
  "pos": [
   135.1989,
   34.6825
  ]
 },
 "坂手港（小豆島）": {
  "name": "坂手港（小豆島）",
  "en": "Sakate (Shodoshima)",
  "pos": [
   134.3208,
   34.4578
  ]
 },
 "高松東港": {
  "name": "高松東港",
  "en": "Takamatsu Higashi Port",
  "pos": [
   134.074,
   34.3542
  ]
 },
 "姫路港": {
  "name": "姫路港",
  "en": "Himeji",
  "pos": [
   134.6629,
   34.7847
  ]
 },
 "福田港（小豆島）": {
  "name": "福田港（小豆島）",
  "en": "Fukuda (Shodoshima)",
  "pos": [
   134.3446,
   34.5435
  ]
 },
 "高松港（サンポート）": {
  "name": "高松港",
  "en": "Takamatsu Port (Sunport)",
  "pos": [
   134.0505,
   34.352
  ]
 },
 "土庄港": {
  "name": "土庄港",
  "en": "Tonosho",
  "pos": [
   134.1721,
   34.489
  ]
 },
 "新岡山港": {
  "name": "新岡山港",
  "en": "Shin-Okayama",
  "pos": [
   133.985,
   34.607
  ]
 },
 "池田港（小豆島）": {
  "name": "池田港（小豆島）",
  "en": "Ikeda (Shodoshima)",
  "pos": [
   134.2285,
   34.4777
  ]
 },
 "宇野港": {
  "name": "宇野港",
  "en": "Uno",
  "pos": [
   133.953,
   34.4925
  ]
 },
 "宮浦港（直島）": {
  "name": "宮浦港（直島）",
  "en": "Miyanoura (Naoshima)",
  "pos": [
   133.9741,
   34.4564
  ]
 },
 "本村港（直島）": {
  "name": "本村港（直島）",
  "en": "Honmura (Naoshima)",
  "pos": [
   133.996,
   34.459
  ]
 },
 "明石港": {
  "name": "明石港",
  "en": "Akashi",
  "pos": [
   134.9946,
   34.6455
  ]
 },
 "岩屋港": {
  "name": "岩屋港",
  "en": "Iwaya (Awaji)",
  "pos": [
   135.0207,
   34.5904
  ]
 },
 "下関（唐戸桟橋）": {
  "name": "下関",
  "en": "Shimonoseki Karato",
  "pos": [
   130.9423,
   33.9558
  ]
 },
 "門司港（桟橋）": {
  "name": "門司港",
  "en": "Mojiko",
  "pos": [
   130.9622,
   33.9479
  ]
 },
 "宮島口": {
  "name": "宮島口",
  "en": "Miyajimaguchi",
  "pos": [
   132.3035,
   34.311
  ]
 },
 "宮島桟橋": {
  "name": "宮島桟橋",
  "en": "Miyajima",
  "pos": [
   132.3222,
   34.3021
  ]
 },
 "徳山港": {
  "name": "徳山港",
  "en": "Tokuyama",
  "pos": [
   131.7989,
   34.0498
  ]
 },
 "竹田津港": {
  "name": "竹田津港",
  "en": "Taketazu",
  "pos": [
   131.5652,
   33.6791
  ]
 },
 "和歌山港": {
  "name": "和歌山港",
  "en": "Wakayama Port",
  "pos": [
   135.1439,
   34.2175
  ]
 },
 "徳島港（南沖洲）": {
  "name": "徳島港",
  "en": "Tokushima Port (Okinosu)",
  "pos": [
   134.5842,
   34.0564
  ]
 },
 "鹿児島新港": {
  "name": "鹿児島新港",
  "en": "Kagoshima Shinko",
  "pos": [
   130.566,
   31.57
  ]
 },
 "名瀬": {
  "name": "名瀬",
  "en": "Naze",
  "pos": [
   129.4975,
   28.3889
  ]
 },
 "亀徳": {
  "name": "亀徳",
  "en": "Kametoku",
  "pos": [
   129.0164,
   27.7337
  ]
 },
 "和泊": {
  "name": "和泊",
  "en": "Wadomari",
  "pos": [
   128.6567,
   27.3925
  ]
 },
 "与論": {
  "name": "与論",
  "en": "Yoron",
  "pos": [
   128.408,
   27.04
  ]
 },
 "本部": {
  "name": "本部",
  "en": "Motobu",
  "pos": [
   127.883,
   26.6576
  ]
 },
 "那覇": {
  "name": "那覇",
  "en": "Naha",
  "pos": [
   127.683,
   26.235
  ]
 },
 "鹿児島本港南埠頭": {
  "name": "鹿児島本港南埠頭",
  "en": "Kagoshima Honko South Pier",
  "pos": [
   130.5664,
   31.5895
  ]
 },
 "西之表": {
  "name": "西之表",
  "en": "Nishinoomote",
  "pos": [
   130.9965,
   30.7325
  ]
 },
 "宮之浦": {
  "name": "宮之浦",
  "en": "Miyanoura",
  "pos": [
   130.573,
   30.429
  ]
 },
 "安房": {
  "name": "安房",
  "en": "Anbo",
  "pos": [
   130.661,
   30.305
  ]
 },
 "口之島": {
  "name": "口之島",
  "en": "Kuchinoshima",
  "pos": [
   129.923,
   29.969
  ]
 },
 "中之島": {
  "name": "中之島",
  "en": "Nakanoshima",
  "pos": [
   129.853,
   29.859
  ]
 },
 "諏訪之瀬島": {
  "name": "諏訪之瀬島",
  "en": "Suwanosejima",
  "pos": [
   129.705,
   29.611
  ]
 },
 "平島": {
  "name": "平島",
  "en": "Tairajima",
  "pos": [
   129.539,
   29.683
  ]
 },
 "悪石島": {
  "name": "悪石島",
  "en": "Akusekijima",
  "pos": [
   129.592,
   29.461
  ]
 },
 "小宝島": {
  "name": "小宝島",
  "en": "Kodakarajima",
  "pos": [
   129.319,
   29.223
  ]
 },
 "宝島": {
  "name": "宝島",
  "en": "Takarajima",
  "pos": [
   129.205,
   29.145
  ]
 },
 "博多港国際ターミナル": {
  "name": "博多港国際ターミナル",
  "en": "Hakata Port International Terminal",
  "pos": [
   130.404,
   33.606
  ]
 },
 "釜山": {
  "name": "釜山",
  "en": "Busan",
  "pos": [
   129.048,
   35.117
  ]
 },
 "下関": {
  "name": "下関",
  "en": "Shimonoseki",
  "pos": [
   130.93,
   33.953
  ]
 },
 "長崎": {
  "name": "長崎",
  "en": "Nagasaki",
  "pos": [
   129.869,
   32.748
  ]
 },
 "奈良尾": {
  "name": "奈良尾",
  "en": "Narao",
  "pos": [
   129.059,
   32.829
  ]
 },
 "福江": {
  "name": "福江",
  "en": "Fukue",
  "pos": [
   128.843,
   32.696
  ]
 },
 "奈留": {
  "name": "奈留",
  "en": "Naru",
  "pos": [
   128.956,
   32.824
  ]
 },
 "佐世保": {
  "name": "佐世保",
  "en": "Sasebo",
  "pos": [
   129.721,
   33.163
  ]
 },
 "有川": {
  "name": "有川",
  "en": "Arikawa",
  "pos": [
   129.118,
   32.988
  ]
 },
 "小値賀": {
  "name": "小値賀",
  "en": "Ojika",
  "pos": [
   129.059,
   33.189
  ]
 },
 "宇久平": {
  "name": "宇久平",
  "en": "Ukudaira",
  "pos": [
   129.125,
   33.258
  ]
 },
 "博多ふ頭": {
  "name": "博多ふ頭",
  "en": "Hakata Futo",
  "pos": [
   130.4,
   33.603
  ]
 },
 "青方": {
  "name": "青方",
  "en": "Aokata",
  "pos": [
   129.059,
   32.979
  ]
 },
 "熊本港": {
  "name": "熊本港",
  "en": "Kumamoto Port",
  "pos": [
   130.597,
   32.7605
  ]
 },
 "島原": {
  "name": "島原",
  "en": "Shimabara",
  "pos": [
   130.381,
   32.774
  ]
 },
 "泊港": {
  "name": "泊港",
  "en": "Tomari (Naha)",
  "pos": [
   127.68,
   26.2236
  ]
 },
 "渡嘉敷": {
  "name": "渡嘉敷",
  "en": "Tokashiki",
  "pos": [
   127.362,
   26.196
  ]
 },
 "阿嘉": {
  "name": "阿嘉",
  "en": "Aka",
  "pos": [
   127.285,
   26.196
  ]
 },
 "座間味": {
  "name": "座間味",
  "en": "Zamami",
  "pos": [
   127.305,
   26.227
  ]
 },
 "渡名喜": {
  "name": "渡名喜",
  "en": "Tonaki",
  "pos": [
   127.143,
   26.369
  ]
 },
 "兼城(久米島)": {
  "name": "兼城(久米島)",
  "en": "Kanegusuku (Kumejima)",
  "pos": [
   126.774,
   26.334
  ]
 },
 "伊江": {
  "name": "伊江",
  "en": "Ie",
  "pos": [
   127.81,
   26.706
  ]
 },
 "石垣": {
  "name": "石垣",
  "en": "Ishigaki",
  "pos": [
   124.156,
   24.3375
  ]
 },
 "竹富": {
  "name": "竹富",
  "en": "Taketomi",
  "pos": [
   124.099,
   24.336
  ]
 },
 "小浜": {
  "name": "小浜",
  "en": "Kohama",
  "pos": [
   123.983,
   24.346
  ]
 },
 "黒島": {
  "name": "黒島",
  "en": "Kuroshima",
  "pos": [
   124.006,
   24.254
  ]
 },
 "大原": {
  "name": "大原",
  "en": "Ohara (Iriomote)",
  "pos": [
   123.885,
   24.27
  ]
 },
 "上原": {
  "name": "上原",
  "en": "Uehara (Iriomote)",
  "pos": [
   123.802,
   24.419
  ]
 },
 "鳩間": {
  "name": "鳩間",
  "en": "Hatoma",
  "pos": [
   123.824,
   24.473
  ]
 },
 "波照間": {
  "name": "波照間",
  "en": "Hateruma",
  "pos": [
   123.774,
   24.064
  ]
 },
 "鹿児島港(桜島フェリー)": {
  "name": "鹿児島港",
  "en": "Kagoshima (Sakurajima Ferry)",
  "pos": [
   130.5631,
   31.5946
  ]
 },
 "桜島港": {
  "name": "桜島港",
  "en": "Sakurajima",
  "pos": [
   130.599,
   31.5905
  ]
 }
};

export const ROUTES = [
 {
  "id": "east-0",
  "operator": "太平洋フェリー",
  "operatorEn": "Taiheiyo Ferry",
  "name": "名古屋–仙台–苫小牧",
  "nameEn": "Nagoya – Sendai – Tomakomai",
  "url": "https://www.taiheiyo-ferry.co.jp/koro/",
  "ships": [
   {
    "name": "いしかり",
    "en": "ISHIKARI",
    "mmsi": 431000590
   },
   {
    "name": "きそ",
    "en": "KISO",
    "mmsi": 431200673
   },
   {
    "name": "きたかみ",
    "en": "KITAKAMI",
    "mmsi": 431012359
   }
  ],
  "sailings": [
   {
    "days": {
     "every": 2,
     "from": "2026-11-17"
    },
    "stops": [
     [
      "名古屋",
      null,
      "19:00"
     ],
     [
      "仙台",
      "16:40+1",
      "19:40+1"
     ],
     [
      "苫小牧",
      "11:00+2",
      null
     ]
    ]
   },
   {
    "days": {
     "every": 2,
     "from": "2026-11-17"
    },
    "stops": [
     [
      "苫小牧",
      null,
      "19:00"
     ],
     [
      "仙台",
      "10:00+1",
      "12:50+1"
     ],
     [
      "名古屋",
      "10:30+2",
      null
     ]
    ]
   },
   {
    "days": {
     "every": 2,
     "from": "2026-11-17"
    },
    "stops": [
     [
      "仙台",
      null,
      "19:40"
     ],
     [
      "苫小牧",
      "11:00+1",
      null
     ]
    ],
    "ship": "きたかみ"
   },
   {
    "days": {
     "every": 2,
     "from": "2026-11-18"
    },
    "stops": [
     [
      "苫小牧",
      null,
      "19:00"
     ],
     [
      "仙台",
      "10:00+1",
      null
     ]
    ],
    "ship": "きたかみ"
   }
  ]
 },
 {
  "id": "east-1",
  "operator": "商船三井さんふらわあ",
  "operatorEn": "MOL Sunflower",
  "name": "大洗–苫小牧",
  "nameEn": "Oarai – Tomakomai",
  "url": "https://www.sunflower.co.jp/route/facilities/timetable/",
  "ships": [
   {
    "name": "さんふらわあ さっぽろ",
    "en": "SUNFLOWER SAPPORO",
    "mmsi": 431009847
   },
   {
    "name": "さんふらわあ ふらの",
    "en": "SUNFLOWER FURANO",
    "mmsi": 431009293
   },
   {
    "name": "さんふらわあ かむい",
    "en": "SUNFLOWER KAMUY",
    "mmsi": 431025321
   },
   {
    "name": "さんふらわあ ぴりか",
    "en": "SUNFLOWER PIRKA",
    "mmsi": 431026766
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "大洗",
      null,
      "19:45"
     ],
     [
      "苫小牧",
      "13:30+1",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "苫小牧",
      null,
      "18:45"
     ],
     [
      "大洗",
      "14:00+1",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "大洗",
      null,
      "01:45"
     ],
     [
      "苫小牧",
      "19:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "苫小牧",
      null,
      "01:30"
     ],
     [
      "大洗",
      "19:30",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "east-2",
  "operator": "シルバーフェリー",
  "operatorEn": "Silver Ferry",
  "name": "八戸–苫小牧",
  "nameEn": "Hachinohe – Tomakomai",
  "url": "https://www.silverferry.jp/route_guide/",
  "ships": [
   {
    "name": "シルバープリンセス",
    "en": "SILVER PRINCESS",
    "mmsi": 431003381
   },
   {
    "name": "シルバーティアラ",
    "en": "SILVER TIARA",
    "mmsi": 431011163
   },
   {
    "name": "シルバーブリーズ",
    "en": "SILVER BREEZE",
    "mmsi": 431017216
   },
   {
    "name": "シルバーエイト",
    "en": "SILVER EIGHT",
    "mmsi": 431004622
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "八戸",
      null,
      "08:45"
     ],
     [
      "苫小牧",
      "16:00",
      null
     ]
    ],
    "ship": "シルバープリンセス"
   },
   {
    "days": "daily",
    "stops": [
     [
      "八戸",
      null,
      "13:00"
     ],
     [
      "苫小牧",
      "20:15",
      null
     ]
    ],
    "ship": "シルバーティアラ"
   },
   {
    "days": "daily",
    "stops": [
     [
      "八戸",
      null,
      "17:30"
     ],
     [
      "苫小牧",
      "01:30+1",
      null
     ]
    ],
    "ship": "シルバーブリーズ"
   },
   {
    "days": "daily",
    "stops": [
     [
      "八戸",
      null,
      "22:00"
     ],
     [
      "苫小牧",
      "06:00+1",
      null
     ]
    ],
    "ship": "シルバーエイト"
   },
   {
    "days": "daily",
    "stops": [
     [
      "苫小牧",
      null,
      "05:00"
     ],
     [
      "八戸",
      "13:30",
      null
     ]
    ],
    "ship": "シルバーブリーズ"
   },
   {
    "days": "daily",
    "stops": [
     [
      "苫小牧",
      null,
      "09:30"
     ],
     [
      "八戸",
      "18:00",
      null
     ]
    ],
    "ship": "シルバーエイト"
   },
   {
    "days": "daily",
    "stops": [
     [
      "苫小牧",
      null,
      "21:15"
     ],
     [
      "八戸",
      "04:45+1",
      null
     ]
    ],
    "ship": "シルバープリンセス"
   },
   {
    "days": "daily",
    "stops": [
     [
      "苫小牧",
      null,
      "23:59"
     ],
     [
      "八戸",
      "07:30+1",
      null
     ]
    ],
    "ship": "シルバーティアラ"
   }
  ]
 },
 {
  "id": "east-3",
  "operator": "津軽海峡フェリー",
  "operatorEn": "Tsugaru Kaikyo Ferry",
  "name": "青森–函館",
  "nameEn": "Aomori – Hakodate",
  "url": "https://www.tsugarukaikyo.co.jp/service/timetable/hakodate-aomori/",
  "ships": [
   {
    "name": "ブルードルフィン",
    "en": "BLUE DOLPHIN",
    "mmsi": 431008386
   },
   {
    "name": "ブルーマーメイド",
    "en": "BLUE MERMAID",
    "mmsi": 431005263
   },
   {
    "name": "ブルーハピネス",
    "en": "BLUE HAPPINESS",
    "mmsi": 431009216
   },
   {
    "name": "ブルーグレース",
    "en": "BLUE GRACE",
    "mmsi": 431027554
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "函館",
      null,
      "03:20"
     ],
     [
      "青森",
      "07:00",
      null
     ]
    ],
    "ship": "ブルードルフィン"
   },
   {
    "days": "daily",
    "stops": [
     [
      "函館",
      null,
      "07:40"
     ],
     [
      "青森",
      "11:20",
      null
     ]
    ],
    "ship": "ブルーマーメイド"
   },
   {
    "days": "daily",
    "stops": [
     [
      "函館",
      null,
      "12:30"
     ],
     [
      "青森",
      "16:05",
      null
     ]
    ],
    "ship": "ブルーハピネス"
   },
   {
    "days": "daily",
    "stops": [
     [
      "函館",
      null,
      "17:30"
     ],
     [
      "青森",
      "21:10",
      null
     ]
    ],
    "ship": "ブルードルフィン"
   },
   {
    "days": "daily",
    "stops": [
     [
      "函館",
      null,
      "20:15"
     ],
     [
      "青森",
      "00:00+1",
      null
     ]
    ],
    "ship": "ブルーマーメイド"
   },
   {
    "days": "daily",
    "stops": [
     [
      "函館",
      null,
      "22:05"
     ],
     [
      "青森",
      "01:45+1",
      null
     ]
    ],
    "ship": "ブルーハピネス"
   },
   {
    "days": "daily",
    "stops": [
     [
      "青森",
      null,
      "02:30"
     ],
     [
      "函館",
      "06:10",
      null
     ]
    ],
    "ship": "ブルーマーメイド"
   },
   {
    "days": "daily",
    "stops": [
     [
      "青森",
      null,
      "06:25"
     ],
     [
      "函館",
      "10:05",
      null
     ]
    ],
    "ship": "ブルーハピネス"
   },
   {
    "days": "daily",
    "stops": [
     [
      "青森",
      null,
      "10:15"
     ],
     [
      "函館",
      "13:55",
      null
     ]
    ],
    "ship": "ブルードルフィン"
   },
   {
    "days": "daily",
    "stops": [
     [
      "青森",
      null,
      "14:20"
     ],
     [
      "函館",
      "18:00",
      null
     ]
    ],
    "ship": "ブルーマーメイド"
   },
   {
    "days": "daily",
    "stops": [
     [
      "青森",
      null,
      "17:15"
     ],
     [
      "函館",
      "20:50",
      null
     ]
    ],
    "ship": "ブルーハピネス"
   },
   {
    "days": "daily",
    "stops": [
     [
      "青森",
      null,
      "22:25"
     ],
     [
      "函館",
      "02:05+1",
      null
     ]
    ],
    "ship": "ブルードルフィン"
   }
  ]
 },
 {
  "id": "east-4",
  "operator": "津軽海峡フェリー",
  "operatorEn": "Tsugaru Kaikyo Ferry",
  "name": "大間–函館",
  "nameEn": "Oma – Hakodate",
  "url": "https://www.tsugarukaikyo.co.jp/service/timetable/hakodate-oma/",
  "ships": [
   {
    "name": "大函丸",
    "en": "DAIKANMARU",
    "mmsi": 431004277
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "函館",
      null,
      "09:10"
     ],
     [
      "大間",
      "10:40",
      null
     ]
    ],
    "ship": "大函丸"
   },
   {
    "days": "daily",
    "stops": [
     [
      "函館",
      null,
      "16:00"
     ],
     [
      "大間",
      "17:30",
      null
     ]
    ],
    "ship": "大函丸"
   },
   {
    "days": "daily",
    "stops": [
     [
      "大間",
      null,
      "06:50"
     ],
     [
      "函館",
      "08:20",
      null
     ]
    ],
    "ship": "大函丸"
   },
   {
    "days": "daily",
    "stops": [
     [
      "大間",
      null,
      "13:40"
     ],
     [
      "函館",
      "15:10",
      null
     ]
    ],
    "ship": "大函丸"
   }
  ]
 },
 {
  "id": "east-5",
  "operator": "青函フェリー",
  "operatorEn": "Seikan Ferry",
  "name": "青森–函館",
  "nameEn": "Aomori – Hakodate",
  "url": "https://www.seikan-ferry.co.jp/schedule/",
  "ships": [
   {
    "name": "はやぶさ",
    "en": "HAYABUSA",
    "mmsi": 431005182
   },
   {
    "name": "はやぶさⅡ",
    "en": "HAYABUSA2",
    "mmsi": 431020945
   },
   {
    "name": "はやぶさⅢ",
    "en": "HAYABUSA3",
    "mmsi": 431022733
   },
   {
    "name": "あさかぜ21",
    "en": "ASAKAZE 21",
    "mmsi": 431000876
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "青森",
      null,
      "02:00"
     ],
     [
      "函館#2",
      "05:50",
      null
     ]
    ],
    "ship": "はやぶさⅡ"
   },
   {
    "days": "daily",
    "stops": [
     [
      "青森",
      null,
      "04:30"
     ],
     [
      "函館#2",
      "08:30",
      null
     ]
    ],
    "ship": "あさかぜ21"
   },
   {
    "days": "daily",
    "stops": [
     [
      "青森",
      null,
      "08:10"
     ],
     [
      "函館#2",
      "12:10",
      null
     ]
    ],
    "ship": "はやぶさⅢ"
   },
   {
    "days": "daily",
    "stops": [
     [
      "青森",
      null,
      "11:35"
     ],
     [
      "函館#2",
      "15:25",
      null
     ]
    ],
    "ship": "はやぶさ"
   },
   {
    "days": "daily",
    "stops": [
     [
      "青森",
      null,
      "14:35"
     ],
     [
      "函館#2",
      "18:25",
      null
     ]
    ],
    "ship": "はやぶさⅡ"
   },
   {
    "days": "daily",
    "stops": [
     [
      "青森",
      null,
      "18:00"
     ],
     [
      "函館#2",
      "21:50",
      null
     ]
    ],
    "ship": "あさかぜ21"
   },
   {
    "days": "daily",
    "stops": [
     [
      "青森",
      null,
      "20:30"
     ],
     [
      "函館#2",
      "00:20+1",
      null
     ]
    ],
    "ship": "はやぶさⅢ"
   },
   {
    "days": "daily",
    "stops": [
     [
      "青森",
      null,
      "23:30"
     ],
     [
      "函館#2",
      "03:20+1",
      null
     ]
    ],
    "ship": "はやぶさ"
   },
   {
    "days": "daily",
    "stops": [
     [
      "函館#2",
      null,
      "02:00"
     ],
     [
      "青森",
      "05:50",
      null
     ]
    ],
    "ship": "はやぶさⅢ"
   },
   {
    "days": "daily",
    "stops": [
     [
      "函館#2",
      null,
      "04:30"
     ],
     [
      "青森",
      "08:30",
      null
     ]
    ],
    "ship": "はやぶさ"
   },
   {
    "days": "daily",
    "stops": [
     [
      "函館#2",
      null,
      "08:10"
     ],
     [
      "青森",
      "12:10",
      null
     ]
    ],
    "ship": "はやぶさⅡ"
   },
   {
    "days": "daily",
    "stops": [
     [
      "函館#2",
      null,
      "11:35"
     ],
     [
      "青森",
      "15:25",
      null
     ]
    ],
    "ship": "あさかぜ21"
   },
   {
    "days": "daily",
    "stops": [
     [
      "函館#2",
      null,
      "14:35"
     ],
     [
      "青森",
      "18:25",
      null
     ]
    ],
    "ship": "はやぶさⅢ"
   },
   {
    "days": "daily",
    "stops": [
     [
      "函館#2",
      null,
      "18:00"
     ],
     [
      "青森",
      "21:50",
      null
     ]
    ],
    "ship": "はやぶさ"
   },
   {
    "days": "daily",
    "stops": [
     [
      "函館#2",
      null,
      "20:30"
     ],
     [
      "青森",
      "00:20+1",
      null
     ]
    ],
    "ship": "はやぶさⅡ"
   },
   {
    "days": "daily",
    "stops": [
     [
      "函館#2",
      null,
      "23:30"
     ],
     [
      "青森",
      "03:20+1",
      null
     ]
    ],
    "ship": "あさかぜ21"
   }
  ]
 },
 {
  "id": "east-6",
  "operator": "東京湾フェリー",
  "operatorEn": "Tokyo Wan Ferry",
  "name": "久里浜–金谷",
  "nameEn": "Kurihama – Kanaya",
  "url": "https://www.tokyowanferry.com/diagram/schedule/",
  "ships": [
   {
    "name": "かなや丸",
    "en": "KANAYAMARU",
    "mmsi": 431000238
   },
   {
    "name": "しらはま丸",
    "en": "SHIRAHAMAMARU",
    "mmsi": 431000239
   }
  ],
  "sailings": [
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "久里浜",
      null,
      "06:20"
     ],
     [
      "金谷",
      "07:00",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "久里浜",
      null,
      "08:20"
     ],
     [
      "金谷",
      "09:00",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "久里浜",
      null,
      "10:20"
     ],
     [
      "金谷",
      "11:00",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "久里浜",
      null,
      "12:15"
     ],
     [
      "金谷",
      "12:55",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "久里浜",
      null,
      "14:15"
     ],
     [
      "金谷",
      "14:55",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "久里浜",
      null,
      "16:15"
     ],
     [
      "金谷",
      "16:55",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "久里浜",
      null,
      "18:15"
     ],
     [
      "金谷",
      "18:55",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "金谷",
      null,
      "07:15"
     ],
     [
      "久里浜",
      "07:55",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "金谷",
      null,
      "09:20"
     ],
     [
      "久里浜",
      "10:00",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "金谷",
      null,
      "11:20"
     ],
     [
      "久里浜",
      "12:00",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "金谷",
      null,
      "13:15"
     ],
     [
      "久里浜",
      "13:55",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "金谷",
      null,
      "15:20"
     ],
     [
      "久里浜",
      "16:00",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "金谷",
      null,
      "17:20"
     ],
     [
      "久里浜",
      "18:00",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "金谷",
      null,
      "19:20"
     ],
     [
      "久里浜",
      "20:00",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "久里浜",
      null,
      "06:20"
     ],
     [
      "金谷",
      "07:00",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "久里浜",
      null,
      "07:20"
     ],
     [
      "金谷",
      "08:00",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "久里浜",
      null,
      "08:20"
     ],
     [
      "金谷",
      "09:00",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "久里浜",
      null,
      "09:25"
     ],
     [
      "金谷",
      "10:05",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "久里浜",
      null,
      "10:20"
     ],
     [
      "金谷",
      "11:00",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "久里浜",
      null,
      "11:25"
     ],
     [
      "金谷",
      "12:05",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "久里浜",
      null,
      "12:15"
     ],
     [
      "金谷",
      "12:55",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "久里浜",
      null,
      "13:20"
     ],
     [
      "金谷",
      "14:00",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "久里浜",
      null,
      "14:15"
     ],
     [
      "金谷",
      "14:55",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "久里浜",
      null,
      "15:25"
     ],
     [
      "金谷",
      "16:05",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "久里浜",
      null,
      "16:15"
     ],
     [
      "金谷",
      "16:55",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "久里浜",
      null,
      "17:25"
     ],
     [
      "金谷",
      "18:05",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "久里浜",
      null,
      "18:15"
     ],
     [
      "金谷",
      "18:55",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "久里浜",
      null,
      "19:15"
     ],
     [
      "金谷",
      "19:55",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "金谷",
      null,
      "06:15"
     ],
     [
      "久里浜",
      "06:55",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "金谷",
      null,
      "07:15"
     ],
     [
      "久里浜",
      "07:55",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "金谷",
      null,
      "08:15"
     ],
     [
      "久里浜",
      "08:55",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "金谷",
      null,
      "09:20"
     ],
     [
      "久里浜",
      "10:00",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "金谷",
      null,
      "10:25"
     ],
     [
      "久里浜",
      "11:05",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "金谷",
      null,
      "11:20"
     ],
     [
      "久里浜",
      "12:00",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "金谷",
      null,
      "12:25"
     ],
     [
      "久里浜",
      "13:05",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "金谷",
      null,
      "13:15"
     ],
     [
      "久里浜",
      "13:55",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "金谷",
      null,
      "14:25"
     ],
     [
      "久里浜",
      "15:05",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "金谷",
      null,
      "15:20"
     ],
     [
      "久里浜",
      "16:00",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "金谷",
      null,
      "16:30"
     ],
     [
      "久里浜",
      "17:10",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "金谷",
      null,
      "17:20"
     ],
     [
      "久里浜",
      "18:00",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "金谷",
      null,
      "18:25"
     ],
     [
      "久里浜",
      "19:05",
      null
     ]
    ]
   },
   {
    "days": "sat,sun",
    "stops": [
     [
      "金谷",
      null,
      "19:20"
     ],
     [
      "久里浜",
      "20:00",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "east-7",
  "operator": "東海汽船",
  "operatorEn": "Tokai Kisen",
  "name": "東京(竹芝)–大島–利島–新島–式根島–神津島（大型客船）",
  "nameEn": "Tokyo (Takeshiba) – Yokohama – Oshima (Okata) – Oshima (Motomachi) – Toshima – Niijima – Shikinejima (Nobushi) – Kozushima",
  "url": "https://www.tokaikisen.co.jp/boarding/timetable/",
  "ships": [
   {
    "name": "さるびあ丸",
    "en": "SALVIA MARU",
    "mmsi": 431692000
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "東京(竹芝)",
      null,
      "22:00"
     ],
     [
      "大島(岡田)",
      "06:00+1",
      "06:20+1"
     ],
     [
      "利島",
      "07:40+1",
      "07:45+1"
     ],
     [
      "新島",
      "08:35+1",
      "08:45+1"
     ],
     [
      "式根島(野伏)",
      "09:05+1",
      "09:10+1"
     ],
     [
      "神津島(前浜)",
      "10:00+1",
      null
     ]
    ],
    "except": [
     "2026-11-17",
     "2026-11-18",
     "2026-11-24",
     "2026-12-01",
     "2026-12-08",
     "2026-12-15",
     "2026-12-16",
     "2026-12-17",
     "2027-01-05",
     "2027-01-19",
     "2027-01-26"
    ],
    "ship": "さるびあ丸"
   },
   {
    "days": "daily",
    "stops": [
     [
      "神津島(前浜)",
      null,
      "10:30"
     ],
     [
      "式根島(野伏)",
      "11:20",
      "11:25"
     ],
     [
      "新島",
      "11:45",
      "11:55"
     ],
     [
      "利島",
      "12:45",
      "12:50"
     ],
     [
      "大島(岡田)",
      "14:10",
      "14:30"
     ],
     [
      "横浜(大さん橋)",
      "18:00",
      "18:10"
     ],
     [
      "東京(竹芝)",
      "19:00",
      null
     ]
    ],
    "except": [
     "2026-11-18",
     "2026-11-19",
     "2026-11-25",
     "2026-12-02",
     "2026-12-09",
     "2026-12-16",
     "2026-12-17",
     "2026-12-18",
     "2027-01-06",
     "2027-01-20",
     "2027-01-27"
    ],
    "ship": "さるびあ丸"
   }
  ]
 },
 {
  "id": "east-8",
  "operator": "東海汽船",
  "operatorEn": "Tokai Kisen",
  "name": "東京(竹芝)–三宅島–御蔵島–八丈島（大型客船）",
  "nameEn": "Tokyo (Takeshiba) – Miyakejima (Sabigahama) – Mikurajima – Hachijojima (Sokodo)",
  "url": "https://www.tokaikisen.co.jp/boarding/timetable/",
  "ships": [
   {
    "name": "橘丸",
    "en": "TACHIBANA MARU",
    "mmsi": 431005338
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "東京(竹芝)",
      null,
      "22:30"
     ],
     [
      "三宅島(錆ヶ浜)",
      "05:00+1",
      "05:10+1"
     ],
     [
      "御蔵島",
      "06:00+1",
      "06:05+1"
     ],
     [
      "八丈島(底土)",
      "08:55+1",
      null
     ]
    ],
    "ship": "橘丸"
   },
   {
    "days": "daily",
    "stops": [
     [
      "八丈島(底土)",
      null,
      "09:40"
     ],
     [
      "御蔵島",
      "12:35",
      "12:40"
     ],
     [
      "三宅島(錆ヶ浜)",
      "13:35",
      "13:45"
     ],
     [
      "東京(竹芝)",
      "19:50",
      null
     ]
    ],
    "ship": "橘丸"
   }
  ]
 },
 {
  "id": "east-9",
  "operator": "東海汽船",
  "operatorEn": "Tokai Kisen",
  "name": "高速ジェット船（東京(竹芝)–大島、熱海–伊東–大島 ほか）",
  "nameEn": "Tokyo (Takeshiba) – Oshima (Okata) – Atami – Ito – Toshima – Niijima – Shikinejima (Nobushi) – Kozushima",
  "url": "https://www.tokaikisen.co.jp/boarding/timetable/",
  "ships": [
   {
    "name": "セブンアイランド愛",
    "en": "SEVEN ISLAND AI",
    "mmsi": null
   },
   {
    "name": "セブンアイランド友",
    "en": "SEVEN ISLAND TOMO",
    "mmsi": null
   },
   {
    "name": "セブンアイランド大漁",
    "en": "SEVEN ISLAND TAIRYO",
    "mmsi": null
   },
   {
    "name": "セブンアイランド結",
    "en": "SEVEN ISLAND YUI",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "東京(竹芝)",
      null,
      "13:25"
     ],
     [
      "大島(岡田)",
      "15:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "大島(岡田)",
      null,
      "10:40"
     ],
     [
      "東京(竹芝)",
      "12:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "熱海",
      null,
      "09:10"
     ],
     [
      "大島(岡田)",
      "09:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "大島(岡田)",
      null,
      "15:30"
     ],
     [
      "熱海",
      "16:15",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "east-10",
  "operator": "神新汽船",
  "operatorEn": "Shinshin Kisen",
  "name": "下田–利島–新島–式根島–神津島",
  "nameEn": "Shimoda – Toshima – Niijima – Shikinejima (Nobushi) – Kozushima",
  "url": "https://www.tokaikisen.co.jp/boarding/timetable/",
  "ships": [
   {
    "name": "フェリーあぜりあ",
    "en": "FERRY AZALEA",
    "mmsi": 431006033
   }
  ],
  "sailings": [
   {
    "days": "sun,tue,fri",
    "stops": [
     [
      "下田",
      null,
      "09:30"
     ],
     [
      "利島",
      "11:05",
      "11:10"
     ],
     [
      "新島",
      "12:10",
      "12:25"
     ],
     [
      "式根島(野伏)",
      "12:45",
      "13:00"
     ],
     [
      "神津島(前浜)",
      "13:50",
      "14:10"
     ],
     [
      "下田",
      "16:30",
      null
     ]
    ],
    "ship": "フェリーあぜりあ"
   },
   {
    "days": "mon,thu,sat",
    "stops": [
     [
      "下田",
      null,
      "09:30"
     ],
     [
      "神津島(前浜)",
      "11:50",
      "12:10"
     ],
     [
      "式根島(野伏)",
      "13:00",
      "13:10"
     ],
     [
      "新島",
      "13:30",
      "13:50"
     ],
     [
      "利島",
      "14:40",
      "14:45"
     ],
     [
      "下田",
      "16:30",
      null
     ]
    ],
    "ship": "フェリーあぜりあ"
   }
  ]
 },
 {
  "id": "east-11",
  "operator": "小笠原海運",
  "operatorEn": "Ogasawara Kaiun",
  "name": "東京(竹芝)–父島(二見港)",
  "nameEn": "Tokyo (Takeshiba) – Chichijima (Futami)",
  "url": "https://www.ogasawarakaiun.co.jp/service/",
  "ships": [
   {
    "name": "おがさわら丸",
    "en": "OGASAWARA MARU",
    "mmsi": 431347000
   }
  ],
  "sailings": [
   {
    "days": {
     "dates": [
      "2026-11-07",
      "2026-11-13",
      "2026-11-19",
      "2026-11-27",
      "2026-12-04",
      "2026-12-10",
      "2026-12-16",
      "2026-12-22",
      "2026-12-29",
      "2027-01-06",
      "2027-01-12",
      "2027-01-19",
      "2027-01-26"
     ]
    },
    "stops": [
     [
      "東京(竹芝)",
      null,
      "11:00"
     ],
     [
      "父島(二見)",
      "11:00+1",
      null
     ]
    ],
    "ship": "おがさわら丸"
   },
   {
    "days": {
     "dates": [
      "2026-11-11",
      "2026-11-17",
      "2026-11-23",
      "2026-12-01",
      "2026-12-08",
      "2026-12-14",
      "2026-12-20",
      "2026-12-26",
      "2027-01-02",
      "2027-01-10",
      "2027-01-16",
      "2027-01-23",
      "2027-01-30"
     ]
    },
    "stops": [
     [
      "父島(二見)",
      null,
      "15:00"
     ],
     [
      "東京(竹芝)",
      "15:00+1",
      null
     ]
    ],
    "ship": "おがさわら丸"
   }
  ]
 },
 {
  "id": "east-12",
  "operator": "ふじさん駿河湾フェリー",
  "operatorEn": "Fujisan Suruga Bay Ferry",
  "name": "清水–土肥",
  "nameEn": "Shimizu (Ejiri) – Toi",
  "url": "https://www.223-ferry.or.jp/",
  "ships": [
   {
    "name": "富士",
    "en": "FUJI",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "清水(江尻)",
      null,
      "07:40"
     ],
     [
      "土肥",
      "09:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "清水(江尻)",
      null,
      "11:20"
     ],
     [
      "土肥",
      "12:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "清水(江尻)",
      null,
      "14:40"
     ],
     [
      "土肥",
      "16:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土肥",
      null,
      "09:35"
     ],
     [
      "清水(江尻)",
      "11:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土肥",
      null,
      "13:00"
     ],
     [
      "清水(江尻)",
      "14:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土肥",
      null,
      "16:30"
     ],
     [
      "清水(江尻)",
      "18:00",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "east-13",
  "operator": "伊勢湾フェリー",
  "operatorEn": "Isewan Ferry",
  "name": "鳥羽–伊良湖",
  "nameEn": "Toba – Irago",
  "url": "https://www.isewanferry.co.jp/publics/index/175/",
  "ships": [
   {
    "name": "伊勢丸",
    "en": "ISEMARU",
    "mmsi": 431200675
   },
   {
    "name": "知多丸",
    "en": "CHITAMARU",
    "mmsi": 431200654
   }
  ],
  "sailings": [
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "鳥羽",
      null,
      "08:10"
     ],
     [
      "伊良湖",
      "09:10",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "鳥羽",
      null,
      "09:30"
     ],
     [
      "伊良湖",
      "10:30",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "鳥羽",
      null,
      "10:40"
     ],
     [
      "伊良湖",
      "11:40",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "鳥羽",
      null,
      "12:00"
     ],
     [
      "伊良湖",
      "13:00",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "鳥羽",
      null,
      "13:40"
     ],
     [
      "伊良湖",
      "14:40",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "鳥羽",
      null,
      "15:20"
     ],
     [
      "伊良湖",
      "16:20",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "鳥羽",
      null,
      "16:30"
     ],
     [
      "伊良湖",
      "17:30",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "鳥羽",
      null,
      "17:40"
     ],
     [
      "伊良湖",
      "18:40",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "伊良湖",
      null,
      "08:10"
     ],
     [
      "鳥羽",
      "09:10",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "伊良湖",
      null,
      "09:30"
     ],
     [
      "鳥羽",
      "10:30",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "伊良湖",
      null,
      "10:40"
     ],
     [
      "鳥羽",
      "11:40",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "伊良湖",
      null,
      "12:20"
     ],
     [
      "鳥羽",
      "13:20",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "伊良湖",
      null,
      "13:40"
     ],
     [
      "鳥羽",
      "14:40",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "伊良湖",
      null,
      "15:20"
     ],
     [
      "鳥羽",
      "16:20",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "伊良湖",
      null,
      "16:30"
     ],
     [
      "鳥羽",
      "17:30",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "伊良湖",
      null,
      "17:40"
     ],
     [
      "鳥羽",
      "18:40",
      null
     ]
    ]
   },
   {
    "days": "sun",
    "stops": [
     [
      "鳥羽",
      null,
      "08:10"
     ],
     [
      "伊良湖",
      "09:10",
      null
     ]
    ]
   },
   {
    "days": "sun",
    "stops": [
     [
      "鳥羽",
      null,
      "09:30"
     ],
     [
      "伊良湖",
      "10:30",
      null
     ]
    ]
   },
   {
    "days": "sun",
    "stops": [
     [
      "鳥羽",
      null,
      "10:40"
     ],
     [
      "伊良湖",
      "11:40",
      null
     ]
    ]
   },
   {
    "days": "sun",
    "stops": [
     [
      "鳥羽",
      null,
      "11:50"
     ],
     [
      "伊良湖",
      "12:50",
      null
     ]
    ]
   },
   {
    "days": "sun",
    "stops": [
     [
      "鳥羽",
      null,
      "13:00"
     ],
     [
      "伊良湖",
      "14:00",
      null
     ]
    ]
   },
   {
    "days": "sun",
    "stops": [
     [
      "鳥羽",
      null,
      "14:10"
     ],
     [
      "伊良湖",
      "15:10",
      null
     ]
    ]
   },
   {
    "days": "sun",
    "stops": [
     [
      "鳥羽",
      null,
      "15:20"
     ],
     [
      "伊良湖",
      "16:20",
      null
     ]
    ]
   },
   {
    "days": "sun",
    "stops": [
     [
      "鳥羽",
      null,
      "16:30"
     ],
     [
      "伊良湖",
      "17:30",
      null
     ]
    ]
   },
   {
    "days": "sun",
    "stops": [
     [
      "鳥羽",
      null,
      "17:40"
     ],
     [
      "伊良湖",
      "18:40",
      null
     ]
    ]
   },
   {
    "days": "sun",
    "stops": [
     [
      "伊良湖",
      null,
      "08:10"
     ],
     [
      "鳥羽",
      "09:10",
      null
     ]
    ]
   },
   {
    "days": "sun",
    "stops": [
     [
      "伊良湖",
      null,
      "09:30"
     ],
     [
      "鳥羽",
      "10:30",
      null
     ]
    ]
   },
   {
    "days": "sun",
    "stops": [
     [
      "伊良湖",
      null,
      "10:40"
     ],
     [
      "鳥羽",
      "11:40",
      null
     ]
    ]
   },
   {
    "days": "sun",
    "stops": [
     [
      "伊良湖",
      null,
      "11:50"
     ],
     [
      "鳥羽",
      "12:50",
      null
     ]
    ]
   },
   {
    "days": "sun",
    "stops": [
     [
      "伊良湖",
      null,
      "13:00"
     ],
     [
      "鳥羽",
      "14:00",
      null
     ]
    ]
   },
   {
    "days": "sun",
    "stops": [
     [
      "伊良湖",
      null,
      "14:10"
     ],
     [
      "鳥羽",
      "15:10",
      null
     ]
    ]
   },
   {
    "days": "sun",
    "stops": [
     [
      "伊良湖",
      null,
      "15:20"
     ],
     [
      "鳥羽",
      "16:20",
      null
     ]
    ]
   },
   {
    "days": "sun",
    "stops": [
     [
      "伊良湖",
      null,
      "16:30"
     ],
     [
      "鳥羽",
      "17:30",
      null
     ]
    ]
   },
   {
    "days": "sun",
    "stops": [
     [
      "伊良湖",
      null,
      "17:40"
     ],
     [
      "鳥羽",
      "18:40",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "east-14",
  "operator": "オーシャン東九フェリー",
  "operatorEn": "Ocean Tokyu Ferry",
  "name": "東京(有明)–徳島(沖洲)–新門司",
  "nameEn": "Tokyo (Ariake) – Tokushima (Okinosu) – Shin-Moji",
  "url": "https://www.otf.jp/schedule/",
  "ships": [
   {
    "name": "フェリーびざん",
    "en": "FERRY BIZAN",
    "mmsi": 431007129
   },
   {
    "name": "フェリーしまんと",
    "en": "FERRY SHIMANTO",
    "mmsi": 431007575
   },
   {
    "name": "フェリーどうご",
    "en": "FERRY DOUGO",
    "mmsi": 431007905
   },
   {
    "name": "フェリーりつりん",
    "en": "FERRY RITSURIN",
    "mmsi": 431008355
   }
  ],
  "sailings": [
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "東京(有明)",
      null,
      "19:00"
     ],
     [
      "徳島(沖洲)",
      "13:20+1",
      "14:20+1"
     ],
     [
      "新門司",
      "05:35+2",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "新門司",
      null,
      "19:00"
     ],
     [
      "徳島(沖洲)",
      "09:20+1",
      "11:20+1"
     ],
     [
      "東京(有明)",
      "05:30+2",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "east-15",
  "operator": "宮崎カーフェリー",
  "operatorEn": "Miyazaki Car Ferry",
  "name": "神戸(三宮)–宮崎",
  "nameEn": "Kobe (Sannomiya) – Miyazaki",
  "url": "https://www.miyazakicarferry.com/schedule/",
  "ships": [
   {
    "name": "フェリーたかちほ",
    "en": "FERRY TAKACHIHO",
    "mmsi": 431018821
   },
   {
    "name": "フェリーろっこう",
    "en": "FERRY ROKKO",
    "mmsi": 431019729
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "宮崎",
      null,
      "19:10"
     ],
     [
      "神戸(三宮)",
      "07:30+1",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "神戸(三宮)",
      null,
      "19:10"
     ],
     [
      "宮崎",
      "08:40+1",
      null
     ]
    ]
   },
   {
    "days": "sun",
    "stops": [
     [
      "神戸(三宮)",
      null,
      "18:00"
     ],
     [
      "宮崎",
      "08:40+1",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "east-17",
  "operator": "東京九州フェリー",
  "operatorEn": "Tokyo Kyushu Ferry",
  "name": "横須賀–新門司",
  "nameEn": "Yokosuka – Shin-Moji",
  "url": "https://tqf.co.jp/time_schedule/",
  "ships": [
   {
    "name": "はまゆう",
    "en": "HAMAYU",
    "mmsi": 431015964
   },
   {
    "name": "それいゆ",
    "en": "SOLEIL",
    "mmsi": 431017055
   }
  ],
  "sailings": [
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "横須賀",
      null,
      "23:45"
     ],
     [
      "新門司",
      "21:00+1",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "新門司",
      null,
      "23:55"
     ],
     [
      "横須賀",
      "20:45+1",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "japansea-0",
  "operator": "新日本海フェリー",
  "operatorEn": "Shin Nihonkai Ferry",
  "name": "舞鶴–小樽",
  "nameEn": "Maizuru – Otaru",
  "url": "https://www.snf.jp/guide/time_schedule/",
  "ships": [
   {
    "name": "はまなす",
    "en": "HAMANASU",
    "mmsi": 431029669
   },
   {
    "name": "けやき",
    "en": "KEYAKI",
    "mmsi": 431028075
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "舞鶴",
      null,
      "23:50"
     ],
     [
      "小樽",
      "20:45+1",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "小樽",
      null,
      "23:30"
     ],
     [
      "舞鶴",
      "21:15+1",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "japansea-1",
  "operator": "新日本海フェリー",
  "operatorEn": "Shin Nihonkai Ferry",
  "name": "敦賀–苫小牧東（直行）",
  "nameEn": "Tsuruga – Tomakomai-Higashi",
  "url": "https://www.snf.jp/guide/time_schedule/",
  "ships": [
   {
    "name": "すずらん",
    "en": "SUZURAN",
    "mmsi": 431003496
   },
   {
    "name": "すいせん",
    "en": "SUISEN",
    "mmsi": 431003671
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "敦賀",
      null,
      "23:55"
     ],
     [
      "苫小牧東",
      "20:30+1",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "苫小牧東",
      null,
      "23:30"
     ],
     [
      "敦賀",
      "20:30+1",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "japansea-2",
  "operator": "新日本海フェリー",
  "operatorEn": "Shin Nihonkai Ferry",
  "name": "新潟–小樽",
  "nameEn": "Niigata – Otaru",
  "url": "https://www.snf.jp/guide/time_schedule/",
  "ships": [
   {
    "name": "らべんだあ",
    "en": "LAVENDER",
    "mmsi": 431009156
   },
   {
    "name": "あざれあ",
    "en": "AZALEA",
    "mmsi": 431009637
   }
  ],
  "sailings": [
   {
    "days": "sun,tue,wed,thu,fri,sat",
    "stops": [
     [
      "新潟",
      null,
      "12:00"
     ],
     [
      "小樽",
      "04:30+1",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "小樽",
      null,
      "16:45"
     ],
     [
      "新潟",
      "09:15+1",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "japansea-3",
  "operator": "新日本海フェリー",
  "operatorEn": "Shin Nihonkai Ferry",
  "name": "敦賀–新潟–秋田–苫小牧東",
  "nameEn": "Tsuruga – Niigata – Akita – Tomakomai-Higashi",
  "url": "https://www.snf.jp/guide/time_schedule/",
  "ships": [
   {
    "name": "らいらっく",
    "en": "LILAC",
    "mmsi": 431301606
   },
   {
    "name": "ゆうかり",
    "en": "YUUKARI",
    "mmsi": 432341000
   }
  ],
  "sailings": [
   {
    "days": "sun,tue,thu",
    "stops": [
     [
      "敦賀",
      null,
      "18:30"
     ],
     [
      "新潟",
      "06:00+1",
      "22:30+1"
     ],
     [
      "秋田",
      "05:05+2",
      "06:15+2"
     ],
     [
      "苫小牧東",
      "16:45+2",
      null
     ]
    ],
    "period": [
     [
      "2026-01-01",
      "2027-01-11"
     ]
    ]
   },
   {
    "days": "tue,thu,sat",
    "stops": [
     [
      "苫小牧東",
      null,
      "19:30"
     ],
     [
      "秋田",
      "07:35+1",
      "08:35+1"
     ],
     [
      "新潟",
      "15:30+1",
      "17:30+1"
     ],
     [
      "敦賀",
      "06:00+2",
      null
     ]
    ],
    "period": [
     [
      "2026-01-01",
      "2027-01-11"
     ]
    ]
   },
   {
    "days": "mon",
    "stops": [
     [
      "敦賀",
      null,
      "09:30"
     ],
     [
      "新潟",
      "21:30",
      "22:30"
     ],
     [
      "秋田",
      "05:05+1",
      "06:15+1"
     ],
     [
      "苫小牧東",
      "16:45+1",
      null
     ]
    ],
    "period": [
     [
      "2027-01-12",
      "2099-12-31"
     ]
    ]
   },
   {
    "days": "tue,wed,thu,fri,sat",
    "stops": [
     [
      "新潟",
      null,
      "22:30"
     ],
     [
      "秋田",
      "05:05+1",
      "06:15+1"
     ],
     [
      "苫小牧東",
      "16:45+1",
      null
     ]
    ],
    "period": [
     [
      "2027-01-12",
      "2099-12-31"
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "苫小牧東",
      null,
      "19:30"
     ],
     [
      "秋田",
      "07:35+1",
      "08:35+1"
     ],
     [
      "新潟",
      "15:30+1",
      null
     ]
    ],
    "period": [
     [
      "2027-01-12",
      "2099-12-31"
     ]
    ]
   },
   {
    "days": "sat",
    "stops": [
     [
      "苫小牧東",
      null,
      "19:30"
     ],
     [
      "秋田",
      "07:35+1",
      "08:35+1"
     ],
     [
      "新潟",
      "15:30+1",
      "16:30+1"
     ],
     [
      "敦賀",
      "05:30+2",
      null
     ]
    ],
    "period": [
     [
      "2027-01-12",
      "2099-12-31"
     ]
    ]
   }
  ]
 },
 {
  "id": "japansea-4",
  "operator": "佐渡汽船",
  "operatorEn": "Sado Kisen",
  "name": "新潟–両津（カーフェリー）",
  "nameEn": "Niigata – Ryotsu",
  "url": "https://www.sadokisen.co.jp/timetable/wp-content/uploads/sites/15/2026/01/timetable_2026.pdf",
  "ships": [
   {
    "name": "おけさ丸",
    "en": "OKESA MARU",
    "mmsi": 431000001
   },
   {
    "name": "ときわ丸",
    "en": "TOKIWA MARU",
    "mmsi": 431005219
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "新潟",
      null,
      "06:00"
     ],
     [
      "両津",
      "08:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "新潟",
      null,
      "09:25"
     ],
     [
      "両津",
      "11:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "新潟",
      null,
      "12:35"
     ],
     [
      "両津",
      "15:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "新潟",
      null,
      "16:05"
     ],
     [
      "両津",
      "18:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "新潟",
      null,
      "19:30"
     ],
     [
      "両津",
      "22:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "両津",
      null,
      "05:30"
     ],
     [
      "新潟",
      "08:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "両津",
      null,
      "09:15"
     ],
     [
      "新潟",
      "11:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "両津",
      null,
      "12:45"
     ],
     [
      "新潟",
      "15:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "両津",
      null,
      "16:05"
     ],
     [
      "新潟",
      "18:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "両津",
      null,
      "19:30"
     ],
     [
      "新潟",
      "22:00",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "japansea-5",
  "operator": "佐渡汽船",
  "operatorEn": "Sado Kisen",
  "name": "新潟–両津（ジェットフォイル）",
  "nameEn": "Niigata – Ryotsu",
  "url": "https://www.sadokisen.co.jp/timetable/wp-content/uploads/sites/15/2026/01/timetable_2026.pdf",
  "ships": [
   {
    "name": "ぎんが",
    "en": "GINGA",
    "mmsi": null
   },
   {
    "name": "つばさ",
    "en": "TSUBASA",
    "mmsi": null
   },
   {
    "name": "すいせい",
    "en": "SUISEI",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "新潟",
      null,
      "07:55"
     ],
     [
      "両津",
      "09:02",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "新潟",
      null,
      "09:40"
     ],
     [
      "両津",
      "10:47",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "新潟",
      null,
      "11:30"
     ],
     [
      "両津",
      "12:37",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "新潟",
      null,
      "13:35"
     ],
     [
      "両津",
      "14:42",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "新潟",
      null,
      "15:30"
     ],
     [
      "両津",
      "16:37",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "両津",
      null,
      "07:20"
     ],
     [
      "新潟",
      "08:27",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "両津",
      null,
      "09:40"
     ],
     [
      "新潟",
      "10:47",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "両津",
      null,
      "11:15"
     ],
     [
      "新潟",
      "12:22",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "両津",
      null,
      "13:45"
     ],
     [
      "新潟",
      "14:52",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "両津",
      null,
      "15:30"
     ],
     [
      "新潟",
      "16:37",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "japansea-6",
  "operator": "佐渡汽船",
  "operatorEn": "Sado Kisen",
  "name": "直江津–小木",
  "nameEn": "Naoetsu – Ogi",
  "url": "https://www.sadokisen.co.jp/timetable/wp-content/uploads/sites/15/2026/01/timetable_2026.pdf",
  "ships": [
   {
    "name": "こがね丸",
    "en": "KOGANE MARU",
    "mmsi": 431501694
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "直江津",
      null,
      "07:10"
     ],
     [
      "小木",
      "09:50",
      null
     ]
    ],
    "ship": "こがね丸"
   },
   {
    "days": "daily",
    "stops": [
     [
      "小木",
      null,
      "10:35"
     ],
     [
      "直江津",
      "13:15",
      null
     ]
    ],
    "ship": "こがね丸"
   },
   {
    "days": "daily",
    "stops": [
     [
      "直江津",
      null,
      "14:00"
     ],
     [
      "小木",
      "16:40",
      null
     ]
    ],
    "ship": "こがね丸"
   },
   {
    "days": "daily",
    "stops": [
     [
      "小木",
      null,
      "17:25"
     ],
     [
      "直江津",
      "20:05",
      null
     ]
    ],
    "ship": "こがね丸"
   }
  ]
 },
 {
  "id": "japansea-7",
  "operator": "隠岐汽船",
  "operatorEn": "Oki Kisen",
  "name": "七類・境港–隠岐諸島（フェリー）",
  "nameEn": "Shichirui – Sakaiminato – Saigo – Hishiura – Beppu (Nishinoshima) – Kurii",
  "url": "https://www.oki-kisen.co.jp/timetable/",
  "ships": [
   {
    "name": "フェリーおき",
    "en": "FERRY OKI",
    "mmsi": 431401975
   },
   {
    "name": "フェリーしらしま",
    "en": "FERRY SHIRASHIMA",
    "mmsi": 431400404
   },
   {
    "name": "フェリーくにが",
    "en": "FERRY KUNIGA",
    "mmsi": 431401646
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "七類",
      null,
      "09:00"
     ],
     [
      "西郷",
      "11:25",
      null
     ]
    ],
    "ship": "フェリーおき"
   },
   {
    "days": "daily",
    "stops": [
     [
      "西郷",
      null,
      "12:00"
     ],
     [
      "菱浦",
      "13:10",
      "13:30"
     ],
     [
      "別府",
      "13:45",
      null
     ]
    ],
    "ship": "フェリーおき"
   },
   {
    "days": "daily",
    "stops": [
     [
      "別府",
      null,
      "14:00"
     ],
     [
      "西郷",
      "15:10",
      "15:40"
     ],
     [
      "七類",
      "18:05",
      null
     ]
    ],
    "ship": "フェリーおき"
   },
   {
    "days": "daily",
    "stops": [
     [
      "西郷",
      null,
      "08:30"
     ],
     [
      "菱浦",
      "09:40",
      "09:50"
     ],
     [
      "別府",
      "10:05",
      "10:20"
     ],
     [
      "来居",
      "10:50",
      "10:55"
     ],
     [
      "境港",
      "13:20",
      null
     ]
    ],
    "ship": "フェリーしらしま"
   },
   {
    "days": "daily",
    "stops": [
     [
      "境港",
      null,
      "14:10"
     ],
     [
      "来居",
      "16:35",
      "16:40"
     ],
     [
      "別府",
      "17:10",
      "17:20"
     ],
     [
      "西郷",
      "18:35",
      null
     ]
    ],
    "ship": "フェリーしらしま"
   }
  ]
 },
 {
  "id": "japansea-8",
  "operator": "隠岐汽船",
  "operatorEn": "Oki Kisen",
  "name": "境港–隠岐諸島（高速船レインボージェット）",
  "nameEn": "Beppu (Nishinoshima) – Hishiura – Saigo – Sakaiminato",
  "url": "https://www.oki-kisen.co.jp/timetable/",
  "ships": [
   {
    "name": "レインボージェット",
    "en": "RAINBOW JET",
    "mmsi": 431602362
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "別府",
      null,
      "08:00"
     ],
     [
      "菱浦",
      "08:10",
      "08:14"
     ],
     [
      "西郷",
      "08:45",
      "08:54"
     ],
     [
      "境港",
      "10:17",
      null
     ]
    ],
    "period": [
     [
      "2026-11-01",
      "2026-11-30"
     ]
    ],
    "ship": "レインボージェット"
   },
   {
    "days": "daily",
    "stops": [
     [
      "境港",
      null,
      "15:10"
     ],
     [
      "西郷",
      "16:33",
      "16:39"
     ],
     [
      "菱浦",
      "17:10",
      "17:13"
     ],
     [
      "別府",
      "17:23",
      null
     ]
    ],
    "period": [
     [
      "2026-11-01",
      "2026-11-30"
     ]
    ],
    "ship": "レインボージェット"
   }
  ]
 },
 {
  "id": "japansea-9",
  "operator": "ハートランドフェリー",
  "operatorEn": "Heart Land Ferry",
  "name": "稚内–利尻（鴛泊）",
  "nameEn": "Wakkanai – Oshidomari (Rishiri)",
  "url": "https://heartlandferry.jp/timetable/",
  "ships": [
   {
    "name": "ボレアース宗谷",
    "en": "BOREAS SOYA",
    "mmsi": 431800649
   },
   {
    "name": "サイプリア宗谷",
    "en": "CYPRIA SOYA",
    "mmsi": 431000521
   },
   {
    "name": "アマポーラ宗谷",
    "en": "AMAPOLA SOYA",
    "mmsi": 431014401
   },
   {
    "name": "トロリウス宗谷",
    "en": "TROLLIUS SOYA",
    "mmsi": 431031682
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "稚内",
      null,
      "06:55"
     ],
     [
      "鴛泊",
      "08:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鴛泊",
      null,
      "09:05"
     ],
     [
      "稚内",
      "10:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "稚内",
      null,
      "14:00"
     ],
     [
      "鴛泊",
      "15:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鴛泊",
      null,
      "17:30"
     ],
     [
      "稚内",
      "19:10",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "japansea-10",
  "operator": "ハートランドフェリー",
  "operatorEn": "Heart Land Ferry",
  "name": "稚内–礼文（香深）",
  "nameEn": "Wakkanai – Kafuka (Rebun) – Oshidomari (Rishiri)",
  "url": "https://heartlandferry.jp/timetable/time1/",
  "ships": [
   {
    "name": "ボレアース宗谷",
    "en": "BOREAS SOYA",
    "mmsi": 431800649
   },
   {
    "name": "サイプリア宗谷",
    "en": "CYPRIA SOYA",
    "mmsi": 431000521
   },
   {
    "name": "アマポーラ宗谷",
    "en": "AMAPOLA SOYA",
    "mmsi": 431014401
   },
   {
    "name": "トロリウス宗谷",
    "en": "TROLLIUS SOYA",
    "mmsi": 431031682
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "稚内",
      null,
      "06:35"
     ],
     [
      "香深",
      "08:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "香深",
      null,
      "09:00"
     ],
     [
      "稚内",
      "10:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "稚内",
      null,
      "14:10"
     ],
     [
      "香深",
      "16:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "香深",
      null,
      "17:05"
     ],
     [
      "稚内",
      "19:00",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "japansea-11",
  "operator": "ハートランドフェリー",
  "operatorEn": "Heart Land Ferry",
  "name": "利尻（鴛泊・沓形）–礼文（香深）",
  "nameEn": "Oshidomari (Rishiri) – Kafuka (Rebun) – Kutsugata (Rishiri)",
  "url": "https://heartlandferry.jp/timetable/time2/",
  "ships": [
   {
    "name": "ボレアース宗谷",
    "en": "BOREAS SOYA",
    "mmsi": 431800649
   },
   {
    "name": "サイプリア宗谷",
    "en": "CYPRIA SOYA",
    "mmsi": 431000521
   },
   {
    "name": "アマポーラ宗谷",
    "en": "AMAPOLA SOYA",
    "mmsi": 431014401
   },
   {
    "name": "トロリウス宗谷",
    "en": "TROLLIUS SOYA",
    "mmsi": 431031682
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "鴛泊",
      null,
      "16:00"
     ],
     [
      "香深",
      "16:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "香深",
      null,
      "16:25"
     ],
     [
      "鴛泊",
      "17:10",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "japansea-12",
  "operator": "ハートランドフェリー",
  "operatorEn": "Okushiri Island Ferry",
  "name": "江差–奥尻",
  "nameEn": "Esashi – Okushiri",
  "url": "https://heartlandferry.jp/timetable/time3/",
  "ships": [
   {
    "name": "カランセ奥尻",
    "en": "CALANTHE OKUSHIRI",
    "mmsi": 431001250
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "奥尻",
      null,
      "07:00"
     ],
     [
      "江差",
      "09:10",
      null
     ]
    ],
    "period": [
     [
      "2026-10-01",
      "2026-11-30"
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "江差",
      null,
      "13:00"
     ],
     [
      "奥尻",
      "15:10",
      null
     ]
    ],
    "period": [
     [
      "2026-10-01",
      "2026-11-30"
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "奥尻",
      null,
      "07:30"
     ],
     [
      "江差",
      "09:50",
      null
     ]
    ],
    "period": [
     [
      "2026-12-01",
      "2026-12-31"
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "江差",
      null,
      "13:00"
     ],
     [
      "奥尻",
      "15:20",
      null
     ]
    ],
    "period": [
     [
      "2026-12-01",
      "2026-12-31"
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "奥尻",
      null,
      "08:15"
     ],
     [
      "江差",
      "10:35",
      null
     ]
    ],
    "period": [
     [
      "2027-01-01",
      "2027-03-31"
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "江差",
      null,
      "13:00"
     ],
     [
      "奥尻",
      "15:20",
      null
     ]
    ],
    "period": [
     [
      "2027-01-01",
      "2027-03-31"
     ]
    ]
   }
  ]
 },
 {
  "id": "japansea-13",
  "operator": "羽幌沿海フェリー",
  "operatorEn": "Haboro Enkai Ferry",
  "name": "羽幌–焼尻–天売",
  "nameEn": "Haboro – Yagishiri – Teuri",
  "url": "https://haboro-enkai.com/timetable/",
  "ships": [
   {
    "name": "おろろん2",
    "en": "ORORON2",
    "mmsi": 431800611
   },
   {
    "name": "さんらいなぁ2",
    "en": "SUNLINER2",
    "mmsi": 431004287
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "羽幌",
      null,
      "09:00"
     ],
     [
      "焼尻",
      "10:00",
      "10:20"
     ],
     [
      "天売",
      "10:45",
      null
     ]
    ],
    "period": [
     [
      "2026-10-01",
      "2027-04-07"
     ]
    ],
    "ship": "おろろん2"
   },
   {
    "days": "daily",
    "stops": [
     [
      "天売",
      null,
      "11:35"
     ],
     [
      "焼尻",
      "12:00",
      "12:20"
     ],
     [
      "羽幌",
      "13:20",
      null
     ]
    ],
    "period": [
     [
      "2026-10-01",
      "2027-04-07"
     ]
    ],
    "ship": "おろろん2"
   }
  ]
 },
 {
  "id": "japansea-14",
  "operator": "粟島汽船",
  "operatorEn": "Awashima Kisen",
  "name": "岩船–粟島",
  "nameEn": "Iwafune – Awashima",
  "url": "https://www.awashimakisen.co.jp/",
  "ships": [
   {
    "name": "フェリーニューあわしま",
    "en": "FERRY NEW AWASHIMA",
    "mmsi": 431012762
   }
  ],
  "sailings": [
   {
    "days": "mon,wed,fri",
    "stops": [
     [
      "粟島",
      null,
      "08:00"
     ],
     [
      "岩船",
      "09:35",
      null
     ]
    ],
    "period": [
     [
      "2026-11-02",
      "2026-12-28"
     ]
    ]
   },
   {
    "days": "mon,wed,fri",
    "stops": [
     [
      "岩船",
      null,
      "10:15"
     ],
     [
      "粟島",
      "11:50",
      null
     ]
    ],
    "period": [
     [
      "2026-11-02",
      "2026-12-28"
     ]
    ]
   },
   {
    "days": "mon,wed,fri",
    "stops": [
     [
      "粟島",
      null,
      "12:45"
     ],
     [
      "岩船",
      "14:20",
      null
     ]
    ],
    "period": [
     [
      "2026-11-02",
      "2026-12-28"
     ]
    ]
   },
   {
    "days": "mon,wed,fri",
    "stops": [
     [
      "岩船",
      null,
      "15:00"
     ],
     [
      "粟島",
      "16:35",
      null
     ]
    ],
    "period": [
     [
      "2026-11-02",
      "2026-12-28"
     ]
    ]
   },
   {
    "days": "sun,tue,thu,sat",
    "stops": [
     [
      "粟島",
      null,
      "08:00"
     ],
     [
      "岩船",
      "09:35",
      null
     ]
    ],
    "period": [
     [
      "2026-11-02",
      "2026-12-28"
     ]
    ]
   },
   {
    "days": "sun,tue,thu,sat",
    "stops": [
     [
      "岩船",
      null,
      "15:00"
     ],
     [
      "粟島",
      "16:35",
      null
     ]
    ],
    "period": [
     [
      "2026-11-02",
      "2026-12-28"
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "粟島",
      null,
      "08:00"
     ],
     [
      "岩船",
      "09:35",
      null
     ]
    ],
    "period": [
     [
      "2026-12-29",
      "2027-02-28"
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "岩船",
      null,
      "15:00"
     ],
     [
      "粟島",
      "16:35",
      null
     ]
    ],
    "period": [
     [
      "2026-12-29",
      "2027-02-28"
     ]
    ]
   }
  ]
 },
 {
  "id": "japansea-15",
  "operator": "九州郵船",
  "operatorEn": "Kyushu Yusen",
  "name": "博多–壱岐–対馬（厳原）ジェットフォイル",
  "nameEn": "Hakata – Gonoura (Iki) – Ashibe (Iki) – Izuhara (Tsushima)",
  "url": "https://www.kyu-you.co.jp/route/",
  "ships": [
   {
    "name": "ヴィーナス",
    "en": "VENUS",
    "mmsi": 431029832
   },
   {
    "name": "ヴィーナス2",
    "en": "VENUS 2",
    "mmsi": 431026801
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "博多",
      null,
      "08:00"
     ],
     [
      "郷ノ浦",
      "09:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "郷ノ浦",
      null,
      "09:20"
     ],
     [
      "博多",
      "10:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "博多",
      null,
      "10:45"
     ],
     [
      "芦辺",
      "11:50",
      "11:55"
     ],
     [
      "厳原",
      "13:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "厳原",
      null,
      "13:15"
     ],
     [
      "芦辺",
      "14:20",
      "14:25"
     ],
     [
      "博多",
      "15:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "博多",
      null,
      "15:45"
     ],
     [
      "郷ノ浦",
      "16:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "郷ノ浦",
      null,
      "17:05"
     ],
     [
      "博多",
      "18:20",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "japansea-16",
  "operator": "九州郵船",
  "operatorEn": "Kyushu Yusen",
  "name": "博多–壱岐–対馬（厳原）フェリー",
  "nameEn": "Hakata – Gonoura (Iki) – Ashibe (Iki) – Izuhara (Tsushima)",
  "url": "https://www.kyu-you.co.jp/route/",
  "ships": [
   {
    "name": "フェリーきずな",
    "en": "FERRY KIZUNA",
    "mmsi": 431003373
   },
   {
    "name": "フェリーちくし",
    "en": "FERRY CHIKUSHI",
    "mmsi": 431600182
   },
   {
    "name": "エメラルドからつ",
    "en": "EMERALD KARATSU",
    "mmsi": 431000127
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "博多",
      null,
      "10:00"
     ],
     [
      "郷ノ浦",
      "12:20",
      "12:35"
     ],
     [
      "厳原",
      "14:45",
      null
     ]
    ],
    "period": [
     [
      "2026-11-01",
      "2026-12-10"
     ]
    ],
    "ship": "フェリーきずな"
   },
   {
    "days": "daily",
    "stops": [
     [
      "博多",
      null,
      "20:35"
     ],
     [
      "郷ノ浦",
      "22:55",
      null
     ]
    ],
    "period": [
     [
      "2026-11-01",
      "2026-12-10"
     ]
    ],
    "ship": "フェリーきずな"
   },
   {
    "days": "daily",
    "stops": [
     [
      "博多",
      null,
      "23:30"
     ],
     [
      "芦辺",
      "02:15+1",
      "02:25+1"
     ],
     [
      "厳原",
      "05:20+1",
      null
     ]
    ],
    "period": [
     [
      "2026-11-01",
      "2026-12-10"
     ]
    ],
    "ship": "エメラルドからつ"
   },
   {
    "days": "daily",
    "stops": [
     [
      "郷ノ浦",
      null,
      "07:00"
     ],
     [
      "博多",
      "09:25",
      null
     ]
    ],
    "period": [
     [
      "2026-11-01",
      "2026-12-10"
     ]
    ],
    "ship": "フェリーきずな"
   },
   {
    "days": "daily",
    "stops": [
     [
      "厳原",
      null,
      "08:20"
     ],
     [
      "芦辺",
      "11:05",
      "11:15"
     ],
     [
      "博多",
      "13:55",
      null
     ]
    ],
    "period": [
     [
      "2026-11-01",
      "2026-12-10"
     ]
    ],
    "ship": "エメラルドからつ"
   },
   {
    "days": "daily",
    "stops": [
     [
      "厳原",
      null,
      "15:25"
     ],
     [
      "郷ノ浦",
      "17:30",
      "17:45"
     ],
     [
      "博多",
      "20:10",
      null
     ]
    ],
    "period": [
     [
      "2026-11-01",
      "2026-12-10"
     ]
    ],
    "ship": "フェリーきずな"
   },
   {
    "days": "daily",
    "stops": [
     [
      "博多",
      null,
      "00:05"
     ],
     [
      "芦辺",
      "02:15",
      "02:25"
     ],
     [
      "厳原",
      "04:45",
      null
     ]
    ],
    "period": [
     [
      "2026-12-12",
      "2099-12-31"
     ]
    ],
    "ship": "フェリーちくし"
   },
   {
    "days": "daily",
    "stops": [
     [
      "博多",
      null,
      "10:00"
     ],
     [
      "郷ノ浦",
      "12:20",
      "12:35"
     ],
     [
      "厳原",
      "14:45",
      null
     ]
    ],
    "period": [
     [
      "2026-12-12",
      "2099-12-31"
     ]
    ],
    "ship": "フェリーきずな"
   },
   {
    "days": "daily",
    "stops": [
     [
      "博多",
      null,
      "20:35"
     ],
     [
      "郷ノ浦",
      "22:55",
      null
     ]
    ],
    "period": [
     [
      "2026-12-12",
      "2099-12-31"
     ]
    ],
    "ship": "フェリーきずな"
   },
   {
    "days": "daily",
    "stops": [
     [
      "郷ノ浦",
      null,
      "07:00"
     ],
     [
      "博多",
      "09:25",
      null
     ]
    ],
    "period": [
     [
      "2026-12-12",
      "2099-12-31"
     ]
    ],
    "ship": "フェリーきずな"
   },
   {
    "days": "daily",
    "stops": [
     [
      "厳原",
      null,
      "08:50"
     ],
     [
      "芦辺",
      "11:05",
      "11:15"
     ],
     [
      "博多",
      "13:25",
      null
     ]
    ],
    "period": [
     [
      "2026-12-12",
      "2099-12-31"
     ]
    ],
    "ship": "フェリーちくし"
   },
   {
    "days": "daily",
    "stops": [
     [
      "厳原",
      null,
      "15:25"
     ],
     [
      "郷ノ浦",
      "17:30",
      "17:45"
     ],
     [
      "博多",
      "20:10",
      null
     ]
    ],
    "period": [
     [
      "2026-12-12",
      "2099-12-31"
     ]
    ],
    "ship": "フェリーきずな"
   }
  ]
 },
 {
  "id": "japansea-17",
  "operator": "九州郵船",
  "operatorEn": "Kyushu Yusen",
  "name": "博多–比田勝（上対馬）",
  "nameEn": "Hakata – Hitakatsu (Tsushima)",
  "url": "https://www.kyu-you.co.jp/route/",
  "ships": [
   {
    "name": "うみてらし",
    "en": "UMITERASHI",
    "mmsi": 431017174
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "博多",
      null,
      "22:30"
     ],
     [
      "比田勝",
      "03:25+1",
      null
     ]
    ],
    "ship": "うみてらし"
   },
   {
    "days": "daily",
    "stops": [
     [
      "比田勝",
      null,
      "16:00"
     ],
     [
      "博多",
      "20:55",
      null
     ]
    ],
    "ship": "うみてらし"
   }
  ]
 },
 {
  "id": "japansea-18",
  "operator": "九州郵船",
  "operatorEn": "Kyushu Yusen",
  "name": "唐津東–壱岐（印通寺）",
  "nameEn": "Karatsu-Higashi – Indoji (Iki)",
  "url": "https://www.kyu-you.co.jp/route/",
  "ships": [
   {
    "name": "エメラルドからつ",
    "en": "EMERALD KARATSU",
    "mmsi": 431000127
   },
   {
    "name": "ダイヤモンドいき",
    "en": "DIAMOND IKI",
    "mmsi": 431012809
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "唐津東",
      null,
      "08:50"
     ],
     [
      "印通寺",
      "10:35",
      null
     ]
    ],
    "period": [
     [
      "2026-11-01",
      "2026-12-11"
     ],
     [
      "2027-02-04",
      "2027-02-19"
     ]
    ],
    "ship": "ダイヤモンドいき"
   },
   {
    "days": "daily",
    "stops": [
     [
      "唐津東",
      null,
      "12:50"
     ],
     [
      "印通寺",
      "14:35",
      null
     ]
    ],
    "period": [
     [
      "2026-11-01",
      "2026-12-11"
     ],
     [
      "2027-02-04",
      "2027-02-19"
     ]
    ],
    "ship": "ダイヤモンドいき"
   },
   {
    "days": "daily",
    "stops": [
     [
      "唐津東",
      null,
      "16:50"
     ],
     [
      "印通寺",
      "18:35",
      null
     ]
    ],
    "period": [
     [
      "2026-11-01",
      "2026-12-11"
     ],
     [
      "2027-02-04",
      "2027-02-19"
     ]
    ],
    "ship": "ダイヤモンドいき"
   },
   {
    "days": "daily",
    "stops": [
     [
      "唐津東",
      null,
      "20:40"
     ],
     [
      "印通寺",
      "22:25",
      null
     ]
    ],
    "period": [
     [
      "2026-11-01",
      "2026-12-11"
     ],
     [
      "2027-02-04",
      "2027-02-19"
     ]
    ],
    "ship": "ダイヤモンドいき"
   },
   {
    "days": "daily",
    "stops": [
     [
      "印通寺",
      null,
      "06:50"
     ],
     [
      "唐津東",
      "08:30",
      null
     ]
    ],
    "period": [
     [
      "2026-11-01",
      "2026-12-11"
     ],
     [
      "2027-02-04",
      "2027-02-19"
     ]
    ],
    "ship": "ダイヤモンドいき"
   },
   {
    "days": "daily",
    "stops": [
     [
      "印通寺",
      null,
      "10:50"
     ],
     [
      "唐津東",
      "12:30",
      null
     ]
    ],
    "period": [
     [
      "2026-11-01",
      "2026-12-11"
     ],
     [
      "2027-02-04",
      "2027-02-19"
     ]
    ],
    "ship": "ダイヤモンドいき"
   },
   {
    "days": "daily",
    "stops": [
     [
      "印通寺",
      null,
      "14:50"
     ],
     [
      "唐津東",
      "16:30",
      null
     ]
    ],
    "period": [
     [
      "2026-11-01",
      "2026-12-11"
     ],
     [
      "2027-02-04",
      "2027-02-19"
     ]
    ],
    "ship": "ダイヤモンドいき"
   },
   {
    "days": "daily",
    "stops": [
     [
      "印通寺",
      null,
      "18:45"
     ],
     [
      "唐津東",
      "20:25",
      null
     ]
    ],
    "period": [
     [
      "2026-11-01",
      "2026-12-11"
     ],
     [
      "2027-02-04",
      "2027-02-19"
     ]
    ],
    "ship": "ダイヤモンドいき"
   },
   {
    "days": "daily",
    "stops": [
     [
      "唐津東",
      null,
      "08:40"
     ],
     [
      "印通寺",
      "10:25",
      null
     ]
    ],
    "period": [
     [
      "2026-12-12",
      "2027-02-03"
     ],
     [
      "2027-02-20",
      "2027-02-28"
     ],
     [
      "2027-03-13",
      "2027-03-31"
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "唐津東",
      null,
      "10:20"
     ],
     [
      "印通寺",
      "12:05",
      null
     ]
    ],
    "period": [
     [
      "2026-12-12",
      "2027-02-03"
     ],
     [
      "2027-02-20",
      "2027-02-28"
     ],
     [
      "2027-03-13",
      "2027-03-31"
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "唐津東",
      null,
      "13:20"
     ],
     [
      "印通寺",
      "15:05",
      null
     ]
    ],
    "period": [
     [
      "2026-12-12",
      "2027-02-03"
     ],
     [
      "2027-02-20",
      "2027-02-28"
     ],
     [
      "2027-03-13",
      "2027-03-31"
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "唐津東",
      null,
      "15:30"
     ],
     [
      "印通寺",
      "17:15",
      null
     ]
    ],
    "period": [
     [
      "2026-12-12",
      "2027-02-03"
     ],
     [
      "2027-02-20",
      "2027-02-28"
     ],
     [
      "2027-03-13",
      "2027-03-31"
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "唐津東",
      null,
      "18:20"
     ],
     [
      "印通寺",
      "20:05",
      null
     ]
    ],
    "period": [
     [
      "2026-12-12",
      "2027-02-03"
     ],
     [
      "2027-02-20",
      "2027-02-28"
     ],
     [
      "2027-03-13",
      "2027-03-31"
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "印通寺",
      null,
      "08:20"
     ],
     [
      "唐津東",
      "10:00",
      null
     ]
    ],
    "period": [
     [
      "2026-12-12",
      "2027-02-03"
     ],
     [
      "2027-02-20",
      "2027-02-28"
     ],
     [
      "2027-03-13",
      "2027-03-31"
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "印通寺",
      null,
      "10:50"
     ],
     [
      "唐津東",
      "12:30",
      null
     ]
    ],
    "period": [
     [
      "2026-12-12",
      "2027-02-03"
     ],
     [
      "2027-02-20",
      "2027-02-28"
     ],
     [
      "2027-03-13",
      "2027-03-31"
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "印通寺",
      null,
      "13:20"
     ],
     [
      "唐津東",
      "15:00",
      null
     ]
    ],
    "period": [
     [
      "2026-12-12",
      "2027-02-03"
     ],
     [
      "2027-02-20",
      "2027-02-28"
     ],
     [
      "2027-03-13",
      "2027-03-31"
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "印通寺",
      null,
      "15:30"
     ],
     [
      "唐津東",
      "17:10",
      null
     ]
    ],
    "period": [
     [
      "2026-12-12",
      "2027-02-03"
     ],
     [
      "2027-02-20",
      "2027-02-28"
     ],
     [
      "2027-03-13",
      "2027-03-31"
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "印通寺",
      null,
      "17:30"
     ],
     [
      "唐津東",
      "19:10",
      null
     ]
    ],
    "period": [
     [
      "2026-12-12",
      "2027-02-03"
     ],
     [
      "2027-02-20",
      "2027-02-28"
     ],
     [
      "2027-03-13",
      "2027-03-31"
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-0",
  "operator": "名門大洋フェリー",
  "operatorEn": "Meimon Taiyo Ferry",
  "name": "大阪南港–新門司",
  "nameEn": "Osaka Nanko Ferry Terminal – Shin-Moji",
  "url": "https://www.cityline.co.jp/route/",
  "ships": [
   {
    "name": "フェリーきょうと",
    "en": "Ferry Kyoto",
    "mmsi": 431017994
   },
   {
    "name": "フェリーふくおか",
    "en": "Ferry Fukuoka",
    "mmsi": 431018431
   },
   {
    "name": "フェリーおおさかII",
    "en": "Ferry Osaka II",
    "mmsi": 431006802
   },
   {
    "name": "フェリーきたきゅうしゅうII",
    "en": "Ferry Kitakyushu II",
    "mmsi": 431007095
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "大阪南港（南港フェリーターミナル）",
      null,
      "17:00"
     ],
     [
      "新門司港（名門大洋フェリーターミナル）",
      "05:30+1",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "大阪南港（南港フェリーターミナル）",
      null,
      "19:50"
     ],
     [
      "新門司港（名門大洋フェリーターミナル）",
      "08:30+1",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "新門司港（名門大洋フェリーターミナル）",
      null,
      "17:00"
     ],
     [
      "大阪南港（南港フェリーターミナル）",
      "05:30+1",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "新門司港（名門大洋フェリーターミナル）",
      null,
      "19:50"
     ],
     [
      "大阪南港（南港フェリーターミナル）",
      "08:30+1",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-1",
  "operator": "阪九フェリー",
  "operatorEn": "Hankyu Ferry",
  "name": "泉大津–新門司",
  "nameEn": "Izumiotsu – Shin-Moji Hankyu Terminal 2",
  "url": "https://han9f.co.jp/izumiotsu/timetable/",
  "ships": [
   {
    "name": "いずみ",
    "en": "Izumi",
    "mmsi": 431006014
   },
   {
    "name": "ひびき",
    "en": "Hibiki",
    "mmsi": 431006223
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "泉大津港",
      null,
      "17:30"
     ],
     [
      "新門司港（阪九第2ターミナル）",
      "06:00+1",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "新門司港（阪九第2ターミナル）",
      null,
      "17:30"
     ],
     [
      "泉大津港",
      "06:00+1",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-2",
  "operator": "阪九フェリー",
  "operatorEn": "Hankyu Ferry",
  "name": "神戸（六甲アイランド）–新門司",
  "nameEn": "Kobe Rokko Island – Shin-Moji Hankyu Terminal 1",
  "url": "https://han9f.co.jp/kobe/timetable/",
  "ships": [
   {
    "name": "せっつ",
    "en": "Settsu",
    "mmsi": 431014026
   },
   {
    "name": "やまと",
    "en": "Yamato",
    "mmsi": 431014855
   }
  ],
  "sailings": [
   {
    "days": "sun,mon,tue,wed,thu",
    "stops": [
     [
      "神戸港（六甲アイランド 阪九フェリー）",
      null,
      "18:30"
     ],
     [
      "新門司港（阪九第1ターミナル）",
      "07:00+1",
      null
     ]
    ]
   },
   {
    "days": "fri,sat",
    "stops": [
     [
      "神戸港（六甲アイランド 阪九フェリー）",
      null,
      "20:00"
     ],
     [
      "新門司港（阪九第1ターミナル）",
      "08:30+1",
      null
     ]
    ]
   },
   {
    "days": "sun,mon,tue,wed,thu",
    "stops": [
     [
      "新門司港（阪九第1ターミナル）",
      null,
      "18:40"
     ],
     [
      "神戸港（六甲アイランド 阪九フェリー）",
      "07:10+1",
      null
     ]
    ]
   },
   {
    "days": "fri,sat",
    "stops": [
     [
      "新門司港（阪九第1ターミナル）",
      null,
      "20:00"
     ],
     [
      "神戸港（六甲アイランド 阪九フェリー）",
      "08:30+1",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-3",
  "operator": "フェリーさんふらわあ",
  "operatorEn": "Ferry Sunflower",
  "name": "大阪–別府",
  "nameEn": "Osaka Nanko Sunflower Terminal – Beppu",
  "url": "https://www.ferry-sunflower.co.jp/route/osaka-beppu/time/",
  "ships": [
   {
    "name": "さんふらわあ くれない",
    "en": "Sunflower Kurenai",
    "mmsi": 431019888
   },
   {
    "name": "さんふらわあ むらさき",
    "en": "Sunflower Murasaki",
    "mmsi": 431020573
   }
  ],
  "sailings": [
   {
    "days": "sun,mon,tue,wed,thu",
    "stops": [
     [
      "大阪南港（さんふらわあターミナル）",
      null,
      "19:05"
     ],
     [
      "別府港（さんふらわあターミナル）",
      "06:55+1",
      null
     ]
    ]
   },
   {
    "days": "fri,sat",
    "stops": [
     [
      "大阪南港（さんふらわあターミナル）",
      null,
      "20:05"
     ],
     [
      "別府港（さんふらわあターミナル）",
      "07:55+1",
      null
     ]
    ]
   },
   {
    "days": "sun,mon,tue,wed,thu",
    "stops": [
     [
      "別府港（さんふらわあターミナル）",
      null,
      "18:45"
     ],
     [
      "大阪南港（さんふらわあターミナル）",
      "06:35+1",
      null
     ]
    ]
   },
   {
    "days": "fri,sat",
    "stops": [
     [
      "別府港（さんふらわあターミナル）",
      null,
      "19:20"
     ],
     [
      "大阪南港（さんふらわあターミナル）",
      "07:25+1",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-4",
  "operator": "フェリーさんふらわあ",
  "operatorEn": "Ferry Sunflower",
  "name": "大阪–志布志",
  "nameEn": "Osaka Nanko Sunflower Terminal – Shibushi",
  "url": "https://www.ferry-sunflower.co.jp/route/osaka-shibushi/time/",
  "ships": [
   {
    "name": "さんふらわあ さつま",
    "en": "Sunflower Satsuma",
    "mmsi": 431010811
   },
   {
    "name": "さんふらわあ きりしま",
    "en": "Sunflower Kirishima",
    "mmsi": 431011467
   }
  ],
  "sailings": [
   {
    "days": "mon,tue,wed,thu",
    "stops": [
     [
      "大阪南港（さんふらわあターミナル）",
      null,
      "17:55"
     ],
     [
      "志布志港",
      "08:55+1",
      null
     ]
    ]
   },
   {
    "days": "fri",
    "stops": [
     [
      "大阪南港（さんふらわあターミナル）",
      null,
      "17:55"
     ],
     [
      "志布志港",
      "07:50+1",
      null
     ]
    ]
   },
   {
    "days": "sat",
    "stops": [
     [
      "大阪南港（さんふらわあターミナル）",
      null,
      "18:30"
     ],
     [
      "志布志港",
      "08:50+1",
      null
     ]
    ]
   },
   {
    "days": "sun",
    "stops": [
     [
      "大阪南港（さんふらわあターミナル）",
      null,
      "17:00"
     ],
     [
      "志布志港",
      "08:55+1",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu",
    "stops": [
     [
      "志布志港",
      null,
      "17:55"
     ],
     [
      "大阪南港（さんふらわあターミナル）",
      "07:40+1",
      null
     ]
    ]
   },
   {
    "days": "sun",
    "stops": [
     [
      "志布志港",
      null,
      "17:00"
     ],
     [
      "大阪南港（さんふらわあターミナル）",
      "07:40+1",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-5",
  "operator": "フェリーさんふらわあ",
  "operatorEn": "Ferry Sunflower",
  "name": "神戸–大分",
  "nameEn": "Kobe Rokko Island – Oita Port",
  "url": "https://www.ferry-sunflower.co.jp/route/kobe-oita/time/",
  "ships": [
   {
    "name": "さんふらわあ ごーるど",
    "en": "Sunflower Gold",
    "mmsi": 431000331
   },
   {
    "name": "さんふらわあ ぱーる",
    "en": "Sunflower Pearl",
    "mmsi": 431000406
   }
  ],
  "sailings": [
   {
    "days": "sun,mon,tue,wed,thu",
    "stops": [
     [
      "神戸港（六甲アイランド さんふらわあ）",
      null,
      "19:00"
     ],
     [
      "大分港（さんふらわあ）",
      "06:20+1",
      null
     ]
    ]
   },
   {
    "days": "fri,sat",
    "stops": [
     [
      "神戸港（六甲アイランド さんふらわあ）",
      null,
      "19:50"
     ],
     [
      "大分港（さんふらわあ）",
      "07:20+1",
      null
     ]
    ]
   },
   {
    "days": "sun,mon,tue,wed,thu",
    "stops": [
     [
      "大分港（さんふらわあ）",
      null,
      "19:20"
     ],
     [
      "神戸港（六甲アイランド さんふらわあ）",
      "06:40+1",
      null
     ]
    ]
   },
   {
    "days": "fri,sat",
    "stops": [
     [
      "大分港（さんふらわあ）",
      null,
      "19:30"
     ],
     [
      "神戸港（六甲アイランド さんふらわあ）",
      "07:55+1",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-6",
  "operator": "オレンジフェリー",
  "operatorEn": "Orange Ferry",
  "name": "東予–大阪南港",
  "nameEn": "Toyo – Osaka Nanko Ferry Terminal",
  "url": "https://www.orange-ferry.co.jp/time-table/kansai/toyo-osaka/index.html",
  "ships": [
   {
    "name": "おれんじ えひめ",
    "en": "Orange Ehime",
    "mmsi": 431011673
   },
   {
    "name": "おれんじ おおさか",
    "en": "Orange Osaka",
    "mmsi": 431012251
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "東予港",
      null,
      "22:00"
     ],
     [
      "大阪南港（南港フェリーターミナル）",
      "06:00+1",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "大阪南港（南港フェリーターミナル）",
      null,
      "22:00"
     ],
     [
      "東予港",
      "06:00+1",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-7",
  "operator": "オレンジフェリー",
  "operatorEn": "Orange Ferry",
  "name": "新居浜–神戸（六甲）",
  "nameEn": "Niihama Higashi Port – Kobe Rokko",
  "url": "https://www.orange-ferry.co.jp/time-table/kansai/niihama-kobe/index.html",
  "ships": [
   {
    "name": "おれんじホープ",
    "en": "Orange Hope",
    "mmsi": 431501801
   }
  ],
  "sailings": [
   {
    "days": "mon,tue,wed,thu",
    "stops": [
     [
      "新居浜東港",
      null,
      "16:20"
     ],
     [
      "神戸六甲港（おれんじホープ）",
      "23:40",
      null
     ]
    ]
   },
   {
    "days": "tue,wed,thu,fri",
    "stops": [
     [
      "神戸六甲港（おれんじホープ）",
      null,
      "01:20"
     ],
     [
      "新居浜東港",
      "08:20",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-8",
  "operator": "九四オレンジフェリー",
  "operatorEn": "Kyushi Orange Ferry",
  "name": "八幡浜–臼杵",
  "nameEn": "Yawatahama – Usuki",
  "url": "https://www.orange-ferry.co.jp/time-table/kyuushi/yawatahama-usuki/index.html",
  "ships": [
   {
    "name": "おれんじ九州",
    "en": "Orange Kyushu",
    "mmsi": 431000221
   },
   {
    "name": "おれんじ四国",
    "en": "Orange Shikoku",
    "mmsi": 431000479
   }
  ],
  "sailings": [
   {
    "days": "tue,wed,thu,fri,sat",
    "stops": [
     [
      "八幡浜港",
      null,
      "01:15"
     ],
     [
      "臼杵港",
      "03:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "八幡浜港",
      null,
      "02:50"
     ],
     [
      "臼杵港",
      "05:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "八幡浜港",
      null,
      "08:30"
     ],
     [
      "臼杵港",
      "10:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "八幡浜港",
      null,
      "12:45"
     ],
     [
      "臼杵港",
      "15:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "八幡浜港",
      null,
      "14:30"
     ],
     [
      "臼杵港",
      "16:55",
      null
     ]
    ]
   },
   {
    "days": "sun,mon,tue,wed,thu,fri",
    "stops": [
     [
      "八幡浜港",
      null,
      "18:45"
     ],
     [
      "臼杵港",
      "21:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "八幡浜港",
      null,
      "21:00"
     ],
     [
      "臼杵港",
      "23:25",
      null
     ]
    ]
   },
   {
    "days": "tue,wed,thu,fri,sat",
    "stops": [
     [
      "臼杵港",
      null,
      "04:45"
     ],
     [
      "八幡浜港",
      "07:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "臼杵港",
      null,
      "07:40"
     ],
     [
      "八幡浜港",
      "10:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "臼杵港",
      null,
      "11:30"
     ],
     [
      "八幡浜港",
      "13:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "臼杵港",
      null,
      "15:50"
     ],
     [
      "八幡浜港",
      "18:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "臼杵港",
      null,
      "17:35"
     ],
     [
      "八幡浜港",
      "19:55",
      null
     ]
    ]
   },
   {
    "days": "sun,mon,tue,wed,thu,fri",
    "stops": [
     [
      "臼杵港",
      null,
      "22:20"
     ],
     [
      "八幡浜港",
      "00:40+1",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "臼杵港",
      null,
      "23:55"
     ],
     [
      "八幡浜港",
      "02:15+1",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-9",
  "operator": "宇和島運輸フェリー",
  "operatorEn": "Uwajima Unyu Ferry",
  "name": "八幡浜–別府",
  "nameEn": "Yawatahama – Beppu Kanko Port",
  "url": "https://www.uwajimaunyu.co.jp/timetable/",
  "ships": [
   {
    "name": "れいめい丸",
    "en": "Reimei Maru",
    "mmsi": 431019177
   },
   {
    "name": "あけぼの丸",
    "en": "Akebono Maru",
    "mmsi": 431010539
   },
   {
    "name": "あかつき丸",
    "en": "Akatsuki Maru",
    "mmsi": 431005421
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "八幡浜港",
      null,
      "00:20"
     ],
     [
      "別府観光港（宇和島運輸）",
      "03:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "八幡浜港",
      null,
      "06:20"
     ],
     [
      "別府観光港（宇和島運輸）",
      "09:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "八幡浜港",
      null,
      "10:15"
     ],
     [
      "別府観光港（宇和島運輸）",
      "13:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "八幡浜港",
      null,
      "13:00"
     ],
     [
      "別府観光港（宇和島運輸）",
      "15:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "八幡浜港",
      null,
      "17:25"
     ],
     [
      "別府観光港（宇和島運輸）",
      "20:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "八幡浜港",
      null,
      "20:30"
     ],
     [
      "別府観光港（宇和島運輸）",
      "23:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "別府観光港（宇和島運輸）",
      null,
      "06:25"
     ],
     [
      "八幡浜港",
      "09:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "別府観光港（宇和島運輸）",
      null,
      "09:45"
     ],
     [
      "八幡浜港",
      "12:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "別府観光港（宇和島運輸）",
      null,
      "14:00"
     ],
     [
      "八幡浜港",
      "16:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "別府観光港（宇和島運輸）",
      null,
      "16:45"
     ],
     [
      "八幡浜港",
      "19:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "別府観光港（宇和島運輸）",
      null,
      "20:50"
     ],
     [
      "八幡浜港",
      "23:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "別府観光港（宇和島運輸）",
      null,
      "23:50"
     ],
     [
      "八幡浜港",
      "02:35+1",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-10",
  "operator": "宇和島運輸フェリー",
  "operatorEn": "Uwajima Unyu Ferry",
  "name": "八幡浜–臼杵",
  "nameEn": "Yawatahama – Usuki",
  "url": "https://www.uwajimaunyu.co.jp/timetable/",
  "ships": [
   {
    "name": "れいめい丸",
    "en": "Reimei Maru",
    "mmsi": 431019177
   },
   {
    "name": "あけぼの丸",
    "en": "Akebono Maru",
    "mmsi": 431010539
   },
   {
    "name": "あかつき丸",
    "en": "Akatsuki Maru",
    "mmsi": 431005421
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "八幡浜港",
      null,
      "05:50"
     ],
     [
      "臼杵港",
      "08:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "八幡浜港",
      null,
      "09:40"
     ],
     [
      "臼杵港",
      "12:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "八幡浜港",
      null,
      "11:45"
     ],
     [
      "臼杵港",
      "14:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "八幡浜港",
      null,
      "15:35"
     ],
     [
      "臼杵港",
      "18:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "八幡浜港",
      null,
      "17:40"
     ],
     [
      "臼杵港",
      "20:05",
      null
     ]
    ]
   },
   {
    "days": "sun,mon,tue,wed,thu,fri",
    "stops": [
     [
      "八幡浜港",
      null,
      "22:00"
     ],
     [
      "臼杵港",
      "00:25+1",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "八幡浜港",
      null,
      "23:50"
     ],
     [
      "臼杵港",
      "02:15+1",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "臼杵港",
      null,
      "00:55"
     ],
     [
      "八幡浜港",
      "03:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "臼杵港",
      null,
      "02:40"
     ],
     [
      "八幡浜港",
      "05:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "臼杵港",
      null,
      "08:50"
     ],
     [
      "八幡浜港",
      "11:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "臼杵港",
      null,
      "12:40"
     ],
     [
      "八幡浜港",
      "15:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "臼杵港",
      null,
      "14:40"
     ],
     [
      "八幡浜港",
      "17:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "臼杵港",
      null,
      "18:30"
     ],
     [
      "八幡浜港",
      "20:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "臼杵港",
      null,
      "20:40"
     ],
     [
      "八幡浜港",
      "23:00",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-11",
  "operator": "国道九四フェリー",
  "operatorEn": "Kokudo Kyushi Ferry",
  "name": "三崎–佐賀関",
  "nameEn": "Misaki – Saganoseki",
  "url": "https://www.koku94.jp/operation/",
  "ships": [
   {
    "name": "涼かぜ",
    "en": "Suzukaze",
    "mmsi": null
   },
   {
    "name": "遊なぎ",
    "en": "Yunagi",
    "mmsi": null
   },
   {
    "name": "速なみ",
    "en": "Hayanami",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "佐賀関港",
      null,
      "07:00"
     ],
     [
      "三崎港",
      "08:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "佐賀関港",
      null,
      "08:00"
     ],
     [
      "三崎港",
      "09:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "佐賀関港",
      null,
      "09:00"
     ],
     [
      "三崎港",
      "10:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "佐賀関港",
      null,
      "10:00"
     ],
     [
      "三崎港",
      "11:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "佐賀関港",
      null,
      "11:00"
     ],
     [
      "三崎港",
      "12:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "佐賀関港",
      null,
      "13:00"
     ],
     [
      "三崎港",
      "14:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "佐賀関港",
      null,
      "14:00"
     ],
     [
      "三崎港",
      "15:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "佐賀関港",
      null,
      "15:00"
     ],
     [
      "三崎港",
      "16:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "佐賀関港",
      null,
      "16:00"
     ],
     [
      "三崎港",
      "17:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "佐賀関港",
      null,
      "17:00"
     ],
     [
      "三崎港",
      "18:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "佐賀関港",
      null,
      "18:00"
     ],
     [
      "三崎港",
      "19:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "佐賀関港",
      null,
      "19:00"
     ],
     [
      "三崎港",
      "20:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "佐賀関港",
      null,
      "20:00"
     ],
     [
      "三崎港",
      "21:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "佐賀関港",
      null,
      "21:00"
     ],
     [
      "三崎港",
      "22:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "佐賀関港",
      null,
      "22:00"
     ],
     [
      "三崎港",
      "23:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "佐賀関港",
      null,
      "23:00"
     ],
     [
      "三崎港",
      "00:10+1",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "三崎港",
      null,
      "07:30"
     ],
     [
      "佐賀関港",
      "08:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "三崎港",
      null,
      "08:30"
     ],
     [
      "佐賀関港",
      "09:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "三崎港",
      null,
      "09:30"
     ],
     [
      "佐賀関港",
      "10:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "三崎港",
      null,
      "10:30"
     ],
     [
      "佐賀関港",
      "11:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "三崎港",
      null,
      "11:30"
     ],
     [
      "佐賀関港",
      "12:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "三崎港",
      null,
      "12:30"
     ],
     [
      "佐賀関港",
      "13:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "三崎港",
      null,
      "14:30"
     ],
     [
      "佐賀関港",
      "15:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "三崎港",
      null,
      "15:30"
     ],
     [
      "佐賀関港",
      "16:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "三崎港",
      null,
      "16:30"
     ],
     [
      "佐賀関港",
      "17:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "三崎港",
      null,
      "17:30"
     ],
     [
      "佐賀関港",
      "18:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "三崎港",
      null,
      "18:30"
     ],
     [
      "佐賀関港",
      "19:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "三崎港",
      null,
      "19:30"
     ],
     [
      "佐賀関港",
      "20:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "三崎港",
      null,
      "20:30"
     ],
     [
      "佐賀関港",
      "21:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "三崎港",
      null,
      "21:30"
     ],
     [
      "佐賀関港",
      "22:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "三崎港",
      null,
      "22:30"
     ],
     [
      "佐賀関港",
      "23:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "三崎港",
      null,
      "23:30"
     ],
     [
      "佐賀関港",
      "00:40+1",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-12",
  "operator": "石崎汽船・瀬戸内海汽船",
  "operatorEn": "Ishizaki Kisen / Setonaikai Kisen",
  "name": "広島–呉–松山 フェリー",
  "nameEn": "Hiroshima Port (Ujina) – Kure – Matsuyama Kanko Port",
  "url": "https://www.ishizakikisen.co.jp/contents/timetable.shtml",
  "ships": [
   {
    "name": "シーパセオ",
    "en": "Sea Paseo",
    "mmsi": 431013557
   },
   {
    "name": "シーパセオ2",
    "en": "Sea Paseo 2",
    "mmsi": 431015341
   },
   {
    "name": "翔洋丸",
    "en": "Shoyo Maru",
    "mmsi": null
   },
   {
    "name": "旭洋丸",
    "en": "Kyokuyo Maru",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "松山観光港",
      null,
      "06:20"
     ],
     [
      "呉港（呉中央桟橋）",
      "08:17",
      "08:17"
     ],
     [
      "広島港（宇品）",
      "09:02",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "松山観光港",
      null,
      "08:25"
     ],
     [
      "呉港（呉中央桟橋）",
      "10:22",
      "10:22"
     ],
     [
      "広島港（宇品）",
      "11:07",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "松山観光港",
      null,
      "09:40"
     ],
     [
      "呉港（呉中央桟橋）",
      "11:37",
      "11:37"
     ],
     [
      "広島港（宇品）",
      "12:22",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "松山観光港",
      null,
      "11:00"
     ],
     [
      "広島港（宇品）",
      "13:27",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "松山観光港",
      null,
      "12:10"
     ],
     [
      "呉港（呉中央桟橋）",
      "14:07",
      "14:07"
     ],
     [
      "広島港（宇品）",
      "14:52",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "松山観光港",
      null,
      "14:15"
     ],
     [
      "呉港（呉中央桟橋）",
      "16:12",
      "16:12"
     ],
     [
      "広島港（宇品）",
      "16:57",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "松山観光港",
      null,
      "15:30"
     ],
     [
      "呉港（呉中央桟橋）",
      "17:27",
      "17:27"
     ],
     [
      "広島港（宇品）",
      "18:12",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "松山観光港",
      null,
      "16:35"
     ],
     [
      "呉港（呉中央桟橋）",
      "18:32",
      "18:32"
     ],
     [
      "広島港（宇品）",
      "19:17",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "松山観光港",
      null,
      "18:00"
     ],
     [
      "呉港（呉中央桟橋）",
      "19:57",
      "19:57"
     ],
     [
      "広島港（宇品）",
      "20:42",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "松山観光港",
      null,
      "20:10"
     ],
     [
      "呉港（呉中央桟橋）",
      "22:07",
      "22:07"
     ],
     [
      "広島港（宇品）",
      "22:52",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "広島港（宇品）",
      null,
      "05:45"
     ],
     [
      "松山観光港",
      "08:12",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "広島港（宇品）",
      null,
      "06:45"
     ],
     [
      "呉港（呉中央桟橋）",
      "07:30",
      "07:30"
     ],
     [
      "松山観光港",
      "09:27",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "広島港（宇品）",
      null,
      "08:05"
     ],
     [
      "呉港（呉中央桟橋）",
      "08:50",
      "08:50"
     ],
     [
      "松山観光港",
      "10:47",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "広島港（宇品）",
      null,
      "09:15"
     ],
     [
      "呉港（呉中央桟橋）",
      "10:00",
      "10:00"
     ],
     [
      "松山観光港",
      "11:57",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "広島港（宇品）",
      null,
      "11:20"
     ],
     [
      "呉港（呉中央桟橋）",
      "12:05",
      "12:05"
     ],
     [
      "松山観光港",
      "14:02",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "広島港（宇品）",
      null,
      "12:35"
     ],
     [
      "呉港（呉中央桟橋）",
      "13:20",
      "13:20"
     ],
     [
      "松山観光港",
      "15:17",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "広島港（宇品）",
      null,
      "13:40"
     ],
     [
      "呉港（呉中央桟橋）",
      "14:25",
      "14:25"
     ],
     [
      "松山観光港",
      "16:22",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "広島港（宇品）",
      null,
      "15:05"
     ],
     [
      "呉港（呉中央桟橋）",
      "15:50",
      "15:50"
     ],
     [
      "松山観光港",
      "17:47",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "広島港（宇品）",
      null,
      "17:15"
     ],
     [
      "呉港（呉中央桟橋）",
      "18:00",
      "18:00"
     ],
     [
      "松山観光港",
      "19:57",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "広島港（宇品）",
      null,
      "19:30"
     ],
     [
      "呉港（呉中央桟橋）",
      "20:15",
      "20:15"
     ],
     [
      "松山観光港",
      "22:12",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-13",
  "operator": "石崎汽船・瀬戸内海汽船",
  "operatorEn": "Ishizaki Kisen / Setonaikai Kisen",
  "name": "広島–(呉)–松山 高速船（リニアジェット／旧スーパージェット）",
  "nameEn": "Hiroshima Port (Ujina) – Kure – Matsuyama Kanko Port",
  "url": "https://setonaikaikisen.co.jp/kouro/jet/",
  "ships": [
   {
    "name": "SeaMAX（シーマックス）",
    "en": "SeaMAX",
    "mmsi": null
   },
   {
    "name": "AIVINT（アイビント）",
    "en": "AIVINT",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "広島港（宇品）",
      null,
      "07:30"
     ],
     [
      "松山観光港",
      "08:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "広島港（宇品）",
      null,
      "09:05"
     ],
     [
      "呉港（呉中央桟橋）",
      "09:30",
      "09:30"
     ],
     [
      "松山観光港",
      "10:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "広島港（宇品）",
      null,
      "10:50"
     ],
     [
      "松山観光港",
      "12:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "広島港（宇品）",
      null,
      "12:25"
     ],
     [
      "呉港（呉中央桟橋）",
      "12:50",
      "12:50"
     ],
     [
      "松山観光港",
      "13:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "広島港（宇品）",
      null,
      "15:15"
     ],
     [
      "松山観光港",
      "16:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "広島港（宇品）",
      null,
      "16:45"
     ],
     [
      "呉港（呉中央桟橋）",
      "17:10",
      "17:10"
     ],
     [
      "松山観光港",
      "18:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "広島港（宇品）",
      null,
      "18:30"
     ],
     [
      "松山観光港",
      "19:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "広島港（宇品）",
      null,
      "20:00"
     ],
     [
      "松山観光港",
      "21:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "松山観光港",
      null,
      "07:30"
     ],
     [
      "広島港（宇品）",
      "08:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "松山観光港",
      null,
      "09:05"
     ],
     [
      "呉港（呉中央桟橋）",
      "10:10",
      "10:10"
     ],
     [
      "広島港（宇品）",
      "10:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "松山観光港",
      null,
      "10:50"
     ],
     [
      "広島港（宇品）",
      "12:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "松山観光港",
      null,
      "12:25"
     ],
     [
      "呉港（呉中央桟橋）",
      "13:30",
      "13:30"
     ],
     [
      "広島港（宇品）",
      "13:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "松山観光港",
      null,
      "15:15"
     ],
     [
      "広島港（宇品）",
      "16:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "松山観光港",
      null,
      "16:45"
     ],
     [
      "呉港（呉中央桟橋）",
      "17:50",
      "17:50"
     ],
     [
      "広島港（宇品）",
      "18:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "松山観光港",
      null,
      "18:30"
     ],
     [
      "広島港（宇品）",
      "19:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "松山観光港",
      null,
      "20:00"
     ],
     [
      "広島港（宇品）",
      "21:20",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-14",
  "operator": "防予フェリー",
  "operatorEn": "Boyo Ferry",
  "name": "柳井–松山（三津浜）",
  "nameEn": "Yanai – Mitsuhama (Matsuyama)",
  "url": "https://www.boyoferry.co.jp/c_timetable.html",
  "ships": [
   {
    "name": "おれんじぐれいす",
    "en": "Orange Grace",
    "mmsi": 431000523
   },
   {
    "name": "おれんじじゅぴたー",
    "en": "Orange Jupiter",
    "mmsi": 431000501
   }
  ],
  "sailings": [
   {
    "days": "tue,wed,thu,fri,sat",
    "stops": [
     [
      "柳井港",
      null,
      "01:00"
     ],
     [
      "三津浜港",
      "03:25",
      null
     ]
    ]
   },
   {
    "days": "tue,wed,thu,fri,sat",
    "stops": [
     [
      "柳井港",
      null,
      "02:00"
     ],
     [
      "三津浜港",
      "04:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "柳井港",
      null,
      "09:00"
     ],
     [
      "三津浜港",
      "11:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "柳井港",
      null,
      "10:50"
     ],
     [
      "三津浜港",
      "13:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "柳井港",
      null,
      "14:45"
     ],
     [
      "三津浜港",
      "17:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "柳井港",
      null,
      "16:15"
     ],
     [
      "三津浜港",
      "18:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "柳井港",
      null,
      "20:25"
     ],
     [
      "三津浜港",
      "23:00",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "柳井港",
      null,
      "22:10"
     ],
     [
      "三津浜港",
      "00:45+1",
      null
     ]
    ]
   },
   {
    "days": "tue,wed,thu,fri,sat",
    "stops": [
     [
      "三津浜港",
      null,
      "03:35"
     ],
     [
      "柳井港",
      "06:00",
      null
     ]
    ]
   },
   {
    "days": "tue,wed,thu,fri,sat",
    "stops": [
     [
      "三津浜港",
      null,
      "04:50"
     ],
     [
      "柳井港",
      "07:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "三津浜港",
      null,
      "07:30"
     ],
     [
      "柳井港",
      "10:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "三津浜港",
      null,
      "11:50"
     ],
     [
      "柳井港",
      "14:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "三津浜港",
      null,
      "13:35"
     ],
     [
      "柳井港",
      "16:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "三津浜港",
      null,
      "17:35"
     ],
     [
      "柳井港",
      "20:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "三津浜港",
      null,
      "19:20"
     ],
     [
      "柳井港",
      "21:55",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "三津浜港",
      null,
      "23:10"
     ],
     [
      "柳井港",
      "01:45+1",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-15",
  "operator": "周防大島松山フェリー",
  "operatorEn": "Suo-Oshima Matsuyama Ferry",
  "name": "柳井–伊保田–松山（三津浜）",
  "nameEn": "Yanai – Ihota (Suo-Oshima) – Mitsuhama (Matsuyama)",
  "url": "https://www.boyoferry.co.jp/c_timetable.html",
  "ships": [
   {
    "name": "しらきさん",
    "en": "Shirakisan",
    "mmsi": 431401978
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "柳井港",
      null,
      "07:00"
     ],
     [
      "伊保田港",
      "08:10",
      "08:15"
     ],
     [
      "三津浜港",
      "09:30",
      null
     ]
    ],
    "ship": "しらきさん"
   },
   {
    "days": "daily",
    "stops": [
     [
      "柳井港",
      null,
      "12:25"
     ],
     [
      "伊保田港",
      "13:40",
      "13:45"
     ],
     [
      "三津浜港",
      "14:55",
      null
     ]
    ],
    "ship": "しらきさん"
   },
   {
    "days": "daily",
    "stops": [
     [
      "柳井港",
      null,
      "17:50"
     ],
     [
      "伊保田港",
      "19:05",
      "19:10"
     ],
     [
      "三津浜港",
      "20:20",
      null
     ]
    ],
    "ship": "しらきさん"
   },
   {
    "days": "daily",
    "stops": [
     [
      "三津浜港",
      null,
      "09:40"
     ],
     [
      "伊保田港",
      "10:47",
      "10:52"
     ],
     [
      "柳井港",
      "12:15",
      null
     ]
    ],
    "ship": "しらきさん"
   },
   {
    "days": "daily",
    "stops": [
     [
      "三津浜港",
      null,
      "15:05"
     ],
     [
      "伊保田港",
      "16:12",
      "16:17"
     ],
     [
      "柳井港",
      "17:40",
      null
     ]
    ],
    "ship": "しらきさん"
   },
   {
    "days": "daily",
    "stops": [
     [
      "三津浜港",
      null,
      "20:30"
     ],
     [
      "伊保田港",
      "21:37",
      "21:42"
     ],
     [
      "柳井港",
      "23:05",
      null
     ]
    ],
    "ship": "しらきさん"
   }
  ]
 },
 {
  "id": "inland-16",
  "operator": "ジャンボフェリー",
  "operatorEn": "Jumbo Ferry",
  "name": "神戸–（小豆島坂手）–高松",
  "nameEn": "Kobe Sannomiya Ferry Terminal – Sakate (Shodoshima) – Takamatsu Higashi Port",
  "url": "https://ferry.co.jp/home/kobe-takamatsu/",
  "ships": [
   {
    "name": "あおい",
    "en": "Aoi",
    "mmsi": 431019761
   },
   {
    "name": "りつりん2",
    "en": "Ritsurin 2",
    "mmsi": 431000458
   }
  ],
  "sailings": [
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "神戸三宮フェリーターミナル",
      null,
      "01:00"
     ],
     [
      "高松東港",
      "05:15",
      null
     ]
    ],
    "ship": "りつりん2"
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "神戸三宮フェリーターミナル",
      null,
      "08:15"
     ],
     [
      "坂手港（小豆島）",
      "11:35",
      "11:35"
     ],
     [
      "高松東港",
      "13:00",
      null
     ]
    ],
    "ship": "あおい"
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "神戸三宮フェリーターミナル",
      null,
      "13:00"
     ],
     [
      "坂手港（小豆島）",
      "16:20",
      "16:20"
     ],
     [
      "高松東港",
      "17:45",
      null
     ]
    ],
    "ship": "りつりん2"
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "神戸三宮フェリーターミナル",
      null,
      "19:45"
     ],
     [
      "高松東港",
      "00:00+1",
      null
     ]
    ],
    "ship": "あおい"
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "高松東港",
      null,
      "01:00"
     ],
     [
      "神戸三宮フェリーターミナル",
      "05:15",
      null
     ]
    ],
    "ship": "あおい"
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "高松東港",
      null,
      "06:15"
     ],
     [
      "坂手港（小豆島）",
      "07:30",
      "07:30"
     ],
     [
      "神戸三宮フェリーターミナル",
      "11:00",
      null
     ]
    ],
    "ship": "りつりん2"
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "高松東港",
      null,
      "14:00"
     ],
     [
      "坂手港（小豆島）",
      "15:15",
      "15:15"
     ],
     [
      "神戸三宮フェリーターミナル",
      "18:45",
      null
     ]
    ],
    "ship": "あおい"
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "高松東港",
      null,
      "19:15"
     ],
     [
      "坂手港（小豆島）",
      "20:30",
      "20:30"
     ],
     [
      "神戸三宮フェリーターミナル",
      "00:00+1",
      null
     ]
    ],
    "ship": "りつりん2"
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "神戸三宮フェリーターミナル",
      null,
      "01:00"
     ],
     [
      "高松東港",
      "05:15",
      null
     ]
    ],
    "ship": "りつりん2"
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "神戸三宮フェリーターミナル",
      null,
      "08:15"
     ],
     [
      "坂手港（小豆島）",
      "11:35",
      "11:35"
     ],
     [
      "高松東港",
      "13:00",
      null
     ]
    ],
    "ship": "あおい"
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "神戸三宮フェリーターミナル",
      null,
      "11:20"
     ],
     [
      "坂手港（小豆島）",
      "14:40",
      "14:40"
     ],
     [
      "高松東港",
      "16:05",
      null
     ]
    ],
    "ship": "りつりん2"
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "神戸三宮フェリーターミナル",
      null,
      "19:20"
     ],
     [
      "坂手港（小豆島）",
      "22:40",
      "22:40"
     ],
     [
      "高松東港",
      "00:05+1",
      null
     ]
    ],
    "ship": "あおい"
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "高松東港",
      null,
      "01:00"
     ],
     [
      "神戸三宮フェリーターミナル",
      "05:15",
      null
     ]
    ],
    "ship": "あおい"
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "高松東港",
      null,
      "06:00"
     ],
     [
      "坂手港（小豆島）",
      "07:15",
      "07:15"
     ],
     [
      "神戸三宮フェリーターミナル",
      "10:40",
      null
     ]
    ],
    "ship": "りつりん2"
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "高松東港",
      null,
      "14:00"
     ],
     [
      "坂手港（小豆島）",
      "15:15",
      "15:15"
     ],
     [
      "神戸三宮フェリーターミナル",
      "18:40",
      null
     ]
    ],
    "ship": "あおい"
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "高松東港",
      null,
      "16:30"
     ],
     [
      "坂手港（小豆島）",
      "17:45",
      "17:45"
     ],
     [
      "神戸三宮フェリーターミナル",
      "21:00",
      null
     ]
    ],
    "ship": "りつりん2"
   }
  ]
 },
 {
  "id": "inland-17",
  "operator": "小豆島フェリー",
  "operatorEn": "Shodoshima Ferry",
  "name": "姫路–福田（小豆島）",
  "nameEn": "Himeji – Fukuda (Shodoshima)",
  "url": "https://www.shikokuferry.com/route1/",
  "ships": [
   {
    "name": "しょうどしま丸",
    "en": "Shodoshima Maru",
    "mmsi": null
   },
   {
    "name": "第一しょうどしま丸",
    "en": "Shodoshima Maru No.1",
    "mmsi": null
   },
   {
    "name": "第二しょうどしま丸",
    "en": "Shodoshima Maru No.2",
    "mmsi": null
   },
   {
    "name": "第三しょうどしま丸",
    "en": "Shodoshima Maru No.3",
    "mmsi": null
   },
   {
    "name": "第三おりいぶ丸",
    "en": "Olive Maru No.3",
    "mmsi": null
   },
   {
    "name": "第五おりいぶ丸",
    "en": "Olive Maru No.5",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "姫路港",
      null,
      "07:15"
     ],
     [
      "福田港（小豆島）",
      "08:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "姫路港",
      null,
      "09:45"
     ],
     [
      "福田港（小豆島）",
      "11:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "姫路港",
      null,
      "11:15"
     ],
     [
      "福田港（小豆島）",
      "12:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "姫路港",
      null,
      "13:35"
     ],
     [
      "福田港（小豆島）",
      "15:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "姫路港",
      null,
      "15:10"
     ],
     [
      "福田港（小豆島）",
      "16:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "姫路港",
      null,
      "17:25"
     ],
     [
      "福田港（小豆島）",
      "19:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "姫路港",
      null,
      "19:30"
     ],
     [
      "福田港（小豆島）",
      "21:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "福田港（小豆島）",
      null,
      "07:50"
     ],
     [
      "姫路港",
      "09:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "福田港（小豆島）",
      null,
      "09:20"
     ],
     [
      "姫路港",
      "11:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "福田港（小豆島）",
      null,
      "11:40"
     ],
     [
      "姫路港",
      "13:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "福田港（小豆島）",
      null,
      "13:15"
     ],
     [
      "姫路港",
      "14:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "福田港（小豆島）",
      null,
      "15:30"
     ],
     [
      "姫路港",
      "17:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "福田港（小豆島）",
      null,
      "17:15"
     ],
     [
      "姫路港",
      "18:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "福田港（小豆島）",
      null,
      "19:30"
     ],
     [
      "姫路港",
      "21:10",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-18",
  "operator": "小豆島フェリー",
  "operatorEn": "Shodoshima Ferry",
  "name": "高松–土庄 フェリー",
  "nameEn": "Takamatsu Port (Sunport) – Tonosho",
  "url": "https://www.shikokuferry.com/route2/",
  "ships": [
   {
    "name": "しょうどしま丸",
    "en": "Shodoshima Maru",
    "mmsi": null
   },
   {
    "name": "第一しょうどしま丸",
    "en": "Shodoshima Maru No.1",
    "mmsi": null
   },
   {
    "name": "第二しょうどしま丸",
    "en": "Shodoshima Maru No.2",
    "mmsi": null
   },
   {
    "name": "第三しょうどしま丸",
    "en": "Shodoshima Maru No.3",
    "mmsi": null
   },
   {
    "name": "第三おりいぶ丸",
    "en": "Olive Maru No.3",
    "mmsi": null
   },
   {
    "name": "第五おりいぶ丸",
    "en": "Olive Maru No.5",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "06:25"
     ],
     [
      "土庄港",
      "07:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "07:20"
     ],
     [
      "土庄港",
      "08:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "08:02"
     ],
     [
      "土庄港",
      "09:02",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "09:00"
     ],
     [
      "土庄港",
      "10:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "10:00"
     ],
     [
      "土庄港",
      "11:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "10:40"
     ],
     [
      "土庄港",
      "11:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "11:35"
     ],
     [
      "土庄港",
      "12:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "12:45"
     ],
     [
      "土庄港",
      "13:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "13:40"
     ],
     [
      "土庄港",
      "14:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "15:10"
     ],
     [
      "土庄港",
      "16:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "16:10"
     ],
     [
      "土庄港",
      "17:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "17:20"
     ],
     [
      "土庄港",
      "18:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "17:50"
     ],
     [
      "土庄港",
      "18:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "18:50"
     ],
     [
      "土庄港",
      "19:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "20:20"
     ],
     [
      "土庄港",
      "21:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "06:36"
     ],
     [
      "高松港（サンポート）",
      "07:36",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "07:35"
     ],
     [
      "高松港（サンポート）",
      "08:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "08:35"
     ],
     [
      "高松港（サンポート）",
      "09:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "09:25"
     ],
     [
      "高松港（サンポート）",
      "10:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "10:20"
     ],
     [
      "高松港（サンポート）",
      "11:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "11:25"
     ],
     [
      "高松港（サンポート）",
      "12:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "12:20"
     ],
     [
      "高松港（サンポート）",
      "13:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "13:55"
     ],
     [
      "高松港（サンポート）",
      "14:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "14:45"
     ],
     [
      "高松港（サンポート）",
      "15:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "15:45"
     ],
     [
      "高松港（サンポート）",
      "16:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "16:30"
     ],
     [
      "高松港（サンポート）",
      "17:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "17:30"
     ],
     [
      "高松港（サンポート）",
      "18:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "18:40"
     ],
     [
      "高松港（サンポート）",
      "19:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "19:30"
     ],
     [
      "高松港（サンポート）",
      "20:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "20:10"
     ],
     [
      "高松港（サンポート）",
      "21:10",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-19",
  "operator": "小豆島フェリー",
  "operatorEn": "Shodoshima Ferry",
  "name": "高松–土庄 高速艇",
  "nameEn": "Takamatsu Port (Sunport) – Tonosho",
  "url": "https://www.shikokuferry.com/route4/",
  "ships": [
   {
    "name": "スーパーマリン",
    "en": "Super Marine",
    "mmsi": null
   },
   {
    "name": "オリーブマリン",
    "en": "Olive Marine",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "07:40"
     ],
     [
      "土庄港",
      "08:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "09:10"
     ],
     [
      "土庄港",
      "09:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "10:40"
     ],
     [
      "土庄港",
      "11:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "13:00"
     ],
     [
      "土庄港",
      "13:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "14:20"
     ],
     [
      "土庄港",
      "14:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "15:50"
     ],
     [
      "土庄港",
      "16:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "17:10"
     ],
     [
      "土庄港",
      "17:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "18:30"
     ],
     [
      "土庄港",
      "19:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "07:00"
     ],
     [
      "高松港（サンポート）",
      "07:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "08:20"
     ],
     [
      "高松港（サンポート）",
      "08:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "10:00"
     ],
     [
      "高松港（サンポート）",
      "10:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "11:20"
     ],
     [
      "高松港（サンポート）",
      "11:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "13:40"
     ],
     [
      "高松港（サンポート）",
      "14:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "15:10"
     ],
     [
      "高松港（サンポート）",
      "15:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "16:30"
     ],
     [
      "高松港（サンポート）",
      "17:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "17:50"
     ],
     [
      "高松港（サンポート）",
      "18:25",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-20",
  "operator": "国際両備フェリー・小豆島フェリー",
  "operatorEn": "Kokusai Ryobi Ferry / Shodoshima Ferry",
  "name": "新岡山–土庄",
  "nameEn": "Shin-Okayama – Tonosho",
  "url": "https://ryobi-shodoshima.jp/timetable/timetable_okayama/",
  "ships": [
   {
    "name": "おりんぴあどりーむせと",
    "en": "Olympia Dream Seto",
    "mmsi": null
   },
   {
    "name": "おりんぴあどりーむ",
    "en": "Olympia Dream",
    "mmsi": null
   },
   {
    "name": "第二しょうどしま丸",
    "en": "Shodoshima Maru No.2",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "新岡山港",
      null,
      "06:20"
     ],
     [
      "土庄港",
      "07:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "新岡山港",
      null,
      "08:40"
     ],
     [
      "土庄港",
      "09:50",
      null
     ]
    ],
    "ship": "おりんぴあどりーむせと"
   },
   {
    "days": "daily",
    "stops": [
     [
      "新岡山港",
      null,
      "10:10"
     ],
     [
      "土庄港",
      "11:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "新岡山港",
      null,
      "11:40"
     ],
     [
      "土庄港",
      "12:50",
      null
     ]
    ],
    "ship": "おりんぴあどりーむせと"
   },
   {
    "days": "daily",
    "stops": [
     [
      "新岡山港",
      null,
      "14:00"
     ],
     [
      "土庄港",
      "15:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "新岡山港",
      null,
      "15:40"
     ],
     [
      "土庄港",
      "16:50",
      null
     ]
    ],
    "ship": "おりんぴあどりーむせと"
   },
   {
    "days": "daily",
    "stops": [
     [
      "新岡山港",
      null,
      "17:00"
     ],
     [
      "土庄港",
      "18:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "新岡山港",
      null,
      "18:30"
     ],
     [
      "土庄港",
      "19:40",
      null
     ]
    ],
    "ship": "おりんぴあどりーむせと"
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "07:00"
     ],
     [
      "新岡山港",
      "08:10",
      null
     ]
    ],
    "ship": "おりんぴあどりーむせと"
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "08:40"
     ],
     [
      "新岡山港",
      "09:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "10:10"
     ],
     [
      "新岡山港",
      "11:20",
      null
     ]
    ],
    "ship": "おりんぴあどりーむせと"
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "11:40"
     ],
     [
      "新岡山港",
      "12:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "14:00"
     ],
     [
      "新岡山港",
      "15:10",
      null
     ]
    ],
    "ship": "おりんぴあどりーむせと"
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "15:40"
     ],
     [
      "新岡山港",
      "16:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "17:00"
     ],
     [
      "新岡山港",
      "18:10",
      null
     ]
    ],
    "ship": "おりんぴあどりーむせと"
   },
   {
    "days": "daily",
    "stops": [
     [
      "土庄港",
      null,
      "18:30"
     ],
     [
      "新岡山港",
      "19:40",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-21",
  "operator": "国際両備フェリー",
  "operatorEn": "Kokusai Ryobi Ferry",
  "name": "高松–池田（小豆島）",
  "nameEn": "Takamatsu Port (Sunport) – Ikeda (Shodoshima)",
  "url": "https://ryobi-shodoshima.jp/timetable/timetable_takamatsu/",
  "ships": [
   {
    "name": "しまぞう",
    "en": "Shimazo",
    "mmsi": null
   },
   {
    "name": "ぱんだ",
    "en": "Panda",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "06:50"
     ],
     [
      "池田港（小豆島）",
      "07:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "08:32"
     ],
     [
      "池田港（小豆島）",
      "09:32",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "09:30"
     ],
     [
      "池田港（小豆島）",
      "10:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "11:10"
     ],
     [
      "池田港（小豆島）",
      "12:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "12:10"
     ],
     [
      "池田港（小豆島）",
      "13:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "14:10"
     ],
     [
      "池田港（小豆島）",
      "15:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "14:48"
     ],
     [
      "池田港（小豆島）",
      "15:48",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "16:47"
     ],
     [
      "池田港（小豆島）",
      "17:47",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "17:40"
     ],
     [
      "池田港（小豆島）",
      "18:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "19:30"
     ],
     [
      "池田港（小豆島）",
      "20:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "20:30"
     ],
     [
      "池田港（小豆島）",
      "21:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "池田港（小豆島）",
      null,
      "05:30"
     ],
     [
      "高松港（サンポート）",
      "06:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "池田港（小豆島）",
      null,
      "07:10"
     ],
     [
      "高松港（サンポート）",
      "08:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "池田港（小豆島）",
      null,
      "08:10"
     ],
     [
      "高松港（サンポート）",
      "09:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "池田港（小豆島）",
      null,
      "09:50"
     ],
     [
      "高松港（サンポート）",
      "10:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "池田港（小豆島）",
      null,
      "11:00"
     ],
     [
      "高松港（サンポート）",
      "12:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "池田港（小豆島）",
      null,
      "13:00"
     ],
     [
      "高松港（サンポート）",
      "14:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "池田港（小豆島）",
      null,
      "13:40"
     ],
     [
      "高松港（サンポート）",
      "14:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "池田港（小豆島）",
      null,
      "15:30"
     ],
     [
      "高松港（サンポート）",
      "16:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "池田港（小豆島）",
      null,
      "16:25"
     ],
     [
      "高松港（サンポート）",
      "17:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "池田港（小豆島）",
      null,
      "18:00"
     ],
     [
      "高松港（サンポート）",
      "19:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "池田港（小豆島）",
      null,
      "19:00"
     ],
     [
      "高松港（サンポート）",
      "20:00",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-22",
  "operator": "四国汽船",
  "operatorEn": "Shikoku Kisen",
  "name": "宇野–宮浦（直島）",
  "nameEn": "Uno – Miyanoura (Naoshima)",
  "url": "https://shikokukisen.com/uno-miyanoura/",
  "ships": [
   {
    "name": "なおしま",
    "en": "Naoshima",
    "mmsi": null
   },
   {
    "name": "あさひ",
    "en": "Asahi",
    "mmsi": null
   },
   {
    "name": "せと",
    "en": "Seto",
    "mmsi": null
   },
   {
    "name": "ラブバード",
    "en": "Love Bird",
    "mmsi": null
   },
   {
    "name": "アートバード",
    "en": "Art Bird",
    "mmsi": null
   },
   {
    "name": "RED BIRD",
    "en": "Red Bird",
    "mmsi": null
   },
   {
    "name": "THUNDER BIRD",
    "en": "Thunder Bird",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "宇野港",
      null,
      "06:10"
     ],
     [
      "宮浦港（直島）",
      "06:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宇野港",
      null,
      "06:30"
     ],
     [
      "宮浦港（直島）",
      "06:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宇野港",
      null,
      "07:20"
     ],
     [
      "宮浦港（直島）",
      "07:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宇野港",
      null,
      "08:22"
     ],
     [
      "宮浦港（直島）",
      "08:42",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宇野港",
      null,
      "09:22"
     ],
     [
      "宮浦港（直島）",
      "09:42",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宇野港",
      null,
      "11:00"
     ],
     [
      "宮浦港（直島）",
      "11:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宇野港",
      null,
      "12:15"
     ],
     [
      "宮浦港（直島）",
      "12:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宇野港",
      null,
      "14:25"
     ],
     [
      "宮浦港（直島）",
      "14:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宇野港",
      null,
      "15:30"
     ],
     [
      "宮浦港（直島）",
      "15:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宇野港",
      null,
      "16:30"
     ],
     [
      "宮浦港（直島）",
      "16:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宇野港",
      null,
      "17:05"
     ],
     [
      "宮浦港（直島）",
      "17:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宇野港",
      null,
      "18:53"
     ],
     [
      "宮浦港（直島）",
      "19:13",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宇野港",
      null,
      "20:25"
     ],
     [
      "宮浦港（直島）",
      "20:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮浦港（直島）",
      null,
      "06:00"
     ],
     [
      "宇野港",
      "06:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮浦港（直島）",
      null,
      "06:40"
     ],
     [
      "宇野港",
      "07:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮浦港（直島）",
      null,
      "07:50"
     ],
     [
      "宇野港",
      "08:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮浦港（直島）",
      null,
      "08:52"
     ],
     [
      "宇野港",
      "09:12",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮浦港（直島）",
      null,
      "09:52"
     ],
     [
      "宇野港",
      "10:12",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮浦港（直島）",
      null,
      "11:10"
     ],
     [
      "宇野港",
      "11:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮浦港（直島）",
      null,
      "12:45"
     ],
     [
      "宇野港",
      "13:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮浦港（直島）",
      null,
      "14:55"
     ],
     [
      "宇野港",
      "15:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮浦港（直島）",
      null,
      "16:02"
     ],
     [
      "宇野港",
      "16:22",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮浦港（直島）",
      null,
      "16:35"
     ],
     [
      "宇野港",
      "16:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮浦港（直島）",
      null,
      "17:35"
     ],
     [
      "宇野港",
      "17:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮浦港（直島）",
      null,
      "19:02"
     ],
     [
      "宇野港",
      "19:22",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮浦港（直島）",
      null,
      "20:25"
     ],
     [
      "宇野港",
      "20:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宇野港",
      null,
      "13:30"
     ],
     [
      "宮浦港（直島）",
      "13:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宇野港",
      null,
      "22:30"
     ],
     [
      "宮浦港（直島）",
      "22:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宇野港",
      null,
      "00:35"
     ],
     [
      "宮浦港（直島）",
      "00:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮浦港（直島）",
      null,
      "13:55"
     ],
     [
      "宇野港",
      "14:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮浦港（直島）",
      null,
      "21:15"
     ],
     [
      "宇野港",
      "21:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮浦港（直島）",
      null,
      "00:15"
     ],
     [
      "宇野港",
      "00:30",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-23",
  "operator": "四国汽船",
  "operatorEn": "Shikoku Kisen",
  "name": "宇野–本村（直島） 旅客船",
  "nameEn": "Uno – Honmura (Naoshima)",
  "url": "https://shikokukisen.com/uno-honmura/",
  "ships": [
   {
    "name": "ラブバード",
    "en": "Love Bird",
    "mmsi": null
   },
   {
    "name": "アートバード",
    "en": "Art Bird",
    "mmsi": null
   },
   {
    "name": "RED BIRD",
    "en": "Red Bird",
    "mmsi": null
   },
   {
    "name": "THUNDER BIRD",
    "en": "Thunder Bird",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "宇野港",
      null,
      "07:25"
     ],
     [
      "本村港（直島）",
      "07:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宇野港",
      null,
      "11:55"
     ],
     [
      "本村港（直島）",
      "12:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宇野港",
      null,
      "16:50"
     ],
     [
      "本村港（直島）",
      "17:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宇野港",
      null,
      "17:45"
     ],
     [
      "本村港（直島）",
      "18:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宇野港",
      null,
      "18:35"
     ],
     [
      "本村港（直島）",
      "18:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "本村港（直島）",
      null,
      "06:45"
     ],
     [
      "宇野港",
      "07:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "本村港（直島）",
      null,
      "07:55"
     ],
     [
      "宇野港",
      "08:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "本村港（直島）",
      null,
      "13:00"
     ],
     [
      "宇野港",
      "13:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "本村港（直島）",
      null,
      "17:20"
     ],
     [
      "宇野港",
      "17:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "本村港（直島）",
      null,
      "18:10"
     ],
     [
      "宇野港",
      "18:30",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-24",
  "operator": "四国汽船",
  "operatorEn": "Shikoku Kisen",
  "name": "高松–宮浦（直島）",
  "nameEn": "Takamatsu Port (Sunport) – Miyanoura (Naoshima)",
  "url": "https://shikokukisen.com/takamatsu-miyanoura/",
  "ships": [
   {
    "name": "なおしま",
    "en": "Naoshima",
    "mmsi": null
   },
   {
    "name": "あさひ",
    "en": "Asahi",
    "mmsi": null
   },
   {
    "name": "せと",
    "en": "Seto",
    "mmsi": null
   },
   {
    "name": "ラブバード",
    "en": "Love Bird",
    "mmsi": null
   },
   {
    "name": "アートバード",
    "en": "Art Bird",
    "mmsi": null
   },
   {
    "name": "RED BIRD",
    "en": "Red Bird",
    "mmsi": null
   },
   {
    "name": "THUNDER BIRD",
    "en": "Thunder Bird",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "08:12"
     ],
     [
      "宮浦港（直島）",
      "09:02",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "10:14"
     ],
     [
      "宮浦港（直島）",
      "11:04",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "12:40"
     ],
     [
      "宮浦港（直島）",
      "13:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "15:35"
     ],
     [
      "宮浦港（直島）",
      "16:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "18:05"
     ],
     [
      "宮浦港（直島）",
      "18:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮浦港（直島）",
      null,
      "07:00"
     ],
     [
      "高松港（サンポート）",
      "08:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮浦港（直島）",
      null,
      "09:07"
     ],
     [
      "高松港（サンポート）",
      "10:07",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮浦港（直島）",
      null,
      "11:30"
     ],
     [
      "高松港（サンポート）",
      "12:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮浦港（直島）",
      null,
      "14:20"
     ],
     [
      "高松港（サンポート）",
      "15:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮浦港（直島）",
      null,
      "17:00"
     ],
     [
      "高松港（サンポート）",
      "18:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "07:20"
     ],
     [
      "宮浦港（直島）",
      "07:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "09:20"
     ],
     [
      "宮浦港（直島）",
      "09:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "高松港（サンポート）",
      null,
      "20:30"
     ],
     [
      "宮浦港（直島）",
      "21:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮浦港（直島）",
      null,
      "06:45"
     ],
     [
      "高松港（サンポート）",
      "07:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮浦港（直島）",
      null,
      "08:40"
     ],
     [
      "高松港（サンポート）",
      "09:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮浦港（直島）",
      null,
      "19:45"
     ],
     [
      "高松港（サンポート）",
      "20:15",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-25",
  "operator": "淡路ジェノバライン",
  "operatorEn": "Awaji Jenova Line",
  "name": "明石–岩屋",
  "nameEn": "Akashi – Iwaya (Awaji)",
  "url": "https://www.jenova-line.co.jp/jikoku.php",
  "ships": [
   {
    "name": "まりん・あわじ",
    "en": "Marine Awaji",
    "mmsi": null
   },
   {
    "name": "まりーんふらわあ2",
    "en": "Marine Flower 2",
    "mmsi": null
   },
   {
    "name": "ジェノバI",
    "en": "Jenova I",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "05:40"
     ],
     [
      "岩屋港",
      "05:53",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "06:20"
     ],
     [
      "岩屋港",
      "06:33",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "07:00"
     ],
     [
      "岩屋港",
      "07:13",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "07:20"
     ],
     [
      "岩屋港",
      "07:33",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "07:40"
     ],
     [
      "岩屋港",
      "07:53",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "08:00"
     ],
     [
      "岩屋港",
      "08:13",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "08:30"
     ],
     [
      "岩屋港",
      "08:43",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "09:00"
     ],
     [
      "岩屋港",
      "09:13",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "09:30"
     ],
     [
      "岩屋港",
      "09:43",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "10:00"
     ],
     [
      "岩屋港",
      "10:13",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "10:30"
     ],
     [
      "岩屋港",
      "10:43",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "11:10"
     ],
     [
      "岩屋港",
      "11:23",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "11:40"
     ],
     [
      "岩屋港",
      "11:53",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "12:30"
     ],
     [
      "岩屋港",
      "12:43",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "13:30"
     ],
     [
      "岩屋港",
      "13:43",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "14:30"
     ],
     [
      "岩屋港",
      "14:43",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "15:30"
     ],
     [
      "岩屋港",
      "15:43",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "16:20"
     ],
     [
      "岩屋港",
      "16:33",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "17:00"
     ],
     [
      "岩屋港",
      "17:13",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "17:40"
     ],
     [
      "岩屋港",
      "17:53",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "18:00"
     ],
     [
      "岩屋港",
      "18:13",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "18:20"
     ],
     [
      "岩屋港",
      "18:33",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "18:40"
     ],
     [
      "岩屋港",
      "18:53",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "19:00"
     ],
     [
      "岩屋港",
      "19:13",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "19:40"
     ],
     [
      "岩屋港",
      "19:53",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "20:20"
     ],
     [
      "岩屋港",
      "20:33",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "21:00"
     ],
     [
      "岩屋港",
      "21:13",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "21:40"
     ],
     [
      "岩屋港",
      "21:53",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "22:40"
     ],
     [
      "岩屋港",
      "22:53",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "明石港",
      null,
      "23:40"
     ],
     [
      "岩屋港",
      "23:53",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "05:20"
     ],
     [
      "明石港",
      "05:33",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "06:00"
     ],
     [
      "明石港",
      "06:13",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "06:40"
     ],
     [
      "明石港",
      "06:53",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "07:00"
     ],
     [
      "明石港",
      "07:13",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "07:20"
     ],
     [
      "明石港",
      "07:33",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "07:40"
     ],
     [
      "明石港",
      "07:53",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "08:00"
     ],
     [
      "明石港",
      "08:13",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "08:30"
     ],
     [
      "明石港",
      "08:43",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "09:00"
     ],
     [
      "明石港",
      "09:13",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "09:30"
     ],
     [
      "明石港",
      "09:43",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "10:00"
     ],
     [
      "明石港",
      "10:13",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "10:40"
     ],
     [
      "明石港",
      "10:53",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "11:20"
     ],
     [
      "明石港",
      "11:33",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "12:00"
     ],
     [
      "明石港",
      "12:13",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "13:00"
     ],
     [
      "明石港",
      "13:13",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "14:00"
     ],
     [
      "明石港",
      "14:13",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "15:00"
     ],
     [
      "明石港",
      "15:13",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "16:00"
     ],
     [
      "明石港",
      "16:13",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "16:40"
     ],
     [
      "明石港",
      "16:53",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "17:20"
     ],
     [
      "明石港",
      "17:33",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "17:40"
     ],
     [
      "明石港",
      "17:53",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "18:00"
     ],
     [
      "明石港",
      "18:13",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "18:20"
     ],
     [
      "明石港",
      "18:33",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "18:40"
     ],
     [
      "明石港",
      "18:53",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "19:20"
     ],
     [
      "明石港",
      "19:33",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "20:00"
     ],
     [
      "明石港",
      "20:13",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "20:40"
     ],
     [
      "明石港",
      "20:53",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "21:20"
     ],
     [
      "明石港",
      "21:33",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "22:20"
     ],
     [
      "明石港",
      "22:33",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "岩屋港",
      null,
      "23:20"
     ],
     [
      "明石港",
      "23:33",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "明石港",
      null,
      "06:30"
     ],
     [
      "岩屋港",
      "06:43",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "明石港",
      null,
      "07:30"
     ],
     [
      "岩屋港",
      "07:43",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "明石港",
      null,
      "08:30"
     ],
     [
      "岩屋港",
      "08:43",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "明石港",
      null,
      "09:30"
     ],
     [
      "岩屋港",
      "09:43",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "明石港",
      null,
      "10:30"
     ],
     [
      "岩屋港",
      "10:43",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "明石港",
      null,
      "11:40"
     ],
     [
      "岩屋港",
      "11:53",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "明石港",
      null,
      "12:30"
     ],
     [
      "岩屋港",
      "12:43",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "明石港",
      null,
      "13:30"
     ],
     [
      "岩屋港",
      "13:43",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "明石港",
      null,
      "14:30"
     ],
     [
      "岩屋港",
      "14:43",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "明石港",
      null,
      "15:30"
     ],
     [
      "岩屋港",
      "15:43",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "明石港",
      null,
      "16:20"
     ],
     [
      "岩屋港",
      "16:33",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "明石港",
      null,
      "17:00"
     ],
     [
      "岩屋港",
      "17:13",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "明石港",
      null,
      "17:40"
     ],
     [
      "岩屋港",
      "17:53",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "明石港",
      null,
      "18:20"
     ],
     [
      "岩屋港",
      "18:33",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "明石港",
      null,
      "19:00"
     ],
     [
      "岩屋港",
      "19:13",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "明石港",
      null,
      "19:40"
     ],
     [
      "岩屋港",
      "19:53",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "明石港",
      null,
      "20:20"
     ],
     [
      "岩屋港",
      "20:33",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "明石港",
      null,
      "21:00"
     ],
     [
      "岩屋港",
      "21:13",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "明石港",
      null,
      "21:40"
     ],
     [
      "岩屋港",
      "21:53",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "明石港",
      null,
      "22:40"
     ],
     [
      "岩屋港",
      "22:53",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "明石港",
      null,
      "23:40"
     ],
     [
      "岩屋港",
      "23:53",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "岩屋港",
      null,
      "06:00"
     ],
     [
      "明石港",
      "06:13",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "岩屋港",
      null,
      "07:00"
     ],
     [
      "明石港",
      "07:13",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "岩屋港",
      null,
      "08:00"
     ],
     [
      "明石港",
      "08:13",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "岩屋港",
      null,
      "09:00"
     ],
     [
      "明石港",
      "09:13",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "岩屋港",
      null,
      "10:00"
     ],
     [
      "明石港",
      "10:13",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "岩屋港",
      null,
      "11:20"
     ],
     [
      "明石港",
      "11:33",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "岩屋港",
      null,
      "12:00"
     ],
     [
      "明石港",
      "12:13",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "岩屋港",
      null,
      "13:00"
     ],
     [
      "明石港",
      "13:13",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "岩屋港",
      null,
      "14:00"
     ],
     [
      "明石港",
      "14:13",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "岩屋港",
      null,
      "15:00"
     ],
     [
      "明石港",
      "15:13",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "岩屋港",
      null,
      "16:00"
     ],
     [
      "明石港",
      "16:13",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "岩屋港",
      null,
      "16:40"
     ],
     [
      "明石港",
      "16:53",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "岩屋港",
      null,
      "17:20"
     ],
     [
      "明石港",
      "17:33",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "岩屋港",
      null,
      "18:00"
     ],
     [
      "明石港",
      "18:13",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "岩屋港",
      null,
      "18:40"
     ],
     [
      "明石港",
      "18:53",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "岩屋港",
      null,
      "19:20"
     ],
     [
      "明石港",
      "19:33",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "岩屋港",
      null,
      "20:00"
     ],
     [
      "明石港",
      "20:13",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "岩屋港",
      null,
      "20:40"
     ],
     [
      "明石港",
      "20:53",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "岩屋港",
      null,
      "21:20"
     ],
     [
      "明石港",
      "21:33",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "岩屋港",
      null,
      "22:20"
     ],
     [
      "明石港",
      "22:33",
      null
     ]
    ]
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "岩屋港",
      null,
      "23:20"
     ],
     [
      "明石港",
      "23:33",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-27",
  "operator": "関門汽船",
  "operatorEn": "Kanmon Kisen",
  "name": "下関（唐戸）–門司港 関門連絡船",
  "nameEn": "Shimonoseki Karato – Mojiko",
  "url": "https://www.kanmon-kisen.co.jp/route/kanmon.html",
  "ships": [
   {
    "name": "かんもん",
    "en": "Kanmon",
    "mmsi": null
   },
   {
    "name": "ふくまる",
    "en": "Fukumaru",
    "mmsi": null
   },
   {
    "name": "しいがる",
    "en": "Shiigaru",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "06:00"
     ],
     [
      "門司港（桟橋）",
      "06:05",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "06:30"
     ],
     [
      "門司港（桟橋）",
      "06:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "07:00"
     ],
     [
      "門司港（桟橋）",
      "07:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "07:20"
     ],
     [
      "門司港（桟橋）",
      "07:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "07:40"
     ],
     [
      "門司港（桟橋）",
      "07:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "08:00"
     ],
     [
      "門司港（桟橋）",
      "08:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "08:20"
     ],
     [
      "門司港（桟橋）",
      "08:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "08:40"
     ],
     [
      "門司港（桟橋）",
      "08:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "09:00"
     ],
     [
      "門司港（桟橋）",
      "09:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "09:20"
     ],
     [
      "門司港（桟橋）",
      "09:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "09:40"
     ],
     [
      "門司港（桟橋）",
      "09:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "10:00"
     ],
     [
      "門司港（桟橋）",
      "10:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "10:20"
     ],
     [
      "門司港（桟橋）",
      "10:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "10:40"
     ],
     [
      "門司港（桟橋）",
      "10:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "11:00"
     ],
     [
      "門司港（桟橋）",
      "11:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "11:20"
     ],
     [
      "門司港（桟橋）",
      "11:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "11:40"
     ],
     [
      "門司港（桟橋）",
      "11:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "12:00"
     ],
     [
      "門司港（桟橋）",
      "12:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "12:20"
     ],
     [
      "門司港（桟橋）",
      "12:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "12:40"
     ],
     [
      "門司港（桟橋）",
      "12:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "13:00"
     ],
     [
      "門司港（桟橋）",
      "13:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "13:20"
     ],
     [
      "門司港（桟橋）",
      "13:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "13:40"
     ],
     [
      "門司港（桟橋）",
      "13:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "14:00"
     ],
     [
      "門司港（桟橋）",
      "14:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "14:20"
     ],
     [
      "門司港（桟橋）",
      "14:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "14:40"
     ],
     [
      "門司港（桟橋）",
      "14:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "15:00"
     ],
     [
      "門司港（桟橋）",
      "15:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "15:20"
     ],
     [
      "門司港（桟橋）",
      "15:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "15:40"
     ],
     [
      "門司港（桟橋）",
      "15:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "16:00"
     ],
     [
      "門司港（桟橋）",
      "16:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "16:20"
     ],
     [
      "門司港（桟橋）",
      "16:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "16:40"
     ],
     [
      "門司港（桟橋）",
      "16:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "17:00"
     ],
     [
      "門司港（桟橋）",
      "17:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "17:20"
     ],
     [
      "門司港（桟橋）",
      "17:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "17:40"
     ],
     [
      "門司港（桟橋）",
      "17:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "18:00"
     ],
     [
      "門司港（桟橋）",
      "18:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "18:20"
     ],
     [
      "門司港（桟橋）",
      "18:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "18:40"
     ],
     [
      "門司港（桟橋）",
      "18:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "19:00"
     ],
     [
      "門司港（桟橋）",
      "19:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "19:30"
     ],
     [
      "門司港（桟橋）",
      "19:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "20:00"
     ],
     [
      "門司港（桟橋）",
      "20:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "20:30"
     ],
     [
      "門司港（桟橋）",
      "20:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "21:00"
     ],
     [
      "門司港（桟橋）",
      "21:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "下関（唐戸桟橋）",
      null,
      "21:30"
     ],
     [
      "門司港（桟橋）",
      "21:35",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "06:15"
     ],
     [
      "下関（唐戸桟橋）",
      "06:20",
      null
     ]
    ]
   },
   {
    "days": "mon,tue,wed,thu,fri,sat",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "06:40"
     ],
     [
      "下関（唐戸桟橋）",
      "06:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "07:10"
     ],
     [
      "下関（唐戸桟橋）",
      "07:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "07:30"
     ],
     [
      "下関（唐戸桟橋）",
      "07:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "07:50"
     ],
     [
      "下関（唐戸桟橋）",
      "07:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "08:10"
     ],
     [
      "下関（唐戸桟橋）",
      "08:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "08:30"
     ],
     [
      "下関（唐戸桟橋）",
      "08:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "08:50"
     ],
     [
      "下関（唐戸桟橋）",
      "08:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "09:10"
     ],
     [
      "下関（唐戸桟橋）",
      "09:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "09:30"
     ],
     [
      "下関（唐戸桟橋）",
      "09:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "09:50"
     ],
     [
      "下関（唐戸桟橋）",
      "09:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "10:10"
     ],
     [
      "下関（唐戸桟橋）",
      "10:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "10:30"
     ],
     [
      "下関（唐戸桟橋）",
      "10:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "10:50"
     ],
     [
      "下関（唐戸桟橋）",
      "10:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "11:10"
     ],
     [
      "下関（唐戸桟橋）",
      "11:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "11:30"
     ],
     [
      "下関（唐戸桟橋）",
      "11:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "11:50"
     ],
     [
      "下関（唐戸桟橋）",
      "11:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "12:10"
     ],
     [
      "下関（唐戸桟橋）",
      "12:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "12:30"
     ],
     [
      "下関（唐戸桟橋）",
      "12:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "12:50"
     ],
     [
      "下関（唐戸桟橋）",
      "12:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "13:10"
     ],
     [
      "下関（唐戸桟橋）",
      "13:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "13:30"
     ],
     [
      "下関（唐戸桟橋）",
      "13:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "13:50"
     ],
     [
      "下関（唐戸桟橋）",
      "13:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "14:10"
     ],
     [
      "下関（唐戸桟橋）",
      "14:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "14:30"
     ],
     [
      "下関（唐戸桟橋）",
      "14:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "14:50"
     ],
     [
      "下関（唐戸桟橋）",
      "14:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "15:10"
     ],
     [
      "下関（唐戸桟橋）",
      "15:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "15:30"
     ],
     [
      "下関（唐戸桟橋）",
      "15:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "15:50"
     ],
     [
      "下関（唐戸桟橋）",
      "15:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "16:10"
     ],
     [
      "下関（唐戸桟橋）",
      "16:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "16:30"
     ],
     [
      "下関（唐戸桟橋）",
      "16:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "16:50"
     ],
     [
      "下関（唐戸桟橋）",
      "16:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "17:10"
     ],
     [
      "下関（唐戸桟橋）",
      "17:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "17:30"
     ],
     [
      "下関（唐戸桟橋）",
      "17:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "17:50"
     ],
     [
      "下関（唐戸桟橋）",
      "17:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "18:10"
     ],
     [
      "下関（唐戸桟橋）",
      "18:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "18:30"
     ],
     [
      "下関（唐戸桟橋）",
      "18:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "18:50"
     ],
     [
      "下関（唐戸桟橋）",
      "18:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "19:10"
     ],
     [
      "下関（唐戸桟橋）",
      "19:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "19:40"
     ],
     [
      "下関（唐戸桟橋）",
      "19:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "20:10"
     ],
     [
      "下関（唐戸桟橋）",
      "20:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "20:40"
     ],
     [
      "下関（唐戸桟橋）",
      "20:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "21:10"
     ],
     [
      "下関（唐戸桟橋）",
      "21:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "門司港（桟橋）",
      null,
      "21:50"
     ],
     [
      "下関（唐戸桟橋）",
      "21:55",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-28",
  "operator": "JR西日本宮島フェリー",
  "operatorEn": "JR West Miyajima Ferry",
  "name": "宮島口–宮島",
  "nameEn": "Miyajimaguchi – Miyajima",
  "url": "https://jr-miyajimaferry.co.jp/timetable/",
  "ships": [],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "06:25"
     ],
     [
      "宮島桟橋",
      "06:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "07:05"
     ],
     [
      "宮島桟橋",
      "07:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "07:40"
     ],
     [
      "宮島桟橋",
      "07:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "07:57"
     ],
     [
      "宮島桟橋",
      "08:07",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "08:10"
     ],
     [
      "宮島桟橋",
      "08:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "08:25"
     ],
     [
      "宮島桟橋",
      "08:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "08:40"
     ],
     [
      "宮島桟橋",
      "08:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "08:55"
     ],
     [
      "宮島桟橋",
      "09:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "09:10"
     ],
     [
      "宮島桟橋",
      "09:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "09:25"
     ],
     [
      "宮島桟橋",
      "09:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "09:40"
     ],
     [
      "宮島桟橋",
      "09:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "09:55"
     ],
     [
      "宮島桟橋",
      "10:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "10:10"
     ],
     [
      "宮島桟橋",
      "10:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "10:25"
     ],
     [
      "宮島桟橋",
      "10:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "10:40"
     ],
     [
      "宮島桟橋",
      "10:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "10:55"
     ],
     [
      "宮島桟橋",
      "11:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "11:10"
     ],
     [
      "宮島桟橋",
      "11:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "11:25"
     ],
     [
      "宮島桟橋",
      "11:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "11:40"
     ],
     [
      "宮島桟橋",
      "11:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "11:55"
     ],
     [
      "宮島桟橋",
      "12:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "12:10"
     ],
     [
      "宮島桟橋",
      "12:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "12:25"
     ],
     [
      "宮島桟橋",
      "12:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "12:40"
     ],
     [
      "宮島桟橋",
      "12:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "12:55"
     ],
     [
      "宮島桟橋",
      "13:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "13:10"
     ],
     [
      "宮島桟橋",
      "13:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "13:25"
     ],
     [
      "宮島桟橋",
      "13:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "13:40"
     ],
     [
      "宮島桟橋",
      "13:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "13:55"
     ],
     [
      "宮島桟橋",
      "14:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "14:10"
     ],
     [
      "宮島桟橋",
      "14:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "14:25"
     ],
     [
      "宮島桟橋",
      "14:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "14:40"
     ],
     [
      "宮島桟橋",
      "14:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "14:55"
     ],
     [
      "宮島桟橋",
      "15:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "15:10"
     ],
     [
      "宮島桟橋",
      "15:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "15:25"
     ],
     [
      "宮島桟橋",
      "15:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "15:40"
     ],
     [
      "宮島桟橋",
      "15:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "15:55"
     ],
     [
      "宮島桟橋",
      "16:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "16:10"
     ],
     [
      "宮島桟橋",
      "16:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "16:25"
     ],
     [
      "宮島桟橋",
      "16:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "16:40"
     ],
     [
      "宮島桟橋",
      "16:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "16:55"
     ],
     [
      "宮島桟橋",
      "17:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "17:10"
     ],
     [
      "宮島桟橋",
      "17:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "17:25"
     ],
     [
      "宮島桟橋",
      "17:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "17:40"
     ],
     [
      "宮島桟橋",
      "17:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "17:55"
     ],
     [
      "宮島桟橋",
      "18:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "18:10"
     ],
     [
      "宮島桟橋",
      "18:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "18:25"
     ],
     [
      "宮島桟橋",
      "18:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "18:45"
     ],
     [
      "宮島桟橋",
      "18:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "19:15"
     ],
     [
      "宮島桟橋",
      "19:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "19:45"
     ],
     [
      "宮島桟橋",
      "19:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "20:27"
     ],
     [
      "宮島桟橋",
      "20:37",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "21:10"
     ],
     [
      "宮島桟橋",
      "21:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "22:00"
     ],
     [
      "宮島桟橋",
      "22:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "22:42"
     ],
     [
      "宮島桟橋",
      "22:52",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "05:45"
     ],
     [
      "宮島口",
      "05:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "06:40"
     ],
     [
      "宮島口",
      "06:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "07:20"
     ],
     [
      "宮島口",
      "07:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "07:55"
     ],
     [
      "宮島口",
      "08:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "08:10"
     ],
     [
      "宮島口",
      "08:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "08:25"
     ],
     [
      "宮島口",
      "08:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "08:40"
     ],
     [
      "宮島口",
      "08:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "08:55"
     ],
     [
      "宮島口",
      "09:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "09:10"
     ],
     [
      "宮島口",
      "09:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "09:25"
     ],
     [
      "宮島口",
      "09:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "09:40"
     ],
     [
      "宮島口",
      "09:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "09:55"
     ],
     [
      "宮島口",
      "10:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "10:10"
     ],
     [
      "宮島口",
      "10:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "10:25"
     ],
     [
      "宮島口",
      "10:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "10:40"
     ],
     [
      "宮島口",
      "10:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "10:55"
     ],
     [
      "宮島口",
      "11:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "11:10"
     ],
     [
      "宮島口",
      "11:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "11:25"
     ],
     [
      "宮島口",
      "11:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "11:40"
     ],
     [
      "宮島口",
      "11:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "11:55"
     ],
     [
      "宮島口",
      "12:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "12:10"
     ],
     [
      "宮島口",
      "12:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "12:25"
     ],
     [
      "宮島口",
      "12:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "12:40"
     ],
     [
      "宮島口",
      "12:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "12:55"
     ],
     [
      "宮島口",
      "13:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "13:10"
     ],
     [
      "宮島口",
      "13:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "13:25"
     ],
     [
      "宮島口",
      "13:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "13:40"
     ],
     [
      "宮島口",
      "13:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "13:55"
     ],
     [
      "宮島口",
      "14:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "14:10"
     ],
     [
      "宮島口",
      "14:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "14:25"
     ],
     [
      "宮島口",
      "14:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "14:40"
     ],
     [
      "宮島口",
      "14:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "14:55"
     ],
     [
      "宮島口",
      "15:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "15:10"
     ],
     [
      "宮島口",
      "15:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "15:25"
     ],
     [
      "宮島口",
      "15:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "15:40"
     ],
     [
      "宮島口",
      "15:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "15:55"
     ],
     [
      "宮島口",
      "16:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "16:10"
     ],
     [
      "宮島口",
      "16:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "16:25"
     ],
     [
      "宮島口",
      "16:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "16:40"
     ],
     [
      "宮島口",
      "16:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "16:55"
     ],
     [
      "宮島口",
      "17:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "17:10"
     ],
     [
      "宮島口",
      "17:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "17:25"
     ],
     [
      "宮島口",
      "17:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "17:40"
     ],
     [
      "宮島口",
      "17:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "17:55"
     ],
     [
      "宮島口",
      "18:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "18:10"
     ],
     [
      "宮島口",
      "18:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "18:25"
     ],
     [
      "宮島口",
      "18:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "18:40"
     ],
     [
      "宮島口",
      "18:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "19:00"
     ],
     [
      "宮島口",
      "19:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "19:30"
     ],
     [
      "宮島口",
      "19:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "20:00"
     ],
     [
      "宮島口",
      "20:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "20:42"
     ],
     [
      "宮島口",
      "20:52",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "21:25"
     ],
     [
      "宮島口",
      "21:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "22:14"
     ],
     [
      "宮島口",
      "22:24",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-29",
  "operator": "宮島松大汽船",
  "operatorEn": "Miyajima Matsudai Kisen",
  "name": "宮島口–宮島（旅客便）",
  "nameEn": "Miyajimaguchi – Miyajima",
  "url": "https://miyajima-matsudai.co.jp/schedule.html",
  "ships": [],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "07:15"
     ],
     [
      "宮島桟橋",
      "07:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "07:45"
     ],
     [
      "宮島桟橋",
      "07:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "08:00"
     ],
     [
      "宮島桟橋",
      "08:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "08:15"
     ],
     [
      "宮島桟橋",
      "08:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "08:30"
     ],
     [
      "宮島桟橋",
      "08:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "08:45"
     ],
     [
      "宮島桟橋",
      "08:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "09:05"
     ],
     [
      "宮島桟橋",
      "09:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "09:20"
     ],
     [
      "宮島桟橋",
      "09:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "09:35"
     ],
     [
      "宮島桟橋",
      "09:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "09:50"
     ],
     [
      "宮島桟橋",
      "10:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "10:05"
     ],
     [
      "宮島桟橋",
      "10:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "10:20"
     ],
     [
      "宮島桟橋",
      "10:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "10:35"
     ],
     [
      "宮島桟橋",
      "10:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "10:50"
     ],
     [
      "宮島桟橋",
      "11:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "11:05"
     ],
     [
      "宮島桟橋",
      "11:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "11:20"
     ],
     [
      "宮島桟橋",
      "11:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "11:35"
     ],
     [
      "宮島桟橋",
      "11:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "11:50"
     ],
     [
      "宮島桟橋",
      "12:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "12:05"
     ],
     [
      "宮島桟橋",
      "12:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "12:20"
     ],
     [
      "宮島桟橋",
      "12:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "12:35"
     ],
     [
      "宮島桟橋",
      "12:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "12:50"
     ],
     [
      "宮島桟橋",
      "13:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "13:10"
     ],
     [
      "宮島桟橋",
      "13:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "13:30"
     ],
     [
      "宮島桟橋",
      "13:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "13:45"
     ],
     [
      "宮島桟橋",
      "13:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "14:00"
     ],
     [
      "宮島桟橋",
      "14:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "14:15"
     ],
     [
      "宮島桟橋",
      "14:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "14:30"
     ],
     [
      "宮島桟橋",
      "14:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "14:45"
     ],
     [
      "宮島桟橋",
      "14:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "15:00"
     ],
     [
      "宮島桟橋",
      "15:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "15:15"
     ],
     [
      "宮島桟橋",
      "15:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "15:30"
     ],
     [
      "宮島桟橋",
      "15:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "15:45"
     ],
     [
      "宮島桟橋",
      "15:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "16:00"
     ],
     [
      "宮島桟橋",
      "16:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "16:15"
     ],
     [
      "宮島桟橋",
      "16:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "16:30"
     ],
     [
      "宮島桟橋",
      "16:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "16:45"
     ],
     [
      "宮島桟橋",
      "16:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "17:00"
     ],
     [
      "宮島桟橋",
      "17:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "17:15"
     ],
     [
      "宮島桟橋",
      "17:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "17:30"
     ],
     [
      "宮島桟橋",
      "17:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "17:45"
     ],
     [
      "宮島桟橋",
      "17:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "18:00"
     ],
     [
      "宮島桟橋",
      "18:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "18:15"
     ],
     [
      "宮島桟橋",
      "18:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "18:30"
     ],
     [
      "宮島桟橋",
      "18:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "18:45"
     ],
     [
      "宮島桟橋",
      "18:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "19:00"
     ],
     [
      "宮島桟橋",
      "19:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "19:15"
     ],
     [
      "宮島桟橋",
      "19:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "19:30"
     ],
     [
      "宮島桟橋",
      "19:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "20:00"
     ],
     [
      "宮島桟橋",
      "20:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島口",
      null,
      "20:35"
     ],
     [
      "宮島桟橋",
      "20:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "07:00"
     ],
     [
      "宮島口",
      "07:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "07:30"
     ],
     [
      "宮島口",
      "07:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "07:45"
     ],
     [
      "宮島口",
      "07:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "08:00"
     ],
     [
      "宮島口",
      "08:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "08:15"
     ],
     [
      "宮島口",
      "08:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "08:30"
     ],
     [
      "宮島口",
      "08:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "08:45"
     ],
     [
      "宮島口",
      "08:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "09:05"
     ],
     [
      "宮島口",
      "09:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "09:20"
     ],
     [
      "宮島口",
      "09:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "09:35"
     ],
     [
      "宮島口",
      "09:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "09:50"
     ],
     [
      "宮島口",
      "10:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "10:05"
     ],
     [
      "宮島口",
      "10:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "10:20"
     ],
     [
      "宮島口",
      "10:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "10:35"
     ],
     [
      "宮島口",
      "10:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "10:50"
     ],
     [
      "宮島口",
      "11:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "11:05"
     ],
     [
      "宮島口",
      "11:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "11:20"
     ],
     [
      "宮島口",
      "11:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "11:35"
     ],
     [
      "宮島口",
      "11:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "11:50"
     ],
     [
      "宮島口",
      "12:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "12:05"
     ],
     [
      "宮島口",
      "12:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "12:20"
     ],
     [
      "宮島口",
      "12:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "12:35"
     ],
     [
      "宮島口",
      "12:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "12:50"
     ],
     [
      "宮島口",
      "13:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "13:10"
     ],
     [
      "宮島口",
      "13:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "13:30"
     ],
     [
      "宮島口",
      "13:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "13:45"
     ],
     [
      "宮島口",
      "13:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "14:00"
     ],
     [
      "宮島口",
      "14:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "14:15"
     ],
     [
      "宮島口",
      "14:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "14:30"
     ],
     [
      "宮島口",
      "14:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "14:45"
     ],
     [
      "宮島口",
      "14:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "15:00"
     ],
     [
      "宮島口",
      "15:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "15:15"
     ],
     [
      "宮島口",
      "15:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "15:30"
     ],
     [
      "宮島口",
      "15:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "15:45"
     ],
     [
      "宮島口",
      "15:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "16:00"
     ],
     [
      "宮島口",
      "16:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "16:15"
     ],
     [
      "宮島口",
      "16:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "16:30"
     ],
     [
      "宮島口",
      "16:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "16:45"
     ],
     [
      "宮島口",
      "16:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "17:00"
     ],
     [
      "宮島口",
      "17:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "17:15"
     ],
     [
      "宮島口",
      "17:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "17:30"
     ],
     [
      "宮島口",
      "17:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "17:45"
     ],
     [
      "宮島口",
      "17:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "18:00"
     ],
     [
      "宮島口",
      "18:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "18:15"
     ],
     [
      "宮島口",
      "18:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "18:30"
     ],
     [
      "宮島口",
      "18:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "18:45"
     ],
     [
      "宮島口",
      "18:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "19:00"
     ],
     [
      "宮島口",
      "19:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "19:15"
     ],
     [
      "宮島口",
      "19:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "19:45"
     ],
     [
      "宮島口",
      "19:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮島桟橋",
      null,
      "20:15"
     ],
     [
      "宮島口",
      "20:25",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-30",
  "operator": "スオーナダフェリー",
  "operatorEn": "Suonada Ferry",
  "name": "徳山–竹田津",
  "nameEn": "Tokuyama – Taketazu",
  "url": "https://www.suonada.co.jp/c_timetable.html",
  "ships": [],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "徳山港",
      null,
      "02:00"
     ],
     [
      "竹田津港",
      "04:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "徳山港",
      null,
      "07:20"
     ],
     [
      "竹田津港",
      "09:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "徳山港",
      null,
      "12:00"
     ],
     [
      "竹田津港",
      "14:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "徳山港",
      null,
      "16:40"
     ],
     [
      "竹田津港",
      "18:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "竹田津港",
      null,
      "04:20"
     ],
     [
      "徳山港",
      "06:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "竹田津港",
      null,
      "09:40"
     ],
     [
      "徳山港",
      "11:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "竹田津港",
      null,
      "14:20"
     ],
     [
      "徳山港",
      "16:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "竹田津港",
      null,
      "19:00"
     ],
     [
      "徳山港",
      "21:00",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "inland-31",
  "operator": "南海フェリー",
  "operatorEn": "Nankai Ferry",
  "name": "和歌山–徳島",
  "nameEn": "Wakayama Port – Tokushima Port (Okinosu)",
  "url": "https://nankai-ferry.co.jp/timetable/",
  "ships": [
   {
    "name": "フェリーかつらぎ",
    "en": "Ferry Katsuragi",
    "mmsi": 431301245
   },
   {
    "name": "フェリーあい",
    "en": "Ferry Ai",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "和歌山港",
      null,
      "05:30"
     ],
     [
      "徳島港（南沖洲）",
      "07:35",
      null
     ]
    ],
    "ship": "あい"
   },
   {
    "days": "daily",
    "stops": [
     [
      "和歌山港",
      null,
      "08:25"
     ],
     [
      "徳島港（南沖洲）",
      "10:30",
      null
     ]
    ],
    "ship": "かつらぎ"
   },
   {
    "days": "daily",
    "stops": [
     [
      "和歌山港",
      null,
      "10:35"
     ],
     [
      "徳島港（南沖洲）",
      "12:50",
      null
     ]
    ],
    "ship": "あい"
   },
   {
    "days": "daily",
    "stops": [
     [
      "和歌山港",
      null,
      "13:40"
     ],
     [
      "徳島港（南沖洲）",
      "15:55",
      null
     ]
    ],
    "ship": "かつらぎ"
   },
   {
    "days": "daily",
    "stops": [
     [
      "和歌山港",
      null,
      "16:20"
     ],
     [
      "徳島港（南沖洲）",
      "18:30",
      null
     ]
    ],
    "ship": "あい"
   },
   {
    "days": "daily",
    "stops": [
     [
      "和歌山港",
      null,
      "21:50"
     ],
     [
      "徳島港（南沖洲）",
      "00:05+1",
      null
     ]
    ],
    "ship": "あい"
   },
   {
    "days": "daily",
    "stops": [
     [
      "徳島港（南沖洲）",
      null,
      "02:45"
     ],
     [
      "和歌山港",
      "05:05",
      null
     ]
    ],
    "ship": "あい"
   },
   {
    "days": "daily",
    "stops": [
     [
      "徳島港（南沖洲）",
      null,
      "08:00"
     ],
     [
      "和歌山港",
      "10:10",
      null
     ]
    ],
    "ship": "あい"
   },
   {
    "days": "daily",
    "stops": [
     [
      "徳島港（南沖洲）",
      null,
      "10:55"
     ],
     [
      "和歌山港",
      "13:05",
      null
     ]
    ],
    "ship": "かつらぎ"
   },
   {
    "days": "daily",
    "stops": [
     [
      "徳島港（南沖洲）",
      null,
      "13:20"
     ],
     [
      "和歌山港",
      "15:40",
      null
     ]
    ],
    "ship": "あい"
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "徳島港（南沖洲）",
      null,
      "16:25"
     ],
     [
      "和歌山港",
      "18:40",
      null
     ]
    ],
    "ship": "かつらぎ"
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "徳島港（南沖洲）",
      null,
      "16:25"
     ],
     [
      "和歌山港",
      "18:35",
      null
     ]
    ],
    "ship": "かつらぎ"
   },
   {
    "days": "mon,tue,wed,thu,fri",
    "stops": [
     [
      "徳島港（南沖洲）",
      null,
      "18:55"
     ],
     [
      "和歌山港",
      "21:15",
      null
     ]
    ],
    "ship": "あい"
   },
   {
    "days": "sun,sat",
    "stops": [
     [
      "徳島港（南沖洲）",
      null,
      "18:55"
     ],
     [
      "和歌山港",
      "21:05",
      null
     ]
    ],
    "ship": "あい"
   }
  ]
 },
 {
  "id": "south-0",
  "operator": "マルエーフェリー・マリックスライン",
  "operatorEn": "A-Line Ferry / Marix Line",
  "name": "鹿児島新港–名瀬–亀徳–和泊–与論–本部–那覇",
  "nameEn": "Kagoshima Shinko – Naze – Kametoku – Wadomari – Yoron – Motobu – Naha",
  "url": "https://www.aline-ferry.com/kagoshima/time/",
  "ships": [
   {
    "name": "フェリーあけぼの",
    "en": "Ferry Akebono",
    "mmsi": 431000585
   },
   {
    "name": "フェリー波之上",
    "en": "Ferry Naminoue",
    "mmsi": 431003691
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島新港",
      null,
      "18:00"
     ],
     [
      "名瀬",
      "05:00+1",
      "05:50+1"
     ],
     [
      "亀徳",
      "09:10+1",
      "09:40+1"
     ],
     [
      "和泊",
      "11:30+1",
      "12:00+1"
     ],
     [
      "与論",
      "13:40+1",
      "14:10+1"
     ],
     [
      "本部",
      "16:40+1",
      "17:10+1"
     ],
     [
      "那覇",
      "19:00+1",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "那覇",
      null,
      "07:00"
     ],
     [
      "本部",
      "09:00",
      "09:20"
     ],
     [
      "与論",
      "11:50",
      "12:10"
     ],
     [
      "和泊",
      "14:10",
      "14:40"
     ],
     [
      "亀徳",
      "16:30",
      "17:00"
     ],
     [
      "名瀬",
      "20:30",
      "21:20"
     ],
     [
      "鹿児島新港",
      "08:30+1",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "south-4",
  "operator": "種子屋久高速船",
  "operatorEn": "Tane Yaku Jetfoil",
  "name": "鹿児島–(指宿)–西之表–宮之浦/安房 (ジェットフォイル トッピー・ロケット)",
  "nameEn": "Kagoshima Honko South Pier – Nishinoomote – Miyanoura – Anbo",
  "url": "https://travel.willer.co.jp/ferry/carrier/67.html",
  "ships": [
   {
    "name": "トッピー/ロケット (ジェットフォイル6隻)",
    "en": "Toppy / Rocket jetfoils",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島本港南埠頭",
      null,
      "07:30"
     ],
     [
      "西之表",
      "09:05",
      "09:30"
     ],
     [
      "宮之浦",
      "10:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮之浦",
      null,
      "10:40"
     ],
     [
      "鹿児島本港南埠頭",
      "12:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島本港南埠頭",
      null,
      "07:45"
     ],
     [
      "宮之浦",
      "09:45",
      "10:00"
     ],
     [
      "西之表",
      "10:50",
      "11:05"
     ],
     [
      "鹿児島本港南埠頭",
      "12:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島本港南埠頭",
      null,
      "10:10"
     ],
     [
      "西之表",
      "11:45",
      "12:00"
     ],
     [
      "安房",
      "12:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島本港南埠頭",
      null,
      "13:00"
     ],
     [
      "西之表",
      "14:35",
      "14:45"
     ],
     [
      "宮之浦",
      "15:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島本港南埠頭",
      null,
      "13:20"
     ],
     [
      "宮之浦",
      "15:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島本港南埠頭",
      null,
      "15:45"
     ],
     [
      "西之表",
      "17:20",
      "17:25"
     ],
     [
      "安房",
      "18:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島本港南埠頭",
      null,
      "16:45"
     ],
     [
      "西之表",
      "18:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "西之表",
      null,
      "07:00"
     ],
     [
      "鹿児島本港南埠頭",
      "08:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "安房",
      null,
      "07:00"
     ],
     [
      "西之表",
      "07:50",
      "08:00"
     ],
     [
      "鹿児島本港南埠頭",
      "09:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "安房",
      null,
      "13:10"
     ],
     [
      "西之表",
      "14:05",
      "14:15"
     ],
     [
      "鹿児島本港南埠頭",
      "15:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮之浦",
      null,
      "15:50"
     ],
     [
      "西之表",
      "16:40",
      "16:50"
     ],
     [
      "鹿児島本港南埠頭",
      "18:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮之浦",
      null,
      "16:10"
     ],
     [
      "鹿児島本港南埠頭",
      "18:10",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "south-5",
  "operator": "折田汽船",
  "operatorEn": "Orita Kisen",
  "name": "鹿児島本港南埠頭–宮之浦 (フェリー屋久島2)",
  "nameEn": "Kagoshima Honko South Pier – Miyanoura",
  "url": "https://www.veltra.com/jp/yokka/article/yakushima-ferry/",
  "ships": [
   {
    "name": "フェリー屋久島2",
    "en": "Ferry Yakushima 2",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島本港南埠頭",
      null,
      "08:30"
     ],
     [
      "宮之浦",
      "12:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "宮之浦",
      null,
      "13:30"
     ],
     [
      "鹿児島本港南埠頭",
      "17:40",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "south-6",
  "operator": "コスモライン",
  "operatorEn": "Cosmo Line",
  "name": "鹿児島本港南埠頭–西之表 (フェリープリンセスわかさ)",
  "nameEn": "Kagoshima Honko South Pier – Nishinoomote",
  "url": "https://www.pref.kagoshima.jp/ak13/infra/port/minato/kagoshima/honko/honkouku-terminal.html",
  "ships": [
   {
    "name": "プリンセスわかさ",
    "en": "Princess Wakasa",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島本港南埠頭",
      null,
      "08:40"
     ],
     [
      "西之表",
      "12:10",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "south-7",
  "operator": "十島村",
  "operatorEn": "Toshima Village",
  "name": "鹿児島–口之島–中之島–諏訪之瀬島–平島–悪石島–小宝島–宝島–名瀬",
  "nameEn": "Kagoshima Honko South Pier – Kuchinoshima – Nakanoshima – Suwanosejima – Tairajima – Akusekijima – Kodakarajima – Takarajima – Naze",
  "url": "https://www.tokara.jp/ferry/",
  "ships": [
   {
    "name": "フェリーとしま2",
    "en": "Ferry Toshima 2",
    "mmsi": 431010959
   }
  ],
  "sailings": [
   {
    "days": "mon,fri",
    "stops": [
     [
      "鹿児島本港南埠頭",
      null,
      "23:00"
     ],
     [
      "口之島",
      "05:00+1",
      "05:10+1"
     ],
     [
      "中之島",
      "06:00+1",
      "06:10+1"
     ],
     [
      "諏訪之瀬島",
      "07:10+1",
      "07:20+1"
     ],
     [
      "平島",
      "08:10+1",
      "08:20+1"
     ],
     [
      "悪石島",
      "09:15+1",
      "09:25+1"
     ],
     [
      "小宝島",
      "10:45+1",
      "10:55+1"
     ],
     [
      "宝島",
      "11:30+1",
      "11:40+1"
     ],
     [
      "名瀬",
      "15:20+1",
      null
     ]
    ]
   },
   {
    "days": "sun,wed",
    "stops": [
     [
      "名瀬",
      null,
      "02:00"
     ],
     [
      "宝島",
      "05:00",
      "05:10"
     ],
     [
      "小宝島",
      "05:40",
      "05:50"
     ],
     [
      "悪石島",
      "07:05",
      "07:15"
     ],
     [
      "平島",
      "08:15",
      "08:25"
     ],
     [
      "諏訪之瀬島",
      "09:10",
      "09:20"
     ],
     [
      "中之島",
      "10:25",
      "10:35"
     ],
     [
      "口之島",
      "11:25",
      "11:35"
     ],
     [
      "鹿児島本港南埠頭",
      "18:20",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "south-9",
  "operator": "カメリアライン",
  "operatorEn": "Camellia Line",
  "name": "博多–釜山 (ニューかめりあ)",
  "nameEn": "Hakata Port International Terminal – Busan",
  "url": "https://www.camellia-line.co.jp/dia/",
  "ships": [
   {
    "name": "ニューかめりあ",
    "en": "New Camellia",
    "mmsi": 431602232
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "博多港国際ターミナル",
      null,
      "12:30"
     ],
     [
      "釜山",
      "18:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "釜山",
      null,
      "20:00"
     ],
     [
      "博多港国際ターミナル",
      "07:30+1",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "south-11",
  "operator": "関釜フェリー",
  "operatorEn": "Kampu Ferry",
  "name": "下関–釜山",
  "nameEn": "Shimonoseki – Busan",
  "url": "https://www.kampuferry.co.jp/passenger_info/schedule/index.html",
  "ships": [
   {
    "name": "はまゆう",
    "en": "Hamayuu",
    "mmsi": 431446000
   },
   {
    "name": "星希",
    "en": "Seonghee",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "下関",
      null,
      "19:45"
     ],
     [
      "釜山",
      "08:00+1",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "釜山",
      null,
      "21:00"
     ],
     [
      "下関",
      "07:45+1",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "south-17",
  "operator": "九州商船",
  "operatorEn": "Kyushu Shosen",
  "name": "長崎–奈良尾–福江 ジェットフォイル",
  "nameEn": "Nagasaki – Narao – Fukue",
  "url": "https://kyusho.co.jp/wp-content/uploads/2019/01/5caaa545a6284e2b1b88cf18ec9b22c5.pdf",
  "ships": [
   {
    "name": "ぺがさす",
    "en": "Pegasus",
    "mmsi": null
   },
   {
    "name": "ぺがさす2",
    "en": "Pegasus 2",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "長崎",
      null,
      "07:40"
     ],
     [
      "福江",
      "09:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "長崎",
      null,
      "11:30"
     ],
     [
      "福江",
      "12:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "長崎",
      null,
      "13:55"
     ],
     [
      "福江",
      "15:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "長崎",
      null,
      "15:25"
     ],
     [
      "奈良尾",
      "16:35",
      "16:40"
     ],
     [
      "福江",
      "17:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "福江",
      null,
      "07:30"
     ],
     [
      "奈良尾",
      "08:00",
      "08:05"
     ],
     [
      "長崎",
      "09:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "福江",
      null,
      "09:20"
     ],
     [
      "奈良尾",
      "09:50",
      "09:55"
     ],
     [
      "長崎",
      "11:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "福江",
      null,
      "13:10"
     ],
     [
      "長崎",
      "14:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "福江",
      null,
      "15:35"
     ],
     [
      "奈良尾",
      "16:05",
      "16:10"
     ],
     [
      "長崎",
      "17:20",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "south-18",
  "operator": "九州商船",
  "operatorEn": "Kyushu Shosen",
  "name": "長崎–奈良尾–福江–奈留 フェリー",
  "nameEn": "Nagasaki – Narao – Fukue – Naru",
  "url": "https://kyusho.co.jp/wp-content/uploads/2019/01/5caaa545a6284e2b1b88cf18ec9b22c5.pdf",
  "ships": [
   {
    "name": "椿",
    "en": "Tsubaki",
    "mmsi": null
   },
   {
    "name": "万葉",
    "en": "Manyo",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "長崎",
      null,
      "08:05"
     ],
     [
      "福江",
      "11:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "長崎",
      null,
      "12:25"
     ],
     [
      "奈良尾",
      "15:00",
      "15:15"
     ],
     [
      "福江",
      "16:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "長崎",
      null,
      "16:50"
     ],
     [
      "福江",
      "20:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "福江",
      null,
      "08:00"
     ],
     [
      "奈良尾",
      "09:05",
      "09:15"
     ],
     [
      "長崎",
      "11:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "福江",
      null,
      "11:45"
     ],
     [
      "奈留",
      "12:25",
      "12:35"
     ],
     [
      "奈良尾",
      "13:25",
      "13:35"
     ],
     [
      "長崎",
      "16:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "福江",
      null,
      "16:50"
     ],
     [
      "長崎",
      "20:00",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "south-19",
  "operator": "九州商船",
  "operatorEn": "Kyushu Shosen",
  "name": "佐世保–上五島(有川)・小値賀・宇久 高速船",
  "nameEn": "Sasebo – Arikawa – Ojika – Ukudaira",
  "url": "https://kyusho.co.jp/wp-content/uploads/2019/01/5caaa545a6284e2b1b88cf18ec9b22c5.pdf",
  "ships": [
   {
    "name": "シークイーン",
    "en": "Sea Queen",
    "mmsi": null
   },
   {
    "name": "シーレイディ",
    "en": "Sea Lady",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "有川",
      null,
      "06:55"
     ],
     [
      "佐世保",
      "08:20",
      null
     ]
    ],
    "ship": "シークイーン"
   },
   {
    "days": "daily",
    "stops": [
     [
      "佐世保",
      null,
      "08:35"
     ],
     [
      "有川",
      "10:00",
      "10:05"
     ],
     [
      "小値賀",
      "10:40",
      "10:45"
     ],
     [
      "宇久平",
      "11:05",
      "11:10"
     ],
     [
      "有川",
      "11:55",
      null
     ]
    ],
    "ship": "シークイーン"
   },
   {
    "days": "daily",
    "stops": [
     [
      "有川",
      null,
      "15:00"
     ],
     [
      "佐世保",
      "16:25",
      null
     ]
    ],
    "ship": "シークイーン"
   },
   {
    "days": "daily",
    "stops": [
     [
      "佐世保",
      null,
      "16:55"
     ],
     [
      "有川",
      "18:20",
      null
     ]
    ],
    "ship": "シークイーン"
   },
   {
    "days": "daily",
    "stops": [
     [
      "小値賀",
      null,
      "07:00"
     ],
     [
      "宇久平",
      "07:20",
      "07:25"
     ],
     [
      "佐世保",
      "08:50",
      null
     ]
    ],
    "ship": "シーレイディ"
   },
   {
    "days": "daily",
    "stops": [
     [
      "佐世保",
      null,
      "12:05"
     ],
     [
      "小値賀",
      "13:35",
      "13:45"
     ],
     [
      "宇久平",
      "14:05",
      "14:10"
     ],
     [
      "佐世保",
      "15:35",
      null
     ]
    ],
    "ship": "シーレイディ"
   },
   {
    "days": "daily",
    "stops": [
     [
      "佐世保",
      null,
      "15:50"
     ],
     [
      "宇久平",
      "17:15",
      "17:20"
     ],
     [
      "小値賀",
      "17:40",
      null
     ]
    ],
    "ship": "シーレイディ"
   }
  ]
 },
 {
  "id": "south-20",
  "operator": "九州商船",
  "operatorEn": "Kyushu Shosen",
  "name": "佐世保–上五島(有川)・小値賀・宇久 フェリー",
  "nameEn": "Sasebo – Arikawa – Ojika – Ukudaira",
  "url": "https://kyusho.co.jp/wp-content/uploads/2019/01/5caaa545a6284e2b1b88cf18ec9b22c5.pdf",
  "ships": [
   {
    "name": "いのり",
    "en": "Inori",
    "mmsi": null
   },
   {
    "name": "フェリーニューこしき",
    "en": "Ferry New Koshiki",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "宇久平",
      null,
      "07:00"
     ],
     [
      "小値賀",
      "07:40",
      "07:45"
     ],
     [
      "佐世保",
      "10:20",
      null
     ]
    ],
    "ship": "いのり"
   },
   {
    "days": "daily",
    "stops": [
     [
      "佐世保",
      null,
      "10:40"
     ],
     [
      "有川",
      "13:15",
      "13:35"
     ],
     [
      "佐世保",
      "16:10",
      null
     ]
    ],
    "ship": "いのり"
   },
   {
    "days": "daily",
    "stops": [
     [
      "佐世保",
      null,
      "16:40"
     ],
     [
      "小値賀",
      "19:15",
      "19:20"
     ],
     [
      "宇久平",
      "20:00",
      null
     ]
    ],
    "ship": "いのり"
   }
  ]
 },
 {
  "id": "south-21",
  "operator": "野母商船",
  "operatorEn": "Nomo Shosen",
  "name": "博多–宇久平–小値賀–青方–奈留–福江 (フェリー太古)",
  "nameEn": "Hakata Futo – Ukudaira – Ojika – Aokata – Naru – Fukue",
  "url": "https://www.nomo.co.jp/taiko/timetable.html",
  "ships": [
   {
    "name": "フェリー太古",
    "en": "Ferry Taiko",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "博多ふ頭",
      null,
      "23:45"
     ],
     [
      "宇久平",
      "03:55+1",
      "04:05+1"
     ],
     [
      "小値賀",
      "04:40+1",
      "04:50+1"
     ],
     [
      "青方",
      "05:40+1",
      "06:05+1"
     ],
     [
      "奈留",
      "07:25+1",
      "07:35+1"
     ],
     [
      "福江",
      "08:15+1",
      null
     ]
    ],
    "ship": "フェリー太古"
   },
   {
    "days": "daily",
    "stops": [
     [
      "福江",
      null,
      "10:10"
     ],
     [
      "青方",
      "11:50",
      "12:10"
     ],
     [
      "小値賀",
      "13:00",
      "13:10"
     ],
     [
      "宇久平",
      "13:45",
      "13:55"
     ],
     [
      "博多ふ頭",
      "17:50",
      null
     ]
    ],
    "ship": "フェリー太古"
   }
  ]
 },
 {
  "id": "south-23",
  "operator": "九商フェリー",
  "operatorEn": "Kyusho Ferry",
  "name": "熊本港–島原港 カーフェリー",
  "nameEn": "Kumamoto Port – Shimabara",
  "url": "https://www.kyusho-ferry.co.jp/diagram/",
  "ships": [
   {
    "name": "レインボーかもめ",
    "en": "Rainbow Kamome",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "熊本港",
      null,
      "07:00"
     ],
     [
      "島原",
      "08:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "熊本港",
      null,
      "08:20"
     ],
     [
      "島原",
      "09:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "熊本港",
      null,
      "09:50"
     ],
     [
      "島原",
      "10:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "熊本港",
      null,
      "11:00"
     ],
     [
      "島原",
      "12:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "熊本港",
      null,
      "12:20"
     ],
     [
      "島原",
      "13:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "熊本港",
      null,
      "13:35"
     ],
     [
      "島原",
      "14:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "熊本港",
      null,
      "15:10"
     ],
     [
      "島原",
      "16:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "熊本港",
      null,
      "16:05"
     ],
     [
      "島原",
      "17:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "熊本港",
      null,
      "17:45"
     ],
     [
      "島原",
      "18:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "島原",
      null,
      "07:00"
     ],
     [
      "熊本港",
      "08:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "島原",
      null,
      "08:35"
     ],
     [
      "熊本港",
      "09:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "島原",
      null,
      "09:40"
     ],
     [
      "熊本港",
      "10:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "島原",
      null,
      "11:05"
     ],
     [
      "熊本港",
      "12:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "島原",
      null,
      "12:15"
     ],
     [
      "熊本港",
      "13:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "島原",
      null,
      "13:40"
     ],
     [
      "熊本港",
      "14:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "島原",
      null,
      "14:50"
     ],
     [
      "熊本港",
      "15:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "島原",
      null,
      "16:25"
     ],
     [
      "熊本港",
      "17:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "島原",
      null,
      "17:45"
     ],
     [
      "熊本港",
      "18:45",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "south-24",
  "operator": "熊本フェリー",
  "operatorEn": "Kumamoto Ferry",
  "name": "熊本港–島原港 高速フェリー オーシャンアロー",
  "nameEn": "Kumamoto Port – Shimabara",
  "url": "https://travel.willer.co.jp/ferry/carrier/126.html",
  "ships": [
   {
    "name": "オーシャンアロー",
    "en": "Ocean Arrow",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "熊本港",
      null,
      "07:30"
     ],
     [
      "島原",
      "08:02",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "熊本港",
      null,
      "09:25"
     ],
     [
      "島原",
      "09:57",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "熊本港",
      null,
      "11:10"
     ],
     [
      "島原",
      "11:42",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "熊本港",
      null,
      "13:00"
     ],
     [
      "島原",
      "13:32",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "熊本港",
      null,
      "14:50"
     ],
     [
      "島原",
      "15:22",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "熊本港",
      null,
      "16:40"
     ],
     [
      "島原",
      "17:12",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "島原",
      null,
      "08:25"
     ],
     [
      "熊本港",
      "08:59",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "島原",
      null,
      "10:15"
     ],
     [
      "熊本港",
      "10:49",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "島原",
      null,
      "12:05"
     ],
     [
      "熊本港",
      "12:39",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "島原",
      null,
      "13:50"
     ],
     [
      "熊本港",
      "14:24",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "島原",
      null,
      "15:45"
     ],
     [
      "熊本港",
      "16:19",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "島原",
      null,
      "17:30"
     ],
     [
      "熊本港",
      "18:04",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "south-25",
  "operator": "渡嘉敷村",
  "operatorEn": "Tokashiki Village",
  "name": "泊港–渡嘉敷港",
  "nameEn": "Tomari (Naha) – Tokashiki",
  "url": "https://www.vill.tokashiki.okinawa.jp/material/files/group/1/20260901.pdf",
  "ships": [
   {
    "name": "フェリーとかしき",
    "en": "Ferry Tokashiki",
    "mmsi": null
   },
   {
    "name": "マリンライナーとかしき",
    "en": "Marine Liner Tokashiki",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "泊港",
      null,
      "10:00"
     ],
     [
      "渡嘉敷",
      "11:10",
      null
     ]
    ],
    "ship": "フェリーとかしき"
   },
   {
    "days": "daily",
    "stops": [
     [
      "渡嘉敷",
      null,
      "15:30"
     ],
     [
      "泊港",
      "16:40",
      null
     ]
    ],
    "ship": "フェリーとかしき"
   },
   {
    "days": "daily",
    "stops": [
     [
      "泊港",
      null,
      "09:00"
     ],
     [
      "渡嘉敷",
      "09:40",
      null
     ]
    ],
    "ship": "マリンライナーとかしき"
   },
   {
    "days": "daily",
    "stops": [
     [
      "渡嘉敷",
      null,
      "10:00"
     ],
     [
      "泊港",
      "10:40",
      null
     ]
    ],
    "ship": "マリンライナーとかしき"
   },
   {
    "days": "daily",
    "stops": [
     [
      "泊港",
      null,
      "16:00"
     ],
     [
      "渡嘉敷",
      "16:40",
      null
     ]
    ],
    "ship": "マリンライナーとかしき"
   },
   {
    "days": "daily",
    "stops": [
     [
      "渡嘉敷",
      null,
      "17:00"
     ],
     [
      "泊港",
      "17:40",
      null
     ]
    ],
    "ship": "マリンライナーとかしき"
   }
  ]
 },
 {
  "id": "south-26",
  "operator": "座間味村",
  "operatorEn": "Zamami Village",
  "name": "泊港–阿嘉–座間味",
  "nameEn": "Tomari (Naha) – Aka – Zamami",
  "url": "https://www.vill.zamami.okinawa.jp/ship/",
  "ships": [
   {
    "name": "フェリーざまみ3",
    "en": "Ferry Zamami 3",
    "mmsi": null
   },
   {
    "name": "クイーンざまみ",
    "en": "Queen Zamami",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "泊港",
      null,
      "10:00"
     ],
     [
      "阿嘉",
      "11:30",
      "11:45"
     ],
     [
      "座間味",
      "12:00",
      null
     ]
    ],
    "ship": "フェリーざまみ3"
   },
   {
    "days": "daily",
    "stops": [
     [
      "座間味",
      null,
      "15:00"
     ],
     [
      "阿嘉",
      "15:15",
      "15:30"
     ],
     [
      "泊港",
      "17:00",
      null
     ]
    ],
    "ship": "フェリーざまみ3"
   }
  ]
 },
 {
  "id": "south-27",
  "operator": "久米商船",
  "operatorEn": "Kume Shosen",
  "name": "泊港–渡名喜–久米島(兼城)",
  "nameEn": "Tomari (Naha) – Tonaki – Kanegusuku (Kumejima)",
  "url": "https://travel.willer.co.jp/ferry/carrier/88.html",
  "ships": [
   {
    "name": "フェリー琉球",
    "en": "Ferry Ryukyu",
    "mmsi": null
   },
   {
    "name": "フェリー海邦",
    "en": "Ferry Kaiho",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "泊港",
      null,
      "09:00"
     ],
     [
      "渡名喜",
      "10:55",
      "11:10"
     ],
     [
      "兼城(久米島)",
      "12:30",
      null
     ]
    ]
   },
   {
    "days": "sun,tue,wed,thu,fri,sat",
    "stops": [
     [
      "泊港",
      null,
      "14:00"
     ],
     [
      "兼城(久米島)",
      "17:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "兼城(久米島)",
      null,
      "09:00"
     ],
     [
      "渡名喜",
      "10:20",
      "10:35"
     ],
     [
      "泊港",
      "12:30",
      null
     ]
    ]
   },
   {
    "days": "sun,tue,wed,thu,fri,sat",
    "stops": [
     [
      "兼城(久米島)",
      null,
      "14:00"
     ],
     [
      "泊港",
      "17:00",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "south-28",
  "operator": "伊江村",
  "operatorEn": "Ie Village",
  "name": "本部港–伊江港",
  "nameEn": "Motobu – Ie",
  "url": "https://www.iejima.org/",
  "ships": [
   {
    "name": "フェリーぐすく",
    "en": "Ferry Gusuku",
    "mmsi": null
   },
   {
    "name": "フェリーいえしま",
    "en": "Ferry Ieshima",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "伊江",
      null,
      "08:00"
     ],
     [
      "本部",
      "08:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "伊江",
      null,
      "10:00"
     ],
     [
      "本部",
      "10:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "伊江",
      null,
      "13:00"
     ],
     [
      "本部",
      "13:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "伊江",
      null,
      "16:00"
     ],
     [
      "本部",
      "16:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "本部",
      null,
      "09:00"
     ],
     [
      "伊江",
      "09:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "本部",
      null,
      "11:00"
     ],
     [
      "伊江",
      "11:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "本部",
      null,
      "15:00"
     ],
     [
      "伊江",
      "15:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "本部",
      null,
      "17:00"
     ],
     [
      "伊江",
      "17:30",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "south-30",
  "operator": "安栄観光",
  "operatorEn": "Anei Kanko",
  "name": "石垣–竹富・小浜・黒島・西表(大原/上原)・鳩間・波照間",
  "nameEn": "Ishigaki – Taketomi – Kohama – Kuroshima – Ohara (Iriomote) – Uehara (Iriomote) – Hatoma – Hateruma",
  "url": "https://aneikankou.co.jp/timetables",
  "ships": [
   {
    "name": "第九十八あんえい号",
    "en": "Anei No.98",
    "mmsi": null
   },
   {
    "name": "フェリーはてるま2",
    "en": "Ferry Hateruma 2",
    "mmsi": null
   },
   {
    "name": "ぱいかじ",
    "en": "Paikaji",
    "mmsi": null
   }
  ],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "石垣",
      null,
      "07:30"
     ],
     [
      "竹富",
      "07:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "石垣",
      null,
      "09:00"
     ],
     [
      "竹富",
      "09:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "石垣",
      null,
      "10:00"
     ],
     [
      "竹富",
      "10:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "石垣",
      null,
      "11:00"
     ],
     [
      "竹富",
      "11:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "石垣",
      null,
      "12:30"
     ],
     [
      "竹富",
      "12:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "石垣",
      null,
      "15:30"
     ],
     [
      "竹富",
      "15:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "石垣",
      null,
      "16:30"
     ],
     [
      "竹富",
      "16:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "石垣",
      null,
      "17:30"
     ],
     [
      "竹富",
      "17:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "竹富",
      null,
      "07:50"
     ],
     [
      "石垣",
      "08:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "竹富",
      null,
      "09:20"
     ],
     [
      "石垣",
      "09:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "竹富",
      null,
      "10:20"
     ],
     [
      "石垣",
      "10:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "竹富",
      null,
      "11:20"
     ],
     [
      "石垣",
      "11:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "竹富",
      null,
      "12:50"
     ],
     [
      "石垣",
      "13:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "竹富",
      null,
      "14:50"
     ],
     [
      "石垣",
      "15:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "竹富",
      null,
      "15:50"
     ],
     [
      "石垣",
      "16:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "竹富",
      null,
      "16:50"
     ],
     [
      "石垣",
      "17:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "竹富",
      null,
      "17:50"
     ],
     [
      "石垣",
      "18:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "石垣",
      null,
      "09:40"
     ],
     [
      "小浜",
      "10:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "石垣",
      null,
      "11:00"
     ],
     [
      "小浜",
      "11:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "石垣",
      null,
      "14:50"
     ],
     [
      "小浜",
      "15:20",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "石垣",
      null,
      "16:20"
     ],
     [
      "小浜",
      "16:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "小浜",
      null,
      "10:20"
     ],
     [
      "石垣",
      "10:50",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "小浜",
      null,
      "11:40"
     ],
     [
      "石垣",
      "12:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "小浜",
      null,
      "15:30"
     ],
     [
      "石垣",
      "16:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "小浜",
      null,
      "17:00"
     ],
     [
      "石垣",
      "17:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "石垣",
      null,
      "08:00"
     ],
     [
      "黒島",
      "08:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "石垣",
      null,
      "13:30"
     ],
     [
      "黒島",
      "14:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "石垣",
      null,
      "16:00"
     ],
     [
      "黒島",
      "16:30",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "黒島",
      null,
      "08:40"
     ],
     [
      "石垣",
      "09:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "黒島",
      null,
      "14:10"
     ],
     [
      "石垣",
      "14:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "黒島",
      null,
      "16:40"
     ],
     [
      "石垣",
      "17:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "石垣",
      null,
      "08:30"
     ],
     [
      "大原",
      "09:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "石垣",
      null,
      "13:00"
     ],
     [
      "大原",
      "13:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "大原",
      null,
      "09:30"
     ],
     [
      "石垣",
      "10:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "大原",
      null,
      "14:00"
     ],
     [
      "石垣",
      "14:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "石垣",
      null,
      "07:30"
     ],
     [
      "上原",
      "08:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "石垣",
      null,
      "08:30"
     ],
     [
      "上原",
      "09:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "石垣",
      null,
      "13:30"
     ],
     [
      "上原",
      "14:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "石垣",
      null,
      "16:00"
     ],
     [
      "上原",
      "16:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "上原",
      null,
      "08:30"
     ],
     [
      "石垣",
      "09:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "上原",
      null,
      "09:30"
     ],
     [
      "石垣",
      "10:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "上原",
      null,
      "14:30"
     ],
     [
      "石垣",
      "15:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "上原",
      null,
      "17:15"
     ],
     [
      "石垣",
      "18:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "石垣",
      null,
      "08:00"
     ],
     [
      "波照間",
      "09:10",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "石垣",
      null,
      "14:30"
     ],
     [
      "波照間",
      "15:40",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "波照間",
      null,
      "09:50"
     ],
     [
      "石垣",
      "11:00",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "波照間",
      null,
      "16:20"
     ],
     [
      "石垣",
      "17:30",
      null
     ]
    ]
   }
  ]
 },
 {
  "id": "sakurajima",
  "operator": "桜島フェリー",
  "operatorEn": "Sakurajima Ferry",
  "name": "鹿児島–桜島（20分おきとして推定）",
  "nameEn": "Kagoshima – Sakurajima (approx. every 20 min)",
  "url": "https://www.city.kagoshima.lg.jp/sakurajima-ferry/",
  "ships": [],
  "sailings": [
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "06:00"
     ],
     [
      "桜島港",
      "06:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "06:10"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "06:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "06:20"
     ],
     [
      "桜島港",
      "06:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "06:30"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "06:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "06:40"
     ],
     [
      "桜島港",
      "06:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "06:50"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "07:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "07:00"
     ],
     [
      "桜島港",
      "07:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "07:10"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "07:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "07:20"
     ],
     [
      "桜島港",
      "07:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "07:30"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "07:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "07:40"
     ],
     [
      "桜島港",
      "07:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "07:50"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "08:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "08:00"
     ],
     [
      "桜島港",
      "08:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "08:10"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "08:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "08:20"
     ],
     [
      "桜島港",
      "08:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "08:30"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "08:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "08:40"
     ],
     [
      "桜島港",
      "08:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "08:50"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "09:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "09:00"
     ],
     [
      "桜島港",
      "09:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "09:10"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "09:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "09:20"
     ],
     [
      "桜島港",
      "09:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "09:30"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "09:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "09:40"
     ],
     [
      "桜島港",
      "09:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "09:50"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "10:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "10:00"
     ],
     [
      "桜島港",
      "10:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "10:10"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "10:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "10:20"
     ],
     [
      "桜島港",
      "10:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "10:30"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "10:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "10:40"
     ],
     [
      "桜島港",
      "10:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "10:50"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "11:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "11:00"
     ],
     [
      "桜島港",
      "11:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "11:10"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "11:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "11:20"
     ],
     [
      "桜島港",
      "11:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "11:30"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "11:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "11:40"
     ],
     [
      "桜島港",
      "11:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "11:50"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "12:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "12:00"
     ],
     [
      "桜島港",
      "12:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "12:10"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "12:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "12:20"
     ],
     [
      "桜島港",
      "12:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "12:30"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "12:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "12:40"
     ],
     [
      "桜島港",
      "12:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "12:50"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "13:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "13:00"
     ],
     [
      "桜島港",
      "13:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "13:10"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "13:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "13:20"
     ],
     [
      "桜島港",
      "13:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "13:30"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "13:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "13:40"
     ],
     [
      "桜島港",
      "13:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "13:50"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "14:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "14:00"
     ],
     [
      "桜島港",
      "14:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "14:10"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "14:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "14:20"
     ],
     [
      "桜島港",
      "14:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "14:30"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "14:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "14:40"
     ],
     [
      "桜島港",
      "14:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "14:50"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "15:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "15:00"
     ],
     [
      "桜島港",
      "15:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "15:10"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "15:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "15:20"
     ],
     [
      "桜島港",
      "15:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "15:30"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "15:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "15:40"
     ],
     [
      "桜島港",
      "15:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "15:50"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "16:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "16:00"
     ],
     [
      "桜島港",
      "16:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "16:10"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "16:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "16:20"
     ],
     [
      "桜島港",
      "16:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "16:30"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "16:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "16:40"
     ],
     [
      "桜島港",
      "16:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "16:50"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "17:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "17:00"
     ],
     [
      "桜島港",
      "17:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "17:10"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "17:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "17:20"
     ],
     [
      "桜島港",
      "17:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "17:30"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "17:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "17:40"
     ],
     [
      "桜島港",
      "17:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "17:50"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "18:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "18:00"
     ],
     [
      "桜島港",
      "18:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "18:10"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "18:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "18:20"
     ],
     [
      "桜島港",
      "18:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "18:30"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "18:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "18:40"
     ],
     [
      "桜島港",
      "18:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "18:50"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "19:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "19:00"
     ],
     [
      "桜島港",
      "19:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "19:10"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "19:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "19:20"
     ],
     [
      "桜島港",
      "19:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "19:30"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "19:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "19:40"
     ],
     [
      "桜島港",
      "19:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "19:50"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "20:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "20:00"
     ],
     [
      "桜島港",
      "20:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "20:10"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "20:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "20:20"
     ],
     [
      "桜島港",
      "20:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "20:30"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "20:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "20:40"
     ],
     [
      "桜島港",
      "20:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "20:50"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "21:05",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "21:00"
     ],
     [
      "桜島港",
      "21:15",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "21:10"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "21:25",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "21:20"
     ],
     [
      "桜島港",
      "21:35",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "21:30"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "21:45",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "鹿児島港(桜島フェリー)",
      null,
      "21:40"
     ],
     [
      "桜島港",
      "21:55",
      null
     ]
    ]
   },
   {
    "days": "daily",
    "stops": [
     [
      "桜島港",
      null,
      "21:50"
     ],
     [
      "鹿児島港(桜島フェリー)",
      "22:05",
      null
     ]
    ]
   }
  ]
 }
];
