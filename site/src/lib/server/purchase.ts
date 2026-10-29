import { fromMetadata, isShowId, type ShowId } from "@/lib/montreal";
import { getStripe } from "./stripe";
import { getCashLink } from "./sheet";
import { isCashTokenShape } from "./taquilla";
import { ticketCodes } from "./ticket-code";

export type TicketHolder = {
  // Query string that identifies this ticket on /montreal/gracias and /api/montreal/ticket.
  query: string;
  issued: boolean;
  firstName: string;
  lastName: string;
  email: string;
  show: ShowId;
  // One per ticket in the purchase; the thank-you page and the ticket route address them by position (1-based).
  codes: string[];
};

async function fromStripe(sessionId: string): Promise<TicketHolder | null> {
  const stripe = getStripe();
  if (!stripe || !sessionId.startsWith("cs_")) return null;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const parsed = fromMetadata(session.metadata);
    if (!parsed.ok) return null;
    const r = parsed.data;
    return {
      query: `session_id=${encodeURIComponent(session.id)}`,
      issued: session.payment_status === "paid",
      firstName: r.firstName,
      lastName: r.lastName,
      email: r.email,
      show: r.show,
      codes: ticketCodes(session.id, r.show, r.quantity),
    };
  } catch {
    return null;
  }
}

async function fromCash(token: string): Promise<TicketHolder | null> {
  if (!isCashTokenShape(token)) return null;
  try {
    const link = await getCashLink(token);
    if (!link.found || link.status !== "Usado" || !isShowId(link.show)) return null;
    return {
      query: `cash=${token}`,
      issued: true,
      firstName: link.firstName ?? "",
      lastName: link.lastName ?? "",
      email: link.email ?? "",
      show: link.show,
      codes: ticketCodes(`cash:${token}`, link.show, link.quantity ?? 1),
    };
  } catch {
    return null;
  }
}

export async function findTicket(params: { session_id?: unknown; cash?: unknown }): Promise<TicketHolder | null> {
  if (typeof params.session_id === "string") return fromStripe(params.session_id);
  if (typeof params.cash === "string") return fromCash(params.cash);
  return null;
}
