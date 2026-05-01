"use client";

import { useState, useEffect, useRef } from "react";

const WHATSAPP_NUMBER = "584241054059";

type ContextOption = {
  label: string;
  fragment: string;
};

type Service = {
  id: string;
  label: string;
  icon: string;
  desc: string;
  message: string;
  contextQuestion?: string;
  contextOptions?: ContextOption[];
};

const SERVICES: Service[] = [
  {
    id: "lectura-tarot",
    label: "Lectura de Tarot",
    icon: "✦",
    desc: "Lectura honesta sobre tu momento.",
    message: "Quiero agendar una lectura de Tarot.",
    contextQuestion: "¿Qué quieres descubrir especialmente?",
    contextOptions: [
      { label: "Mi momento actual y lo que viene", fragment: "Quiero entender mi momento actual y lo que viene." },
      { label: "Una decisión específica", fragment: "Tengo una decisión específica que necesito clarificar." },
      { label: "Un patrón que se repite", fragment: "Hay un patrón en mi vida que se repite y quiero entender." },
      { label: "Cerrar / sanar un ciclo", fragment: "Estoy en un proceso de cerrar o sanar un ciclo." },
      { label: "Otro tema", fragment: "Tengo otro tema específico para conversar." },
    ],
  },
  {
    id: "mensaje-oracular",
    label: "Mensaje oracular",
    icon: "☾",
    desc: "Pregunta concreta, respuesta directa.",
    message: "Quiero un mensaje oracular express.",
    contextQuestion: "¿Sobre qué área es tu pregunta?",
    contextOptions: [
      { label: "Amor / vínculos", fragment: "Mi pregunta es sobre amor o vínculos." },
      { label: "Trabajo / dinero", fragment: "Mi pregunta es sobre trabajo o dinero." },
      { label: "Familia / hogar", fragment: "Mi pregunta es sobre familia o hogar." },
      { label: "Espiritual / propósito", fragment: "Mi pregunta es sobre lo espiritual o mi propósito." },
      { label: "Otra área", fragment: "Mi pregunta es sobre otra área." },
    ],
  },
  {
    id: "kit-energetico",
    label: "Kit energético",
    icon: "❋",
    desc: "Limpieza, amor o abundancia.",
    message: "Me interesa un kit energético.",
    contextQuestion: "¿Cuál es tu intención principal?",
    contextOptions: [
      { label: "Limpieza energética", fragment: "Quiero un kit de limpieza energética." },
      { label: "Atraer amor", fragment: "Quiero un kit para atraer amor." },
      { label: "Abundancia / prosperidad", fragment: "Quiero un kit para abundancia y prosperidad." },
      { label: "Protección", fragment: "Quiero un kit de protección." },
      { label: "Otra intención", fragment: "Tengo otra intención específica para el kit." },
    ],
  },
  {
    id: "ritual",
    label: "Ritual personalizado",
    icon: "✺",
    desc: "Diseñado a tu medida.",
    message: "Me gustaría un ritual personalizado.",
    contextQuestion: "¿Qué proceso estás atravesando?",
    contextOptions: [
      { label: "Cerrar un ciclo", fragment: "Necesito cerrar un ciclo." },
      { label: "Soltar a alguien o algo", fragment: "Necesito soltar a alguien o algo." },
      { label: "Abrir un camino nuevo", fragment: "Quiero abrir un camino nuevo." },
      { label: "Sanar una herida", fragment: "Quiero sanar una herida específica." },
      { label: "Otro proceso", fragment: "Estoy atravesando otro proceso." },
    ],
  },
  {
    id: "evento",
    label: "Show / Evento",
    icon: "🎉",
    desc: "Cumpleaños, despedidas, eventos especiales.",
    message: "Quiero contratar tarot para un evento.",
    contextQuestion: "¿Qué tipo de evento es?",
    contextOptions: [
      { label: "Cumpleaños", fragment: "Es un cumpleaños." },
      { label: "Despedida de soltera", fragment: "Es una despedida de soltera." },
      { label: "Halloween", fragment: "Es un evento de Halloween." },
      { label: "Celebración lunar / efeméride", fragment: "Es una celebración lunar o efeméride especial." },
      { label: "Otro tipo de evento", fragment: "Es otro tipo de evento." },
    ],
  },
  {
    id: "otro",
    label: "Otra consulta",
    icon: "✧",
    desc: "Algo más que quieras saber.",
    message: "Tengo una consulta sobre tus servicios.",
  },
];

