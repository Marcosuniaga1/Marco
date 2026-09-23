import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta oscura de la landing de Visión 360 / Marco Suniaga
        bgdark: "#0A0A0F",
        card: "#14141F",
        cardborder: "#232336",
        violeta: {
          DEFAULT: "#7C3AED",
          light: "#A78BFA",
          soft: "#2C1F4A",
        },
        whatsapp: "#25D366",
        muted: "#9CA3AF",
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        cta: "0 6px 24px rgba(124, 58, 237, 0.35)",
        "cta-hover": "0 8px 28px rgba(124, 58, 237, 0.5)",
        whatsapp: "0 6px 20px rgba(37, 211, 102, 0.35)",
        card: "0 4px 20px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
