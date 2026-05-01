import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Términos y condiciones · Sal del Hueco",
  description:
    "Términos y condiciones del servicio de Sal del Hueco: lecturas, rituales, kits y eventos.",
};

export default function Terminos() {
  return (
    <LegalLayout
      title="Términos y condiciones"
      intro="Reglas claras al inicio para que la magia fluya sin malentendidos. Al contratar cualquiera de nuestros servicios aceptas lo siguiente."
    >
      <section>
        <h2 className="heading-serif text-2xl text-crema mb-3">
          1. Alcance de los servicios
        </h2>
        <p>
          Sal del Hueco ofrece: lecturas de tarot (presenciales u online),
          mensajes oraculares, rituales personalizados, kits energéticos y
          shows / activaciones para eventos privados.
        </p>
      </section>

      <section>
        <h2 className="heading-serif text-2xl text-crema mb-3">
          2. Reservas y pagos
        </h2>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>
            Toda reserva se confirma <span className="text-oro">después</span>{" "}
            de recibir el pago acordado.
          </li>
          <li>
            Los métodos de pago disponibles son: Zelle, Pago Móvil y Western
            Union (los datos exactos se entregan por WhatsApp).
          </li>
          <li>
            Las tarifas se acuerdan al momento de la reserva. Pueden variar por
            tipo de servicio, duración y modalidad.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="heading-serif text-2xl text-crema mb-3">
          3. Cancelaciones y reagendamientos
        </h2>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>
            Puedes <span className="text-oro">reagendar</span> tu sesión sin
            costo si avisas con al menos <strong>24 horas</strong> de
            anticipación.
          </li>
          <li>
            Cancelaciones con menos de 24 horas: el pago no es reembolsable,
            pero puede aplicarse como crédito a una próxima sesión dentro de
            los siguientes 90 días.
          </li>
          <li>
            En caso de fuerza mayor (salud, emergencia familiar, conexión),
            siempre buscaremos una alternativa justa para ambas partes.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="heading-serif text-2xl text-crema mb-3">
          4. Conducta durante las sesiones
        </h2>
        <p>
          Las sesiones se realizan en un entorno de respeto mutuo. Sal del
          Hueco se reserva el derecho de finalizar una sesión sin reembolso si
          se presentan:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-3 ml-2">
          <li>Faltas de respeto, agresividad verbal o acoso.</li>
          <li>
            Estado evidente de alteración por sustancias o intoxicación.
          </li>
          <li>
            Manipulación, exigencias de garantías mágicas o expectativas
            irrazonables.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="heading-serif text-2xl text-crema mb-3">
          5. Confidencialidad
        </h2>
        <p>
          Todo lo conversado durante una lectura o ritual es{" "}
          <span className="text-oro">estrictamente confidencial</span>. No se
          comparte, no se publica, no se discute con terceros.
        </p>
      </section>

      <section>
        <h2 className="heading-serif text-2xl text-crema mb-3">
          6. Resultados
        </h2>
        <p>
          No se garantizan resultados específicos. El tarot, los rituales y los
          kits son herramientas de acompañamiento y autoconocimiento. Su efecto
          depende del compromiso y la apertura de cada persona.
        </p>
      </section>

      <section>
        <h2 className="heading-serif text-2xl text-crema mb-3">
          7. Eventos y shows
        </h2>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Las contrataciones para eventos requieren reserva con al menos 7 días de anticipación.</li>
          <li>Se cobra un anticipo del 50% para confirmar fecha.</li>
          <li>Los gastos de traslado pueden cargarse aparte si la locación lo amerita.</li>
        </ul>
      </section>

      <section>
        <h2 className="heading-serif text-2xl text-crema mb-3">
          8. Modificaciones
        </h2>
        <p>
          Estos términos pueden actualizarse. La versión vigente es siempre la
          publicada en este sitio.
        </p>
      </section>
    </LegalLayout>
  );
}
