import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section className="bg-vinotinto px-5 py-16 text-center text-crema">
      <h1 className="mx-auto mb-5 max-w-3xl text-[1.8rem] font-extrabold leading-tight md:text-[2.6rem]">
        Carmen no sabía nada de IA. Hoy publica sin miedo.
      </h1>

      <p className="mx-auto mb-8 max-w-2xl text-base text-[#f0e6e9] md:text-[1.15rem]">
        Publicas pero nadie te compra. IA parece complicada. Tienes miedo de no
        saber. Carmen estaba donde estás tú. Aprendió un sistema simple en 20
        minutos. Hoy publica con seguridad. ¿Quieres aprender?
      </p>

      <div className="relative mx-auto mb-8 aspect-video max-w-3xl overflow-hidden rounded-xl shadow-2xl">
        <iframe
          className="absolute inset-0 h-full w-full border-0"
          src={`https://www.youtube.com/embed/${site.youtubeId}`}
          title="Video testimonio"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <a href="#formulario" className="btn-cta">
        Quiero aprender este sistema
      </a>
    </section>
  );
}
