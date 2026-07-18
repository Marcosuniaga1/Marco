import { site } from "@/lib/site";

export const metadata = {
  title: `Política de Privacidad - ${site.name}`,
};

export default function PrivacidadPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="mb-8 text-[1.8rem] font-extrabold text-vinotinto">
        Política de Privacidad
      </h1>

      <div className="space-y-4 text-gray-700">
        <p>
          En {site.name} respetamos tu privacidad. Cuando nos proporcionas tus
          datos personales (nombre, correo electrónico, número de WhatsApp),
          los utilizamos únicamente para enviarte la información del programa
          que solicitaste y comunicarnos contigo sobre tu inscripción. No
          vendemos, alquilamos ni compartimos tu información personal con
          terceros con fines comerciales.
        </p>
        <p>
          Podemos utilizar herramientas de terceros (como formularios de Google
          o plataformas de email) para gestionar los datos recopilados. Estas
          herramientas tienen sus propias políticas de privacidad. Al enviar
          tus datos a través de nuestros formularios, aceptas que los
          procesemos según lo descrito aquí. Si deseas que eliminemos tus
          datos, puedes escribirnos por WhatsApp y lo haremos en el menor
          tiempo posible.
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
