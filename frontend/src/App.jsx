import React, { useState } from 'react';
import { Mic, MicOff, AlertCircle, QrCode, CheckCircle2, HeartPulse } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState('home'); // home, recording, structured, questionnaire, dashboard, emergency
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  // Mock Medical Data State
  const [medicalData, setMedicalData] = useState({
    name: 'John Doe',
    uid: 'EMR-7X3K-P9L2',
    bloodGroup: 'B+',
    emergencyContact: '+1 987 654 3210',
    allergies: ['Penicillin (Severe)', 'Peanuts'],
    medications: ['Aspirin', 'Asthma Inhaler'],
    conditions: ['Asthma'],
    surgeries: ['Appendectomy (Age 18)'],
  });

  const handleStartRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setTranscript("I had a severe reaction to penicillin at 15. I take an asthma inhaler and had an appendectomy at 18.");
    }, 1500);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setStep('structured');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 p-4 sticky top-0 backdrop-blur z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setStep('home')}>
            <HeartPulse className="h-7 w-7 text-red-500" />
            <span className="font-bold text-xl tracking-tight">Med-Lynk</span>
          </div>
          <button 
            onClick={() => setStep(step === 'emergency' ? 'dashboard' : 'emergency')}
            className="text-xs bg-red-600/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-full hover:bg-red-600/30 font-semibold transition"
          >
            {step === 'emergency' ? 'Back to Portal' : 'Simulate Doctor QR Scan'}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6">

        {/* STEP 1: HOME / LANDING */}
        {step === 'home' && (
          <div className="text-center py-12 space-y-6">
            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
              Emergency Medical Profile
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              When you cannot speak for yourself, <br />
              <span className="text-blue-500">your medical history can.</span>
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto text-base">
              Speak naturally about your medical history. AI structures your critical data to protect your life in emergency situations.
            </p>
            <div className="pt-4">
              <button 
                onClick={() => setStep('recording')}
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-8 py-3.5 rounded-xl text-lg shadow-lg shadow-blue-600/20 transition"
              >
                Create Profile with Voice
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: VOICE RECORDING */}
        {step === 'recording' && (
          <div className="max-w-xl mx-auto bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 sm:p-8 text-center space-y-6">
            <h2 className="text-2xl font-bold">Narrate Your Medical History</h2>
            <p className="text-slate-400 text-sm">
              Describe your allergies, regular medications, surgeries, or chronic conditions in simple words.
            </p>

            <div className="py-8 flex justify-center">
              <button
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className={`p-6 rounded-full transition-all duration-300 ${
                  isRecording 
                    ? 'bg-red-500/20 border-2 border-red-500 text-red-500 animate-pulse' 
                    : 'bg-blue-600 text-white hover:bg-blue-500 shadow-xl shadow-blue-600/30'
                }`}
              >
                {isRecording ? <MicOff className="h-10 w-10" /> : <Mic className="h-10 w-10" />}
              </button>
            </div>

            <p className="text-xs text-slate-400">
              {isRecording ? "Listening... Click mic again when done." : "Click the microphone to start recording"}
            </p>

            {transcript && (
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700 text-left text-sm text-slate-300">
                <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Live Transcript</p>
                "{transcript}"
              </div>
            )}
          </div>
        )}

        {/* STEP 3: AI STRUCTURED DATA REVIEW */}
        {step === 'structured' && (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">AI Structured Output</h2>
                <p className="text-slate-400 text-sm">Extracted automatically from your voice input</p>
              </div>
              <span className="flex items-center text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Processed
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl">
                <span className="text-xs text-red-400 font-semibold block mb-1">ALLERGIES</span>
                <ul className="text-sm space-y-1 text-slate-200">
                  {medicalData.allergies.map((item, idx) => (
                    <li key={idx} className="flex items-center">• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl">
                <span className="text-xs text-blue-400 font-semibold block mb-1">MEDICATIONS</span>
                <ul className="text-sm space-y-1 text-slate-200">
                  {medicalData.medications.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl">
                <span className="text-xs text-amber-400 font-semibold block mb-1">PAST SURGERIES</span>
                <p className="text-sm text-slate-200">• Appendectomy (Age 18)</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl">
                <span className="text-xs text-purple-400 font-semibold block mb-1">CONDITIONS</span>
                <p className="text-sm text-slate-200">• Asthma</p>
              </div>
            </div>

            <button 
              onClick={() => setStep('questionnaire')}
              className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-medium text-white transition"
            >
              Continue to Smart Questionnaire
            </button>
          </div>
        )}

        {/* STEP 4: SMART QUESTIONNAIRE */}
        {step === 'questionnaire' && (
          <div className="max-w-xl mx-auto bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 space-y-6">
            <div>
              <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">Smart Questionnaire</span>
              <h2 className="text-xl font-bold mt-1">Fill Missing Critical Details</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-300">Have you ever experienced a severe reaction to any medication?</label>
                <div className="grid grid-cols-3 gap-2">
                  <button className="bg-blue-600/30 border border-blue-500 text-blue-300 py-2 rounded-lg text-sm font-medium">Yes</button>
                  <button className="bg-slate-900 border border-slate-700 text-slate-400 py-2 rounded-lg text-sm">No</button>
                  <button className="bg-slate-900 border border-slate-700 text-slate-400 py-2 rounded-lg text-sm">Not Sure</button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-300">Which type of reaction occurred?</label>
                <div className="space-y-2">
                  <div className="bg-blue-600/20 border border-blue-500/40 p-3 rounded-lg text-sm flex items-center">
                    <input type="radio" checked readOnly className="mr-2" /> Difficulty Breathing
                  </div>
                  <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg text-sm flex items-center text-slate-400">
                    <input type="radio" disabled className="mr-2" /> Skin Rash / Hives
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setStep('dashboard')}
              className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-medium text-white transition"
            >
              Generate Emergency Profile
            </button>
          </div>
        )}

        {/* STEP 5: PATIENT DASHBOARD */}
        {step === 'dashboard' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl gap-4">
              <div>
                <h1 className="text-2xl font-bold">{medicalData.name}</h1>
                <p className="text-sm text-slate-400">UID: <span className="text-blue-400 font-mono">{medicalData.uid}</span></p>
              </div>
              <div className="flex items-center space-x-2 bg-slate-900 px-4 py-2 rounded-xl border border-slate-700">
                <QrCode className="h-6 w-6 text-blue-400" />
                <span className="text-xs text-slate-300 font-mono">Ready for Emergency Scan</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                  <h3 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">Critical Allergies</h3>
                  <div className="flex flex-wrap gap-2">
                    {medicalData.allergies.map((a, i) => (
                      <span key={i} className="bg-red-500/20 text-red-300 border border-red-500/30 px-3 py-1 rounded-lg text-sm font-medium">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl space-y-3">
                  <h3 className="text-sm font-semibold text-slate-300">Active Profile Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400 text-xs block">Blood Group</span>
                      <span className="font-semibold text-lg text-slate-100">{medicalData.bloodGroup}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-xs block">Emergency Contact</span>
                      <span className="font-semibold text-slate-100">{medicalData.emergencyContact}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code Demo Section */}
              <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl flex flex-col items-center text-center justify-center space-y-4">
                <div className="bg-white p-4 rounded-xl">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${medicalData.uid}`} 
                    alt="Emergency QR Code"
                    className="w-32 h-32" 
                  />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-300">Emergency Medical Card</span>
                  <p className="text-xs text-slate-500 mt-1">Scan using any device to view life-saving details</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: DOCTOR / EMERGENCY ACCESS VIEW */}
        {step === 'emergency' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-red-600 text-white p-4 rounded-2xl flex items-center space-x-3 shadow-lg shadow-red-600/20">
              <AlertCircle className="h-8 w-8 flex-shrink-0" />
              <div>
                <h2 className="font-bold text-lg">EMERGENCY MEDICAL PROFILE</h2>
                <p className="text-xs text-red-100">Restricted Access • Critical Life-Saving Data Only</p>
              </div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-2xl space-y-6">
              <div className="flex justify-between items-start border-b border-slate-700 pb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-100">{medicalData.name}</h3>
                  <p className="text-sm text-slate-400">UID: {medicalData.uid}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">BLOOD GROUP</span>
                  <span className="text-2xl font-extrabold text-red-500">{medicalData.bloodGroup}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-red-950/40 border border-red-500/40 p-4 rounded-xl">
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wider block mb-1">CRITICAL ALLERGIES</span>
                  <p className="text-lg font-semibold text-red-200">{medicalData.allergies.join(', ')}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700">
                    <span className="text-xs text-slate-400 block mb-1">CURRENT MEDICATIONS</span>
                    <p className="text-sm font-medium">{medicalData.medications.join(', ')}</p>
                  </div>
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700">
                    <span className="text-xs text-slate-400 block mb-1">KNOWN CONDITIONS</span>
                    <p className="text-sm font-medium">{medicalData.conditions.join(', ')}</p>
                  </div>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-slate-400 block">EMERGENCY CONTACT</span>
                    <p className="text-base font-semibold text-slate-100">{medicalData.emergencyContact}</p>
                  </div>
                  <a href={`tel:${medicalData.emergencyContact}`} className="bg-green-600 hover:bg-green-500 text-white text-xs px-4 py-2 rounded-lg font-semibold">
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}