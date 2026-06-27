import Header from '../components/Header'
import Section from '../components/Section'
import LeadForm from '../components/LeadForm'
import FAQ from '../components/FAQ'
import Card from '../components/Card'

const senales = [
  'Repites decisiones que no te satisfacen',
  'Tu autoexigencia es más alta que tu disfrute',
  'Pospones lo importante por lo urgente',
  'No recuerdas cuándo fue la última vez que te sentiste vivo',
  'Intentaste cambiar pero volviste a lo conocido',
  'Tu miedo está disfrazado de razones prácticas',
  'Funciona pero no fluye',
  'Tienes respuestas pero le falta decisión',
  'La culpa de querer algo distinto es mayor que el deseo',
  'Esperas que algo externo te dé la respuesta',
]

const painPoints = [
  'Logra cosas. Pero su vida personal está en pausa.',
  'Intenta motivarse. Pero vuelve a lo de siempre.',
  'Sabe qué quiere cambiar. Pero lo posterga año tras año.',
]

const pasos = [
  'Entiendes el patrón',
  'Ves por primera vez qué está bloqueado',
  'Sabes exactamente qué cambiar',
]

const testimonios = [
  {
    nombre: 'Rodrigo M.',
    rol: '42 · Director Comercial, México',
    cita: 'Entendí por primera vez por qué postergo mis decisiones importantes. Esto debería ser obligatorio para todo ejecutivo.',
  },
  {
    nombre: 'Andrea V.',
    rol: '37 · Gerente de Operaciones, Colombia',
    cita: 'Pensé que estaba bien. Marqué 7 de 10 señales. Fue incómodo y necesario al mismo tiempo.',
  },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      {/* HERO */}
      <section className="bg-navy px-5 pt-14 pb-16 md:pt-20 md:pb-24 text-center relative overflow-hidden">
        {/* Glow dorado sutil */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 90%, rgba(212,175,55,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Ícono placeholder */}
        <div className="mx-auto mb-6 w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center">
          <span className="text-gold text-2xl">⬡</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
          ¿Funcionas pero
          <br />
          <span className="text-gold">algo te falta?</span>
        </h1>

        <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-lg mx-auto">
          La mayoría de los ejecutivos en automático no lo saben.
          <br className="hidden md:block" />
          Descubre dónde estás atrapado.
        </p>
      </section>

      {/* PROBLEMA */}
      <Section className="bg-white">
        <h2 className="text-navy text-xl md:text-2xl font-bold text-center mb-2">
          Reconocerías esto en alguien que conoces...
        </h2>
        <div className="flex flex-col gap-4 mt-8">
          {painPoints.map((p, i) => (
            <div
              key={i}
              className="flex items-start gap-3 bg-off-white rounded-xl px-5 py-4 border border-gray-100"
            >
              <span className="text-gold font-bold text-lg mt-0.5 flex-shrink-0">—</span>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">{p}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-navy font-semibold mt-8 text-sm md:text-base">
          Esto no es casualidad.{' '}
          <span className="text-gold">Es un patrón.</span>
        </p>
      </Section>

      {/* LEAD MAGNET — Las 10 señales */}
      <Section className="bg-navy">
        <div className="text-center mb-8">
          <h2 className="text-white text-xl md:text-2xl font-bold leading-tight mb-2">
            Las 10 señales de que estás en automático
          </h2>
          <p className="text-gold text-sm font-medium uppercase tracking-wider mb-3">
            Una lista de diagnóstico para ejecutivos
          </p>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-md mx-auto">
            En 5 minutos de lectura, sabrás exactamente dónde estás
            atrapado. Y qué significa.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {senales.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-4 py-3 px-4 rounded-lg border border-white/10 bg-white/5"
            >
              <span className="text-gold font-bold text-sm w-5 flex-shrink-0 text-right">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p
                className="text-[13px] leading-snug"
                style={{ color: i % 2 === 0 ? '#D4AF37' : '#e2e8f0' }}
              >
                {s}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-xs mt-6 italic">
          La mayoría no sabe dónde está. Tú vas a saberlo.
        </p>
      </Section>

      {/* FORMULARIO */}
      <Section id="formulario" className="bg-white py-16">
        <LeadForm />
      </Section>

      {/* ANTES / DESPUÉS */}
      <Section className="bg-off-white">
        <h2 className="text-navy text-lg md:text-xl font-bold text-center mb-6">
          ¿Qué pasa después de reconocer dónde estás?
        </h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          {pasos.map((paso, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center text-center bg-white rounded-xl px-5 py-6 border border-gold/20 shadow-sm"
            >
              <span className="text-gold font-bold text-2xl mb-3">{i + 1}</span>
              <p className="text-navy text-sm font-medium">{paso}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* TESTIMONIOS */}
      <Section className="bg-white">
        <h2 className="text-navy text-lg md:text-xl font-bold text-center mb-8">
          Lo que dicen quienes lo usaron
        </h2>
        <div className="flex flex-col gap-5">
          {testimonios.map((t, i) => (
            <Card key={i} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center flex-shrink-0">
                <span className="text-gold font-bold text-lg">{t.nombre[0]}</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 text-sm leading-relaxed italic mb-2">
                  "{t.cita}"
                </p>
                <p className="text-navy font-semibold text-xs">{t.nombre}</p>
                <p className="text-gray-400 text-xs">{t.rol}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-off-white">
        <h2 className="text-navy text-lg md:text-xl font-bold text-center mb-6">
          Preguntas frecuentes
        </h2>
        <FAQ />
      </Section>

      {/* CTA FINAL */}
      <Section className="bg-navy text-center py-14">
        <p className="text-gray-300 text-sm uppercase tracking-wider mb-3">
          Sin costo. Sin compromiso.
        </p>
        <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">
          Descarga las 10 señales ahora
        </h2>
        <a
          href="#formulario"
          className="inline-block bg-gold hover:bg-gold-dark text-navy font-bold px-8 py-4 rounded-lg text-base transition-colors duration-200"
        >
          Quiero el PDF Gratis
        </a>
      </Section>

      {/* FOOTER */}
      <footer className="bg-navy border-t border-white/10 px-5 py-8 text-center">
        <p className="text-gray-500 text-xs mb-4">
          © {new Date().getFullYear()} LUCHY · Todos los derechos reservados
        </p>
        <div className="flex items-center justify-center gap-5 text-xs text-gray-500 mb-4">
          <a href="#" className="hover:text-gray-300 transition-colors">
            Política de privacidad
          </a>
          <span>|</span>
          <a href="#" className="hover:text-gray-300 transition-colors">
            Términos
          </a>
        </div>
        <div className="flex items-center justify-center gap-5">
          {/* Instagram */}
          <a
            href="#"
            aria-label="Instagram"
            className="text-gray-500 hover:text-gold transition-colors"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
          </a>
          {/* WhatsApp */}
          <a
            href="https://wa.me/numero?text=Hola%20Luchy"
            aria-label="WhatsApp"
            className="text-gray-500 hover:text-gold transition-colors"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  )
}
