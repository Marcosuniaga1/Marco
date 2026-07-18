import { site } from "@/lib/site";

export const metadata = {
  title: `Aviso Legal - ${site.name}`,
};

export default function AvisoLegalPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="mb-8 text-[1.8rem] font-extrabold text-vinotinto">
        Aviso Legal
      </h1>

      <div className="space-y-4 text-gray-700">
        <p>
          Este sitio web y el programa &ldquo;Vende con IA desde Cero&rdquo;
          son propiedad de {site.name}. Todo el contenido publicado en este
          sitio (textos, imágenes, videos, materiales del programa) está
          protegido por derechos de autor y no puede ser copiado ni reproducido
          sin autorización previa.
        </p>
        <p>
          Los testimonios mostrados son experiencias individuales y no
          constituyen una garantía de resultados. Los precios, ofertas y
          disponibilidad del programa pueden cambiar sin previo aviso.{" "}
          {site.name} no se hace responsable por el uso que los alumnos hagan
          de la información proporcionada en el programa.
        </p>
      </div>

      <div className="mt-10">
        <a href="/vende-con-ia-desde-cero" className="text-dorado hover:underline">
          &larr; Volver
        </a>
      </div>
    </main>
  );
}