// TODO: reemplazar con datos reales de pago de Kenia
const PAYMENTS = [
  {
    id: "zelle",
    label: "Zelle",
    detail: "Email: pendiente_de_completar@email.com",
    note: "Internacional · USD",
  },
  {
    id: "pago-movil",
    label: "Pago Móvil",
    detail: "Banco · Cédula · Teléfono (pendiente)",
    note: "Venezuela · Bs",
  },
  {
    id: "western",
    label: "Western Union",
    detail: "Beneficiario y país (pendiente)",
    note: "Internacional",
  },
];

type Step = "intro" | "service" | "context" | "name" | "payment" | "handoff";

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("intro");
  const [service, setService] = useState<Service | null>(null);
  const [context, setContext] = useState<ContextOption | null>(null);
  const [name, setName] = useState("");
  const [unread, setUnread] = useState(true);
  const dialogRef = useRef<HTMLDivElement>(null);

  const openChat = () => {
    setOpen(true);
    setUnread(false);
  };

  // ESC closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const reset = () => {
    setStep("intro");
    setService(null);
    setContext(null);
    setName("");
  };

  const close = () => {
    setOpen(false);
    setTimeout(reset, 300);
  };

  const pickService = (s: Service) => {
    setService(s);
    setContext(null);
    setStep(s.contextOptions ? "context" : "name");
  };

  const pickContext = (c: ContextOption) => {
    setContext(c);
    setStep("name");
  };

  const buildWhatsappLink = () => {
    const greeting = name ? `Hola Kenia, soy ${name}.` : "Hola Kenia.";
    const base = service?.message ?? "Quiero más información.";
    const ctx = context ? ` ${context.fragment}` : "";
    const text = `${greeting} ${base}${ctx}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={openChat}
        aria-label="Abrir chat"
        className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold-shine shadow-lg shadow-oro/40 transition-all hover:scale-110 hover:shadow-oro/60 sm:bottom-[12.5rem]"
        style={{ display: open ? "none" : "flex" }}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7 fill-noche"
          aria-hidden
        >
          <path d="M12 2C6.48 2 2 6.05 2 11c0 2.4 1.05 4.6 2.78 6.22L4 22l4.93-1.6C10.18 20.78 11.07 21 12 21c5.52 0 10-4.05 10-9s-4.48-10-10-10zm-1 13H8v-2h3v2zm5 0h-3v-2h3v2zm0-4H8V9h8v2z" />
        </svg>
        {unread && (
          <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 ring-2 ring-noche animate-twinkle" />
        )}
        <span className="absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-noche/90 px-3 py-1 text-xs text-crema backdrop-blur-sm group-hover:block border border-oro/20">
          ¿Te ayudo?
        </span>
      </button>

      {/* Dialog overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-end bg-noche/60 backdrop-blur-sm sm:items-end sm:p-6"
          onClick={close}
        >
          <div
            ref={dialogRef}
            className="relative w-full max-w-md flex flex-col h-[85vh] sm:h-[640px] bg-noche border border-oro/30 sm:rounded-3xl shadow-2xl shadow-violeta/40 animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <header className="flex items-center justify-between gap-3 border-b border-oro/20 px-5 py-4 bg-mystic-gradient sm:rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-shine text-xl text-noche">
                  ✦
                </div>
                <div>
                  <p className="font-serif text-crema text-lg leading-tight">
                    Sal del Hueco
                  </p>
                  <p className="text-xs text-oro/80 uppercase tracking-widest">
                    En línea
                  </p>
                </div>
              </div>
              <button
                onClick={close}
                aria-label="Cerrar chat"
                className="flex h-8 w-8 items-center justify-center rounded-full text-crema/70 hover:bg-oro/10 hover:text-oro transition-colors"
              >
                ✕
              </button>
            </header>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-3 bg-noche">
              {/* INTRO */}
              {step === "intro" && (
                <>
                  <Bubble>
                    Hola, soy Kenia. <span className="gold-text">Bienvenida</span>{" "}
                    a Sal del Hueco. ¿En qué te puedo acompañar?
                  </Bubble>
                  <Bubble delay={400}>
                    Cuéntame qué buscas y te llevo al sitio correcto.
                  </Bubble>
                  <div className="pt-2">
                    <button
                      onClick={() => setStep("service")}
                      className="btn-primary w-full"
                    >
                      Empezar
                    </button>
                  </div>
                </>
              )}

              {/* SERVICE */}
              {step === "service" && (
                <>
                  <Bubble>¿Qué te interesa?</Bubble>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {SERVICES.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => pickService(s)}
                        className="rounded-2xl border border-oro/25 bg-violeta-deep/40 p-3 text-left transition-all hover:border-oro/60 hover:bg-violeta-deep/70"
                      >
                        <span className="text-2xl block mb-1">{s.icon}</span>
                        <p className="font-serif text-crema text-sm leading-tight">
                          {s.label}
                        </p>
                        <p className="text-[10px] text-crema/60 mt-1 leading-tight">
                          {s.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* CONTEXT (per-service follow-up) */}
              {step === "context" && service?.contextOptions && (
                <>
                  <Bubble>
                    Genial — <span className="text-oro">{service.label}</span>.
                  </Bubble>
                  <Bubble delay={300}>{service.contextQuestion}</Bubble>
                  <div className="space-y-2 pt-2">
                    {service.contextOptions.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => pickContext(opt)}
                        className="w-full rounded-2xl border border-oro/25 bg-violeta-deep/40 p-3 text-left transition-all hover:border-oro/60 hover:bg-violeta-deep/70"
                      >
                        <p className="text-sm text-crema">{opt.label}</p>
                      </button>
                    ))}
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => setStep("service")}
                      className="btn-outline w-full text-sm"
                    >
                      ← Cambiar servicio
                    </button>
                  </div>
                </>
              )}

              {/* NAME */}
              {step === "name" && service && (
                <>
                  <Bubble>
                    Para personalizar el mensaje, ¿cómo te llamas?
                  </Bubble>
                  <div className="pt-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre (opcional)"
                      className="w-full rounded-full border border-oro/30 bg-violeta-deep/50 px-5 py-3 text-crema placeholder:text-crema/40 focus:border-oro focus:outline-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") setStep("payment");
                      }}
                    />
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() =>
                          setStep(service.contextOptions ? "context" : "service")
                        }
                        className="btn-outline flex-1 text-sm"
                      >
                        ← Atrás
                      </button>
                      <button
                        onClick={() => setStep("payment")}
                        className="btn-primary flex-1 text-sm"
                      >
                        Siguiente →
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* PAYMENT */}
              {step === "payment" && (
                <>
                  <Bubble>
                    Antes de coordinar por WhatsApp, te dejo los métodos de pago
                    disponibles para que tengas la info a mano:
                  </Bubble>
                  <div className="space-y-2 pt-2">
                    {PAYMENTS.map((p) => (
                      <div
                        key={p.id}
                        className="rounded-2xl border border-oro/25 bg-violeta-deep/40 p-4"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-serif text-crema text-base">
                            {p.label}
                          </p>
                          <span className="text-[10px] uppercase tracking-widest text-oro/70">
                            {p.note}
                          </span>
                        </div>
                        <p className="text-xs text-crema/70 leading-relaxed">
                          {p.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Bubble delay={400}>
                    <span className="text-oro">
                      No pagues nada todavía
                    </span>
                    . Coordinamos primero por WhatsApp y ahí confirmamos el
                    monto exacto según tu servicio.
                  </Bubble>
                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => setStep("name")}
                      className="btn-outline flex-1 text-sm"
                    >
                      ← Atrás
                    </button>
                    <button
                      onClick={() => setStep("handoff")}
                      className="btn-primary flex-1 text-sm"
                    >
                      Continuar →
                    </button>
                  </div>
                </>
              )}

              {/* HANDOFF */}
              {step === "handoff" && service && (
                <>
                  <Bubble>
                    Listo{name ? `, ${name}` : ""}. Vamos a coordinar tu{" "}
                    <span className="text-oro">{service.label.toLowerCase()}</span>{" "}
                    por WhatsApp — ahí te respondo personalmente.
                  </Bubble>
                  {context && (
                    <Bubble delay={200}>
                      Le adelanté a Kenia que te interesa especialmente:{" "}
                      <span className="text-oro">{context.label.toLowerCase()}</span>.
                    </Bubble>
                  )}
                  <Bubble delay={500}>
                    Voy a abrir WhatsApp con un mensaje precargado. Solo dale{" "}
                    <span className="text-oro">enviar</span>.
                  </Bubble>
                  <div className="pt-2 space-y-2">
                    <a
                      href={buildWhatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setTimeout(close, 500)}
                      className="btn-primary w-full"
                    >
                      Abrir WhatsApp
                    </a>
                    <button
                      onClick={reset}
                      className="btn-outline w-full text-sm"
                    >
                      Empezar de nuevo
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <footer className="border-t border-oro/15 bg-noche/80 px-5 py-3">
              <p className="text-[10px] text-center text-crema/50 uppercase tracking-widest">
                Sal del Hueco · Bien brutal, bien bruja
              </p>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}

function Bubble({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      className="max-w-[85%] rounded-2xl rounded-bl-sm bg-violeta-deep/60 border border-oro/15 px-4 py-3 text-sm text-crema leading-relaxed animate-fade-in-up"
      style={{ animationDelay: `${delay}ms`, opacity: delay ? 0 : undefined }}
    >
      {children}
    </div>
  );
}
