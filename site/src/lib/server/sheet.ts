import type { ShowId } from "@/lib/montreal";

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

async function call<T>(body: Record<string, unknown>): Promise<T> {
  const cfg = config();
  if (!cfg) throw new Error("SHEET_WEBHOOK_URL / SHEET_WEBHOOK_SECRET not configured");
  const res = await fetch(cfg.url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ ...body, secret: cfg.secret }),
    redirect: "follow",
    cache: "no-store",
  });
  const json = (await res.json().catch(() => null)) as ({ ok: boolean; error?: string } & T) | null;
  if (!res.ok || !json?.ok) throw new Error(`Sheet webhook failed: ${res.status} ${json?.error ?? ""}`);
  return json;
}

export function sheetConfigured(): boolean {
  return config() !== null;
}

export async function appendRow(show: ShowId, row: SheetRow): Promise<void> {
  const safe = Object.fromEntries(
    Object.entries(row).map(([k, v]) => [k, typeof v === "string" ? plain(v) : v]),
  );
  await call({ action: "append", show, row: safe });
}

export async function countByShow(): Promise<Record<ShowId, number>> {
  const { counts } = await call<{ counts: Record<ShowId, number> }>({ action: "count" });
  return counts;
}
