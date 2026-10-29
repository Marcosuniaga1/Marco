export const EVENT = {
  title: "Montreal se levanta por La Guaira",
  venue: "Théâtre Sainte-Catherine",
  city: "Montreal",
  dateLabel: "Viernes 29 de enero de 2027",
  ticketDate: "29 ENE",
  ticketWeekday: "Viernes · 2027",
  priceCad: 100,
} as const;

// What a card checkout costs while the taquilla session (Pedro's PIN) is open, to test real payments cheaply.
export const TEST_PRICE_CAD = 1;

// Tickets per purchase; each ticket admits 2 people and takes one seat of the show's capacity.
export const MAX_TICKETS = 10;

export const AGENDA = {
  self: "Enviármela a mí",
  gift: "Regalarla a un familiar",
  none: "No quiero la agenda",
} as const;

export type AgendaChoice = keyof typeof AGENDA;

export const SHOWS = {
  "7pm": { label: "7:00 PM", sheetTab: "Show 7PM", capacityEnv: "MONTREAL_CAPACITY_7PM" },
  "9pm": { label: "9:00 PM", sheetTab: "Show 9PM", capacityEnv: "MONTREAL_CAPACITY_9PM" },
} as const;

export type ShowId = keyof typeof SHOWS;

export const TICKET_SIZE = { width: 1080, height: 1590 };

export const CASH_LINK_MESSAGES: Record<string, string> = {
  Usado: "Este enlace ya fue usado. Si ya te registraste, tu entrada está en tu correo.",
  Vencido: "Este enlace venció. Pídele a Pedrito uno nuevo.",
  Anulado: "Este enlace fue anulado. Pídele a Pedrito uno nuevo.",
  not_found: "Este enlace no existe. Revisa que esté completo o pídele a Pedrito uno nuevo.",
};

export type Registration = {
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string;
  address: string;
  show: ShowId;
  quantity: number;
  agenda: AgendaChoice;
  giftName: string;
};

export type FieldErrors = Partial<Record<keyof Registration, string>>;

const LIMITS = { firstName: 60, lastName: 60, email: 120, whatsapp: 25, address: 300, giftName: 120 };

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, max) : "";
}

export function isShowId(value: unknown): value is ShowId {
  return typeof value === "string" && value in SHOWS;
}

function isAgenda(value: unknown): value is AgendaChoice {
  return typeof value === "string" && value in AGENDA;
}

// Purchases made before the counter existed carry no quantity and a gift flag instead of an agenda choice.
function agendaFrom(input: Record<string, unknown>): AgendaChoice | "" {
  if (input.agenda !== undefined) return isAgenda(input.agenda) ? input.agenda : "";
  return input.gift === true || input.gift === "true" ? "gift" : "self";
}

export function ticketWord(n: number): string {
  return n === 1 ? "1 entrada" : `${n} entradas`;
}

export function onlyLeft(n: number): string {
  return `solo ${n === 1 ? "queda" : "quedan"} ${ticketWord(n)}`;
}

export function validateRegistration(
  raw: unknown,
): { ok: true; data: Registration } | { ok: false; errors: FieldErrors } {
  const input = (raw ?? {}) as Record<string, unknown>;
  const data: Registration = {
    firstName: text(input.firstName, LIMITS.firstName),
    lastName: text(input.lastName, LIMITS.lastName),
    email: text(input.email, LIMITS.email).toLowerCase(),
    whatsapp: text(input.whatsapp, LIMITS.whatsapp),
    address: text(input.address, LIMITS.address),
    show: isShowId(input.show) ? input.show : ("" as ShowId),
    quantity: input.quantity === undefined ? 1 : Number(input.quantity),
    agenda: agendaFrom(input) as AgendaChoice,
    giftName: "",
  };
  if (data.agenda === "gift") data.giftName = text(input.giftName, LIMITS.giftName);
  if (data.agenda === "none") data.address = "";

  const errors: FieldErrors = {};
  if (!data.firstName) errors.firstName = "Escribe tu nombre.";
  if (!data.lastName) errors.lastName = "Escribe tu apellido.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.email = "Revisa tu correo: ahí te llega la entrada.";
  if (!/^\+?[\d\s().-]{7,20}$/.test(data.whatsapp) || data.whatsapp.replace(/\D/g, "").length < 7)
    errors.whatsapp = "Escribe tu WhatsApp con código de país, por ejemplo +1 514 555 0123.";
  if (!isShowId(data.show)) errors.show = "Elige la función de las 7:00 PM o de las 9:00 PM.";
  if (!Number.isInteger(data.quantity) || data.quantity < 1 || data.quantity > MAX_TICKETS)
    errors.quantity = `Elige entre 1 y ${MAX_TICKETS} entradas.`;
  if (!isAgenda(data.agenda)) errors.agenda = "Elige qué hacemos con la agenda.";
  if (data.agenda !== "none" && data.address.length < 8) errors.address = "Escribe la dirección completa para entregar la agenda.";
  if (data.agenda === "gift" && !data.giftName) errors.giftName = "Escribe el nombre de quien recibe la agenda.";

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}

export function toMetadata(r: Registration): Record<string, string> {
  return {
    firstName: r.firstName,
    lastName: r.lastName,
    email: r.email,
    whatsapp: r.whatsapp,
    address: r.address,
    show: r.show,
    quantity: String(r.quantity),
    agenda: r.agenda,
    giftName: r.giftName,
  };
}

export function fromMetadata(meta: Record<string, string> | null | undefined) {
  return validateRegistration(meta ?? {});
}
