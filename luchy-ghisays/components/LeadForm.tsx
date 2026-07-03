"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/lib/site";

type Variant = "hero" | "card";

export default function LeadForm({ variant }: { variant: Variant }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const nombre = (form.elements.namedItem("nombre") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();

    if (!nombre) {
      setError("Por favor escribe tu nombre.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Revisa tu email.");
      return;
    }

    setSubmitting(true);

    try {
      // Datos como query params en la URL: Apps Script los lee siempre desde
      // e.parameter (es exactamente el método que ya validamos por URL).
      const params = new URLSearchParams({ nombre, email });
      await fetch(`${site.leadFormEndpoint}?${params.toString()}`, {
        method: "POST",
        mode: "no-cors",
      });
    } catch {
      // no-cors siempre da respuesta opaca; continuamos igual
    }

    window.gtag?.("event", "generate_lead", { email });
    window.fbq?.("track", "Lead");
    try {
      sessionStorage.setItem("lead_nombre", nombre);
    } catch {
      // sessionStorage puede no estar disponible
    }
    router.push("/gracias");
  }

  const label = submitting ? "Enviando…" : "Descargar PDF Gratis";

  if (variant === "hero") {
    return (
      <form ref={formRef} className="heroForm" autoComplete="on" noValidate onSubmit={handleSubmit}>
        <div className="invite">
          <span className="pdf">PDF</span> Descarga gratis «Las 10 señales de que
          estás en automático».
        </div>
        <input type="text" name="nombre" placeholder="Tu nombre" required />
        <input type="email" name="email" placeholder="tu@email.com" required />
        <button type="submit" className="btn" disabled={submitting}>
          {label}
        </button>
        <div className="err">{error}</div>
        <div className="guarantee">Acceso inmediato. Sin spam. Garantizado.</div>
      </form>
    );
  }

  return (
    <form ref={formRef} className="leadForm" autoComplete="on" noValidate onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="tu@email.com" required />
      </div>
      <button type="submit" className="btn" disabled={submitting}>
        {label}
      </button>
      <div className="err">{error}</div>
      <div className="guarantee">Acceso inmediato. Sin spam. Garantizado.</div>
    </form>
  );
}
