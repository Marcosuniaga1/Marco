import { fromMetadata, type Registration } from "@/lib/montreal";
import { getStripe } from "./stripe";
import { ticketCode } from "./ticket-code";

export type Purchase = {
  sessionId: string;
  paid: boolean;
  registration: Registration;
  code: string;
};

export async function findPurchase(sessionId: string | undefined | null): Promise<Purchase | null> {
  const stripe = getStripe();
  if (!stripe || !sessionId?.startsWith("cs_")) return null;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const parsed = fromMetadata(session.metadata);
    if (!parsed.ok) return null;
    return {
      sessionId: session.id,
      paid: session.payment_status === "paid",
      registration: parsed.data,
      code: ticketCode(session.id, parsed.data.show),
    };
  } catch {
    return null;
  }
}
