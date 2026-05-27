"""
Demo Restaurante El Criollo Venezuela — Sin API key requerida.
Uso: python tests/demo_restaurante.py
"""

import time, sys, os, re
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

RESPUESTAS = [
    {
        "claves": ["hola", "buenas", "buenos días", "buenas tardes", "buenas noches", "hey"],
        "intencion": None,
        "respuesta": (
            "¡Bienvenido a *El Criollo* 🇻🇪! Soy Luna, tu asistente.\n\n"
            "Somos un restaurante de comida venezolana tradicional en Las Mercedes, Caracas.\n"
            "Abrimos todos los días de 11am a 10pm.\n\n"
            "¿En qué puedo ayudarte?\n"
            "• 🍽️ Ver el menú\n"
            "• 🛵 Hacer un pedido para delivery\n"
            "• 📅 Reservar una mesa\n"
            "• 📍 Ubicación y horarios\n\n"
            "¿Qué deseas?"
        ),
    },
    {
        "claves": ["menú", "menu", "carta", "qué tienen", "que tienen", "qué sirven", "comida"],
        "intencion": None,
        "respuesta": (
            "Aquí nuestro menú 🍽️\n\n"
            "*🍳 Desayunos (11am–12pm)*\n"
            "• Arepa reina pepiada — $4\n"
            "• Arepa pabellón — $4.50\n"
            "• Cachapa con queso de mano — $5\n"
            "• Tequeños (6 unidades) — $4\n\n"
            "*🍖 Platos principales*\n"
            "• Pabellón criollo — $8\n"
            "• Asado negro con arroz y tajadas — $10\n"
            "• Pollo en salsa criolla — $9\n"
            "• Carne mechada con yuca — $8.50\n"
            "• Hallaca (temporada) — $3.50 c/u\n\n"
            "*🥗 Entradas*\n"
            "• Tostones con guasacaca — $3\n"
            "• Ensalada de gallina — $4\n\n"
            "*🍹 Bebidas*\n"
            "• Papelón con limón — $2\n"
            "• Jugo natural — $2.50\n"
            "• Malta — $1.50\n"
            "• Refresco — $1.50\n\n"
            "Todos los precios en USD 💵\n\n"
            "¿Te animas a pedir algo o prefieres reservar una mesa?"
        ),
    },
    {
        "claves": ["arepa", "arepas", "reina pepiada", "pabellón", "cachapa", "tequeño", "tequeños", "hallaca", "hallacas"],
        "intencion": None,
        "respuesta": (
            "¡Nuestras especialidades venezolanas! 🇻🇪\n\n"
            "• *Arepa reina pepiada* (pollo, aguacate, mayo) — $4\n"
            "• *Arepa pabellón* (carne mechada, caraotas, tajadas) — $4.50\n"
            "• *Cachapa con queso de mano* — $5\n"
            "• *Tequeños* (6 unidades) — $4\n"
            "• *Hallaca* (disponible todo el año) — $3.50 c/u\n\n"
            "¿Quieres hacer un pedido para delivery o reservar una mesa?"
        ),
    },
    {
        "claves": ["delivery", "domicilio", "a domicilio", "envío", "envio", "traer", "llevar"],
        "intencion": "pedido",
        "respuesta": (
            "Hacemos delivery en Caracas 🛵\n\n"
            "📍 Zonas de cobertura: Las Mercedes, Chacao, Altamira,\n"
            "   El Rosal, La Castellana, Chuao y zonas cercanas.\n\n"
            "⏱️ Tiempo de entrega: 30–45 minutos\n"
            "💵 Costo de delivery: $2 (gratis en pedidos mayores a $20)\n"
            "💳 Pago: Efectivo USD, Zelle, Pago Móvil, Binance Pay\n\n"
            "Para hacer tu pedido dime:\n"
            "• Tu *nombre*\n"
            "• Tu *dirección* de entrega\n"
            "• Lo que quieres pedir\n\n"
            "¿Qué te gustaría ordenar?"
        ),
    },
    {
        "claves": ["reserva", "reservar", "mesa", "reservación", "para cenar", "para almorzar"],
        "intencion": "reserva",
        "respuesta": (
            "Con gusto te aparto una mesa 📅\n\n"
            "📍 Estamos en Las Mercedes, Caracas\n"
            "🕐 Horario: Todos los días 11am–10pm\n"
            "👥 Capacidad: hasta 50 personas\n\n"
            "Para la reserva dime:\n"
            "• Tu *nombre*\n"
            "• *Fecha y hora*\n"
            "• *Número de personas*\n\n"
            "¿Me das esos datos?"
        ),
    },
    {
        "claves": ["precio", "costo", "cuánto", "cuanto", "cuánto cuesta", "cuánto vale"],
        "intencion": None,
        "respuesta": (
            "Nuestros precios en USD 💵\n\n"
            "• Arepas: $4–$4.50\n"
            "• Cachapa: $5\n"
            "• Platos principales: $8–$10\n"
            "• Entradas: $3–$4\n"
            "• Bebidas: $1.50–$2.50\n"
            "• Hallacas: $3.50 c/u\n\n"
            "Delivery: $2 (gratis en pedidos +$20)\n\n"
            "¿Quieres ver el menú completo o hacer un pedido?"
        ),
    },
    {
        "claves": ["pago", "pagar", "zelle", "efectivo", "pago móvil", "binance", "cripto"],
        "intencion": None,
        "respuesta": (
            "Aceptamos varios métodos de pago 💳\n\n"
            "✅ Efectivo USD\n"
            "✅ Zelle\n"
            "✅ Pago Móvil\n"
            "✅ Binance Pay (USDT)\n"
            "✅ Tarjeta de débito/crédito (punto de venta)\n\n"
            "¿Quieres hacer un pedido o reservar una mesa?"
        ),
    },
    {
        "claves": ["horario", "hora", "abierto", "abren", "cierran", "cuando abren"],
        "intencion": None,
        "respuesta": (
            "Nuestro horario 🕐\n\n"
            "📅 *Lunes a Jueves:* 11am – 9pm\n"
            "📅 *Viernes y Sábados:* 11am – 10:30pm\n"
            "📅 *Domingos:* 11am – 8pm\n\n"
            "Cocina cierra 30 minutos antes del cierre.\n"
            "Delivery disponible en todos los horarios.\n\n"
            "¿Quieres reservar o hacer un pedido?"
        ),
    },
    {
        "claves": ["dirección", "ubicación", "donde", "dónde", "cómo llegar", "mapa"],
        "intencion": None,
        "respuesta": (
            "📍 *Restaurante El Criollo*\n"
            "Calle La Trinidad, Las Mercedes, Caracas\n"
            "(Frente al Centro Comercial Las Mercedes)\n\n"
            "🅿️ Estacionamiento propio disponible\n"
            "📞 +58 412-888-3456\n\n"
            "¿Quieres reservar una mesa o prefieres delivery?"
        ),
    },
    {
        "claves": ["vegano", "vegetariano", "sin carne", "alérgico", "sin gluten", "dieta"],
        "intencion": None,
        "respuesta": (
            "¡Por supuesto! Tenemos opciones para todos 🥗\n\n"
            "*Opciones vegetarianas/veganas:*\n"
            "• Cachapa con queso de mano — $5\n"
            "• Arepa con guasacaca y aguacate — $4\n"
            "• Tostones con guasacaca — $3\n"
            "• Ensalada fresca — $4\n\n"
            "Para alergias o restricciones específicas, infórmanos al hacer tu pedido\n"
            "y el chef se asegura de prepararlo correctamente.\n\n"
            "¿Te gustaría ordenar algo?"
        ),
    },
    {
        "claves": ["evento", "eventos", "cumpleaños", "celebración", "celebrar", "grupo", "grupos"],
        "intencion": None,
        "respuesta": (
            "¡Hacemos eventos privados y celebraciones! 🎉\n\n"
            "• *Mesas grupales* (hasta 50 personas)\n"
            "• *Menú especial* para grupos con precio preferencial\n"
            "• *Decoración* básica incluida para cumpleaños\n"
            "• *Música en vivo* los fines de semana\n\n"
            "Para cotizar tu evento dime:\n"
            "• Fecha y horario\n"
            "• Número de personas\n"
            "• Tipo de evento\n\n"
            "¿Me das esos datos y te preparo una propuesta?"
        ),
    },
    {
        "claves": ["gracias", "muchas gracias", "perfecto", "genial", "excelente", "listo"],
        "intencion": None,
        "respuesta": (
            "¡Con mucho gusto! 😊 Es un placer atenderte.\n\n"
            "Recuerda que puedes seguirnos en Instagram: *@elcriollovzla*\n"
            "¡Buen provecho y hasta pronto! 🇻🇪🍽️"
        ),
    },
]

