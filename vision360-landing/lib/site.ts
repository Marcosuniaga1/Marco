// Configuración central del sitio. Reemplaza estos valores con tus datos reales.
export const site = {
  name: "Marco Suniaga",
  title: "Marco Suniaga — Aprende Marketing Digital con Visión 360",
  description:
    "Formación real en marketing digital, redes sociales, embudos de venta y emprendimiento. Un pago único de acceso, sin promesas mágicas.",

  whatsappNumber: "584129991787",
  whatsappMessage: "Hola Marco, vi el video y quiero saber más de Visión 360",

  // TODO: reemplaza por el ID del video de YouTube con tu carta de venta (VSL).
  // Si el video es privado/no listado, asegúrate de que permita reproducción embebida.
  youtubeId: "REEMPLAZA_TU_VIDEO_ID",

  social: {
    instagram: "#",
    tiktok: "#",
  },
};

export const whatsappUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`;
