import Link from "next/link";

export const metadata = {
  title: "Política de Privacidad · Luchy Ghisays",
};

export default function Privacidad() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px 80px", color: "#1a1a2e", lineHeight: 1.75 }}>
      <p style={{ marginBottom: 8 }}>
        <Link href="/" style={{ color: "var(--gold)", fontSize: ".88rem" }}>← Volver</Link>
      </p>
      <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>Legal</p>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: 6, lineHeight: 1.15 }}>Política de Privacidad</h1>
      <p style={{ fontSize: ".82rem", color: "#6b7280", marginBottom: 48 }}>Última actualización: julio de 2025</p>

      <p style={{ color: "#374151", marginBottom: 14 }}>Esta política describe cómo Luchy Ghisays recopila, usa y protege la información personal que nos proporcionás a través de este sitio.</p>

      <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "36px 0 10px" }}>1. Información que recopilamos</h2>
      <p style={{ color: "#374151", marginBottom: 14 }}>Cuando completás el formulario recopilamos: nombre, email, fecha y hora del envío. También recopilamos datos anónimos de uso a través de Google Analytics (GA4) y Meta Pixel.</p>

      <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "36px 0 10px" }}>2. Cómo usamos tu información</h2>
      <p style={{ color: "#374151", marginBottom: 14 }}>Para enviarte el PDF solicitado, para mejorar el sitio y para medir el rendimiento de nuestras comunicaciones. No cedemos tu información a terceros con fines comerciales.</p>

      <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "36px 0 10px" }}>3. Almacenamiento</h2>
      <p style={{ color: "#374151", marginBottom: 14 }}>Los datos se almacenan en Google Sheets vía Google Apps Script, alojado en servidores de Google LLC (EE.UU.), que cumple con GDPR y normativas internacionales.</p>

      <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "36px 0 10px" }}>4. Cookies y seguimiento</h2>
      <p style={{ color: "#374151", marginBottom: 14 }}><strong>Google Analytics (GA4)</strong> — mide visitas y conversiones de forma agregada. <strong>Meta Pixel (ID 283637846626618)</strong> — registra visitas y conversiones para campañas en Facebook e Instagram.</p>

      <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "36px 0 10px" }}>5. Tus derechos</h2>
      <p style={{ color: "#374151", marginBottom: 14 }}>Podés acceder, corregir o solicitar la eliminación de tus datos en cualquier momento. Escribinos por <a href="https://wa.me/573225684896" style={{ color: "var(--gold)" }}>WhatsApp</a>.</p>

      <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "36px 0 10px" }}>6. Cambios</h2>
      <p style={{ color: "#374151", marginBottom: 14 }}>Podemos actualizar esta política en cualquier momento. La versión vigente estará siempre disponible en esta página.</p>

      <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "40px 0" }} />
      <p style={{ fontSize: ".82rem", color: "#6b7280" }}>¿Preguntas? Escribinos por <a href="https://wa.me/573225684896" style={{ color: "var(--gold)" }}>WhatsApp</a>.</p>
    </main>
  );
}
