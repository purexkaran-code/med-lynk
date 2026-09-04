import { ShieldCheck } from 'lucide-react';

export default function PrivacyNotice() {
  return (
    <div className="mt-8 bg-gray-900 rounded-2xl p-5 flex items-start gap-4 text-left">
      <div className="bg-gray-800 p-2 rounded-xl shrink-0">
        <ShieldCheck className="w-6 h-6 text-green-400" />
      </div>
      <div>
        <h4 className="text-white font-bold mb-1">Your information is sensitive.</h4>
        <p className="text-gray-400 text-sm leading-relaxed">
          Med-Lynk is designed to keep your emergency medical information protected and accessible only through authorized emergency access.
        </p>
      </div>
    </div>
  );
}