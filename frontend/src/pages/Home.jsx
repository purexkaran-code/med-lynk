import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, Sparkles, QrCode, Mic, FileCheck, Droplet, AlertTriangle, Pill, HeartPulse, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full">
      
      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Copy */}
            <div className="text-center lg:text-left space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
                When You Can't Speak, <br />
                <span className="text-red-500">Your Medical History Can.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto lg:mx-0">
                Med-Lynk keeps your critical medical information organized and accessible when it matters most.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/signup" className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all active:scale-95 shadow-lg shadow-red-500/20">
                  Create Your Profile <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/emergency" className="flex items-center justify-center bg-pink-50 hover:bg-pink-100 text-red-500 border border-pink-200 px-8 py-4 rounded-full font-semibold text-lg transition-all active:scale-95">
                  Emergency Access
                </Link>
              </div>
            </div>

            {/* Hero Visual Concept (CSS/Icons only) */}
            <div className="relative mx-auto w-full max-w-md perspective-1000">
              <div className="absolute inset-0 bg-pink-100 blur-3xl opacity-50 rounded-full animate-pulse"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 transform rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-500">
                <div className="flex justify-between items-start mb-8">
                  <div className="bg-red-500 text-white p-3 rounded-2xl shadow-md">
                    <Activity className="w-8 h-8" />
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <QrCode className="w-10 h-10 text-gray-900" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-100 rounded-full w-1/3"></div>
                  <div className="h-8 bg-gray-100 rounded-full w-3/4"></div>
                  <div className="h-4 bg-gray-100 rounded-full w-1/2"></div>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-pink-50 p-4 rounded-2xl border border-pink-100">
                    <Droplet className="w-6 h-6 text-red-500 mb-2" />
                    <p className="text-xs text-gray-500 font-medium">Blood Group</p>
                    <p className="font-bold text-gray-900">O Positive</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
                    <AlertTriangle className="w-6 h-6 text-orange-500 mb-2" />
                    <p className="text-xs text-gray-500 font-medium">Allergy</p>
                    <p className="font-bold text-gray-900">Penicillin</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. TRUST / VALUE SECTION */}
      <section className="bg-white py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            
            <div className="flex flex-col items-center p-6 group">
              <div className="bg-red-50 p-4 rounded-2xl text-red-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Critical Information</h3>
              <p className="text-gray-500 leading-relaxed">Show important information quickly during emergencies when seconds count.</p>
            </div>

            <div className="flex flex-col items-center p-6 group">
              <div className="bg-pink-100 p-4 rounded-2xl text-pink-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Organized</h3>
              <p className="text-gray-500 leading-relaxed">Turn your natural medical history into beautifully structured clinical information.</p>
            </div>

            <div className="flex flex-col items-center p-6 group">
              <div className="bg-gray-100 p-4 rounded-2xl text-gray-900 mb-6 group-hover:scale-110 transition-transform duration-300">
                <QrCode className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Emergency Ready</h3>
              <p className="text-gray-500 leading-relaxed">Access your secure profile instantly through a dedicated emergency QR code.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Med-Lynk Works</h2>
            <p className="text-gray-500 text-lg">Four simple steps to being emergency prepared.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {[
              { num: "01", icon: Mic, title: "Tell Your Story", desc: "Describe your medical history using voice or text." },
              { num: "02", icon: Sparkles, title: "AI Organizes It", desc: "Med-Lynk structures the information into a clear medical profile." },
              { num: "03", icon: FileCheck, title: "Complete Your Profile", desc: "Answer a few personalized questions to fill important gaps." },
              { num: "04", icon: QrCode, title: "Be Emergency Ready", desc: "Generate your emergency QR for quick access when needed." }
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div className="text-6xl font-black text-gray-50 absolute -top-4 -right-4 group-hover:text-pink-50 transition-colors">
                  {step.num}
                </div>
                <step.icon className="w-10 h-10 text-gray-900 mb-6 relative z-10" />
                <h4 className="text-xl font-bold text-gray-900 mb-3 relative z-10">{step.title}</h4>
                <p className="text-gray-500 relative z-10">{step.desc}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* 5. EMERGENCY ACCESS SECTION */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8 order-2 lg:order-1">
              <div className="inline-block bg-red-100 text-red-600 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
                FIRST RESPONDER VIEW
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Critical information. <br />Right when it's needed.
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed">
                When a first responder scans your emergency QR code, they bypass the login screen and are instantly presented with your vital statistics. Only critical life-saving data is shown.
              </p>
              <Link to="/emergency" className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all active:scale-95">
                Try Emergency Access <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Mock Emergency Card */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="bg-red-500 p-6 flex flex-col items-center text-white text-center">
                  <Activity className="w-12 h-12 mb-3" />
                  <h3 className="text-2xl font-black tracking-widest uppercase">Emergency View</h3>
                  <p className="text-red-100 text-sm font-medium mt-1">Authorized Responder Access</p>
                </div>
                <div className="p-6 space-y-6">
                  
                  <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                    <Droplet className="w-8 h-8 text-red-500 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Blood Group</p>
                      <p className="text-xl font-bold text-gray-900">O+</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                    <AlertTriangle className="w-8 h-8 text-orange-500 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Critical Allergy</p>
                      <p className="text-xl font-bold text-gray-900">Penicillin <span className="text-sm font-medium bg-red-100 text-red-600 px-2 py-0.5 rounded ml-2">Severe</span></p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                    <Pill className="w-8 h-8 text-blue-500 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Current Medication</p>
                      <p className="text-lg font-bold text-gray-900">Asthma Inhaler</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <HeartPulse className="w-8 h-8 text-pink-500 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Medical Condition</p>
                      <p className="text-lg font-bold text-gray-900">Asthma</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="bg-gray-900 py-24 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Be prepared before an emergency happens.
          </h2>
          <p className="text-xl text-gray-400">
            Create your Med-Lynk profile today and keep your most important medical information within reach.
          </p>
          <div className="pt-4">
            <Link to="/signup" className="inline-block bg-red-500 hover:bg-red-600 text-white px-10 py-5 rounded-full font-bold text-xl transition-all active:scale-95 shadow-xl shadow-red-500/20">
              Create My Profile
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}