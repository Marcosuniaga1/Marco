const benefits = [
  {
    icon: "📈",
    title: "Marketing digital",
    text: "Fundamentos y estrategia para vender en internet, desde cero.",
  },
  {
    icon: "📱",
    title: "Redes sociales",
    text: "Cómo crear contenido que conecta y convierte en TikTok e Instagram.",
  },
  {
    icon: "🧭",
    title: "Embudos de venta",
    text: "Cómo estructurar un proceso de venta de principio a fin.",
  },
  {
    icon: "🚀",
    title: "Emprendimiento",
    text: "Bases para manejar tu propio negocio digital con criterio.",
  },
];

export default function Benefits() {
  return (
    <section className="bg-bgdark px-5 py-16">
      <h2 className="section-title">Qué vas a encontrar adentro</h2>
      <p className="section-subtitle">
        Contenido de formación real. Nada de películas, series ni streaming —
        esto es una plataforma de aprendizaje.
      </p>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {benefits.map((b) => (
          <div key={b.title} className="card text-center">
            <div className="mb-3 text-3xl">{b.icon}</div>
            <h3 className="mb-2 font-bold text-white">{b.title}</h3>
            <p className="text-sm text-muted">{b.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
