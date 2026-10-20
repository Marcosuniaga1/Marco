import type { Metadata } from "next";
import { Taquilla } from "@/components/Taquilla";
import { isTaquillaSession, taquillaConfigured } from "@/lib/server/taquilla";

export const metadata: Metadata = {
  title: "Taquilla | Montreal",
  robots: { index: false, follow: false },
};

export default async function TaquillaPage() {
  const loggedIn = await isTaquillaSession();

  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <div className="relative z-[1] flex min-h-screen items-center py-10">
        <div className="max-w-[520px] mx-auto px-4 w-full">
          {taquillaConfigured() ? (
            <Taquilla loggedIn={loggedIn} />
          ) : (
            <p className="glass-modal p-8 text-center text-mist">La taquilla aún no está configurada.</p>
          )}
        </div>
      </div>
    </>
  );
}
