import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-5 w-5 text-red-500" />
            <span className="font-bold text-xl text-gray-900">Med-Lynk</span>
          </div>
          <p className="text-gray-500 text-sm">Emergency medical information, when it matters most.</p>
        </div>

        <div className="flex gap-6 text-sm font-medium text-gray-500">
          <Link to="#" className="hover:text-gray-900 transition-colors">Privacy</Link>
          <Link to="#" className="hover:text-gray-900 transition-colors">Terms</Link>
          <Link to="/emergency" className="text-red-500 hover:text-red-600 transition-colors">Emergency Access</Link>
        </div>
      </div>
    </footer>
  );
}