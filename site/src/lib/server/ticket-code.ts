import { createHash } from "node:crypto";
import type { ShowId } from "@/lib/montreal";

export function ticketCode(sessionId: string, show: ShowId): string {
  const hash = createHash("sha256").update(sessionId).digest("hex").slice(0, 6).toUpperCase();
  return `VSL-${show.toUpperCase()}-${hash}`;
}
