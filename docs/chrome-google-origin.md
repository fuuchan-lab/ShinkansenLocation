Google Cloud コンソールで、Web アプリ「のりものレーダー」の Google ログイン（OAuth クライアント）に、アプリ版（Android）の生成元を1つ足してください。ブラウザは、すでに私の Google アカウントでログインしている状態です。

## 目的
- 今後 Android アプリにするとき、アプリ内の画面の生成元が `https://localhost` になります。Google ログインを使うには、これを「承認済みの JavaScript 生成元」に足す必要があります。
- 既存の設定（本番の https://norimono-radar.doitmyself.net など）は、そのまま残します。

## 手順
1. https://console.cloud.google.com/ を開く。
2. 上のプロジェクト選択で、のりものレーダー（Norimono Radar。LeadLog と同じプロジェクトの場合もある）の Google ログイン用のプロジェクトを選ぶ。どれか迷ったら、推測で選ばず、止まって私に聞く。
3. 「APIとサービス」→「認証情報」を開く。
4. 「OAuth 2.0 クライアント ID」の一覧から、種類が「ウェブ アプリケーション」で、すでに `https://norimono-radar.doitmyself.net` が生成元に入っているものを開く。
5. 「承認済みの JavaScript 生成元」に、次を1行足す。既存の行は変えない。
   - `https://localhost`
6. 「保存」を押す。反映に数分かかる、という表示が出たら、そのまま報告する。

## 守ること
- 足すのは `https://localhost` の1行だけ。ほかの項目（リダイレクト URI、スコープ、公開ステータス、同意画面）は変えない。
- クライアントシークレットやトークンを、画面に出ていても、チャットに書き写さない。
- `capacitor://localhost` は Google が受け付けないので、入れようとしない。
- 迷ったら推測で進めず、止まって私に聞く。

## 報告してほしいこと
- 保存できたか
- 「承認済みの JavaScript 生成元」の保存後の一覧（URL だけ。クライアント ID の全文は書かない）
