import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Loader2 } from 'lucide-react';
import axios from 'axios'; // <-- Import axios
import AuthLayout from '../components/auth/AuthLayout';
import AuthInput from '../components/auth/AuthInput';
import PasswordInput from '../components/auth/PasswordInput';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', agreeTerms: false });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(''); // <-- API error state

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email address.";
    
    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.agreeTerms) {
      newErrors.terms = "You must agree to the Terms of Service.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    
    if (validate()) {
      setIsLoading(true);
      
      try {
        // 1. Register the user
        const response = await axios.post(`${API_URL}/auth/register`, {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // 2. Brand new users ALWAYS start at profile setup (0%)
        setIsLoading(false);
        navigate('/profile-setup');
      } catch (error) {
        setIsLoading(false);
        const message = error.response?.data?.message || 'Failed to connect to server. Please try again.';
        setApiError(message);
      }
    }
  };

  return (
    <AuthLayout 
      title="Create Your Profile" 
      subtitle="Start building your emergency medical profile in a few simple steps."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* API Error Display */}
        {apiError && (
          <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-semibold text-center animate-in fade-in">
            {apiError}
          </div>
        )}

        <AuthInput
          label="Full Name"
          icon={User}
          type="text"
          placeholder="Rahul Sharma"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          disabled={isLoading}
        />

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
        
        <PasswordInput
          label="Password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={errors.password}
          disabled={isLoading}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          error={errors.confirmPassword}
          disabled={isLoading}
        />

        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center">
              <input 
                type="checkbox" 
                className="peer sr-only"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                disabled={isLoading}
              />
              <div className={`w-5 h-5 border-2 rounded transition-colors flex items-center justify-center ${errors.terms ? 'border-red-500' : 'border-gray-300 peer-checked:border-red-500 peer-checked:bg-red-500'}`}>
                <svg className={`w-3.5 h-3.5 text-white ${formData.agreeTerms ? 'opacity-100' : 'opacity-0'} transition-opacity`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <span className={`text-sm select-none mt-0.5 ${errors.terms ? 'text-red-500 font-medium' : 'text-gray-600'}`}>
              I agree to the Terms of Service and Privacy Policy.
            </span>
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          onClick={() => alert("Google Sign-In is coming soon! Please use email and password for this prototype.")}
          className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white py-4 rounded-xl font-bold text-lg transition-all active:scale-95 flex justify-center items-center gap-2 mt-4"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-gray-600">
        Already have an account? <Link to="/login" className="text-red-500 font-bold hover:underline ml-1">Sign In</Link>
      </div>
    </AuthLayout>
  );
}