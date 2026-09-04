import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Download, ExternalLink, ShieldAlert, Copy, CheckCircle2, QrCode as QrIcon } from 'lucide-react';

export default function QRCodeDashboard() {
  const [copied, setCopied] = useState(false);
  const location = useLocation(); 
  
  // Grab the real ID from the router state, fallback to a demo ID if we navigated here directly
  const emergencyId = location.state?.emergencyId || "MLK-DEMO";
  
  // The URL the QR code will point to (Make sure this points to your frontend URL)
  const emergencyUrl = `http://localhost:5173/emergency/${emergencyId}`;
  
  // Free API to generate a real QR code image
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(emergencyUrl)}&color=111827`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(emergencyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    window.open(qrImageUrl, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-in fade-in duration-500">
      
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Emergency QR</h1>
        <p className="text-gray-500 text-lg">
          This is your lifeline. Keep it on your phone lock screen, in your wallet, or on a medical ID bracelet.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left Column: The QR Code Card */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 w-full h-2 bg-red-500"></div>
            
            <div className="bg-red-50 p-3 rounded-2xl mb-6">
              <QrIcon className="w-8 h-8 text-red-500" />
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-6">Scan for Medical Info</h2>
            
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
              <img 
                src={qrImageUrl} 
                alt="Emergency QR Code" 
                className="w-48 h-48 object-contain"
              />
            </div>
            
            <div className="bg-gray-50 px-6 py-3 rounded-xl border border-gray-100 w-full mb-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Emergency ID</p>
              <p className="text-lg font-mono font-bold text-gray-900 tracking-widest">{emergencyId}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Actions and Information */}
        <div className="lg:col-span-3 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-4 rounded-xl font-bold transition-all active:scale-95 w-full"
              >
                <Download className="w-5 h-5" /> Download QR
              </button>
              
              <button 
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-700 px-6 py-4 rounded-xl font-bold transition-all active:scale-95 w-full"
              >
                {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                {copied ? 'Link Copied!' : 'Copy Link'}
              </button>
            </div>

            <Link 
              to={`/emergency/${emergencyId}`}
              className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-6 py-4 rounded-xl font-bold transition-all active:scale-95 w-full border border-red-100 mt-4"
            >
              <ExternalLink className="w-5 h-5" /> Preview Emergency Profile
            </Link>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-500" /> How to use this safely
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">1</div>
                <p className="text-gray-600 text-sm leading-relaxed"><strong className="text-gray-900">Lock Screen Wallpaper:</strong> Set the downloaded QR code image as your phone's lock screen.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">2</div>
                <p className="text-gray-600 text-sm leading-relaxed"><strong className="text-gray-900">Privacy Warning:</strong> Anyone who scans this code can see your critical medical information.</p>
              </li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
}