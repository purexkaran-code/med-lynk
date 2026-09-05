import { Mic, Activity, Clock, ShieldAlert } from 'lucide-react';

export default function MedicalHistory() {
  return (
    <div className="max-w-4xl mx-auto pb-12 animate-in fade-in duration-500 pt-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Medical History</h1>
        <p className="text-gray-500 mt-1 text-lg">Detailed chronological health records and voice notes.</p>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm text-center relative overflow-hidden">
        {/* Background ambient decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center max-w-lg mx-auto">
          <div className="bg-pink-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border border-pink-100 shadow-sm">
            <Mic className="w-10 h-10 text-pink-500" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Voice-Powered History Logs</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            We are building an AI-powered medical history logger for Med-Lynk Phase 2. Soon, users will be able to simply speak into their phones to log daily symptoms, doctor visits, and historical health data.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 text-left">
              <Activity className="w-6 h-6 text-red-500 shrink-0" />
              <div>
                <span className="block text-sm font-bold text-gray-900">Timeline Tracking</span>
                <span className="block text-xs text-gray-500">Visual health progression</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 text-left">
              <Clock className="w-6 h-6 text-blue-500 shrink-0" />
              <div>
                <span className="block text-sm font-bold text-gray-900">Chronological Logs</span>
                <span className="block text-xs text-gray-500">Auto-sorted by date</span>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-bold text-sm">
            <ShieldAlert className="w-4 h-4" /> Feature Scoped for v2.0
          </div>
        </div>
      </div>
    </div>
  );
}