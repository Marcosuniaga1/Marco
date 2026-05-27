"""
Módulo de Privacidad y LPD — AgentKit
============================================
Cumple con:
- Venezuela: Ley de Infogobierno + principios de la OEA
- México: LFPDPPP (Ley Federal de Protección de Datos Personales)
- GDPR-compatible (para clientes internacionales)

Funcionalidades:
- Aviso de privacidad en primer mensaje
- Registro de consentimiento en DB
- Retención automática: datos eliminados a los 90 días
- Comando BORRAR MIS DATOS: elimina todo rastro del usuario
- Tabla `consentimientos` separada de mensajes
"""

import logging
from datetime import datetime, timedelta
from sqlalchemy import text
from agent.memory import async_session, engine

logger = logging.getLogger(__name__)

DIAS_RETENCION = 90

AVISO_PRIVACIDAD = (
    "🔒 *Aviso de Privacidad*\n\n"
    "Para brindarte un mejor servicio, guardamos temporalmente:\n"
    "• Tu número de teléfono\n"
    "• El historial de esta conversación\n"
    "• Los datos que nos proporciones (nombre, citas, etc.)\n\n"
    "📋 *Tus derechos:*\n"
    "• Acceder a tus datos → escribe *MIS DATOS*\n"
    "• Borrar todo → escribe *BORRAR MIS DATOS*\n"
    "• Datos eliminados automáticamente en 90 días\n\n"
    "Al continuar, aceptas este aviso.\n"
    "Escribe *NO ACEPTO* si no deseas continuar."
)

RESPUESTA_BORRADO = (
    "✅ Tus datos han sido eliminados.\n\n"
    "Hemos borrado:\n"
    "• Todo el historial de esta conversación\n"
    "• Tu registro de consentimiento\n"
    "• Cualquier dato personal que hayas compartido\n\n"
    "Si necesitas algo en el futuro, escríbenos.\n"
    "¡Hasta luego! 👋"
)

RESPUESTA_NO_ACEPTO = (
    "Entendido, respetamos tu decisión. 🙏\n\n"
    "No guardaremos ningún dato personal tuyo.\n"
    "Si en algún momento cambias de opinión, escríbenos de nuevo.\n\n"
    "¡Hasta luego! 👋"
)

# ── DDL de la tabla de consentimientos ────────────────────────────────────────

_DDL_CONSENTIMIENTOS = """
CREATE TABLE IF NOT EXISTS consentimientos (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    telefono    TEXT    NOT NULL,
    acepto      INTEGER NOT NULL DEFAULT 0,
    ip          TEXT,
    timestamp   TEXT    NOT NULL,
    aviso_mostrado INTEGER NOT NULL DEFAULT 0
)
"""

# Para PostgreSQL (asyncpg usa SERIAL en lugar de AUTOINCREMENT)
_DDL_CONSENTIMIENTOS_PG = """
CREATE TABLE IF NOT EXISTS consentimientos (
    id          SERIAL  PRIMARY KEY,
    telefono    TEXT    NOT NULL,
    acepto      INTEGER NOT NULL DEFAULT 0,
    ip          TEXT,
    timestamp   TEXT    NOT NULL,
    aviso_mostrado INTEGER NOT NULL DEFAULT 0
)
"""


async def inicializar_tabla_privacidad() -> None:
    """
    Crea la tabla `consentimientos` si no existe.
    Compatible con SQLite y PostgreSQL.
    Llama a esta función al iniciar la aplicación (junto a inicializar_db).
    """
    try:
        async with engine.begin() as conn:
            # Detectar el driver para usar el DDL correcto
            url_str = str(engine.url)
            ddl = _DDL_CONSENTIMIENTOS_PG if "postgresql" in url_str else _DDL_CONSENTIMIENTOS
            await conn.execute(text(ddl))
        logger.info("Tabla 'consentimientos' verificada/creada.")
    except Exception as exc:
        logger.error("Error al inicializar tabla de privacidad: %s", exc)


