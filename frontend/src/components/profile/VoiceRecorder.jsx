import { useState } from 'react';
import { Mic, Square, RotateCcw } from 'lucide-react';

export default function VoiceRecorder({ value, onChange }) {
  const [status, setStatus] = useState('idle'); // idle | recording | recorded

  const handleStart = () => {
    setStatus('recording');
  };

  const handleStop = () => {
    setStatus('recorded');
    // Set demo transcript when stopped
    onChange("I am allergic to penicillin. I have asthma and I currently use an inhaler. I had an appendectomy in 2022.");
  };

  const handleReset = () => {
    setStatus('idle');
    onChange("");
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm animate-in fade-in">
      
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Tell us your medical history</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          You can talk naturally. Mention allergies, medications, previous illnesses, surgeries, conditions, or anything important for emergency care.
        </p>
      </div>

      {/* Microphone Interaction Area */}
      <div className="flex flex-col items-center justify-center py-8">
        
        {status === 'idle' && (
          <div className="flex flex-col items-center animate-in zoom-in-95 duration-300">
            <button 
              onClick={handleStart}
              className="w-24 h-24 bg-red-50 hover:bg-red-100 rounded-full flex items-center justify-center transition-colors group mb-4"
              aria-label="Start recording"
            >
              <div className="w-16 h-16 bg-red-500 group-hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-red-500/30 transition-all group-active:scale-95">
                <Mic className="w-8 h-8" />
              </div>
            </button>
            <p className="font-semibold text-gray-900">Tap to start recording</p>
          </div>
        )}

        {status === 'recording' && (
          <div className="flex flex-col items-center animate-in zoom-in-95 duration-300">
            <div className="relative mb-4">
              {/* Pulsing rings */}
              <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
              <div className="absolute -inset-4 bg-red-500 rounded-full animate-pulse opacity-10"></div>
              
              <button 
                onClick={handleStop}
                className="relative w-24 h-24 bg-red-50 rounded-full flex items-center justify-center group z-10"
                aria-label="Stop recording"
              >
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-red-500/40 transition-all group-active:scale-95">
                  <Square className="w-6 h-6 fill-current" />
                </div>
              </button>
            </div>
            <p className="font-bold text-red-500 animate-pulse mb-1">Recording...</p>
            <p className="text-sm text-gray-500">Tap to stop</p>
          </div>
        )}

        {status === 'recorded' && (
          <div className="flex flex-col items-center animate-in zoom-in-95 duration-300 w-full">
            <div className="flex items-center gap-2 text-green-600 font-bold mb-6 bg-green-50 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Recording complete
            </div>

            <div className="w-full text-left bg-gray-50 rounded-2xl p-4 border border-gray-200 mb-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Generated Transcript (Demo Data)</p>
              <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-transparent resize-none outline-none text-gray-900 min-h-[100px]"
              />
            </div>

            <button onClick={handleReset} className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors">
              <RotateCcw className="w-4 h-4" /> Record Again
            </button>
          </div>
        )}

      </div>
    </div>
  );
}