RESPUESTA_DEFAULT = (
    "Gracias por tu mensaje 😊 En El Criollo puedo ayudarte con:\n"
    "🍽️ Menú — 🛵 Delivery — 📅 Reservas — 📍 Ubicación\n\n"
    "¿Sobre qué necesitas información?"
)

DIAS_SEMANA = ["lunes", "martes", "miércoles", "miercoles", "jueves", "viernes", "sábado", "sabado", "domingo", "hoy", "mañana", "esta noche", "esta tarde"]
CONFIRMACIONES = ["sí", "si", "claro", "dale", "me interesa", "quiero", "va", "ok", "perfecto", "bueno"]


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
    skip = {"hola", "buenos", "buenas", "gracias", "quiero", "necesito", "para", "una", "un"}
    palabras = mensaje.strip().split()
    candidatos = [p for p in palabras if p[0].isupper() and len(p) > 2 and p.lower() not in skip]
    return " ".join(candidatos[:2]) if candidatos else mensaje.strip().title()


def generar_confirmacion_reserva(nombre, detalle, personas=""):
    return (
        f"¡Perfecto, {nombre}! 🎉 Tu reserva está confirmada.\n\n"
        f"📋 *Resumen de tu reserva:*\n"
        f"🍽️ Restaurante El Criollo\n"
        f"📅 {detalle}\n"
        f"{'👥 ' + personas + ' personas' + chr(10) if personas else ''}"
        f"📍 Calle La Trinidad, Las Mercedes, Caracas\n\n"
        f"Te esperamos puntual. Si necesitas cancelar avísanos con 2 horas de anticipación.\n"
        f"📞 +58 412-888-3456\n\n"
        f"¡Buen provecho de antemano! 🇻🇪😊"
    )


