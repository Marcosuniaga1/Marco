#!/usr/bin/env python3
"""
demo_ai_server.py — Local HTTP server for AI-powered WhatsApp demos.
Serves static HTML files + POST /api/chat endpoint backed by Claude API.

Usage:
    python demo_ai_server.py --demo clinica
    python demo_ai_server.py --demo inmobiliaria
    python demo_ai_server.py --demo restaurante
"""

import argparse
import json
import os
import sys
import threading
import webbrowser
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse

try:
    import anthropic
except ImportError:
    print("\n  ERROR: La librería 'anthropic' no está instalada.")
    print("  Ejecuta:  pip install anthropic\n")
    sys.exit(1)

PORT = 8765

# ─── System prompts ────────────────────────────────────────────────────────────

CLINICA_PROMPT = """Eres Valeria, la asistente virtual de la Clínica MediVida vía WhatsApp.
Tu tono es cálido, empático, profesional y ligeramente cercano — como una recepcionista de salud que realmente se preocupa por el paciente.

━━━━━━━━━━━━━━━━ CLÍNICA MEDIVIDA ━━━━━━━━━━━━━━━━
Especialidades disponibles y sus médicos:
• Medicina General — Dra. Ana López | $15 USD | Lun–Vie 8am–6pm
• Cardiología — Dr. Javier Rodríguez | $45 USD | Mar y Jue 8am–4pm (incluye ECG básico)
• Neurología — Dr. Ricardo Ramírez | $50 USD | Mar, Jue y Vie 9am–3pm
• Pediatría — Dr. Carlos Martínez | $30 USD | Lun, Mié y Vie 9am–5pm · Sáb 10am–2pm
• Traumatología — Dr. Héctor Torres | $40 USD | Lun, Mié y Vie 8am–2pm
• Oftalmología — Dra. Luisa Pérez | $35 USD | Mar y Jue 9am–1pm · Sáb 9am–12pm

Laboratorio y servicios:
• Hemograma completo $8 · Glucosa $4 · Panel lipídico $12 · Perfil tiroideo $18
• Resultados en 4–6 horas, online o en clínica

Ubicación: Av. Central 412, piso 2. Tel: 555-0100. Lun–Vie 7:30am–7pm, Sáb 8am–2pm.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REGLAS IMPORTANTES:
1. Si el paciente pregunta por una especialidad que NO ofrecemos (dermatología, psicología, ginecología, urología, odontología, etc.), responde así:
   - Reconoce su necesidad con empatía ("Entiendo, es importante que te atiendas...")
   - Diles claramente que esa especialidad no está disponible
   - Menciona 2–3 especialidades que sí tenemos que podrían estar relacionadas o ser útiles
   - Invita a agendar una cita con Medicina General como punto de partida
   Ejemplo: "Entiendo que necesitas ver un dermatólogo — lamentablemente no contamos con esa especialidad todavía. Lo que sí tenemos es Medicina General, que puede evaluar tu piel y referirte si es necesario, y Medicina Interna para casos más complejos. ¿Te gustaría agendar con la Dra. Ana López como primer paso?"

2. Entiende mensajes con errores ortográficos, abreviaturas o lenguaje informal. Interpreta la intención, no la literalidad.

3. Guía siempre hacia: agendar una cita, hacer un examen de laboratorio, o al menos programar una llamada.

4. Para confirmar una cita, pide solo: nombre completo, especialidad, día y hora preferida.

5. Usa emojis con moderación (1–2 por mensaje máximo). Mensajes cortos y claros, nunca más de 5 párrafos.

6. Si el usuario envía "[INICIO]", saluda calurosamente, preséntate y presenta las opciones principales.

Cuando no entiendas algo, pregunta de forma amable y natural: "¿Me podrías aclarar un poco más qué necesitas?"
"""

