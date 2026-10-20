import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Ban } from "lucide-react";
import { MontrealForm } from "@/components/MontrealForm";
import { CASH_LINK_MESSAGES } from "@/lib/montreal";
import { getCashLink, type CashLink } from "@/lib/server/sheet";
import { isCashTokenShape } from "@/lib/server/taquilla";

export const metadata: Metadata = {
  title: "Registra tu entrada | Montreal se levanta por La Guaira",
  robots: { index: false },
};

const WA_QUESTIONS =
  "https://wa.me/17869443555?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20mi%20entrada%20en%20efectivo%20para%20%2AVenezuela%20se%20Levanta%2A%20en%20Montreal.";

async function lookup(token: string): Promise<CashLink | "error"> {
  if (!isCashTokenShape(token)) return { found: false };
  try {
    return await getCashLink(token);
  } catch (error) {
    console.error(`[montreal] cash link lookup failed for ${token}: ${error instanceof Error ? error.message : error}`);
    return "error";
  }
}

export default async function EfectivoPage({ params }: PageProps<"/montreal/efectivo/[token]">) {
  const { token } = await params;
  const link = await lookup(token);
  const usable = link !== "error" && link.found && link.status === "Pendiente" && link.show;

  const problem =
    link === "error"
      ? "No pudimos revisar tu enlace en este momento. Intenta de nuevo en unos minutos."
      : !link.found
        ? CASH_LINK_MESSAGES.not_found
        : CASH_LINK_MESSAGES[link.status ?? ""] ?? CASH_LINK_MESSAGES.not_found;

  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <div className="spotlight" aria-hidden="true" />
      <div className="relative z-[1] flex min-h-screen flex-col">
        <header className="py-4 border-b border-[rgba(186,215,247,0.06)]">
          <div className="max-w-[1200px] mx-auto px-4">
            <Link href="/montreal" className="inline-flex items-center gap-2 text-frost no-underline text-sm font-medium hover:text-ice transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Montreal se levanta por La Guaira
            </Link>
          </div>
        </header>

        <main className="flex flex-1 items-center py-12">
          <div className="max-w-[640px] mx-auto px-4 w-full">
            {usable ? (
              <MontrealForm whatsappHref={WA_QUESTIONS} cash={{ token, show: link.show! }} />
            ) : (
              <div className="glass-modal p-8 text-center space-y-4">
                <Ban className="mx-auto h-10 w-10 text-frost" aria-hidden="true" />
                <h1 className="font-display text-2xl font-medium text-ice text-balance">Este enlace no está disponible</h1>
                <p className="text-base text-mist">{problem}</p>
                <a href={WA_QUESTIONS} target="_blank" rel="noopener noreferrer" className="inline-block text-sm text-frost underline underline-offset-2 hover:text-ice">
                  Escribirle a Pedrito por WhatsApp
                </a>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
