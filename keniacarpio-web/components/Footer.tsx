export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-oro/20 bg-noche px-6 py-10 md:px-12">
      <div className="container-narrow flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-2">
          <span className="text-xl text-oro">✦</span>
          <span className="font-serif text-crema">
            Kenia <span className="gold-text font-semibold">Carpio</span>
          </span>
        </div>
        <p className="text-xs text-crema/50">
          © {year} Kenia Carpio · Todos los derechos reservados
        </p>
        <div className="flex gap-4 text-sm text-crema/60">
          <a
            href="https://www.instagram.com/keniacarpio/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-oro transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://www.imdb.com/es/name/nm6003094/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-oro transition-colors"
          >
            IMDb
          </a>
        </div>
      </div>
    </footer>
  );
}
