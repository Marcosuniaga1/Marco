"""
Demo de Clínica MediVida — Sin API key requerida.
Simula respuestas reales de Valeria usando detección de palabras clave.

Uso: python tests/demo_clinica.py
"""

import time
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# ─── Base de respuestas de Valeria ────────────────────────────────────────────

RESPUESTAS = [
    {
        "claves": ["hola", "buenas", "buenos días", "buenas tardes", "buenas noches", "hi", "hey"],
        "respuesta": (
            "¡Hola! 😊 Bienvenido a Clínica MediVida. Soy Valeria, tu asistente virtual.\n\n"
            "¿En qué puedo ayudarte hoy? Puedo orientarte sobre:\n"
            "• 📅 Agendar una cita\n"
            "• 💊 Nuestras especialidades y precios\n"
            "• 🔬 Estudios de laboratorio\n"
            "• 📍 Ubicación y horarios\n\n"
            "¿Qué necesitas?"
        ),
    },
    {
        "claves": ["cita", "agendar", "appointment", "consulta", "quiero ver", "necesito ver", "turno"],
        "respuesta": (
            "Con gusto te agendo una cita 📅\n\n"
            "Contamos con estas especialidades:\n"
            "👨‍⚕️ Medicina General — $350 MXN\n"
            "👶 Pediatría — $450 MXN\n"
            "🥗 Nutrición — $400 MXN\n"
            "🧠 Psicología — $600 MXN\n"
            "🦷 Odontología — $500 MXN\n\n"
            "¿Con qué especialista deseas la cita?"
        ),
    },
    {
        "claves": ["pediatra", "pediatría", "niño", "niña", "bebé", "hijo", "hija", "infantil"],
        "respuesta": (
            "Nuestra pediatra es la Dra. Carmen Vázquez Ríos, con 10 años de experiencia "
            "en desarrollo infantil y lactancia materna 👶\n\n"
            "📅 Disponibilidad: Lunes, Miércoles y Viernes 10am–7pm, Sábados 9am–3pm\n"
            "💰 Consulta: $450 MXN\n\n"
            "Para agendar necesito:\n"
            "1️⃣ Nombre completo del paciente\n"
            "2️⃣ Edad del niño/a\n"
            "3️⃣ Día y hora de preferencia\n"
            "4️⃣ Tu número de teléfono\n\n"
            "¿Cuándo les viene bien?"
        ),
    },
    {
        "claves": ["dentista", "dental", "diente", "muela", "odontología", "ortodoncia", "limpieza", "blanqueamiento"],
        "respuesta": (
            "Nuestro odontólogo es el Dr. Miguel Santana Cruz, especialista en ortodoncia y estética dental 🦷\n\n"
            "💰 Precios:\n"
            "• Consulta general: $500 MXN\n"
            "• Limpieza dental: $800 MXN\n"
            "• Blanqueamiento: $1,500 MXN\n"
            "• Valoración ortodoncia: $350 MXN\n\n"
            "📅 Disponible: Lun, Mié, Vie 9am–7pm | Mar y Jue 2pm–8pm\n\n"
            "¿Con qué servicio te puedo agendar?"
        ),
    },
    {
        "claves": ["nutrición", "nutriólogo", "nutrióloga", "dieta", "peso", "adelgazar", "bajar de peso", "sobrepeso"],
        "respuesta": (
            "Nuestra nutrióloga es la Lic. Sofía Morales Torres 🥗\n\n"
            "Está especializada en nutrición clínica, pérdida de peso y nutrición deportiva.\n\n"
            "💰 Consulta: $400 MXN (45 minutos)\n"
            "📅 Disponible: Martes y Jueves 9am–6pm, Sábados 9am–1pm\n\n"
            "La primera consulta incluye valoración completa y plan de alimentación personalizado.\n\n"
            "¿Te agendo? ¿Qué día te viene mejor?"
        ),
    },
    {
        "claves": ["psicólogo", "psicología", "ansiedad", "depresión", "estrés", "terapia", "mental", "emocional"],
        "respuesta": (
            "Contamos con el Psic. Andrés López Fuentes, especialista en terapia cognitivo-conductual 🧠\n\n"
            "Atiende adultos, adolescentes y parejas.\n\n"
            "💰 Consulta: $600 MXN (50 minutos)\n"
            "📅 Disponible: Lunes a Viernes 3pm–8pm (con cita previa)\n\n"
            "Entendemos que dar este paso puede ser difícil, y valoramos tu confianza. "
            "Todas las consultas son completamente confidenciales 💙\n\n"
            "¿Te agendo una cita?"
        ),
    },
    {
        "claves": ["laboratorio", "análisis", "estudios", "sangre", "biometría", "glucosa", "orina", "tiroides", "covid"],
        "respuesta": (
            "Sí, contamos con laboratorio clínico propio 🔬 Resultados el mismo día en la mayoría de los casos.\n\n"
            "💰 Estudios más solicitados:\n"
            "• Biometría hemática: $200 MXN\n"
            "• Química sanguínea 6 elem.: $280 MXN\n"
            "• Glucosa en ayunas: $100 MXN\n"
            "• Perfil tiroideo: $350 MXN\n"
            "• Examen de orina: $120 MXN\n"
            "• Panel COVID + Influenza: $380 MXN\n\n"
            "🕐 Tiempo de resultados: 2–6 horas según el estudio.\n"
            "Los enviamos por WhatsApp o los recoges en recepción.\n\n"
            "¿Necesitas ayuno? La glucosa y química sanguínea requieren 8 horas. ¿Te puedo orientar más?"
        ),
    },
    {
        "claves": ["paquete", "chequeo", "checkup", "completo", "general", "revisión completa"],
        "respuesta": (
            "Tenemos paquetes especiales para chequeos médicos 📋\n\n"
            "🔵 Chequeo Básico — $990 MXN\n"
            "   • Consulta medicina general\n"
            "   • Biometría hemática\n"
            "   • Glucosa\n"
            "   • Examen general de orina\n\n"
            "🟣 Chequeo Completo — $1,800 MXN\n"
            "   • Consulta medicina general\n"
            "   • Biometría hemática\n"
            "   • Química sanguínea 6 elementos\n"
            "   • Perfil tiroideo\n"
            "   • Examen de orina\n"
            "   • Electrocardiograma\n\n"
            "👨‍👩‍👧‍👦 Paquete Familiar (4 consultas generales) — $1,200 MXN\n"
            "   Válido por 30 días\n\n"
            "¿Cuál se adapta mejor a lo que necesitas?"
        ),
    },
    {
        "claves": ["precio", "costo", "cuánto", "cuanto", "cobran", "tarifa", "vale"],
        "respuesta": (
            "Con gusto te comparto nuestros precios 💰\n\n"
            "👨‍⚕️ Consultas:\n"
            "• Medicina General: $350 MXN\n"
            "• Pediatría: $450 MXN\n"
            "• Nutrición: $400 MXN\n"
            "• Psicología: $600 MXN\n"
            "• Odontología: $500 MXN\n\n"
            "🔬 Laboratorio desde $100 MXN\n"
            "📦 Paquete Chequeo Básico: $990 MXN\n\n"
            "💳 Aceptamos efectivo, tarjeta (sin comisión), transferencia y Mercado Pago.\n\n"
            "¿Sobre cuál servicio quieres más detalle?"
        ),
    },
    {
        "claves": ["horario", "hora", "cuando", "cuándo", "abierto", "abren", "cierran", "días"],
        "respuesta": (
            "Nuestro horario de atención es 🕐\n\n"
            "📅 Lunes a Viernes: 8:00am – 8:00pm\n"
            "📅 Sábados: 9:00am – 3:00pm\n"
            "❌ Domingos: cerrado\n\n"
            "Cada especialista tiene su propio horario dentro de este rango. "
            "¿Quieres saber la disponibilidad de algún doctor en particular?"
        ),
    },
    {
        "claves": ["urgencia", "urgente", "emergencia", "dolor fuerte", "no puede respirar", "desmayó", "sangrado", "accidente"],
        "respuesta": (
            "⚠️ Si es una emergencia grave, por favor llama al 911 de inmediato o acude a urgencias.\n\n"
            "Si es una urgencia que puede esperar unos minutos, el Dr. Roberto Herrera atiende "
            "urgencias médicas sin cita previa en nuestra clínica.\n\n"
            "📍 Av. Insurgentes Sur 1234, Col. Del Valle, CDMX\n"
            "📞 +52 55 1234 5678\n\n"
            "¿Puedes contarme qué está pasando para orientarte mejor?"
        ),
    },
    {
        "claves": ["fiebre", "temperatura", "calentura"],
        "respuesta": (
            "Entiendo, la fiebre puede ser preocupante 🌡️\n\n"
            "Algunos parámetros de referencia:\n"
            "• 37.5–38°C: febrícula — monitorear\n"
            "• 38–39°C: fiebre moderada — puede tomarse acetaminofén/paracetamol\n"
            "• Más de 39.5°C en niños o 40°C en adultos: consulta urgente recomendada\n\n"
            "⚠️ IMPORTANTE: Esto es información general, no un diagnóstico. "
            "Siempre consulta con un médico.\n\n"
            "¿Quieres que te agendemos una cita urgente con el Dr. Herrera? "
            "Atendemos sin cita previa en caso de urgencia."
        ),
    },
    {
        "claves": ["dirección", "direccion", "ubicación", "ubicacion", "dónde", "donde", "llegar", "mapa", "metro"],
        "respuesta": (
            "📍 Nos encontramos en:\n"
            "Av. Insurgentes Sur 1234, Col. Del Valle, CDMX\n\n"
            "🚇 Metro: A 200 metros del metro Insurgentes (Línea 1)\n"
            "🅿️ Estacionamiento en calle (parquímetro) y estacionamiento público a media cuadra (~$25/hora)\n\n"
            "📞 Teléfono: +52 55 1234 5678\n\n"
            "¿Necesitas algo más antes de tu visita?"
        ),
    },
    {
        "claves": ["seguro", "aseguradora", "gastos médicos", "reembolso", "imss", "issste", "médica"],
        "respuesta": (
            "Actualmente no tenemos convenio directo con aseguradoras ni con el IMSS/ISSSTE, "
            "pero sí emitimos facturas fiscales para que puedas tramitar el reembolso con tu aseguradora 🧾\n\n"
            "Solo necesitamos tu RFC y correo electrónico al momento del pago.\n\n"
            "¿Tienes alguna otra duda o te gustaría agendar una cita?"
        ),
    },
    {
        "claves": ["pago", "pagar", "tarjeta", "efectivo", "transferencia", "mercado pago", "oxxo"],
        "respuesta": (
            "Aceptamos varias formas de pago 💳\n\n"
            "✅ Efectivo\n"
            "✅ Tarjeta de crédito o débito (sin comisión)\n"
            "✅ Transferencia bancaria\n"
            "✅ Clip / Mercado Pago\n"
            "❌ No manejamos OXXO Pay aún\n\n"
            "También emitimos facturas fiscales. ¿Hay algo más en que pueda ayudarte?"
        ),
    },
    {
        "claves": ["médico", "doctor", "especialista", "quién atiende", "quien atiende"],
        "respuesta": (
            "Nuestro equipo médico 👨‍⚕️👩‍⚕️\n\n"
            "🩺 Dr. Roberto Herrera — Medicina General\n"
            "👶 Dra. Carmen Vázquez — Pediatría\n"
            "🥗 Lic. Sofía Morales — Nutrición\n"
            "🧠 Psic. Andrés López — Psicología\n"
            "🦷 Dr. Miguel Santana — Odontología\n\n"
            "Todos con años de experiencia y certificaciones vigentes. "
            "¿Con cuál de ellos te puedo agendar?"
        ),
    },
    {
        "claves": ["gracias", "muchas gracias", "ok", "perfecto", "listo", "genial", "excelente"],
        "respuesta": (
            "¡Con mucho gusto! 😊 Es un placer ayudarte.\n\n"
            "Si en algún momento necesitas agendar una cita, preguntar por algún servicio "
            "o tienes cualquier duda, aquí estoy.\n\n"
            "¡Que tengas un excelente día! 🌟"
        ),
    },
    {
        "claves": ["cancelar", "cancelación", "reagendar", "cambiar cita"],
        "respuesta": (
            "Claro, sin problema 📅 Puedes cancelar o reagendar tu cita sin costo.\n\n"
            "Solo te pedimos hacerlo con al menos 3 horas de anticipación para que "
            "otro paciente pueda tomar ese espacio.\n\n"
            "Para hacer el cambio necesito:\n"
            "• Nombre del paciente\n"
            "• Fecha y hora de la cita actual\n"
            "• (Si reagendas) El nuevo día y hora de preferencia\n\n"
            "¿Me compartes esos datos?"
        ),
    },
]

