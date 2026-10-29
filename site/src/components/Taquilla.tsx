"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Check, Copy, KeyRound, Link2, Loader2, LogOut, MessageCircle, Smartphone, XCircle } from "lucide-react";
import { EVENT, SHOWS, TEST_PRICE_CAD, type ShowId } from "@/lib/montreal";

type ShowStatus = { taken: number; capacity: number; remaining: number | null };
type Created = { token: string; show: ShowId; url: string; expiresAt: string };

const card = "glass-modal p-6 sm:p-8 space-y-5";
const primaryBtn =
  "flex w-full items-center justify-center gap-2 rounded-full bg-violet px-6 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.98] disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-frost focus-visible:outline-offset-2";
const ghostBtn =
  "flex w-full items-center justify-center gap-2 rounded-full bg-input-bg px-6 py-3 text-base font-medium text-frost shadow-subtle transition-colors hover:bg-[rgba(199,211,234,0.1)] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-frost";

function whatsappText(c: Created): string {
  return `¡Gracias por tu donación para Venezuela se Levanta! Registra aquí tu entrada para la función de las ${SHOWS[c.show].label} del 29 de enero: ${c.url}\n\nEl enlace es personal, sirve una sola vez y vence en 48 horas.`;
}

function Login({ onDone }: { onDone: () => void }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const pin = new FormData(e.currentTarget).get("pin");
    const res = await fetch("/api/montreal/taquilla/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    }).catch(() => null);
    setBusy(false);
    if (res?.ok) return onDone();
    const data = await res?.json().catch(() => ({}));
    setError(data?.error ?? "No hay conexión. Intenta de nuevo.");
  }

  return (
    <form onSubmit={submit} className={card}>
      <div className="text-center space-y-2">
        <KeyRound className="mx-auto h-9 w-9 text-frost" aria-hidden="true" />
        <h1 className="font-display text-2xl font-medium text-ice">Taquilla · Pagos en efectivo</h1>
        <p className="text-sm text-fog">Solo para Pedrito. Escribe tu PIN para generar enlaces de registro.</p>
      </div>
      <div>
        <label htmlFor="pin" className="block text-sm font-medium text-mist mb-1.5">PIN</label>
        <input id="pin" name="pin" type="password" autoComplete="current-password" required className="input-field !text-base !py-2.5" />
      </div>
      {error && <p role="alert" className="rounded-lg bg-[rgba(228,109,76,0.12)] px-4 py-3 text-sm text-ember">{error}</p>}
      <button type="submit" disabled={busy} className={primaryBtn}>
        {busy && <Loader2 className="h-5 w-5 animate-spin" />} Entrar
      </button>
    </form>
  );
}

