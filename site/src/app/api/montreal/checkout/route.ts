import { EVENT, SHOWS, TEST_PRICE_CAD, onlyLeft, ticketWord, toMetadata, validateRegistration } from "@/lib/montreal";
import { getStripe } from "@/lib/server/stripe";
import { capacityFor, countByShow, sheetConfigured } from "@/lib/server/sheet";
import { isTaquillaSession } from "@/lib/server/taquilla";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return Response.json(
      { error: "Las reservas abren muy pronto. Mientras tanto, escríbenos por WhatsApp." },
      { status: 503 },
    );
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = validateRegistration(body);
  if (!parsed.ok) return Response.json({ error: "Revisa los campos marcados.", fields: parsed.errors }, { status: 400 });
  const r = parsed.data;
  const show = SHOWS[r.show];

  const capacity = capacityFor(r.show);
  if (capacity > 0 && sheetConfigured()) {
    try {
      const counts = await countByShow();
      const remaining = Math.max(capacity - (counts[r.show] ?? 0), 0);
      if (r.quantity > remaining) {
        return Response.json(
          remaining === 0
            ? { error: `La función de las ${show.label} está agotada. Prueba con la otra función.`, fields: { show: "Agotada" } }
            : {
                error: `Para la función de las ${show.label} ${onlyLeft(remaining)}.`,
                fields: { quantity: `Elige ${remaining === 1 ? "1 entrada" : `hasta ${remaining} entradas`}.` },
              },
          { status: 409 },
        );
      }
    } catch (error) {
      console.error("[montreal] capacity check failed, allowing checkout", error);
    }
  }

  // The test price needs both the taquilla's test link (?prueba=1) and its PIN session, so a phone with the
  // taquilla open still charges the full price on the regular form.
  const test = (body as { test?: unknown } | null)?.test === true && (await isTaquillaSession());
  const origin = process.env.SITE_URL?.replace(/\/$/, "") || new URL(request.url).origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "es",
      // Stripe's minimum (30 min, plus a small buffer); keeps unpaid checkouts from holding a sold-out show open for 24h.
      expires_at: Math.floor(Date.now() / 1000) + 31 * 60,
      customer_email: r.email,
      line_items: [
        {
          quantity: r.quantity,
          price_data: {
            currency: "cad",
            unit_amount: (test ? TEST_PRICE_CAD : EVENT.priceCad) * 100,
            product_data: {
              name: `${test ? "PRUEBA · " : ""}Donación ${EVENT.title}`,
              description: `Entrada para 2 personas · Función ${show.label} · ${EVENT.dateLabel} · ${EVENT.venue}${
                r.agenda === "none" ? "" : " + 1 Agenda Esperanza 2027"
              }`,
            },
          },
        },
      ],
      metadata: toMetadata(r),
      payment_intent_data: {
        description: `${test ? "PRUEBA · " : ""}Montreal · Función ${show.label} · ${ticketWord(r.quantity)} · ${r.firstName} ${r.lastName}`,
        metadata: test ? { show: r.show, test: "1" } : { show: r.show },
      },
      success_url: `${origin}/montreal/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/montreal#reservar`,
    });
    if (!session.url) throw new Error("Checkout session has no url");
    return Response.json({ url: session.url });
  } catch (error) {
    console.error("[montreal] checkout session creation failed", error);
    return Response.json({ error: "No pudimos abrir el pago. Intenta de nuevo en un momento." }, { status: 502 });
  }
}
