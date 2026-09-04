import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DashboardLayout from './components/dashboard/DashboardLayout';
import MedicalProfile from './pages/MedicalProfile';
import Questionnaire from './pages/Questionnaire';
import ProfileReview from './pages/ProfileReview';
import QRCodeDashboard from './pages/QRCodeDashboard';
import EmergencyView from './pages/EmergencyView';

const MainLayout = () => (
  <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col selection:bg-pink-100 selection:text-pink-900">
    <Navbar />
    <main className="flex-grow flex flex-col">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const Placeholder = ({ title }) => (
  <div className="flex h-[60vh] items-center justify-center text-gray-500 bg-white rounded-3xl border border-gray-200 shadow-sm animate-in fade-in">
    {title} Page Placeholder
  </div>
);

function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* AUTH ROUTES */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* DASHBOARD ROUTES */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<MedicalProfile />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/profile-review" element={<ProfileReview />} />
          <Route path="/qr" element={<QRCodeDashboard />} />

          <Route
            path="/medical-history"
            element={<Placeholder title="Medical History" />}
          />

          <Route
            path="/settings"
            element={<Placeholder title="Settings" />}
          />
        </Route>

        {/* EMERGENCY ACCESS */}
        <Route path="/emergency" element={<EmergencyView />} />
        <Route path="/emergency/:id" element={<EmergencyView />} />

      </Routes>
    </Router>
  );
}

export default App;