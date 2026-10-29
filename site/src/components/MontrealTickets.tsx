"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Download, Loader2, Share2 } from "lucide-react";
import { TICKET_SIZE } from "@/lib/montreal";

export type TicketFile = { url: string; fileName: string; code: string };

const primaryBtn =
  "flex w-full items-center justify-center gap-2 rounded-full bg-violet px-6 py-3.5 text-base font-medium text-white no-underline transition-opacity hover:opacity-90 active:scale-[0.98] disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-frost focus-visible:outline-offset-2";
const ghostBtn =
  "flex w-full items-center justify-center gap-2 rounded-full bg-input-bg px-5 py-3 text-sm font-medium text-frost no-underline shadow-subtle transition-colors hover:bg-[rgba(199,211,234,0.1)] disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-frost";

// Phones can hand image files straight to WhatsApp through the share sheet; desktop browsers mostly can't.
function canShareFiles(): boolean {
  try {
    return !!navigator.canShare?.({ files: [new File([""], "entrada.jpg", { type: "image/jpeg" })] });
  } catch {
    return false;
  }
}
const noSubscribe = () => () => {};

async function toFile(t: TicketFile): Promise<File> {
  const blob = await (await fetch(t.url)).blob();
  return new File([blob], t.fileName, { type: "image/jpeg" });
}

export function MontrealTickets({ tickets }: { tickets: TicketFile[] }) {
  const shareable = useSyncExternalStore(noSubscribe, canShareFiles, () => false);
  const files = useRef<(File | null)[]>(tickets.map(() => null));
  const [busy, setBusy] = useState<number | "all" | null>(null);
  const [error, setError] = useState("");
  const many = tickets.length > 1;

  // Safari only opens the share sheet straight from the tap, so the images are fetched ahead of time.
  useEffect(() => {
    if (!shareable) return;
    let cancelled = false;
    (async () => {
      for (const [i, t] of tickets.entries()) {
        if (cancelled) return;
        files.current[i] ??= await toFile(t).catch(() => null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [shareable, tickets]);

  async function share(indexes: number[], which: number | "all") {
    setError("");
    setBusy(which);
    try {
      const ready = await Promise.all(indexes.map(async (i) => (files.current[i] ??= await toFile(tickets[i]))));
      await navigator.share({ files: ready });
    } catch (e) {
      if (!(e instanceof DOMException && e.name === "AbortError")) setError("No se pudo abrir el menú para compartir. Toca de nuevo o descarga la entrada.");
    }
    setBusy(null);
  }

  function downloadAll() {
    tickets.forEach((t, i) =>
      setTimeout(() => {
        const a = document.createElement("a");
        a.href = `${t.url}&download=1`;
        a.download = t.fileName;
        a.click();
      }, i * 400),
    );
  }

  return (
    <div className="space-y-5">
      {many && (
        <div className="grid gap-3 sm:grid-cols-2">
          {shareable && (
            <button type="button" onClick={() => share(tickets.map((_, i) => i), "all")} disabled={busy !== null} className={primaryBtn}>
              {busy === "all" ? <Loader2 className="h-5 w-5 animate-spin" /> : <Share2 className="h-5 w-5" />}
              Enviar las {tickets.length} por WhatsApp
            </button>
          )}
          <button type="button" onClick={downloadAll} className={shareable ? ghostBtn : primaryBtn}>
            <Download className="h-5 w-5" /> Descargar las {tickets.length}
          </button>
        </div>
      )}

      {error && <p role="alert" className="rounded-lg bg-[rgba(228,109,76,0.12)] px-4 py-3 text-sm text-ember">{error}</p>}

      <ul className={`grid gap-6 ${many ? "sm:grid-cols-2" : ""}`}>
        {tickets.map((t, i) => (
          <li key={t.code} className="space-y-3">
            {many && <p className="text-sm text-mist">Entrada {i + 1} de {tickets.length} · <span className="text-frost">{t.code}</span></p>}
            <a href={t.url} target="_blank" rel="noopener" className="block">
              <Image
                src={t.url}
                alt={`Entrada ${t.code}`}
                width={TICKET_SIZE.width}
                height={TICKET_SIZE.height}
                unoptimized
                priority={i === 0}
                loading={i === 0 ? undefined : "lazy"}
                className="w-full h-auto rounded-xl shadow-tour-art"
              />
            </a>
            <div className={`grid gap-2 ${shareable ? "grid-cols-2" : ""}`}>
              <a href={`${t.url}&download=1`} download={t.fileName} className={many ? ghostBtn : primaryBtn}>
                <Download className="h-4 w-4" /> {many ? "Descargar" : "Descargar mi entrada"}
              </a>
              {shareable && (
                <button type="button" onClick={() => share([i], i)} disabled={busy !== null} className={ghostBtn}>
                  {busy === i ? <Loader2 className="h-4 w-4 animate-spin" /> : <Share2 className="h-4 w-4" />} WhatsApp
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      <p className="text-[13px] text-fog">
        {shareable
          ? "“WhatsApp” abre el menú de compartir de tu teléfono: elige WhatsApp y el contacto. En iPhone también puedes mantener presionada la imagen y elegir “Guardar en Fotos”."
          : "En la computadora, descarga las imágenes y envíalas por WhatsApp Web cuando quieras. En iPhone también puedes mantener presionada la imagen y elegir “Guardar en Fotos”."}
      </p>
    </div>
  );
}
