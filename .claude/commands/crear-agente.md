# Skill: Crear Agente de IA en Cloudflare

## Propósito
Guiar a usuarios hispanohablantes sin experiencia técnica para construir agentes de IA automatizados que corren en Cloudflare Workers de forma independiente.

## Cuándo activar
- El usuario escribe `/crear-agente`
- El usuario dice "quiero automatizar X", "crea un agente que...", "quiero un programa que..."

## Principios de comunicación

- Asumir CERO conocimiento de programación
- Hablar en español (neutro latinoamericano / mexicano)
- Hacer UNA sola pregunta a la vez
- Esperar respuesta antes de continuar
- Traducir siempre los términos técnicos:
  - "API key" → "llave de acceso"
  - "deploy" → "publicar en internet"
  - "cron" → "calendario automático"
  - "environment variable" → "variable secreta"
  - "repository" → "carpeta del proyecto"
  - "npm install" → "instalar las herramientas"
  - "worker" → "programa que corre en la nube"
- Celebrar cada paso completado con entusiasmo
- Nunca mostrar llaves de acceso (API keys) en el chat
- Confirmar siempre antes de operaciones destructivas

## Stack tecnológico base

- **Cloudflare Workers** — donde corre el agente (gratis para empezar)
- **Cloudflare Agents SDK** — para construir el agente
- **OpenAI API** — para inteligencia artificial
- **Apify** — para extraer datos de internet (scraping)
- **Pushover** — para recibir notificaciones en el celular
- **Notion API** — para guardar resultados (opcional)

---

## Protocolo de 8 Fases

### FASE 1 — Bienvenida y verificación del entorno

Saluda con entusiasmo. Detecta el sistema operativo. Verifica que tiene instalado:
- Node.js (versión 18+)
- npm
- git

**Comandos de verificación:**
```bash
# Mac/Linux
node --version
npm --version
git --version

# Windows (PowerShell)
node --version
npm --version
git --version
```

Si falta algo, guía la instalación paso a paso con instrucciones simples.

---

### FASE 2 — Entrevista en lenguaje natural

Haz estas preguntas UNA A LA VEZ:

1. "¿Qué quieres que haga tu agente? Descríbelo como si le explicaras a un amigo."
2. "¿Con qué frecuencia debe funcionar? (cada hora, una vez al día, etc.)"
3. "¿De dónde va a obtener información? (un sitio web, redes sociales, tu email, etc.)"
4. "¿Qué debe hacer con esa información? (resumirla, alertarte, guardarla, publicarla)"
5. "¿A dónde quieres que lleguen los resultados? (celular, email, Notion, etc.)"

---

### FASE 3 — Propuesta de arquitectura

Con base en las respuestas, dibuja en texto simple el mapa del agente:

```
[Fuente de datos] → [Tu Agente en la Nube] → [Destino]
     ↑
[Calendario automático: cada X horas]
```

Explica qué servicios necesitará y por qué, con lenguaje simple. Pregunta si suena bien antes de continuar.

---

### FASE 4 — Obtener credenciales (llaves de acceso)

Guía la obtención de credenciales UNA A LA VEZ según lo que necesite el agente:

**Cloudflare (obligatorio):**
1. Ir a dash.cloudflare.com → crear cuenta gratuita
2. Obtener Account ID (lado derecho del dashboard)
3. Crear API Token: My Profile → API Tokens → Create Token → "Edit Cloudflare Workers"

**OpenAI (si usa IA):**
1. Ir a platform.openai.com → crear cuenta
2. Settings → API Keys → Create new secret key
3. Cargar $5-10 de crédito inicial

**Apify (si necesita scraping):**
1. Ir a apify.com → crear cuenta
2. Settings → Integrations → Personal API tokens

**Pushover (si quiere notificaciones):**
1. Descargar app Pushover en el celular
2. Crear cuenta en pushover.net
3. Copiar User Key y crear Application token

**Notion (si quiere guardar resultados):**
1. Crear integración en notion.so/my-integrations
2. Copiar el "Internal Integration Token"
3. Compartir la base de datos con la integración

---

### FASE 5 — Configurar el proyecto

```bash
# Crear carpeta del proyecto
mkdir mi-agente && cd mi-agente
npm init -y

# Instalar herramientas necesarias
npm install agents openai
npm install -g wrangler

# Iniciar sesión en Cloudflare
wrangler login
```

