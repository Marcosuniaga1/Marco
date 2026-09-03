"use client";
import { useEffect, useState } from "react";

export default function StickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="sticky-bar">
      <a
        href="https://wa.me/573225684896?text=Hola%20Luchy%2C%20vi%20tu%20video%20y%20quiero%20explorar%20si%20puedes%20ayudarme.%20%C2%BFTienes%20espacio%20esta%20semana%3F"
        className="sticky-cta"
        target="_blank"
        rel="noopener noreferrer"
      >
        Agenda una conversación →
      </a>
    </div>
  );
}
