// =====================================
// config.gs（デモ＆本番対応版）
// -------------------------------------
// DEMO_MODE = true で安全に公開可能
// false にすると Spreadsheet に接続して実運用可能
// =====================================

const CONFIG = {
  // 🔹 モード切替
  DEMO_MODE: true, // ← 公開用は true、本番接続は false に

  // 🔹 Spreadsheet 情報（本番用は自分のIDを入れる）
  SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID_HERE',
  SHEET_NAME: '管理システム',

  // 🔹 ステータス定義
  STATUS: {
    NEW: "新規申請",
    IN_PROGRESS: "処理中",
    DOCUMENT_CHECK: "書類確認中",
    WAITING_SUBMISSION: "提出待ち",
    SUBMITTED: "提出済み",
    COMPLETED: "完了"
  },

  STATUS_MAP: {
    'IN_PROGRESS': '処理中',
    'DOCUMENT_CHECK': '書類確認中',
    'WAITING_SUBMISSION': '提出待ち',
    'SUBMITTED': '提出済み',
    'COMPLETED': '完了'
  },

  // 🔹 サンプルデータ（デモ時に使用）
  SAMPLE_NAMES: [
    "田中太郎", "鈴木花子", "佐藤次郎", "山田美咲",
    "伊藤健一", "渡辺愛", "中村隆", "小林優",
    "加藤浩", "吉田真理"
  ],

  // 🔹 Discord通知設定（デモでは無効）
  DISCORD: {
    USERNAME: "在留管理システム（デモ）",
    AVATAR_URL: "https://i.imgur.com/demo.png"
  }
};
