# アプリ化の準備メモ（iOS / Android）

今は PWA（ホーム画面に追加できる Web アプリ）として動く。ストアに出すアプリにするときの方針と、先にやっておいたこと。

## 方針: Capacitor で今のコードをそのまま包む
- 地図・画面は今の Vite + TypeScript + MapLibre のまま使える。書き直さない。
- `npm i @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android` → `npx cap init` → `npx cap add ios/android`。`webDir` は `dist`。
- ビルドしたファイルをアプリに同梱するので、オフラインでも開く（Service Worker は不要になるが、ブラウザ版のために残す）。

## 準備できていること
- PWA: manifest（`display: standalone`、アイコン 192/512、`id`、`categories`）
- オフライン: Service Worker（`public/sw.js`）。アプリ本体・時刻表データ・見た地図を端末にためる（上限 1500 枚）
- 画面の切り欠き・ホームバーへの対応（`viewport-fit=cover` と `env(safe-area-inset-*)`）
- 中継サーバー（Cloudflare Workers）は `VITE_LIVE_API` で切り替え。アプリ側の作りは変えなくてよい

## アプリにするときの課題（要判断）
1. **Google ログイン**: 今は Google のブラウザ用の方式（GIS）。アプリ内の画面（WebView）の原点は `capacitor://localhost` や `https://localhost` になり、**Google Cloud コンソールの「承認済みの JavaScript 生成元」に追加が必要**。または各 OS 用のログイン（ネイティブ SDK）に切り替える。コンソールの設定は作者が Chrome の Claude に頼む。
2. **中継サーバーの CORS**: 同梱したアプリからの呼び出しの `Origin`（`capacitor://localhost`、`https://localhost`）を、`worker/` で許可する。
3. **現在地**: `@capacitor/geolocation` に置き換える（WebView でも動くが、許可の文言を OS の設定に書く必要がある）。
4. **ストアの審査**:
   - Apple: Apple Developer Program（年 99 ドル）。「ただの Web サイトを包んだだけ」は審査で落ちやすいので、オフライン・通知など、アプリらしい機能を足す。
   - Google Play: 開発者登録（初回 25 ドル）。個人アカウントは、公開前に 12 人以上で 14 日間のテストが必要。
   - 両方: プライバシーポリシー（`public/privacy.html`）の URL とデータの扱いの申告。
5. **データの権利**: 時刻表のデータの扱い（`docs/inquiry-timetable.md`）、ODPT の規約（アプリでの再配布・出典表示）を、ストアに出す前に確認する。
6. **広告・課金**: なし。寄付の PayPal リンクは、Apple のルールで「アプリ内の寄付」が制限されることがある。アプリ版では外すか、審査の規約を確認する。

## 次にやること（作者の了承を得てから）
- [ ] Capacitor を入れて、Android の実機で確かめる（Android Studio が必要）
- [ ] アイコン（maskable、Android の adaptive）とスプラッシュ画像の作成
- [ ] 中継サーバーの CORS の許可リストに、アプリの Origin を足す
- [ ] ログイン方式の決定（GIS のまま / ネイティブ）
