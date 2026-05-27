"""
Google Calendar — AgentKit
Crea eventos automáticamente cuando se confirma una cita.

Configuración en .env:
  GOOGLE_CALENDAR_CREDENTIALS=path/to/credentials.json
  GOOGLE_CALENDAR_ID=primary  # o el ID del calendario del negocio

Requiere:
  pip install google-api-python-client google-auth
"""

import os
import logging
import re
from datetime import datetime, timedelta
from typing import Optional

logger = logging.getLogger(__name__)

CREDENTIALS_PATH = os.getenv("GOOGLE_CALENDAR_CREDENTIALS", "")
CALENDAR_ID      = os.getenv("GOOGLE_CALENDAR_ID", "primary")

# ── Cache del servicio ────────────────────────────────────────────────────────

_service_cache: Optional[object] = None   # googleapiclient.discovery.Resource


def _esta_configurado() -> bool:
    """Devuelve True solo si el archivo de credenciales está configurado y existe."""
    if not CREDENTIALS_PATH:
        logger.warning(
            "Google Calendar no configurado. Define GOOGLE_CALENDAR_CREDENTIALS en .env "
            "para crear eventos automáticamente."
        )
        return False
    if not os.path.isfile(CREDENTIALS_PATH):
        logger.warning(
            "Archivo de credenciales de Calendar no encontrado: %s", CREDENTIALS_PATH
        )
        return False
    return True


def _get_service():
    """
    Construye y cachea el cliente de Google Calendar API.
    Retorna None si hay cualquier problema.
    """
    global _service_cache

    if _service_cache is not None:
        return _service_cache

    if not _esta_configurado():
        return None

    try:
        from googleapiclient.discovery import build
        from google.oauth2.service_account import Credentials

        scopes = ["https://www.googleapis.com/auth/calendar"]
        creds  = Credentials.from_service_account_file(CREDENTIALS_PATH, scopes=scopes)
        _service_cache = build("calendar", "v3", credentials=creds)
        logger.info("Cliente de Google Calendar inicializado.")
        return _service_cache

    except Exception as exc:
        logger.error("Error al inicializar Google Calendar: %s", exc)
        _service_cache = None
        return None


# ── Parser de fecha natural en español ───────────────────────────────────────

_DIAS_MAP = {
    "lunes": 0, "martes": 1, "miércoles": 2, "miercoles": 2,
    "jueves": 3, "viernes": 4, "sábado": 5, "sabado": 5, "domingo": 6,
}

_MESES_MAP = {
    "enero": 1, "febrero": 2, "marzo": 3, "abril": 4,
    "mayo": 5, "junio": 6, "julio": 7, "agosto": 8,
    "septiembre": 9, "octubre": 10, "noviembre": 11, "diciembre": 12,
}


