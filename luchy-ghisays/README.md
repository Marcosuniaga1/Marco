# Luchy Ghisays — Landing "Las 10 señales de que estás en automático"

Landing page de captación (lead magnet PDF) de **Luchy Ghisays**, implementada
en **Next.js 16 (App Router) + TypeScript**, a partir del diseño original
`Luchy_Ghisays__Landing.html` exportado desde Claude Design.

## Estructura

```
luchy-ghisays/
├── app/
│   ├── layout.tsx        # Fuente Archivo (next/font) + GA4 + metadata
│   ├── page.tsx          # Composición de la landing
│   ├── globals.css       # CSS del diseño original (fiel)
│   └── gracias/
│       └── page.tsx      # Página de agradecimiento (tras enviar el formulario)
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx          # Titular + formulario (variante hero)
│   ├── LeadForm.tsx      # Formulario reutilizable (client component)
│   ├── Problema.tsx
│   ├── Magnet.tsx        # Las 10 señales
│   ├── FormSection.tsx   # Formulario (variante tarjeta)
│   ├── Steps.tsx
│   ├── Testimonials.tsx
│   ├── Faq.tsx
│   └── Footer.tsx
└── lib/
    └── site.ts           # Endpoint, GA id y todos los textos editables
```

## Cómo verlo en local

```bash
cd luchy-ghisays
npm install
npm run dev
```

Abre <http://localhost:3000>.

## Build de producción

```bash
npm run build
npm run start
```

## Configuración (lib/site.ts)

- `leadFormEndpoint` — endpoint de Google Apps Script al que se envían los leads.
- `gaId` — ID de Google Analytics 4 (`G-JJ6E0H1JW2`).
- `signals`, `steps`, `problems`, `faqs` — todos los textos de la página.

## Publicar en Vercel

1. En Vercel: **New Project** → importa el repo `Marcosuniaga1/Marco`.
2. **Root Directory:** `luchy-ghisays`.
3. **Framework Preset:** Next.js (lo fuerza también `vercel.json`).
4. Deploy. (Recuerda desactivar *Deployment Protection → Require Log In* si
   quieres que sea público.)

## Notas de fidelidad al diseño

- **Tipografía:** el diseño usa **Archivo** (Google Fonts). Aquí se carga con
  `next/font/google` (mejor rendimiento y sin las 18 fuentes woff2 embebidas del
  HTML original). El resultado visual es idéntico.
- **CSS:** se conservó el CSS original del diseño tal cual (en `globals.css`)
  para una fidelidad exacta; solo se reemplazaron las `@font-face` por la carga
  de `next/font`.
- **Formulario:** envía a Google Apps Script con `mode: "no-cors"` y
  `text/plain` (igual que el original, para evitar el preflight CORS), dispara el
  evento `generate_lead` de GA4, guarda el nombre en `sessionStorage` y redirige
  a `/gracias`.
- **Página `/gracias`:** el diseño original redirige a `gracias.html`, pero ese
  archivo no venía en la exportación. Se creó una página de agradecimiento
  sobria y on-brand para completar el flujo; ajústala (o el enlace de descarga
  del PDF) cuando lo tengas.