INMOBILIARIA_PROMPT = """Eres Carlos, el asesor virtual de ProHogar Inmobiliaria vía WhatsApp.
Tu tono es profesional, confiable y orientado a soluciones — como un agente inmobiliario experimentado que escucha antes de ofrecer.

━━━━━━━━━━━━━━━━ PROHOGAR INMOBILIARIA ━━━━━━━━━━━━━━━━
Propiedades en venta destacadas:
• Casa Zona Norte | 3 hab, 2 baños, 180m² | $145,000 | Piscina, cochera doble
• Apartamento Centro | 2 hab, 1 baño, 85m² | $78,500 | Piso 5, vistas panorámicas
• Casa Residencial Las Palmas | 4 hab, 3 baños, 250m² | $220,000 | Jardín privado
• Local Comercial Av. Principal | 60m² | $95,000 | Alta circulación peatonal

Propiedades en alquiler:
• Apartamento amoblado Miraflores | 1 hab, 45m² | $350/mes | Incluye servicios
• Casa familiar Urb. El Pinar | 3 hab, 2 baños, 150m² | $600/mes | Garaje
• Oficina ejecutiva Centro Empresarial | 40m² | $450/mes | Recepción compartida

Servicios:
• Asesoría de compra/venta con acompañamiento legal
• Gestión de alquiler (búsqueda + contratos)
• Valuación de propiedades
• Financiamiento: alianzas con Banco Nacional y BancoPro (hasta 20 años)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REGLAS IMPORTANTES:
1. Si preguntan por algo que no ofrecemos (arriendos vacacionales tipo Airbnb, propiedades en otras ciudades no mencionadas, terrenos industriales, etc.):
   - Reconoce la necesidad
   - Explica que no manejamos ese tipo de propiedad
   - Ofrece la alternativa más cercana de nuestro catálogo
   - Propón coordinar una llamada o visita para evaluar opciones juntos
   Ejemplo: "Arriendo vacacional no es algo que manejemos directamente, pero tenemos apartamentos amoblados en excelente ubicación que podrían funcionar para una estadía más larga. ¿Te ayuda eso, o prefieres que busquemos algo más específico?"

2. Entiende lenguaje informal, abreviaturas y errores de escritura. El cliente puede decir "qiero alquilar algo barato" y debes entenderlo perfectamente.

3. Siempre guía hacia: visita a la propiedad, llamada de asesoría, o solicitud de más información.

4. Para coordinar una visita, pide solo: nombre, tipo de propiedad de interés, disponibilidad horaria.

5. Usa emojis con moderación. Mensajes directos y accionables.

6. Si el usuario envía "[INICIO]", saluda con energía, preséntate y pregunta si buscan comprar, alquilar o vender.

Cuando no entiendas algo, pregunta: "¿Podrías darme un poco más de detalle para ayudarte mejor?"
"""

RESTAURANTE_PROMPT = """Eres Luna, la asistente virtual del Restaurante El Criollo vía WhatsApp.
Tu tono es alegre, cercano y gastronómico — como una anfitriona que ama la comida y quiere que cada visita sea especial.

━━━━━━━━━━━━━━━━ RESTAURANTE EL CRIOLLO ━━━━━━━━━━━━━━━━
🍽️ Menú destacado:
Entradas: Ceviche clásico $8 · Tequeños con guacamole $6 · Carpaccio de res $10
Platos principales:
• Pabellón criollo (punta trasera + caraotas + tajadas) $14
• Lomo a la criolla con arroz con coco $16
• Chuleta de cerdo con papas asadas $13
• Pasta al pesto con camarones $15
• Ensalada César con pollo a la parrilla $10
Postres: Tres leches $5 · Quesillo casero $4 · Mousse de chocolate $5
Bebidas: Jugos naturales $3 · Refrescos $2 · Agua $1.50 · Cóctel de bienvenida $6

📦 Delivery: Lunes a Domingo 12pm–10pm · Pedido mínimo $20 · Envío $2.50 zona centro
🪑 Reservas: Hasta 12 personas · Disponibilidad Lun–Dom 12pm–11pm
📍 Dirección: Calle Real 27, esquina con Av. Bolívar · Tel: 555-0200
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REGLAS IMPORTANTES:
1. Si preguntan por algo que no tenemos (sushi, pizza, comida china, vegana 100%, cocina japonesa, etc.):
   - Reconoce con simpatía que no tenemos eso
   - Describe brevemente nuestra propuesta (cocina criolla con sabores auténticos)
   - Sugiere el plato más parecido o que podría sorprender al cliente
   - Invita a una reserva o pedido para que lo descubran
   Ejemplo: "Sushi no manejamos, somos más de sabores latinoamericanos 😄 Pero si te gustan los sabores frescos del mar, nuestro ceviche clásico está increíble. ¿Te animas a probarlo?"

2. Comprende mensajes con errores, abreviaturas y lenguaje casual. "qiero pedir algo para llebar" es perfectamente válido.

3. Guía siempre hacia: hacer un pedido, reservar una mesa, o preguntar por el menú del día.

4. Para un pedido delivery: pide dirección, nombre y teléfono. Para reserva: nombre, número de personas, fecha y hora.

5. Menciona el ambiente y la experiencia del restaurante con entusiasmo natural, sin exagerar.

6. Si el usuario envía "[INICIO]", saluda con calor, menciona el nombre del restaurante y pregunta si quieren reservar, pedir delivery o consultar el menú.

Cuando no entiendas algo, pregunta con gracia: "¡Cuéntame más! ¿Qué necesitas exactamente?"
"""

