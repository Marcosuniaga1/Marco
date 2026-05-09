const valores = [
  { i: "✦", t: "Honestidad", d: "Verdad con cuidado." },
  { i: "☾", t: "Coherencia", d: "Decir y hacer alineado." },
  { i: "✧", t: "Autenticidad", d: "Voz propia, sin poses." },
  { i: "❋", t: "Responsabilidad", d: "Sobre tu propio proceso." },
  { i: "☽", t: "Respeto", d: "A los tiempos de cada quien." },
  { i: "✺", t: "Humor", d: "Como medicina." },
];

const propuesta = [
  {
    t: "Lecturas honestas",
    d: "Tarot sin pelos en la lengua. No te digo lo que quieres oír, te digo lo que necesitas oír.",
  },
  {
    t: "Rituales con intención real",
    d: "Símbolos, fuego y códigos para volver a la vida con más poder. No para escapar de ella.",
  },
  {
    t: "Kits energéticos coherentes",
    d: "Limpieza, amor, abundancia. Hechos con intención, no en serie.",
  },
];

export default function SalDelHueco() {
  return (
    <section
      id="sal-del-hueco"
      className="relative bg-mystic-gradient overflow-hidden"
    >
      <div className="absolute inset-0 soft-noise opacity-80" />
      <div className="absolute inset-0 starfield opacity-30" />
      {/* Subtle floating moons */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute left-[6%] top-[14%] text-3xl text-oro/12 animate-float-slow select-none" aria-hidden>☾</span>
        <span className="absolute right-[7%] top-[40%] text-2xl text-oro/10 animate-float-slow select-none" style={{ animationDelay: "1.5s" }} aria-hidden>☽</span>
        <span className="absolute left-[10%] bottom-[18%] text-3xl text-oro/12 animate-float-slow select-none" style={{ animationDelay: "0.8s" }} aria-hidden>☾</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-noche/50 via-transparent to-noche/60" />

      <div className="section-padding relative z-10 container-narrow">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.4em] text-oro">
            Proyecto · Filosofía · Identidad
          </p>
          <h2 className="heading-serif text-5xl md:text-7xl mb-4">
            Sal del <span className="gold-text">Hueco</span>
          </h2>
          <p className="font-serif text-xl md:text-2xl text-crema italic">
            Bien brutal, <span className="gold-text">bien bruja</span>
          </p>
        </div>

        {/* Esencia */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <p className="text-lg text-crema/80 leading-relaxed">
            Misticismo real, sin poses, con humor, profundidad y verdad
            emocional. Un proyecto espiritual y creativo que usa el{" "}
            <span className="text-oro">Tarot, oráculos y rituales</span> como
            herramientas de autoconocimiento, conciencia y toma de decisiones.
          </p>
        </div>

        {/* Concepto El Hueco */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 md:items-center">
          <div className="rounded-3xl border border-oro/30 bg-noche/60 backdrop-blur p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-oro mb-3">
              ¿Qué es el hueco?
            </p>
            <h3 className="heading-serif text-3xl mb-4">
              No solo es <span className="gold-text">depresión</span>
            </h3>
            <p className="text-crema/80 leading-relaxed">
              El hueco es cualquier área de tu vida donde falta luz: una
              relación que te apaga, un país que no te sostiene, un trabajo que
              te achica, una versión tuya que ya no existe.
            </p>
          </div>
          <blockquote className="rounded-3xl border border-oro/30 bg-violeta-deep/60 backdrop-blur p-8">
            <p className="font-serif text-2xl md:text-3xl text-crema leading-snug">
              &ldquo;No te saco del hueco.{" "}
              <span className="gold-text">Te acompaño a que tú salgas.</span>
              &rdquo;
            </p>
            <footer className="mt-4 text-sm uppercase tracking-widest text-oro/80">
              — Frase guía interna
            </footer>
          </blockquote>
        </div>

        {/* Propuesta de valor */}
        <div className="mb-16">
          <h3 className="heading-serif text-3xl md:text-4xl text-center mb-10">
            Lo que <span className="gold-text">encontrarás</span> aquí
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {propuesta.map((p) => (
              <div
                key={p.t}
                className="rounded-2xl border border-oro/20 bg-noche/50 backdrop-blur p-7 hover:border-oro/50 transition-colors"
              >
                <h4 className="heading-serif text-xl mb-3 text-oro">{p.t}</h4>
                <p className="text-sm leading-relaxed text-crema/75">{p.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Valores */}
        <div className="mb-16">
          <h3 className="heading-serif text-3xl md:text-4xl text-center mb-10">
            <span className="gold-text">Valores</span> que sostienen
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {valores.map((v) => (
              <div
                key={v.t}
                className="flex items-start gap-4 rounded-2xl border border-oro/15 bg-violeta-deep/30 p-5"
              >
                <span className="text-3xl text-oro flex-shrink-0">{v.i}</span>
                <div>
                  <p className="font-serif text-lg text-crema">{v.t}</p>
                  <p className="text-xs text-crema/60">{v.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manifiesto */}
        <div className="mb-16 rounded-3xl border border-oro/30 bg-noche/70 backdrop-blur p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.4em] text-oro text-center mb-6">
            Manifiesto
          </p>
          <div className="font-serif text-crema/90 text-lg md:text-xl leading-relaxed space-y-4 max-w-3xl mx-auto">
            <p>
              No nacimos para estar rotos en silencio. Pero tampoco para fingir
              que todo está bien.
            </p>
            <p>
              <span className="gold-text">SAL DEL HUECO</span> nació en la
              oscuridad. En un lugar donde nada funcionaba y las respuestas no
              llegaban aunque se pidieran de rodillas.
            </p>
            <p>
              No creemos en la espiritualidad que maquilla el dolor.{" "}
              <span className="text-oro">Creemos en la que lo mira de frente.</span>
            </p>
            <p>
              El Tarot no adivina tu futuro. Te muestra lo que ya sabes, pero no
              te atreves a aceptar. Las cartas no deciden por ti. Te devuelven
              la responsabilidad de elegir con conciencia.
            </p>
            <p>
              Aquí no prometemos luz eterna.{" "}
              <span className="text-oro">Prometemos verdad.</span> Y a veces la
              verdad duele… pero siempre libera.
            </p>
            <p className="text-2xl md:text-3xl text-crema italic text-center pt-4">
              Porque salir del hueco no es magia.{" "}
              <span className="gold-text">Es coraje.</span>
            </p>
          </div>
        </div>

        {/* Video del programa */}
        <div className="relative mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.4em] text-oro text-center mb-4">
            Episodio destacado
          </p>
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
              href="https://www.instagram.com/saldelhueco/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Síguenos en Instagram ↗
            </a>
            <a href="#contacto" className="btn-primary">
              Quiero una lectura
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
