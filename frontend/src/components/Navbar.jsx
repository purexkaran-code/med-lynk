import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Activity } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-red-50 p-2 rounded-xl group-hover:bg-red-100 transition-colors">
                <Activity className="h-6 w-6 text-red-500" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-gray-900">Med-Lynk</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Home</Link>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">How It Works</a>
            <Link to="/emergency" className="text-red-500 hover:text-red-600 font-semibold transition-colors">Emergency Access</Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Sign In</Link>
            <Link to="/signup" className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-full font-medium transition-all active:scale-95">
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg">Home</Link>
            <a href="#how-it-works" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg">How It Works</a>
            <Link to="/emergency" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-semibold text-red-500 hover:bg-red-50 rounded-lg">Emergency Access</Link>
            <div className="border-t border-gray-100 mt-4 pt-4 flex flex-col gap-3">
              <Link to="/login" onClick={() => setIsOpen(false)} className="block text-center w-full px-4 py-3 border border-gray-200 text-gray-900 font-medium rounded-xl">Sign In</Link>
              <Link to="/signup" onClick={() => setIsOpen(false)} className="block text-center w-full px-4 py-3 bg-gray-900 text-white font-medium rounded-xl">Sign Up</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}