"use client";

import { useState } from "react";

const testimonios = [
  {
    quote:
      "Todas las veces que he tenido la oportunidad de que Kenia me lea las cartas me ha revelado cosas que luego me han llegado a mi vida para cambiar de manera positiva, y siempre ha sido en los momentos importantes de mi vida.",
    name: "Mariali Rosato",
  },
  {
    quote:
      "Contacté a Kenia por redes sociales por simple curiosidad. De inmediato, con la empatía que la caracteriza, usó sus mazos para ver qué me deparaba el destino. Hasta el sol de hoy me encuentro muy satisfecho con sus predicciones, es la mejor.",
    name: "Geison Scott",
  },
  {
    quote:
      "La que me dice las vainas sin pelos en la lengua pero con empatía, compasión y amor, cero juicio y mucha ayuda. Yo quierooo masss!",
    name: "Zendira Mendoza",
  },
  {
    quote:
      "Una conversa que te lleva a desbloquear emociones. Una conversa que te impulsa a tomar acción. Amo al 100%.",
    name: "Yesenia Camacho",
  },
  {
    quote:
      "Eres una maestra increíble. Siempre estaré agradecida por todo lo que hiciste para sanar mi relación con Alan antes de su partida. Qué alegría que otras personas puedan tenerte en sus vidas.",
    name: "Victoria Morales",
  },
  {
    quote:
      "Después de la charla contigo, me hizo reflexionar y pensar que no voy tan mal. No sé cómo explicarlo, pero me siento más tranquila. Antes sentía que no sabía si iba por buen camino con mis decisiones. Después de hablar contigo me siento más segura. Gracias.",
    name: "Daniela Vera",
  },
  {
    quote:
      "Las primeras veces que me leí el tarot con Kenia, ella apenas estaba aprendiendo. Me dijo que tendría un hijo pronto (no estaba en mis planes). En menos de 2 semanas la estaba llamando para contarle que estaba embarazada. 8 años después, incluso desde España, la llamo cada vez que puedo. Tiene un talento innato.",
    name: "Vane Reverón",
  },
  {
    quote:
      "Fui a una sesión de tarot terapéutico sin expectativas claras y salí con mucha más claridad sobre mí misma. No fue una lectura para predecir el futuro, sino una guía para entender mis emociones y patrones. Una experiencia muy reveladora, más cercana a una terapia que a algo esotérico.",
    name: "Valeska Rigio",
  },
  {
    quote:
      "Asistir a una lectura con Kenia es una experiencia transformadora. Va más allá de leer cartas: es sentarte con una amiga que no tiene pelos en la lengua pero que te abraza con cada palabra. Logra que las verdades incómodas lleguen con una sonrisa, sin el peso de la culpa. Definitivamente te ayuda a salir del hueco.",
    name: "José Vicente Yanez",
  },
  {
    quote:
      "Mi bruja favorita! Nunca te pelas, chama. Ya méteme en la agenda para otra sesión de tarot y péndulo!",
    name: "Laura Acosta",
  },
  {
    quote:
      "Mi querida Kenia me guió con las palabras adecuadas para salir del hueco con empatía y amor. Es cercana, maravillosa, talentosa. Hace de la sesión un momento liberador y terapéutico. Admiro la valentía de compartir su don y acompañar incluso en la distancia.",
    name: "Gabriela Mejías",
  },
  {
    quote:
      "Que Kenia te lea el tarot es una nota: súper agradable, carisma brutal, dice las cosas como son. Gracias por acompañarme en cada llamada, en cada ataque de ansiedad. Voy bien, un poco lenta por mí, pero gracias por estar ahí.",
    name: "Nire Huerta",
  },
];

