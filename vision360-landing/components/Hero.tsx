import { whatsappUrl, site } from "@/lib/site";

export default function Hero() {
  return (
    <section className="bg-bgdark px-5 py-16 text-center text-white">
      <span className="mb-5 inline-block rounded-full border border-cardborder bg-violeta-soft px-4 py-1.5 text-sm font-semibold text-violeta-light">
        Formación en marketing digital
      </span>

      <h1 className="mx-auto mb-5 max-w-3xl text-[1.8rem] font-extrabold leading-tight md:text-[2.6rem]">
        Aprende marketing digital, redes sociales y ventas — con Visión 360
      </h1>

      <p className="mx-auto mb-8 max-w-2xl text-base text-muted md:text-[1.15rem]">
        Antes de escribirme, mira este video de unos minutos. Te cuento
        exactamente qué es esto, cómo funciona, y respondo de frente las
        dudas que seguro ya tienes.
      </p>

      <div className="relative mx-auto mb-8 aspect-video max-w-3xl overflow-hidden rounded-xl border border-cardborder shadow-2xl">
        <iframe
          className="absolute inset-0 h-full w-full border-0"
          src={`https://www.youtube.com/embed/${site.youtubeId}`}
          title="Cómo funciona Visión 360"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <a
        href={whatsappUrl}
        className="btn-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
      >
        💬 Ya lo vi, escríbeme por WhatsApp
      </a>

      <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
        <span>✓ Pago único de $12</span>
        <span>✓ Acceso inmediato a la plataforma</span>
        <span>✓ Garantía de devolución</span>
      </div>
    </section>
  );
}
