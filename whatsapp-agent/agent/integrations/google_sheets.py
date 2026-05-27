"""
Google Sheets — AgentKit
Registra citas, leads y conversaciones en tiempo real.

Configuración en .env:
  GOOGLE_SHEETS_CREDENTIALS=path/to/credentials.json  # Service Account JSON
  SPREADSHEET_ID=tu_spreadsheet_id

Estructura de la hoja:
  Hoja "Citas":  Fecha | Hora | Teléfono | Nombre | Servicio | Estado | Notas
  Hoja "Leads":  Fecha | Teléfono | Nombre | Interés | Fuente | Estado

Requiere:
  pip install gspread google-auth
"""

import os
import logging
from datetime import datetime
from typing import Optional

logger = logging.getLogger(__name__)

CREDENTIALS_PATH = os.getenv("GOOGLE_SHEETS_CREDENTIALS", "")
SPREADSHEET_ID   = os.getenv("SPREADSHEET_ID", "")

# ── Encabezados esperados en cada hoja ───────────────────────────────────────

HEADERS_CITAS = ["Fecha", "Hora", "Teléfono", "Nombre", "Servicio", "Estado", "Notas"]
HEADERS_LEADS = ["Fecha", "Teléfono", "Nombre", "Interés", "Fuente", "Estado"]

# ── Cache del cliente gspread ─────────────────────────────────────────────────

_client_cache: Optional[object]      = None   # gspread.Client
_spreadsheet_cache: Optional[object] = None   # gspread.Spreadsheet


def _esta_configurado() -> bool:
    """Devuelve True solo si las credenciales y el spreadsheet ID están configurados."""
    if not CREDENTIALS_PATH or not SPREADSHEET_ID:
        logger.warning(
            "Google Sheets no configurado. Define GOOGLE_SHEETS_CREDENTIALS y "
            "SPREADSHEET_ID en .env para activar el registro automático."
        )
        return False
    if not os.path.isfile(CREDENTIALS_PATH):
        logger.warning(
            "Archivo de credenciales no encontrado: %s", CREDENTIALS_PATH
        )
        return False
    return True


async def _get_sheet(nombre_hoja: str):
    """
    Devuelve un objeto gspread.Worksheet para la hoja indicada.
    Crea la hoja con sus encabezados si no existe.
    Retorna None si hay cualquier problema de configuración o conexión.
    """
    global _client_cache, _spreadsheet_cache

    if not _esta_configurado():
        return None

    try:
        import gspread
        from google.oauth2.service_account import Credentials

        if _client_cache is None:
            scopes = [
                "https://www.googleapis.com/auth/spreadsheets",
                "https://www.googleapis.com/auth/drive",
            ]
            creds = Credentials.from_service_account_file(CREDENTIALS_PATH, scopes=scopes)
            _client_cache = gspread.authorize(creds)

        if _spreadsheet_cache is None:
            _spreadsheet_cache = _client_cache.open_by_key(SPREADSHEET_ID)

        spreadsheet = _spreadsheet_cache

        # Buscar la hoja; crearla si no existe
        try:
            hoja = spreadsheet.worksheet(nombre_hoja)
        except gspread.WorksheetNotFound:
            hoja = spreadsheet.add_worksheet(title=nombre_hoja, rows="1000", cols="20")
            headers = HEADERS_CITAS if nombre_hoja == "Citas" else HEADERS_LEADS
            hoja.append_row(headers, value_input_option="RAW")
            logger.info("Hoja '%s' creada con encabezados.", nombre_hoja)

        return hoja

    except Exception as exc:
        logger.error("Error al obtener hoja '%s' de Google Sheets: %s", nombre_hoja, exc)
        # Resetear cache para reintentar en la próxima llamada
        _client_cache = None
        _spreadsheet_cache = None
        return None


# ── API pública ───────────────────────────────────────────────────────────────

