import { whatsappUrl } from "@/lib/site";

export default function FinalCTA() {
  return (
    <section className="bg-vinotinto px-5 py-16 text-center text-crema">
      <h2 className="mb-4 text-[1.6rem] font-extrabold md:text-[2.2rem]">
        ¿Lista para publicar sin miedo?
      </h2>
      <p className="mx-auto mb-8 max-w-lg text-[#f0e6e9]">
        Escríbeme directo por WhatsApp y te cuento cómo funciona el sistema paso
        a paso.
      </p>
      <a
        href={whatsappUrl}
        className="btn-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
      >
        💬 Escríbeme por WhatsApp
      </a>
    </section>
  );
}