SYSTEM_PROMPTS = {
    'clinica': CLINICA_PROMPT,
    'inmobiliaria': INMOBILIARIA_PROMPT,
    'restaurante': RESTAURANTE_PROMPT,
}

# ─── Closing instructions (appended to each prompt) ─────────────────────────────
# Tell Claude to "close" by calling the registration tool once it has the data.

CLOSING = {
    'clinica': (
        "\n\nCIERRE DE CITA:\n"
        "Cuando el paciente confirme una cita y ya tengas su nombre, la especialidad, "
        "el día y la hora, usa la herramienta 'agendar_cita' para registrarla. "
        "Si te falta algún dato, pídelo de forma natural antes de registrar. "
        "Después de registrar, confirma con un mensaje cálido y breve."
    ),
    'inmobiliaria': (
        "\n\nCIERRE DE VISITA:\n"
        "Cuando el cliente confirme una visita o asesoría y ya tengas su nombre, la "
        "propiedad o tipo de propiedad de interés, el día y la hora, usa la herramienta "
        "'agendar_visita' para registrarla. Si falta algún dato, pídelo con naturalidad "
        "antes de registrar. Después, confirma con un mensaje breve y profesional."
    ),
    'restaurante': (
        "\n\nCIERRE DE RESERVA O PEDIDO:\n"
        "Cuando el cliente confirme una RESERVA y tengas su nombre, número de personas, "
        "fecha y hora, usa 'registrar_reserva'. Cuando confirme un PEDIDO de delivery y "
        "tengas su nombre, los platos, la dirección y el teléfono, usa 'registrar_pedido'. "
        "Si falta un dato, pídelo con simpatía antes de registrar. Después, confirma con "
        "alegría y de forma breve."
    ),
}

# ─── Tool definitions per demo ──────────────────────────────────────────────────

