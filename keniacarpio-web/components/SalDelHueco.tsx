export default function SalDelHueco() {
  return (
    <section
      id="sal-del-hueco"
      className="section-padding relative bg-noche"
    >
      <div className="container-narrow">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-oro">
            Programa
          </p>
          <h2 className="heading-serif text-4xl md:text-5xl">
            Sal del <span className="gold-text">Hueco</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-crema/70">
            Conversaciones honestas sobre transformación, vínculos, duelos y los
            procesos que nadie te enseñó a atravesar. Un espacio para que
            recuerdes que no estás sola, ni solo.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-3xl border border-oro/30 shadow-2xl shadow-violeta/40">
            <div className="relative aspect-video bg-violeta-deep">
              <iframe
                src="https://www.youtube.com/embed/-bXvsIE-6mc"
                title="Sal del Hueco — episodio destacado"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://www.youtube.com/watch?v=-bXvsIE-6mc"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Ver en YouTube ↗
            </a>
            <a href="#contacto" className="btn-primary">
              Quiero ser parte
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
