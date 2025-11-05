// =====================================
// backend.gs（最終安定版）
// -------------------------------------
// ✅ DEMO_MODE=true ならSpreadsheetアクセスせず安全動作
// ✅ DEMO_MODE=false なら実運用モードでデータ操作可能
// =====================================

function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('在留管理システム（デモ）')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// -------------------------------------
// デモモード制御
// -------------------------------------
function isDemoMode() {
  return CONFIG.DEMO_MODE === true;
}

// -------------------------------------
// 申請登録（新規申請）
// -------------------------------------
function submitApplication(formData) {
  if (isDemoMode()) {
    Logger.log('デモモード：submitApplication スキップ');
    return {
      success: true,
      applicationId: 'ZC-DEMO0001',
      message: 'デモモード：登録テスト成功（実データは保存されません）'
    };
  }

  try {
    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    if (!sheet) throw new Error('シートが見つかりません');

    const applicationId = generateApplicationId(sheet);
    const now = new Date();
    const newRow = [
      applicationId,
      formData.name,
      formData.applicationType,
      formData.currentStatus,
      formData.expiryDate,
      now,
      CONFIG.STATUS.NEW
    ];

    sheet.appendRow(newRow);
    return { success: true, applicationId, message: '申請を登録しました。' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// -------------------------------------
// 申請一覧取得（Spreadsheetなしでもデモ可）
// -------------------------------------
function getApplications() {
  try {
    // 🔹 デモモード：固定サンプルデータを返す
    if (isDemoMode()) {
      return CONFIG.SAMPLE_NAMES.map((name, i) => ({
        id: `ZC-25${String(i + 1).padStart(4, '0')}`,
        name,
        type: ['在留カード更新', '資格変更', '在留期間更新'][i % 3],
        currentStatus: '技術・人文知識・国際業務',
        expiryDate: `2025-${(i % 12 + 1).toString().padStart(2, '0')}-15`,
        submitDate: '2025-11-05',
        status: CONFIG.STATUS.NEW
      }));
    }

    // 🔹 通常モード：Spreadsheetから取得
    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    if (!sheet) throw new Error('シートが見つかりません');

    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) return [];

    const data = sheet.getRange(2, 1, lastRow - 1, 7).getValues();
    return data.map(row => ({
      id: row[0],
      name: row[1],
      type: row[2],
      currentStatus: row[3],
      expiryDate: formatDateString(row[4]),
      submitDate: formatDateString(row[5]),
      status: row[6]
    }));
  } catch (e) {
    Logger.log('getApplications() error: ' + e.message);
    return []; // デモ時・失敗時でもUIが止まらない
  }
}

// -------------------------------------
// 状態更新
// -------------------------------------
function updateApplicationStatus(applicationId, newStatusKey) {
  if (isDemoMode()) {
    Logger.log(`デモモード: 状態更新スキップ (${applicationId}, ${newStatusKey})`);
    return { success: true, message: 'デモモード: 状態更新テスト成功' };
  }

  try {
    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === applicationId) {
        sheet.getRange(i + 1, 7).setValue(CONFIG.STATUS_MAP[newStatusKey]);
        return { success: true };
      }
    }
    return { success: false, error: '対象データが見つかりません。' };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// -------------------------------------
// メール送信（デモモードではログのみ）
// -------------------------------------
function sendResultEmail(to, subject, body) {
  if (isDemoMode()) {
    Logger.log(`デモモード: メール送信スキップ (${to})`);
    return {
      success: true,
      message: 'デモモード: メール送信スキップ'
    };
  }

  try {
    MailApp.sendEmail({
      to,
      subject,
      body,
      name: '在留管理システム'
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// -------------------------------------
// 日付整形ヘルパー
// -------------------------------------
function formatDateString(date) {
  if (!date) return '';
  if (date instanceof Date) {
    return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  }
  return date.toString().split('T')[0];
}

// -------------------------------------
// 申請ID自動生成
// -------------------------------------
function generateApplicationId(sheet) {
  const lastRow = sheet.getLastRow();
  const seq = lastRow > 1 ? lastRow - 1 : 1;
  const year = new Date().getFullYear().toString().slice(-2);
  return `ZC-${year}${String(seq).padStart(4, '0')}`;
}
