"""
Demo de Clínica MediVida — Sin API key requerida.
Uso: python tests/demo_clinica.py
"""

import time
import sys
import os
import re

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# ─── Doctores por especialidad ────────────────────────────────────────────────

DOCTORES = {
    "medicina general": "Dr. Roberto Herrera",
    "pediatría":        "Dra. Carmen Vázquez",
    "nutrición":        "Lic. Sofía Morales",
    "psicología":       "Psic. Andrés López",
    "odontología":      "Dr. Miguel Santana",
}

# ─── Catálogo de respuestas ───────────────────────────────────────────────────

RESPUESTAS = [
    {
        "claves": ["hola", "buenas", "buenos días", "buenas tardes", "buenas noches", "hey"],
        "especialidad": None,
        "respuesta": (
            "¡Hola! 😊 Bienvenido a Clínica MediVida. Soy Valeria, tu asistente virtual.\n\n"
            "¿En qué puedo ayudarte hoy?\n"
            "• 📅 Agendar una cita\n"
            "• 💊 Especialidades y precios\n"
            "• 🔬 Laboratorio\n"
            "• 📍 Ubicación y horarios\n\n"
            "¿Qué necesitas?"
        ),
    },
    {
        "claves": ["cita", "agendar", "turno", "quiero ver", "necesito ver"],
        "especialidad": None,
        "respuesta": (
            "Con gusto te agendo 📅 Contamos con:\n\n"
            "👨‍⚕️ Medicina General — $350 MXN\n"
            "👶 Pediatría — $450 MXN\n"
            "🥗 Nutrición — $400 MXN\n"
            "🧠 Psicología — $600 MXN\n"
            "🦷 Odontología — $500 MXN\n\n"
            "¿Con qué especialista te agendo?"
        ),
    },
    {
        "claves": ["pediatra", "pediatría", "niño", "niña", "bebé", "hijo", "hija", "infantil"],
        "especialidad": "pediatría",
        "respuesta": (
            "Nuestra pediatra es la *Dra. Carmen Vázquez Ríos* 👶\n\n"
            "📅 Disponibilidad: Lunes, Miércoles y Viernes 10am–7pm | Sábados 9am–3pm\n"
            "💰 Consulta: $450 MXN\n\n"
            "Para apartar tu cita solo dime:\n"
            "• Tu *nombre completo*\n"
            "• El *día y hora* que prefieres\n\n"
            "¿Cuándo les viene bien?"
        ),
    },
    {
        "claves": ["dentista", "dental", "diente", "muela", "odontología", "ortodoncia", "limpieza", "blanqueamiento"],
        "especialidad": "odontología",
        "respuesta": (
            "Nuestro odontólogo es el *Dr. Miguel Santana Cruz* 🦷\n\n"
            "💰 Precios:\n"
            "• Consulta general: $500 MXN\n"
            "• Limpieza dental: $800 MXN\n"
            "• Blanqueamiento: $1,500 MXN\n\n"
            "📅 Disponible: Lun, Mié, Vie 9am–7pm | Mar y Jue 2pm–8pm\n\n"
            "Para apartar tu cita dime:\n"
            "• Tu *nombre completo*\n"
            "• El *día y hora* que prefieres\n\n"
            "¿Cuándo te viene bien?"
        ),
    },
    {
        "claves": ["nutrición", "nutriólogo", "dieta", "peso", "adelgazar", "bajar de peso", "sobrepeso"],
        "especialidad": "nutrición",
        "respuesta": (
            "Nuestra nutrióloga es la *Lic. Sofía Morales Torres* 🥗\n\n"
            "💰 Consulta: $400 MXN (45 minutos)\n"
            "📅 Disponible: Martes y Jueves 9am–6pm | Sábados 9am–1pm\n\n"
            "Para apartar tu cita dime:\n"
            "• Tu *nombre completo*\n"
            "• El *día y hora* que prefieres\n\n"
            "¿Cuándo te viene bien?"
        ),
    },
    {
        "claves": ["psicólogo", "psicología", "ansiedad", "depresión", "estrés", "terapia"],
        "especialidad": "psicología",
        "respuesta": (
            "Contamos con el *Psic. Andrés López Fuentes* 🧠\n\n"
            "💰 Consulta: $600 MXN (50 minutos)\n"
            "📅 Disponible: Lunes a Viernes 3pm–8pm\n\n"
            "Todas las consultas son confidenciales 💙\n\n"
            "Para apartar tu cita dime:\n"
            "• Tu *nombre completo*\n"
            "• El *día y hora* que prefieres\n\n"
            "¿Cuándo te viene bien?"
        ),
    },
    {
        "claves": ["medicina general", "doctor general", "médico general", "urgencia sin cita", "urgencias"],
        "especialidad": "medicina general",
        "respuesta": (
            "El *Dr. Roberto Herrera* atiende medicina general y urgencias 🩺\n\n"
            "💰 Consulta: $350 MXN\n"
            "📅 Disponible: Lunes a Viernes 8am–8pm | Sábados 9am–1pm\n"
            "✅ Atiende urgencias sin cita previa\n\n"
            "Para apartar tu cita dime:\n"
            "• Tu *nombre completo*\n"
            "• El *día y hora* que prefieres\n\n"
            "¿Cuándo te viene bien?"
        ),
    },
    {
        "claves": ["laboratorio", "análisis", "estudios", "sangre", "biometría", "glucosa", "orina", "tiroides", "covid"],
        "especialidad": None,
        "respuesta": (
            "Sí, contamos con laboratorio propio 🔬 Resultados el mismo día.\n\n"
            "💰 Estudios más solicitados:\n"
            "• Biometría hemática: $200 MXN\n"
            "• Química sanguínea: $280 MXN\n"
            "• Glucosa en ayunas: $100 MXN\n"
            "• Perfil tiroideo: $350 MXN\n"
            "• Examen de orina: $120 MXN\n"
            "• Panel COVID + Influenza: $380 MXN\n\n"
            "🕐 No necesitas cita. Lunes a Viernes 8am–6pm.\n\n"
            "¿Necesitas saber si requieres ayuno?"
        ),
    },
    {
        "claves": ["paquete", "chequeo", "checkup", "revisión completa"],
        "especialidad": None,
        "respuesta": (
            "Tenemos paquetes de chequeo 📋\n\n"
            "🔵 Chequeo Básico — $990 MXN\n"
            "   Consulta + biometría + glucosa + orina\n\n"
            "🟣 Chequeo Completo — $1,800 MXN\n"
            "   Consulta + biometría + química + tiroideo + orina + EKG\n\n"
            "👨‍👩‍👧‍👦 Paquete Familiar (4 consultas) — $1,200 MXN\n\n"
            "¿Cuál te interesa? Te lo agendo de una vez."
        ),
    },
    {
        "claves": ["precio", "costo", "cuánto", "cuanto", "cobran", "tarifa"],
        "especialidad": None,
        "respuesta": (
            "Nuestros precios 💰\n\n"
            "👨‍⚕️ Medicina General: $350 MXN\n"
            "👶 Pediatría: $450 MXN\n"
            "🥗 Nutrición: $400 MXN\n"
            "🧠 Psicología: $600 MXN\n"
            "🦷 Odontología: $500 MXN\n\n"
            "🔬 Laboratorio desde $100 MXN\n"
            "📦 Chequeo Básico: $990 MXN\n\n"
            "¿Te agendo una cita?"
        ),
    },
    {
        "claves": ["horario", "abierto", "abren", "cierran", "sábado", "domingo"],
        "especialidad": None,
        "respuesta": (
            "Nuestro horario 🕐\n\n"
            "📅 Lunes a Viernes: 8am – 8pm\n"
            "📅 Sábados: 9am – 3pm\n"
            "❌ Domingos: cerrado\n\n"
            "¿Te agendo una cita? Dime qué especialidad y cuándo te viene bien."
        ),
    },
    {
        "claves": ["fiebre", "temperatura", "calentura"],
        "especialidad": "medicina general",
        "respuesta": (
            "Entiendo, la fiebre puede ser preocupante 🌡️\n\n"
            "• Hasta 38°C: monitorear, paracetamol si hay malestar\n"
            "• Más de 39.5°C en niños o 40°C en adultos: consulta urgente\n\n"
            "⚠️ Esto es orientación general, no un diagnóstico.\n\n"
            "El Dr. Herrera atiende *sin cita previa*. Para apartarte un lugar dime:\n"
            "• Tu *nombre completo*\n"
            "• ¿Hoy o prefieres otro día?\n\n"
            "¿Te agendo?"
        ),
    },
    {
        "claves": ["dirección", "ubicación", "donde", "dónde", "llegar", "mapa", "metro"],
        "especialidad": None,
        "respuesta": (
            "📍 Av. Insurgentes Sur 1234, Col. Del Valle, CDMX\n\n"
            "🚇 A 200 metros del metro Insurgentes (Línea 1)\n"
            "🅿️ Estacionamiento público a media cuadra (~$25/hora)\n\n"
            "📞 +52 55 1234 5678\n\n"
            "¿Necesitas algo más antes de tu visita?"
        ),
    },
    {
        "claves": ["seguro", "aseguradora", "reembolso", "imss", "issste"],
        "especialidad": None,
        "respuesta": (
            "No tenemos convenio directo, pero emitimos facturas para reembolso 🧾\n\n"
            "Solo necesitamos RFC y correo al pagar.\n\n"
            "¿Te agendo una cita?"
        ),
    },
    {
        "claves": ["pago", "pagar", "tarjeta", "efectivo", "transferencia", "mercado pago"],
        "especialidad": None,
        "respuesta": (
            "Formas de pago 💳\n\n"
            "✅ Efectivo\n"
            "✅ Tarjeta crédito/débito (sin comisión)\n"
            "✅ Transferencia / Clip / Mercado Pago\n\n"
            "¿Algo más en que pueda ayudarte?"
        ),
    },
    {
        "claves": ["gracias", "muchas gracias", "perfecto", "genial", "excelente"],
        "especialidad": None,
        "respuesta": (
            "¡Con mucho gusto! 😊 Es un placer ayudarte.\n\n"
            "¡Que tengas un excelente día! 🌟"
        ),
    },
    {
        "claves": ["cancelar", "cancelación", "reagendar", "cambiar cita"],
        "especialidad": None,
        "respuesta": (
            "Claro, sin problema 📅 Solo avísanos con 3 horas de anticipación.\n\n"
            "Dime:\n"
            "• Nombre del paciente\n"
            "• Fecha y hora de la cita actual\n"
            "• (Si reagendas) El nuevo día/hora\n\n"
            "¿Me compartes esos datos?"
        ),
    },
]

