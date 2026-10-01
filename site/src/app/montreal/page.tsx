"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { GsapAnimations } from "@/components/GsapAnimations";

const WA_MONTREAL =
  "https://wa.me/17869443555?text=%F0%9F%87%BB%F0%9F%87%AA%E2%9D%A4%EF%B8%8F%20AGENDA%20DE%20ESPERANZA%202027%0A%0ALa%20agenda%20que%20ves%20en%20estas%20fotograf%C3%ADas%20forma%20parte%20de%20una%20iniciativa%20solidaria%20para%20llevar%20esperanza%20y%20ayuda%20a%20nuestra%20gente%20de%20La%20Guaira%2C%20Venezuela.%0A%0ASoy%20Pedrito%20Leal%20y%20quiero%20invitarte%20a%20formar%20parte%20de%20este%20proyecto.%0A%0A%E2%9D%A4%EF%B8%8F%20Con%20tu%20contribuci%C3%B3n%20de%20%24100%20CAD%20recibes%3A%0A%0A%F0%9F%93%96%201%20Agenda%20de%20Esperanza%202027%0A%F0%9F%8E%9F%EF%B8%8F%202%20entradas%20para%20Venezuela%20se%20Levanta%20%E2%80%93%20Stand-Up%20Comedy%0A%0A%F0%9F%93%85%20S%C3%A1bado%2023%20de%20enero%20de%202027%0A%F0%9F%93%8D%20Th%C3%A9%C3%A2tre%20Sainte-Catherine%20%E2%80%93%20Montreal%0A%0A%F0%9F%8E%AD%20Tendremos%20DOS%20FUNCIONES%3A%0A%F0%9F%95%96%207%3A00%20PM%0A%F0%9F%95%98%209%3A00%20PM%0A%0AEse%20d%C3%ADa%20t%C3%BA%20tambi%C3%A9n%20eres%20protagonista%2C%20porque%20tu%20contribuci%C3%B3n%20se%20suma%20a%20una%20iniciativa%20que%20recorrer%C3%A1%2010%20pa%C3%ADses%2C%20destinando%20un%20porcentaje%20significativo%20de%20lo%20recaudado%20para%20ayudar%20a%20Venezuela.%0A%0A%F0%9F%87%BB%F0%9F%87%AA%20El%20recorrido%20finalizar%C3%A1%20en%20Caracas%2C%20donde%20personalmente%20har%C3%A9%20entrega%20de%20la%20ayuda%2C%20sin%20plataformas%20ni%20intermediarios.%0A%0A%F0%9F%93%8D%20%C2%BFEst%C3%A1s%20en%20Montreal%3F%20Yo%20mismo%20puedo%20llevarte%20tu%20agenda%20a%20tu%20casa%20o%20trabajo.%0A%0A%F0%9F%8C%8E%20%C2%BFEst%C3%A1s%20fuera%20de%20Montreal%3F%20Te%20la%20enviamos%20a%20cualquier%20parte%20del%20mundo%20y%20Pedro%20Leal%20asume%20el%20costo%20del%20env%C3%ADo.%0A%0ACada%20agenda%20representa%20un%20granito%20de%20arena%20para%20reconstruir%20esperanza.%20%E2%9D%A4%EF%B8%8F%F0%9F%87%BB%F0%9F%87%AA%0A%0ASi%20quieres%20reservar%20tu%20Agenda%20de%20Esperanza%20%2B%202%20entradas%2C%20resp%C3%B3ndeme%20este%20mensaje%20y%20te%20env%C3%ADo%20los%20datos.%0A%0AGracias%20por%20contribuir.%20Te%20esperamos.%0A%0APedrito%20Leal%0A%F0%9F%87%BB%F0%9F%87%AA%20Venezuela%20se%20Levanta";

const sponsors = [
  { src: "/images/sponsors/sponsor1.png", alt: "Keyris Rodriguez" },
  { src: "/images/sponsors/sponsor2.webp", alt: "TuFamilia" },
  { src: "/images/sponsors/sponsor3.png", alt: "Latinos en Quebec" },
  { src: "/images/sponsors/sponsor4.png", alt: "Teque Pancho" },
  { src: "/images/sponsors/sponsor5.webp", alt: "CreacionesByKim" },
  { src: "/images/sponsors/sponsor6.png", alt: "Somos Construction" },
  { src: "/images/sponsors/sponsor7.png", alt: "Mora Mora Party" },
  { src: "/images/sponsors/sponsor8.png", alt: "Arepa du Plateau" },
  { src: "/images/sponsors/sponsor9.png", alt: "Gonzalo Nunez - The Agency" },
  { src: "/images/sponsors/sponsor10.png", alt: "Connek" },
];

