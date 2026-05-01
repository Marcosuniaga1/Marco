import Link from "next/link";

export default function LegalLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-mystic-gradient">
      <div className="absolute inset-0 soft-noise opacity-60 pointer-events-none" />

      <div className="relative z-10 container-narrow px-6 py-16 md:px-12 md:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-oro/80 hover:text-oro transition-colors mb-10"
        >
          <span>←</span> Volver al inicio
        </Link>

        <header className="mb-10 border-b border-oro/20 pb-8">
          <p className="text-xs uppercase tracking-[0.4em] text-oro mb-3">
            Sal del Hueco
          </p>
          <h1 className="heading-serif text-4xl md:text-5xl mb-4">
            <span className="gold-text">{title}</span>
          </h1>
          {intro && (
            <p className="text-crema/75 leading-relaxed max-w-2xl">{intro}</p>
          )}
        </header>

        <article className="prose-legal text-crema/80 leading-relaxed space-y-6">
          {children}
        </article>

        <footer className="mt-16 border-t border-oro/15 pt-6 text-xs text-crema/50">
          Última actualización:{" "}
          {new Date().toLocaleDateString("es-VE", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          .
        </footer>
      </div>
    </main>
  );
}
