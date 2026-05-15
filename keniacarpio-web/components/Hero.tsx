import Image from "next/image";
import FloatingMoons from "./FloatingMoons";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-mystic-gradient pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-36"
    >
      {/* Soft layered glow + subtle starfield */}
      <div className="absolute inset-0 soft-noise opacity-90" />
      <div className="absolute inset-0 starfield opacity-55" />
      <FloatingMoons variant="more" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-noche/80" />

      <div className="container-narrow relative z-10 px-6 text-center md:px-12">
        {/* Kenia Carpio — name, above the logo */}
        <h1
          className="heading-serif text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight animate-fade-in-up"
          style={{ animationDelay: "0.05s", opacity: 0 }}
        >
          Kenia <span className="gold-text">Carpio</span>
        </h1>

        {/* SEO line — visible + crawleable, smaller */}
        <p
          className="mt-2 mb-6 md:mb-10 text-[10px] md:text-xs uppercase tracking-[0.4em] text-oro/85 animate-fade-in-up"
          style={{ animationDelay: "0.15s", opacity: 0 }}
        >
          Tarotista · Caracas · Venezuela
        </p>

        {/* Logo as the dominant visual — shifted right to balance composition (hat heavy on left) */}
        <div
          className="mx-auto inline-block translate-x-6 md:translate-x-16 lg:translate-x-24 animate-fade-in-up"
          style={{ animationDelay: "0.25s", opacity: 0 }}
        >
          <Image
            src="/img/logo.PNG"
            alt="Sal del Hueco — Kenia Carpio, tarotista en Caracas"
            width={1000}
            height={750}
            priority
            className="h-auto w-[20rem] sm:w-[26rem] md:w-[34rem] lg:w-[40rem]"
          />
        </div>

        {/* "Bien brutal, bien bruja" — centered on the page, slightly nudged left
            to compensate for the perceived visual center (logo composition is hat-heavy
            on the left, which biases the eye). Pulled up via negative margin so it sits
            at the bottom of the logo art. */}
        <p
          className="-mt-3 md:-mt-6 lg:-mt-8 -translate-x-3 md:-translate-x-6 lg:-translate-x-10 text-center text-xs sm:text-sm md:text-base font-serif italic text-crema/90 whitespace-nowrap animate-fade-in-up"
          style={{ animationDelay: "0.35s", opacity: 0 }}
        >
          Bien brutal, <span className="text-oro">bien bruja</span>
        </p>

        {/* Description */}
        <p
          className="mx-auto mt-10 mb-10 max-w-2xl text-base text-crema/85 md:text-lg animate-fade-in-up"
          style={{ animationDelay: "0.5s", opacity: 0 }}
        >
          Lectura de tarot{" "}
          <span className="text-oro">sin filtro, real y sin poses</span>.
          Online y presencial. Tarot, oráculos y rituales para autoconocimiento
          real, con humor y verdad emocional.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up"
          style={{ animationDelay: "0.65s", opacity: 0 }}
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
        href="#sal-del-hueco"
        aria-label="Bajar al manifiesto"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-oro/60 hover:text-oro transition-colors"
      >
        <span className="block animate-float-slow text-3xl">↓</span>
      </a>
    </section>
  );
}
