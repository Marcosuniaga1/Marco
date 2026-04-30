const services = [
  {
    icon: "✦",
    title: "Lectura de Tarot",
    desc: "Una lectura honesta. No para que te diga lo que quieres oír — para que te muestre lo que ya sabes y aún no te atreves a aceptar.",
    tags: ["General", "Amor", "Decisiones", "Espiritual"],
  },
  {
    icon: "☾",
    title: "Mensajes oraculares",
    desc: "Pregunta concreta, respuesta directa desde los oráculos. Cuando solo necesitas una señal clara para moverte.",
    tags: ["Express", "Una pregunta"],
  },
  {
    icon: "❋",
    title: "Kits energéticos",
    desc: "Limpieza, amor o abundancia. Hechos con intención y coherentes con tu objetivo. No son talismanes en serie — son herramientas.",
    tags: ["Limpieza", "Amor", "Abundancia"],
  },
  {
    icon: "✺",
    title: "Rituales personalizados",
    desc: "Símbolos, fuego y códigos diseñados para tu proceso. Para soltar, abrir camino, cerrar ciclos o invocar lo que viene.",
    tags: ["A medida", "Por intención"],
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
            Herramientas para{" "}
            <span className="gold-text">salir del hueco</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-crema/70">
            Cada servicio nace de la misma esencia: verdad, conciencia y respeto
            por tu proceso. Sin promesas mágicas. Sin gurús.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
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
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-oro/30 px-3 py-1 text-xs uppercase tracking-wider text-oro/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#contacto" className="btn-primary">
            Quiero agendar una lectura
          </a>
        </div>
      </div>
    </section>
  );
}
