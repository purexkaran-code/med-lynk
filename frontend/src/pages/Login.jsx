import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Loader2 } from 'lucide-react';
import axios from 'axios'; // <-- Import axios
import AuthLayout from '../components/auth/AuthLayout';
import AuthInput from '../components/auth/AuthInput';
import PasswordInput from '../components/auth/PasswordInput';

// Define your backend URL (make sure it matches your server port, usually 5000)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(''); // <-- New state for backend errors

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email address.";
    
    if (!formData.password) newErrors.password = "Password is required.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(''); // Clear previous errors
    
    if (validate()) {
      setIsLoading(true);
      
      try {
        // 1. Login the user
        const response = await axios.post(`${API_URL}/auth/login`, {
          email: formData.email,
          password: formData.password
        });
        
        const token = response.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // 2. Fetch their real profile progress from the database
        const profileRes = await axios.get(`${API_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const profileData = profileRes.data.profile;
        setIsLoading(false);

        // 3. SMART REDIRECT: Send them exactly where they left off!
        if (profileData.isProfileComplete) {
          navigate('/dashboard');
        } else if (profileData.onboardingStep === 'questionnaire') {
          navigate('/questionnaire');
        } else if (profileData.onboardingStep === 'review') {
          navigate('/profile-review');
        } else {
          navigate('/profile-setup');
        }
      } catch (error) {
        setIsLoading(false);
        // Safely extract the backend error message
        const message = error.response?.data?.message || 'Failed to connect to server. Please try again.';
        setApiError(message);
      }
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to access your emergency medical profile."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* API Error Display */}
        {apiError && (
          <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-semibold text-center animate-in fade-in">
            {apiError}
          </div>
        )}

        <AuthInput
          label="Email Address"
          icon={Mail}
          type="email"
          placeholder="rahul@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          disabled={isLoading}
        />
        
        <div className="space-y-2">
          <PasswordInput
            value={formData.password}
            placeholder="••••••••"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
            disabled={isLoading}
          />
          <div className="flex justify-end">
            <button type="button" className="text-sm text-gray-500 hover:text-red-500 font-medium transition-colors">
              Forgot password?
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white py-4 rounded-xl font-bold text-lg transition-all active:scale-95 flex justify-center items-center gap-2"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
        </button>

        {/* ... Rest of the component stays exactly the same (OR divider, Google button, etc.) ... */}
        
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">OR</span>
          </div>
        </div>

        <button 
          type="button" 
          disabled={isLoading}
          onClick={() => alert("Google Sign-In is coming soon! Please use email and password for this prototype.")}
          className="w-full bg-white hover:bg-gray-50 border-2 border-gray-100 text-gray-700 py-3.5 rounded-xl font-bold transition-all active:scale-95 flex justify-center items-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-gray-600">
        Don't have an account? <Link to="/signup" className="text-red-500 font-bold hover:underline ml-1">Create Account</Link>
      </div>
    </AuthLayout>
  );
}