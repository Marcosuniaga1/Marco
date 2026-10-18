/**
 * Registro de compradores — Montreal se levanta por La Guaira
 *
 * Instalación (una sola vez):
 * 1. En el Google Sheet: Extensiones → Apps Script. Borra lo que haya y pega este archivo completo.
 * 2. Cambia SECRET por una clave larga (la misma va en Vercel como SHEET_WEBHOOK_SECRET).
 * 3. Arriba, elige la función "setup" y pulsa Ejecutar. Acepta los permisos.
 * 4. Implementar → Nueva implementación → tipo "Aplicación web".
 *    Ejecutar como: Yo. Quién tiene acceso: Cualquier usuario.
 * 5. Copia la URL que termina en /exec: va en Vercel como SHEET_WEBHOOK_URL.
 * Si cambias este código después: Implementar → Gestionar implementaciones → Editar → Nueva versión.
 */

const SECRET = 'CAMBIA-ESTO-POR-UNA-CLAVE-LARGA';

const TABS = { '7pm': 'Show 7PM', '9pm': 'Show 9PM' };
const HEADERS = [
  'Fecha de pago', 'Código de entrada', 'Nombre', 'Apellido', 'Correo', 'WhatsApp',
  'Dirección de entrega', '¿Regalo?', 'Recibe la agenda', 'Monto (CAD)', 'ID de pago Stripe', 'Asistió',
];
const FIELDS = [
  'paidAt', 'ticketCode', 'firstName', 'lastName', 'email', 'whatsapp',
  'address', 'gift', 'recipient', 'amountCad', 'stripeId',
];
const STRIPE_ID_COL = 11;
const CHECKBOX_COL = 12;

function setup() {
  Object.keys(TABS).forEach(getTab_);
}

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply_({ ok: false, error: 'bad json' });
  }
  if (!body || body.secret !== SECRET) return reply_({ ok: false, error: 'unauthorized' });

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    if (body.action === 'append') return reply_(append_(body.show, body.row || {}));
    if (body.action === 'count') return reply_({ ok: true, counts: { '7pm': count_('7pm'), '9pm': count_('9pm') } });
    return reply_({ ok: false, error: 'unknown action' });
  } catch (err) {
    return reply_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function append_(show, row) {
  const sheet = getTab_(show);
  const last = sheet.getLastRow();
  if (last > 1 && row.stripeId) {
    const ids = sheet.getRange(2, STRIPE_ID_COL, last - 1, 1).getValues().map(function (r) { return r[0]; });
    if (ids.indexOf(row.stripeId) !== -1) return { ok: true, duplicate: true };
  }
  sheet.appendRow(FIELDS.map(function (f) { return row[f] === undefined ? '' : row[f]; }));
  sheet.getRange(sheet.getLastRow(), CHECKBOX_COL).insertCheckboxes();
  return { ok: true };
}

function count_(show) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TABS[show]);
  return sheet ? Math.max(sheet.getLastRow() - 1, 0) : 0;
}

function getTab_(show) {
  const name = TABS[show];
  if (!name) throw new Error('unknown show: ' + show);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold').setBackground('#efe9ff');
    sheet.setFrozenRows(1);
    sheet.getRange('A2:I').setNumberFormat('@');
    sheet.getRange('K2:K').setNumberFormat('@');
    sheet.setColumnWidth(7, 320);
  }
  return sheet;
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
