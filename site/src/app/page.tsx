import {
  Mic,
  Clapperboard,
  Theater,
  Laugh,
  Sparkles,
  Calendar,
  Ticket,
  Mail,
  Phone,
  Globe,
} from "lucide-react";
import { FloatingButtons } from "@/components/FloatingButtons";
import { GsapAnimations } from "@/components/GsapAnimations";

const roles = [
  "Actor",
  "Cantante",
  "Productor",
  "Comediante",
  "Animador",
];

const tourDates = [
  { city: "Bogotá", country: "Colombia", date: "Oct 4, 2026", flag: "🇨🇴" },
  { city: "Ciudad de Guatemala", country: "Guatemala", date: "Oct 11, 2026", flag: "🇬🇹" },
  { city: "Santiago", country: "Chile", date: "Oct 18, 2026", flag: "🇨🇱" },
  { city: "Toronto", country: "Canadá", date: "Oct 25, 2026", flag: "🇨🇦" },
  { city: "Santo Domingo", country: "Rep. Dominicana", date: "Nov 1, 2026", flag: "🇩🇴" },
  { city: "Buenos Aires", country: "Argentina", date: "Nov 8, 2026", flag: "🇦🇷" },
  { city: "Montevideo", country: "Uruguay", date: "Nov 15, 2026", flag: "🇺🇾" },
  { city: "Ciudad de México", country: "México", date: "Nov 22, 2026", flag: "🇲🇽" },
  { city: "Miami", country: "Estados Unidos", date: "Dic 6, 2026", flag: "🇺🇸" },
  { city: "Caracas", country: "Venezuela", date: "Dic 20, 2026", flag: "🇻🇪" },
];

const services = [
  {
    icon: Theater,
    title: "Stand Up Comedy",
    description:
      "Shows en vivo que mezclan humor venezolano, vivencias de migrante y observaciones que hacen reír a toda la sala.",
  },
  {
    icon: Mic,
    title: "Shows Musicales",
    description:
      "Espectáculos donde la música y el entretenimiento se combinan para crear experiencias que no se olvidan.",
  },
  {
    icon: Clapperboard,
    title: "Producción de Eventos",
    description:
      "Desde la idea hasta el telón, producción completa de shows, giras y eventos corporativos.",
  },
  {
    icon: Sparkles,
    title: "Animación y Conducción",
    description:
      "Maestro de ceremonias para bodas, galas, premiaciones y cualquier evento que necesite energía en el escenario.",
  },
];

function Eyebrow({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-6" data-gs="reveal">
      <span className="eyebrow-line" />
      <span className="font-mono text-[15px] font-normal tracking-[0.10em] text-mist uppercase leading-tight gs-hidden">
        {text}
      </span>
      <span className="eyebrow-line" />
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-gradient text-center font-display font-medium text-[clamp(28px,5vw,44px)] leading-[1.16] mb-4 text-balance gs-hidden"
      data-gs="reveal"
    >
      {children}
    </h2>
  );
}

