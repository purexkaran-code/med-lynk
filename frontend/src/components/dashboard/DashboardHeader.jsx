import { Menu, Bell } from 'lucide-react';

export default function DashboardHeader({ openSidebar }) {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
        
        <div className="flex items-center gap-4">
          <button 
            onClick={openSidebar}
            className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-bold text-gray-900">Karan Parmar</p>
              <p className="text-xs text-gray-500 font-medium">Free Plan</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-pink-100 border-2 border-pink-200 flex items-center justify-center text-pink-600 font-bold shadow-sm">
              KP
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}