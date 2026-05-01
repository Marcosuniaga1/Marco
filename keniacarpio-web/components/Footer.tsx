import Link from "next/link";

const legalLinks = [
  { href: "/aviso-legal", label: "Aviso legal" },
  { href: "/terminos", label: "Términos y condiciones" },
  { href: "/privacidad", label: "Política de privacidad" },
];

const socialLinks = [
  {
    href: "https://www.instagram.com/saldelhueco/",
    label: "Instagram",
    external: true,
  },
  {
    href: "https://www.imdb.com/es/name/nm6003094/",
    label: "IMDb",
    external: true,
  },
  {
    href: "https://wa.me/584241054059",
    label: "WhatsApp",
    external: true,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-oro/20 bg-noche">
      <div className="container-narrow px-6 py-12 md:px-12 md:py-16">
        {/* Top row */}
        <div className="grid gap-10 md:grid-cols-3 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl text-oro">✦</span>
              <span className="font-serif text-xl text-crema">
                Sal del <span className="gold-text font-semibold">Hueco</span>
              </span>
            </div>
            <p className="text-sm text-crema/70 leading-relaxed">
              Tarot, oráculos y rituales para autoconocimiento real. Por Kenia
              Carpio.
            </p>
            <p className="mt-3 text-xs text-oro/80 italic font-serif">
              Bien brutal, bien bruja
            </p>
          </div>

          {/* Legal */}
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-oro">
              Legal
            </p>
            <ul className="space-y-2 text-sm">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-crema/70 hover:text-oro transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-oro">
              Síguenos
            </p>
            <ul className="space-y-2 text-sm">
              {socialLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noopener noreferrer" : undefined}
                    className="text-crema/70 hover:text-oro transition-colors"
                  >
                    {l.label}{" "}
                    {l.external && (
                      <span className="text-xs opacity-60">↗</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col items-center gap-2 border-t border-oro/15 pt-6 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-xs text-crema/50">
            © {year} Sal del Hueco · Kenia Carpio · Todos los derechos
            reservados
          </p>
          <p className="text-xs text-crema/40">
            Hecho con intención · Caracas, Venezuela
          </p>
        </div>
      </div>
    </footer>
  );
}
