const covered = [
  "No te doy acceso a la plataforma o a los cursos prometidos.",
  "Aparece alguna comisión o condición que no te mencioné antes de que pagaras.",
  "Lo que encuentras adentro no es lo que te mostré en este video.",
];

const notCovered = [
  "Entraste, no revisaste los cursos, no hiciste ningún intento por vender, y pides el reembolso porque \"no funcionó\".",
  "Han pasado pocos días sin resultados todavía. Esto depende de constancia, no de plazos cortos.",
];

export default function Guarantee() {
  return (
    <section className="bg-bgdark px-5 py-16">
      <h2 className="section-title">Mi garantía</h2>
      <p className="section-subtitle">
        No prometo resultados mágicos ni automáticos. Esto es lo que sí te
        garantizo.
      </p>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        <div className="card">
          <h3 className="mb-4 font-bold text-white">Te devuelvo el dinero si:</h3>
          <ul className="space-y-3">
            {covered.map((c) => (
              <li key={c} className="flex gap-3 text-sm text-gray-200">
                <span className="text-violeta-light">✓</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3 className="mb-4 font-bold text-white">No aplica si:</h3>
          <ul className="space-y-3">
            {notCovered.map((c) => (
              <li key={c} className="flex gap-3 text-sm text-muted">
                <span className="text-red-400">✕</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted">
        Si tu caso cae dentro de lo que cubro, te devuelvo el 100% en menos
        de 24 horas.
      </p>
    </section>
  );
}
