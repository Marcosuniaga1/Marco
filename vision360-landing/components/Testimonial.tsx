export default function Testimonial() {
  return (
    <section className="bg-bgdark px-5 py-16">
      <div className="mx-auto max-w-2xl rounded-2xl border border-cardborder bg-gradient-to-br from-violeta-soft to-card p-8 shadow-card">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violeta text-lg font-bold text-white">
            E
          </div>
          <div>
            <strong className="block text-white">Estudiante de la plataforma</strong>
            <span className="text-sm text-muted">Nombre reservado a pedido propio</span>
          </div>
        </div>
        <p className="italic text-gray-200">
          &ldquo;Empecé sin saber nada de esto. Fui aprendiendo y publicando
          poco a poco, y con el tiempo hice mis primeras ventas. No fue
          rápido ni automático, fue ir con constancia.&rdquo;
        </p>
      </div>
      <p className="mx-auto mt-4 max-w-2xl text-center text-xs text-muted">
        Resultado individual. No garantizamos tiempos ni montos de ingreso —
        depende del esfuerzo y la constancia de cada persona.
      </p>
    </section>
  );
}
