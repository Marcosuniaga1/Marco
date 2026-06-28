// Configuración central del sitio Luchy Ghisays.
export const site = {
  brand: "LUCHY GHISAYS",
  title: "Las 10 señales de que estás en automático · Luchy",
  description:
    "Descubre las 10 señales de que estás en automático. Lista de diagnóstico para ejecutivos. PDF gratis, acceso inmediato.",
  // Google Analytics 4
  gaId: "G-JJ6E0H1JW2",
  // Endpoint del formulario (Google Apps Script Web App publicado, termina en /exec).
  leadFormEndpoint:
    "https://script.google.com/macros/s/AKfycbwBxMcPO2AJ3yIAdMv8vaPCFUn9oJ-V3vfkm6AgvSjOQFRiRroqR38-zTyEiwvCu8vw/exec",
};

// Sección "Sobre Luchy Ghisays" (borrador editable).
export const aboutLuchy = {
  eyebrow: "Sobre Luchy Ghisays",
  heading: "Detrás de este diagnóstico",
  // Foto en public/luchy.jpg — reemplázala por la definitiva con el mismo nombre.
  photo: "/luchy.jpg",
  photoAlt: "Luchy Ghisays",
  paragraphs: [
    "Luchy Ghisays acompaña a ejecutivos y líderes que, vistos desde afuera, lo tienen todo bajo control — pero por dentro sienten que funcionan en automático. Su trabajo no consiste en hacer más, sino en ver con claridad: reconocer los patrones que te mantienen atrapado y recuperar la conexión con lo que de verdad quieres.",
    "Une la mirada estratégica del mundo ejecutivo con un enfoque profundamente humano. Su método es simple y directo: primero entiendes dónde estás, luego decides hacia dónde vas. Sin fórmulas mágicas y sin postergar otro año más.",
  ],
  closing: "Hoy guía a líderes a salir del piloto automático y volver a dirigir su vida —y su carrera— con propósito.",
};

// Las 10 señales del lead magnet.
export const signals: string[] = [
  "Repites decisiones que no te satisfacen",
  "Tu autoexigencia es más alta que tu disfrute",
  "Pospones lo importante por lo urgente",
  "No recuerdas cuándo fue la última vez que te sentiste vivo",
  "Intentaste cambiar pero volviste a lo conocido",
  "Tu miedo está disfrazado de razones prácticas",
  "Funciona pero no fluye",
  "Tienes respuestas pero te falta decisión",
  "La culpa de querer algo distinto es mayor que el deseo",
  "Esperas que algo externo te dé la respuesta",
];

// Pasos posteriores.
export const steps: string[] = [
  "Entiendes el patrón",
  "Ves por primera vez qué está bloqueado",
  "Sabes exactamente qué cambiar",
];

// Señales del bloque "problema".
export const problems: { bold: string; rest: string }[] = [
  { bold: "Logra cosas.", rest: "Pero su vida personal está en pausa." },
  { bold: "Intenta motivarse.", rest: "Pero vuelve a lo de siempre." },
  { bold: "Sabe qué quiere cambiar.", rest: "Pero lo posterga año tras año." },
];

// Preguntas frecuentes.
export const faqs: { q: string; a: string }[] = [
  { q: "¿Cuál es el costo?", a: "Es gratuito. Completamente." },
  {
    q: "¿Qué hago con el PDF?",
    a: "Lo lees, identificas dónde estás, y desde ahí decides qué hacer.",
  },
  { q: "¿Recibiré spam?", a: "No. Solo contenido que importa." },
];