RESPUESTA_DEFAULT = (
    "Gracias por tu mensaje 😊 Puedo ayudarte con:\n"
    "📅 Citas — 💰 Precios — 🔬 Laboratorio — 📍 Ubicación\n\n"
    "¿Sobre qué necesitas información?"
)

DIAS_SEMANA = ["lunes", "martes", "miércoles", "miercoles", "jueves", "viernes", "sábado", "sabado", "domingo", "hoy", "mañana", "pasado"]
CONFIRMACIONES = ["sí", "si", "claro", "dale", "adelante", "me interesa", "quiero", "ese horario", "va", "ok", "bueno", "perfecto", "ese día"]

# ─── Lógica de matching ───────────────────────────────────────────────────────

def coincide(clave: str, msg: str) -> bool:
    if len(clave) <= 4:
        return bool(re.search(rf'\b{re.escape(clave)}\b', msg))
    return clave in msg


def buscar_respuesta(mensaje: str):
    msg = mensaje.lower()
    mejor, puntaje_max = None, 0
    for item in RESPUESTAS:
        puntaje = sum(1 for c in item["claves"] if coincide(c, msg))
        if puntaje > puntaje_max:
            puntaje_max, mejor = puntaje, item
    return mejor if mejor else None


def es_confirmacion(mensaje: str) -> bool:
    msg = mensaje.lower()
    for c in CONFIRMACIONES + DIAS_SEMANA:
        if c in msg:
            return True
    return False


