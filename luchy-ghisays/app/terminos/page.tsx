import Link from "next/link";

export const metadata = {
  title: "Términos de Uso · Luchy Ghisays",
};

export default function Terminos() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px 80px", color: "#1a1a2e", lineHeight: 1.75 }}>
      <p style={{ marginBottom: 8 }}>
        <Link href="/" style={{ color: "var(--gold)", fontSize: ".88rem" }}>← Volver</Link>
      </p>
      <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>Legal</p>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: 6, lineHeight: 1.15 }}>Términos de Uso</h1>
      <p style={{ fontSize: ".82rem", color: "#6b7280", marginBottom: 48 }}>Última actualización: julio de 2025</p>

      <p style={{ color: "#374151", marginBottom: 14 }}>Al acceder y usar este sitio web, aceptás los siguientes términos. Si no estás de acuerdo, te pedimos que no uses el sitio.</p>

      <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "36px 0 10px" }}>1. Titular</h2>
      <p style={{ color: "#374151", marginBottom: 14 }}>Sitio operado por <strong>Luchy Ghisays</strong>, asesora independiente con actividad en Colombia y Latinoamérica. Contacto: <a href="https://wa.me/573225684896" style={{ color: "var(--gold)" }}>+57 322 568 4896</a>.</p>

      <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "36px 0 10px" }}>2. Uso permitido</h2>
      <p style={{ color: "#374151", marginBottom: 14 }}>Podés navegar libremente, completar el formulario y compartir el enlace. Queda prohibido copiar el contenido con fines comerciales, usar el formulario para spam o intentar acceso no autorizado a los sistemas.</p>

      <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "36px 0 10px" }}>3. Servicios</h2>
      <p style={{ color: "#374151", marginBottom: 14 }}>El contenido es informativo y no constituye por sí mismo una relación de asesoría. La prestación efectiva de servicios queda sujeta a acuerdo expreso. Los resultados en testimonios son individuales y no garantizan resultados equivalentes.</p>

      <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "36px 0 10px" }}>4. Propiedad intelectual</h2>
      <p style={{ color: "#374151", marginBottom: 14 }}>Todos los textos, imágenes y contenido son propiedad de Luchy Ghisays. Prohibida su reproducción sin autorización escrita previa.</p>

      <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "36px 0 10px" }}>5. Limitación de responsabilidad</h2>
      <p style={{ color: "#374151", marginBottom: 14 }}>No nos hacemos responsables por interrupciones técnicas del sitio, decisiones tomadas basándose únicamente en el contenido informativo, ni daños indirectos derivados del uso del sitio.</p>

      <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "36px 0 10px" }}>6. Ley aplicable</h2>
      <p style={{ color: "#374151", marginBottom: 14 }}>Estos términos se rigen por las leyes de la República de Colombia. Cualquier disputa se resolverá ante los tribunales competentes de Bogotá.</p>

      <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "40px 0" }} />
      <p style={{ fontSize: ".82rem", color: "#6b7280" }}>¿Preguntas? Escribinos por <a href="https://wa.me/573225684896" style={{ color: "var(--gold)" }}>WhatsApp</a>.</p>
    </main>
  );
}
