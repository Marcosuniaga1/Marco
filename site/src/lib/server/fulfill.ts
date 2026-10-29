import type Stripe from "stripe";
import { fromMetadata, type Registration } from "@/lib/montreal";
import { appendRows } from "./sheet";
import { sendTicketEmail } from "./mailer";
import { sheetRows } from "./rows";
import { renderTicketJpeg } from "./ticket";
import { ticketCodes } from "./ticket-code";

export async function emailTickets(r: Registration, codes: string[], totalCad: number): Promise<void> {
  const holder = `${r.firstName} ${r.lastName}`;
  const ticketImages: Buffer[] = [];
  // One at a time: rendering is CPU-bound, so running them together would only add memory pressure.
  for (const [i, code] of codes.entries()) {
    ticketImages.push(await renderTicketJpeg({ holder, show: r.show, code, index: i + 1, count: codes.length }));
  }
  await sendTicketEmail({
    to: r.email,
    firstName: r.firstName,
    show: r.show,
    codes,
    totalCad,
    agenda: r.agenda,
    address: r.address,
    giftName: r.giftName,
    ticketImages,
  });
}

// Stripe retries webhooks, so each step records completion on the PaymentIntent and is skipped on redelivery.
export async function fulfillSession(stripe: Stripe, session: Stripe.Checkout.Session): Promise<void> {
  const parsed = fromMetadata(session.metadata);
  if (!parsed.ok) throw new Error(`Session ${session.id} has invalid metadata: ${JSON.stringify(parsed.errors)}`);
  const r = parsed.data;

  const piId = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id;
  if (!piId) throw new Error(`Session ${session.id} has no payment_intent`);
  const pi = await stripe.paymentIntents.retrieve(piId);
  const codes = ticketCodes(session.id, r.show, r.quantity);
  const totalCad = (session.amount_total ?? 0) / 100;

  if (pi.metadata.sheet_done !== "1") {
    await appendRows(r.show, sheetRows(r, codes, new Date(session.created * 1000), totalCad, piId));
    await stripe.paymentIntents.update(piId, { metadata: { sheet_done: "1", ticket_code: codes.join(", ").slice(0, 500) } });
  }

  if (pi.metadata.email_done !== "1") {
    await emailTickets(r, codes, totalCad);
    await stripe.paymentIntents.update(piId, { metadata: { email_done: "1" } });
  }
}
