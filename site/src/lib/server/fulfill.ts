import type Stripe from "stripe";
import { fromMetadata } from "@/lib/montreal";
import { appendRow } from "./sheet";
import { sendTicketEmail } from "./mailer";
import { renderTicketPng } from "./ticket";
import { ticketCode } from "./ticket-code";

const paidAtFormat = new Intl.DateTimeFormat("es-CA", {
  timeZone: "America/Toronto",
  dateStyle: "short",
  timeStyle: "short",
});

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
    await appendRow(r.show, {
      paidAt: paidAtFormat.format(new Date(session.created * 1000)),
      ticketCode: code,
      firstName: r.firstName,
      lastName: r.lastName,
      email: r.email,
      whatsapp: r.whatsapp,
      address: r.address,
      gift: r.gift ? "Sí" : "No",
      recipient: r.gift ? r.giftName : "El comprador",
      amountCad: (session.amount_total ?? 0) / 100,
      stripeId: piId,
    });
    await stripe.paymentIntents.update(piId, { metadata: { sheet_done: "1", ticket_code: code } });
  }

  if (pi.metadata.email_done !== "1") {
    const ticketPng = await renderTicketPng({ holder: `${r.firstName} ${r.lastName}`, show: r.show, code });
    await sendTicketEmail({
      to: r.email,
      firstName: r.firstName,
      show: r.show,
      code,
      address: r.address,
      giftName: r.giftName,
      ticketPng,
    });
    await stripe.paymentIntents.update(piId, { metadata: { email_done: "1" } });
  }
}
