export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-off-white border border-gold/30 rounded-2xl p-6 shadow-sm ${className}`}>
      {children}
    </div>
  )
}
