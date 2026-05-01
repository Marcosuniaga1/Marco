import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Política de privacidad · Sal del Hueco",
  description:
    "Cómo Sal del Hueco trata tus datos personales: qué recolectamos, para qué y tus derechos.",
};

export default function Privacidad() {
  return (
    <LegalLayout
      title="Política de privacidad"
      intro="Tu información es tuya. Aquí te contamos qué datos manejamos cuando te contactas con nosotros y cómo los cuidamos."
    >
      <section>
        <h2 className="heading-serif text-2xl text-crema mb-3">
          Datos que recolectamos
        </h2>
        <p>
          Solo trabajamos con la información mínima necesaria para
          atenderte:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-3 ml-2">
          <li>Tu nombre o nombre preferido.</li>
          <li>Tu número de WhatsApp o usuario de Instagram.</li>
          <li>El servicio que te interesa y el contexto que tú decidas compartir.</li>
          <li>
            En caso de pago: los datos necesarios para verificar la
            transacción (referencia, banco, etc.).
          </li>
        </ul>
        <p className="mt-3">
          <span className="text-oro">No</span> recolectamos información
          sensible (cédula, dirección, datos médicos) salvo que tú decidas
          compartirla voluntariamente durante la sesión.
        </p>
      </section>

      <section>
        <h2 className="heading-serif text-2xl text-crema mb-3">
          Para qué usamos tus datos
        </h2>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Coordinar la sesión, ritual o entrega de tu kit.</li>
          <li>Verificar el pago y confirmar la reserva.</li>
          <li>Enviarte recordatorios o información sobre tu servicio.</li>
          <li>Responder tus dudas y consultas.</li>
        </ul>
      </section>

      <section>
        <h2 className="heading-serif text-2xl text-crema mb-3">
          Lo que NO hacemos con tus datos
        </h2>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>No los vendemos, alquilamos ni compartimos con terceros.</li>
          <li>
            No los usamos para campañas masivas sin tu consentimiento
            explícito.
          </li>
          <li>
            No publicamos lo conversado en sesión bajo ningún concepto.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="heading-serif text-2xl text-crema mb-3">
          Cookies y analítica
        </h2>
        <p>
          Este sitio puede usar cookies técnicas necesarias para su
          funcionamiento y herramientas básicas de analítica para entender
          el tráfico de manera agregada y anónima. No se usan cookies
          publicitarias ni de seguimiento entre sitios.
        </p>
      </section>

      <section>
        <h2 className="heading-serif text-2xl text-crema mb-3">
          WhatsApp e Instagram
        </h2>
        <p>
          Cuando te contactas con nosotros por WhatsApp o Instagram, los
          datos de esa conversación se almacenan en sus respectivos
          servidores conforme a las políticas de cada plataforma. Te
          invitamos a revisar las políticas de privacidad de{" "}
          <a
            href="https://www.whatsapp.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-oro hover:underline"
          >
            WhatsApp
          </a>{" "}
          e{" "}
          <a
            href="https://privacycenter.instagram.com/policy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-oro hover:underline"
          >
            Instagram
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="heading-serif text-2xl text-crema mb-3">
          Tus derechos
        </h2>
        <p>
          En cualquier momento puedes pedirnos:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-3 ml-2">
          <li>Ver qué datos tuyos tenemos.</li>
          <li>Corregirlos si están desactualizados.</li>
          <li>
            Eliminarlos completamente (salvo cuando una obligación legal nos
            exija conservarlos).
          </li>
        </ul>
        <p className="mt-3">
          Para ejercer cualquiera de estos derechos escríbenos por{" "}
          <a
            href="https://wa.me/584241054059"
            className="text-oro hover:underline"
          >
            WhatsApp
          </a>
          .
        </p>
      </section>
    </LegalLayout>
  );
}
