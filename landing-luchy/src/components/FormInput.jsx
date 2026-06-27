export default function FormInput({ label, type = 'text', name, value, onChange, placeholder, error }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg border text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
          error
            ? 'border-red-400 focus:ring-red-300 bg-red-50'
            : 'border-gray-300 focus:ring-gold focus:border-gold bg-white'
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-0.5">{error}</p>}
    </div>
  )
}
