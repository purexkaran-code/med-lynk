import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Droplet, AlertTriangle, Pill, HeartPulse, QrCode, ShieldAlert, ArrowRight, CheckCircle2, Clock, PlusCircle, Mic } from 'lucide-react';

export default function Dashboard() {
  const [userName, setUserName] = useState('');

  // Grab the real user's name when the dashboard loads
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        // Split the name to just get the first name
        const firstName = user.name.split(' ')[0];
        setUserName(firstName);
      } catch (error) {
        console.error("Error parsing user data", error);
      }
    }
  }, []);
  
  const ProfileCompletionCard = () => (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-pink-100 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-80 transition-opacity"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 flex-1">
          <h2 className="text-2xl font-bold text-gray-900">Complete your medical profile</h2>
          <p className="text-gray-500 max-w-lg">Add the remaining information so your emergency profile is ready when you need it.</p>
          
          <div className="pt-2 max-w-md">
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-pink-600">Profile Completion</span>
              <span className="text-gray-900">80% Complete</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div className="bg-red-500 h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>
        
        <Link to="/profile" className="inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-bold transition-all active:scale-95 whitespace-nowrap shadow-lg shadow-red-500/20">
          Complete Profile <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );

  const MedicalSummaryCards = () => {
    const stats = [
      { label: "Blood Group", value: "O+", icon: Droplet, color: "text-red-500", bg: "bg-red-50", border: "border-red-100" },
      { label: "Critical Allergies", value: "2", icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-100" },
      { label: "Medications", value: "3", icon: Pill, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100" },
      { label: "Conditions", value: "1", icon: HeartPulse, color: "text-pink-500", bg: "bg-pink-50", border: "border-pink-100" },
    ];

    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border ${stat.border} group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-gray-400">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
    );
  };

  const EmergencyCards = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* QR Card */}
      <div className="bg-gray-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden group border border-gray-800">
        <div className="absolute -right-8 -top-8 text-gray-800 opacity-20 group-hover:scale-110 transition-transform duration-500">
          <QrCode className="w-64 h-64" />
        </div>
        <div className="relative z-10 h-full flex flex-col">
          <div className="bg-gray-800 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
            <QrCode className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Your Emergency QR</h3>
          <p className="text-gray-400 mb-8 max-w-sm">Let trusted people and emergency responders access your critical medical information quickly.</p>
          <div className="mt-auto flex flex-wrap gap-3">
            <Link to="/qr" className="bg-white text-gray-900 hover:bg-gray-50 px-6 py-3 rounded-xl font-bold transition-all active:scale-95 text-center flex-1 sm:flex-none">
              View Emergency QR
            </Link>
            <button className="bg-gray-800 text-white hover:bg-gray-700 px-6 py-3 rounded-xl font-bold transition-all text-center flex-1 sm:flex-none">
              How it works
            </button>
          </div>
        </div>
      </div>

      {/* Access Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-red-100 flex flex-col">
        <div className="bg-red-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-red-100">
          <ShieldAlert className="w-6 h-6 text-red-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Emergency Access</h3>
        <p className="text-gray-500 mb-8 max-w-sm">Your emergency profile can be accessed through your secure emergency link.</p>
        <div className="mt-auto">
          <Link to="/emergency" className="inline-flex w-full sm:w-auto items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 px-6 py-3 rounded-xl font-bold transition-all active:scale-95 border border-red-100">
            Open Emergency View
          </Link>
        </div>
      </div>
    </div>
  );

  const BottomSection = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Recent Access */}
      <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Recent Emergency Access</h3>
          <button className="text-sm font-bold text-red-500 hover:text-red-600">View All</button>
        </div>
        <div className="space-y-4">
          {[
            { time: 'Today, 10:32 AM', status: 'Emergency profile viewed' },
            { time: 'Yesterday, 6:45 PM', status: 'Emergency profile viewed' },
            { time: 'Aug 30, 2:18 PM', status: 'Emergency profile viewed' },
          ].map((log, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-50 bg-gray-50/50 hover:bg-gray-50 transition-colors">
              <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100">
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{log.status}</p>
                <p className="text-sm text-gray-500">{log.time}</p>
              </div>
              <div className="ml-auto">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
        <div className="space-y-3">
          <Link to="/profile" className="flex items-center gap-3 w-full p-4 rounded-2xl bg-gray-50 hover:bg-red-50 hover:text-red-600 transition-colors border border-gray-100 text-gray-700 font-semibold group">
            <PlusCircle className="w-5 h-5 text-gray-400 group-hover:text-red-500" /> Complete Medical Profile
          </Link>
          <Link to="/medical-history" className="flex items-center gap-3 w-full p-4 rounded-2xl bg-gray-50 hover:bg-pink-50 hover:text-pink-600 transition-colors border border-gray-100 text-gray-700 font-semibold group">
            <Mic className="w-5 h-5 text-gray-400 group-hover:text-pink-500" /> Add Medical History
          </Link>
          <Link to="/qr" className="flex items-center gap-3 w-full p-4 rounded-2xl bg-gray-50 hover:bg-gray-900 hover:text-white transition-colors border border-gray-100 text-gray-700 font-semibold group">
            <QrCode className="w-5 h-5 text-gray-400 group-hover:text-white" /> Generate Emergency QR
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Welcome Section */}
      <div>
        {/* Dynamic Name is injected right here */}
        <h1 className="text-3xl font-bold text-gray-900">Good morning, {userName || 'there'} 👋</h1>
        <p className="text-gray-500 mt-1 text-lg">Here's an overview of your emergency medical profile.</p>
      </div>

      <ProfileCompletionCard />
      <MedicalSummaryCards />
      <EmergencyCards />
      <BottomSection />

    </div>
  );
}