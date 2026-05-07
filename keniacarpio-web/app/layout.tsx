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
  title: "Kenia Carpio · Sal del Hueco · Tarotista en Caracas, Venezuela",
  description:
    "Tarotista en Caracas, Venezuela. Kenia Carpio - SAL DEL HUECO. Lectura de tarot sin filtro, real y sin poses. Online y presencial.",
  keywords: [
    "tarotista Caracas",
    "tarotista Venezuela",
    "Kenia Carpio",
    "Sal del Hueco",
    "lectura de tarot",
    "tarot online",
    "tarot presencial",
    "lectura de tarot Caracas",
    "rituales",
    "kits energéticos",
    "carta astral",
    "péndulo",
    "oráculo de los ángeles",
    "espiritualidad consciente",
    "bruja consciente",
  ],
  openGraph: {
    title: "Kenia Carpio · Sal del Hueco · Tarotista en Caracas, Venezuela",
    description:
      "Lectura de tarot sin filtro, real y sin poses. Online y presencial. Tarot, oráculos y rituales con Kenia Carpio.",
    type: "website",
    locale: "es_VE",
    siteName: "Sal del Hueco",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenia Carpio · Sal del Hueco · Tarotista en Caracas",
    description:
      "Lectura de tarot sin filtro, real y sin poses. Online y presencial.",
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
