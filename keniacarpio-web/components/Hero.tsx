import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-mystic-gradient pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-36"
    >
      {/* Soft layered glow + subtle starfield */}
      <div className="absolute inset-0 soft-noise opacity-90" />
      <div className="absolute inset-0 starfield opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-noche/80" />

      <div className="container-narrow relative z-10 px-6 text-center md:px-12">
        {/* Main title — Kenia Carpio first, big */}
        <h1
          className="heading-serif mb-6 text-5xl font-bold leading-tight md:text-7xl lg:text-8xl animate-fade-in-up"
          style={{ animationDelay: "0.05s", opacity: 0 }}
        >
          Kenia <span className="gold-text">Carpio</span>
        </h1>

        {/* Logo as second visual */}
        <div
          className="mb-6 flex justify-center animate-fade-in-up"
          style={{ opacity: 0, animationDelay: "0.2s" }}
        >
          <Image
            src="/img/logo.PNG"
            alt="Sal del Hueco — Kenia Carpio, tarotista en Caracas"
            width={720}
            height={540}
            priority
            className="h-auto w-72 md:w-[26rem] lg:w-[32rem]"
          />
        </div>

        {/* Sub-header smaller */}
        <p
          className="mb-2 font-serif text-lg italic text-crema/90 md:text-xl animate-fade-in-up"
          style={{ animationDelay: "0.35s", opacity: 0 }}
        >
          Bien brutal, <span className="text-oro">bien bruja</span>
        </p>

        {/* SEO line — visible + indexable */}
        <p
          className="mb-6 text-xs uppercase tracking-[0.3em] text-oro/80 animate-fade-in-up"
          style={{ animationDelay: "0.45s", opacity: 0 }}
        >
          Tarotista · Caracas, Venezuela
        </p>

        {/* Description */}
        <p
          className="mx-auto mb-10 max-w-2xl text-base text-crema/85 md:text-lg animate-fade-in-up"
          style={{ animationDelay: "0.55s", opacity: 0 }}
        >
          Lectura de tarot{" "}
          <span className="text-oro">sin filtro, real y sin poses</span>.
          Online y presencial. Tarot, oráculos y rituales para autoconocimiento
          real, con humor y verdad emocional.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up"
          style={{ animationDelay: "0.7s", opacity: 0 }}
        >
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
