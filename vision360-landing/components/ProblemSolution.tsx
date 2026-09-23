const problems = [
  "Buscas ingresos extra pero no sabes por dónde empezar.",
  "Te da miedo caer en una estafa o pirámide disfrazada.",
  "No sabes si vale la pena invertir en algo que todavía no conoces.",
];

const solutions = [
  "Formación real en marketing digital, redes sociales, embudos de venta y emprendimiento — no solo la promesa de un ingreso.",
  "$12 de inversión única para acceder a la plataforma completa, con garantía de devolución si no recibes lo que te prometo.",
  "Te acompaño yo directamente. No es un bot ni un equipo genérico, soy una persona real con la que puedes hablar cuantas veces necesites.",
];

export default function ProblemSolution() {
  return (
    <section className="bg-bgdark px-5 py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        <div className="card">
          <h3 className="mb-5 text-xl font-extrabold text-white">
            ¿Reconoces esto?
          </h3>
          <ul className="space-y-4">
            {problems.map((p) => (
              <li key={p} className="flex gap-3 text-muted">
                <span className="mt-0.5 text-red-400">✕</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card border-violeta/40 bg-violeta-soft">
          <h3 className="mb-2 text-xl font-extrabold text-white">
            Visión 360 resuelve exactamente eso
          </h3>
          <ul className="mt-5 space-y-4">
            {solutions.map((s) => (
              <li key={s} className="flex gap-3 text-gray-200">
                <span className="mt-0.5 text-violeta-light">✓</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