export default function MontrealPage() {
  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <div className="spotlight" aria-hidden="true" />
      <GsapAnimations />

      <div className="relative z-[1]">
        {/* HEADER */}
        <header className="sticky top-0 z-50 py-4 bg-[rgba(5,6,15,0.8)] backdrop-blur-xl border-b border-[rgba(186,215,247,0.06)]">
          <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-frost no-underline text-sm font-medium hover:text-ice transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al sitio
            </Link>
            <span className="font-display font-medium text-frost text-base tracking-tight">
              Leal Show and Productions
            </span>
          </div>
        </header>

        <main>
          <section className="py-16 max-md:py-10">
            <div className="max-w-[800px] mx-auto px-4">
              {/* VSL Image */}
              <div className="mb-12 gs-hidden" data-gs="reveal">
                <Image
                  src="/images/vsl.jpeg"
                  alt="Montreal se levanta por La Guaira — Agenda de Esperanza 2027"
                  width={800}
                  height={1000}
                  priority
                  className="w-full h-auto rounded-2xl shadow-tour-art"
                />
              </div>

              {/* Heading */}
              <div className="text-center mb-10 gs-hidden" data-gs="reveal">
                <h1 className="text-gradient font-display font-medium text-[clamp(24px,5vw,40px)] leading-[1.2] text-balance">
                  Montreal se levanta por La Guaira
                </h1>
              </div>

              {/* Donation copy */}
              <div className="max-w-[640px] mx-auto space-y-6 gs-hidden" data-gs="reveal">
                <p className="text-lg leading-relaxed text-ice font-medium italic text-center">
                  Esto no es una compra, es una donación para nuestra gente de La Guaira, Venezuela.
                </p>

                <p className="text-base leading-relaxed text-mist">
                  Si eres venezolano, gracias por tenderle la mano a nuestra gente. Y si eres de cualquier otra nacionalidad y decides sumarte, ¡bendiciones siempre! La Guaira te lo agradece.
                </p>

                <div className="text-center py-4">
                  <span className="inline-block text-2xl font-display font-medium text-gradient tracking-tight">
                    DONACIÓN: $100 CAD
                  </span>
                </div>

                <div>
                  <p className="text-base leading-relaxed text-frost font-medium mb-4">
                    Con tu aporte recibirás:
                  </p>
                  <div className="space-y-3 text-base leading-relaxed text-mist">
                    <p>
                      🎟️ 2 tickets para disfrutar del show de Pedrito Leal
                    </p>
                    <p>
                      📔 1 Agenda Esperanza 2027, realizada con los más altos estándares de calidad y creada especialmente para que recuerdes cada día que tú también aportaste a quienes más lo necesitan.
                    </p>
                  </div>
                </div>

                <div className="glass-card p-6 space-y-2">
                  <p className="text-base text-frost">
                    📍 Théâtre Sainte-Catherine — Montreal
                  </p>
                  <p className="text-base text-mist">
                    🕖 Primera función: 7:00 PM
                  </p>
                  <p className="text-base text-mist">
                    🕘 Segunda función: 9:00 PM
                  </p>
                  <p className="text-base text-frost font-medium">
                    👉 Tú escoges el horario de tu función.
                  </p>
                </div>

                <div>
                  <p className="text-base leading-relaxed text-ice font-medium mb-2">
                    Y hay algo aún más especial:
                  </p>
                  <p className="text-base leading-relaxed text-mist">
                    🚗 Pedrito Leal te entregará personalmente tu Agenda Esperanza en cualquier dirección de Montreal.
                  </p>
                </div>

                <div className="text-center space-y-1 py-4">
                  <p className="text-base leading-relaxed text-frost">
                    Tu donación se convierte en ayuda.
                  </p>
                  <p className="text-base leading-relaxed text-frost">
                    Tu agenda se convierte en un recuerdo.
                  </p>
                  <p className="text-lg leading-relaxed text-ice font-medium">
                    Y tu presencia se convierte en esperanza para La Guaira.
                  </p>
                </div>

                <div className="text-center py-6 space-y-6">
                  <p className="font-display font-medium text-xl text-gradient">
                    DONACIÓN: $100 CAD | 2 TICKETS + AGENDA 2027
                  </p>
                  <a
                    href={WA_MONTREAL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-medium text-white bg-violet no-underline transition-opacity hover:opacity-90 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-frost focus-visible:outline-offset-2"
                  >
                    <Heart className="w-5 h-5" />
                    Donar $100 CAD
                  </a>
                </div>

                <div className="text-center space-y-1 pt-4">
                  <p className="text-lg text-frost font-medium">
                    Gracias, Montreal.
                  </p>
                  <p className="text-lg text-ice font-medium">
                    Venezuela se levanta.
                  </p>
                </div>
              </div>

              {/* Sponsors ticker */}
              <div className="mt-20 gs-hidden" data-gs="reveal">
                <div className="flex items-center justify-center gap-4 mb-8">
                  <span className="eyebrow-line" />
                  <span className="font-mono text-[15px] font-normal tracking-[0.10em] text-mist uppercase leading-tight">
                    Sponsors
                  </span>
                  <span className="eyebrow-line" />
                </div>
                <div className="sponsor-ticker">
                  <div className="sponsor-ticker-inner">
                    {[...sponsors, ...sponsors].map((s, i) => (
                      <div key={i} className="sponsor-ticker-item">
                        <Image
                          src={s.src}
                          alt={s.alt}
                          width={140}
                          height={70}
                          className="w-auto h-14 object-contain opacity-60 hover:opacity-100 transition-opacity"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="py-8 text-center border-t border-[rgba(186,215,247,0.06)]">
          <div className="max-w-[1200px] mx-auto px-4">
            <p className="text-sm text-fog">
              &copy; 2026 Pedro Leal — Leal Show and Productions. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
