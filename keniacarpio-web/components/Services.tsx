const services = [
  {
    icon: "✦",
    title: "Lectura general",
    desc: "Una visión amplia de tu momento actual: amor, trabajo, salud, propósito. Ideal si sientes que estás en una encrucijada.",
    duration: "45 min",
  },
  {
    icon: "❤",
    title: "Tarot del amor",
    desc: "Claridad sobre tus vínculos: la pareja, lo que se va, lo que llega y los patrones que vale la pena soltar.",
    duration: "45 min",
  },
  {
    icon: "☾",
    title: "Guía espiritual",
    desc: "Una sesión más profunda para quienes buscan reconectar con su propósito, sanar duelos o tomar decisiones grandes.",
    duration: "60 min",
  },
  {
    icon: "✧",
    title: "Lectura express",
    desc: "Tres cartas, una pregunta concreta, una respuesta directa. Para cuando solo necesitas un norte rápido.",
    duration: "20 min",
  },
];

export default function Services() {
  return (
    <section
      id="servicios"
      className="section-padding relative bg-violeta-deep"
    >
      <div className="absolute inset-0 starfield opacity-20" />

      <div className="container-narrow relative z-10">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-oro">
            Servicios
          </p>
          <h2 className="heading-serif text-4xl md:text-5xl">
            Sesiones de <span className="gold-text">tarot</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-crema/70">
            Disponibles presencial y online. Cada sesión incluye grabación de
            audio para que puedas volver a escucharla.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article
              key={s.title}
              className="group relative rounded-2xl border border-oro/20 bg-noche/50 p-7 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-oro/60 hover:shadow-xl hover:shadow-oro/10"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-oro/40 bg-violeta/40 text-3xl text-oro">
                {s.icon}
              </div>
              <h3 className="heading-serif mb-2 text-2xl">{s.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-crema/70">
                {s.desc}
              </p>
              <p className="text-xs uppercase tracking-widest text-oro/80">
                {s.duration}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#contacto" className="btn-primary">
            Quiero agendar una cita
          </a>
        </div>
      </div>
    </section>
  );
}
