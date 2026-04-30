export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-mystic-gradient"
    >
      <div className="absolute inset-0 starfield opacity-60 animate-twinkle" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-noche" />

      {/* Decorative floating tarot symbols */}
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute left-[8%] top-[20%] text-6xl text-oro/20 animate-float-slow">
          ☾
        </span>
        <span className="absolute right-[10%] top-[30%] text-5xl text-oro/15 animate-float-slow" style={{ animationDelay: "1s" }}>
          ✦
        </span>
        <span className="absolute left-[15%] bottom-[20%] text-7xl text-oro/10 animate-float-slow" style={{ animationDelay: "2s" }}>
          ✧
        </span>
        <span className="absolute right-[15%] bottom-[25%] text-6xl text-oro/20 animate-float-slow" style={{ animationDelay: "1.5s" }}>
          ☽
        </span>
      </div>

      <div className="container-narrow relative z-10 px-6 text-center md:px-12">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-oro animate-fade-in-up">
          Sal del Hueco · Kenia Carpio
        </p>
        <h1 className="heading-serif mb-6 text-5xl font-bold leading-tight md:text-7xl lg:text-8xl animate-fade-in-up" style={{ animationDelay: "0.15s", opacity: 0 }}>
          Bien brutal. <span className="gold-text">Bien bruja.</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-crema/80 md:text-xl animate-fade-in-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
          Tarot, oráculos y rituales para autoconocimiento real. Lecturas
          honestas, sin poses, con humor y verdad emocional.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up" style={{ animationDelay: "0.45s", opacity: 0 }}>
          <a href="#contacto" className="btn-primary">
            Agendar una cita
          </a>
          <a href="#sal-del-hueco" className="btn-outline">
            Ver Sal del Hueco
          </a>
        </div>
      </div>

      <a
        href="#sobre-mi"
        aria-label="Bajar a sobre mí"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-oro/60 hover:text-oro transition-colors"
      >
        <span className="block animate-float-slow text-3xl">↓</span>
      </a>
    </section>
  );
}
