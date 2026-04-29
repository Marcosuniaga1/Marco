const testimonios = [
  {
    quote:
      "La lectura con Kenia fue como una sesión de terapia con magia. Salí con respuestas y, sobre todo, con calma.",
    name: "Andrea G.",
    place: "Caracas",
  },
  {
    quote:
      "Lo que más me gustó es que no te dice lo que quieres oír, te dice lo que necesitas oír. Honesta y cálida al mismo tiempo.",
    name: "Daniel P.",
    place: "Madrid",
  },
  {
    quote:
      "Estuve meses dándole vueltas a una decisión. Una hora con ella y por fin me moví. Eternamente agradecida.",
    name: "María José T.",
    place: "Valencia",
  },
];

export default function Testimonios() {
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

        <div className="grid gap-6 md:grid-cols-3">
          {testimonios.map((t) => (
            <figure
              key={t.name}
              className="relative rounded-2xl border border-oro/20 bg-violeta-deep/40 p-8 backdrop-blur-sm"
            >
              <span className="absolute -top-5 left-6 text-6xl text-oro/40 font-serif leading-none">
                &ldquo;
              </span>
              <blockquote className="text-crema/80 italic leading-relaxed">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-oro/15 pt-4">
                <p className="font-serif text-oro">{t.name}</p>
                <p className="text-xs uppercase tracking-widest text-crema/50">
                  {t.place}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
