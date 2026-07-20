export type Testimonial = {
  initial: string;
  name: string;
  role: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    initial: "J",
    name: "Jessica",
    role: "Emprendedora digital",
    quote:
      "Antes le tenía pánico a la IA. Ahora la uso todos los días para crear mis publicaciones y mis ventas subieron muchísimo.",
  },
  {
    initial: "S",
    name: "Sofia",
    role: "Dueña de negocio local",
    quote:
      "En 20 minutos entendí más que en meses intentando sola. El sistema es súper simple y por fin publico con confianza.",
  },
  {
    initial: "A",
    name: "Ana",
    role: "Creadora de contenido",
    quote:
      "Mariale lo explica de una forma tan fácil que ya no tengo miedo de equivocarme. Hoy la IA es mi aliada, no mi enemiga.",
  },
];
