import type Stripe from "stripe";
import { fromMetadata, type Registration } from "@/lib/montreal";
import { appendRow } from "./sheet";
import { sendTicketEmail } from "./mailer";
import { sheetRow } from "./rows";
import { renderTicketJpeg } from "./ticket";
import { ticketCode } from "./ticket-code";

export async function emailTicket(r: Registration, code: string): Promise<void> {
  const ticketImage = await renderTicketJpeg({ holder: `${r.firstName} ${r.lastName}`, show: r.show, code });
  await sendTicketEmail({
    to: r.email,
    firstName: r.firstName,
    show: r.show,
    code,
    address: r.address,
    giftName: r.giftName,
    ticketImage,
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
  const code = ticketCode(session.id, r.show);

  if (pi.metadata.sheet_done !== "1") {
    await appendRow(r.show, sheetRow(r, code, new Date(session.created * 1000), (session.amount_total ?? 0) / 100, piId));
    await stripe.paymentIntents.update(piId, { metadata: { sheet_done: "1", ticket_code: code } });
  }

  if (pi.metadata.email_done !== "1") {
    await emailTicket(r, code);
    await stripe.paymentIntents.update(piId, { metadata: { email_done: "1" } });
  }
}