async def registrar_cita(
    telefono: str,
    nombre: str,
    servicio: str,
    fecha_hora: str,
    estado: str = "pendiente",
    notas: str = "",
) -> bool:
    """
    Agrega una fila a la hoja "Citas".

    Args:
        telefono:   Número de WhatsApp del paciente/cliente.
        nombre:     Nombre completo.
        servicio:   Especialidad, propiedad o servicio reservado.
        fecha_hora: Texto libre como "viernes 12/01 a las 10am".
        estado:     "pendiente" | "confirmada" | "cancelada" | "completada"
        notas:      Observaciones adicionales.

    Returns:
        True si se registró, False si hubo un error o no está configurado.
    """
    hoja = await _get_sheet("Citas")
    if hoja is None:
        return False

    try:
        ahora     = datetime.now()
        fecha_hoy = ahora.strftime("%d/%m/%Y")
        hora_hoy  = ahora.strftime("%H:%M")

        hoja.append_row(
            [fecha_hoy, hora_hoy, telefono, nombre, servicio, estado, notas],
            value_input_option="RAW",
        )
        logger.info("Cita registrada en Sheets: %s — %s — %s", nombre, servicio, fecha_hora)
        return True

    except Exception as exc:
        logger.error("Error al registrar cita en Google Sheets: %s", exc)
        return False


async def registrar_lead(
    telefono: str,
    nombre: str,
    interes: str,
    fuente: str = "WhatsApp",
) -> bool:
    """
    Agrega una fila a la hoja "Leads".

    Args:
        telefono: Número de contacto.
        nombre:   Nombre del prospecto.
        interes:  Qué producto/servicio le interesa.
        fuente:   Canal de origen (por defecto "WhatsApp").

    Returns:
        True si se registró, False en caso de error.
    """
    hoja = await _get_sheet("Leads")
    if hoja is None:
        return False

    try:
        fecha_hoy = datetime.now().strftime("%d/%m/%Y")

        hoja.append_row(
            [fecha_hoy, telefono, nombre, interes, fuente, "nuevo"],
            value_input_option="RAW",
        )
        logger.info("Lead registrado en Sheets: %s — %s", nombre, interes)
        return True

    except Exception as exc:
        logger.error("Error al registrar lead en Google Sheets: %s", exc)
        return False


async def actualizar_estado_cita(
    telefono: str,
    fecha_hora: str,
    nuevo_estado: str,
) -> bool:
    """
    Busca la cita más reciente del teléfono dado y actualiza su columna 'Estado'.

    Args:
        telefono:     Número del paciente.
        fecha_hora:   Texto de la fecha/hora para identificar la cita (coincidencia parcial).
        nuevo_estado: Nuevo valor de la columna Estado.

    Returns:
        True si encontró y actualizó la fila, False si no la encontró o hubo error.
    """
    hoja = await _get_sheet("Citas")
    if hoja is None:
        return False

    try:
        todas = hoja.get_all_records()   # Lista de dicts con los encabezados como keys

        # Columna Estado = índice 5 (0-based), fila 1 son los encabezados → filas de datos desde 2
        for idx, fila in enumerate(todas, start=2):
            if str(fila.get("Teléfono", "")) == str(telefono):
                col_estado = HEADERS_CITAS.index("Estado") + 1   # gspread usa 1-based
                hoja.update_cell(idx, col_estado, nuevo_estado)
                logger.info(
                    "Estado de cita actualizado: %s → %s (fila %d)",
                    telefono, nuevo_estado, idx,
                )
                return True

        logger.warning("No se encontró cita para actualizar: tel=%s", telefono)
        return False

    except Exception as exc:
        logger.error("Error al actualizar estado de cita en Google Sheets: %s", exc)
        return False


async def obtener_citas_hoy() -> list[dict]:
    """
    Devuelve todas las citas registradas para el día de hoy.

    Returns:
        Lista de dicts con las columnas de la hoja "Citas", o [] en caso de error.
    """
    hoja = await _get_sheet("Citas")
    if hoja is None:
        return []

    try:
        hoy    = datetime.now().strftime("%d/%m/%Y")
        todas  = hoja.get_all_records()
        de_hoy = [f for f in todas if f.get("Fecha") == hoy]
        logger.info("Citas de hoy (%s): %d encontradas.", hoy, len(de_hoy))
        return de_hoy

    except Exception as exc:
        logger.error("Error al obtener citas de hoy en Google Sheets: %s", exc)
        return []
