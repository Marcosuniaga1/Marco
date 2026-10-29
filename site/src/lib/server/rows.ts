import type { Registration } from "@/lib/montreal";
import type { SheetRow } from "./sheet";

const torontoFormat = new Intl.DateTimeFormat("es-CA", {
  timeZone: "America/Toronto",
  dateStyle: "short",
  timeStyle: "short",
});

export function torontoTime(date: Date): string {
  return torontoFormat.format(date);
}

const GIFT = { self: "No", gift: "Sí", none: "Sin agenda" } as const;

// One row per ticket, so the door can check each one off on its own; each row carries one ticket's share of the payment.
export function sheetRows(r: Registration, codes: string[], paidAt: Date, totalCad: number, paymentId: string): SheetRow[] {
  return codes.map((code) => ({
    paidAt: torontoTime(paidAt),
    ticketCode: code,
    firstName: r.firstName,
    lastName: r.lastName,
    email: r.email,
    whatsapp: r.whatsapp,
    address: r.address,
    gift: GIFT[r.agenda],
    recipient: r.agenda === "gift" ? r.giftName : r.agenda === "self" ? "El comprador" : "",
    amountCad: Math.round((totalCad / codes.length) * 100) / 100,
    stripeId: paymentId,
  }));
}
