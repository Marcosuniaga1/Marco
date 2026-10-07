"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";

export function SponsorModal({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        aria-label="Cerrar"
      >
        <X className="w-5 h-5" />
      </button>
      <div
        className="relative max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={1600}
          className="w-auto h-auto max-w-full max-h-[85vh] rounded-xl object-contain"
          priority
        />
      </div>
    </div>
  );
}

export function useSponsorModal() {
  const [modal, setModal] = useState<{ src: string; alt: string } | null>(null);

  const open = useCallback((src: string, alt: string) => {
    setModal({ src, alt });
  }, []);

  const close = useCallback(() => {
    setModal(null);
  }, []);

  return { modal, open, close };
}
