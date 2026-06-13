import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vinotinto: {
          DEFAULT: "#8B2F3F",
          dark: "#6E2531",
          light: "#A8475A",
        },
        dorado: {
          DEFAULT: "#C4A050",
          light: "#D9C385",
          dark: "#A8853A",
        },
        crema: {
          DEFAULT: "#F5F1E8",
          dark: "#EAE3D3",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "vino-gradient":
          "linear-gradient(135deg, #8B2F3F 0%, #6E2531 100%)",
        "gold-shine":
          "linear-gradient(135deg, #C4A050 0%, #D9C385 50%, #C4A050 100%)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
