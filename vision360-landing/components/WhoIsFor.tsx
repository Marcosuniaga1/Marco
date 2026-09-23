const points = [
  "Flexible: lo avanzas a tu propio ritmo.",
  "Todo desde tu celular, sin equipos costosos.",
  "No necesitas experiencia previa, pero sí disposición a aprender y ser constante.",
  "Compatible con tus estudios o tu trabajo actual.",
];

export default function WhoIsFor() {
  return (
    <section className="bg-bgdark px-5 py-16">
      <h2 className="section-title">¿Esto es para ti?</h2>
      <p className="section-subtitle">
        Para quienes quieren aprender marketing digital en serio, no para
        quienes buscan dinero fácil de la nada.
      </p>

      <div className="mx-auto max-w-3xl">
        <div className="card">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p} className="flex gap-3 text-gray-200">
                <span className="mt-0.5 text-violeta-light">✓</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 rounded-2xl border border-violeta/40 bg-violeta-soft p-6 text-center">
          <p className="text-gray-100">
            <strong className="text-white">¿Eres menor de edad?</strong>{" "}
            Esto lo hablamos también con tus papás antes de cualquier pago.
            Para mí es importante que decidan con toda la información, y con
            gusto hablo directamente con ellos si tienen dudas.
          </p>
        </div>
      </div>
    </section>
  );
}
