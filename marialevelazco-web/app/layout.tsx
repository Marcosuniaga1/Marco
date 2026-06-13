import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mariale Velazco · Mentora de IA para Emprendedoras",
  description:
    "Aprende a usar la Inteligencia Artificial para vender más, publicar con seguridad y hacer crecer tu negocio. Mentoría con Mariale Velazco.",
  keywords: [
    "Mariale Velazco",
    "mentora de IA",
    "IA para emprendedoras",
    "inteligencia artificial para negocios",
    "marketing con IA",
    "vender con IA",
  ],
  openGraph: {
    title: "Mariale Velazco · Mentora de IA para Emprendedoras",
    description:
      "Aprende un sistema simple para usar la IA y publicar con seguridad, sin miedo y sin complicaciones.",
    type: "website",
    locale: "es_VE",
    siteName: "Mariale Velazco",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