function SectionSub({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-center text-base leading-relaxed text-mist max-w-[640px] mx-auto mb-12 gs-hidden"
      data-gs="reveal"
    >
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <div className="spotlight" aria-hidden="true" />
      <GsapAnimations />
      <FloatingButtons />

      <div className="relative z-[1]">
        {/* HEADER */}
        <header className="sticky top-0 z-50 py-4 bg-[rgba(5,6,15,0.8)] backdrop-blur-xl border-b border-[rgba(186,215,247,0.06)]">
          <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
            <a href="#" className="font-sans font-medium text-base text-frost no-underline">
              Pedro Leal
            </a>
            <nav aria-label="Navegación principal" className="hidden md:block">
              <ul className="flex gap-2 list-none p-0 m-0">
                {["Gira", "Servicios", "Sobre mí", "Contacto"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/\s/g, "-").normalize("NFD").replace(/[̀-ͯ]/g, "")}`}
                      className="nav-link focus-visible:outline-2 focus-visible:outline-frost focus-visible:outline-offset-2"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        <main>
          {/* HERO */}
          <section className="pt-20 pb-0 text-center overflow-hidden min-h-[100vh] flex flex-col justify-center">
            <div className="max-w-[1200px] mx-auto px-4">
              <div className="flex items-center justify-center gap-4 mb-6 gs-hidden" data-gs="eyebrow">
                <span className="eyebrow-line" />
                <span className="font-mono text-[15px] font-normal tracking-[0.10em] text-mist uppercase leading-tight">
                  Leal Show &amp; Productions
                </span>
                <span className="eyebrow-line" />
              </div>

              <h1
                className="font-display font-medium text-[clamp(48px,10vw,140px)] leading-[1.1] mb-4 relative inline-block text-gradient gs-hidden"
                data-gs="wordmark"
              >
                Pedro Leal
                <span
                  className="absolute inset-0 text-gradient blur-[30px] opacity-40 -z-10 pointer-events-none"
                  aria-hidden="true"
                >
                  Pedro Leal
                </span>
              </h1>

              <p className="text-lg leading-snug text-mist max-w-[520px] mx-auto mb-6 gs-hidden" data-gs="sub">
                Humor que cruza fronteras. Desde Caracas hasta el mundo,
                llevando risas a cada rincón de Latinoamérica.
              </p>

              <div className="flex flex-wrap justify-center gap-2 mb-10 gs-hidden" data-gs="roles">
                {roles.map((role) => (
                  <span
                    key={role}
                    className="badge"
                  >
                    {role}
                  </span>
                ))}
              </div>

              <div className="mb-16 gs-hidden" data-gs="cta-btn">
                <a
                  href="#gira"
                  className="btn-ghost focus-visible:outline-2 focus-visible:outline-frost focus-visible:outline-offset-2"
                >
                  Ver fechas de la gira
                </a>
              </div>

              {/* Floating cards fan */}
              <div className="relative w-full max-w-[800px] h-[380px] mx-auto max-md:h-[340px]" style={{ perspective: "1200px" }}>
                {/* Left card */}
                <div
                  className="absolute w-[280px] rounded-2xl p-6 glass-modal left-0 top-10 z-[1] opacity-80 gs-hidden max-md:hidden"
                  style={{ transform: "rotateY(6deg) rotateZ(-2deg) scale(0.88)" }}
                  data-gs="card-l"
                >
                  <div className="font-sans text-sm font-medium text-frost mb-4">Show privado</div>
                  <input className="input-field mb-3" placeholder="Tu evento" readOnly tabIndex={-1} aria-hidden="true" />
                  <input className="input-field mb-3" placeholder="Fecha y lugar" readOnly tabIndex={-1} aria-hidden="true" />
                  <div className="w-full py-2.5 rounded-md bg-violet text-white font-sans text-sm font-medium text-center">Solicitar cotización</div>
                </div>

                {/* Center card */}
                <div
                  className="absolute w-[280px] rounded-2xl p-6 glass-modal left-1/2 top-0 -translate-x-1/2 z-[3] gs-hidden max-md:w-[280px]"
                  data-gs="card-c"
                >
                  <div className="font-sans text-sm font-medium text-frost mb-4">Próximo show</div>
                  <div className="text-center mb-3">
                    <div className="text-2xl mb-1">🇻🇪</div>
                    <div className="font-display font-medium text-ice text-base">Venezuela Se Levanta</div>
                    <div className="text-xs text-fog mt-1">Stand Up Comedy Tour 2026</div>
                  </div>
                  <div className="w-full py-2.5 rounded-md bg-violet text-white font-sans text-sm font-medium text-center mb-3">Comprar boletos</div>
                  <div className="flex items-center gap-3 my-3">
                    <span className="flex-1 h-px bg-glass-edge" />
                    <span className="font-mono text-[11px] tracking-[0.10em] text-fog uppercase">próximas fechas</span>
                    <span className="flex-1 h-px bg-glass-edge" />
                  </div>
                  <div className="space-y-2">
                    {tourDates.slice(0, 3).map((d) => (
                      <div key={d.country} className="flex items-center justify-between text-xs">
                        <span className="text-mist">{d.flag} {d.city}</span>
                        <span className="text-fog">{d.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right card */}
                <div
                  className="absolute w-[280px] rounded-2xl p-6 glass-modal right-0 top-10 z-[1] opacity-80 gs-hidden max-md:hidden"
                  style={{ transform: "rotateY(-6deg) rotateZ(2deg) scale(0.88)" }}
                  data-gs="card-r"
                >
                  <div className="font-sans text-sm font-medium text-frost mb-4">Contacto rápido</div>
                  <a
                    href="https://wa.me/17869443555?text=Quiero%20ir%20a%20tu%20pr%C3%B3ximo%20show"
                    className="social-pill mb-2 no-underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Phone className="w-4 h-4" />
                    WhatsApp
                  </a>
                  <a
                    href="https://www.instagram.com/lealshowandproductions/"
                    className="social-pill mb-2 no-underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="w-4 h-4" />
                    Instagram
                  </a>
                  <a
                    href="mailto:contacto@pedritoleal.com"
                    className="social-pill no-underline"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* TOUR DATES */}
          <section className="py-[120px] max-md:py-14" id="gira">
            <div className="max-w-[1200px] mx-auto px-4">
              <Eyebrow text="Gira 2026" />
              <SectionHeading>Venezuela Se Levanta</SectionHeading>
              <SectionSub>
                Stand up comedy por todo el continente. Diez países, un solo
                objetivo: hacerte reír hasta que te duela.
              </SectionSub>

              <div className="max-w-[800px] mx-auto" data-gs-stagger="true">
                {tourDates.map((show) => (
                  <div
                    key={show.country}
                    className="flex items-center gap-4 py-4 border-b border-glass-edge gs-hidden max-md:flex-wrap max-md:gap-2"
                    data-gs="stagger-item"
                  >
                    <span className="text-2xl w-10 text-center shrink-0">{show.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-medium text-ice text-base">{show.city}</div>
                      <div className="text-sm text-fog">{show.country}</div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-mist shrink-0">
                      <Calendar className="w-4 h-4 text-fog" />
                      {show.date}
                    </div>
                    <a
                      href="https://wa.me/17869443555?text=Quiero%20ir%20a%20tu%20pr%C3%B3ximo%20show"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-white bg-violet no-underline shrink-0 transition-opacity hover:opacity-90 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-frost focus-visible:outline-offset-2"
                    >
                      <Ticket className="w-4 h-4" />
                      Boletos
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SERVICES */}
          <section className="py-[120px] max-md:py-14" id="servicios">
            <div className="max-w-[1200px] mx-auto px-4">
              <Eyebrow text="Lo que hago" />
              <SectionHeading>Más que comedia</SectionHeading>
              <SectionSub>
                Del escenario a la producción. Cada show es una experiencia
                completa, pensada de principio a fin.
              </SectionSub>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto" data-gs-stagger="true">
                {services.map((svc) => (
                  <div key={svc.title} className="glass-card p-8 gs-hidden" data-gs="stagger-item">
                    <div className="icon-circle mb-4">
                      <svc.icon className="w-[18px] h-[18px] text-frost" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display font-medium text-2xl leading-tight tracking-[-0.24px] text-ice mb-2">
                      {svc.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-fog m-0">{svc.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <section className="py-[120px] max-md:py-14" id="sobre-mi">
            <div className="max-w-[1200px] mx-auto px-4">
              <Eyebrow text="Detrás del telón" />
              <SectionHeading>Sobre Pedro Leal</SectionHeading>

              <div className="max-w-[700px] mx-auto glass-card p-10 text-center gs-hidden" data-gs="reveal">
                <div className="icon-circle-lg mx-auto mb-6">
                  <Laugh className="w-10 h-10 text-frost" strokeWidth={1.5} />
                </div>
                <p className="text-base leading-relaxed text-mist mb-4">
                  Venezolano, radicado entre Montreal y Miami. Llevo más de una
                  década haciendo reír, cantar y saltar a la gente en escenarios
                  de todo el continente.
                </p>
                <p className="text-base leading-relaxed text-mist mb-4">
                  Empecé en Caracas con un micrófono prestado y una sala medio
                  vacía. Hoy la gira <strong className="text-ice">Venezuela Se Levanta</strong> recorre
                  diez países y la sala la llena el público que vuelve cada año.
                </p>
                <p className="text-sm text-fog">
                  Marketing + Art + Música — esa es la fórmula de Leal Show &amp; Productions.
                </p>
              </div>
            </div>
          </section>

          {/* CONTACT / CTA */}
          <section className="py-[120px] max-md:py-14 text-center" id="contacto">
            <div className="max-w-[1200px] mx-auto px-4">
              <div className="max-w-[640px] mx-auto glass-card p-12 text-center gs-hidden" data-gs="reveal">
                <Eyebrow text="Hablemos" />
                <SectionHeading>¿Quieres un show que nadie olvide?</SectionHeading>
                <p className="text-base leading-relaxed text-mist max-w-[480px] mx-auto mb-8">
                  Shows privados, eventos corporativos, fiestas o simplemente
                  quieres saber cuándo paso por tu ciudad. Escríbeme.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="https://wa.me/17869443555?text=Quiero%20ir%20a%20tu%20pr%C3%B3ximo%20show"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-sans text-base font-medium text-white px-8 py-3 rounded-md bg-violet no-underline transition-opacity hover:opacity-90 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-frost focus-visible:outline-offset-2"
                  >
                    <Phone className="w-5 h-5" />
                    WhatsApp
                  </a>
                  <a
                    href="mailto:contacto@pedritoleal.com"
                    className="btn-ghost focus-visible:outline-2 focus-visible:outline-frost focus-visible:outline-offset-2"
                  >
                    <Mail className="w-5 h-5" />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="py-8 text-center border-t border-[rgba(186,215,247,0.06)]">
          <div className="max-w-[1200px] mx-auto px-4">
            <p className="text-sm text-fog">&copy; 2026 Pedro Leal — Leal Show &amp; Productions. Todos los derechos reservados.</p>
            <div className="mt-3 flex justify-center gap-4">
              <a href="https://www.instagram.com/lealshowandproductions/" target="_blank" rel="noopener noreferrer" className="text-sm text-frost no-underline hover:text-ice transition-colors">Instagram</a>
              <a href="https://wa.me/17869443555" target="_blank" rel="noopener noreferrer" className="text-sm text-frost no-underline hover:text-ice transition-colors">WhatsApp</a>
              <a href="mailto:contacto@pedritoleal.com" className="text-sm text-frost no-underline hover:text-ice transition-colors">Email</a>
            </div>
            <p className="text-xs text-[rgba(157,167,186,0.5)] mt-4">
              Built with Claude Web Builder by{" "}
              <a href="https://tododeia.com" target="_blank" rel="noopener noreferrer" className="text-[rgba(157,167,186,0.5)] no-underline hover:text-fog">
                Tododeia
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
