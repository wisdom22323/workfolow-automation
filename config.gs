// =====================================
// config.gs（デモ公開用・安全版）
// =====================================

const CONFIG = {
  // 🔹 デモ専用スプレッドシートID（ダミー値を入れておき、READMEで入れ替え案内）
  SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID_HERE',

  // 🔹 シート名
  SHEET_NAME: '管理システム',

  // 🔹 デモモードON（trueのときはデータを書き込まない）
  DEMO_MODE: true,

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

  // 🔹 サンプルデータ（デモ表示用）
  SAMPLE_NAMES: [
    "田中太郎", "鈴木花子", "佐藤次郎", "山田美咲", "伊藤健一",
    "渡辺愛", "中村隆", "小林優", "加藤浩", "吉田真理"
  ],

  // 🔹 Discord通知設定（デモでは無効化）
  DISCORD: {
    USERNAME: "在留管理システム（デモ）",
    AVATAR_URL: "https://i.imgur.com/demo.png"
  }
};
