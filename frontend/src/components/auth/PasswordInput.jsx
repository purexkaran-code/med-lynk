import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import AuthInput from './AuthInput';

export default function PasswordInput({ label = "Password", error, ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <AuthInput
        label={label}
        type={showPassword ? "text" : "password"}
        icon={Lock}
        error={error}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-[38px] text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
  );
}