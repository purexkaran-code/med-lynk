export default function MedicalHistoryTextarea({ value, onChange }) {
  const maxLength = 2000;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm animate-in fade-in">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Describe your medical history</h3>
        <p className="text-gray-500">Provide as much relevant detail as you can.</p>
      </div>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
          placeholder="Example: I am allergic to penicillin. I have asthma and currently use an inhaler..."
          className="w-full min-h-[250px] p-5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-gray-900 resize-y"
        />
        <div className="absolute bottom-4 right-4 text-xs font-semibold text-gray-400">
          {value.length} / {maxLength}
        </div>
      </div>
    </div>
  );
}