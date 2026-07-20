// Configuración central del sitio. Cambia estos valores para reutilizar la landing.
export const site = {
  name: "Mariale Velazco",
  title: "Mariale Velazco - Aprende IA para tu negocio",
  description:
    "Aprende un sistema simple para usar la IA en tu negocio y publicar sin miedo.",
  whatsappNumber: "584125044476",
  whatsappMessage: "Hola Mariale, quiero aprender el sistema de IA",
  // YouTube video id del testimonio del hero
  youtubeId: "X2d7kd9a2mo",
  // Endpoint del formulario (Google Apps Script). Sustituye por tu propio endpoint.
  leadFormEndpoint:
    "https://script.google.com/macros/s/AKfycbyjxEL656pEc80eQakgxG3n88t2AF7fxvBLl_qXsAaFCseM3a1cPz_AxGw1HHtPw0A/exec",
  social: {
    instagram: "#",
    tiktok: "#",
    contact: "#",
  },
};

export const whatsappUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`;