def extraer_nombre(mensaje: str) -> str:
    """Intenta extraer un nombre propio del mensaje."""
    palabras = mensaje.strip().split()
    candidatos = [p for p in palabras if p[0].isupper() and len(p) > 2 and p.lower() not in
                  ["Hola", "Buenos", "Buenas", "Gracias", "Quiero", "Necesito", "Tengo", "Para", "Doctor", "Doctora"]]
    if candidatos:
        return " ".join(candidatos[:2])
    return mensaje.strip().title()


def generar_confirmacion(nombre: str, especialidad: str, detalle: str) -> str:
    doctor = DOCTORES.get(especialidad, "nuestro especialista")
    return (
        f"¡Perfecto, {nombre}! 🎉 Tu cita está apartada.\n\n"
        f"📋 *Resumen de tu cita:*\n"
        f"👨‍⚕️ Especialista: {doctor}\n"
        f"📅 {detalle}\n"
        f"📍 Av. Insurgentes Sur 1234, Col. Del Valle, CDMX\n\n"
        f"Te recordamos que:\n"
        f"• Llega 10 minutos antes\n"
        f"• Si necesitas cancelar, avísanos con 3 horas de anticipación\n"
        f"• Aceptamos efectivo y tarjeta\n\n"
        f"¡Te esperamos! Cualquier duda estoy aquí 😊"
    )


