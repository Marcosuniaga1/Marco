import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-mystic-gradient"
    >
      {/* Soft layered glow — no stars, no moons */}
      <div className="absolute inset-0 soft-noise opacity-90" />
      <div className="absolute inset-0 starfield opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-noche/80" />

      <div className="container-narrow relative z-10 px-6 text-center md:px-12">
        {/* Pre-header */}
        <p className="mb-6 text-xs uppercase tracking-[0.5em] text-oro/90 animate-fade-in-up">
          Kenia Carpio
        </p>

        {/* Logo as the main title */}
        <div className="mb-8 flex justify-center animate-fade-in-up" style={{ animationDelay: "0.15s", opacity: 0 }}>
          <Image
            src="/img/logo.PNG"
            alt="Sal del Hueco"
            width={520}
            height={520}
            priority
            className="h-auto w-72 md:w-96 lg:w-[28rem] drop-shadow-[0_0_40px_rgba(245,220,106,0.25)]"
          />
        </div>

        {/* Sub-header */}
        <h1 className="heading-serif mb-6 text-3xl font-medium leading-tight md:text-5xl lg:text-6xl animate-fade-in-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
          Bien brutal, <span className="gold-text">bien bruja</span>
        </h1>

        {/* Description */}
        <p className="mx-auto mb-10 max-w-2xl text-base text-crema/85 md:text-lg animate-fade-in-up" style={{ animationDelay: "0.45s", opacity: 0 }}>
          Tarot, oráculos y rituales para autoconocimiento real. Lecturas
          honestas, sin poses, con humor y verdad emocional.
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up" style={{ animationDelay: "0.6s", opacity: 0 }}>
          <a href="#contacto" className="btn-primary">
            Agendar una lectura
          </a>
          <a href="#sal-del-hueco" className="btn-outline">
            Conocer el proyecto
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
