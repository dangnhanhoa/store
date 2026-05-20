import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';


function LoginPage() {
  const { login, error: authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';
  const redirectMessage = location.state?.message;

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setLocalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!formData.username || !formData.password) {
      setLocalError('Please enter both username and password');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(formData.username, formData.password);
      navigate(from, { replace: true });
    } catch (err) {
      setLocalError(err.message || 'Login failed, please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => navigate(-1);

  const displayError = localError || authError;

  return (
    <div className="min-h-screen flex">
      {/* ── Brand panel (desktop only) ── */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 relative overflow-hidden
                      flex-col items-center justify-center p-12
                      bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white">
        {/* Background glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-xs text-center">
          <Link to="/" className="inline-block mb-10">
            <div className="bg-white rounded-2xl p-3 inline-block shadow-lg">
              <img src="/NH_Store_logo.png" alt="BookStore" className="h-14 w-auto object-contain" />
            </div>
          </Link>

          <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-blue-100 leading-relaxed">
            Sign in to access your account and continue exploring books.
          </p>
        </div>
      </div>

      {/* ── Form panel ── */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-slate-50">
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
            <div className="flex items-center justify-between mb-7">
              <h1 className="text-2xl font-bold text-slate-800">Sign In</h1>
              <button
                type="button"
                onClick={handleBack}
                className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
              >
                ← Back
              </button>
            </div>

            {redirectMessage && (
              <div className="mb-4 text-sm text-blue-700 bg-blue-50 border border-blue-100 rounded-xl p-3">
                {redirectMessage}
              </div>
            )}

            {displayError && (
              <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl p-3">
                {displayError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Email or username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field pr-11"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-3 mt-1 text-base"
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-500 text-center">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