# ─── Estados de conversación ──────────────────────────────────────────────────

ESTADO_GENERAL      = "general"
ESTADO_PIDIENDO_DATOS = "pidiendo_datos"   # mostró especialidad, espera nombre+día
ESTADO_CITA_CONFIRMADA = "confirmada"


def escribir(texto: str):
    for c in texto:
        print(c, end="", flush=True)
        time.sleep(0.011)
    print()


# ─── Loop principal ───────────────────────────────────────────────────────────

def main():
    estado = ESTADO_GENERAL
    especialidad_actual = None
    nombre_paciente = None

    print()
    print("=" * 60)
    print("   Clínica MediVida — Demo Agente Valeria")
    print("=" * 60)
    print()
    print("  Escribe como si fueras un paciente. 'salir' para terminar.")
    print()
    print("  Prueba: 'Hola'  |  'Quiero cita con el pediatra'")
    print("          '¿Cuánto cuesta limpieza dental?'  |  'Mi hijo tiene fiebre'")
    print()
    print("-" * 60)
    print()

    while True:
        try:
            msg = input("Tú: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\n¡Hasta luego! 👋")
            break

        if not msg:
            continue
        if msg.lower() == "salir":
            print("\n¡Hasta luego! 👋")
            break

        time.sleep(0.35)
        print()
        print("Valeria: ", end="", flush=True)

        # ── Estado: esperando nombre y día para confirmar cita ──
        if estado == ESTADO_PIDIENDO_DATOS:
            msg_lower = msg.lower()

            # ¿Quiere otra cosa? Salir del flujo de cita
            nueva = buscar_respuesta(msg)
            if nueva and nueva["especialidad"] is None and not es_confirmacion(msg):
                estado = ESTADO_GENERAL
                especialidad_actual = None
                escribir(nueva["respuesta"])
                print()
                continue

            # Si escribe su nombre/día → confirmar cita
            tiene_dia = any(d in msg_lower for d in DIAS_SEMANA)
            tiene_hora = bool(re.search(r'\d{1,2}(am|pm|:\d{2})', msg_lower))

            if tiene_dia or tiene_hora or len(msg.split()) >= 2:
                if nombre_paciente is None:
                    nombre_paciente = extraer_nombre(msg)

                detalle_cita = msg if tiene_dia or tiene_hora else f"Día y hora por confirmar — te contactaremos al {msg}"
                escribir(generar_confirmacion(nombre_paciente, especialidad_actual, detalle_cita))
                estado = ESTADO_CITA_CONFIRMADA
                especialidad_actual = None
                nombre_paciente = None
                print()
                continue
            else:
                # Solo dio el nombre, pedir el día
                nombre_paciente = extraer_nombre(msg)
                escribir(
                    f"Perfecto, {nombre_paciente} 😊\n\n"
                    f"¿Qué día y hora te viene mejor? Por ejemplo: *viernes a las 11am* o *sábado en la mañana*."
                )
                print()
                continue

        # ── Estado general: buscar respuesta en catálogo ──
        resultado = buscar_respuesta(msg)

        if resultado:
            escribir(resultado["respuesta"])
            # Si la respuesta es de una especialidad → pasar a estado de cita
            if resultado.get("especialidad"):
                estado = ESTADO_PIDIENDO_DATOS
                especialidad_actual = resultado["especialidad"]
                nombre_paciente = None
        else:
            escribir(RESPUESTA_DEFAULT)

        print()


if __name__ == "__main__":
    main()