RESPUESTA_DEFAULT = (
    "Gracias por tu mensaje 😊 Déjame orientarte mejor.\n\n"
    "En Clínica MediVida puedo ayudarte con:\n"
    "📅 Agendar citas — Medicina General, Pediatría, Nutrición, Psicología, Odontología\n"
    "💰 Precios y servicios\n"
    "🔬 Laboratorio y estudios\n"
    "📍 Ubicación y horarios\n\n"
    "¿Sobre qué te puedo dar más información?"
)

# ─── Lógica de detección ──────────────────────────────────────────────────────

def _coincide(clave: str, msg_lower: str) -> bool:
    """Verifica que la clave coincida como palabra completa o frase."""
    import re
    # Para claves de 1-2 chars usar word boundary; para frases, coincidencia directa
    if len(clave) <= 3:
        return bool(re.search(rf'\b{re.escape(clave)}\b', msg_lower))
    return clave in msg_lower


def obtener_respuesta_demo(mensaje: str) -> str:
    msg_lower = mensaje.lower()
    mejor = None
    mejor_puntaje = 0
    for item in RESPUESTAS:
        puntaje = sum(1 for clave in item["claves"] if _coincide(clave, msg_lower))
        if puntaje > mejor_puntaje:
            mejor_puntaje = puntaje
            mejor = item
    return mejor["respuesta"] if mejor else RESPUESTA_DEFAULT


