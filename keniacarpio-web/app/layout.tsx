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
  title: "Kenia Carpio · Tarotista & Actriz",
  description:
    "Lectura de tarot, guía espiritual y trayectoria actoral. Sesiones presenciales y online. Conducción del programa Sal del Hueco.",
  keywords: [
    "Kenia Carpio",
    "tarotista",
    "actriz",
    "Sal del Hueco",
    "lectura de tarot",
    "Venezuela",
  ],
  openGraph: {
    title: "Kenia Carpio · Tarotista & Actriz",
    description:
      "Sesiones de tarot, programa Sal del Hueco y trayectoria actoral.",
    type: "website",
    locale: "es_VE",
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
