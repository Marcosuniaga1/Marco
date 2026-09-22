"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = ["Gira", "Sobre mí", "Servicios", "Fundación", "Contacto"];

function toHref(item: string) {
  return `#${item.toLowerCase().replace(/\s/g, "-").normalize("NFD").replace(/[̀-ͯ]/g, "")}`;
}

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="relative z-[60] flex items-center justify-center w-11 h-11 bg-transparent border-0 cursor-pointer text-frost"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-[rgba(5,6,15,0.95)] backdrop-blur-xl"
          style={{ top: 0 }}
        >
          <nav
            className="flex flex-col items-center justify-center h-full gap-2"
            aria-label="Navegación móvil"
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={toHref(item)}
                onClick={() => setOpen(false)}
                className="font-display font-medium text-2xl text-ice no-underline py-3 px-6 rounded-lg transition-colors hover:bg-[rgba(186,214,247,0.06)]"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
