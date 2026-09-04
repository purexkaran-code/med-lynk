import { NavLink } from 'react-router-dom';
import { Home, Heart, Mic, QrCode, ShieldAlert, Settings, LogOut, Activity, X } from 'lucide-react';

export default function DashboardSidebar({ isOpen, closeSidebar }) {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Medical Profile', path: '/profile', icon: Heart },
    { name: 'Medical History', path: '/medical-history', icon: Mic },
    { name: 'Emergency QR', path: '/qr', icon: QrCode },
    { name: 'Emergency Access', path: '/emergency', icon: ShieldAlert },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-gray-100 w-72">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-2 group">
          <div className="bg-red-50 p-2 rounded-xl">
            <Activity className="h-6 w-6 text-red-500" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-gray-900">Med-Lynk</span>
        </div>
        {/* Close button for mobile only */}
        <button onClick={closeSidebar} className="lg:hidden p-2 text-gray-500 hover:text-gray-900 rounded-lg bg-gray-50">
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${
                isActive
                  ? 'bg-pink-50 text-red-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-3 px-4 py-3.5 w-full rounded-xl font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden animate-in fade-in"
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar Container */}
      <aside className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {sidebarContent}
      </aside>
    </>
  );
}