def imprimir_lento(texto: str, delay: float = 0.012):
    """Simula el efecto de escritura del agente."""
    for char in texto:
        print(char, end="", flush=True)
        time.sleep(delay)
    print()


# ─── Chat demo ────────────────────────────────────────────────────────────────

def main():
    print()
    print("=" * 60)
    print("   Clínica MediVida — Demo Agente Valeria")
    print("   (Modo demo — sin API key)")
    print("=" * 60)
    print()
    print("  Escribe mensajes como si fueras un paciente.")
    print("  Escribe 'salir' para terminar.")
    print()
    print("  Sugerencias para probar:")
    print("    • 'Hola'")
    print("    • 'Quiero agendar una cita con el pediatra'")
    print("    • '¿Cuánto cuesta una limpieza dental?'")
    print("    • '¿Hacen laboratorio?'")
    print("    • '¿Cuáles son los horarios?'")
    print("    • 'Mi hijo tiene fiebre de 39 grados'")
    print("    • '¿Trabajan con seguro médico?'")
    print()
    print("-" * 60)
    print()

    while True:
        try:
            mensaje = input("Tú: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\n\nDemo finalizado.")
            break

        if not mensaje:
            continue

        if mensaje.lower() == "salir":
            print("\nDemo finalizado. ¡Gracias por probar Clínica MediVida!")
            break

        time.sleep(0.4)  # simula latencia de red
        print()
        print("Valeria: ", end="", flush=True)
        imprimir_lento(obtener_respuesta_demo(mensaje))
        print()


if __name__ == "__main__":
    main()