def _parsear_fecha(fecha_str: str) -> Optional[datetime]:
    """
    Convierte texto en español a un objeto datetime.

    Formatos soportados:
      - "viernes a las 3pm"
      - "mañana a las 8pm"
      - "hoy a las 10am"
      - "martes 15/01 a las 2pm"
      - "15/01/2025 10:00"
      - "2025-01-15 10:00"
      - Hora sola: "10am", "3:30pm" (se asume hoy)

    Retorna None si no puede parsear.
    """
    texto = fecha_str.lower().strip()
    ahora = datetime.now()

    # ── 1. Formatos ISO / numéricos ───────────────────────────────────────────
    for fmt in ("%Y-%m-%d %H:%M", "%d/%m/%Y %H:%M", "%d/%m/%Y"):
        try:
            dt = datetime.strptime(texto, fmt)
            if dt.hour == 0 and dt.minute == 0:
                dt = dt.replace(hour=9)   # asumir 9am si no hay hora
            return dt
        except ValueError:
            pass

    # ── 2. Extraer hora (12h o 24h) ────────────────────────────────────────────
    hora_dt: Optional[datetime] = None

    # Patrón 12h: "3pm", "3:30pm", "10am", "10:30am"
    m_12h = re.search(r'(\d{1,2})(?::(\d{2}))?\s*(am|pm)', texto)
    if m_12h:
        hora   = int(m_12h.group(1))
        minuto = int(m_12h.group(2)) if m_12h.group(2) else 0
        ampm   = m_12h.group(3)
        if ampm == "pm" and hora != 12:
            hora += 12
        elif ampm == "am" and hora == 12:
            hora = 0
        hora_dt = ahora.replace(hour=hora, minute=minuto, second=0, microsecond=0)

    # Patrón 24h: "14:30", "09:00"
    if hora_dt is None:
        m_24h = re.search(r'\b(\d{1,2}):(\d{2})\b', texto)
        if m_24h:
            hora_dt = ahora.replace(
                hour=int(m_24h.group(1)),
                minute=int(m_24h.group(2)),
                second=0, microsecond=0,
            )

    # Fallback: si encontramos número solo (e.g. "a las 3") lo tratamos como hora pm diurna
    if hora_dt is None:
        m_solo = re.search(r'\ba las?\s*(\d{1,2})\b', texto)
        if m_solo:
            hora = int(m_solo.group(1))
            if hora < 8:
                hora += 12   # asumir pm para horas ambiguas
            hora_dt = ahora.replace(hour=hora, minute=0, second=0, microsecond=0)

    hora_final = hora_dt if hora_dt else ahora.replace(hour=9, minute=0, second=0, microsecond=0)

    # ── 3. Determinar la fecha ────────────────────────────────────────────────

    # "hoy"
    if "hoy" in texto:
        return hora_final.replace(year=ahora.year, month=ahora.month, day=ahora.day)

    # "mañana"
    if "mañana" in texto or "manana" in texto:
        manana = ahora + timedelta(days=1)
        return hora_final.replace(year=manana.year, month=manana.month, day=manana.day)

    # "pasado mañana"
    if "pasado" in texto:
        pasado = ahora + timedelta(days=2)
        return hora_final.replace(year=pasado.year, month=pasado.month, day=pasado.day)

    # Día de semana: buscar el próximo (a partir de mañana)
    for nombre_dia, num_dia in _DIAS_MAP.items():
        if nombre_dia in texto:
            dias_hasta = (num_dia - ahora.weekday()) % 7
            if dias_hasta == 0:
                dias_hasta = 7   # si es hoy, el próximo de esa semana
            fecha_obj = ahora + timedelta(days=dias_hasta)
            return hora_final.replace(
                year=fecha_obj.year, month=fecha_obj.month, day=fecha_obj.day
            )

    # Fecha dd/mm dentro del texto
    m_fecha = re.search(r'(\d{1,2})/(\d{1,2})(?:/(\d{2,4}))?', texto)
    if m_fecha:
        dia  = int(m_fecha.group(1))
        mes  = int(m_fecha.group(2))
        anio = int(m_fecha.group(3)) if m_fecha.group(3) else ahora.year
        if anio < 100:
            anio += 2000
        try:
            return hora_final.replace(year=anio, month=mes, day=dia)
        except ValueError:
            pass

    # Si solo hay hora sin fecha, asumir hoy o mañana según si ya pasó
    if hora_dt is not None:
        if hora_dt > ahora:
            return hora_dt
        else:
            return hora_dt + timedelta(days=1)

    # No se pudo parsear
    logger.warning("No se pudo parsear la fecha: '%s'", fecha_str)
    return None


# ── Construcción del evento ───────────────────────────────────────────────────

def _construir_evento(
    titulo: str,
    descripcion: str,
    fecha_inicio: datetime,
    duracion_minutos: int = 30,
    color_id: str = "2",    # 2 = sage/verde; ver lista en docs de Calendar
) -> dict:
    """
    Arma el dict del evento para la API de Google Calendar.
    """
    fecha_fin = fecha_inicio + timedelta(minutes=duracion_minutos)
    zona = "America/Caracas"   # ajusta según la zona del negocio

    return {
        "summary":     titulo,
        "description": descripcion,
        "start": {
            "dateTime": fecha_inicio.isoformat(),
            "timeZone": zona,
        },
        "end": {
            "dateTime": fecha_fin.isoformat(),
            "timeZone": zona,
        },
        "colorId": color_id,
        "reminders": {
            "useDefault": False,
            "overrides": [
                {"method": "popup",  "minutes": 60},
                {"method": "popup",  "minutes": 15},
            ],
        },
    }


def _insertar_evento(evento: dict) -> Optional[str]:
    """
    Llama a la API para insertar el evento. Retorna la URL del evento o None.
    """
    servicio = _get_service()
    if servicio is None:
        return None

    try:
        resultado = (
            servicio.events()
            .insert(calendarId=CALENDAR_ID, body=evento)
            .execute()
        )
        url = resultado.get("htmlLink", "")
        logger.info("Evento creado en Google Calendar: %s — %s", resultado.get("summary"), url)
        return url

    except Exception as exc:
        logger.error("Error al crear evento en Google Calendar: %s", exc)
        return None


