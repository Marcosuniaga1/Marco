import { createTransport, type SendMailOptions, type Transporter } from "nodemailer";
import { EVENT, SHOWS, ticketWord, type AgendaChoice, type ShowId } from "@/lib/montreal";
import { ticketFileName } from "./ticket-code";

let transport: Transporter | null = null;

function getTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  if (!user || !pass) return null;
  transport ??= createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
  return transport;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export type TicketEmail = {
  to: string;
  firstName: string;
  show: ShowId;
  codes: string[];
  totalCad: number;
  agenda: AgendaChoice;
  address: string;
  giftName: string;
  ticketImages: Buffer[];
};

function agendaLine(m: TicketEmail): string {
  const n = m.codes.length;
  const agendas = n === 1 ? "tu Agenda Esperanza 2027" : `tus ${n} Agendas Esperanza 2027`;
  if (m.agenda === "gift") return `${n === 1 ? "Tu Agenda Esperanza 2027 será enviada" : `Tus ${n} Agendas Esperanza 2027 serán enviadas`} a ${m.giftName}, a esta dirección: ${m.address}.`;
  if (m.agenda === "self") return `Pedrito Leal te entregará personalmente ${agendas} en: ${m.address}.`;
  return "";
}

const money = (cad: number) => `$${cad.toLocaleString("es-CA", { maximumFractionDigits: 2 })} CAD`;

export function buildTicketEmail(m: TicketEmail, fromAddress: string): SendMailOptions {
  const show = SHOWS[m.show].label;
  const fromName = process.env.MAIL_FROM_NAME || "Venezuela se Levanta · Pedrito Leal";
  const n = m.codes.length;
  const many = n > 1;
  const agenda = agendaLine(m);
  const files = m.codes.map((code, i) => ticketFileName(code, i + 1, n));
  const people = `${n * 2} personas`;

  const text = [
    `Hola ${m.firstName},`,
    "",
    `¡Gracias por sumarte! Tu donación de ${money(m.totalCad)} fue recibida.`,
    "",
    many ? `Tienes ${ticketWord(n)}, cada una válida para 2 personas (${people} en total).` : "Tu entrada es válida para 2 personas.",
    `Función: ${show}`,
    `Fecha: ${EVENT.dateLabel}`,
    `Lugar: ${EVENT.venue}, ${EVENT.city}`,
    many ? `Códigos de entrada:\n${m.codes.map((c, i) => `  ${i + 1}. ${c}`).join("\n")}` : `Código de entrada: ${m.codes[0]}`,
    "",
    many
      ? `Adjuntamos tus ${n} entradas, una imagen por entrada. Guárdalas en tu teléfono o reenvíalas a quienes van contigo: cada una se presenta en la puerta por separado.`
      : "Adjuntamos tu entrada como imagen. Guárdala en tu teléfono y preséntala en la puerta.",
    "",
    many
      ? "Si ya las descargaste al terminar, estas son copias de respaldo: son las mismas entradas. Cada código es único y vale para 2 personas."
      : `Si ya la descargaste al terminar, esta es una copia de respaldo: es la misma entrada. Su código (${m.codes[0]}) es único y vale para 2 personas, así que no necesitas hacer nada más.`,
    ...(agenda ? ["", agenda] : []),
    "",
    "Tu donación se convierte en ayuda para nuestra gente de La Guaira.",
    "Gracias, Montreal. Venezuela se levanta.",
  ].join("\n");

  const e = escapeHtml;
  const codeRows = m.codes
    .map((c, i) => `<tr><td style="padding:4px 0;color:#5b6475;width:150px;">${many ? `Entrada ${i + 1}` : "Código de entrada"}</td><td style="padding:4px 0;font-weight:bold;">${e(c)}</td></tr>`)
    .join("");
  const html = `<!doctype html><html lang="es"><body style="margin:0;padding:0;background:#f4f5f8;">
<div style="max-width:560px;margin:0 auto;padding:24px 16px;font-family:Arial,Helvetica,sans-serif;color:#1b1f2a;line-height:1.55;">
  <p style="font-size:16px;margin:0 0 12px;">Hola ${e(m.firstName)},</p>
  <p style="font-size:16px;margin:0 0 16px;">¡Gracias por sumarte! Tu donación de <strong>${e(money(m.totalCad))}</strong> fue recibida. ${
    many
      ? `Estas son tus <strong>${n} entradas</strong>, cada una <strong>válida para 2 personas</strong> (${people} en total). La primera va aquí abajo y todas van adjuntas:`
      : "Esta es tu entrada, <strong>válida para 2 personas</strong>:"
  }</p>
  <img src="cid:entrada" alt="Entrada ${e(m.codes[0])} · Función ${e(show)}" width="528" style="display:block;width:100%;max-width:528px;height:auto;border-radius:12px;margin:0 0 20px;" />
  <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:15px;margin:0 0 20px;">
    <tr><td style="padding:4px 0;color:#5b6475;width:150px;">Función</td><td style="padding:4px 0;font-weight:bold;">${e(show)}</td></tr>
    <tr><td style="padding:4px 0;color:#5b6475;">Fecha</td><td style="padding:4px 0;">${e(EVENT.dateLabel)}</td></tr>
    <tr><td style="padding:4px 0;color:#5b6475;">Lugar</td><td style="padding:4px 0;">${e(EVENT.venue)}, ${e(EVENT.city)}</td></tr>
    ${codeRows}
  </table>
  <p style="font-size:15px;margin:0 0 16px;">${
    many
      ? `Guarda las ${n} imágenes adjuntas en tu teléfono o reenvíalas a quienes van contigo: cada entrada se presenta en la puerta por separado.`
      : "Guarda esta imagen en tu teléfono y preséntala en la puerta. También va adjunta a este correo."
  }</p>
  <p style="font-size:15px;margin:0 0 16px;padding:12px 14px;background:#ffffff;border-radius:8px;">${
    many
      ? "Si ya las descargaste al terminar, estas son <strong>copias de respaldo</strong>: son las mismas entradas. Cada código es único y vale para 2 personas."
      : `Si ya la descargaste al terminar, esta es una <strong>copia de respaldo</strong>: es la misma entrada. Su código <strong>${e(m.codes[0])}</strong> es único y vale para 2 personas, así que no necesitas hacer nada más.`
  }</p>
  ${agenda ? `<p style="font-size:15px;margin:0 0 24px;">${e(agenda)}</p>` : ""}
  <p style="font-size:15px;margin:0;color:#5b6475;">Tu donación se convierte en ayuda para nuestra gente de La Guaira.<br>Gracias, Montreal. Venezuela se levanta.</p>
</div></body></html>`;

  return {
    from: { name: fromName, address: fromAddress },
    replyTo: process.env.MAIL_REPLY_TO || undefined,
    to: m.to,
    subject: many
      ? `Tus ${n} entradas para Pedrito Leal en Montreal · Función ${show}`
      : `Tu entrada para Pedrito Leal en Montreal · Función ${show}`,
    text,
    html,
    // The first image doubles as the inline preview; the rest arrive as regular attachments.
    attachments: m.ticketImages.map((content, i) => ({
      filename: files[i],
      content,
      contentType: "image/jpeg",
      ...(i === 0 ? { cid: "entrada" } : {}),
    })),
  };
}

export async function sendTicketEmail(m: TicketEmail): Promise<void> {
  const t = getTransport();
  if (!t) throw new Error("GMAIL_USER / GMAIL_APP_PASSWORD not configured");
  await t.sendMail(buildTicketEmail(m, process.env.GMAIL_USER!));
}
