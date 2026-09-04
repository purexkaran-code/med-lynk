import { Link } from 'react-router-dom';
import { Activity, ShieldAlert } from 'lucide-react';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-12 bg-gray-50">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Brand & Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <Link to="/" className="flex items-center gap-2 group mb-6">
            <div className="bg-red-50 p-2 rounded-xl group-hover:bg-red-100 transition-colors">
              <Activity className="h-6 w-6 text-red-500" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-gray-900">Med-Lynk</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          {subtitle && <p className="text-gray-500 text-sm sm:text-base px-4">{subtitle}</p>}
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 sm:p-8">
          {children}
        </div>

        {/* Emergency Access Link */}
        <div className="mt-8 text-center">
          <Link to="/emergency" className="inline-flex items-center justify-center gap-2 text-red-500 hover:text-red-600 font-semibold transition-colors bg-red-50 hover:bg-red-100 px-6 py-2.5 rounded-full">
            <ShieldAlert className="w-4 h-4" />
            Emergency Access
          </Link>
        </div>

      </div>
    </div>
  );
}