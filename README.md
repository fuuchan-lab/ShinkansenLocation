# 新幹線ロケーション

日本のすべての新幹線の「いまどこを走っているか」を地図に表示する Web アプリです。スマホでの表示を基本にしていて、PC のブラウザでも使えます。

> **注意**: 列車の位置は、運転パターンから作った**推定時刻表**をもとに計算しています。実際のダイヤ・遅延・運休は反映されず、号数も実際とは異なります。実際の運行状況は各社の公式情報で確認してください。

## 対象路線

東海道・山陽・九州・西九州・東北・北海道・上越・北陸・山形・秋田新幹線

## 機能

- 各路線をテーマカラーの太線で表示する
- 新幹線の駅と空港をアイコンで表示する
- 列車を種別ごとに色分けし、0.5秒ごとに位置を更新する
- 列車をタップすると、行先・次の停車駅・停車駅の時刻・推定速度を表示し、列車を追従する。各社の公式運行情報へのリンクも出す
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

- 路線・駅: [国土数値情報 鉄道データ（N02）](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N02-2024.html)。zip を展開した `UTF-8` フォルダを指定します。
- 空港: [国土数値情報 空港データ（C28）](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-C28-2021.html)
- 運転パターン（停車駅・本数・速度）は `scripts/services.config.mjs` で調整します。路線の駅順と色は `scripts/lines.config.mjs` にあります。

### 推定の方法

1. 駅間距離を、列車種別の最高速度と路線ごとの速度上限で割って走行時間を出す。発車時の加速と到着時の減速の分の時間を足す
2. 停車駅では、種別ごとの停車時間（分割・併合や折り返しの駅は長め）を足す
3. 地図上では、時刻表の通過時刻の間を補間して位置を出す。発車直後と到着前は加減速のカーブにする

実際の時刻表データを使う場合は、`timetable.json` を同じ形式で作れば、フロントエンドを変えずに差し替えられます。形式は `scripts/generate-timetable.mjs` の先頭に書いてあります。

## 構成

```
scripts/   データ生成（Node.js）
src/       フロントエンド（Vite + TypeScript + MapLibre GL JS）
  data.ts      データの型・経路ジオメトリ
  simulate.ts  時刻から列車位置を計算
  icons.ts     駅・空港アイコン
  main.ts      地図・UI
```

## 出典・クレジット

- 地図: [国土地理院 地理院タイル（淡色地図）](https://maps.gsi.go.jp/development/ichiran.html)
- 路線・駅・空港: 「国土数値情報（鉄道データ・空港データ）」（国土交通省）を加工して作成
- 地図ラベルのフォント: [OpenFreeMap](https://openfreemap.org/)
