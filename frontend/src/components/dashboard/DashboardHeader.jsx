import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

export default function DashboardHeader() {
  const [fullName, setFullName] = useState('');
  const [initials, setInitials] = useState('');

  // Grab the real user's name from local storage when the header loads
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setFullName(user.name);
        
        // Automatically calculate initials (e.g., "Rahul Sharma" -> "RS")
        const nameParts = user.name.split(' ');
        if (nameParts.length >= 2) {
          setInitials((nameParts[0][0] + nameParts[1][0]).toUpperCase());
        } else if (nameParts.length === 1 && nameParts[0].length > 0) {
          setInitials(nameParts[0][0].toUpperCase());
        }
      } catch (error) {
        console.error("Error parsing user data", error);
      }
    }
  }, []);

  return (
    <header className="bg-white border-b border-gray-100 flex items-center justify-between px-6 py-4">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
        
        {/* User Profile Area */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            {/* Dynamic Full Name */}
            <p className="text-sm font-bold text-gray-900">{fullName || 'User'}</p>
            <p className="text-xs text-gray-500 font-medium">Free Plan</p>
          </div>
          {/* Dynamic Initials Avatar */}
          <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm ring-2 ring-pink-50">
            {initials || 'U'}
          </div>
        </div>
      </div>
    </header>
  );
}