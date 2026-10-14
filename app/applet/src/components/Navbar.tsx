import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Sparkles, 
  CloudRain, 
  WifiOff, 
  Wifi, 
  Gift, 
  Bus, 
  ShieldAlert, 
  Umbrella, 
  PiggyBank, 
  Globe, 
  User as UserIcon, 
  LogOut, 
  ShieldCheck, 
  Settings, 
  Menu, 
  X,
  Ticket
} from 'lucide-react';
import { Language, User, UserPreferences, WeatherInfo } from '../types';
import { getTranslation } from '../utils/translations';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  user: User;
  onOpenAuth: () => void;
  onLogout: () => void;
  preferences: UserPreferences;
  onEditPreferences: () => void;
  weatherAlerts: WeatherInfo[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBookingWizard: () => void;
  onOpenSpin: () => void;
  onOpenAdmin: () => void;
  isOnline: boolean;
  hasRedAlert: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  user,
  onOpenAuth,
  onLogout,
  preferences,
  onEditPreferences,
  activeTab,
  setActiveTab,
  onOpenBookingWizard,
  onOpenSpin,
  onOpenAdmin,
  isOnline,
  hasRedAlert
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const t = (key: string, fallback?: string) => getTranslation(currentLang, key, fallback);

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
    { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' }
  ];

  const navItems = [
    { id: 'home', label: t('home', 'Home'), icon: Compass },
    { id: 'destinations', label: t('destinations', 'Destinations'), icon: MapPin },
    { id: 'weather', label: t('weatherSafety', 'Weather & Danger Zones'), icon: CloudRain, alert: hasRedAlert },
    { id: 'offline', label: t('offlineMode', 'Offline Trip'), icon: WifiOff },
    { id: 'beach', label: t('beachFacilities', 'Beach Changing Rooms'), icon: Umbrella },
    { id: 'travel_kit', label: t('travelKit', 'Free Travel Kit'), icon: Gift },
    { id: 'bus_booking', label: t('busBooking', 'Group Bus Booking'), icon: Bus },
    { id: 'savings', label: t('savingsPlanner', 'Savings Planner'), icon: PiggyBank },
    { id: 'my_bookings', label: t('myBookings', 'My Bookings'), icon: Ticket }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top Notification Bar for Safety & Promotions */}
      <div className="bg-stone-900 text-stone-200 px-4 py-1.5 text-xs font-medium flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-amber-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TN Stories AI</span>
          </span>
          <span className="text-stone-400 hidden sm:inline">|</span>
          <span className="truncate max-w-xs sm:max-w-md text-stone-300">
            {t('appTagline', 'Every place has a STORY')} • Explore 100% Tamil Nadu Destinations
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          {hasRedAlert && (
            <button 
              onClick={() => setActiveTab('weather')}
              className="flex items-center gap-1 text-red-400 bg-red-950/60 hover:bg-red-900 px-2 py-0.5 rounded-sm border border-red-800 animate-pulse cursor-pointer"
            >
              <ShieldAlert className="w-3 h-3" />
              <span>Red Alert Active</span>
            </button>
          )}

          <div className="flex items-center gap-1.5">
            {isOnline ? (
              <span className="flex items-center gap-1 text-emerald-400">
                <Wifi className="w-3 h-3" />
                <span className="hidden md:inline">Online</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-amber-400">
                <WifiOff className="w-3 h-3" />
                <span>Offline Active</span>
              </span>
            )}
          </div>

          {/* Quick Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1 text-stone-300 hover:text-white transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span className="uppercase font-semibold">{currentLang}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-40 bg-white rounded-lg shadow-xl border border-stone-200 py-1 z-50 text-stone-800">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      onLanguageChange(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-amber-50 cursor-pointer ${
                      currentLang === l.code ? 'font-bold text-amber-700 bg-amber-50/50' : 'text-stone-700'
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className="text-stone-400 text-[11px]">{l.native}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 flex items-center justify-center text-white shadow-md shadow-amber-900/20 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <div className="font-extrabold text-xl tracking-tight text-stone-900 font-display flex items-center gap-1">
                  TN <span className="text-amber-700">Stories</span>
                </div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-stone-500">
                  Explore Tamil Nadu
                </div>
              </div>
            </button>

            {/* Travel Preferences Summary Chip */}
            <button
              onClick={onEditPreferences}
              className="hidden lg:flex items-center gap-2 ml-4 px-3 py-1 rounded-full bg-stone-100 hover:bg-stone-200/80 border border-stone-200 text-stone-700 text-xs transition-all cursor-pointer group"
              title="Click to change your personalized trip preferences"
            >
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
              <span className="font-medium capitalize">
                {preferences.groupType} Trip • {preferences.tripPurpose.replace('_', ' ')}
              </span>
              <span className="text-[10px] text-amber-700 font-semibold group-hover:underline">
                {t('editPreferences', 'Edit')}
              </span>
            </button>
          </div>

          {/* Center Nav Links - Desktop */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.slice(0, 7).map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-amber-600 text-white shadow-xs' 
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.alert && (
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Daily Spin & Win Button */}
            <button
              onClick={onOpenSpin}
              className="relative flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-500/20 transition-all hover:scale-105 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span className="hidden sm:inline">Daily Spin</span>
              <span className="sm:hidden">Spin</span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border border-white"></span>
            </button>

            {/* Primary Action: Book Your Trip */}
            <button
              onClick={onOpenBookingWizard}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-amber-400 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t('bookYourTrip', 'Book Trip')}</span>
            </button>

            {/* User / Admin Controls */}
            {user ? (
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => setActiveTab('my_bookings')}
                  className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
                    activeTab === 'my_bookings'
                      ? 'bg-amber-100 border-amber-300 text-amber-900'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                  title="My Bookings & Tickets"
                >
                  <Ticket className="w-4 h-4" />
                </button>

                {user.role === 'admin' ? (
                  <button
                    onClick={onOpenAdmin}
                    className="p-1.5 bg-purple-100 text-purple-800 rounded-lg border border-purple-300 hover:bg-purple-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    title="Admin Dashboard"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span className="hidden md:inline">Admin</span>
                  </button>
                ) : (
                  <button
                    onClick={onOpenAdmin}
                    className="hidden md:flex items-center gap-1 text-[11px] font-semibold text-stone-500 hover:text-stone-800 px-2 py-1 rounded-md border border-stone-200 hover:bg-stone-50 cursor-pointer"
                    title="Switch to Admin Dashboard"
                  >
                    <span>Admin Mode</span>
                  </button>
                )}

                <button
                  onClick={onLogout}
                  className="p-1.5 text-stone-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-300 text-stone-800 hover:bg-stone-100 text-xs font-bold cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>{t('login', 'Login')}</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top duration-200">
          {/* Mobile Preferences summary */}
          <div className="flex items-center justify-between p-3 bg-amber-50/70 rounded-xl border border-amber-200 mb-3">
            <div>
              <div className="text-xs font-bold text-amber-950">Trip Preferences Active</div>
              <div className="text-[11px] text-amber-800 capitalize">
                {preferences.groupType} • {preferences.tripPurpose}
              </div>
            </div>
            <button
              onClick={() => {
                onEditPreferences();
                setMobileMenuOpen(false);
              }}
              className="px-2.5 py-1 text-xs font-bold bg-amber-600 text-white rounded-md cursor-pointer"
            >
              Change
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2.5 rounded-lg text-left text-xs font-semibold flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-amber-600 text-white'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
            <span className="text-xs text-stone-500 font-medium">Logged in as: {user.name}</span>
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-purple-700 hover:underline cursor-pointer"
            >
              Open Admin Panel
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
