export default function About() {
  return (
    <section
      id="sobre-mi"
      className="section-padding relative bg-noche"
    >
      <div className="container-narrow grid gap-12 md:grid-cols-2 md:items-center">
        <div className="relative">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl border border-oro/20 bg-violeta-deep shadow-2xl shadow-violeta/30">
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violeta via-violeta-deep to-noche">
              <span className="text-9xl text-oro/40">✦</span>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 hidden h-32 w-32 rounded-full border border-oro/30 bg-noche/80 backdrop-blur md:flex items-center justify-center">
            <span className="text-5xl text-oro">☾</span>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-oro">
            Sobre mí
          </p>
          <h2 className="heading-serif mb-6 text-4xl md:text-5xl">
            Una <span className="gold-text">guía</span> entre el arte y lo
            espiritual
          </h2>
          <div className="space-y-4 text-crema/80 leading-relaxed">
            <p>
              Soy Kenia Carpio, tarotista, actriz y conductora. Mi camino une
              dos pasiones: la escena y la introspección. He llevado mi voz a
              proyectos audiovisuales en cine y televisión, y hoy acompaño a
              personas a leer el mapa de sus propias vidas a través del tarot.
            </p>
            <p>
              Conduzco el programa{" "}
              <span className="text-oro font-medium">“Sal del Hueco”</span>,
              un espacio donde hablamos sin filtros sobre transformación,
              duelos, vínculos y los procesos que nadie te enseñó a atravesar.
            </p>
            <p>
              Cada lectura es un encuentro honesto: no vengo a adivinarte el
              futuro, vengo a recordarte tu poder.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { n: "+10", l: "Años en escena" },
              { n: "+500", l: "Lecturas realizadas" },
              { n: "1", l: "Programa propio" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-oro/20 bg-violeta-deep/40 p-4 text-center"
              >
                <p className="gold-text text-3xl font-serif font-bold">
                  {s.n}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-crema/60">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
