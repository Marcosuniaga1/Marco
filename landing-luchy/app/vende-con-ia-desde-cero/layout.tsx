import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vende con IA desde Cero - Mariale Velazco",
  description:
    "Aprende a usar la Inteligencia Artificial para crear contenido que vende. Programa de 5 lecciones por solo $7 (oferta de lanzamiento).",
};

export default function VendeConIALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
