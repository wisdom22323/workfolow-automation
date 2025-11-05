// =====================================
// backend.gs（デモ公開用・安全版）
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
// 申請登録
// -------------------------------------
function submitApplication(formData) {
  if (isDemoMode()) {
    Logger.log('デモモード：データ保存スキップ');
    return { success: true, applicationId: 'ZC-DEMO0001', message: 'デモモード：実際の登録は行われません' };
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
    return { success: true, applicationId: applicationId, message: '申請を登録しました' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// -------------------------------------
// 申請一覧取得
// -------------------------------------
function getApplications() {
  try {
    if (isDemoMode()) {
      // デモ表示用のサンプルデータを返す
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
    throw new Error('データ取得エラー: ' + e.message);
  }
}

// -------------------------------------
// 状態更新（デモではログのみ）
// -------------------------------------
function updateApplicationStatus(applicationId, newStatusKey) {
  if (isDemoMode()) {
    Logger.log(`デモモード: 状態更新スキップ (${applicationId}, ${newStatusKey})`);
    return { success: true };
  }
  return { success: false, error: 'この環境では更新できません（デモモード）' };
}

// -------------------------------------
// メール送信（デモではスキップ）
// -------------------------------------
function sendResultEmail(to, subject, body) {
  if (isDemoMode()) {
    Logger.log(`デモモード: メール送信スキップ (${to})`);
    return { success: true };
  }
  try {
    MailApp.sendEmail({ to, subject, body, name: '在留管理システム（デモ）' });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// -------------------------------------
// ヘルパー関数
// -------------------------------------
function formatDateString(date) {
  if (!date) return '';
  if (date instanceof Date) {
    return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  }
  return date.toString().split('T')[0];
}

function generateApplicationId(sheet) {
  const lastRow = sheet.getLastRow();
  const seq = lastRow > 1 ? lastRow - 1 : 1;
  const year = new Date().getFullYear().toString().slice(-2);
  return `ZC-${year}${String(seq).padStart(4, '0')}`;
}
