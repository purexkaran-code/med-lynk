import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, Loader2 } from 'lucide-react';
import ProfileProgress from '../components/profile/ProfileProgress';
import QuestionCard from '../components/questionnaire/QuestionCard';

// Mock AI-Generated Questions based on previous step's demo transcript
const MOCK_QUESTIONS = [
  {
    id: 'q1',
    prompt: "You mentioned a penicillin allergy. How severe is your reaction?",
    options: ["Mild (Rash/Itching)", "Moderate (Swelling)", "Severe (Anaphylaxis/Difficulty breathing)", "I'm not sure"]
  },
  {
    id: 'q2',
    prompt: "Do you know your current blood group?",
    options: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", "I don't know"]
  },
  {
    id: 'q3',
    prompt: "You mentioned an appendectomy in 2022. Have there been any lingering complications?",
    options: ["No complications", "Yes, minor issues", "Yes, major issues"]
  },
  {
    id: 'q4',
    prompt: "Do you carry your asthma inhaler with you at all times?",
    options: ["Yes, always", "Sometimes", "No, I leave it at home"]
  }
];

export default function Questionnaire() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const currentQuestion = MOCK_QUESTIONS[currentIndex];
  const isLastQuestion = currentIndex === MOCK_QUESTIONS.length - 1;

  const handleSelectOption = (option) => {
    setAnswers({ ...answers, [currentQuestion.id]: option });
    setError(''); // Clear error on selection
  };

  const handleNext = () => {
    if (!answers[currentQuestion.id]) {
      setError("Please select an answer to continue.");
      return;
    }

    if (isLastQuestion) {
      handleGenerateProfile();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setError('');
    if (currentIndex === 0) {
      // If at the first question, go back to the text/voice input page
      navigate('/profile');
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleGenerateProfile = () => {
    setIsGenerating(true);
    // Simulate generation delay
    setTimeout(() => {
      setIsGenerating(false);
      // Route to next placeholder (Step 3: Review)
      navigate('/profile-review');
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto pb-12 animate-in fade-in duration-500">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Medical Profile</h1>
        <p className="text-gray-500 text-lg">
          We noticed a few missing details. Answer these quick questions to ensure your profile is comprehensive.
        </p>
      </div>

      <ProfileProgress currentStep={2} />

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm relative overflow-hidden">
        {/* Decorative AI Sparkle */}
        <div className="absolute top-0 right-0 bg-pink-50 text-pink-500 px-4 py-2 rounded-bl-2xl font-semibold text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4" /> AI Generated
        </div>

        {/* Question Progress Indicator */}
        <div className="mb-8 pt-4">
          <div className="flex justify-between text-sm font-bold text-gray-400 mb-2">
            <span>Question {currentIndex + 1} of {MOCK_QUESTIONS.length}</span>
            <span className="text-red-500">{Math.round(((currentIndex + 1) / MOCK_QUESTIONS.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${((currentIndex + 1) / MOCK_QUESTIONS.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Dynamic Question Card */}
        <QuestionCard 
          question={currentQuestion}
          selectedOption={answers[currentQuestion.id]}
          onSelectOption={handleSelectOption}
          error={error}
        />

        {/* Navigation Buttons */}
        <div className="mt-10 flex items-center justify-between border-t border-gray-100 pt-6">
          <button 
            onClick={handleBack}
            disabled={isGenerating}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </button>

          <button 
            onClick={handleNext}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-3.5 rounded-xl font-bold transition-all active:scale-95 shadow-md shadow-red-500/20 disabled:opacity-70"
          >
            {isGenerating ? (
              <>Generating <Loader2 className="w-5 h-5 animate-spin" /></>
            ) : isLastQuestion ? (
              <>Generate Profile <Sparkles className="w-5 h-5" /></>
            ) : (
              <>Next <ChevronRight className="w-5 h-5" /></>
            )}
          </button>
        </div>
      </div>

    </div>
  );
}