# のりものレーダー（Norimono Radar）— プロジェクトの指示

日本の新幹線（推定位置）・日本の上空の飛行機・近海の旅客船を地図に表示する Web アプリ。
公開先: https://fuuchan-lab.github.io/norimono-radar/ （リポジトリ: fuuchan-lab/norimono-radar）

指示は、チャットのほか、アプリの「このアプリについて」→「要望・不具合を送る」から GitHub の Issue としても届く（作成画面が本文入りで開く。送信には GitHub へのログインが必要）。
Issue は自動では処理されない。「Issue を見て」と言われたら `gh issue list` で未対応を確認し、このファイルに従って対応して、終わったら Issue に結果を書いて閉じる。

## やりとり
- 日本語で答える。作者（Harry）はスマホでの見た目を重視する
- 指示があいまいなときは、いちばん自然な解釈で進め、解釈を最初に一言書く
- 実際に動かして確かめてから報告する（Playwright でのスクリーンショットなど）。確かめていないことは、そう書く

## 構成
- フロントエンド: Vite + TypeScript + MapLibre GL（`src/`）。GitHub Pages に、`main` への push で GitHub Actions がデプロイ
- 飛行機・旅客船の中継: Cloudflare Workers（`worker/`、無料プラン）。`cd worker && npx wrangler deploy`
- データ: `public/data/*.json` はスクリプト（`scripts/`）で生成してコミットする。手で編集しない
- 詳細は README.md

## 守ること（これまでの指示）
- スマホを基本に、PC のブラウザでも使えるレスポンシブ表示
- 日本語・英語の両方に対応する。画面の文言は `src/i18n.ts`、駅名・空港名などの英語は `src/names-en.ts` に足す。`index.html` の固定の文言は `data-lang="ja"` / `data-lang="en"` の両方を書く
- 表示範囲は、陸地を含む日本の排他的経済水域（海上保安庁の領海等概念図に合わせる）。範囲外は白。飛行機・船も範囲内だけ
- アイコン: 新幹線は路線の色の細い三角、飛行機は国内線が黄色・国際線がピンク、旅客船は濃い水色の上から見た船。どれも進行方向を向け、白い縁取り。トラッキング中のものは縁取りを太く
- 時刻表は推定。実際のダイヤではないことを画面に明記する
- 飛行機・船・駅の情報シートは、駅の時刻表と同じ雰囲気でそろえる
- ログインは Google（GIS のトークン方式）。保存先は利用者の Google ドライブのアプリ専用領域。ゲストは閲覧のみ。今後、個人の API キーも同じ場所に保存する
- 個人の情報の扱いを変えたら `public/privacy.html`（日本語・英語）も直す
- Cloudflare は無料枠に収める（1 回の実行の外部リクエストは 50 件まで、Durable Object の使用量に注意）

## 秘密の情報
- aisstream.io の API キーは Cloudflare の secret `AISSTREAM_API_KEY` と `worker/.dev.vars`（gitignore 済み）にある。値を表示・コミットしない
- Google の OAuth クライアント ID は公開してよい値（`.env.production` の `VITE_GOOGLE_CLIENT_ID`）

## コード
- 周りのコードに合わせる（コメントは日本語、命名・書き方も既存に合わせる）
- 変更後は `npm run build`（型チェックを含む）が通ることを確かめる
- コミットメッセージは日本語で、何を・なぜを短く
