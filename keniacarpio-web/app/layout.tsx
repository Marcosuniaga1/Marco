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
  title: "Sal del Hueco · Kenia Carpio · Bien brutal. Bien bruja.",
  description:
    "Tarot, oráculos y rituales para autoconocimiento real. Lecturas honestas, kits energéticos coherentes y rituales con intención. No te saco del hueco — te acompaño a que tú salgas.",
  keywords: [
    "Sal del Hueco",
    "Kenia Carpio",
    "tarot",
    "tarotista",
    "rituales",
    "kits energéticos",
    "espiritualidad consciente",
    "lectura de tarot Venezuela",
    "tarot online",
    "bruja consciente",
  ],
  openGraph: {
    title: "Sal del Hueco · Bien brutal. Bien bruja.",
    description:
      "Tarot, rituales y kits energéticos. Espiritualidad real, sin poses.",
    type: "website",
    locale: "es_VE",
    siteName: "Sal del Hueco",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sal del Hueco · Bien brutal. Bien bruja.",
    description:
      "Tarot, rituales y kits energéticos con Kenia Carpio.",
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
