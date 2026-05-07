"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const links = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#sal-del-hueco", label: "Sal del Hueco" },
  { href: "#servicios", label: "Servicios" },
  { href: "#trayectoria", label: "Trayectoria" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-noche/85 backdrop-blur-lg border-b border-oro/20"
          : "bg-transparent"
      }`}
    >
      <nav className="container-narrow flex items-center justify-between px-6 py-4 md:px-12">
        <a href="#hero" className="flex items-center gap-2">
          <Image
            src="/img/logo.PNG"
            alt="Sal del Hueco"
            width={120}
            height={90}
            priority
            className="h-10 w-auto object-contain"
          />
          <span className="font-serif text-lg text-crema sm:text-xl">
            Sal del <span className="gold-text font-semibold">Hueco</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-crema/80 transition-colors hover:text-oro"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-crema text-2xl"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-noche/95 backdrop-blur-lg border-t border-oro/20">
          <ul className="flex flex-col gap-4 px-6 py-6">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-crema/80 hover:text-oro transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