# ── CRUD de consentimientos ───────────────────────────────────────────────────

async def verificar_consentimiento(telefono: str) -> bool:
    """
    Retorna True si el usuario ha aceptado el aviso de privacidad previamente.
    Retorna False si no hay registro o si rechazó.
    """
    try:
        async with async_session() as session:
            resultado = await session.execute(
                text(
                    "SELECT acepto FROM consentimientos "
                    "WHERE telefono = :tel ORDER BY id DESC LIMIT 1"
                ),
                {"tel": telefono},
            )
            fila = resultado.fetchone()
            if fila is None:
                return False
            return bool(fila[0])
    except Exception as exc:
        logger.error("Error al verificar consentimiento de %s: %s", telefono, exc)
        return False


async def registrar_consentimiento(
    telefono: str,
    acepto: bool,
    ip: str | None = None,
) -> None:
    """
    Persiste la decisión de privacidad del usuario.

    Args:
        telefono: Número de WhatsApp.
        acepto:   True si aceptó, False si rechazó.
        ip:       IP del webhook de entrada (opcional, para auditoría).
    """
    try:
        async with async_session() as session:
            await session.execute(
                text(
                    "INSERT INTO consentimientos (telefono, acepto, ip, timestamp, aviso_mostrado) "
                    "VALUES (:tel, :acepto, :ip, :ts, 1)"
                ),
                {
                    "tel":   telefono,
                    "acepto": 1 if acepto else 0,
                    "ip":    ip,
                    "ts":    datetime.utcnow().isoformat(),
                },
            )
            await session.commit()
        logger.info(
            "Consentimiento registrado: tel=%s acepto=%s", telefono, acepto
        )
    except Exception as exc:
        logger.error("Error al registrar consentimiento de %s: %s", telefono, exc)


async def primer_mensaje_necesita_aviso(telefono: str) -> bool:
    """
    Retorna True si este es un usuario nuevo que aún no ha visto el aviso de privacidad.
    Retorna False si ya se le mostró el aviso (independientemente de si aceptó o no).
    """
    try:
        async with async_session() as session:
            resultado = await session.execute(
                text(
                    "SELECT aviso_mostrado FROM consentimientos "
                    "WHERE telefono = :tel ORDER BY id DESC LIMIT 1"
                ),
                {"tel": telefono},
            )
            fila = resultado.fetchone()
            if fila is None:
                return True          # usuario completamente nuevo
            return not bool(fila[0])  # True si aviso_mostrado = 0
    except Exception as exc:
        logger.error("Error al verificar si necesita aviso %s: %s", telefono, exc)
        return False  # en caso de error, no interrumpir la conversación


async def marcar_aviso_mostrado(telefono: str) -> None:
    """
    Registra que se le mostró el aviso a este teléfono (sin consentimiento aún).
    Usado para evitar mostrar el aviso dos veces en la misma sesión.
    """
    try:
        async with async_session() as session:
            # Insertar fila con acepto=0 y aviso_mostrado=1; se actualizará si acepta/rechaza
            await session.execute(
                text(
                    "INSERT INTO consentimientos (telefono, acepto, ip, timestamp, aviso_mostrado) "
                    "VALUES (:tel, 0, NULL, :ts, 1)"
                ),
                {"tel": telefono, "ts": datetime.utcnow().isoformat()},
            )
            await session.commit()
    except Exception as exc:
        logger.error("Error al marcar aviso mostrado para %s: %s", telefono, exc)


# ── Comandos de privacidad del usuario ───────────────────────────────────────

