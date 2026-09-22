"use client";

import Image from "next/image";
import {
  Mic,
  Clapperboard,
  Theater,
  Sparkles,
  Calendar,
  Ticket,
  Mail,
  Phone,
  Crown,
  Music,
} from "lucide-react";
import { FloatingButtons } from "@/components/FloatingButtons";
import { GsapAnimations } from "@/components/GsapAnimations";
import { ExpandableCard } from "@/components/ExpandableCard";

const roles = [
  "Actor",
  "Cantante",
  "Productor",
  "Comediante",
  "Host",
];

const tourDates = [
  { city: "Bogotá", country: "Colombia", date: "Oct 4, 2026", flag: "🇨🇴" },
  { city: "Ciudad de Guatemala", country: "Guatemala", date: "Oct 11, 2026", flag: "🇬🇹" },
  { city: "Ciudad de México", country: "México", date: "Oct 18, 2026", flag: "🇲🇽" },
  { city: "Montreal", country: "Canadá", date: "Oct 25, 2026", flag: "🇨🇦" },
  { city: "Santiago", country: "Chile", date: "Nov 1, 2026", flag: "🇨🇱" },
  { city: "Santo Domingo", country: "Rep. Dominicana", date: "Nov 8, 2026", flag: "🇩🇴" },
  { city: "Buenos Aires", country: "Argentina", date: "Nov 15, 2026", flag: "🇦🇷" },
  { city: "Montevideo", country: "Uruguay", date: "Nov 22, 2026", flag: "🇺🇾" },
  { city: "Miami", country: "Estados Unidos", date: "Dic 6, 2026", flag: "🇺🇸" },
  { city: "Caracas", country: "Venezuela", date: "Dic 20, 2026", flag: "🇻🇪" },
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
            <a href="#" className="block shrink-0 no-underline">
              <Image
                src="/images/logo-leal.jpg"
                alt="Leal — Spectacles et Productions"
                width={80}
                height={36}
                className="h-9 w-auto rounded-sm"
              />
            </a>
            <nav aria-label="Navegación principal" className="hidden md:block">
              <ul className="flex gap-2 list-none p-0 m-0">
                {["Gira", "Sobre mí", "Servicios", "Contacto"].map((item) => (
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
          <section className="pt-20 pb-20 text-center overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-4">
              <div className="flex items-center justify-center gap-4 mb-6 gs-hidden" data-gs="eyebrow">
                <span className="eyebrow-line" />
                <span className="font-mono text-[15px] font-normal tracking-[0.10em] text-mist uppercase leading-tight">
                  Leal Show &amp; Productions
                </span>
                <span className="eyebrow-line" />
              </div>

              <div className="mb-4 gs-hidden relative" data-gs="wordmark">
                <h1 className="sr-only">Pedro Leal</h1>
                <div className="relative mx-auto max-w-[600px]">
                  <div className="absolute inset-0 bg-black" style={{
                    maskImage: "radial-gradient(ellipse 90% 80% at center, black 50%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(ellipse 90% 80% at center, black 50%, transparent 100%)",
                  }} />
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="relative w-full h-auto"
                    aria-label="Logo animado de Leal Show and Productions"
                  >
                    <source src="/images/logo-animated.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>

              <p className="text-lg leading-snug text-mist max-w-[520px] mx-auto mb-6 gs-hidden" data-gs="sub">
                Humor que cruza fronteras.
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
                  TOUR 2026/2027
                </a>
              </div>

              {/* Tour art — main poster */}
              <div className="max-w-[520px] mx-auto mb-10 gs-hidden" data-gs="card-c">
                <Image
                  src="/images/tour-art.jpg"
                  alt="Pedro Leal presenta Venezuela Se Levanta — Stand Up Comedy Tour 2026/2027 por 10 países"
                  width={564}
                  height={700}
                  priority
                  className="w-full h-auto rounded-2xl shadow-tour-art"
                />
              </div>

              {/* Country show arts — 2x2 grid */}
              <div className="grid grid-cols-2 gap-4 max-w-[860px] mx-auto max-sm:grid-cols-1 max-sm:max-w-[400px]">
                <div className="relative gs-hidden" data-gs="card-next">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase bg-violet text-white shadow-sm whitespace-nowrap">
                      <Sparkles className="w-3 h-3" />
                      Colombia
                    </span>
                  </div>
                  <Image
                    src="/images/colombia-show.webp"
                    alt="Pedro Leal en Colombia — Venezuela Se Levanta en Bogotá con Reúben Morales"
                    width={564}
                    height={700}
                    className="w-full h-auto rounded-2xl shadow-tour-art"
                  />
                </div>

                <div className="relative gs-hidden" data-gs="card-next">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase bg-violet text-white shadow-sm whitespace-nowrap">
                      <Sparkles className="w-3 h-3" />
                      Guatemala
                    </span>
                  </div>
                  <Image
                    src="/images/guatemala-show.webp"
                    alt="Pedro Leal en Guatemala — Venezuela Se Levanta en La Resortera con Darwin y Spanfles"
                    width={564}
                    height={700}
                    className="w-full h-auto rounded-2xl shadow-tour-art"
                  />
                </div>

                <div className="relative gs-hidden" data-gs="card-next">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase bg-[rgba(186,215,247,0.12)] text-mist shadow-sm whitespace-nowrap">
                      México — Próximamente
                    </span>
                  </div>
                  <div className="w-full aspect-[564/700] rounded-2xl bg-[rgba(186,214,247,0.03)] border border-[rgba(186,215,247,0.08)] flex items-center justify-center">
                    <span className="text-fog text-sm">🇲🇽</span>
                  </div>
                </div>

                <div className="relative gs-hidden" data-gs="card-next">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase bg-[rgba(186,215,247,0.12)] text-mist shadow-sm whitespace-nowrap">
                      Montreal — Próximamente
                    </span>
                  </div>
                  <div className="w-full aspect-[564/700] rounded-2xl bg-[rgba(186,214,247,0.03)] border border-[rgba(186,215,247,0.08)] flex items-center justify-center">
                    <span className="text-fog text-sm">🇨🇦</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TOUR DATES */}
          <section className="py-[120px] max-md:py-14" id="gira">
            <div className="max-w-[1200px] mx-auto px-4">
              <Eyebrow text="TOUR 2026/2027" />
              <SectionHeading>Venezuela Se Levanta</SectionHeading>

              <div className="text-center max-w-[640px] mx-auto mb-12 gs-hidden" data-gs="reveal">
                <p className="font-mono text-sm tracking-[0.08em] uppercase text-frost mb-4">
                  Una risa también puede ayudar.
                </p>
                <p className="text-base leading-relaxed text-mist mb-2">
                  Pedrito Leal presenta:<br />
                  <strong className="text-ice font-display text-lg">VENEZUELA SE LEVANTA</strong><br />
                  <span className="text-fog">Stand-Up Comedy Tour 2026–2027</span>
                </p>
                <p className="text-base leading-relaxed text-mist italic mt-4">
                  Reímos juntos. Ayudamos juntos. Nos levantamos juntos.
                </p>
              </div>

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

          {/* ABOUT — moved right after tour */}
          <section className="py-[120px] max-md:py-14" id="sobre-mi">
            <div className="max-w-[1200px] mx-auto px-4">
              <Eyebrow text="El artista" />
              <SectionHeading>Sobre Pedro Leal</SectionHeading>

              <div className="max-w-[960px] mx-auto gs-hidden" data-gs="reveal">
                <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-10 items-start">
                  <div className="w-full">
                    <Image
                      src="/images/pedro-leal.jpg"
                      alt="Pedro Leal — Actor, Músico, Productor, Comediante y Host"
                      width={560}
                      height={740}
                      className="w-full h-auto rounded-2xl shadow-tour-art object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-base leading-relaxed text-mist mb-4">
                      Pedrito Leal es actor, músico, productor, comediante y host, un artista integral que ha dedicado más de 30 años de trayectoria a crear, producir y llevar al público espectáculos de alto nivel.
                    </p>
                    <p className="text-base leading-relaxed text-mist mb-4">
                      Su experiencia dentro del mercado venezolano y latinoamericano le ha permitido desarrollarse en diferentes áreas del entretenimiento, combinando actuación, música, producción, conducción y comedia en una misma carrera.
                    </p>
                    <p className="text-base leading-relaxed text-mist mb-4">
                      Más que un comediante, Pedrito Leal es un creador de experiencias sobre el escenario. Cada proyecto lleva consigo años de aprendizaje, producción y contacto directo con el público.
                    </p>
                    <p className="text-base leading-relaxed text-fog">
                      Hoy, esa trayectoria entra en una nueva etapa con proyectos internacionales que mantienen una misma esencia: entretener, conectar y hacer del escenario un lugar donde el público viva una verdadera experiencia.
                    </p>
                  </div>
                </div>
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
                {/* Stand Up Comedy */}
                <div className="gs-hidden" data-gs="stagger-item">
                  <ExpandableCard
                    icon={Theater}
                    title="Comedia sin fronteras"
                    summary="Pedrito Leal ha llevado su comedia a diferentes escenarios internacionales con una propuesta que combina stand-up, crowdwork, storytelling, improvisación y música."
                  >
                    <p className="mb-3">
                      Su recorrido incluye presentaciones en Montreal, Toronto, Ottawa, Nueva York, Miami, Ciudad de México, San José de Costa Rica, San Salvador, San Pedro Sula, Buenos Aires y Caracas, conectando con diferentes públicos a través de su particular estilo de hacer comedia.
                    </p>
                    <p className="mb-3">
                      Actualmente prepara &ldquo;Venezuela se Levanta – Stand Up Comedy Tour 2026–2027&rdquo;, una nueva gira internacional donde la comedia, la identidad venezolana y el propósito solidario se encuentran.
                    </p>
                    <p className="text-frost font-medium">
                      Pedrito Leal – Comedia From Gozadera.
                    </p>
                  </ExpandableCard>
                </div>

                {/* Música */}
                <div className="gs-hidden" data-gs="stagger-item">
                  <ExpandableCard
                    icon={Music}
                    title="Música"
                    summary="La música forma parte esencial de la trayectoria artística de Pedro Leal. Como cantante e intérprete ha desarrollado una propuesta latina con temas originales."
                  >
                    <p className="mb-3">
                      Su propuesta incluye temas como &ldquo;La Rumba Sagrada&rdquo;, &ldquo;Peligrosa&rdquo;, &ldquo;Vete Ya&rdquo;, &ldquo;Ya No Quiero&rdquo;, &ldquo;Amor a Distancia&rdquo; y &ldquo;Dame un Momento&rdquo;, entre otros lanzamientos.
                    </p>
                    <p className="mb-4">
                      Su discografía está disponible internacionalmente en las principales plataformas digitales.
                    </p>
                    <p className="font-mono text-xs tracking-wider uppercase text-frost mb-3">Escucha a Pedro Leal</p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://open.spotify.com/artist/6tZ0mhWVyGYtVcmthJ0z6D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[rgba(186,214,247,0.06)] border border-glass-edge text-frost no-underline hover:bg-[rgba(186,214,247,0.12)] transition-colors"
                      >
                        Spotify
                      </a>
                      <a
                        href="https://youtube.com/@pedrito_leal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[rgba(186,214,247,0.06)] border border-glass-edge text-frost no-underline hover:bg-[rgba(186,214,247,0.12)] transition-colors"
                      >
                        YouTube
                      </a>
                      <a
                        href="https://music.amazon.com/albums/B0BJGZC55W"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[rgba(186,214,247,0.06)] border border-glass-edge text-frost no-underline hover:bg-[rgba(186,214,247,0.12)] transition-colors"
                      >
                        Amazon Music
                      </a>
                    </div>
                  </ExpandableCard>
                </div>

                {/* Producción de Eventos */}
                <div className="gs-hidden" data-gs="stagger-item">
                  <ExpandableCard
                    icon={Clapperboard}
                    title="Producción de Eventos"
                    summary="Más de dos décadas participando, creando y formando parte de shows y espectáculos de primera línea."
                  >
                    <p>
                      Junto a grandes producciones teatrales de rotundo éxito, consolidando una trayectoria dedicada al entretenimiento, la actuación y la producción de espectáculos de alto nivel.
                    </p>
                  </ExpandableCard>
                </div>

                {/* Host */}
                <div className="gs-hidden" data-gs="stagger-item">
                  <ExpandableCard
                    icon={Crown}
                    title="Host"
                    summary="Maestro de ceremonias para bodas, galas, premiaciones y cualquier evento que necesite energía en el escenario."
                  >
                    <p>
                      Pedro Leal | Música · Actuación · Comedia · Entretenimiento
                    </p>
                  </ExpandableCard>
                </div>
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
          </div>
        </footer>
      </div>
    </>
  );
}
