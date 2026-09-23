"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Tour", href: "#gira" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Servicios", href: "#servicios" },
  { label: "Fundación", href: "#fundacion" },
  { label: "Contacto", href: "#contacto" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="md:hidden relative" ref={navRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-11 h-11 bg-transparent border-0 cursor-pointer text-frost"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <nav
        aria-label="Navegación móvil"
        className="absolute top-full right-0 mt-2 min-w-[180px] rounded-xl border border-glass-edge bg-[rgba(5,6,15,0.96)] backdrop-blur-xl shadow-lg"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? "scale(1)" : "scale(0.95)",
          transformOrigin: "top right",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1), transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <ul className="list-none p-2 m-0 flex flex-col gap-0.5">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block text-sm font-medium text-mist no-underline py-2.5 px-4 rounded-lg transition-colors hover:bg-[rgba(186,214,247,0.08)] hover:text-ice"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
