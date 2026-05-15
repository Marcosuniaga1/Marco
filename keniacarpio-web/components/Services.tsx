const featured = {
  title: "Tirada General",
  subtitle: "Amor, dinero, energía, salud y espiritualidad",
  intro: "Incluye:",
  parts: [
    "Tirada general",
    "Sesión de preguntas y respuestas",
    "Oráculo",
    "Péndulo",
    "Carta astral o Ritual en PDF",
  ],
  duration: "1h30",
  formats: [
    "1 pregunta",
    "3 Preguntas",
    "5 Preguntas",
    "Lectura en pareja (1h30)",
    "Carta astral",
  ],
};

const services = [
  {
    icon: "✦",
    title: "Lectura de Tarot",
    desc: "Lectura honesta sobre tu momento. No para que te diga lo que quieres oír. Te mostraré lo que ya sabes y aún no te atreves a aceptar.",
    tags: ["General", "Amor", "Decisiones", "Espiritualidad…"],
  },
  {
    icon: "☾",
    title: "Mensajes del oráculo",
    desc: "Respuesta directa desde los oráculos. Cuando solo necesitas una señal clara para moverte.",
    tags: ["Express", "Una pregunta"],
  },
  {
    icon: "🪡",
    title: "Péndulo",
    desc: "Respuestas concretas de sí o no. Para decisiones puntuales que necesitan claridad inmediata.",
    tags: ["Sí / No", "Express"],
  },
  {
    icon: "❋",
    title: "Kits energéticos",
    desc: "Limpieza, amor o abundancia. Hechos con intención y coherentes con tu objetivo. No son talismanes en serie, son herramientas.",
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
      <div className="absolute inset-0 starfield opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-noche/30 via-transparent to-noche/30" />

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

        {/* Featured — Tirada General */}
        <article className="relative mb-10 overflow-hidden rounded-3xl border border-oro/40 bg-noche/60 backdrop-blur p-8 md:p-10">
          <div className="absolute inset-0 bg-gradient-to-br from-violeta/30 via-transparent to-teal/20" />
          <div className="relative grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-center">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.4em] text-oro">
                Servicio principal
              </p>
              <h3 className="heading-serif text-3xl md:text-4xl mb-2 text-crema">
                {featured.title}
              </h3>
              <p className="text-oro/90 italic mb-4">{featured.subtitle}</p>
              <p className="text-crema/80 leading-relaxed mb-3">
                {featured.intro}
              </p>
              <p className="text-crema/85 leading-relaxed mb-5">
                {featured.parts.map((p, i) => (
                  <span key={p}>
                    {i > 0 && (
                      <>
                        {" "}
                        <span className="text-oro font-bold">+</span>{" "}
                      </>
                    )}
                    {p}
                  </span>
                ))}
              </p>
              <p className="text-xs uppercase tracking-widest text-oro">
                Duración base · {featured.duration}
              </p>
            </div>
            <div className="rounded-2xl border border-oro/25 bg-violeta-deep/60 p-6">
              <p className="mb-4 text-sm text-crema/90 leading-snug">
                ¿Quieres a Kenia para respuestas puntuales? Tienes estos
                formatos disponibles:
              </p>
              <ul className="space-y-3">
                {featured.formats.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm text-crema"
                  >
                    <span className="mt-0.5 text-oro">✦</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contacto"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-oro hover:gap-3 transition-all"
              >
                Reservar tu lectura <span>→</span>
              </a>
            </div>
          </div>
        </article>

        {/* Other services */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
