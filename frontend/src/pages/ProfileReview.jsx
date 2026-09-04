import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AlertTriangle, Droplet, Pill, HeartPulse, Stethoscope, CheckCircle2, Pencil, QrCode } from 'lucide-react';
import ProfileProgress from '../components/profile/ProfileProgress';

// Mock Structured Data (What the AI generated)
const MOCK_STRUCTURED_PROFILE = {
  bloodGroup: "O+",
  allergies: [
    { name: "Penicillin", severity: "Severe", reaction: "Anaphylaxis / Difficulty breathing" }
  ],
  medications: [
    { name: "Asthma Inhaler", frequency: "As needed (carried always)" }
  ],
  conditions: [
    { name: "Asthma", status: "Active" }
  ],
  surgeries: [
    { name: "Appendectomy", year: "2022", complications: "None" }
  ]
};

export default function ProfileReview() {
  const navigate = useNavigate();
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = () => {
    setIsConfirming(true);
    // Simulate final API save
    setTimeout(() => {
      setIsConfirming(false);
      navigate('/qr'); // Route to the reward: their generated QR code!
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto pb-12 animate-in fade-in duration-500">
      
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Review Your Medical Profile</h1>
        <p className="text-gray-500 text-lg">
          Please verify this information. This is exactly what first responders will see in an emergency.
        </p>
      </div>

      <ProfileProgress currentStep={3} />

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm mb-8 relative">
        {/* Warning Banner */}
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex gap-3 mb-8">
          <AlertTriangle className="w-6 h-6 text-orange-500 shrink-0" />
          <p className="text-sm text-orange-800 font-medium leading-relaxed">
            Verify that your critical allergies and blood group are strictly accurate. Incorrect information could affect emergency treatment.
          </p>
        </div>

        <div className="space-y-8">
          
          {/* Blood Group */}
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Droplet className="w-4 h-4 text-red-500" /> Blood Group
              </h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{MOCK_STRUCTURED_PROFILE.bloodGroup}</p>
          </div>

          {/* Allergies */}
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" /> Critical Allergies
              </h3>
            </div>
            {MOCK_STRUCTURED_PROFILE.allergies.map((allergy, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-2">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-bold text-gray-900 text-lg">{allergy.name}</p>
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-md uppercase">
                    {allergy.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-500">Reaction: {allergy.reaction}</p>
              </div>
            ))}
          </div>

          {/* Medications & Conditions (Grid on Desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Pill className="w-4 h-4 text-blue-500" /> Current Medications
                </h3>
              </div>
              {MOCK_STRUCTURED_PROFILE.medications.map((med, i) => (
                <div key={i} className="mb-2">
                  <p className="font-bold text-gray-900">{med.name}</p>
                  <p className="text-sm text-gray-500">{med.frequency}</p>
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-pink-500" /> Medical Conditions
                </h3>
              </div>
              {MOCK_STRUCTURED_PROFILE.conditions.map((cond, i) => (
                <div key={i} className="mb-2">
                  <p className="font-bold text-gray-900">{cond.name}</p>
                  <p className="text-sm text-gray-500">{cond.status}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Surgeries */}
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-teal-500" /> Major Surgeries
              </h3>
            </div>
            {MOCK_STRUCTURED_PROFILE.surgeries.map((surg, i) => (
              <div key={i} className="mb-2">
                <p className="font-bold text-gray-900">{surg.name} <span className="text-gray-400 font-medium">({surg.year})</span></p>
                <p className="text-sm text-gray-500">Complications: {surg.complications}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button 
          onClick={handleConfirm}
          disabled={isConfirming}
          className="w-full sm:flex-1 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-red-500/20 disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isConfirming ? (
            <>Saving Profile...</>
          ) : (
            <><CheckCircle2 className="w-6 h-6" /> Confirm & Generate QR</>
          )}
        </button>
        
        <Link 
          to="/profile"
          className="w-full sm:w-auto bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Pencil className="w-5 h-5" /> Edit Info
        </Link>
      </div>

    </div>
  );
}