TOOLS = {
    'clinica': [{
        'name': 'agendar_cita',
        'description': 'Registra una cita médica confirmada por el paciente. Úsala solo cuando el paciente haya confirmado y tengas todos los datos requeridos.',
        'input_schema': {
            'type': 'object',
            'properties': {
                'nombre': {'type': 'string', 'description': 'Nombre completo del paciente'},
                'especialidad': {'type': 'string', 'description': 'Especialidad médica de la cita'},
                'fecha': {'type': 'string', 'description': 'Día de la cita (ej. "lunes 2 de junio")'},
                'hora': {'type': 'string', 'description': 'Hora de la cita (ej. "10:00 am")'},
                'contacto': {'type': 'string', 'description': 'Teléfono u otro contacto (opcional)'},
            },
            'required': ['nombre', 'especialidad', 'fecha', 'hora'],
        },
    }],
    'inmobiliaria': [{
        'name': 'agendar_visita',
        'description': 'Registra una visita a una propiedad o una asesoría confirmada por el cliente. Úsala solo cuando el cliente haya confirmado y tengas todos los datos.',
        'input_schema': {
            'type': 'object',
            'properties': {
                'nombre': {'type': 'string', 'description': 'Nombre del cliente'},
                'propiedad': {'type': 'string', 'description': 'Propiedad o tipo de propiedad de interés'},
                'fecha': {'type': 'string', 'description': 'Día de la visita'},
                'hora': {'type': 'string', 'description': 'Hora de la visita'},
                'contacto': {'type': 'string', 'description': 'Teléfono u otro contacto (opcional)'},
            },
            'required': ['nombre', 'propiedad', 'fecha', 'hora'],
        },
    }],
    'restaurante': [
        {
            'name': 'registrar_reserva',
            'description': 'Registra una reserva de mesa confirmada por el cliente. Úsala solo cuando tengas todos los datos.',
            'input_schema': {
                'type': 'object',
                'properties': {
                    'nombre': {'type': 'string', 'description': 'Nombre del cliente'},
                    'personas': {'type': 'string', 'description': 'Número de personas'},
                    'fecha': {'type': 'string', 'description': 'Fecha de la reserva'},
                    'hora': {'type': 'string', 'description': 'Hora de la reserva'},
                    'contacto': {'type': 'string', 'description': 'Teléfono u otro contacto (opcional)'},
                },
                'required': ['nombre', 'personas', 'fecha', 'hora'],
            },
        },
        {
            'name': 'registrar_pedido',
            'description': 'Registra un pedido de delivery confirmado por el cliente. Úsala solo cuando tengas todos los datos.',
            'input_schema': {
                'type': 'object',
                'properties': {
                    'nombre': {'type': 'string', 'description': 'Nombre del cliente'},
                    'items': {'type': 'string', 'description': 'Platos pedidos'},
                    'direccion': {'type': 'string', 'description': 'Dirección de entrega'},
                    'contacto': {'type': 'string', 'description': 'Teléfono de contacto'},
                },
                'required': ['nombre', 'items', 'direccion'],
            },
        },
    ],
}

# Human-readable labels for each tool, shown on the confirmation card.
TOOL_LABELS = {
    'agendar_cita':      {'title': 'Cita agendada',      'icon': '📅'},
    'agendar_visita':    {'title': 'Visita agendada',    'icon': '🏠'},
    'registrar_reserva': {'title': 'Reserva confirmada', 'icon': '🪑'},
    'registrar_pedido':  {'title': 'Pedido registrado',  'icon': '📦'},
}

RESERVAS_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'reservas.json')


def guardar_reserva(demo, tipo, datos):
    """Append a confirmed booking to reservas.json and return the record."""
    import datetime
    record = {
        'demo': demo,
        'tipo': tipo,
        'datos': datos,
        'registrado': datetime.datetime.now().isoformat(timespec='seconds'),
    }
    try:
        if os.path.exists(RESERVAS_FILE):
            with open(RESERVAS_FILE, 'r', encoding='utf-8') as f:
                registros = json.load(f)
        else:
            registros = []
    except (json.JSONDecodeError, OSError):
        registros = []

    registros.append(record)
    with open(RESERVAS_FILE, 'w', encoding='utf-8') as f:
        json.dump(registros, f, ensure_ascii=False, indent=2)

    print(f'  ✓ {tipo} registrada → {datos}')
    return record


# ─── HTTP Handler ──────────────────────────────────────────────────────────────

