import { useState } from 'react'

const items = [
  {
    q: '¿Cuál es el costo?',
    a: 'Es gratuito. Completamente. Sin tarjeta, sin truco.',
  },
  {
    q: '¿Qué hago con el PDF?',
    a: 'Lo lees, identificas en cuáles señales te reconoces, y desde ahí decides qué hacer. No requiere nada más que 5 minutos y honestidad.',
  },
  {
    q: '¿Recibiré spam?',
    a: 'No. Solo contenido que importa. Puedes darte de baja en cualquier momento.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <div className="flex flex-col gap-3 w-full">
      {items.map((item, i) => (
        <div key={i} className="border border-gold/30 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left text-navy font-semibold text-sm focus:outline-none"
          >
            <span>{item.q}</span>
            <span className="text-gold text-lg ml-4 flex-shrink-0">
              {open === i ? '−' : '+'}
            </span>
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gold/20 pt-3">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
