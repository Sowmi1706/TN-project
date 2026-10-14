import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User as UserIcon, Shield, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { User, UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onSuccess: (user: User) => void;
  onClose: () => void;
  canCloseWithoutAuth?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onSuccess,
  onClose,
  canCloseWithoutAuth = false
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('tourist');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isRegister) {
      if (!fullName.trim() || !email.trim() || !username.trim() || !password.trim()) {
        setError('Please fill in all required fields.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }

      const newUser: User = {
        id: `usr-${Date.now()}`,
        name: fullName,
        email,
        username,
        role,
        firstBookingDiscountUsed: false,
        termsAcceptedVersion: undefined // Will prompt terms
      };
      onSuccess(newUser);
    } else {
      // Login
      if (!username.trim() && !email.trim()) {
        setError('Please enter your username or email.');
        return;
      }
      if (!password.trim()) {
        setError('Please enter your password.');
        return;
      }

      const existingUser: User = {
        id: `usr-${Date.now()}`,
        name: username.includes('@') ? username.split('@')[0] : username,
        email: email || `${username}@example.com`,
        username: username,
        role,
        firstBookingDiscountUsed: false,
        termsAcceptedVersion: 'v2.4'
      };
      onSuccess(existingUser);
    }
  };

  const handleQuickDemoLogin = (roleType: UserRole) => {
    const demoProfiles: Record<UserRole, User> = {
      tourist: {
        id: 'usr-tourist-kavitha',
        name: 'Kavitha Ramasamy',
        email: 'kavitha.tourist@example.com',
        username: 'kavitha_tn',
        role: 'tourist',
        firstBookingDiscountUsed: false,
        termsAcceptedVersion: 'v2.4'
      },
      admin: {
        id: 'usr-admin-director',
        name: 'TN Tourism Admin (Commissioner)',
        email: 'director@tntourism.gov.in',
        username: 'admin_tntourism',
        role: 'admin',
        firstBookingDiscountUsed: true,
        termsAcceptedVersion: 'v2.4'
      },
      sponsor: {
        id: 'usr-sponsor-aavin',
        name: 'Aavin Brand Manager',
        email: 'sponsorship@aavin.tn.gov.in',
        username: 'aavin_partner',
        role: 'sponsor',
        firstBookingDiscountUsed: false,
        termsAcceptedVersion: 'v2.4'
      },
      partner: {
        id: 'usr-partner-marina',
        name: 'Marina Beach Amenities Manager',
        email: 'amenities@marinabeach.org',
        username: 'partner_marina',
        role: 'partner',
        firstBookingDiscountUsed: false,
        termsAcceptedVersion: 'v2.4'
      }
    };
    onSuccess(demoProfiles[roleType]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 px-6 py-7 text-white relative">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
              <Sparkles className="w-3 h-3" />
              <span>TN Stories Account</span>
            </span>
            {canCloseWithoutAuth && (
              <button
                type="button"
                onClick={onClose}
                className="text-stone-400 hover:text-white text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            {isRegister ? 'Create Your TN Stories Account' : 'Welcome Back, Traveler'}
          </h2>
          <p className="text-xs text-amber-200/80 mt-1">
            {isRegister 
              ? 'Join to unlock personalized itineraries, smart bookings & 10% first-trip discount.'
              : 'Sign in to access your offline trips, tickets, spin rewards & bookings.'}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Meenakshi Sundaram"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                    required={isRegister}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {isRegister ? 'Email Address' : 'Username or Email'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type={isRegister ? 'email' : 'text'}
                  value={isRegister ? email : username}
                  onChange={(e) => isRegister ? setEmail(e.target.value) : setUsername(e.target.value)}
                  placeholder={isRegister ? 'you@example.com' : 'Enter username or email'}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                  required
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Desired Username</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. tamil_explorer"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                    required={isRegister}
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-stone-700">Password</label>
                {!isRegister && (
                  <button
                    type="button"
                    onClick={() => alert('For testing, you can use any demo password or click one of the Fast Demo Login buttons below.')}
                    className="text-[11px] text-amber-700 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-9 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600 cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-9 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                    required={isRegister}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-bold text-xs rounded-xl shadow-md shadow-amber-900/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>{isRegister ? 'Register & Continue' : 'Sign In to TN Stories'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Toggle between Login and Register */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError(null);
              }}
              className="text-xs text-stone-600 hover:text-amber-800 font-semibold cursor-pointer"
            >
              {isRegister 
                ? 'Already have an account? Sign In'
                : "Don't have an account? Create New Account"}
            </button>
          </div>

          {/* Instant Demo Login for Testing */}
          <div className="mt-6 pt-4 border-t border-stone-200">
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2 text-center">
              Quick 1-Click Demo Profiles
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('tourist')}
                className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-900 text-[11px] font-bold text-center cursor-pointer transition-colors"
              >
                <div>🎒 Tourist</div>
                <div className="text-[9px] text-amber-700 font-normal">Kavitha</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin')}
                className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100/80 border border-purple-200 text-purple-900 text-[11px] font-bold text-center cursor-pointer transition-colors"
              >
                <div>🛡️ Admin</div>
                <div className="text-[9px] text-purple-700 font-normal">Commissioner</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('sponsor')}
                className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-[11px] font-bold text-center cursor-pointer transition-colors"
              >
                <div>🎁 Sponsor</div>
                <div className="text-[9px] text-emerald-700 font-normal">Aavin Brand</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
