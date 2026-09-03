// Configuración central del sitio Luchy Ghisays.
export const site = {
  brand: "LUCHY GHISAYS",
  title: "Las 10 señales de que estás en automático · Luchy",
  description:
    "Descubre las 10 señales de que estás en automático. Lista de diagnóstico para ejecutivos. PDF gratis, acceso inmediato.",
  // Google Analytics 4
  gaId: "G-JJ6E0H1JW2",
  // Imagen y pie de la sección lead magnet ("Las 10 señales…").
  magnetImage: "/magnet-a.jpg",
  magnetCaption: {
    title: "¿Cuántas reconoces en ti?",
    text: "Si marcas tres o más, no es casualidad.",
  },
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
    "Luchy Ghisays acompaña a ejecutivos y líderes que, vistos desde afuera, lo tienen todo bajo control, pero por dentro sienten que funcionan en automático. Su trabajo no consiste en hacer más, sino en ver con claridad: reconocer los patrones que te mantienen atrapado y recuperar la conexión con lo que de verdad quieres.",
    "Une la mirada estratégica del mundo ejecutivo con un enfoque profundamente humano. Su método es simple y directo: primero entiendes dónde estás, luego decides hacia dónde vas. Sin fórmulas mágicas y sin postergar otro año más.",
  ],
  closing: "Hoy guía a líderes a salir del piloto automático y volver a dirigir su vida y su carrera con propósito.",
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

// Pasos posteriores (ruta visual con ícono + frase de apoyo).
export const steps: { icon: "eye" | "unlock" | "compass"; title: string; text: string }[] = [
  {
    icon: "eye",
    title: "Entiendes el patrón",
    text: "Ves la raíz, no solo los síntomas.",
  },
  {
    icon: "unlock",
    title: "Ves por primera vez qué está bloqueado",
    text: "Eso que llevabas años sin poder nombrar.",
  },
  {
    icon: "compass",
    title: "Sabes exactamente qué cambiar",
    text: "Y das el primer paso con claridad.",
  },
];

// Señales del bloque "problema" (tarjetas con ícono).
export const problems: { icon: "target" | "loop" | "clock"; title: string; text: string }[] = [
  { icon: "target", title: "Logra cosas", text: "Pero su vida personal está en pausa." },
  { icon: "loop", title: "Intenta motivarse", text: "Pero vuelve a lo de siempre." },
  { icon: "clock", title: "Sabe qué quiere cambiar", text: "Pero lo posterga año tras año." },
];

// Preguntas frecuentes.
export const faqs: { q: string; a: string }[] = [
  {
    q: "¿Qué pasa cuando escribo al WhatsApp?",
    a: "Luchy o su equipo responden en menos de 24 horas para conocer tu situación y ver si hay fit para trabajar juntos. Sin presión, sin discurso de ventas.",
  },
  {
    q: "¿Para quién es esto?",
    a: "Para ejecutivos, gerentes y dueños de negocio que funcionan bien en lo profesional pero sienten que algo no encaja. Personas que quieren claridad, no recetas genéricas.",
  },
  {
    q: "¿Cuánto cuesta trabajar con Luchy?",
    a: "Lo primero es una conversación exploratoria sin costo. Si hay fit, Luchy te explica las opciones. No hay precios fijos publicados porque cada proceso es distinto.",
  },
];