export function Taquilla({ loggedIn: initiallyLoggedIn }: { loggedIn: boolean }) {
  const [loggedIn, setLoggedIn] = useState(initiallyLoggedIn);
  const [show, setShow] = useState<ShowId | "">("");
  const [status, setStatus] = useState<Record<ShowId, ShowStatus> | null>(null);
  const [created, setCreated] = useState<Created | null>(null);
  const [busy, setBusy] = useState<"" | "wa" | "here" | "cancel">("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleUnauthorized = useCallback((res: Response) => {
    if (res.status === 401) setLoggedIn(false);
  }, []);

  const loadStatus = useCallback(() => {
    fetch("/api/montreal/taquilla/links", { cache: "no-store" })
      .then(async (res) => {
        handleUnauthorized(res);
        if (res.ok) setStatus((await res.json()).shows);
      })
      .catch(() => {});
  }, [handleUnauthorized]);

  useEffect(() => {
    if (!loggedIn) return;
    fetch("/api/montreal/taquilla/links", { cache: "no-store" })
      .then(async (res) => {
        handleUnauthorized(res);
        if (res.ok) setStatus((await res.json()).shows);
      })
      .catch(() => {});
  }, [loggedIn, handleUnauthorized]);

  async function create(mode: "wa" | "here") {
    if (!show) {
      setError("Elige primero la función que pagó la persona.");
      return;
    }
    setBusy(mode);
    setError("");
    setCopied(false);
    const res = await fetch("/api/montreal/taquilla/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ show }),
    }).catch(() => null);
    if (!res) {
      setBusy("");
      setError("No hay conexión. Intenta de nuevo.");
      return;
    }
    handleUnauthorized(res);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setBusy("");
      setError(data.error ?? "No pude crear el enlace.");
      loadStatus();
      return;
    }
    if (mode === "here") {
      window.location.href = data.url;
      return;
    }
    setBusy("");
    setCreated(data);
    loadStatus();
  }

  async function cancel() {
    if (!created) return;
    setBusy("cancel");
    const res = await fetch(`/api/montreal/taquilla/links?token=${created.token}`, { method: "DELETE" }).catch(() => null);
    setBusy("");
    if (res) handleUnauthorized(res);
    const data = await res?.json().catch(() => ({}));
    if (res?.ok) {
      setCreated(null);
      loadStatus();
    } else {
      setError(data?.error ?? "No pude anular el enlace.");
    }
  }

  async function copy() {
    if (!created) return;
    try {
      await navigator.clipboard.writeText(created.url);
      setCopied(true);
    } catch {
      setError("No pude copiar. Mantén presionado el enlace para copiarlo.");
    }
  }

  async function logout() {
    await fetch("/api/montreal/taquilla/login", { method: "DELETE" }).catch(() => null);
    setLoggedIn(false);
    setCreated(null);
  }

  if (!loggedIn) return <Login onDone={() => setLoggedIn(true)} />;

  return (
    <div className="space-y-5">
      <div className={card}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-medium text-ice">Taquilla · Efectivo</h1>
            <p className="mt-1 text-sm text-fog">Genera el enlace solo después de recibir los $100 CAD.</p>
          </div>
          <button onClick={logout} className="inline-flex shrink-0 items-center gap-1.5 text-sm text-mist hover:text-ice">
            <LogOut className="h-4 w-4" /> Salir
          </button>
        </div>

        <fieldset>
          <legend className="block text-sm font-medium text-mist mb-1.5">Función que pagó</legend>
          <div className="grid grid-cols-2 gap-3">
            {(Object.keys(SHOWS) as ShowId[]).map((id) => {
              const s = status?.[id];
              const full = s?.remaining === 0;
              return (
                <label key={id} htmlFor={`t-${id}`}
                  className={`flex flex-col items-center rounded-xl px-4 py-3 shadow-subtle transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-frost ${
                    full ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                  } ${show === id ? "bg-violet text-white" : "bg-input-bg text-frost"}`}>
                  <input id={`t-${id}`} type="radio" name="show" value={id} checked={show === id} disabled={full}
                    onChange={() => setShow(id)} className="sr-only" />
                  <span className="font-display text-xl font-medium">{SHOWS[id].label}</span>
                  <span className={`text-xs ${show === id ? "text-white/80" : "text-fog"}`}>
                    {!s ? "…" : s.remaining === null ? "Sin límite" : full ? "Llena" : `Quedan ${s.remaining} de ${s.capacity}`}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {error && <p role="alert" className="rounded-lg bg-[rgba(228,109,76,0.12)] px-4 py-3 text-sm text-ember">{error}</p>}

        <div className="space-y-3">
          <button onClick={() => create("wa")} disabled={busy !== ""} className={primaryBtn}>
            {busy === "wa" ? <Loader2 className="h-5 w-5 animate-spin" /> : <Link2 className="h-5 w-5" />}
            Generar enlace para WhatsApp
          </button>
          <button onClick={() => create("here")} disabled={busy !== ""} className={ghostBtn}>
            {busy === "here" ? <Loader2 className="h-5 w-5 animate-spin" /> : <Smartphone className="h-5 w-5" />}
            Registrar aquí ahora (pásale tu teléfono)
          </button>
        </div>
        <p className="text-[13px] text-fog">Cada enlace aparta 1 cupo, sirve una sola vez y vence en 48 horas si nadie lo usa.</p>
      </div>

      {created && (
        <div className={card}>
          <div>
            <p className="text-sm text-mist">Enlace para la función de las {SHOWS[created.show].label}</p>
            <p className="mt-2 select-all break-all rounded-lg bg-input-bg px-4 py-3 font-mono text-sm text-ice shadow-subtle">{created.url}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <a href={`https://wa.me/?text=${encodeURIComponent(whatsappText(created))}`} target="_blank" rel="noopener noreferrer"
              className={`${primaryBtn} no-underline`}>
              <MessageCircle className="h-5 w-5" /> Enviar por WhatsApp
            </a>
            <button onClick={copy} className={ghostBtn}>
              {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />} {copied ? "Copiado" : "Copiar enlace"}
            </button>
          </div>
          <button onClick={cancel} disabled={busy !== ""} className="inline-flex items-center gap-1.5 text-sm text-ember hover:underline">
            {busy === "cancel" ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4" />}
            Anular este enlace (libera el cupo)
          </button>
        </div>
      )}

      <div className="glass-modal p-6 sm:p-8 space-y-2">
        <h2 className="text-base font-medium text-ice">Probar el pago con tarjeta</h2>
        <p className="text-sm text-fog">
          Abre el formulario desde{" "}
          <a href="/montreal?prueba=1#reservar" target="_blank" className="text-frost underline">este enlace de prueba</a>: con
          esta sesión abierta cobra solo ${TEST_PRICE_CAD} CAD y Stripe lo muestra como PRUEBA. Comprar en /montreal de forma
          normal cobra siempre ${EVENT.priceCad} CAD. Después reembolsa el pago en Stripe, borra la fila del Sheet y toca Salir.
        </p>
      </div>
    </div>
  );
}
