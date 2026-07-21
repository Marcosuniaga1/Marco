const steps = [
  {
    n: 1,
    title: "Accedes a la plataforma",
    text: "Pago único de $12 en Venezuela (o $20 fuera del país). Acceso inmediato a los cursos de marketing digital, redes sociales, embudos de venta y emprendimiento.",
  },
  {
    n: 2,
    title: "Aplicas lo que aprendes",
    text: "Estudias a tu ritmo. Si quieres, también puedes ofrecer el acceso a otras personas y generar un ingreso adicional — eso es opcional, no una obligación para usar la plataforma.",
  },
  {
    n: 3,
    title: "Avanzas con acompañamiento real",
    text: "Te acompaño directamente si tienes dudas, y cuentas con mi garantía de devolución si algo no es como te lo mostré.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-bgdark px-5 py-16">
      <h2 className="section-title">Cómo funciona en 3 pasos</h2>
      <p className="section-subtitle">
        Un proceso simple y transparente, sin letra pequeña.
      </p>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="card relative">
            <span className="absolute -top-3 left-6 flex h-7 w-7 items-center justify-center rounded-full bg-violeta text-sm font-bold text-white">
              {s.n}
            </span>
            <h3 className="mb-3 mt-3 text-lg font-bold text-white">
              {s.title}
            </h3>
            <p className="text-sm text-muted">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
