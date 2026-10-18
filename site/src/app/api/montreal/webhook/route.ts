import type Stripe from "stripe";
import { getStripe } from "@/lib/server/stripe";
import { fulfillSession } from "@/lib/server/fulfill";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return new Response("Payments not configured", { status: 503 });

  const signature = request.headers.get("stripe-signature");
  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature ?? "", secret);
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const session = event.data.object;
    if (session.payment_status === "paid") {
      try {
        await fulfillSession(stripe, session);
      } catch (error) {
        console.error(`[montreal] fulfillment failed for ${session.id}`, error);
        return new Response("Fulfillment failed, retry later", { status: 500 });
      }
    }
  }

  return new Response("ok");
}