async def manejar_solicitud_borrado(telefono: str) -> str:
    """
    Elimina TODOS los datos del usuario: mensajes y registros de consentimiento.
    Retorna RESPUESTA_BORRADO para enviar al usuario.
    """
    try:
        async with async_session() as session:
            # Borrar mensajes
            await session.execute(
                text("DELETE FROM mensajes WHERE telefono = :tel"),
                {"tel": telefono},
            )
            # Borrar consentimientos
            await session.execute(
                text("DELETE FROM consentimientos WHERE telefono = :tel"),
                {"tel": telefono},
            )
            await session.commit()

        logger.info("Datos eliminados por solicitud del usuario: tel=%s", telefono)
        return RESPUESTA_BORRADO

    except Exception as exc:
        logger.error("Error al borrar datos de %s: %s", telefono, exc)
        return (
            "⚠️ Ocurrió un error al procesar tu solicitud.\n\n"
            "Por favor, contáctanos directamente para garantizar la eliminación de tus datos."
        )


async def mostrar_mis_datos(telefono: str) -> str:
    """
    Retorna un resumen de los datos almacenados del usuario.
    No expone el contenido de los mensajes, solo metadatos (cantidad, fechas).
    """
    try:
        async with async_session() as session:
            # Contar mensajes y obtener fechas límite
            resultado_msgs = await session.execute(
                text(
                    "SELECT COUNT(*), MIN(timestamp), MAX(timestamp) "
                    "FROM mensajes WHERE telefono = :tel"
                ),
                {"tel": telefono},
            )
            fila_msgs = resultado_msgs.fetchone()
            total_msgs  = fila_msgs[0] if fila_msgs else 0
            primer_msg  = fila_msgs[1] if fila_msgs else None
            ultimo_msg  = fila_msgs[2] if fila_msgs else None

            # Obtener consentimiento
            resultado_cons = await session.execute(
                text(
                    "SELECT acepto, timestamp FROM consentimientos "
                    "WHERE telefono = :tel ORDER BY id DESC LIMIT 1"
                ),
                {"tel": telefono},
            )
            fila_cons = resultado_cons.fetchone()

        # Calcular fecha de expiración
        expiracion = "No disponible"
        if ultimo_msg:
            try:
                dt_ultimo = datetime.fromisoformat(str(ultimo_msg))
                dt_expira = dt_ultimo + timedelta(days=DIAS_RETENCION)
                expiracion = dt_expira.strftime("%d/%m/%Y")
            except (ValueError, TypeError):
                pass

        consentimiento_str = "No registrado"
        if fila_cons:
            estado_acepto = "✅ Aceptado" if fila_cons[0] else "❌ Rechazado"
            consentimiento_str = f"{estado_acepto} el {fila_cons[1][:10] if fila_cons[1] else '?'}"

        primer_str = str(primer_msg)[:10] if primer_msg else "—"
        ultimo_str = str(ultimo_msg)[:10] if ultimo_msg else "—"

        return (
            "📋 *Tus datos almacenados:*\n\n"
            f"📞 Teléfono: {telefono}\n"
            f"💬 Mensajes guardados: {total_msgs}\n"
            f"📅 Primer mensaje: {primer_str}\n"
            f"📅 Último mensaje: {ultimo_str}\n"
            f"🗑️ Eliminación automática: {expiracion}\n"
            f"🔒 Consentimiento: {consentimiento_str}\n\n"
            "Para borrar todos tus datos escribe *BORRAR MIS DATOS*."
        )

    except Exception as exc:
        logger.error("Error al obtener datos de %s: %s", telefono, exc)
        return (
            "⚠️ No se pudo obtener la información en este momento.\n"
            "Por favor, inténtalo más tarde."
        )


# ── Purga automática ──────────────────────────────────────────────────────────

