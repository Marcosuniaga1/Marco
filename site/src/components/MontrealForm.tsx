"use client";

import { useState, type FormEvent } from "react";
import { Heart, Lock, Loader2, Ticket } from "lucide-react";
import { SHOWS, validateRegistration, type FieldErrors, type ShowId } from "@/lib/montreal";

const labelClass = "block text-sm font-medium text-mist mb-1.5";
const errorClass = "mt-1.5 text-[13px] text-ember";

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} className={errorClass}>
      {message}
    </p>
  ) : null;
}

// With `cash`, the buyer already paid Pedro in person: the show comes from his one-time link and there is no Stripe step.
export function MontrealForm({ whatsappHref, cash }: { whatsappHref: string; cash?: { token: string; show: ShowId } }) {
  const [gift, setGift] = useState(false);
  const [show, setShow] = useState<ShowId | "">(cash?.show ?? "");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      firstName: fd.get("firstName"),
      lastName: fd.get("lastName"),
      email: fd.get("email"),
      whatsapp: fd.get("whatsapp"),
      address: fd.get("address"),
      show,
      gift,
      giftName: fd.get("giftName"),
    };

    const check = validateRegistration(payload);
    if (!check.ok) {
      setErrors(check.errors);
      setFormError("Revisa los campos marcados.");
      const first = Object.keys(check.errors)[0];
      document.getElementById(first === "show" ? "show-7pm" : first)?.focus();
      return;
    }

    setErrors({});
    setFormError("");
    setSubmitting(true);
    try {
      const res = await fetch(cash ? "/api/montreal/efectivo" : "/api/montreal/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cash ? { ...check.data, token: cash.token } : check.data),
      });
      const data = await res.json().catch(() => ({}));
      const next = cash ? data.redirect : data.url;
      if (res.ok && next) {
        window.location.href = next;
        return;
      }
      setErrors(data.fields ?? {});
      setFormError(data.error ?? (cash ? "No pudimos registrar tu entrada. Intenta de nuevo." : "No pudimos abrir el pago. Intenta de nuevo."));
    } catch {
      setFormError("No hay conexión. Revisa tu internet e intenta de nuevo.");
    }
    setSubmitting(false);
  }

  const describe = (field: keyof FieldErrors) => (errors[field] ? `${field}-error` : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className="glass-modal p-6 sm:p-8 space-y-5 text-left">
      <div>
        <h2 className="font-display font-medium text-2xl text-ice">{cash ? "Registra tu entrada" : "Reserva tu entrada"}</h2>
        <p className="mt-1 text-sm text-fog">
          {cash
            ? "Pago en efectivo recibido · 2 entradas + 1 Agenda Esperanza 2027. Completa tus datos y recibe tu entrada al instante."
            : "Donación de $100 CAD · 2 entradas + 1 Agenda Esperanza 2027. Tu entrada llega a tu correo al confirmar el pago."}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClass}>Nombre</label>
          <input id="firstName" name="firstName" autoComplete="given-name" required className="input-field !text-base !py-2.5"
            aria-invalid={!!errors.firstName} aria-describedby={describe("firstName")} />
          <FieldError id="firstName-error" message={errors.firstName} />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>Apellido</label>
          <input id="lastName" name="lastName" autoComplete="family-name" required className="input-field !text-base !py-2.5"
            aria-invalid={!!errors.lastName} aria-describedby={describe("lastName")} />
          <FieldError id="lastName-error" message={errors.lastName} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>Correo electrónico</label>
        <input id="email" name="email" type="email" autoComplete="email" inputMode="email" required className="input-field !text-base !py-2.5"
          aria-invalid={!!errors.email} aria-describedby={describe("email") ?? "email-hint"} />
        {errors.email ? <FieldError id="email-error" message={errors.email} /> : (
          <p id="email-hint" className="mt-1.5 text-[13px] text-fog">Aquí recibirás tu entrada.</p>
        )}
      </div>

      <div>
        <label htmlFor="whatsapp" className={labelClass}>WhatsApp</label>
        <input id="whatsapp" name="whatsapp" type="tel" autoComplete="tel" inputMode="tel" placeholder="+1 514 555 0123" required
          className="input-field !text-base !py-2.5" aria-invalid={!!errors.whatsapp} aria-describedby={describe("whatsapp")} />
        <FieldError id="whatsapp-error" message={errors.whatsapp} />
      </div>

      {cash ? (
        <div className="rounded-xl bg-input-bg px-4 py-3 shadow-subtle">
          <p className="text-sm text-mist">Tu función · 29 de enero</p>
          <p className="font-display text-xl font-medium text-ice">{SHOWS[cash.show].label}</p>
        </div>
      ) : (
      <fieldset aria-describedby={describe("show")}>
        <legend className={labelClass}>Función de preferencia · 29 de enero</legend>
        <div className="grid grid-cols-2 gap-3">
          {(Object.keys(SHOWS) as ShowId[]).map((id) => (
            <label key={id} htmlFor={`show-${id}`}
              className={`flex cursor-pointer flex-col items-center rounded-xl px-4 py-3 shadow-subtle transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-frost ${
                show === id ? "bg-violet text-white" : "bg-input-bg text-frost hover:bg-[rgba(199,211,234,0.1)]"
              }`}>
              <input id={`show-${id}`} type="radio" name="show" value={id} checked={show === id}
                onChange={() => setShow(id)} className="sr-only" />
              <span className="font-display text-xl font-medium">{SHOWS[id].label}</span>
              <span className={`text-xs ${show === id ? "text-white/80" : "text-fog"}`}>Función</span>
            </label>
          ))}
        </div>
        <FieldError id="show-error" message={errors.show} />
      </fieldset>
      )}

      <label htmlFor="gift" className="flex cursor-pointer items-start gap-3 rounded-xl bg-input-bg p-4 shadow-subtle">
        <input id="gift" type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 accent-[#663af3]" />
        <span>
          <span className="block text-sm font-medium text-frost">Regala la agenda a un familiar</span>
          <span className="block text-[13px] text-fog">Enviamos tu Agenda Esperanza 2027 a cualquier parte del mundo.</span>
        </span>
      </label>

      {gift && (
        <div>
          <label htmlFor="giftName" className={labelClass}>Nombre de quien recibe la agenda</label>
          <input id="giftName" name="giftName" autoComplete="off" className="input-field !text-base !py-2.5"
            aria-invalid={!!errors.giftName} aria-describedby={describe("giftName")} />
          <FieldError id="giftName-error" message={errors.giftName} />
        </div>
      )}

      <div>
        <label htmlFor="address" className={labelClass}>
          {gift ? "Dirección completa de tu familiar (ciudad y país)" : "Dirección de entrega de la agenda"}
        </label>
        <textarea id="address" name="address" rows={2} autoComplete={gift ? "off" : "street-address"} required
          className="input-field !text-base !py-2.5 resize-none" aria-invalid={!!errors.address}
          aria-describedby={describe("address") ?? "address-hint"} />
        {errors.address ? <FieldError id="address-error" message={errors.address} /> : (
          <p id="address-hint" className="mt-1.5 text-[13px] text-fog">
            {gift ? "Incluye calle, ciudad, código postal y país." : "En Montreal, Pedrito te la entrega personalmente."}
          </p>
        )}
      </div>

      {formError && (
        <p role="alert" className="rounded-lg bg-[rgba(228,109,76,0.12)] px-4 py-3 text-sm text-ember">
          {formError}
        </p>
      )}

      <button type="submit" disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-violet px-8 py-4 text-lg font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-frost focus-visible:outline-offset-2">
        {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : cash ? <Ticket className="h-5 w-5" /> : <Heart className="h-5 w-5" />}
        {submitting ? (cash ? "Registrando…" : "Abriendo pago seguro…") : cash ? "Registrar mi entrada" : "Donar $100 CAD"}
      </button>

      <div className="space-y-2 text-center text-[13px] text-fog">
        {!cash && (
          <p className="flex items-center justify-center gap-1.5">
            <Lock className="h-3.5 w-3.5" /> Pago seguro con Stripe · Tarjeta, Apple Pay o Google Pay
          </p>
        )}
        <p>
          ¿Dudas?{" "}
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="text-frost underline underline-offset-2 hover:text-ice">
            Escríbenos por WhatsApp
          </a>
        </p>
      </div>
    </form>
  );
}
