"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Nota: el diseño original solo incluía la landing; esta página "gracias"
// es una versión sobria y on-brand creada para completar el flujo del formulario.
// Sustituye el texto o el enlace del PDF cuando lo tengas.
export default function Gracias() {
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    try {
      setNombre(sessionStorage.getItem("lead_nombre") || "");
    } catch {
      // sessionStorage puede no estar disponible
    }
  }, []);

  return (
    <main className="gracias">
      <div className="ring">
        <span>✓</span>
      </div>
      <h1>{nombre ? `¡Gracias, ${nombre}!` : "¡Gracias!"}</h1>
      <p>
        Tu PDF «Las 10 señales de que estás en automático» está en camino. Revisa
        tu correo en los próximos minutos (y la carpeta de spam, por si acaso).
      </p>
      <a className="btn" href="#" download>
        Descargar el PDF ahora
      </a>
      <p style={{ marginTop: 24 }}>
        <Link href="/" style={{ color: "var(--gold)", textDecoration: "none" }}>
          ← Volver al inicio
        </Link>
      </p>
    </main>
  );
}
