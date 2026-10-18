import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CircleCheck, Clock } from "lucide-react";
import { EVENT, SHOWS, fromMetadata } from "@/lib/montreal";
import { getStripe } from "@/lib/server/stripe";
import { ticketCode } from "@/lib/server/ticket-code";

export const metadata: Metadata = {
  title: "Gracias por tu donación | Montreal se levanta por La Guaira",
  robots: { index: false },
};

async function loadPurchase(sessionId: string | undefined) {
  const stripe = getStripe();
  if (!stripe || !sessionId?.startsWith("cs_")) return null;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const parsed = fromMetadata(session.metadata);
    if (!parsed.ok) return null;
    return {
      paid: session.payment_status === "paid",
      firstName: parsed.data.firstName,
      email: parsed.data.email,
      show: SHOWS[parsed.data.show].label,
      code: ticketCode(session.id, parsed.data.show),
    };
  } catch {
    return null;
  }
}

export default async function GraciasPage({ searchParams }: PageProps<"/montreal/gracias">) {
  const { session_id } = await searchParams;
  const purchase = await loadPurchase(typeof session_id === "string" ? session_id : undefined);

  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <div className="spotlight" aria-hidden="true" />
      <div className="relative z-[1] flex min-h-screen flex-col">
        <header className="py-4 border-b border-[rgba(186,215,247,0.06)]">
          <div className="max-w-[1200px] mx-auto px-4">
            <Link href="/" className="inline-flex items-center gap-2 text-frost no-underline text-sm font-medium hover:text-ice transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Volver al sitio
            </Link>
          </div>
        </header>

        <main className="flex flex-1 items-center py-16">
          <div className="max-w-[560px] mx-auto px-4 w-full">
            <div className="glass-modal p-8 text-center space-y-6">
              {purchase?.paid === false ? (
                <Clock className="mx-auto h-12 w-12 text-frost" aria-hidden="true" />
              ) : (
                <CircleCheck className="mx-auto h-12 w-12 text-frost" aria-hidden="true" />
              )}

              <div className="space-y-2">
                <h1 className="text-gradient font-display font-medium text-[clamp(26px,5vw,36px)] leading-tight text-balance">
                  {purchase ? `¡Gracias, ${purchase.firstName}!` : "¡Gracias por tu donación!"}
                </h1>
                <p className="text-base text-mist">
                  {purchase?.paid === false
                    ? "Tu pago está en proceso. Apenas se confirme, te enviamos tu entrada por correo."
                    : purchase
                      ? `Tu donación fue recibida. Te enviamos tu entrada a ${purchase.email}.`
                      : "Tu donación fue recibida. En unos minutos te llega la entrada a tu correo."}
                </p>
              </div>

              {purchase && (
                <dl className="glass-card grid grid-cols-2 gap-4 p-5 text-left">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.08em] text-fog">Función</dt>
                    <dd className="font-display text-xl text-ice">{purchase.show}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.08em] text-fog">Entrada</dt>
                    <dd className="font-display text-xl text-ice">2 personas</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-xs uppercase tracking-[0.08em] text-fog">Fecha y lugar</dt>
                    <dd className="text-frost">{EVENT.dateLabel} · {EVENT.venue}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-xs uppercase tracking-[0.08em] text-fog">Código de entrada</dt>
                    <dd className="font-mono text-lg text-ice">{purchase.code}</dd>
                  </div>
                </dl>
              )}

              <p className="text-sm text-fog">
                ¿No ves el correo en 10 minutos? Revisa la carpeta de spam o promociones.
              </p>
              <p className="font-display text-lg text-ice">Gracias, Montreal. Venezuela se levanta.</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
