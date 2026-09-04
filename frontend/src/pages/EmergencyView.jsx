import { useParams, Link } from 'react-router-dom';
import { AlertTriangle, Droplet, Pill, HeartPulse, Stethoscope, Phone, Activity, ShieldAlert } from 'lucide-react';

export default function EmergencyView() {
  const { id } = useParams(); // E.g., MLK-7F82A9

  // Mock data representing the critical subset of the user's profile
  const emergencyData = {
    name: "Rahul Sharma",
    emergencyId: id || "MLK-7F82A9",
    bloodGroup: "O+",
    allergies: [
      { name: "Penicillin", severity: "SEVERE", reaction: "Anaphylaxis" }
    ],
    medications: [
      { name: "Asthma Inhaler", details: "As needed" }
    ],
    conditions: [
      { name: "Asthma", status: "Active" }
    ],
    surgeries: [
      { name: "Appendectomy", year: "2022" }
    ],
    emergencyContact: {
      name: "Priya Sharma",
      relation: "Spouse",
      phone: "+91 98765 43210"
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 font-sans selection:bg-red-500 selection:text-white">
      
      {/* High-Visibility Header */}
      <div className="bg-red-500 pt-12 pb-6 px-4 text-center shadow-lg sticky top-0 z-50">
        <div className="flex justify-center mb-3">
          <div className="bg-white p-3 rounded-full shadow-md animate-pulse">
            <Activity className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <h1 className="text-3xl font-black text-white tracking-widest uppercase mb-1">
          Emergency Info
        </h1>
        <p className="text-red-100 font-medium text-sm">
          ID: {emergencyData.emergencyId}
        </p>
      </div>

      <div className="max-w-xl mx-auto p-4 sm:p-6 space-y-4 pb-20">
        
        {/* Patient Identity */}
        <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Patient Name</p>
          <h2 className="text-3xl font-black text-gray-900">{emergencyData.name}</h2>
        </div>

        {/* Security / Privacy Banner */}
        <div className="bg-gray-800 rounded-2xl p-4 flex items-start gap-3 border border-gray-700">
          <ShieldAlert className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-300 leading-relaxed font-medium">
            <strong className="text-white">Authorized Access Only.</strong> This limited profile contains critical life-saving information. Access to this page has been logged.
          </p>
        </div>

        {/* CRITICAL: Blood & Allergies */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 border-b-4 border-red-500 shadow-sm flex flex-col items-center justify-center text-center">
            <Droplet className="w-8 h-8 text-red-500 mb-2" />
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Blood Group</p>
            <p className="text-4xl font-black text-gray-900">{emergencyData.bloodGroup}</p>
          </div>

          <div className="bg-orange-50 rounded-2xl p-5 border-b-4 border-orange-500 shadow-sm flex flex-col items-center justify-center text-center">
            <AlertTriangle className="w-8 h-8 text-orange-600 mb-2" />
            <p className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">Allergies</p>
            {emergencyData.allergies.map((allergy, i) => (
              <div key={i}>
                <p className="text-xl font-black text-orange-900 leading-tight">{allergy.name}</p>
                <span className="inline-block mt-1 bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                  {allergy.severity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Details */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          
          <div className="p-5 border-b border-gray-100 flex items-start gap-4">
            <HeartPulse className="w-6 h-6 text-pink-500 shrink-0 mt-1" />
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Conditions</p>
              {emergencyData.conditions.map((cond, i) => (
                <p key={i} className="text-lg font-bold text-gray-900">{cond.name}</p>
              ))}
            </div>
          </div>

          <div className="p-5 border-b border-gray-100 flex items-start gap-4">
            <Pill className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Medications</p>
              {emergencyData.medications.map((med, i) => (
                <div key={i} className="mb-1 last:mb-0">
                  <p className="text-lg font-bold text-gray-900">{med.name}</p>
                  <p className="text-sm text-gray-500">{med.details}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 flex items-start gap-4">
            <Stethoscope className="w-6 h-6 text-teal-500 shrink-0 mt-1" />
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Surgeries</p>
              {emergencyData.surgeries.map((surg, i) => (
                <p key={i} className="text-lg font-bold text-gray-900">{surg.name} <span className="text-gray-400 text-sm font-medium">({surg.year})</span></p>
              ))}
            </div>
          </div>
          
        </div>

        {/* Emergency Contact */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border-2 border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-2 rounded-lg">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900">Emergency Contact</h3>
          </div>
          
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
            <div>
              <p className="font-bold text-gray-900 text-lg">{emergencyData.emergencyContact.name}</p>
              <p className="text-sm text-gray-500 font-medium">{emergencyData.emergencyContact.relation}</p>
            </div>
            <a 
              href={`tel:${emergencyData.emergencyContact.phone.replace(/[^0-9+]/g, '')}`}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors active:scale-95 shadow-md shadow-green-500/20"
            >
              CALL
            </a>
          </div>
        </div>

      </div>

      {/* Footer / Return to Med-Lynk */}
      <div className="fixed bottom-0 w-full bg-gray-900 border-t border-gray-800 p-4 text-center">
        <Link to="/" className="text-gray-500 hover:text-white text-sm font-medium transition-colors">
          Powered by Med-Lynk
        </Link>
      </div>

    </div>
  );
}