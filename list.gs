/** @OnlyCurrentDoc */
function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const values = sheet.getDataRange().getDisplayValues();
  const headers = values.shift();
  const rows = values
    .filter(row => row.some(cell => cell !== ''))
    .map(row => Object.fromEntries(headers.map((header, index) => [header, row[index] || ''])));

  return ContentService
    .createTextOutput(JSON.stringify(rows))
    .setMimeType(ContentService.MimeType.JSON);
}
