import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta del diseño "landing-luchy"
        vinotinto: {
          DEFAULT: "#8B2F3F",
          dark: "#6E2330",
        },
        dorado: "#C4A050",
        crema: "#F5F1E8",
      },
      fontFamily: {
        sans: [
          "Segoe UI",
          "system-ui",
          "-apple-system",
          "Tahoma",
          "Geneva",
          "Verdana",
          "sans-serif",
        ],
      },
      boxShadow: {
        cta: "0 6px 20px rgba(196, 160, 80, 0.4)",
        "cta-hover": "0 8px 25px rgba(196, 160, 80, 0.6)",
        card: "0 6px 18px rgba(139, 47, 63, 0.08)",
        form: "0 8px 25px rgba(139, 47, 63, 0.1)",
        whatsapp: "0 6px 20px rgba(37, 211, 102, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
