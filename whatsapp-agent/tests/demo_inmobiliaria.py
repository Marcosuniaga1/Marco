"""
Demo Inmobiliaria ProHogar Venezuela — Sin API key requerida.
Uso: python tests/demo_inmobiliaria.py
"""

import time, sys, os, re
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

AGENTE = "Carlos"
EMPRESA = "ProHogar Inmobiliaria"

PROPIEDADES_DISPONIBLES = [
    {"tipo": "Apartamento", "sector": "Altamira, Caracas", "hab": 3, "precio": "$85,000", "alquiler": "$650/mes"},
    {"tipo": "Casa",        "sector": "El Hatillo, Caracas", "hab": 4, "precio": "$140,000", "alquiler": "$900/mes"},
    {"tipo": "Apartamento", "sector": "Las Mercedes, Caracas", "hab": 2, "precio": "$62,000", "alquiler": "$480/mes"},
    {"tipo": "Local comercial", "sector": "Chacao, Caracas", "hab": 0, "precio": "$95,000", "alquiler": "$750/mes"},
    {"tipo": "Apartamento", "sector": "Valencia, Carabobo", "hab": 3, "precio": "$55,000", "alquiler": "$400/mes"},
    {"tipo": "Casa",        "sector": "Maracaibo, Zulia", "hab": 4, "precio": "$70,000", "alquiler": "$520/mes"},
]

