import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Loader } from 'lucide-react';
import { useAuth } from '../context';

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    setError('');
  };

  // All validation logic unchanged
  const validateForm = () => {
    if (!formData.username.trim()) { setError('Please enter a username'); return false; }
    if (formData.username.length < 3) { setError('Username must be at least 3 characters'); return false; }
    if (!formData.email.trim()) { setError('Please enter an email'); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { setError('Invalid email address'); return false; }
    if (!formData.password) { setError('Please enter a password'); return false; }
    if (formData.password.length < 6) { setError('Password must be at least 6 characters'); return false; }
    if (formData.password !== formData.confirmPassword) { setError('Password confirmation does not match'); return false; }
    if (!formData.agreeTerms) { setError('Please agree to the terms of service'); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');
    try {
      await register({ username: formData.username, email: formData.email, password: formData.password });
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Brand panel (desktop only) ── */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 relative overflow-hidden
                      flex-col items-center justify-center p-12
                      bg-gradient-to-br from-indigo-700 via-blue-800 to-blue-900 text-white">
        {/* Background glows */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-indigo-500/20 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-xs text-center">
          <Link to="/" className="inline-block mb-10">
            <div className="bg-white rounded-2xl p-3 inline-block shadow-lg">
              <img src="/NH_Store_logo.png" alt="BookStore" className="h-14 w-auto object-contain" />
            </div>
          </Link>

          <h2 className="text-2xl font-bold mb-4">Join the Community</h2>
          <p className="text-blue-100 leading-relaxed">
            Create your account and start discovering books you'll love.
          </p>
        </div>
      </div>

      {/* ── Form panel ── */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-slate-50 overflow-y-auto">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/">
              <div className="bg-white rounded-xl p-2 inline-block shadow-sm border border-slate-100">
                <img src="/NH_Store_logo.png" alt="BookStore" className="h-12 w-auto object-contain" />
              </div>
            </Link>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-slate-800">Create Account</h1>
              <p className="text-slate-500 text-sm mt-1">Join the book lover community</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl p-3 text-sm">
                  {error}
                </div>
              )}

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Username <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    className="input-field pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="input-field pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
                    className="input-field pl-10 pr-11"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    className="input-field pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <span className="text-sm text-slate-600">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:underline font-medium">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-blue-600 hover:underline font-medium">Privacy Policy</a>
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-3 mt-1 text-base"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <p className="text-center text-slate-500 text-sm mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
