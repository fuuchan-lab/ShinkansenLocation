# 新幹線ロケーション

日本のすべての新幹線の「いまどこを走っているか」を地図に表示する Web アプリです。スマホでの表示を基本にしていて、PC のブラウザでも使えます。

> **注意**: 列車の位置は、運転パターンから作った**推定時刻表**をもとに計算しています。実際のダイヤ・遅延・運休は反映されず、号数も実際とは異なります。実際の運行状況は各社の公式情報で確認してください。

## 対象路線

東海道・山陽・九州・西九州・東北・北海道・上越・北陸・山形・秋田新幹線

## 機能

- 対象範囲は、陸地を含む日本の排他的経済水域（[海上保安庁の領海等概念図](https://www1.kaiho.mlit.go.jp/ryokai/gainenzu.html)に合わせ、北方領土・竹島・尖閣諸島の周辺と日韓共同開発区域を含み、範囲内の抜けも含める）。境界を破線で示し、範囲外は白く隠す。飛行機と船は範囲内のものだけを表示する
- 端末の現在地を表示し、起動時は現在地を少し拡大して表示する（位置情報が使えないときは日本全体）
- 各路線をテーマカラーの太線で表示する
- 新幹線の駅と空港をアイコンで表示する
- 列車は、走っている路線の色の細い三角形で、進行方向を向けて表示する
- 列車の位置は時刻表から1分ごとに推定し直す。その間は推定速度で線路上を動かす
- 駅に停車中の列車は、のりば（番線）のように並べる（推定）。始発駅では発車8分前から、終着駅では到着後5分間表示する
- 列車をタップすると、行先・次の停車駅・停車駅の時刻・推定速度を表示し、列車を追従する。各社の公式運行情報へのリンクも出す
- 駅をタップすると、その駅の時刻表（下り・上り）を表示する。現在の時間帯を強調し、現在時刻の位置に線を引いて自動でスクロールする
- 日本周辺を飛行中の飛行機を、国内線は黄色・国際線はピンクのアイコンで、機首を進行方向に向けて表示する。国内線・国際線それぞれ表示を切り替えられる
- 日本近海の旅客船を、上から見た船の形の濃い水色のアイコンで、船首を進行方向に向けて表示する（表示を切り替えられる）
- 路線ごとに表示を切り替える
- 表示時刻を指定し、×10・×60 で早送りする（夜間の確認用）

## 開発

```sh
npm install
npm run dev      # http://localhost:5173/ShinkansenLocation/
npm run build    # dist/ に出力
```

`main` ブランチに push すると、GitHub Actions が GitHub Pages にデプロイします。リポジトリの Settings → Pages の「Source」を **GitHub Actions** にしてください。

## データの作り方

`public/data/` の JSON はスクリプトで生成し、リポジトリにコミットしています。

| ファイル | 内容 | 生成コマンド |
|---|---|---|
| `network.json` | 路線形状・駅の距離程・直通経路 | `npm run data:network -- <N02のUTF-8フォルダ>` |
| `airports.json` | 空港の位置 | `node scripts/build-airports.mjs <C28のUTF-8フォルダ>` |
| `timetable.json` | 推定時刻表 | `npm run data:timetable` |
| `area.json` | 対象範囲（陸地を含む日本の EEZ）。範囲外を隠すマスクはブラウザでこれから作る | `node scripts/build-area.mjs <EEZ の GeoJSON>` |

- 路線・駅: [国土数値情報 鉄道データ（N02）](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N02-2024.html)。zip を展開した `UTF-8` フォルダを指定します。
- 空港: [国土数値情報 空港データ（C28）](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-C28-2021.html)
- 排他的経済水域: [Marine Regions](https://www.marineregions.org/)（World EEZ, CC BY 4.0）。取得方法は `scripts/build-area.mjs` の先頭にあります
- 運転パターン（停車駅・本数・速度）は `scripts/services.config.mjs` で調整します。路線の駅順と色は `scripts/lines.config.mjs` にあります。

### 推定の方法

1. 駅間距離を、列車種別の最高速度と路線ごとの速度上限で割って走行時間を出す。発車時の加速と到着時の減速の分の時間を足す
2. 停車駅では、種別ごとの停車時間（分割・併合や折り返しの駅は長め）を足す
3. 地図上では、時刻表の通過時刻の間を補間して位置を出す。発車直後と到着前は加減速のカーブにする

`timetable.json` は、停車パターン（58種類）と各列車の号数・発車時刻に分けて保存し、ブラウザで列車ごとの時刻に展開します（862本で約29KB）。実際の時刻表データを使う場合は、`trains` に列車ごとの時刻を直接書いても読み込めます。形式は `scripts/generate-timetable.mjs` の先頭に書いてあります。

## 飛行機・旅客船のデータ（Cloudflare Worker）

ブラウザから直接呼べる（CORS 対応の）無料の API がないため、`worker/` の Cloudflare Worker が中継します。どちらも結果を30秒キャッシュし、閲覧者が何人いても上流へのアクセスは30秒に1回です。

**飛行機**（`/aircraft`）
- [adsb.lol](https://adsb.lol)（ODbL）から日本周辺を半径250海里の円12個に分けて取得し、まとめて返す（同時に4件まで。半分以上失敗したときは直近の結果を返す）
- 国内線・国際線の判定:
  - JAL・ANA・Peach・Jetstar Japan のように両方を飛ぶ会社の便だけ、[adsbdb](https://www.adsbdb.com) で経路を照会する
  - 外国の航空会社は国際線、国内専用の会社は国内線とする
- 1回の実行で外部へ出すリクエストは最大46件（無料プランの上限50件）

**旅客船**（`/ships`）
- Durable Object が [aisstream.io](https://aisstream.io) に常時接続し、日本近海の AIS を受け取る
- 船種（60〜69 = 旅客船）は位置とは別に約6分おきに届くため、旅客船だと分かった船から順に表示される。分かった船名・船種は保存し、再接続後すぐ使う
- 誰も見ていない状態が10分続くと接続を切る（無料枠の節約）。次のアクセスで再接続する

```sh
cd worker
npm install
node test/run-local.mjs   # http://localhost:8787（Node.js だけで動く簡易版。.dev.vars がなければ船は疑似データ）
npx wrangler login        # 初回のみ
npx wrangler secret put AISSTREAM_API_KEY   # aisstream.io の API キー（初回のみ）
npm run deploy
```

デプロイ後に表示される URL を、リポジトリ直下の `.env.production` の `VITE_LIVE_API` に書きます（末尾の `/` なし）。未設定の場合、飛行機・旅客船のレイヤーは表示されません。

## 構成

```
scripts/   データ生成（Node.js）
src/       フロントエンド（Vite + TypeScript + MapLibre GL JS）
  data.ts      データの型・経路ジオメトリ
  simulate.ts  時刻から列車位置を計算
  icons.ts     駅・空港アイコン
  aircraft.ts  飛行機の取得・位置の推定
  ships.ts     旅客船の取得・位置の推定
  main.ts      地図・UI
worker/    飛行機・旅客船のデータを中継する Cloudflare Worker
```

## 出典・クレジット

- 地図: [国土地理院 地理院タイル（淡色地図）](https://maps.gsi.go.jp/development/ichiran.html)
- 路線・駅・空港: 「国土数値情報（鉄道データ・空港データ）」（国土交通省）を加工して作成
- 排他的経済水域: Flanders Marine Institute (VLIZ), Marine Regions, World EEZ（CC BY 4.0）を加工して作成
- 航空機: adsb.lol（ODbL）、経路: adsbdb / 船: aisstream.io
- 地図ラベルのフォント: [OpenFreeMap](https://openfreemap.org/)
