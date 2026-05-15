const highlights = [
  {
    role: "Actriz",
    title: "Cine, Teatro y TV",
    desc: "Más de una década en producciones audiovisuales y montajes teatrales en Venezuela y Latinoamérica.",
  },
  {
    role: "Locutora · Creadora",
    title: "Voz y contenido",
    desc: "Locución, narrativa y creación de contenido. Impulsa marcas a través de su presencia y su voz.",
  },
  {
    role: "Imagen de marca",
    title: "Identidad visual y verbal",
    desc: "Responsable de la creación de identidad visual y verbal de tu marca, impulsándola con un mensaje claro, creativo y de buen gusto.",
  },
  {
    role: "Psicopedagoga",
    title: "Acompañar procesos",
    desc: "Formación en aprendizaje y desarrollo, integrada hoy con tarot y rituales.",
  },
];

const featured = {
  role: "Productora de contenido para marcas",
  title: "Estrategia + producción audiovisual completa",
  bullets: [
    "Diseño de estrategia y plan de impulso para redes sociales.",
    "Dirección creativa: locación, vestuario, paleta visual, guion.",
    "Producción técnica: cámara, luces y equipo de rodaje.",
    "Posproducción: edición y entrega de piezas listas para publicar.",
  ],
  note: "No gestiono las cuentas. Creo el contenido que las hace crecer.",
};

export default function Trayectoria() {
  return (
    <section
      id="trayectoria"
      className="section-padding relative bg-violeta-deep overflow-hidden"
    >
      <div className="absolute inset-0 starfield opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-noche/40 via-transparent to-noche/40" />

      <div className="container-narrow relative z-10">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-oro">
            Trayectoria
          </p>
          <h2 className="heading-serif text-4xl md:text-5xl">
            Una <span className="gold-text">voz</span> entrenada en escuchar
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-crema/70">
            Antes de leer cartas leí guiones. La actuación, la locución y la
            psicopedagogía me enseñaron a escuchar, a sostener silencios y a
            habitar emociones que parecen imposibles. Esa misma sensibilidad
            acompaña hoy cada lectura, y cada producción.
          </p>
        </div>

        {/* Featured card — Productora de contenido */}
        <article className="relative mb-10 overflow-hidden rounded-3xl border border-oro/40 bg-noche/60 backdrop-blur p-8 md:p-10">
          <div className="absolute inset-0 bg-gradient-to-br from-violeta/30 via-transparent to-teal/20" />
          <div className="relative grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-oro">
                {featured.role}
              </p>
              <h3 className="heading-serif text-2xl md:text-3xl mb-4 text-crema">
                {featured.title}
              </h3>
              <ul className="space-y-2">
                {featured.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-sm text-crema/80 leading-relaxed"
                  >
                    <span className="mt-1 text-oro">✦</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <blockquote className="rounded-2xl border border-oro/25 bg-violeta-deep/60 p-6 md:p-7">
              <p className="font-serif text-lg md:text-xl text-crema italic leading-snug">
                &ldquo;{featured.note}&rdquo;
              </p>
            </blockquote>
          </div>
        </article>

        {/* Role highlights */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <article
              key={h.title}
              className="rounded-2xl border border-oro/20 bg-noche/40 p-7 backdrop-blur-sm transition-all hover:border-oro/50"
            >
              <p className="mb-2 text-xs uppercase tracking-widest text-oro/80">
                {h.role}
              </p>
              <h3 className="heading-serif mb-3 text-2xl">{h.title}</h3>
              <p className="text-sm leading-relaxed text-crema/70">{h.desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center">
          <p className="text-crema/60 text-sm">
            Filmografía completa y créditos verificados:
          </p>
          <a
            href="https://www.imdb.com/es/name/nm6003094/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <span className="font-bold tracking-wider">IMDb</span>
            <span>· Ver perfil oficial ↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
