import { whatsappUrl } from "@/lib/site";

export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-bold text-white shadow-whatsapp transition-transform hover:-translate-y-0.5"
    >
      💬 Escríbeme
    </a>
  );
}