RESPUESTAS = [
    {
        "claves": ["hola", "buenas", "buenos días", "buenas tardes", "buenas noches", "hey"],
        "intencion": None,
        "respuesta": (
            "¡Hola! Bienvenido a *ProHogar Inmobiliaria* 🏠\n\n"
            "Soy Carlos, tu asesor virtual. Llevamos más de 10 años ayudando a familias venezolanas\n"
            "a encontrar su hogar ideal en Caracas, Valencia, Maracaibo y más.\n\n"
            "¿En qué puedo ayudarte?\n"
            "• 🏠 Ver propiedades disponibles\n"
            "• 💰 Consultar precios de venta o alquiler\n"
            "• 📋 Agendar una visita\n"
            "• 📄 Información sobre trámites y documentos\n\n"
            "¿Qué estás buscando?"
        ),
    },
    {
        "claves": ["comprar", "venta", "adquirir", "quiero comprar", "precio de venta"],
        "intencion": "venta",
        "respuesta": (
            "Excelente decisión 🏠 Tenemos propiedades en venta en las mejores zonas:\n\n"
            "📍 *Caracas:*\n"
            "• Apto 3 hab — Altamira → $85,000\n"
            "• Casa 4 hab — El Hatillo → $140,000\n"
            "• Apto 2 hab — Las Mercedes → $62,000\n"
            "• Local comercial — Chacao → $95,000\n\n"
            "📍 *Interior del país:*\n"
            "• Apto 3 hab — Valencia → $55,000\n"
            "• Casa 4 hab — Maracaibo → $70,000\n\n"
            "Todos los precios en *USD*. Aceptamos pago en divisas, zelle y cripto.\n\n"
            "¿Cuál sector te interesa o cuál es tu presupuesto aproximado?"
        ),
    },
    {
        "claves": ["alquilar", "alquiler", "arrendar", "arriendo", "renta", "rentar"],
        "intencion": "alquiler",
        "respuesta": (
            "Tenemos excelentes opciones en alquiler 🔑\n\n"
            "📍 *Caracas:*\n"
            "• Apto 3 hab — Altamira → $650/mes\n"
            "• Casa 4 hab — El Hatillo → $900/mes\n"
            "• Apto 2 hab — Las Mercedes → $480/mes\n"
            "• Local comercial — Chacao → $750/mes\n\n"
            "📍 *Interior:*\n"
            "• Apto 3 hab — Valencia → $400/mes\n"
            "• Casa 4 hab — Maracaibo → $520/mes\n\n"
            "Contratos mínimos de 6 meses. Depósito equivalente a 2 mensualidades.\n\n"
            "¿Cuántas habitaciones necesitas y en qué zona?"
        ),
    },
    {
        "claves": ["visita", "ver la propiedad", "visitar", "conocer", "mostrar"],
        "intencion": "visita",
        "respuesta": (
            "Con mucho gusto coordinamos una visita 📅\n\n"
            "Realizamos visitas de Lunes a Sábado, 9am a 5pm.\n\n"
            "Para agendarla necesito:\n"
            "• Tu *nombre completo*\n"
            "• La propiedad o zona de tu interés\n"
            "• El *día y hora* que te viene bien\n"
            "• Tu número de teléfono de contacto\n\n"
            "¿Me das esos datos?"
        ),
    },
    {
        "claves": ["altamira", "hatillo", "mercedes", "chacao", "chacaíto", "caracas"],
        "intencion": "zona_caracas",
        "respuesta": (
            "Tenemos propiedades disponibles en Caracas 📍\n\n"
            "• *Altamira* — Apto 3 hab | Venta: $85,000 | Alquiler: $650/mes\n"
            "• *Las Mercedes* — Apto 2 hab | Venta: $62,000 | Alquiler: $480/mes\n"
            "• *El Hatillo* — Casa 4 hab | Venta: $140,000 | Alquiler: $900/mes\n"
            "• *Chacao* — Local comercial | Venta: $95,000 | Alquiler: $750/mes\n\n"
            "¿Te interesa alguna en particular? Puedo darte más detalles o agendarte una visita."
        ),
    },
    {
        "claves": ["valencia", "carabobo", "maracaibo", "zulia", "interior"],
        "intencion": "zona_interior",
        "respuesta": (
            "Tenemos propiedades disponibles en el interior del país 📍\n\n"
            "• *Valencia, Carabobo* — Apto 3 hab | Venta: $55,000 | Alquiler: $400/mes\n"
            "• *Maracaibo, Zulia* — Casa 4 hab | Venta: $70,000 | Alquiler: $520/mes\n\n"
            "¿Te interesa alguna? Puedo coordinar una visita o enviarte fotos y video por WhatsApp."
        ),
    },
    {
        "claves": ["precio", "costo", "cuánto", "cuanto", "cuánto vale", "presupuesto"],
        "intencion": None,
        "respuesta": (
            "Nuestros precios van desde 💰\n\n"
            "🏠 *En venta:* desde $55,000 hasta $140,000 USD\n"
            "🔑 *En alquiler:* desde $400 hasta $900 USD/mes\n\n"
            "Todos los inmuebles incluyen:\n"
            "✅ Avalúo actualizado\n"
            "✅ Estudio de título\n"
            "✅ Asesoría en el proceso de compra/venta\n\n"
            "Aceptamos: Zelle, transferencia bancaria, USDT, y efectivo USD.\n\n"
            "¿Cuál es tu rango de presupuesto? Así te busco la mejor opción."
        ),
    },
    {
        "claves": ["documentos", "trámites", "papeles", "requisitos", "contrato"],
        "intencion": None,
        "respuesta": (
            "Para comprar/vender una propiedad en Venezuela necesitas 📄\n\n"
            "*Para el comprador:*\n"
            "• Cédula de identidad vigente\n"
            "• RIF actualizado\n"
            "• Referencias bancarias\n"
            "• Declaración de origen de fondos\n\n"
            "*Para el vendedor:*\n"
            "• Documento de propiedad original\n"
            "• Solvencia de derecho de frente\n"
            "• Solvencia HIDROCAPITAL y electricidad\n"
            "• RIF del inmueble\n"
            "• Cédula catastral\n\n"
            "Nosotros te guiamos en cada paso. ¿Estás en proceso de compra o venta?"
        ),
    },
    {
        "claves": ["comisión", "honorarios", "cobran por", "cuánto cobran"],
        "intencion": None,
        "respuesta": (
            "Nuestra comisión es estándar del mercado venezolano 💼\n\n"
            "• *Venta:* 3% del precio final (se divide entre comprador y vendedor)\n"
            "• *Alquiler:* 1 mensualidad por cierre del contrato\n"
            "• *Avalúo independiente:* $80 USD\n\n"
            "No cobramos nada por adelantado. Solo al cierre exitoso de la operación.\n\n"
            "¿Te gustaría que evaluemos tu propiedad sin compromiso?"
        ),
    },
    {
        "claves": ["vender mi", "poner en venta", "quiero vender", "alquilar mi"],
        "intencion": "captar",
        "respuesta": (
            "Perfecto, podemos ayudarte a vender o alquilar tu propiedad 🏠\n\n"
            "Nuestro servicio incluye:\n"
            "• Avalúo profesional del inmueble\n"
            "• Fotografía y video profesional\n"
            "• Publicación en portales y redes sociales\n"
            "• Atención a compradores/inquilinos\n"
            "• Acompañamiento en todo el proceso legal\n\n"
            "Para comenzar necesito:\n"
            "• Tu *nombre*\n"
            "• Tipo y ubicación del inmueble\n"
            "• Tu número de contacto\n\n"
            "¿Me das esos datos y te contactamos hoy mismo?"
        ),
    },
    {
        "claves": ["habitación", "habitaciones", "cuartos", "3 hab", "4 hab", "2 hab", "2 habitaciones", "3 habitaciones", "4 habitaciones"],
        "intencion": None,
        "respuesta": (
            "Tenemos opciones según el número de habitaciones 🛏️\n\n"
            "• *2 habitaciones:* Las Mercedes → $62,000 venta / $480 alquiler\n"
            "• *3 habitaciones:* Altamira → $85,000 / $650 | Valencia → $55,000 / $400\n"
            "• *4 habitaciones:* El Hatillo → $140,000 / $900 | Maracaibo → $70,000 / $520\n\n"
            "¿Cuántas habitaciones necesitas y si es para compra o alquiler?"
        ),
    },
    {
        "claves": ["gracias", "muchas gracias", "perfecto", "genial", "excelente", "listo"],
        "intencion": None,
        "respuesta": (
            "¡Con mucho gusto! 😊 Es un placer ayudarte.\n\n"
            "Recuerda que en ProHogar estamos disponibles de Lunes a Sábado 9am–6pm.\n"
            "📞 +58 412-555-7890 | 📍 Av. Francisco de Miranda, Chacao, Caracas\n\n"
            "¡Hasta pronto! 🏠"
        ),
    },
]

