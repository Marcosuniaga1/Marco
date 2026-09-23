import { site } from "@/lib/site";

const links = [
  { label: "Instagram", href: site.social.instagram },
  { label: "TikTok", href: site.social.tiktok },
];

export default function Footer() {
  return (
    <footer className="border-t border-cardborder bg-bgdark px-5 py-8 text-center text-[0.9rem] text-muted">
      <p>
        &copy; {new Date().getFullYear()} {site.name}. Todos los derechos
        reservados.
      </p>
      <div className="mt-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="mx-2 text-violeta-light hover:underline"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
