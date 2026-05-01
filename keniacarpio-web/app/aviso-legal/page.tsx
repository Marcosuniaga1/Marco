import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Aviso legal · Sal del Hueco",
  description:
    "Aviso legal y descargo de responsabilidad sobre los servicios de tarot, oráculos y rituales de Sal del Hueco.",
};

export default function AvisoLegal() {
  return (
    <LegalLayout
      title="Aviso legal y descargo de responsabilidad"
      intro="Lee con calma. Esta es la parte aburrida pero importante. Aquí te contamos qué somos, qué hacemos y qué no hacemos."
    >
      <section>
        <h2 className="heading-serif text-2xl text-crema mb-3">
          Sobre Sal del Hueco
        </h2>
        <p>
          Sal del Hueco es un proyecto personal de{" "}
          <span className="text-oro">Kenia Carpio</span> que ofrece lecturas de
          tarot, mensajes oraculares, rituales personalizados y kits
          energéticos como herramientas de autoconocimiento y acompañamiento
          espiritual.
        </p>
      </section>

      <section>
        <h2 className="heading-serif text-2xl text-crema mb-3">
          Naturaleza del servicio
        </h2>
        <p>
          Las lecturas de tarot y los rituales que ofrecemos tienen un
          propósito de <span className="text-oro">orientación, reflexión y
          autoconocimiento</span>. No constituyen, en ningún caso, sustituto de:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-3 ml-2">
          <li>Atención médica, psicológica o psiquiátrica.</li>
          <li>Asesoría legal, financiera, fiscal o de inversiones.</li>
          <li>Diagnósticos clínicos de cualquier tipo.</li>
          <li>Tratamientos farmacológicos o terapias profesionales.</li>
        </ul>
        <p className="mt-3">
          Si atraviesas una crisis emocional, una emergencia médica o una
          situación que requiera atención profesional, te pedimos que acudas a
          un especialista calificado.
        </p>
      </section>

      <section>
        <h2 className="heading-serif text-2xl text-crema mb-3">
          Responsabilidad
        </h2>
        <p>
          Las decisiones que tomes a partir de una lectura, ritual o kit son
          siempre tu responsabilidad. Sal del Hueco te acompaña, te muestra
          posibilidades y te invita a la reflexión, pero{" "}
          <span className="text-oro">no decide por ti</span>.
        </p>
        <p>
          No garantizamos resultados específicos ni efectos materiales,
          emocionales o espirituales determinados. Cada proceso personal es
          único.
        </p>
      </section>

      <section>
        <h2 className="heading-serif text-2xl text-crema mb-3">
          Mayoría de edad
        </h2>
        <p>
          Los servicios están dirigidos a personas mayores de 18 años. Para
          menores se requiere autorización expresa de un representante legal.
        </p>
      </section>

      <section>
        <h2 className="heading-serif text-2xl text-crema mb-3">
          Propiedad intelectual
        </h2>
        <p>
          El contenido de este sitio (textos, fotografías, logo, manifiesto,
          identidad visual) es propiedad de Sal del Hueco / Kenia Carpio y
          está protegido por la legislación vigente. Queda prohibida su
          reproducción total o parcial sin autorización por escrito.
        </p>
      </section>

      <section>
        <h2 className="heading-serif text-2xl text-crema mb-3">Contacto</h2>
        <p>
          Para cualquier duda sobre este aviso legal puedes escribirnos por{" "}
          <a
            href="https://wa.me/584241054059"
            className="text-oro hover:underline"
          >
            WhatsApp
          </a>{" "}
          o por{" "}
          <a
            href="https://www.instagram.com/saldelhueco/"
            className="text-oro hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram (@saldelhueco)
          </a>
          .
        </p>
      </section>
    </LegalLayout>
  );
}
