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
  Heart,
} from "lucide-react";
import { FloatingButtons } from "@/components/FloatingButtons";
import { GsapAnimations } from "@/components/GsapAnimations";
import { ExpandableCard } from "@/components/ExpandableCard";
import { MobileNav } from "@/components/MobileNav";

const roles = [
  "Actor",
  "Cantante",
  "Productor",
  "Comediante",
  "Host",
];

const WA_COLOMBIA = "https://wa.me/17869443555?text=Gracias%20por%20tu%20inter%C3%A9s%20en%20nuestro%20TOUR%20VENEZUELA%20SE%20LEVANTA%0AEn%20este%20mismo%20chat%20te%20daremos%20las%20indicaciones%20para%20adquirir%20tus%20entradas%20a%20nuestro%20Stand%20Up%20Comedy%2C%20En%20la%20ciudad%20de%20Bogot%C3%A1%20%2C%20en%20el%20comedy%20club%20caf%C3%A9%20internet%20este%2014%20de%20noviembre%208%20pm";
const WA_GUATEMALA = "https://wa.me/50249759226?text=Gracias%20por%20tu%20inter%C3%A9s%20en%20nuestro%20%2ATOUR%20VENEZUELA%20SE%20LEVANTA%2A%0AEn%20este%20mismo%20chat%20te%20daremos%20las%20indicaciones%20para%20adquirir%20tus%20entradas%20a%20nuestro%20Stand%20Up%20Comedy%2C%20en%20ciudad%20Guatemala%2C%20en%20%2ALa%20Resortera%20Comedy%2C%20Food%20%26%20Drinks%2A%20este%2019%20de%20noviembre%20de%202026%20con%20doble%20funci%C3%B3n%207%20y%209%20pm.%20%C2%BFPor%20cu%C3%A1l%20de%20las%20funciones%20est%C3%A1s%20interesado%3F";
const MEXICO_LINK = "https://circulocomedy.com/eventos/venezuela-se-levanta/";
const WA_MONTREAL = "https://wa.me/17869443555?text=%F0%9F%87%BB%F0%9F%87%AA%E2%9D%A4%EF%B8%8F%20AGENDA%20DE%20ESPERANZA%202027%0A%0ALa%20agenda%20que%20ves%20en%20estas%20fotograf%C3%ADas%20forma%20parte%20de%20una%20iniciativa%20solidaria%20para%20llevar%20esperanza%20y%20ayuda%20a%20nuestra%20gente%20de%20La%20Guaira%2C%20Venezuela.%0A%0ASoy%20Pedrito%20Leal%20y%20quiero%20invitarte%20a%20formar%20parte%20de%20este%20proyecto.%0A%0A%E2%9D%A4%EF%B8%8F%20Con%20tu%20contribuci%C3%B3n%20de%20%24100%20CAD%20recibes%3A%0A%0A%F0%9F%93%96%201%20Agenda%20de%20Esperanza%202027%0A%F0%9F%8E%9F%EF%B8%8F%202%20entradas%20para%20Venezuela%20se%20Levanta%20%E2%80%93%20Stand-Up%20Comedy%0A%0A%F0%9F%93%85%20S%C3%A1bado%2023%20de%20enero%20de%202027%0A%F0%9F%93%8D%20Th%C3%A9%C3%A2tre%20Sainte-Catherine%20%E2%80%93%20Montreal%0A%0A%F0%9F%8E%AD%20Tendremos%20DOS%20FUNCIONES%3A%0A%F0%9F%95%96%207%3A00%20PM%0A%F0%9F%95%98%209%3A00%20PM%0A%0AEse%20d%C3%ADa%20t%C3%BA%20tambi%C3%A9n%20eres%20protagonista%2C%20porque%20tu%20contribuci%C3%B3n%20se%20suma%20a%20una%20iniciativa%20que%20recorrer%C3%A1%2010%20pa%C3%ADses%2C%20destinando%20un%20porcentaje%20significativo%20de%20lo%20recaudado%20para%20ayudar%20a%20Venezuela.%0A%0A%F0%9F%87%BB%F0%9F%87%AA%20El%20recorrido%20finalizar%C3%A1%20en%20Caracas%2C%20donde%20personalmente%20har%C3%A9%20entrega%20de%20la%20ayuda%2C%20sin%20plataformas%20ni%20intermediarios.%0A%0A%F0%9F%93%8D%20%C2%BFEst%C3%A1s%20en%20Montreal%3F%20Yo%20mismo%20puedo%20llevarte%20tu%20agenda%20a%20tu%20casa%20o%20trabajo.%0A%0A%F0%9F%8C%8E%20%C2%BFEst%C3%A1s%20fuera%20de%20Montreal%3F%20Te%20la%20enviamos%20a%20cualquier%20parte%20del%20mundo%20y%20Pedro%20Leal%20asume%20el%20costo%20del%20env%C3%ADo.%0A%0ACada%20agenda%20representa%20un%20granito%20de%20arena%20para%20reconstruir%20esperanza.%20%E2%9D%A4%EF%B8%8F%F0%9F%87%BB%F0%9F%87%AA%0A%0ASi%20quieres%20reservar%20tu%20Agenda%20de%20Esperanza%20%2B%202%20entradas%2C%20resp%C3%B3ndeme%20este%20mensaje%20y%20te%20env%C3%ADo%20los%20datos.%0A%0AGracias%20por%20contribuir.%20Te%20esperamos.%0A%0APedrito%20Leal%0A%F0%9F%87%BB%F0%9F%87%AA%20Venezuela%20se%20Levanta";