def generar_confirmacion_pedido(nombre, direccion, items):
    return (
        f"¡Listo, {nombre}! 🛵 Tu pedido está en camino.\n\n"
        f"📋 *Resumen del pedido:*\n"
        f"{items}\n"
        f"📍 Entrega en: {direccion}\n"
        f"⏱️ Tiempo estimado: 30–45 minutos\n\n"
        f"Te contactaremos al llegar.\n"
        f"📞 +58 412-888-3456\n\n"
        f"¡Buen provecho! 🍽️🇻🇪"
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
    datos_pedido = {}

    print()
    print("=" * 60)
    print("   Restaurante El Criollo 🇻🇪 — Demo Agente Luna")
    print("=" * 60)
    print()
    print("  Escribe como si fueras un cliente. 'salir' para terminar.")
    print()
    print("  Prueba: 'Hola'  |  'Quiero ver el menú'")
    print("          'Quiero delivery a Las Mercedes'")
    print("          'Reservar mesa para el viernes'  |  '¿Cuánto cuesta el pabellón?'")
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
        print("Luna: ", end="", flush=True)

        if estado == "pidiendo_datos_reserva":
            nueva = buscar_respuesta(msg)
            if nueva and nueva["intencion"] is None and not es_confirmacion(msg):
                estado = "general"
                escribir(nueva["respuesta"])
                print()
                continue

            tiene_dia = any(d in msg.lower() for d in DIAS_SEMANA)
            tiene_hora = bool(re.search(r'\d{1,2}(am|pm|:\d{2})', msg.lower()))
            tiene_personas = bool(re.search(r'\d+\s*(person|pax|comens)', msg.lower()))

            if tiene_dia or tiene_hora or len(msg.split()) >= 2:
                if nombre_cliente is None:
                    nombre_cliente = extraer_nombre(msg)
                detalle = msg if (tiene_dia or tiene_hora) else "Fecha por confirmar"
                personas_match = re.search(r'(\d+)\s*(person|pax|comens|person)', msg.lower())
                personas = personas_match.group(1) if personas_match else ""
                escribir(generar_confirmacion_reserva(nombre_cliente, detalle, personas))
                estado = "confirmada"
                nombre_cliente = None
            else:
                nombre_cliente = extraer_nombre(msg)
                escribir(
                    f"¡Perfecto, {nombre_cliente}! 😊\n\n"
                    f"¿Para qué *fecha, hora* y *cuántas personas*? Por ejemplo: *viernes a las 7pm para 4 personas*."
                )
            print()
            continue

        if estado == "pidiendo_datos_pedido":
            nueva = buscar_respuesta(msg)
            if nueva and nueva["intencion"] is None and not es_confirmacion(msg):
                estado = "general"
                escribir(nueva["respuesta"])
                print()
                continue

            if "nombre" not in datos_pedido:
                datos_pedido["nombre"] = extraer_nombre(msg)
                escribir(
                    f"Anotado, {datos_pedido['nombre']} 📝\n\n"
                    f"¿Cuál es tu *dirección* de entrega? (Sector/Calle, Caracas)"
                )
                print()
                continue
            elif "direccion" not in datos_pedido:
                datos_pedido["direccion"] = msg
                escribir(
                    f"Perfecto 📍 Entregamos en {msg}.\n\n"
                    f"¿Qué deseas ordenar? Puedes pedir varios platos.\n"
                    f"Ejemplo: *2 arepas pabellón, 1 pabellón criollo, 2 papelones*"
                )
                print()
                continue
            else:
                escribir(generar_confirmacion_pedido(
                    datos_pedido.get("nombre", "Cliente"),
                    datos_pedido.get("direccion", "dirección indicada"),
                    msg
                ))
                estado = "confirmada"
                datos_pedido = {}
                print()
                continue

        resultado = buscar_respuesta(msg)
        if resultado:
            escribir(resultado["respuesta"])
            if resultado.get("intencion") == "reserva":
                estado = "pidiendo_datos_reserva"
                nombre_cliente = None
            elif resultado.get("intencion") == "pedido":
                estado = "pidiendo_datos_pedido"
                datos_pedido = {}
        else:
            escribir(RESPUESTA_DEFAULT)
        print()


if __name__ == "__main__":
    main()
