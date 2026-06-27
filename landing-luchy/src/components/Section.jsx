export default function Section({ children, className = '', id }) {
  return (
    <section id={id} className={`px-5 py-12 md:py-16 lg:py-20 ${className}`}>
      <div className="max-w-2xl mx-auto w-full">
        {children}
      </div>
    </section>
  )
}
