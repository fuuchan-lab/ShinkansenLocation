# のりものレーダー Android（Play Store 用 TWA パッケージ）

Bubblewrap で作った Trusted Web Activity。アプリ本体は https://norimono-radar.doitmyself.net/ の PWA で、
サイトを更新すれば、Android アプリも自動で最新になる（Play への再提出は不要）。

## 作り直し（Windows / PowerShell）
```powershell
$env:JAVA_HOME = "C:\Users\user\.bubblewrap\jdk-17.0.20.1+1"
$env:Path = "$env:JAVA_HOME\bin;C:\Program Files\nodejs;C:\Users\user\ShinkansenLocation\android;$env:Path"   # android を PATH に足すのは gradlew.bat を見つけさせるため
$pw = (Get-Content C:\Users\user\.bubblewrap\keys\norimono-keystore-password.txt -Raw).Trim()
$env:BUBBLEWRAP_KEYSTORE_PASSWORD = $pw; $env:BUBBLEWRAP_KEY_PASSWORD = $pw
cd C:\Users\user\ShinkansenLocation\android
# 新しい版を出す時は twa-manifest.json の appVersionCode を 1 つ増やす（appVersionName は自由）
C:\Users\user\.bubblewrap\cli\node_modules\.bin\bubblewrap.cmd update --skipVersionUpgrade
C:\Users\user\.bubblewrap\cli\node_modules\.bin\bubblewrap.cmd build --skipPwaValidation      # → app-release-bundle.aab（Play にアップロード） / app-release-signed.apk（実機テスト）
```

## 署名鍵（アップロード鍵）
- ファイル: `C:\Users\user\.bubblewrap\keys\norimono-upload.keystore`（別名 norimono）、パスワードは同じフォルダーの `norimono-keystore-password.txt`
- **この2つは Git に入れない。必ず別の場所にもバックアップする**（紛失すると更新を出せなくなる）
- Play アプリ署名を使うので、配布用の本当の署名鍵は Google が管理する。この鍵は「アップロード用」
- SHA-256: A2:24:58:A7:F6:29:5E:E0:F3:10:34:E5:21:E5:20:29:AC:A9:B8:C8:11:EC:5D:F6:AA:C5:06:42:22:BF:45:17

## サイトとの紐づけ（Digital Asset Links）
`public/.well-known/assetlinks.json` に、上のアップロード鍵の SHA-256 が入っている（実機に APK を直接入れて試す時に必要）。
Play に上げた後は、Play Console の「アプリの完全性 → アプリの署名」に表示される
**アプリ署名鍵の SHA-256** を、同じ配列に追加して再デプロイする（これが無いとアドレスバーが出てしまう）。

## アプリの中だけの違い
- 起動した最初の読み込みで referrer が `android-app://` になるのを見て、アプリの中だと判定する（`src/main.ts` の `markAndroidApp`）。
  判定は sessionStorage に覚え、ヘルプ（`public/help.html`）も同じ印を見る。
- アプリの中では、寄付（PayPal）への案内を出さない（Google Play の決済の決まりのため）。

## Play Store 掲載用
`store/` に掲載文（listing-ja.md）、フィーチャーグラフィック、アイコン、スクリーンショットがある。

## 公開までの流れ（個人の開発者アカウント）
1. Play Console でアプリを作成し、`app-release-bundle.aab` を「クローズドテスト」に上げる
2. 2023年11月以降に作った個人アカウントは、製品版の前に **12 人以上のテスターで 14 日間** のクローズドテストが必要
3. アプリ署名鍵の SHA-256 を `assetlinks.json` に足して公開する
4. 期間が過ぎたら、製品版の申請をする
