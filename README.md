# 在留管理システム（Google Apps Script デモ）

Google Apps Script + スプレッドシートで構築した「在留管理システム」デモ版です。
申請管理・検索・状態更新・メール通知までを GAS のみで完結させた WebApp です。

---

## 🚀 概要

このシステムは、以下のような目的で設計されています：

* 在留カードや資格申請などの「申請情報」をスプレッドシートで一元管理
* Web フォームからの申請登録
* 一覧・検索・状態更新機能
* メールによる通知送信（デモでは無効化）

---

## 🧩 主な構成ファイル

| ファイル                       | 役割                         |
| -------------------------- | -------------------------- |
| `config.gs`                | 設定（スプレッドシートID・ステータス定義など）   |
| `backend.gs`               | GAS バックエンド（フォーム処理・データ取得など） |
| `index.html`               | Web UI メイン                 |
| `projectk_javascript.html` | フロントエンド JS ロジック            |
| `projectk_stylesheet.html` | UI スタイル定義                  |

---

## ⚙️ 動作デモ

👉 **[在留管理システム デモページ（Google Apps Script）]([https://script.google.com/macros/s/AKfycb-your-demo-url/exec](https://script.google.com/macros/s/AKfycbzVsQipFXQJcs78PfVRuiAGbsMs0oUZGU7pxmhtNnwM4Yl5LppeUXWHJ0heSw4GXG-b/exec))**

> ※ このリンクはデモ専用アカウント・スプレッドシートで動作しています。
> ※ 入力内容は保存されず、自動的に破棄されます。

---

## 🔒 セキュリティについて

このリポジトリは安全なポートフォリオ公開を目的としています。
以下の点に注意して構成されています：

* ✅ **本番スプレッドシートID・Discord URL・メールアドレスは含まれていません**
* ✅ `DEMO_MODE` が `true` の場合、実際のデータ書き込み・メール送信は行われません
* ✅ GAS Script Properties に機密情報を登録する方式を推奨（`DISCORD_WEBHOOK_URL` など）

---

## 🧠 使用技術

* Google Apps Script (GAS)
* Google Spreadsheet
* HTML5 / CSS3
* Vanilla JavaScript
* Material Design風スタイル構成

---

## 🪄 セットアップ手順

1. 新しい Google Apps Script プロジェクトを作成
2. このリポジトリ内の `.gs` / `.html` ファイルをすべて貼り付け
3. 自分のスプレッドシートを作成し、`config.gs` にその ID を設定
4. 「デプロイ」→「新しいデプロイ」→「ウェブアプリ」でデプロイ

   * 実行するユーザー：自分
   * アクセスできるユーザー：リンクを知っている全員
5. デモモードを無効化したい場合は `CONFIG.DEMO_MODE = false` に変更

---

## 🧾 注意事項

* 本リポジトリのコードは **ポートフォリオ用** です。
* 実運用時はデータ保護・認証設定を行ってください。
* 無断転用・スプレッドシートIDの公開は禁止です。

---

## ✉️ 作者連絡先

ポートフォリオ制作者：**Demo User（丘 智恵）**
GitHub: [wisdom22323](https://github.com/wisdom22323)
E-mail: [wisdom22323@gmail.com](mailto:wisdom22323@gmail.com)
