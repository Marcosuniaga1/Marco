import { SHOWS, type ShowId } from "@/lib/montreal";

export type SheetRow = {
  paidAt: string;
  ticketCode: string;
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string;
  address: string;
  gift: string;
  recipient: string;
  amountCad: number;
  stripeId: string;
};

function config() {
  const url = process.env.SHEET_WEBHOOK_URL;
  const secret = process.env.SHEET_WEBHOOK_SECRET;
  return url && secret ? { url, secret } : null;
}

// Sheets turns text that starts with = + - @ into a formula; a leading apostrophe keeps it as plain text.
function plain(value: string): string {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

type Reply<T> = ({ ok: true } & T) | { ok: false; error?: string };

// Returns business-level refusals ({ ok: false }) to the caller; throws only when the script can't be reached.
async function request<T>(body: Record<string, unknown>): Promise<Reply<T>> {
  const cfg = config();
  if (!cfg) throw new Error("SHEET_WEBHOOK_URL / SHEET_WEBHOOK_SECRET not configured");
  const res = await fetch(cfg.url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ ...body, secret: cfg.secret }),
    redirect: "follow",
    cache: "no-store",
  });
  const json = (await res.json().catch(() => null)) as Reply<T> | null;
  if (!res.ok || !json) throw new Error(`Sheet webhook failed: ${res.status}`);
  return json;
}

async function call<T>(body: Record<string, unknown>): Promise<T> {
  const json = await request<T>(body);
  if (!json.ok) throw new Error(`Sheet webhook failed: ${json.error ?? ""}`);
  return json;
}

function safeRow(row: SheetRow) {
  return Object.fromEntries(Object.entries(row).map(([k, v]) => [k, typeof v === "string" ? plain(v) : v]));
}

export function sheetConfigured(): boolean {
  return config() !== null;
}

// Must match SCRIPT_VERSION in integrations/google-sheet.gs. An older script ignores `rows` and `quantity` and would
// write empty or short rows, so every write first checks the deployed version (once per server instance).
const SCRIPT_VERSION = 2;
let scriptChecked = false;

async function requireCurrentScript(): Promise<void> {
  if (scriptChecked) return;
  const { version } = await call<{ version?: number }>({ action: "count" });
  if ((version ?? 1) < SCRIPT_VERSION)
    throw new Error(`Sheet script is version ${version ?? 1}, needs ${SCRIPT_VERSION}: publish a new version of integrations/google-sheet.gs`);
  scriptChecked = true;
}

export async function appendRows(show: ShowId, rows: SheetRow[]): Promise<void> {
  await requireCurrentScript();
  await call({ action: "append", show, rows: rows.map(safeRow) });
}

export type CashStatus = "Pendiente" | "Usado" | "Vencido" | "Anulado";

export type CashLink = {
  found: boolean;
  show?: ShowId;
  status?: CashStatus;
  expiresAt?: string;
  quantity?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
};

export async function createCashLink(
  token: string,
  show: ShowId,
  quantity: number,
  capacity: number,
  createdAt: string,
  expiresAt: string,
): Promise<{ ok: true } | { ok: false; error?: string; remaining?: number }> {
  await requireCurrentScript();
  return request({ action: "cashCreate", token, show, quantity, capacity, createdAt, expiresAt });
}

export async function getCashLink(token: string): Promise<CashLink> {
  const link = await call<CashLink>({ action: "cashGet", token });
  // Links created before the counter existed have no quantity.
  return link.found ? { ...link, quantity: Number(link.quantity) || 1 } : link;
}

export async function redeemCashLink(
  token: string,
  rows: SheetRow[],
  usedAt: string,
): Promise<{ ok: true } | { ok: false; error?: string }> {
  await requireCurrentScript();
  return request({ action: "cashRedeem", token, rows: rows.map(safeRow), usedAt });
}

export async function cancelCashLink(token: string): Promise<{ ok: true } | { ok: false; error?: string }> {
  return request({ action: "cashCancel", token });
}

export function capacityFor(show: ShowId): number {
  return Number(process.env[SHOWS[show].capacityEnv]) || 0;
}

export async function countByShow(): Promise<Record<ShowId, number>> {
  const { counts } = await call<{ counts: Record<ShowId, number> }>({ action: "count" });
  return counts;
}
