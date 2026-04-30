const highlights = [
  {
    role: "Actriz",
    title: "Cine y televisión",
    desc: "Más de una década en producciones audiovisuales en Venezuela y Latinoamérica.",
  },
  {
    role: "Locutora · Creadora",
    title: "Voz y contenido",
    desc: "Locución, narrativa y creación de contenido. Una voz que escucha y sostiene.",
  },
  {
    role: "Psicopedagoga",
    title: "Acompañar procesos",
    desc: "Formación en aprendizaje y desarrollo, integrada hoy con tarot y rituales.",
  },
];

export default function Trayectoria() {
  return (
    <section
      id="trayectoria"
      className="section-padding relative bg-violeta-deep"
    >
      <div className="absolute inset-0 starfield opacity-20" />

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
            acompaña hoy cada lectura.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
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
