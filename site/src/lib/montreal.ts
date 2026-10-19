export const EVENT = {
  title: "Montreal se levanta por La Guaira",
  venue: "Théâtre Sainte-Catherine",
  city: "Montreal",
  dateLabel: "Viernes 29 de enero de 2027",
  ticketDate: "29 ENE",
  ticketWeekday: "Viernes · 2027",
  priceCad: 100,
} as const;

export const SHOWS = {
  "7pm": { label: "7:00 PM", sheetTab: "Show 7PM", capacityEnv: "MONTREAL_CAPACITY_7PM" },
  "9pm": { label: "9:00 PM", sheetTab: "Show 9PM", capacityEnv: "MONTREAL_CAPACITY_9PM" },
} as const;

export type ShowId = keyof typeof SHOWS;

export const TICKET_SIZE = { width: 1080, height: 1590 };

export type Registration = {
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string;
  address: string;
  show: ShowId;
  gift: boolean;
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
    gift: input.gift === true || input.gift === "true",
    giftName: "",
  };
  if (data.gift) data.giftName = text(input.giftName, LIMITS.giftName);

  const errors: FieldErrors = {};
  if (!data.firstName) errors.firstName = "Escribe tu nombre.";
  if (!data.lastName) errors.lastName = "Escribe tu apellido.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.email = "Revisa tu correo: ahí te llega la entrada.";
  if (!/^\+?[\d\s().-]{7,20}$/.test(data.whatsapp) || data.whatsapp.replace(/\D/g, "").length < 7)
    errors.whatsapp = "Escribe tu WhatsApp con código de país, por ejemplo +1 514 555 0123.";
  if (data.address.length < 8) errors.address = "Escribe la dirección completa para entregar la agenda.";
  if (!isShowId(data.show)) errors.show = "Elige la función de las 7:00 PM o de las 9:00 PM.";
  if (data.gift && !data.giftName) errors.giftName = "Escribe el nombre de quien recibe la agenda.";

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
    gift: r.gift ? "true" : "false",
    giftName: r.giftName,
  };
}

export function fromMetadata(meta: Record<string, string> | null | undefined) {
  return validateRegistration(meta ?? {});
}
