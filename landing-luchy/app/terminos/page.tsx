import { site } from "@/lib/site";

export const metadata = {
  title: `Términos y Condiciones - ${site.name}`,
};

export default function TerminosPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="mb-8 text-[1.8rem] font-extrabold text-vinotinto">
        Términos y Condiciones
      </h1>

      <div className="space-y-4 text-gray-700">
        <p>
          Al adquirir el programa &ldquo;Vende con IA desde Cero&rdquo; de{" "}
          {site.name}, obtienes acceso al contenido digital del programa (videos
          y materiales) para uso personal. Este contenido no puede ser
          redistribuido, revendido ni compartido con terceros.
        </p>
        <p>
          Debido a la naturaleza digital del producto, no se ofrecen
          devoluciones una vez entregado el acceso. Los resultados pueden variar
          según la dedicación y aplicación de cada persona; {site.name} no
          garantiza resultados específicos de ingresos o ventas. Al realizar tu
          pago y acceder al programa, confirmas que aceptas estos términos.
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
