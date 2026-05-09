const WHATSAPP_URL = `https://wa.me/584241054059?text=${encodeURIComponent(
  "Hola Kenia, me interesa contratar un show o lecturas para un evento"
)}`;

export default function PromoBanner() {
  return (
    <section className="relative overflow-hidden bg-noche px-6 py-20 md:px-12 md:py-24">
      {/* Soft layered background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-mystic-radial" />
        <div className="absolute inset-0 soft-noise opacity-70" />
        <div className="absolute inset-0 starfield opacity-25" />
      </div>
      {/* Subtle floating moons */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute left-[5%] top-[18%] text-3xl text-oro/12 animate-float-slow select-none" aria-hidden>☾</span>
        <span className="absolute right-[8%] bottom-[20%] text-3xl text-oro/12 animate-float-slow select-none" style={{ animationDelay: "1.8s" }} aria-hidden>☽</span>
      </div>

      <div className="container-narrow relative z-10">
        <div className="mx-auto max-w-4xl rounded-3xl border-2 border-oro/40 bg-noche/70 backdrop-blur-md p-8 md:p-12 shadow-2xl shadow-oro/10">
          {/* Pill badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-oro/50 bg-gold-shine/10 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-oro">
              <span className="h-2 w-2 rounded-full bg-oro animate-twinkle" />
              Próximo proyecto
            </span>
          </div>

          <h2 className="heading-serif text-center text-4xl md:text-6xl mb-4 leading-tight">
            <span className="gold-text">Tarot</span> que enciende tus eventos
          </h2>

          <p className="text-center text-lg md:text-xl text-crema/85 max-w-2xl mx-auto mb-10">
            Shows y lecturas en{" "}
            <span className="text-oro font-medium">cumpleaños</span>,{" "}
            <span className="text-oro font-medium">despedidas de soltera</span>{" "}
            y{" "}
            <span className="text-oro font-medium">eventos especiales</span>.
            Magia, joda y verdad para que tu encuentro nadie lo olvide.
          </p>

          {/* Event types */}
          <div className="grid gap-4 sm:grid-cols-3 mb-10">
            {[
              {
                icon: "🎂",
                t: "Cumpleaños",
                d: "Celebra con cartas que cuentan tu próximo año.",
              },
              {
                icon: "💍",
                t: "Despedidas",
                d: "Lecturas para la novia y sus amigas — entre risas y profundidad.",
              },
              {
                icon: "🌙",
                t: "Eventos Especiales",
                d: "Halloween, celebración lunar, otras efemérides. Magia para fechas que merecen marca.",
              },
            ].map((e) => (
              <div
                key={e.t}
                className="rounded-2xl border border-oro/20 bg-violeta-deep/40 p-5 text-center"
              >
                <div className="text-4xl mb-2">{e.icon}</div>
                <p className="font-serif text-xl text-crema">{e.t}</p>
                <p className="mt-1 text-xs text-crema/60 leading-relaxed">
                  {e.d}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Reservar para mi evento
            </a>
            <a href="#contacto" className="btn-outline">
              Más info
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
