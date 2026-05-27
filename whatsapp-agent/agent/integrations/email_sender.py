"""
Email notifications — AgentKit
Configuración en .env:
  EMAIL_HOST=smtp.gmail.com
  EMAIL_PORT=587
  EMAIL_USER=tu@gmail.com
  EMAIL_PASSWORD=tu_app_password   # App Password de Gmail (no tu contraseña normal)
  EMAIL_FROM_NAME=Clínica MediVida
  EMAIL_NEGOCIO=negocio@gmail.com  # Recibe notificaciones internas

Requiere:
  pip install aiosmtplib
"""

import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

# ── Configuración desde .env ──────────────────────────────────────────────────

EMAIL_HOST      = os.getenv("EMAIL_HOST", "smtp.gmail.com")
EMAIL_PORT      = int(os.getenv("EMAIL_PORT", "587"))
EMAIL_USER      = os.getenv("EMAIL_USER", "")
EMAIL_PASSWORD  = os.getenv("EMAIL_PASSWORD", "")
EMAIL_FROM_NAME = os.getenv("EMAIL_FROM_NAME", "AgentKit")
EMAIL_NEGOCIO   = os.getenv("EMAIL_NEGOCIO", "")

# ── Colores de marca ──────────────────────────────────────────────────────────

COLOR_PRIMARY   = "#128C7E"   # verde WhatsApp
COLOR_SECONDARY = "#075E54"
COLOR_LIGHT     = "#f0faf9"


def _esta_configurado() -> bool:
    """Devuelve True solo si hay credenciales SMTP configuradas."""
    if not EMAIL_USER or not EMAIL_PASSWORD:
        logger.warning(
            "Email no configurado. Define EMAIL_USER y EMAIL_PASSWORD en .env "
            "para activar notificaciones por correo."
        )
        return False
    return True


# ── Templates HTML ────────────────────────────────────────────────────────────

