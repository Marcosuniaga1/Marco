import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Pedro Leal | Actor · Cantante · Comediante · Productor",
  description:
    "Pedro Leal — Actor, cantante, comediante, productor y animador. Gira VENEZUELA SE LEVANTA stand up comedy por Latinoamérica, Canadá y Estados Unidos.",
  openGraph: {
    title: "Pedro Leal | Actor · Cantante · Comediante · Productor",
    description:
      "Gira VENEZUELA SE LEVANTA stand up comedy. Fechas en Colombia, Guatemala, Chile, Canadá, Rep. Dominicana, Argentina, Uruguay, México, USA y Venezuela.",
    type: "website",
    locale: "es_VE",
    url: "https://pedritoleal.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pedro Leal | Actor · Cantante · Comediante · Productor",
    description:
      "Gira VENEZUELA SE LEVANTA stand up comedy por toda Latinoamérica.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
