import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        violeta: {
          DEFAULT: "#3B1E5E",
          deep: "#2A1547",
          light: "#5A3387",
        },
        oro: {
          DEFAULT: "#D4AF37",
          light: "#E8C766",
          dark: "#A8862A",
        },
        noche: "#0E0A14",
        crema: "#F4ECD8",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "mystic-gradient":
          "radial-gradient(ellipse at top, #3B1E5E 0%, #1a0d2e 50%, #0E0A14 100%)",
        "gold-shine":
          "linear-gradient(135deg, #D4AF37 0%, #E8C766 50%, #A8862A 100%)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "float-slow": "float 6s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