def _html_base(titulo: str, cuerpo: str, color: str = COLOR_PRIMARY) -> str:
    return f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{titulo}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:30px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
               style="background:#ffffff;border-radius:12px;overflow:hidden;
                      box-shadow:0 4px 20px rgba(0,0,0,0.08);max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:{color};padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;
                         letter-spacing:-0.5px;">{EMAIL_FROM_NAME}</h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">{titulo}</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              {cuerpo}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f8f9fa;padding:20px 40px;text-align:center;
                       border-top:1px solid #e9ecef;">
              <p style="margin:0;color:#adb5bd;font-size:12px;line-height:1.6;">
                Este correo fue generado automáticamente por AgentKit.<br>
                {datetime.now().strftime("%d/%m/%Y %H:%M")} &nbsp;·&nbsp;
                <a href="#" style="color:{color};text-decoration:none;">Soporte</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>"""


def _row(etiqueta: str, valor: str) -> str:
    return f"""
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;width:140px;
                 font-weight:600;color:#495057;font-size:14px;vertical-align:top;">{etiqueta}</td>
      <td style="padding:8px 0 8px 16px;border-bottom:1px solid #f0f0f0;
                 color:#212529;font-size:14px;">{valor}</td>
    </tr>"""


def _caja_exito(texto: str) -> str:
    return f"""
    <div style="background:{COLOR_LIGHT};border-left:4px solid {COLOR_PRIMARY};
                padding:16px 20px;border-radius:0 8px 8px 0;margin-bottom:24px;">
      <p style="margin:0;color:{COLOR_SECONDARY};font-weight:600;font-size:15px;">{texto}</p>
    </div>"""


# ── Función interna de envío ──────────────────────────────────────────────────

async def _enviar(destinatario: str, asunto: str, html: str, texto_plano: str) -> bool:
    """
    Envía un email MIME multipart. Devuelve True si tuvo éxito, False en cualquier error.
    Nunca lanza excepción: falla silenciosamente con log de error.
    """
    if not _esta_configurado():
        return False

    mensaje = MIMEMultipart("alternative")
    mensaje["Subject"] = asunto
    mensaje["From"]    = f"{EMAIL_FROM_NAME} <{EMAIL_USER}>"
    mensaje["To"]      = destinatario

    mensaje.attach(MIMEText(texto_plano, "plain", "utf-8"))
    mensaje.attach(MIMEText(html, "html", "utf-8"))

    try:
        await aiosmtplib.send(
            mensaje,
            hostname=EMAIL_HOST,
            port=EMAIL_PORT,
            start_tls=True,
            username=EMAIL_USER,
            password=EMAIL_PASSWORD,
        )
        logger.info("Email enviado a %s — %s", destinatario, asunto)
        return True
    except aiosmtplib.SMTPException as exc:
        logger.error("Error SMTP al enviar email a %s: %s", destinatario, exc)
        return False
    except Exception as exc:
        logger.error("Error inesperado en email_sender._enviar: %s", exc)
        return False


# ── API pública ───────────────────────────────────────────────────────────────

async def enviar_confirmacion_cita(
    email_cliente: str,
    nombre: str,
    especialidad: str,
    fecha: str,
    doctor: str,
    precio: str,
) -> bool:
    """
    Envía al paciente la confirmación de su cita médica con todos los detalles.
    Devuelve True si el email se envió correctamente.
    """
    asunto = f"✅ Cita confirmada — {especialidad} | {EMAIL_FROM_NAME}"

    cuerpo = f"""
    {_caja_exito(f"¡Tu cita está confirmada, {nombre}!")}
    <p style="color:#495057;font-size:15px;margin:0 0 24px;line-height:1.6;">
      Aquí tienes el resumen de tu cita. Guarda este correo para referencia.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0"
           style="border:1px solid #e9ecef;border-radius:8px;overflow:hidden;margin-bottom:28px;">
      <tr><td style="padding:16px 20px;background:#f8f9fa;">
        <table width="100%" cellpadding="0" cellspacing="0">
          {_row("Paciente:", nombre)}
          {_row("Especialidad:", especialidad)}
          {_row("Médico:", doctor)}
          {_row("Fecha y hora:", fecha)}
          {_row("Costo:", precio)}
        </table>
      </td></tr>
    </table>
    <p style="color:#495057;font-size:14px;line-height:1.7;margin:0 0 8px;">
      <strong>Recuerda:</strong>
    </p>
    <ul style="color:#6c757d;font-size:14px;line-height:2;margin:0 0 24px;padding-left:20px;">
      <li>Llega 10 minutos antes de tu cita.</li>
      <li>Si necesitas cancelar, avísanos con al menos 3 horas de anticipación.</li>
      <li>Trae tu identificación oficial.</li>
    </ul>
    <p style="color:#6c757d;font-size:13px;margin:0;">
      ¿Tienes alguna duda? Escríbenos por WhatsApp o llámanos directamente.
    </p>
    """

    texto = (
        f"Cita confirmada — {EMAIL_FROM_NAME}\n\n"
        f"Hola {nombre},\n"
        f"Tu cita de {especialidad} está confirmada.\n\n"
        f"Médico: {doctor}\n"
        f"Fecha:  {fecha}\n"
        f"Costo:  {precio}\n\n"
        f"Recuerda llegar 10 minutos antes.\n"
        f"Para cancelar avisa con 3 horas de anticipación.\n"
    )

    return await _enviar(email_cliente, asunto, _html_base(asunto, cuerpo), texto)


async def enviar_confirmacion_pedido(
    email_cliente: str,
    nombre: str,
    items: str,
    direccion: str,
    total_estimado: str,
) -> bool:
    """
    Envía al cliente la confirmación de su pedido de delivery.
    Devuelve True si el email se envió correctamente.
    """
    asunto = f"🛵 Pedido recibido — {EMAIL_FROM_NAME}"
    color  = "#B71C1C"   # rojo El Criollo

    cuerpo = f"""
    {_caja_exito(f"¡Tu pedido está en camino, {nombre}!")}
    <p style="color:#495057;font-size:15px;margin:0 0 24px;line-height:1.6;">
      Recibimos tu pedido. El equipo ya está preparándolo.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0"
           style="border:1px solid #e9ecef;border-radius:8px;overflow:hidden;margin-bottom:28px;">
      <tr><td style="padding:16px 20px;background:#f8f9fa;">
        <table width="100%" cellpadding="0" cellspacing="0">
          {_row("Pedido:", items)}
          {_row("Entrega en:", direccion)}
          {_row("Total estimado:", total_estimado)}
          {_row("Tiempo estimado:", "30–45 minutos")}
        </table>
      </td></tr>
    </table>
    <p style="color:#6c757d;font-size:14px;margin:0 0 4px;">
      Te contactaremos al momento de la entrega. 🍽️
    </p>
    """

    texto = (
        f"Pedido recibido — {EMAIL_FROM_NAME}\n\n"
        f"Hola {nombre},\n"
        f"Tu pedido está en camino.\n\n"
        f"Items: {items}\n"
        f"Dirección: {direccion}\n"
        f"Total: {total_estimado}\n"
        f"Tiempo estimado: 30–45 minutos\n"
    )

    return await _enviar(
        email_cliente, asunto,
        _html_base(asunto, cuerpo, color),
        texto,
    )


async def notificar_negocio(asunto: str, cuerpo_html: str) -> bool:
    """
    Envía una notificación interna al email del negocio (EMAIL_NEGOCIO).
    Útil para alertar sobre nuevas citas, leads calientes, pedidos urgentes, etc.
    Devuelve True si se envió correctamente.
    """
    if not EMAIL_NEGOCIO:
        logger.debug("EMAIL_NEGOCIO no configurado — notificación interna omitida.")
        return False

    texto_plano = (
        f"Notificación interna — {EMAIL_FROM_NAME}\n\n"
        f"{asunto}\n\n"
        "Revisa el panel de administración para más detalles.\n"
    )

    cuerpo_completo = f"""
    <div style="background:#fff3cd;border-left:4px solid #ffc107;
                padding:16px 20px;border-radius:0 8px 8px 0;margin-bottom:24px;">
      <p style="margin:0;color:#856404;font-weight:600;font-size:15px;">
        🔔 Notificación Interna
      </p>
    </div>
    <div style="color:#495057;font-size:14px;line-height:1.7;">
      {cuerpo_html}
    </div>
    <p style="color:#adb5bd;font-size:12px;margin:24px 0 0;">
      Generado automáticamente por AgentKit · {datetime.now().strftime("%d/%m/%Y %H:%M")}
    </p>
    """

    return await _enviar(
        EMAIL_NEGOCIO,
        f"[AgentKit] {asunto}",
        _html_base(asunto, cuerpo_completo, "#ffc107"),
        texto_plano,
    )
