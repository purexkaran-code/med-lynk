import { Check } from 'lucide-react';

export default function ProfileProgress({ currentStep = 1 }) {
  const steps = [
    { num: 1, label: "Medical History" },
    { num: 2, label: "Personalized Questions" },
    { num: 3, label: "Review Profile" }
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full z-0"></div>
        
        {steps.map((step) => {
          const isActive = currentStep === step.num;
          const isCompleted = currentStep > step.num;
          
          return (
            <div key={step.num} className="relative z-10 flex flex-col items-center gap-2 bg-gray-50 px-2 sm:px-4">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                isActive ? 'bg-red-500 text-white shadow-md shadow-red-500/20 ring-4 ring-red-50' :
                isCompleted ? 'bg-pink-100 text-pink-600' : 'bg-white border-2 border-gray-200 text-gray-400'
              }`}>
                {isCompleted ? <Check className="w-5 h-5" /> : step.num}
              </div>
              <span className={`text-xs sm:text-sm font-semibold hidden sm:block ${
                isActive ? 'text-gray-900' : isCompleted ? 'text-gray-900' : 'text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}