# ── API pública ───────────────────────────────────────────────────────────────

async def crear_evento_cita(
    nombre_paciente: str,
    telefono: str,
    especialidad: str,
    fecha_hora_str: str,
    duracion_minutos: int = 30,
    notas: str = "",
) -> Optional[str]:
    """
    Crea un evento de cita médica en Google Calendar.

    Args:
        nombre_paciente:  Nombre del paciente.
        telefono:         Número de WhatsApp (para descripción del evento).
        especialidad:     Ej. "Pediatría", "Cardiología".
        fecha_hora_str:   Texto natural, ej. "viernes a las 3pm".
        duracion_minutos: Duración del bloque (default 30).
        notas:            Observaciones adicionales.

    Returns:
        URL del evento en Google Calendar, o None si falló.
    """
    fecha = _parsear_fecha(fecha_hora_str)
    if fecha is None:
        logger.warning(
            "No se creó el evento de cita — fecha no parseable: '%s'", fecha_hora_str
        )
        return None

    titulo = f"🩺 Cita {especialidad} — {nombre_paciente}"
    descripcion = (
        f"Paciente: {nombre_paciente}\n"
        f"WhatsApp: {telefono}\n"
        f"Especialidad: {especialidad}\n"
        f"Fecha solicitada: {fecha_hora_str}\n"
    )
    if notas:
        descripcion += f"Notas: {notas}\n"

    evento = _construir_evento(titulo, descripcion, fecha, duracion_minutos, color_id="2")
    return _insertar_evento(evento)


async def crear_evento_visita(
    nombre_cliente: str,
    telefono: str,
    propiedad: str,
    fecha_hora_str: str,
    notas: str = "",
) -> Optional[str]:
    """
    Crea un evento de visita inmobiliaria en Google Calendar.

    Args:
        nombre_cliente: Nombre del interesado.
        telefono:       Número de WhatsApp.
        propiedad:      Descripción de la propiedad a visitar.
        fecha_hora_str: Texto natural, ej. "sábado a las 11am".
        notas:          Observaciones adicionales.

    Returns:
        URL del evento en Google Calendar, o None si falló.
    """
    fecha = _parsear_fecha(fecha_hora_str)
    if fecha is None:
        logger.warning(
            "No se creó el evento de visita — fecha no parseable: '%s'", fecha_hora_str
        )
        return None

    titulo = f"🏠 Visita inmobiliaria — {nombre_cliente}"
    descripcion = (
        f"Cliente: {nombre_cliente}\n"
        f"WhatsApp: {telefono}\n"
        f"Propiedad: {propiedad}\n"
        f"Fecha solicitada: {fecha_hora_str}\n"
    )
    if notas:
        descripcion += f"Notas: {notas}\n"

    evento = _construir_evento(titulo, descripcion, fecha, duracion_minutos=60, color_id="9")
    return _insertar_evento(evento)


async def crear_evento_reserva(
    nombre_cliente: str,
    telefono: str,
    personas: str,
    fecha_hora_str: str,
    notas: str = "",
) -> Optional[str]:
    """
    Crea un evento de reserva de mesa en Google Calendar.

    Args:
        nombre_cliente: Nombre del comensal principal.
        telefono:       Número de WhatsApp.
        personas:       Cantidad de personas en la reserva.
        fecha_hora_str: Texto natural, ej. "viernes a las 7pm".
        notas:          Observaciones adicionales.

    Returns:
        URL del evento en Google Calendar, o None si falló.
    """
    fecha = _parsear_fecha(fecha_hora_str)
    if fecha is None:
        logger.warning(
            "No se creó el evento de reserva — fecha no parseable: '%s'", fecha_hora_str
        )
        return None

    titulo = f"🍽️ Reserva mesa — {nombre_cliente} ({personas} pers.)"
    descripcion = (
        f"Cliente: {nombre_cliente}\n"
        f"WhatsApp: {telefono}\n"
        f"Personas: {personas}\n"
        f"Fecha solicitada: {fecha_hora_str}\n"
    )
    if notas:
        descripcion += f"Notas: {notas}\n"

    evento = _construir_evento(titulo, descripcion, fecha, duracion_minutos=120, color_id="11")
    return _insertar_evento(evento)
