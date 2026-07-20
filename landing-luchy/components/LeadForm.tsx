"use client";

import { useState } from "react";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const fields = [
  {
    id: "nombre",
    label: "Nombre",
    type: "text",
    placeholder: "Tu nombre completo",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "tucorreo@ejemplo.com",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    type: "tel",
    placeholder: "584125044476",
  },
] as const;

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      nombre: String(formData.get("nombre") ?? ""),
      email: String(formData.get("email") ?? ""),
      whatsapp: String(formData.get("whatsapp") ?? ""),
    };

    try {
      // Google Apps Script no envía cabeceras CORS, por eso usamos no-cors.
      // La respuesta es opaca: si no lanza error, asumimos que se recibió.
      await fetch(site.leadFormEndpoint, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(data),
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="formulario" className="bg-white px-5 py-16">
      <h2 className="section-title">Reserva tu lugar</h2>

      <div className="mx-auto max-w-md rounded-2xl bg-crema p-7 shadow-form">
        {status === "success" ? (
          <p className="py-6 text-center text-lg font-semibold text-vinotinto">
            ¡Listo! Te contactaremos pronto. 🎉
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {fields.map((field) => (
              <div key={field.id} className="mb-[18px]">
                <label
                  htmlFor={field.id}
                  className="mb-1.5 block text-[0.95rem] font-semibold text-vinotinto"
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  required
                  className="w-full rounded-lg border-2 border-[#e0d6c8] bg-white px-3.5 py-3 text-base outline-none transition-colors focus:border-dorado"
                />
              </div>
            ))}

            {status === "error" && (
              <p className="mb-3 text-sm font-medium text-vinotinto">
                Hubo un problema al enviar. Intenta de nuevo, por favor.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-cta mt-2.5 w-full text-center disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "submitting"
                ? "Enviando..."
                : "Quiero aprender este sistema"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
