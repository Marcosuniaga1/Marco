"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export function ExpandableCard({
  icon: Icon,
  title,
  summary,
  bgImage,
  children,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  summary: string;
  bgImage?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [open]);

  return (
    <div className="glass-card p-8 relative overflow-hidden">
      {bgImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <div className="absolute inset-0 bg-[#05060f]/80" />
        </>
      )}
      <div className="relative">
        <div className="icon-circle mb-4">
          <Icon className="w-[18px] h-[18px] text-frost" strokeWidth={1.5} />
        </div>
        <h3 className="font-display font-medium text-2xl leading-tight tracking-[-0.24px] text-ice mb-2">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-fog m-0 mb-4">{summary}</p>

        <div
          style={{
            maxHeight: open ? `${height}px` : "0px",
            overflow: "hidden",
            transition: "max-height 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          <div ref={contentRef} className="text-sm leading-relaxed text-mist pt-2 border-t border-glass-edge">
            {children}
          </div>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-frost uppercase tracking-wider hover:text-ice transition-colors cursor-pointer bg-transparent border-0 p-0"
        >
          {open ? "Ver menos" : "Ver más"}
          <ChevronDown
            className="w-3.5 h-3.5 transition-transform duration-300"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            strokeWidth={2}
          />
        </button>
      </div>
    </div>
  );
}
