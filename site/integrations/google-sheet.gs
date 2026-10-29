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

// El sitio revisa este número antes de escribir; súbelo cuando cambie lo que el sitio envía.
const SCRIPT_VERSION = 2;

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

// Pagos en efectivo: cada enlace de un solo uso es una fila de esta pestaña.
const CASH_TAB = 'Efectivo';
const CASH_HEADERS = [
  'Enlace', 'Función', 'Creado', 'Vence', 'Estado', 'Nombre', 'Apellido', 'Correo', 'Códigos de entrada', 'Usado el', 'Entradas',
];
const CASH = { TOKEN: 0, SHOW: 1, CREATED: 2, EXPIRES: 3, STATUS: 4, FIRST: 5, LAST: 6, EMAIL: 7, CODE: 8, USED_AT: 9, QTY: 10 };
const PENDING = 'Pendiente';
const USED = 'Usado';
const EXPIRED = 'Vencido';
const CANCELLED = 'Anulado';

function setup() {
  Object.keys(TABS).forEach(getTab_);
  cashTab_();
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
    if (body.action === 'append') return reply_(append_(body.show, rowsOf_(body)));
    if (body.action === 'count') return reply_({ ok: true, counts: { '7pm': count_('7pm'), '9pm': count_('9pm') } });
    if (body.action === 'cashCreate') return reply_(cashCreate_(body));
    if (body.action === 'cashGet') return reply_(cashGet_(body.token));
    if (body.action === 'cashRedeem') return reply_(cashRedeem_(body));
    if (body.action === 'cashCancel') return reply_(cashCancel_(body.token));
    return reply_({ ok: false, error: 'unknown action' });
  } catch (err) {
    return reply_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Una compra puede traer varias entradas: una fila por entrada, todas con el mismo ID de pago.
function rowsOf_(body) {
  if (body.rows && body.rows.length) return body.rows;
  return body.row ? [body.row] : [];
}

function append_(show, rows) {
  if (!rows.length) return { ok: false, error: 'no rows' };
  const sheet = getTab_(show);
  const last = sheet.getLastRow();
  const stripeId = rows[0].stripeId;
  if (last > 1 && stripeId) {
    const ids = sheet.getRange(2, STRIPE_ID_COL, last - 1, 1).getValues().map(function (r) { return r[0]; });
    if (ids.indexOf(stripeId) !== -1) return { ok: true, duplicate: true };
  }
  rows.forEach(function (row) {
    sheet.appendRow(FIELDS.map(function (f) { return row[f] === undefined ? '' : row[f]; }));
    sheet.getRange(sheet.getLastRow(), CHECKBOX_COL).insertCheckboxes();
  });
  return { ok: true, appended: rows.length };
}

// Entradas emitidas + entradas apartadas por enlaces de efectivo aún sin usar (hasta que vencen).
function count_(show) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TABS[show]);
  const sold = sheet ? Math.max(sheet.getLastRow() - 1, 0) : 0;
  return sold + reserved_(show);
}

function reserved_(show) {
  const now = new Date();
  return cashRows_().reduce(function (sum, r) {
    const v = r.values;
    const pending = v[CASH.SHOW] === TABS[show] && v[CASH.STATUS] === PENDING && new Date(v[CASH.EXPIRES]) > now;
    return pending ? sum + quantity_(v) : sum;
  }, 0);
}

// Los enlaces creados antes del contador no tienen cantidad: valen 1 entrada.
function quantity_(v) {
  return Number(v[CASH.QTY]) || 1;
}

function cashCreate_(b) {
  if (!TABS[b.show]) return { ok: false, error: 'unknown show' };
  const quantity = Number(b.quantity) || 1;
  const capacity = Number(b.capacity) || 0;
  if (capacity > 0) {
    const remaining = capacity - count_(b.show);
    if (quantity > remaining) return { ok: false, error: 'sold_out', remaining: Math.max(remaining, 0) };
  }
  cashTab_().appendRow([b.token, TABS[b.show], b.createdAt, b.expiresAt, PENDING, '', '', '', '', '', quantity]);
  return { ok: true };
}

function cashGet_(token) {
  const found = findCash_(token);
  if (!found) return { ok: true, found: false };
  const v = found.values;
  return {
    ok: true,
    found: true,
    show: showId_(v[CASH.SHOW]),
    status: currentStatus_(v),
    expiresAt: v[CASH.EXPIRES],
    quantity: quantity_(v),
    firstName: v[CASH.FIRST],
    lastName: v[CASH.LAST],
    email: v[CASH.EMAIL],
  };
}

function cashRedeem_(b) {
  const found = findCash_(b.token);
  if (!found) return { ok: false, error: 'not_found' };
  const status = currentStatus_(found.values);
  if (status !== PENDING) return { ok: false, error: status };
  const rows = rowsOf_(b);
  const appended = append_(showId_(found.values[CASH.SHOW]), rows);
  if (!appended.ok) return appended;
  const row = rows[0];
  const codes = rows.map(function (r) { return r.ticketCode || ''; }).join(', ');
  cashTab_().getRange(found.rowIndex, CASH.STATUS + 1, 1, 6)
    .setValues([[USED, row.firstName || '', row.lastName || '', row.email || '', codes, b.usedAt || '']]);
  return { ok: true, appended: rows.length };
}

function cashCancel_(token) {
  const found = findCash_(token);
  if (!found) return { ok: false, error: 'not_found' };
  if (found.values[CASH.STATUS] !== PENDING) return { ok: false, error: currentStatus_(found.values) };
  cashTab_().getRange(found.rowIndex, CASH.STATUS + 1).setValue(CANCELLED);
  return { ok: true };
}

function currentStatus_(v) {
  if (v[CASH.STATUS] === PENDING && new Date(v[CASH.EXPIRES]) <= new Date()) return EXPIRED;
  return v[CASH.STATUS];
}

function findCash_(token) {
  if (!token) return null;
  const rows = cashRows_();
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].values[CASH.TOKEN] === token) return rows[i];
  }
  return null;
}

function cashRows_() {
  const sheet = cashTab_();
  const last = sheet.getLastRow();
  if (last < 2) return [];
  return sheet.getRange(2, 1, last - 1, CASH_HEADERS.length).getValues().map(function (values, i) {
    return { rowIndex: i + 2, values: values };
  });
}

function showId_(tabName) {
  return Object.keys(TABS).filter(function (k) { return TABS[k] === tabName; })[0];
}

function cashTab_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(CASH_TAB);
  if (!sheet) {
    sheet = ss.insertSheet(CASH_TAB);
    sheet.setFrozenRows(1);
    sheet.getRange('A2:J').setNumberFormat('@');
  }
  // Pone los encabezados nuevos (como "Entradas") también en la pestaña que ya existía.
  if (sheet.getRange(1, CASH_HEADERS.length).getValue() !== CASH_HEADERS[CASH_HEADERS.length - 1]) {
    sheet.getRange(1, 1, 1, CASH_HEADERS.length).setValues([CASH_HEADERS]).setFontWeight('bold').setBackground('#fff4d6');
  }
  return sheet;
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
  obj.version = SCRIPT_VERSION;
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
