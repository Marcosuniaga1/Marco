import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from './FormInput'
import Button from './Button'

const APPS_SCRIPT_URL = '' // Reemplazar con la URL de tu Google Apps Script

function gtag(...args) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args)
  }
}

export default function LeadForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nombre: '', email: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function validate() {
    const errs = {}
    if (!form.nombre.trim()) errs.nombre = 'Tu nombre es requerido.'
    if (!form.email.trim()) {
      errs.email = 'Tu email es requerido.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Ingresa un email válido.'
    }
    return errs
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setLoading(true)

    gtag('event', 'generate_lead', { email: form.email })

    if (APPS_SCRIPT_URL) {
      try {
        await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: form.nombre,
            email: form.email,
            timestamp: new Date().toISOString(),
          }),
        })
      } catch (_) {
        // Continuar aunque falle el registro
      }
    }

    setLoading(false)
    navigate('/gracias')
  }

  return (
    <div className="bg-off-white border-2 border-gold rounded-2xl p-6 md:p-8 shadow-lg w-full max-w-md mx-auto">
      <p className="text-center text-navy font-semibold text-base mb-5 uppercase tracking-wider">
        Acceso inmediato al PDF
      </p>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <FormInput
          name="nombre"
          type="text"
          placeholder="Tu nombre"
          value={form.nombre}
          onChange={handleChange}
          error={errors.nombre}
        />
        <FormInput
          name="email"
          type="email"
          placeholder="tu@email.com"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Button type="submit" variant="primary" disabled={loading} className="mt-2 text-base font-bold py-4">
          {loading ? 'Enviando...' : 'Descargar PDF Gratis'}
        </Button>

        <p className="text-center text-gray-400 text-[11px] leading-snug">
          Acceso inmediato. Sin spam. Garantizado.
        </p>
      </form>
    </div>
  )
}