const tourDates: { city: string; country: string; date: string; time?: string; flag: string; href?: string }[] = [
  { city: "Bogotá", country: "Colombia", date: "Nov 14, 2026", time: "8:00 PM", flag: "🇨🇴", href: WA_COLOMBIA },
  { city: "Ciudad de Guatemala", country: "Guatemala", date: "Nov 19, 2026", time: "7:00 PM y 9:00 PM", flag: "🇬🇹", href: WA_GUATEMALA },
  { city: "Ciudad de México", country: "México", date: "Nov 21, 2026", time: "10:30 PM", flag: "🇲🇽", href: MEXICO_LINK },
  { city: "Montreal", country: "Canadá", date: "Ene 23, 2027", time: "7:00 PM y 9:00 PM", flag: "🇨🇦", href: WA_MONTREAL },
  { city: "Santiago", country: "Chile", date: "Próximamente", flag: "🇨🇱" },
  { city: "Santo Domingo", country: "Rep. Dominicana", date: "Próximamente", flag: "🇩🇴" },
  { city: "Buenos Aires", country: "Argentina", date: "Próximamente", flag: "🇦🇷" },
  { city: "Montevideo", country: "Uruguay", date: "Próximamente", flag: "🇺🇾" },
  { city: "Miami", country: "Estados Unidos", date: "Próximamente", flag: "🇺🇸" },
  { city: "Caracas", country: "Venezuela", date: "Próximamente", flag: "🇻🇪" },
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
            <a href="#" className="block shrink-0 no-underline font-display font-medium text-frost text-base tracking-tight">
              Leal Show and Productions
            </a>
            <nav aria-label="Navegación principal" className="hidden md:block">
              <ul className="flex gap-2 list-none p-0 m-0">
                {[
                  { label: "Tour", href: "#gira" },
                  { label: "Sobre mí", href: "#sobre-mi" },
                  { label: "Servicios", href: "#servicios" },
                  { label: "Fundación", href: "#fundacion" },
                  { label: "Contacto", href: "#contacto" },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="nav-link focus-visible:outline-2 focus-visible:outline-frost focus-visible:outline-offset-2"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <MobileNav />
          </div>
        </header>

        <main>
          {/* HERO */}
          <section className="relative text-center overflow-hidden">
            <div className="absolute inset-0 bg-black" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 right-0 h-24" style={{
              background: "linear-gradient(to bottom, #000000, #05060f)",
            }} aria-hidden="true" />
            <div className="relative pt-20 pb-20">
            <div className="max-w-[1200px] mx-auto px-4">
              <div className="flex items-center justify-center gap-4 mb-6 gs-hidden" data-gs="eyebrow">
                <span className="eyebrow-line" />
                <span className="font-mono text-[15px] font-normal tracking-[0.10em] text-mist uppercase leading-tight">
                  Leal Show and Productions
                </span>
                <span className="eyebrow-line" />
              </div>

              <div className="mb-4 gs-hidden" data-gs="wordmark">
                <h1 className="sr-only">Pedro Leal</h1>
                <video
                  autoPlay
                  muted
                  playsInline
                  className="mx-auto w-full max-w-[600px] h-auto"
                  aria-label="Logo animado de Leal Show and Productions"
                >
                  <source src="/images/logohero.mp4" type="video/mp4" />
                </video>
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
                <a href={WA_COLOMBIA} target="_blank" rel="noopener noreferrer" className="relative gs-hidden block" data-gs="card-next">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase bg-violet text-white shadow-sm whitespace-nowrap">
                      <Sparkles className="w-3 h-3" />
                      Colombia
                    </span>
                  </div>
                  <Image
                    src="/images/showcolombia.webp"
                    alt="Pedro Leal en Colombia — Venezuela Se Levanta en Bogotá"
                    width={564}
                    height={700}
                    className="w-full h-auto rounded-2xl shadow-tour-art"
                  />
                </a>

                <a href={WA_GUATEMALA} target="_blank" rel="noopener noreferrer" className="relative gs-hidden block" data-gs="card-next">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase bg-violet text-white shadow-sm whitespace-nowrap">
                      <Sparkles className="w-3 h-3" />
                      Guatemala
                    </span>
                  </div>
                  <Image
                    src="/images/showguatemala.webp"
                    alt="Pedro Leal en Guatemala — Venezuela Se Levanta en La Resortera"
                    width={564}
                    height={700}
                    className="w-full h-auto rounded-2xl shadow-tour-art"
                  />
                </a>

                <a href={MEXICO_LINK} target="_blank" rel="noopener noreferrer" className="relative gs-hidden block" data-gs="card-next">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase bg-violet text-white shadow-sm whitespace-nowrap">
                      <Sparkles className="w-3 h-3" />
                      México
                    </span>
                  </div>
                  <Image
                    src="/images/showmexico.webp"
                    alt="Pedro Leal en México — Venezuela Se Levanta"
                    width={564}
                    height={700}
                    className="w-full h-auto rounded-2xl shadow-tour-art"
                  />
                </a>

                <a href={WA_MONTREAL} target="_blank" rel="noopener noreferrer" className="relative gs-hidden block" data-gs="card-next">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase bg-violet text-white shadow-sm whitespace-nowrap">
                      <Sparkles className="w-3 h-3" />
                      Montreal
                    </span>
                  </div>
                  <Image
                    src="/images/showmontreal.webp"
                    alt="Pedro Leal en Montreal — Agenda de Esperanza 2027"
                    width={564}
                    height={700}
                    className="w-full h-auto rounded-2xl shadow-tour-art"
                  />
                </a>
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
                      <span>
                        {show.date}
                        {show.time && <span className="ml-1 text-fog">· {show.time}</span>}
                      </span>
                    </div>
                    {show.href ? (
                      <a
                        href={show.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-white bg-violet no-underline shrink-0 transition-opacity hover:opacity-90 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-frost focus-visible:outline-offset-2"
                      >
                        <Ticket className="w-4 h-4" />
                        Boletos
                      </a>
                    ) : (
                      <span className="px-4 py-2 rounded-full text-sm font-medium text-fog bg-[rgba(186,214,247,0.06)] shrink-0">
                        Próximamente
                      </span>
                    )}
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
                    bgImage="/images/comedia.jpg"
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
                    bgImage="/images/fondomusica.webp"
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
                    bgImage="/images/produccion.jpg"
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
                    summary="Más de 20 años como animador, presentador, host y maestro de ceremonias en la industria del entretenimiento."
                    bgImage="/images/host.jpg"
                  >
                    <p className="mb-3">
                      Con más de dos décadas de experiencia frente al público, Pedro Leal ha construido una extensa trayectoria como animador, presentador, host y maestro de ceremonias, una faceta fundamental de su carrera dentro de la industria del entretenimiento.
                    </p>
                    <p className="mb-3">
                      Sus primeros pasos como animador comenzaron en Caracas, Venezuela, dentro de la movida nocturna, conduciendo eventos y presentándose en reconocidos locales de la mano de Corporación Koleoke. Su capacidad para improvisar, comunicarse y conectar naturalmente con el público lo llevó a escenarios y producciones de mayor formato.
                    </p>
                    <p className="mb-3">
                      Posteriormente trabajó junto a profesionales y compañías del espectáculo como ISD – Intermedios Show Design, Osmel Ruido y Marcelo Mazzini, ampliando su experiencia hacia grandes producciones, conciertos, eventos especiales y encuentros corporativos.
                    </p>
                    <p className="mb-3">
                      Durante su trayectoria ha participado como host y animador para importantes marcas, canales y compañías de entretenimiento, entre ellas Warner Latino, E! Entertainment Television, HBO, MGM y FOX, además de importantes empresas venezolanas como Empresas Polar y Cervecería Regional.
                    </p>
                    <p className="mb-3">
                      Su experiencia también se extendió a grandes espectáculos musicales, destacando su participación como animador en presentaciones vinculadas al artista colombiano Juanes, durante las etapas de Mi Sangre Tour (2006) y La Vida World Tour (2009).
                    </p>
                    <p className="mb-3">
                      Durante más de veinte años, Pedro ha conducido eventos corporativos, conciertos, lanzamientos de marcas, encuentros empresariales, espectáculos musicales, eventos privados, producciones especiales y entretenimiento en vivo, desarrollando una capacidad particular para manejar grandes audiencias y adaptarse a diferentes formatos.
                    </p>
                    <p className="mb-3">
                      Su formación como actor, músico, productor y comediante terminó definiendo su sello como host: energía, improvisación, rapidez, humor y conexión directa con el público.
                    </p>
                    <p className="mb-3">
                      Esa experiencia acumulada durante años frente a diferentes audiencias es también una de las raíces de su trabajo actual con el crowdwork, donde la interacción y la improvisación convierten al público en protagonista del espectáculo.
                    </p>
                    <p className="mb-3">
                      Hoy, Pedro Leal reúne más de 20 años de experiencia en conducción y entretenimiento, desenvolviéndose como Host, Maestro de Ceremonias, Animador Corporativo, Presentador de Espectáculos, Entrevistador y Conductor de Eventos en Vivo.
                    </p>
                    <p className="text-frost font-medium">
                      Pedro Leal no simplemente presenta un evento: conecta con la audiencia, conduce la energía y convierte cada presentación en un espectáculo.
                    </p>
                  </ExpandableCard>
                </div>
              </div>
            </div>
          </section>

          {/* FUNDACIÓN CORAZÓN LEAL */}
          <section className="py-[120px] max-md:py-14" id="fundacion">
            <div className="max-w-[1200px] mx-auto px-4">
              <Eyebrow text="Propósito social" />
              <SectionHeading>Fundación Corazón Leal</SectionHeading>

              <div className="max-w-[960px] mx-auto gs-hidden" data-gs="reveal">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-10 items-start">
                  <div className="flex flex-col justify-center">
                    <p className="text-base leading-relaxed text-mist mb-4">
                      La Fundación Corazón Leal fue creada en el año 2017 con el propósito de brindar ayuda a niños huérfanos, niños discapacitados y poblaciones vulnerables.
                    </p>
                    <p className="text-base leading-relaxed text-mist mb-4">
                      La fundación ha canalizado recursos a través de la producción de obras de teatro y espectáculos en vivo, convirtiendo el entretenimiento en una herramienta directa de acción social.
                    </p>
                    <p className="text-base leading-relaxed text-mist mb-4">
                      Entre las producciones que han contribuido con la fundación se encuentran obras como Casanovas, Por Ellas, Favoritas pero Solteras y Leal el arma de la seducción, espectáculos que combinaron humor, actuación y música con un fin solidario.
                    </p>
                    <p className="text-base leading-relaxed text-mist mb-4">
                      Corazón Leal representa el compromiso de Pedro Leal con la responsabilidad social, utilizando su trayectoria artística como plataforma para generar un impacto real en comunidades que lo necesitan.
                    </p>
                    <p className="text-base leading-relaxed text-fog italic">
                      Porque el arte también puede cambiar vidas.
                    </p>
                  </div>
                  <div className="w-full">
                    <Image
                      src="/images/fundacion.jpg"
                      alt="Fundación Corazón Leal — Pedro Leal con el logo de la fundación"
                      width={560}
                      height={740}
                      className="w-full h-auto rounded-2xl shadow-tour-art object-cover"
                    />
                  </div>
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
            <p className="text-sm text-fog">&copy; 2026 Pedro Leal — Leal Show and Productions. Todos los derechos reservados.</p>
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