const featuredTestimonial = {
  short:
    "Lo que comenzó como una consulta trivial se convirtió en un proceso de sanación. Kenia me obsequió un kit de ritual y, en medio de un trabajo para la abundancia, terminé sanando mi relación con mamá y papá. Pude decir por fin: 'Papá te amo y donde sea que estés te honro'. Solté un peso enorme que cargué por años. Esto no es adivinar, es mirar hacia adentro y llegar a la raíz.",
  full: [
    "¿Salir del hueco? Puede decirse fácil pero requiere compromiso, si lo que deseamos es una transformación real y no solo una salida rápida.",
    "Este compromiso necesita energía, fe y creer para que las bendiciones sean realmente palpables. No puede haber espacio para la duda ni el miedo.",
    "Lo que comenzó como una simple consulta a una pregunta trivial se convirtió en un proceso de sanación.",
    "Su primera respuesta fue: \"no busques afuera, busca adentro. Es una búsqueda calmada, tienes que volver al pasado para encontrar la respuesta. Tiene que ver algo con una biblioteca\".",
    "Nada de esto tenía sentido para mí, sin embargo lo creía y me enfocaba en encontrar la respuesta.",
    "La respuesta vino sola. Luego del episodio del podcast, Kenia me obsequió un kit para hacerme el ritual de Sal del Hueco, y estaba dándome una bendición enorme que ha transformado mi vida para mejor desde ese momento.",
    "Me ayudó sin pensarlo, en medio del ritual que era para la abundancia, a sanar a mamá y a papá. ¿Una experiencia heavy? Sí, muy heavy. Pero no dudé en ningún momento de su luz y su guía. El no dudar me permitió decir \"Papá, te amo y donde sea que estés te honro\". Esto antes no era posible para mí.",
    "Estaba soltando un peso enorme, algo que cargué sin necesidad por años y que hoy en día me liberó.",
    "No es adivinar y encontrar una solución inmediata: es mirar hacia adentro y llegar a la raíz. Hay que estar muy dispuesto a mirar de verdad y con fe.",
    "Una experiencia posterior: tenía días ansiosos por un paquete que mandé a traer de afuera y no aparecía. Le pedí que le preguntara a las cartas si aparecería. Su respuesta fue sí. Eso me calmó y me permitió soltar. Pasados unos días, el paquete apareció. Yo había decidido creer en su palabra.",
    "Solo hay que estar dispuestos a que las cosas sucedan.",
  ],
  name: "José Abreu",
  place: "Caracas · Mayo 2026",
};

export default function Testimonios() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="section-padding bg-noche">
      <div className="container-narrow">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-oro">
            Testimonios
          </p>
          <h2 className="heading-serif text-4xl md:text-5xl">
            Lo que dicen quienes <span className="gold-text">ya pasaron</span>{" "}
            por una sesión
          </h2>
        </div>

        {/* Featured testimonial — José Abreu */}
        <article className="relative mb-14 overflow-hidden rounded-3xl border border-oro/40 bg-violeta-deep/50 backdrop-blur p-8 md:p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-violeta/30 via-transparent to-teal/20" />
          <div className="relative">
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-oro">
              Testimonio destacado
            </p>
            <span className="absolute -top-2 -left-1 text-7xl font-serif text-oro/30 leading-none select-none">
              &ldquo;
            </span>

            {!expanded && (
              <blockquote className="font-serif text-lg md:text-xl text-crema/90 italic leading-relaxed pl-2">
                {featuredTestimonial.short}
              </blockquote>
            )}

            {expanded && (
              <blockquote className="space-y-4 pl-2">
                {featuredTestimonial.full.map((p, i) => (
                  <p
                    key={i}
                    className="font-serif text-base md:text-lg text-crema/85 leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </blockquote>
            )}

            <div className="mt-6 flex flex-col items-start gap-4 border-t border-oro/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-serif text-oro text-lg">
                  {featuredTestimonial.name}
                </p>
                <p className="text-xs uppercase tracking-widest text-crema/50">
                  {featuredTestimonial.place}
                </p>
              </div>
              <button
                onClick={() => setExpanded((v) => !v)}
                className="text-sm text-oro hover:text-oro-light transition-colors inline-flex items-center gap-2"
              >
                {expanded ? "Ver versión corta" : "Leer testimonio completo"}
                <span aria-hidden>{expanded ? "↑" : "→"}</span>
              </button>
            </div>
          </div>
        </article>

        {/* 12 short testimonials grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonios.map((t) => (
            <figure
              key={t.name}
              className="relative rounded-2xl border border-oro/20 bg-violeta-deep/40 p-6 backdrop-blur-sm transition-colors hover:border-oro/40"
            >
              <span className="absolute -top-4 left-5 text-5xl text-oro/30 font-serif leading-none select-none">
                &ldquo;
              </span>
              <blockquote className="text-sm text-crema/85 italic leading-relaxed pt-1">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 border-t border-oro/15 pt-3">
                <p className="font-serif text-oro">{t.name}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
