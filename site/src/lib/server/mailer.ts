import { createTransport, type SendMailOptions, type Transporter } from "nodemailer";
import { EVENT, SHOWS, type ShowId } from "@/lib/montreal";

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
  code: string;
  address: string;
  giftName: string;
  ticketImage: Buffer;
};

export function buildTicketEmail(m: TicketEmail, fromAddress: string): SendMailOptions {
  const show = SHOWS[m.show].label;
  const fromName = process.env.MAIL_FROM_NAME || "Venezuela se Levanta · Pedrito Leal";
  const agenda = m.giftName
    ? `Tu Agenda Esperanza 2027 será enviada a ${m.giftName}, a esta dirección: ${m.address}.`
    : `Pedrito Leal te entregará personalmente tu Agenda Esperanza 2027 en: ${m.address}.`;

  const text = [
    `Hola ${m.firstName},`,
    "",
    "¡Gracias por sumarte! Tu donación de $100 CAD fue recibida.",
    "",
    `Tu entrada es válida para 2 personas.`,
    `Función: ${show}`,
    `Fecha: ${EVENT.dateLabel}`,
    `Lugar: ${EVENT.venue}, ${EVENT.city}`,
    `Código de entrada: ${m.code}`,
    "",
    "Adjuntamos tu entrada como imagen. Guárdala en tu teléfono y preséntala en la puerta.",
    "",
    `Si ya la descargaste al terminar el pago, esta es una copia de respaldo: es la misma entrada. Su código (${m.code}) es único y vale para 2 personas, así que no necesitas hacer nada más.`,
    "",
    agenda,
    "",
    "Tu donación se convierte en ayuda para nuestra gente de La Guaira.",
    "Gracias, Montreal. Venezuela se levanta.",
  ].join("\n");

  const e = escapeHtml;
  const html = `<!doctype html><html lang="es"><body style="margin:0;padding:0;background:#f4f5f8;">
<div style="max-width:560px;margin:0 auto;padding:24px 16px;font-family:Arial,Helvetica,sans-serif;color:#1b1f2a;line-height:1.55;">
  <p style="font-size:16px;margin:0 0 12px;">Hola ${e(m.firstName)},</p>
  <p style="font-size:16px;margin:0 0 16px;">¡Gracias por sumarte! Tu donación de <strong>$100 CAD</strong> fue recibida. Esta es tu entrada, <strong>válida para 2 personas</strong>:</p>
  <img src="cid:entrada" alt="Entrada ${e(m.code)} · Función ${e(show)}" width="528" style="display:block;width:100%;max-width:528px;height:auto;border-radius:12px;margin:0 0 20px;" />
  <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:15px;margin:0 0 20px;">
    <tr><td style="padding:4px 0;color:#5b6475;width:150px;">Función</td><td style="padding:4px 0;font-weight:bold;">${e(show)}</td></tr>
    <tr><td style="padding:4px 0;color:#5b6475;">Fecha</td><td style="padding:4px 0;">${e(EVENT.dateLabel)}</td></tr>
    <tr><td style="padding:4px 0;color:#5b6475;">Lugar</td><td style="padding:4px 0;">${e(EVENT.venue)}, ${e(EVENT.city)}</td></tr>
    <tr><td style="padding:4px 0;color:#5b6475;">Código de entrada</td><td style="padding:4px 0;font-weight:bold;">${e(m.code)}</td></tr>
  </table>
  <p style="font-size:15px;margin:0 0 16px;">Guarda esta imagen en tu teléfono y preséntala en la puerta. También va adjunta a este correo.</p>
  <p style="font-size:15px;margin:0 0 16px;padding:12px 14px;background:#ffffff;border-radius:8px;">Si ya la descargaste al terminar el pago, esta es una <strong>copia de respaldo</strong>: es la misma entrada. Su código <strong>${e(m.code)}</strong> es único y vale para 2 personas, así que no necesitas hacer nada más.</p>
  <p style="font-size:15px;margin:0 0 24px;">${e(agenda)}</p>
  <p style="font-size:15px;margin:0;color:#5b6475;">Tu donación se convierte en ayuda para nuestra gente de La Guaira.<br>Gracias, Montreal. Venezuela se levanta.</p>
</div></body></html>`;

  return {
    from: { name: fromName, address: fromAddress },
    replyTo: process.env.MAIL_REPLY_TO || undefined,
    to: m.to,
    subject: `Tu entrada para Pedrito Leal en Montreal · Función ${show}`,
    text,
    html,
    attachments: [
      { filename: `entrada-${m.code}.jpg`, content: m.ticketImage, contentType: "image/jpeg", cid: "entrada" },
    ],
  };
}

export async function sendTicketEmail(m: TicketEmail): Promise<void> {
  const t = getTransport();
  if (!t) throw new Error("GMAIL_USER / GMAIL_APP_PASSWORD not configured");
  await t.sendMail(buildTicketEmail(m, process.env.GMAIL_USER!));
}
