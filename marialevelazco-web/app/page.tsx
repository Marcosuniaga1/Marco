"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "584121234567"; // TODO: reemplaza por el número real de Mariale (formato internacional sin +)
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hola Mariale, quiero aprender el sistema simple de IA para mi negocio 🙌"
);
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const TESTIMONIOS = [
  {
    name: "Carmen Rodríguez",
    role: "Emprendedora de repostería",
    quote:
      "No sabía nada de IA y pensaba que era solo para 'gente de tecnología'. En 20 minutos aprendí el sistema de Mariale y hoy publico todos los días sin miedo a equivocarme.",
    initial: "C",
  },
  {
    name: "Valentina Pérez",
    role: "Asesora de imagen",
    quote:
      "Antes publicaba y nadie me compraba. Ahora tengo un sistema claro: sé qué decir, cómo decirlo y cuándo publicarlo. Mis clientas me escriben solas.",
    initial: "V",
  },
  {
    name: "Daniela Gómez",
    role: "Dueña de tienda online",
    quote:
      "La IA me daba miedo porque pensaba que era complicada. Mariale me explicó todo con paciencia y paso a paso. Hoy ahorro horas de trabajo cada semana.",
    initial: "D",
  },
];

export default function Home() {
  const [form, setForm] = useState({ nombre: "", email: "", whatsapp: "" });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: conectar con tu proveedor de formularios / CRM (ej. Make, Zapier, Google Sheets, etc.)
    setEnviado(true);
  };

  return (
    <main className="overflow-x-hidden bg-crema">
      {/* HERO */}
      <section className="relative bg-vino-gradient px-6 py-14 text-crema md:px-12 md:py-20">
        <div className="container-narrow flex flex-col items-center text-center">
          <span className="mb-4 inline-block rounded-full border border-dorado/60 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-dorado">
            Mentora de IA para Emprendedoras
          </span>

          <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Aprende a usar la IA para vender más,{" "}
            <span className="gold-text">sin miedo y sin complicaciones</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base text-crema/90 sm:text-lg">
            Carmen no sabía nada de IA. Hoy publica sin miedo. ¿Quieres
            aprender el mismo sistema?
          </p>

          {/* Video placeholder */}
          <div className="mt-8 w-full max-w-3xl">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-dorado/40 shadow-2xl shadow-black/30">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/VIDEO_ID_AQUI"
                title="Video de presentación de Mariale Velazco"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <a
            href="#formulario"
            className="btn-primary mt-8"
          >
            Quiero aprender el sistema
          </a>
        </div>
      </section>

      {/* COPY / DOLOR */}
      <section className="section-padding bg-crema">
        <div className="container-narrow grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <h2 className="heading-serif text-2xl font-bold sm:text-3xl">
              ¿Te suena familiar?
            </h2>
            <ul className="space-y-3 text-base text-vinotinto-dark sm:text-lg">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-dorado">●</span>
                <span>Publicas pero nadie te compra.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-dorado">●</span>
                <span>La IA parece complicada.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-dorado">●</span>
                <span>Tienes miedo de no saber.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-dorado/30 bg-white p-6 shadow-xl shadow-vinotinto/10 sm:p-8">
            <p className="text-base leading-relaxed text-vinotinto sm:text-lg">
              <span className="font-bold">Carmen estaba donde estás tú.</span>{" "}
              Aprendió un sistema simple en{" "}
              <span className="font-bold text-dorado-dark">20 minutos</span>.
              Hoy publica con seguridad.
            </p>
            <p className="mt-4 text-lg font-bold text-vinotinto sm:text-xl">
              ¿Quieres aprender ese sistema?
            </p>
            <a href="#formulario" className="btn-outline mt-6 w-full !text-vinotinto !border-vinotinto hover:!bg-vinotinto/10">
              Sí, quiero el sistema
            </a>
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section id="formulario" className="section-padding bg-vinotinto/5">
        <div className="container-narrow">
          <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-2xl shadow-vinotinto/10 sm:p-10">
            <h2 className="heading-serif text-center text-2xl font-bold sm:text-3xl">
              Reserva tu lugar
            </h2>
            <p className="mt-2 text-center text-vinotinto-dark/80">
              Déjame tus datos y te cuento cómo aplicar el sistema en tu
              negocio.
            </p>

            {enviado ? (
              <div className="mt-8 rounded-xl border border-dorado/40 bg-dorado/10 p-6 text-center">
                <p className="text-lg font-semibold text-vinotinto">
                  ¡Gracias! 🎉
                </p>
                <p className="mt-1 text-vinotinto-dark/80">
                  Hemos recibido tus datos. Muy pronto te contactaremos.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div>
                  <label
                    htmlFor="nombre"
                    className="mb-1 block text-sm font-semibold text-vinotinto"
                  >
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className="w-full rounded-lg border border-vinotinto/20 bg-crema px-4 py-3 text-vinotinto outline-none transition-colors focus:border-dorado focus:ring-2 focus:ring-dorado/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-semibold text-vinotinto"
                  >
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full rounded-lg border border-vinotinto/20 bg-crema px-4 py-3 text-vinotinto outline-none transition-colors focus:border-dorado focus:ring-2 focus:ring-dorado/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="whatsapp"
                    className="mb-1 block text-sm font-semibold text-vinotinto"
                  >
                    WhatsApp
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    required
                    value={form.whatsapp}
                    onChange={handleChange}
                    placeholder="+58 412 1234567"
                    className="w-full rounded-lg border border-vinotinto/20 bg-crema px-4 py-3 text-vinotinto outline-none transition-colors focus:border-dorado focus:ring-2 focus:ring-dorado/30"
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Quiero aprender el sistema
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="section-padding bg-crema">
        <div className="container-narrow">
          <h2 className="heading-serif text-center text-2xl font-bold sm:text-3xl">
            Mujeres que ya lo lograron
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TESTIMONIOS.map((t) => (
              <div
                key={t.name}
                className="flex flex-col rounded-2xl border border-dorado/20 bg-white p-6 shadow-lg shadow-vinotinto/5"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-vino-gradient font-serif text-lg font-bold text-dorado">
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-vinotinto">{t.name}</p>
                    <p className="text-sm text-vinotinto-dark/70">{t.role}</p>
                  </div>
                </div>
                <p className="flex-1 text-sm leading-relaxed text-vinotinto-dark/90 sm:text-base">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 text-dorado">★★★★★</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-vino-gradient px-6 py-16 text-center text-crema md:px-12 md:py-20">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl font-bold sm:text-3xl md:text-4xl">
            Tu momento de publicar{" "}
            <span className="gold-text">con seguridad</span> es ahora
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-crema/90 sm:text-lg">
            Escríbeme directo por WhatsApp y te cuento cómo empezar hoy mismo
            con el sistema simple de IA.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-base font-bold text-white shadow-xl shadow-black/20 transition-transform hover:scale-105 sm:text-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="h-6 w-6 fill-white"
              aria-hidden="true"
            >
              <path d="M16.04 2.667C8.665 2.667 2.667 8.665 2.667 16.04c0 2.823.86 5.448 2.33 7.654L3.333 29.333l5.79-1.62a13.27 13.27 0 0 0 6.917 1.96c7.375 0 13.373-5.998 13.373-13.373S23.415 2.667 16.04 2.667Zm0 24.213a11.13 11.13 0 0 1-5.94-1.717l-.426-.262-3.43.96.97-3.34-.28-.443a11.137 11.137 0 0 1-1.72-5.94c0-6.157 5.013-11.17 11.826-11.17 6.157 0 11.17 5.013 11.17 11.17 0 6.813-5.013 11.825-11.17 11.825v-.083Zm6.13-8.36c-.336-.168-1.987-.98-2.295-1.092-.308-.112-.532-.168-.756.168-.224.336-.868 1.092-1.064 1.316-.196.224-.392.252-.728.084-.336-.168-1.418-.523-2.7-1.668-.998-.89-1.673-1.99-1.869-2.326-.196-.336-.02-.518.168-.7.196-.196.42-.504.616-.756.196-.252.252-.42.392-.7.14-.28.07-.504-.028-.7-.098-.196-.756-1.82-1.036-2.492-.28-.672-.56-.58-.756-.588h-.644c-.224 0-.588.084-.896.42-.308.336-1.176 1.148-1.176 2.8 0 1.652 1.204 3.248 1.372 3.472.168.224 2.296 3.5 5.572 4.768 3.276 1.268 3.276.84 3.864.784.588-.056 1.89-.756 2.156-1.484.266-.728.266-1.36.196-1.484-.07-.124-.252-.196-.532-.336Z" />
            </svg>
            Escribir por WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-vinotinto-dark px-6 py-6 text-center text-sm text-crema/70">
        <p>
          © {new Date().getFullYear()} Mariale Velazco · Mentora de IA para
          Emprendedoras. Todos los derechos reservados.
        </p>
      </footer>
    </main>
  );
}
