import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { MontrealTickets } from "@/components/MontrealTickets";
import { findTicket } from "@/lib/server/purchase";
import { ticketFileName } from "@/lib/server/ticket-code";

export const metadata: Metadata = {
  title: "Gracias por tu donación | Montreal se levanta por La Guaira",
  robots: { index: false },
};

export default async function GraciasPage({ searchParams }: PageProps<"/montreal/gracias">) {
  const purchase = await findTicket(await searchParams);
  const tickets = purchase?.issued
    ? purchase.codes.map((code, i) => ({
        url: `/api/montreal/ticket?${purchase.query}&n=${i + 1}`,
        fileName: ticketFileName(code, i + 1, purchase.codes.length),
        code,
      }))
    : null;
  const many = (tickets?.length ?? 0) > 1;
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
          <div className={`${many ? "max-w-[720px]" : "max-w-[480px]"} mx-auto px-4 w-full`}>
            <div className="glass-modal p-6 sm:p-8 text-center space-y-6">
              <div className="space-y-2">
                <h1 className="text-gradient font-display font-medium text-[clamp(26px,5vw,36px)] leading-tight text-balance">
                  {purchase ? `¡Gracias, ${purchase.firstName}!` : "¡Gracias por tu donación!"}
                </h1>
                <p className="text-base text-mist">
                  {tickets
                    ? many
                      ? `Estas son tus ${tickets.length} entradas, cada una válida para 2 personas. Guárdalas o envíalas a quienes van contigo: cada una se presenta en la puerta por separado.`
                      : "Esta es tu entrada, válida para 2 personas. Guárdala en tu teléfono y preséntala en la puerta."
                    : purchase
                      ? "Tu pago está en proceso. Apenas se confirme, te enviamos tu entrada por correo."
                      : "Tu donación fue recibida. En unos minutos te llega la entrada a tu correo."}
                </p>
              </div>

              {tickets ? (
                <MontrealTickets tickets={tickets} />
              ) : (
                purchase && <Clock className="mx-auto h-12 w-12 text-frost" aria-hidden="true" />
              )}

              {purchase && (
                <p className="text-sm text-mist">
                  {tickets ? `Como respaldo, también ${many ? "te las" : "te la"} enviamos a ` : "Te la enviaremos a "}
                  <span className="text-frost">{purchase.email}</span>
                  {tickets ? (many ? ". Son las mismas entradas." : ". Es la misma entrada.") : "."}
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
