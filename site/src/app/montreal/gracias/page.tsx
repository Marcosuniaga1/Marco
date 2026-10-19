import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Download } from "lucide-react";
import { TICKET_SIZE } from "@/lib/montreal";
import { findPurchase } from "@/lib/server/purchase";

export const metadata: Metadata = {
  title: "Gracias por tu donación | Montreal se levanta por La Guaira",
  robots: { index: false },
};

export default async function GraciasPage({ searchParams }: PageProps<"/montreal/gracias">) {
  const { session_id } = await searchParams;
  const purchase = await findPurchase(typeof session_id === "string" ? session_id : undefined);
  const ticketUrl = purchase?.paid ? `/api/montreal/ticket?session_id=${encodeURIComponent(purchase.sessionId)}` : null;
  const sender = process.env.GMAIL_USER;

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

        <main className="flex flex-1 items-center py-12">
          <div className="max-w-[480px] mx-auto px-4 w-full">
            <div className="glass-modal p-6 sm:p-8 text-center space-y-6">
              <div className="space-y-2">
                <h1 className="text-gradient font-display font-medium text-[clamp(26px,5vw,36px)] leading-tight text-balance">
                  {purchase ? `¡Gracias, ${purchase.registration.firstName}!` : "¡Gracias por tu donación!"}
                </h1>
                <p className="text-base text-mist">
                  {ticketUrl
                    ? "Esta es tu entrada, válida para 2 personas. Guárdala en tu teléfono y preséntala en la puerta."
                    : purchase
                      ? "Tu pago está en proceso. Apenas se confirme, te enviamos tu entrada por correo."
                      : "Tu donación fue recibida. En unos minutos te llega la entrada a tu correo."}
                </p>
              </div>

              {ticketUrl ? (
                <div className="space-y-4">
                  <a href={ticketUrl} target="_blank" rel="noopener" className="block">
                    <Image
                      src={ticketUrl}
                      alt={`Tu entrada ${purchase!.code}`}
                      width={TICKET_SIZE.width}
                      height={TICKET_SIZE.height}
                      unoptimized
                      priority
                      className="w-full h-auto rounded-xl shadow-tour-art"
                    />
                  </a>
                  <a
                    href={`${ticketUrl}&download=1`}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-violet px-6 py-3.5 text-base font-medium text-white no-underline transition-opacity hover:opacity-90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-frost focus-visible:outline-offset-2"
                  >
                    <Download className="h-5 w-5" />
                    Descargar mi entrada
                  </a>
                  <p className="text-[13px] text-fog">En iPhone también puedes mantener presionada la imagen y elegir “Guardar en Fotos”.</p>
                </div>
              ) : (
                purchase && <Clock className="mx-auto h-12 w-12 text-frost" aria-hidden="true" />
              )}

              {purchase && (
                <p className="text-sm text-mist">
                  {ticketUrl ? "Como respaldo, también te la enviamos a " : "Te la enviaremos a "}
                  <span className="text-frost">{purchase.registration.email}</span>
                  {ticketUrl ? ". Es la misma entrada." : "."}
                </p>
              )}
              <p className="text-[13px] text-fog">
                ¿No ves el correo? Revisa spam o promociones
                {sender ? <> y agrega <span className="text-mist">{sender}</span> a tus contactos</> : null}.
              </p>
              <p className="font-display text-lg text-ice">Gracias, Montreal. Venezuela se levanta.</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