RESPUESTA_DEFAULT = (
    "Gracias por tu mensaje 😊 En ProHogar puedo ayudarte con:\n"
    "🏠 Propiedades en venta o alquiler\n"
    "📅 Visitas a inmuebles\n"
    "📄 Trámites y documentación\n"
    "💰 Avalúos y comisiones\n\n"
    "¿Sobre qué necesitas información?"
)

DIAS_SEMANA = ["lunes", "martes", "miércoles", "miercoles", "jueves", "viernes", "sábado", "sabado", "hoy", "mañana", "esta semana"]
CONFIRMACIONES = ["sí", "si", "claro", "dale", "me interesa", "quiero", "ese", "va", "ok", "perfecto"]


def coincide(clave, msg):
    if len(clave) <= 4:
        return bool(re.search(rf'\b{re.escape(clave)}\b', msg))
    return clave in msg


def buscar_respuesta(mensaje):
    msg = mensaje.lower()
    mejor, puntaje_max = None, 0
    for item in RESPUESTAS:
        puntaje = sum(1 for c in item["claves"] if coincide(c, msg))
        if puntaje > puntaje_max:
            puntaje_max, mejor = puntaje, item
    return mejor if mejor else None


def es_confirmacion(mensaje):
    msg = mensaje.lower()
    return any(c in msg for c in CONFIRMACIONES + DIAS_SEMANA)


def extraer_nombre(mensaje):
    skip = {"hola", "buenos", "buenas", "gracias", "quiero", "necesito", "tengo", "para", "busco"}
    palabras = mensaje.strip().split()
    candidatos = [p for p in palabras if p[0].isupper() and len(p) > 2 and p.lower() not in skip]
    return " ".join(candidatos[:2]) if candidatos else mensaje.strip().title()


def generar_confirmacion_visita(nombre, detalle):
    return (
        f"¡Perfecto, {nombre}! 🎉 Tu visita está agendada.\n\n"
        f"📋 *Resumen:*\n"
        f"👤 Asesor: Carlos Rodríguez\n"
        f"📅 {detalle}\n"
        f"📍 Nos encontramos en la propiedad o en nuestra oficina:\n"
        f"   Av. Francisco de Miranda, Chacao, Caracas\n\n"
        f"Te llamaremos 1 hora antes para confirmar.\n"
        f"📞 +58 412-555-7890\n\n"
        f"¡Te esperamos! Cualquier duda escríbenos 😊"
    )


def escribir(texto):
    for c in texto:
        print(c, end="", flush=True)
        time.sleep(0.011)
    print()


def main():
    estado = "general"
    intencion_actual = None
    nombre_cliente = None

    print()
    print("=" * 60)
    print("   ProHogar Inmobiliaria Venezuela — Demo Agente Carlos")
    print("=" * 60)
    print()
    print("  Escribe como si fueras un cliente. 'salir' para terminar.")
    print()
    print("  Prueba: 'Hola'  |  'Quiero alquilar un apartamento en Caracas'")
    print("          '¿Cuánto cuestan las casas en El Hatillo?'")
    print("          'Quiero vender mi casa'  |  '¿Qué documentos necesito?'")
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
        print("Carlos: ", end="", flush=True)

        if estado == "pidiendo_datos":
            nueva = buscar_respuesta(msg)
            if nueva and nueva["intencion"] is None and not es_confirmacion(msg):
                estado = "general"
                intencion_actual = None
                escribir(nueva["respuesta"])
                print()
                continue

            tiene_dia = any(d in msg.lower() for d in DIAS_SEMANA)
            tiene_hora = bool(re.search(r'\d{1,2}(am|pm|:\d{2})', msg.lower()))

            if tiene_dia or tiene_hora or len(msg.split()) >= 2:
                if nombre_cliente is None:
                    nombre_cliente = extraer_nombre(msg)
                detalle = msg if (tiene_dia or tiene_hora) else "Fecha por confirmar — te contactaremos"
                escribir(generar_confirmacion_visita(nombre_cliente, detalle))
                estado = "confirmada"
                nombre_cliente = None
                intencion_actual = None
            else:
                nombre_cliente = extraer_nombre(msg)
                escribir(
                    f"Perfecto, {nombre_cliente} 😊\n\n"
                    f"¿Qué día y hora te viene bien para la visita? Por ejemplo: *jueves a las 3pm* o *sábado en la mañana*."
                )
            print()
            continue

        resultado = buscar_respuesta(msg)
        if resultado:
            escribir(resultado["respuesta"])
            if resultado.get("intencion") == "visita":
                estado = "pidiendo_datos"
                nombre_cliente = None
        else:
            escribir(RESPUESTA_DEFAULT)
        print()


if __name__ == "__main__":
    main()
