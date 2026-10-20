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

export async function appendRow(show: ShowId, row: SheetRow): Promise<void> {
  await call({ action: "append", show, row: safeRow(row) });
}

export type CashStatus = "Pendiente" | "Usado" | "Vencido" | "Anulado";

export type CashLink = {
  found: boolean;
  show?: ShowId;
  status?: CashStatus;
  expiresAt?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  code?: string;
};

export async function createCashLink(
  token: string,
  show: ShowId,
  capacity: number,
  createdAt: string,
  expiresAt: string,
): Promise<{ ok: true } | { ok: false; error?: string }> {
  return request({ action: "cashCreate", token, show, capacity, createdAt, expiresAt });
}

export async function getCashLink(token: string): Promise<CashLink> {
  return call<CashLink>({ action: "cashGet", token });
}

export async function redeemCashLink(
  token: string,
  row: SheetRow,
  usedAt: string,
): Promise<{ ok: true } | { ok: false; error?: string }> {
  return request({ action: "cashRedeem", token, row: safeRow(row), usedAt });
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
