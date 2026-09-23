import { whatsappUrl } from "@/lib/site";

export default function FinalCTA() {
  return (
    <section className="bg-violeta-soft px-5 py-16 text-center text-white">
      <h2 className="mb-4 text-[1.6rem] font-extrabold md:text-[2.2rem]">
        ¿Listo para dar el paso?
      </h2>
      <p className="mx-auto mb-8 max-w-lg text-gray-200">
        $12 de inversión única. Una conversación conmigo, sin compromiso. Si
        tienes dudas, te las respondo todas antes de que decidas algo.
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
