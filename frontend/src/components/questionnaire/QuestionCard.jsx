import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function QuestionCard({ question, selectedOption, onSelectOption, error }) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-snug">
        {question.prompt}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedOption === option;
          return (
            <button
              key={idx}
              onClick={() => onSelectOption(option)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left ${
                isSelected 
                  ? 'border-red-500 bg-pink-50' 
                  : 'border-gray-200 bg-white hover:border-red-200 hover:bg-gray-50'
              }`}
            >
              <span className={`font-semibold text-lg ${isSelected ? 'text-red-900' : 'text-gray-700'}`}>
                {option}
              </span>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                isSelected ? 'border-red-500 bg-red-500' : 'border-gray-300'
              }`}>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-white" />}
              </div>
            </button>
          );
        })}
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-xl text-sm font-semibold animate-in fade-in">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}
    </div>
  );
}