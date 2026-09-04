import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileProgress from '../components/profile/ProfileProgress';
import InputMethodSelector from '../components/profile/InputMethodSelector';
import VoiceRecorder from '../components/profile/VoiceRecorder';
import MedicalHistoryTextarea from '../components/profile/MedicalHistoryTextarea';
import MedicalHistoryHints from '../components/profile/MedicalHistoryHints';
import PrivacyNotice from '../components/profile/PrivacyNotice';

export default function MedicalProfile() {
  const navigate = useNavigate();
  const [inputMethod, setInputMethod] = useState('voice');
  const [medicalText, setMedicalText] = useState('');
  const [error, setError] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  const handleContinue = () => {
    setError('');
    setSaveMessage('');
    
    if (!medicalText.trim()) {
      setError("Please tell us about your medical history before continuing.");
      return;
    }
    
    // Proceed to next step in the flow
    navigate('/questionnaire');
  };

  const handleSaveLater = () => {
    setError('');
    setSaveMessage("Your progress has been saved locally for this prototype.");
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto pb-12 animate-in fade-in duration-500">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Medical Profile</h1>
        <p className="text-gray-500 text-lg">
          Tell us about your medical history. You can type it or simply tell Med-Lynk in your own words.
        </p>
      </div>

      <ProfileProgress currentStep={1} />

      <InputMethodSelector method={inputMethod} setMethod={setInputMethod} />

      {/* Dynamic Input Area */}
      <div className="transition-all duration-300">
        {inputMethod === 'voice' ? (
          <VoiceRecorder value={medicalText} onChange={setMedicalText} />
        ) : (
          <MedicalHistoryTextarea value={medicalText} onChange={setMedicalText} />
        )}
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-semibold animate-in fade-in slide-in-from-top-2 text-center">
          {error}
        </div>
      )}

      {saveMessage && (
        <div className="mt-6 p-4 bg-green-50 border border-green-100 text-green-600 rounded-xl text-sm font-semibold animate-in fade-in slide-in-from-top-2 text-center">
          {saveMessage}
        </div>
      )}

      <MedicalHistoryHints />
      
      <PrivacyNotice />

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 border-t border-gray-200 pt-8">
        <button 
          onClick={handleContinue}
          className="w-full sm:w-auto flex-1 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-red-500/20"
        >
          Continue
        </button>
        <button 
          onClick={handleSaveLater}
          className="w-full sm:w-auto bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-xl font-bold transition-all active:scale-95"
        >
          Save & Continue Later
        </button>
      </div>

    </div>
  );
}