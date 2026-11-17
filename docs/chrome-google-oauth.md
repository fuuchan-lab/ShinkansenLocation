Google Cloud コンソールで、Web アプリ「のりものレーダー」の Google ログイン用 OAuth クライアント ID を作ってください。ブラウザは、すでに私の Google アカウントでログインしている状態です。

## 目的
- 公開中のアプリ https://norimono-radar.doitmyself.net/ に Google ログインを付けます。
- 必要なものは「OAuth クライアント ID」（xxxxx.apps.googleusercontent.com の形）だけです。最後にそれを報告してください。

## 手順
1. https://console.cloud.google.com/ を開く。
2. 新しいプロジェクトを作る。
   - プロジェクト名：Norimono Radar
   - 組織・場所は既定のまま
   - 作ったら、画面上部のプロジェクト選択がこのプロジェクトになっていることを確かめる
3. 「API とサービス」→「ライブラリ」で「Google Drive API」を探して「有効にする」。
4. OAuth 同意画面を作る。画面は「Google Auth Platform」（ブランディング／対象／データアクセス／クライアント）と表示されることがあります。
   - アプリ名：のりものレーダー
   - ユーザーサポートメール：選択肢に出る、ログイン中の自分のアドレス
   - 対象（ユーザーの種類）：外部
   - デベロッパーの連絡先：ログイン中の自分のアドレス
   - アプリのホームページ：https://norimono-radar.doitmyself.net/
   - プライバシーポリシー：https://norimono-radar.doitmyself.net/privacy.html
   - 承認済みドメイン：doitmyself.net
   - スコープ（データアクセス）に次の2つを追加する
     - https://www.googleapis.com/auth/drive.appdata
     - https://www.googleapis.com/auth/userinfo.profile
   - 公開ステータスは「テスト中」のままにする
   - テストユーザーに、ログイン中の自分のアドレスを追加する
5. 「クライアント」（または「認証情報」→「認証情報を作成」→「OAuth クライアント ID」）で作る。
   - アプリケーションの種類：ウェブ アプリケーション
   - 名前：Norimono Radar Web
   - 「承認済みの JavaScript 生成元」に次の3つを追加する
     - https://norimono-radar.doitmyself.net
     - http://localhost:5173
     - http://localhost:4173
   - 「承認済みのリダイレクト URI」は空のまま
6. 作成後に表示される「クライアント ID」を控える。

## 守ること
- 既存のほかのプロジェクト（LeadLog など）は開いたり変更したりしない。必ず新しく作った「Norimono Radar」プロジェクトで作業する。
- 「本番環境に公開」「確認のために送信」は押さない。
- 支払い情報の登録、課金の有効化、有料の API の有効化はしない。求められたら止まって私に聞く。
- 「クライアント シークレット」は報告に書かない。JSON もダウンロードしない。
- 二段階認証・パスワード入力・利用規約への同意を求められたら、止まって私に頼む。
- 画面が手順と違う、名前がすでに使われているなど、迷ったら推測で進めず止まって聞く。

## 報告してほしいこと
- クライアント ID（全文）
- プロジェクト名とプロジェクト ID
- 有効にした API、追加したスコープ、テストユーザー、承認済みの JavaScript 生成元の一覧
- できなかったこと・止まったところがあれば、その画面と理由