async def purgar_datos_expirados() -> int:
    """
    Elimina todos los mensajes y consentimientos de usuarios cuyo último
    mensaje tenga más de DIAS_RETENCION días.

    Pensado para ejecutarse diariamente mediante un scheduler (APScheduler, cron, etc.).

    Returns:
        Número de teléfonos cuya información fue eliminada.
    """
    try:
        fecha_limite = (datetime.utcnow() - timedelta(days=DIAS_RETENCION)).isoformat()
        eliminados   = 0

        async with async_session() as session:
            # Obtener teléfonos con mensajes vencidos
            resultado = await session.execute(
                text(
                    "SELECT DISTINCT telefono FROM mensajes "
                    "WHERE timestamp < :limite"
                ),
                {"limite": fecha_limite},
            )
            telefonos_vencidos = [fila[0] for fila in resultado.fetchall()]

            for telefono in telefonos_vencidos:
                await session.execute(
                    text("DELETE FROM mensajes WHERE telefono = :tel"),
                    {"tel": telefono},
                )
                await session.execute(
                    text("DELETE FROM consentimientos WHERE telefono = :tel"),
                    {"tel": telefono},
                )
                eliminados += 1

            await session.commit()

        if eliminados > 0:
            logger.info(
                "Purga de privacidad: %d usuarios eliminados (datos > %d días).",
                eliminados, DIAS_RETENCION,
            )
        else:
            logger.debug("Purga de privacidad: sin datos expirados.")

        return eliminados

    except Exception as exc:
        logger.error("Error durante purga de datos expirados: %s", exc)
        return 0


# ── Clasificador de comandos de privacidad ────────────────────────────────────

_COMANDOS_BORRAR = {
    "borrar mis datos",
    "eliminar mis datos",
    "borra mis datos",
    "elimina mis datos",
    "quiero que borres mis datos",
    "quiero borrar mis datos",
    "delete my data",
}

_COMANDOS_MIS_DATOS = {
    "mis datos",
    "ver mis datos",
    "que datos tienen",
    "qué datos tienen",
    "que datos tienes",
    "qué datos tienes",
    "my data",
}

_COMANDOS_NO_ACEPTO = {
    "no acepto",
    "no acepto el aviso",
    "no acepto la privacidad",
    "no acepto los términos",
    "no acepto los terminos",
    "rechazo",
    "no quiero",
}


async def es_comando_privacidad(
    mensaje: str,
) -> tuple[bool, str | None]:
    """
    Detecta si el mensaje es un comando de privacidad y retorna la respuesta adecuada.

    Args:
        mensaje: Texto del usuario (se normaliza internamente).

    Returns:
        (True, texto_respuesta) si es un comando de privacidad.
        (False, None) si NO es un comando de privacidad.

    Nota: Esta función no necesita el teléfono porque solo detecta el tipo de comando.
          El llamante debe invocar manejar_solicitud_borrado() o mostrar_mis_datos()
          si el resultado es True.
    """
    texto = mensaje.lower().strip()

    # Eliminar signos de puntuación comunes para normalizar
    texto = texto.replace("!", "").replace(".", "").replace(",", "").replace("?", "")

    for cmd in _COMANDOS_BORRAR:
        if cmd in texto:
            return True, "__BORRAR__"

    for cmd in _COMANDOS_MIS_DATOS:
        if cmd in texto:
            return True, "__MIS_DATOS__"

    for cmd in _COMANDOS_NO_ACEPTO:
        if cmd in texto:
            return True, "__NO_ACEPTO__"

    return False, None


async def procesar_comando_privacidad(
    telefono: str,
    codigo: str,
    ip: str | None = None,
) -> str:
    """
    Ejecuta el comando de privacidad identificado por es_comando_privacidad().

    Args:
        telefono: Número del usuario.
        codigo:   "__BORRAR__" | "__MIS_DATOS__" | "__NO_ACEPTO__"
        ip:       IP del webhook (opcional).

    Returns:
        Texto de respuesta para enviar al usuario.
    """
    if codigo == "__BORRAR__":
        return await manejar_solicitud_borrado(telefono)

    if codigo == "__MIS_DATOS__":
        return await mostrar_mis_datos(telefono)

    if codigo == "__NO_ACEPTO__":
        await registrar_consentimiento(telefono, acepto=False, ip=ip)
        return RESPUESTA_NO_ACEPTO

    logger.warning("Código de privacidad desconocido: %s", codigo)
    return "No entendí tu solicitud de privacidad. Escribe *MIS DATOS* o *BORRAR MIS DATOS*."
