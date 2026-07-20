# Landing Luchy — Mariale Velazco

Landing page de Mariale Velazco ("Aprende IA para tu negocio") implementada en
**Next.js 16 (App Router) + TypeScript + Tailwind CSS**, a partir del diseño
original `landing-luchy`.

## Estructura

```
landing-luchy/
├── app/
│   ├── layout.tsx        # Layout raíz + metadata
│   ├── page.tsx          # Composición de la página
│   └── globals.css       # Estilos base + clases de componente (btn-cta, etc.)
├── components/
│   ├── Hero.tsx          # Titular, subtítulo, video de YouTube y CTA
│   ├── LeadForm.tsx      # Formulario de captación (client component)
│   ├── Testimonials.tsx  # Grid de testimonios
│   ├── FinalCTA.tsx      # Llamada final con botón de WhatsApp
│   └── Footer.tsx        # Pie con enlaces sociales
└── lib/
    ├── site.ts           # Configuración central (WhatsApp, video, endpoint…)
    └── testimonials.ts   # Datos de los testimonios
```

## Cómo verlo en local

```bash
cd landing-luchy
npm install
npm run dev
```

Abre <http://localhost:3000>.

## Build de producción

```bash
npm run build
npm run start
```

## Configuración

Casi todo el contenido editable está centralizado en `lib/site.ts`:

- `whatsappNumber` / `whatsappMessage` — número y mensaje del botón de WhatsApp.
- `youtubeId` — id del video del hero.
- `leadFormEndpoint` — endpoint del formulario (Google Apps Script). Reemplázalo
  por el tuyo.
- `social` — enlaces de Instagram, TikTok y Contacto (hoy apuntan a `#`).

Los testimonios están en `lib/testimonials.ts`.

## Publicar

El proyecto es un Next.js estándar y se despliega tal cual en **Vercel**:

1. Sube el repo a GitHub (rama actual: `claude/landing-luchy-implementation-togdxv`).
2. En Vercel, "New Project" → importa el repo → **Root Directory: `landing-luchy`**.
3. Framework: Next.js (autodetectado). Deploy.

## Notas de fidelidad al diseño

- **Tipografía:** el diseño original usa la pila del sistema (`Segoe UI`…). Se
  mantiene esa misma pila para reproducir exactamente lo que se ve en Windows;
  en macOS/Linux cae al sans-serif del sistema. Si prefieres una tipografía
  consistente entre dispositivos, se puede cambiar a Inter/Montserrat vía
  `next/font` en un paso.
- **Colores:** vinotinto `#8B2F3F`, dorado `#C4A050`, crema `#F5F1E8` (en
  `tailwind.config.ts`).
- **Formulario:** se envía al endpoint de Google Apps Script con `mode: "no-cors"`
  (Apps Script no expone cabeceras CORS), por lo que la respuesta es opaca y se
  asume éxito si la petición no falla. Se reemplazó el `alert()` original por un
  mensaje de confirmación en línea.
