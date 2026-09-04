import { Mic, Keyboard } from 'lucide-react';

export default function InputMethodSelector({ method, setMethod }) {
  return (
    <div className="mb-8">
      <p className="text-sm font-semibold text-gray-700 mb-3">How would you like to share your medical history?</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        <button 
          onClick={() => setMethod('voice')}
          className={`flex flex-col items-start p-5 rounded-2xl border-2 transition-all text-left ${
            method === 'voice' 
            ? 'border-red-500 bg-pink-50' 
            : 'border-gray-200 bg-white hover:border-red-200'
          }`}
        >
          <div className={`p-2.5 rounded-xl mb-3 ${method === 'voice' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
            <Mic className="w-6 h-6" />
          </div>
          <h3 className={`font-bold text-lg mb-1 ${method === 'voice' ? 'text-red-900' : 'text-gray-900'}`}>Voice</h3>
          <p className={`text-sm ${method === 'voice' ? 'text-red-700/80' : 'text-gray-500'}`}>Tell us naturally using your voice.</p>
        </button>

        <button 
          onClick={() => setMethod('text')}
          className={`flex flex-col items-start p-5 rounded-2xl border-2 transition-all text-left ${
            method === 'text' 
            ? 'border-red-500 bg-pink-50' 
            : 'border-gray-200 bg-white hover:border-red-200'
          }`}
        >
          <div className={`p-2.5 rounded-xl mb-3 ${method === 'text' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
            <Keyboard className="w-6 h-6" />
          </div>
          <h3 className={`font-bold text-lg mb-1 ${method === 'text' ? 'text-red-900' : 'text-gray-900'}`}>Text</h3>
          <p className={`text-sm ${method === 'text' ? 'text-red-700/80' : 'text-gray-500'}`}>Type your medical history manually.</p>
        </button>

      </div>
    </div>
  );
}