Crear archivo `wrangler.toml`:
```toml
name = "mi-agente"
main = "src/index.ts"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

[triggers]
crons = ["0 9 * * *"]  # Cada día a las 9am UTC

[vars]
# Variables públicas aquí

[[d1_databases]]
# Solo si necesita base de datos
```

Guardar secretos de forma segura:
```bash
wrangler secret put OPENAI_API_KEY
wrangler secret put APIFY_API_KEY
# (ingresa el valor cuando lo pida, no aparece en pantalla)
```

---

### FASE 6 — Generar el código del agente

Genera código TypeScript personalizado basado en las necesidades específicas del usuario. Estructura base:

```typescript
import { Agent } from "agents";

interface Env {
  OPENAI_API_KEY: string;
  // otras variables según necesidad
}

export default {
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    const agent = new MiAgente(env);
    await agent.ejecutar();
  }
};

class MiAgente extends Agent<Env> {
  async ejecutar() {
    // 1. Obtener datos
    const datos = await this.obtenerDatos();
    
    // 2. Procesar con IA
    const resultado = await this.procesarConIA(datos);
    
    // 3. Enviar resultado
    await this.enviarResultado(resultado);
  }

  async obtenerDatos() {
    // Lógica específica del usuario
  }

  async procesarConIA(datos: any) {
    // Llamada a OpenAI
  }

  async enviarResultado(resultado: string) {
    // Notificación o guardado
  }
}
```

Adaptar el código completamente a lo que el usuario describió en la Fase 2.

---

### FASE 7 — Prueba local

```bash
# Correr el agente en la computadora
npx wrangler dev

# Probar manualmente (en otra terminal)
curl "http://localhost:8787/__scheduled?cron=*+*+*+*+*"
```

Si hay errores, interpretar el mensaje de error en español simple y guiar la corrección.

---

### FASE 8 — Publicar en internet y celebrar

```bash
# Publicar el agente
npx wrangler deploy

# Verificar que está corriendo
wrangler tail
```

Confirmar que el agente está activo:
- Mostrar la URL del worker
- Explicar cómo ver los logs: Cloudflare Dashboard → Workers → mi-agente → Logs
- Explicar cómo detenerlo si quiere: `wrangler delete`

**¡Celebrar con el usuario!** Su agente ya está corriendo en internet de forma autónoma.

---

## Arquitecturas de referencia

### Agente de monitoreo de menciones
Apify (Twitter/X scraping) → OpenAI (análisis de sentimiento) → Pushover (alerta si menciona tu marca)

### Resumen diario de noticias
Apify (RSS/sitios de noticias) → OpenAI (resumen ejecutivo) → Email/Notion

### Monitor de cambios en sitios web
Cloudflare KV (guardar versión anterior) → Fetch (obtener página actual) → OpenAI (detectar cambios importantes) → Pushover

### Generador de ideas de contenido
OpenAI (generar ideas basadas en tendencias) → Notion (guardar en base de datos de contenido)

---

## Costos aproximados

| Servicio | Costo inicial | Mensual |
|----------|--------------|---------|
| Cloudflare Workers | $0 | $0 (hasta 100k requests) |
| OpenAI | $5-10 carga inicial | $1-3 uso típico |
| Apify | $0 | $0-5 según uso |
| Pushover | $5 (único pago) | $0 |
| **Total** | **~$10** | **$1-5** |

---

## Solución de problemas comunes

**"wrangler: command not found"**
→ Ejecutar: `npm install -g wrangler` y reiniciar la terminal

**"Error: Authentication error" en OpenAI**
→ Verificar que la llave fue guardada: `wrangler secret list`
→ Re-ingresar: `wrangler secret put OPENAI_API_KEY`

**"Script startup exceeded CPU time limit"**
→ El código tiene un bucle infinito o proceso muy largo
→ Revisar que no haya `while(true)` sin condición de salida

**"Error 1101: Worker threw unhandled exception"**
→ Ver logs detallados: `wrangler tail --format=pretty`
→ Agregar try/catch alrededor del código que falla

**El agente no se ejecuta a la hora programada**
→ Verificar el cron en wrangler.toml (usa hora UTC, no local)
→ Revisar en Dashboard → Workers → Triggers
