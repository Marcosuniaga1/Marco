import type { NextConfig } from "next";

const checkoutReady = [
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "GMAIL_USER",
  "GMAIL_APP_PASSWORD",
  "SHEET_WEBHOOK_URL",
  "SHEET_WEBHOOK_SECRET",
].every((name) => Boolean(process.env[name]));

const nextConfig: NextConfig = {
  // Until every credential is set in Vercel, /montreal keeps the WhatsApp button instead of the checkout form.
  env: { MONTREAL_CHECKOUT_READY: checkoutReady ? "1" : "" },
  outputFileTracingIncludes: {
    "/api/montreal/webhook": ["./src/assets/fonts/*.ttf", "./public/images/MontrealNuevoDef.jpg"],
    "/api/montreal/ticket": ["./src/assets/fonts/*.ttf", "./public/images/MontrealNuevoDef.jpg"],
  },
};

export default nextConfig;
