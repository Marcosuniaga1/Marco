import { createHash } from "node:crypto";
import type { ShowId } from "@/lib/montreal";

export function ticketCode(sessionId: string, show: ShowId): string {
  const hash = createHash("sha256").update(sessionId).digest("hex").slice(0, 6).toUpperCase();
  return `VSL-${show.toUpperCase()}-${hash}`;
}

// One code per ticket in a purchase. The first keeps the single-ticket code, so purchases made before the counter
// existed keep the code they were emailed.
export function ticketCodes(purchaseId: string, show: ShowId, quantity: number): string[] {
  return Array.from({ length: quantity }, (_, i) => ticketCode(i === 0 ? purchaseId : `${purchaseId}#${i + 1}`, show));
}

export function ticketFileName(code: string, index: number, count: number): string {
  return count > 1 ? `entrada-${index}-de-${count}-${code}.jpg` : `entrada-${code}.jpg`;
}
