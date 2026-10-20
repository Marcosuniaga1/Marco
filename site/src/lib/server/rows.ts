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

export function sheetRow(r: Registration, code: string, paidAt: Date, amountCad: number, paymentId: string): SheetRow {
  return {
    paidAt: torontoTime(paidAt),
    ticketCode: code,
    firstName: r.firstName,
    lastName: r.lastName,
    email: r.email,
    whatsapp: r.whatsapp,
    address: r.address,
    gift: r.gift ? "Sí" : "No",
    recipient: r.gift ? r.giftName : "El comprador",
    amountCad,
    stripeId: paymentId,
  };
}
