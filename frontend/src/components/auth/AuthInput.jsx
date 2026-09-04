export default function AuthInput({ label, icon: Icon, error, ...props }) {
  return (
    <div className="space-y-1.5 w-full">
      {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3.5 bg-gray-50 border ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-gray-900'
          } rounded-xl focus:bg-white focus:ring-2 focus:border-transparent outline-none transition-all text-gray-900`}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-500 mt-1 animate-in fade-in">{error}</p>}
    </div>
  );
}