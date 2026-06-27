export default function Button({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false }) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variants = {
    primary: 'bg-gold hover:bg-gold-dark text-navy focus:ring-gold px-6 py-4 text-base w-full',
    secondary: 'bg-transparent border border-gold text-gold hover:bg-gold hover:text-navy focus:ring-gold px-5 py-3 text-sm',
    ghost: 'text-gray-400 hover:text-white underline text-sm px-4 py-2',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  )
}