class DemoHandler(SimpleHTTPRequestHandler):
    demo_name = 'clinica'

    def __init__(self, *args, **kwargs):
        # Serve files from the tests/ directory
        tests_dir = os.path.dirname(os.path.abspath(__file__))
        super().__init__(*args, directory=tests_dir, **kwargs)

    def log_message(self, fmt, *args):
        pass  # silence request logs

    def do_OPTIONS(self):
        self.send_response(200)
        self._cors_headers()
        self.end_headers()

    def do_POST(self):
        if urlparse(self.path).path == '/api/chat':
            self._handle_chat()
        else:
            self.send_response(404)
            self.end_headers()

    def _cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def _handle_chat(self):
        try:
            length = int(self.headers.get('Content-Length', 0))
            body = json.loads(self.rfile.read(length))
            demo = body.get('demo', self.demo_name)
            messages = body.get('messages', [])

            system_prompt = SYSTEM_PROMPTS.get(demo, CLINICA_PROMPT) + CLOSING.get(demo, '')
            tools = TOOLS.get(demo, [])

            client = anthropic.Anthropic()
            booking = None

            response = client.messages.create(
                model='claude-opus-4-7',
                max_tokens=512,
                system=system_prompt,
                messages=messages,
                tools=tools,
            )

            # Tool-use loop: execute any registration tool, feed results back,
            # then let Claude produce the final confirmation message.
            while response.stop_reason == 'tool_use':
                tool_results = []
                for block in response.content:
                    if block.type == 'tool_use':
                        record = guardar_reserva(demo, block.name, block.input)
                        label = TOOL_LABELS.get(block.name, {'title': 'Registro', 'icon': '✅'})
                        booking = {
                            'tipo': block.name,
                            'titulo': label['title'],
                            'icono': label['icon'],
                            'datos': record['datos'],
                        }
                        tool_results.append({
                            'type': 'tool_result',
                            'tool_use_id': block.id,
                            'content': 'Registrado correctamente en el sistema.',
                        })
                messages.append({'role': 'assistant', 'content': response.content})
                messages.append({'role': 'user', 'content': tool_results})
                response = client.messages.create(
                    model='claude-opus-4-7',
                    max_tokens=512,
                    system=system_prompt,
                    messages=messages,
                    tools=tools,
                )

            reply = ''.join(b.text for b in response.content if b.type == 'text')

            self.send_response(200)
            self._cors_headers()
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps({'reply': reply, 'booking': booking}).encode('utf-8'))

        except anthropic.AuthenticationError:
            self._error(401, 'ANTHROPIC_API_KEY inválida o no configurada.')
        except Exception as exc:
            self._error(500, str(exc))

    def _error(self, code, msg):
        self.send_response(code)
        self._cors_headers()
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.end_headers()
        self.wfile.write(json.dumps({'error': msg}).encode('utf-8'))


# ─── Entry point ───────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description='Demo AI Server para AgentKit')
    parser.add_argument('--demo', choices=['clinica', 'inmobiliaria', 'restaurante'],
                        default='clinica', help='Demo a abrir en el navegador')
    parser.add_argument('--no-browser', action='store_true', help='No abrir navegador automáticamente')
    args = parser.parse_args()

    api_key = os.environ.get('ANTHROPIC_API_KEY', '')
    if not api_key:
        print('\n  AVISO: La variable ANTHROPIC_API_KEY no está definida.')
        print('  Configúrala con:  set ANTHROPIC_API_KEY=sk-ant-...\n')
        print('  El servidor iniciará de todas formas, pero las respuestas fallarán.\n')

    DemoHandler.demo_name = args.demo
    html_file = {
        'clinica': 'demo_clinica_visual.html',
        'inmobiliaria': 'demo_inmobiliaria_visual.html',
        'restaurante': 'demo_restaurante_visual.html',
    }[args.demo]

    server = HTTPServer(('localhost', PORT), DemoHandler)

    url = f'http://localhost:{PORT}/{html_file}'
    demos = {'clinica': 'Clínica MediVida', 'inmobiliaria': 'ProHogar Inmobiliaria', 'restaurante': 'Restaurante El Criollo'}
    print(f'\n  ✓ Servidor iniciado — Demo: {demos[args.demo]}')
    print(f'  → {url}')
    print(f'  Presiona Ctrl+C para detener.\n')

    if not args.no_browser:
        Timer(0.8, lambda: webbrowser.open(url)).start()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n  Servidor detenido.')


if __name__ == '__main__':
    main()
