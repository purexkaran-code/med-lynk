export default function MedicalHistoryHints() {
  const hints = [
    "Allergies", "Medications", "Medical Conditions", 
    "Past Surgeries", "Previous Hospitalizations", "Family History", "Other Important Information"
  ];

  return (
    <div className="mt-8 animate-in fade-in">
      <h4 className="text-sm font-bold text-gray-900 mb-3">Not sure what to include?</h4>
      <div className="flex flex-wrap gap-2">
        {hints.map((hint, idx) => (
          <div key={idx} className="bg-white border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-full shadow-sm cursor-default hover:border-pink-300 hover:bg-pink-50 hover:text-pink-700 transition-colors">
            {hint}
          </div>
        ))}
      </div>
    </div>
  );
}