"use client";

import { useState } from "react";

const faqs = [
  {
    q: "¿Esto es una pirámide?",
    a: "No. En una pirámide se paga por reclutar, sin ningún producto real detrás. Visión 360 te da acceso a una plataforma de formación con valor propio: aprendes marketing digital, redes sociales, embudos de venta y emprendimiento, y puedes usar ese conocimiento aunque nunca ofrezcas el acceso a nadie más. Revender es una opción, no el único camino ni un requisito.",
  },
  {
    q: "¿Puede ser una estafa?",
    a: "Entiendo la duda, hoy circulan muchas. Por eso el pago me lo haces directo a mí, una persona real con la que puedes hablar todas las veces que necesites, no a una cuenta anónima. Puedo mostrarte la plataforma por videollamada antes de que decidas, y tienes mi garantía de devolución si algo no es como te lo mostré.",
  },
  {
    q: "¿Qué pasa si soy menor de edad?",
    a: "Lo hablamos también con tus papás antes de cualquier pago. No doy acceso a nadie menor de edad sin que sus padres estén al tanto y de acuerdo, y con gusto les explico yo mismo de qué se trata si tienen dudas.",
  },
  {
    q: "¿Cuánto tiempo necesito dedicarle?",
    a: "Depende de ti. Puedes avanzar los cursos a tu ritmo. Si además quieres generar ingresos ofreciendo el acceso, entre más constante seas, mejores resultados vas a ver — pero no hay un número mágico de horas que garantice algo.",
  },
  {
    q: "¿Cuándo empiezo a ganar?",
    a: "No te puedo dar una fecha, y desconfía de cualquiera que te la dé. Esto no es un ingreso automático ni garantizado, depende de tu constancia. Lo que sí te garantizo es acceso real a la plataforma y acompañamiento honesto de mi parte.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-bgdark px-5 py-16">
      <h2 className="section-title">Preguntas frecuentes</h2>
      <p className="section-subtitle">
        Todo lo que necesitas saber antes de escribirme.
      </p>

      <div className="mx-auto max-w-2xl space-y-3">
        {faqs.map((f, i) => (
          <div key={f.q} className="card cursor-pointer" onClick={() => setOpen(open === i ? null : i)}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">{f.q}</h3>
              <span className="text-violeta-light">{open === i ? "−" : "+"}</span>
            </div>
            {open === i && (
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
