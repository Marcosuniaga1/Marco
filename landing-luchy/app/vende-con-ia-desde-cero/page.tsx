"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const CTA_URL =
  "https://wa.me/584125044476?text=Hola%20Mariale%2C%20quiero%20inscribirme%20en%20Vende%20con%20IA%20desde%20Cero%20por%20%247.%20%C2%BFMe%20pasas%20los%20datos%20de%20pago%20(Pago%20M%C3%B3vil%2C%20Zelle%20o%20Binance)%3F";

const VIDEO_ID = "TU_VIDEO_ID_AQUI";

const lecciones = [
  {
    titulo: "Mentalidad de ventas con IA",
    desc: "Elimina el miedo y entiende por qué la IA es tu mejor aliada para vender.",
  },
  {
    titulo: "Tu herramienta secreta",
    desc: "Configura la herramienta de IA que hará el trabajo pesado por ti.",
  },
  {
    titulo: "Estrategia de contenido que vende",
    desc: "Aprende qué publicar, cuándo y cómo para atraer clientes reales.",
  },
  {
    titulo: "Gemini como tu clienta ideal",
    desc: "Usa la IA para entender exactamente qué quiere tu audiencia.",
  },
  {
    titulo: "Tu primer contenido de ventas en 20 minutos",
    desc: "Crea tu primera pieza de contenido lista para publicar antes de terminar.",
  },
];

const faqs = [
  {
    pregunta: "No tengo tiempo, ¿me sirve igual?",
    respuesta:
      "El programa está diseñado para personas ocupadas. Son 5 lecciones cortas que puedes ver a tu ritmo. La lección final te lleva de la mano para crear tu primer contenido de ventas en solo 20 minutos.",
  },
  {
    pregunta: "No sé nada de tecnología, ¿podré seguirlo?",
    respuesta:
      "Todo está explicado paso a paso, desde cero. No necesitas experiencia técnica ni conocimientos previos de IA. Si sabes usar WhatsApp, puedes seguir este programa.",
  },
  {
    pregunta: "Ya compré cursos antes y no funcionaron…",
    respuesta:
      "Este no es un curso teórico de 40 horas. Son lecciones prácticas y directas donde terminas con un resultado real: tu primer contenido de ventas listo. Además, por $7 el riesgo es prácticamente cero.",
  },
];

export default function VendeConIAPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="bg-vinotinto px-5 py-16 text-center text-crema">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-dorado">
          Programa online de Mariale Velazco
        </p>
        <h1 className="mx-auto mb-6 max-w-2xl text-[1.8rem] font-extrabold leading-tight md:text-[2.6rem]">
          Vende con IA desde Cero
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-base text-[#f0e6e9] md:text-[1.15rem]">
          Aprende a usar la Inteligencia Artificial para crear contenido que
          vende, aunque nunca hayas publicado nada.
        </p>

        {/* Badge de precio */}
        <div className="mx-auto mb-3 inline-flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 backdrop-blur-sm">
          <span className="text-lg text-[#f0e6e9] line-through">$47</span>
          <span className="text-3xl font-extrabold text-dorado">$7</span>
        </div>
        <p className="mb-0 text-sm text-dorado">
          Oferta de lanzamiento &middot; válida por 72 horas
        </p>
      </section>

      {/* Video */}
      <section className="bg-vinotinto px-5 pb-16">
        <div className="relative mx-auto aspect-video max-w-3xl overflow-hidden rounded-xl shadow-2xl">
          <iframe
            className="absolute inset-0 h-full w-full border-0"
            src={`https://www.youtube.com/embed/${VIDEO_ID}`}
            title="Vende con IA desde Cero - Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* CTA debajo del video */}
        <div className="mt-8 text-center">
          <a
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta"
          >
            Quiero inscribirme por $7
          </a>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="bg-crema px-5 py-16">
        <h2 className="section-title">¿Qué incluye el programa?</h2>
        <div className="mx-auto max-w-2xl space-y-4">
          {lecciones.map((l, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-xl bg-white p-5 shadow-card"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-vinotinto text-sm font-bold text-crema">
                {i + 1}
              </span>
              <div>
                <h3 className="mb-1 font-bold text-vinotinto">{l.titulo}</h3>
                <p className="text-sm text-gray-600">{l.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Prueba social */}
      <section className="bg-white px-5 py-16">
        <h2 className="section-title">Lo que dicen quienes ya empezaron</h2>
        <div className="mx-auto max-w-2xl space-y-6">
          {/* Testimonio 1 */}
          <div className="rounded-xl border-l-4 border-dorado bg-crema p-6 shadow-card">
            <p className="mb-4 italic text-gray-700">
              &ldquo;Yo no sabía nada de IA y en 20 minutos ya tenía mi primer
              post listo para publicar. Increíble lo simple que es cuando te lo
              explican bien.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-vinotinto text-sm font-bold text-crema">
                MR
              </span>
              <div>
                <p className="text-sm font-bold text-vinotinto">
                  María R.
                </p>
                <p className="text-xs text-gray-500">Emprendedora</p>
              </div>
            </div>
          </div>

          {/* Testimonio 2 */}
          <div className="rounded-xl border-l-4 border-dorado bg-crema p-6 shadow-card">
            <p className="mb-4 italic text-gray-700">
              &ldquo;Pensé que la IA era solo para expertos en tecnología.
              Mariale me demostró lo contrario. Ahora publico contenido todos
              los días sin estrés.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-vinotinto text-sm font-bold text-crema">
                CL
              </span>
              <div>
                <p className="text-sm font-bold text-vinotinto">
                  Carolina L.
                </p>
                <p className="text-xs text-gray-500">Coach de bienestar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Objeciones */}
      <section className="bg-crema px-5 py-16">
        <h2 className="section-title">Preguntas frecuentes</h2>
        <div className="mx-auto max-w-2xl space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl bg-white shadow-card">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left font-bold text-vinotinto"
              >
                <span>{faq.pregunta}</span>
                <span className="ml-3 shrink-0 text-xl text-dorado">
                  {openFaq === i ? "−" : "+"}
                </span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-sm text-gray-600">
                  {faq.respuesta}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Urgencia + CTA final */}
      <section className="bg-vinotinto px-5 py-16 text-center text-crema">
        <h2 className="mx-auto mb-4 max-w-xl text-[1.6rem] font-extrabold leading-tight md:text-[2.2rem]">
          Esta oferta de $7 se termina en 72 horas
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-[#f0e6e9]">
          Después de eso, el precio vuelve a $47. No dejes pasar esta
          oportunidad de empezar a vender con Inteligencia Artificial.
        </p>
        <a
          href={CTA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta"
        >
          Quiero inscribirme por $7
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-vinotinto-dark px-5 py-8 text-center text-[0.9rem] text-crema">
        <p>
          &copy; {new Date().getFullYear()} {site.name}. Todos los derechos
          reservados.
        </p>
        <div className="mt-3">
          <a href="/privacidad" className="mx-2 text-dorado hover:underline">
            Privacidad
          </a>
          <a href="/terminos" className="mx-2 text-dorado hover:underline">
            Términos
          </a>
          <a href="/aviso-legal" className="mx-2 text-dorado hover:underline">
            Aviso legal
          </a>
        </div>
      </footer>
    </>
  );
}
