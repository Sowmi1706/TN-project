import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Search, 
  Star, 
  Tag, 
  ArrowRight, 
  ShieldAlert, 
  Filter, 
  Check, 
  Heart, 
  Trees, 
  Landmark, 
  Camera, 
  Utensils, 
  GraduationCap, 
  Users, 
  Flame, 
  Clock, 
  ChevronRight,
  Ticket,
  Eye,
  Info
} from 'lucide-react';
import { 
  Language, 
  User, 
  UserPreferences, 
  Destination, 
  TourPackage, 
  Booking, 
  SpinReward, 
  WeatherInfo, 
  BeachFacility, 
  BeachBooking, 
  Sponsor, 
  Review, 
  TravelerCategory 
} from './types';
import { StorageService } from './services/storageService';
import { getTranslation } from './utils/translations';

// Components
import { Navbar } from './components/Navbar';
import { LanguageModal } from './components/LanguageModal';
import { AuthModal } from './components/AuthModal';
import { TermsModal } from './components/TermsModal';
import { TravelPreferencesWizard } from './components/TravelPreferencesWizard';
import { HeroSlider } from './components/HeroSlider';
import { FirstBookingBanner } from './components/FirstBookingBanner';
import { DailySpinWheel } from './components/DailySpinWheel';
import { BookingWizardModal } from './components/BookingWizardModal';
import { WeatherDangerZone } from './components/WeatherDangerZone';
import { OfflineTripMode } from './components/OfflineTripMode';
import { SponsoredTravelKit } from './components/SponsoredTravelKit';
import { BeachChangingRoomBooking } from './components/BeachChangingRoomBooking';
import { MonthlySavingsPlanner } from './components/MonthlySavingsPlanner';
import { GroupBusBooking } from './components/GroupBusBooking';
import { DestinationDetailsModal } from './components/DestinationDetailsModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { AiItineraryModal } from './components/AiItineraryModal';

export default function App() {
  // App State
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [user, setUser] = useState<User>(() => StorageService.getUser());
  const [preferences, setPreferences] = useState<UserPreferences>(() => StorageService.getPreferences());
  const [destinations, setDestinations] = useState<Destination[]>(() => StorageService.getDestinations());
  const [packages, setPackages] = useState<TourPackage[]>(() => StorageService.getPackages());
  const [bookings, setBookings] = useState<Booking[]>(() => StorageService.getBookings());
  const [spinRewards, setSpinRewards] = useState<SpinReward[]>(() => StorageService.getSpinRewards());
  const [weatherAlerts, setWeatherAlerts] = useState<WeatherInfo[]>(() => StorageService.getWeatherAlerts());
  const [beachFacilities, setBeachFacilities] = useState<BeachFacility[]>(() => StorageService.getBeachFacilities());
  const [beachBookings, setBeachBookings] = useState<BeachBooking[]>(() => StorageService.getBeachBookings());
  const [sponsors, setSponsors] = useState<Sponsor[]>(() => StorageService.getSponsors());
  const [reviews, setReviews] = useState<Review[]>(() => StorageService.getReviews());

  // Navigation & Flow Modals
  const [activeTab, setActiveTab] = useState<string>('home');
  const [showLanguageModal, setShowLanguageModal] = useState<boolean>(() => !localStorage.getItem('tn_stories_lang_v2'));
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);
  const [showPreferencesWizard, setShowPreferencesWizard] = useState<boolean>(false);
  const [showBookingWizard, setShowBookingWizard] = useState<boolean>(false);
  const [showSpinWheel, setShowSpinWheel] = useState<boolean>(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState<boolean>(false);
  const [selectedDestinationForDetails, setSelectedDestinationForDetails] = useState<Destination | null>(null);
  const [selectedDestinationForAi, setSelectedDestinationForAi] = useState<Destination | null>(null);

  // Preselection for wizard
  const [wizardPreselectedDestId, setWizardPreselectedDestId] = useState<string | undefined>(undefined);
  const [wizardPreselectedPkgId, setWizardPreselectedPkgId] = useState<string | undefined>(undefined);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedDistrictFilter, setSelectedDistrictFilter] = useState<string>('all');

  // Network State
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Check terms acceptance on mount
  useEffect(() => {
    if (user && !StorageService.hasAcceptedTerms(user)) {
      setShowTermsModal(true);
    }
  }, [user]);

  const t = (key: string, fallback?: string) => getTranslation(currentLang, key, fallback);

  const hasRedAlert = weatherAlerts.some(a => a.severity === 'red');

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('tn_stories_lang_v2', lang);
  };

  const handleLanguageModalContinue = () => {
    setShowLanguageModal(false);
    // If user is first time without terms, show terms or auth
    if (!StorageService.hasAcceptedTerms(user)) {
      setShowTermsModal(true);
    }
  };

  const handleTermsAccept = () => {
    const updated = StorageService.acceptTerms(user);
    setUser(updated);
    setShowTermsModal(false);
  };

  const handleTermsDecline = () => {
    alert("Terms acceptance is required to book trips and access protected features under safety regulations.");
  };

  const handleAuthSuccess = (authenticatedUser: User) => {
    StorageService.setUser(authenticatedUser);
    setUser(authenticatedUser);
    setShowAuthModal(false);

    if (!StorageService.hasAcceptedTerms(authenticatedUser)) {
      setShowTermsModal(true);
    } else {
      setShowPreferencesWizard(true);
    }
  };

  const handlePreferencesSaved = (pref: UserPreferences) => {
    StorageService.setPreferences(pref);
    setPreferences(pref);
    setShowPreferencesWizard(false);
    setActiveTab('home');
  };

  const openBookingWizardWithDest = (destId: string, pkgId?: string) => {
    setWizardPreselectedDestId(destId);
    setWizardPreselectedPkgId(pkgId);
    setShowBookingWizard(true);
  };

  const handleRefreshData = () => {
    setDestinations(StorageService.getDestinations());
    setWeatherAlerts(StorageService.getWeatherAlerts());
    setBookings(StorageService.getBookings());
    setSpinRewards(StorageService.getSpinRewards());
    setSponsors(StorageService.getSponsors());
    setBeachFacilities(StorageService.getBeachFacilities());
    setReviews(StorageService.getReviews());
  };

  // Filtered destinations logic
  const allDistricts = Array.from(new Set(destinations.map(d => d.district))).sort();

  const filteredDestinations = destinations.filter(d => {
    const matchesSearch = 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.popularAttractions.some(a => a.toLowerCase().includes(searchQuery.toLowerCase())) ||
      d.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategoryFilter === 'all' || d.category === selectedCategoryFilter;
    const matchesDistrict = selectedDistrictFilter === 'all' || d.district === selectedDistrictFilter;

    return matchesSearch && matchesCategory && matchesDistrict;
  });

  // Specialized collections
  const recommendedDestinations = destinations.filter(d => preferences.categories.includes(d.category));
  const popularDestinations = destinations.filter(d => !d.isHidden);
  const hiddenDestinations = destinations.filter(d => d.isHidden);
  const templeDestinations = destinations.filter(d => d.category === 'temple_spiritual');
  const heritageDestinations = destinations.filter(d => d.category === 'historical_heritage');
  const friendsDestinations = destinations.filter(d => d.tags.includes('Adventure') || d.tags.includes('Friends') || d.tags.includes('Hills'));
  const familyDestinations = destinations.filter(d => d.tags.includes('Family') || d.category === 'temple_spiritual');
  const trendingDestinations = destinations.filter(d => d.isTrending);
  const budgetDestinations = destinations.filter(d => d.estimatedCost <= 2200);

  // Destination Card Component
  const renderDestinationCard = (dest: Destination) => {
    const isRed = dest.weatherDangerStatus === 'red' || dest.bookingRestricted;

    return (
      <div
        key={dest.id}
        className="group bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
      >
        <div>
          {/* Card Image */}
          <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100">
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent"></div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-bold">
                {dest.district}
              </span>
              {dest.isHidden && (
                <span className="px-2.5 py-1 rounded-full bg-amber-600 text-white text-[10px] font-bold shadow-xs">
                  Hidden Spot
                </span>
              )}
            </div>

            {isRed && (
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-extrabold shadow-md animate-pulse">
                RED ALERT
              </div>
            )}

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
              <span className="flex items-center gap-1 font-bold text-amber-300">
                <Star className="w-3.5 h-3.5 fill-amber-300" />
                <span>{dest.rating}</span>
                <span className="text-stone-300 text-[10px]">({dest.reviewCount})</span>
              </span>
              <span className="font-extrabold text-white text-xs bg-stone-900/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                Est. ₹{dest.estimatedCost}/day
              </span>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-4 sm:p-5 space-y-2.5">
            <h3 className="font-bold text-base text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
              {dest.name}
            </h3>

            <p className="text-xs text-stone-600 leading-relaxed line-clamp-2 font-sans">
              {dest.shortDescription}
            </p>

            {/* Attractions Tags */}
            <div className="flex flex-wrap gap-1 pt-1">
              {dest.popularAttractions.slice(0, 3).map(att => (
                <span key={att} className="text-[10px] font-medium bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md">
                  {att}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Card Actions */}
        <div className="p-4 sm:p-5 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between gap-2">
          <button
            onClick={() => setSelectedDestinationForDetails(dest)}
            className="flex-1 py-2 px-3 rounded-xl border border-stone-300 hover:border-stone-400 text-stone-700 hover:text-stone-900 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t('viewDetails', 'View Details')}</span>
          </button>

          <button
            onClick={() => {
              if (isRed) {
                alert(`Booking to ${dest.name} is currently suspended due to an active Red Alert danger zone.`);
              } else {
                openBookingWizardWithDest(dest.id);
              }
            }}
            disabled={isRed}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-xs ${
              isRed
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : 'bg-amber-700 hover:bg-amber-800 text-white shadow-amber-900/15'
            }`}
          >
            <span>{isRed ? 'Restricted' : t('bookNow', 'Book Now')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col">
      {/* Top Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        user={user}
        onOpenAuth={() => setShowAuthModal(true)}
        onLogout={() => {
          localStorage.removeItem('tn_stories_user_v2');
          alert("Logged out successfully.");
          location.reload();
        }}
        preferences={preferences}
        onEditPreferences={() => setShowPreferencesWizard(true)}
        weatherAlerts={weatherAlerts}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBookingWizard={() => setShowBookingWizard(true)}
        onOpenSpin={() => setShowSpinWheel(true)}
        onOpenAdmin={() => setShowAdminDashboard(true)}
        isOnline={isOnline}
        hasRedAlert={hasRedAlert}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {/* TAB: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-12 pb-16">
            {/* Hero Slider */}
            <HeroSlider
              currentLang={currentLang}
              onExploreDestinations={() => setActiveTab('destinations')}
              onBookTrip={() => setShowBookingWizard(true)}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              {/* Search Bar with autocomplete and filter tags */}
              <div className="relative -mt-8 sm:-mt-10 z-30 max-w-4xl mx-auto">
                <div className="p-2 sm:p-3 bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-stone-200/80 flex items-center gap-2">
                  <div className="p-2 text-stone-400">
                    <Search className="w-5 h-5 text-amber-700" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('searchPlaceholder', 'Search Tamil Nadu tourist places, temples, beaches, hill stations...')}
                    className="w-full text-xs sm:text-sm bg-transparent border-none focus:outline-none text-stone-900 placeholder:text-stone-400 font-medium"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="p-1.5 text-stone-400 hover:text-stone-700 text-xs font-bold"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    onClick={() => setActiveTab('destinations')}
                    className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl sm:rounded-2xl text-xs font-bold cursor-pointer shrink-0 shadow-xs"
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* First-Booking Promotion Banner */}
              <FirstBookingBanner
                currentLang={currentLang}
                user={user}
                onClaimOffer={() => setShowBookingWizard(true)}
              />

              {/* 1. Recommended Based on Trip Type and Category */}
              <section className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Personalized For You</span>
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-900 mt-1">
                      {t('recommendedForYou', 'Recommended Based on Your Trip Preferences')}
                    </h2>
                    <p className="text-xs text-stone-500">
                      Tailored for your <span className="font-bold capitalize">{preferences.groupType} Trip</span> and <span className="font-bold capitalize">{preferences.tripPurpose}</span> passion.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowPreferencesWizard(true)}
                    className="text-xs font-bold text-amber-800 hover:underline cursor-pointer"
                  >
                    Change Preferences →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedDestinations.slice(0, 6).map(dest => renderDestinationCard(dest))}
                </div>
              </section>

              {/* 2. Popular Destinations */}
              <section className="space-y-4 pt-4 border-t border-stone-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-900">
                      {t('popularDestinations', 'Popular Destinations')}
                    </h2>
                    <p className="text-xs text-stone-500">
                      Icons of Tamil Nadu: Ooty, Madurai, Kodaikanal, Mahabalipuram, Rameswaram & Kanyakumari.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('destinations')}
                    className="text-xs font-bold text-amber-800 hover:underline"
                  >
                    View All →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {popularDestinations.slice(0, 6).map(dest => renderDestinationCard(dest))}
                </div>
              </section>

              {/* 3. Hidden Areas and Hidden Spots */}
              <section className="space-y-4 pt-4 border-t border-stone-200">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                    Lesser-Known Treasures
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-900 mt-1">
                    {t('hiddenSpots', 'Hidden Areas & Secret Spots')}
                  </h2>
                  <p className="text-xs text-stone-500">
                    Untouched misty hills, mangrove waterways, and secret mountain waterfalls away from the crowds.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hiddenDestinations.map(dest => renderDestinationCard(dest))}
                </div>
              </section>

              {/* 4. Devotional and Temple Trips */}
              <section className="space-y-4 pt-4 border-t border-stone-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-900">
                      {t('devotionalTemples', 'Devotional & Temple Circuits')}
                    </h2>
                    <p className="text-xs text-stone-500">
                      Arupadai Veedu, Navagraha, and grand living Chola sanctuaries with verified darshan guidance.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('bus_booking')}
                    className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200"
                  >
                    Pilgrimage Buses →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templeDestinations.map(dest => renderDestinationCard(dest))}
                </div>
              </section>

              {/* 5. Historical, Heritage, and Research Places */}
              <section className="space-y-4 pt-4 border-t border-stone-200">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-200">
                    Archaeological & Cultural Research
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-900 mt-1">
                    {t('historicalHeritage', 'Historical, Heritage & Research Sites')}
                  </h2>
                  <p className="text-xs text-stone-500">
                    Sangam-era Keezhadi, Sittanavasal cave frescoes, Pallava bas-reliefs, and royal Chettinad architecture.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {heritageDestinations.map(dest => renderDestinationCard(dest))}
                </div>
              </section>

              {/* 6. Friends & Family Recommendations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-stone-200">
                <div className="space-y-4">
                  <h3 className="font-bold text-lg font-display text-stone-900">
                    {t('friendsPicks', 'Friends Trip Recommendations')}
                  </h3>
                  <div className="space-y-3">
                    {friendsDestinations.slice(0, 3).map(dest => (
                      <div
                        key={dest.id}
                        onClick={() => setSelectedDestinationForDetails(dest)}
                        className="p-3 bg-white rounded-2xl border border-stone-200 flex items-center justify-between gap-3 hover:border-amber-500 cursor-pointer shadow-2xs transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <img src={dest.image} alt={dest.name} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                          <div>
                            <div className="font-bold text-xs text-stone-900">{dest.name}</div>
                            <div className="text-[10px] text-stone-500">{dest.district} • Hairpin Bends & Trekking</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-amber-700 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-lg font-display text-stone-900">
                    {t('familyPicks', 'Family Trip Recommendations')}
                  </h3>
                  <div className="space-y-3">
                    {familyDestinations.slice(0, 3).map(dest => (
                      <div
                        key={dest.id}
                        onClick={() => setSelectedDestinationForDetails(dest)}
                        className="p-3 bg-white rounded-2xl border border-stone-200 flex items-center justify-between gap-3 hover:border-amber-500 cursor-pointer shadow-2xs transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <img src={dest.image} alt={dest.name} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                          <div>
                            <div className="font-bold text-xs text-stone-900">{dest.name}</div>
                            <div className="text-[10px] text-stone-500">{dest.district} • Family Suites & Caretaker Available</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-amber-700 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 13. Monthly Savings Trip Plans Teaser */}
              <div className="p-6 sm:p-8 bg-gradient-to-r from-amber-900 via-stone-900 to-amber-950 text-white rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Savings Feature
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                    Dreaming of a Grand Tamil Nadu Vacation?
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
                    Save ₹2,000 every month and unlock complete vacation funding for Ooty, Kanyakumari, or Rameswaram with zero credit cards.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('savings')}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-all hover:scale-105 shrink-0"
                >
                  Open Savings Planner
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB: DESTINATIONS */}
        {activeTab === 'destinations' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-stone-900">
                Explore 100% Tamil Nadu Destinations
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Verified hill stations, temples, coastal beaches, and UNESCO heritage landmarks within Tamil Nadu.
              </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-4 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, district, or attraction..."
                    className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl bg-stone-50"
                  />
                </div>

                <div className="flex gap-2">
                  <select
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="p-2 text-xs border border-stone-300 rounded-xl bg-stone-50 text-stone-700"
                  >
                    <option value="all">All Categories</option>
                    <option value="temple_spiritual">Temples & Spiritual</option>
                    <option value="historical_heritage">Historical & Heritage</option>
                    <option value="nature_wildlife">Nature & Wildlife</option>
                    <option value="food_culture">Food & Culture</option>
                  </select>

                  <select
                    value={selectedDistrictFilter}
                    onChange={(e) => setSelectedDistrictFilter(e.target.value)}
                    className="p-2 text-xs border border-stone-300 rounded-xl bg-stone-50 text-stone-700"
                  >
                    <option value="all">All Districts</option>
                    {allDistricts.map(dist => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map(dest => renderDestinationCard(dest))}
            </div>

            {filteredDestinations.length === 0 && (
              <div className="text-center py-16 text-stone-400 text-xs">
                No matching Tamil Nadu destinations found. Try clearing your search query or filters.
              </div>
            )}
          </div>
        )}

        {/* TAB: WEATHER & DANGER ZONES */}
        {activeTab === 'weather' && (
          <WeatherDangerZone
            currentLang={currentLang}
            weatherAlerts={weatherAlerts}
            destinations={destinations}
            onSelectDestination={(id) => {
              const matched = destinations.find(d => d.id === id);
              if (matched) setSelectedDestinationForDetails(matched);
            }}
            onBookSafeAlternative={(safeName) => {
              const matched = destinations.find(d => d.name.toLowerCase().includes(safeName.toLowerCase().split(' ')[0]));
              if (matched) openBookingWizardWithDest(matched.id);
            }}
          />
        )}

        {/* TAB: OFFLINE MODE */}
        {activeTab === 'offline' && (
          <OfflineTripMode
            bookings={bookings}
            destinations={destinations}
            weatherAlerts={weatherAlerts}
            isOnline={isOnline}
            onToggleSimulatedOffline={() => setIsOnline(!isOnline)}
          />
        )}

        {/* TAB: BEACH CHANGING ROOMS */}
        {activeTab === 'beach' && (
          <BeachChangingRoomBooking
            user={user}
            facilities={beachFacilities}
            beachBookings={beachBookings}
            onBookingSuccess={(b) => {
              setBeachBookings(StorageService.getBeachBookings());
            }}
          />
        )}

        {/* TAB: FREE TRAVEL KIT */}
        {activeTab === 'travel_kit' && (
          <SponsoredTravelKit
            user={user}
            sponsors={sponsors}
            bookings={bookings}
            onOpenBookingWizard={() => setShowBookingWizard(true)}
          />
        )}

        {/* TAB: GROUP BUS BOOKING */}
        {activeTab === 'bus_booking' && (
          <GroupBusBooking user={user} />
        )}

        {/* TAB: SAVINGS PLANNER */}
        {activeTab === 'savings' && (
          <MonthlySavingsPlanner
            destinations={destinations}
            onSelectDestination={(id) => {
              const matched = destinations.find(d => d.id === id);
              if (matched) setSelectedDestinationForDetails(matched);
            }}
          />
        )}

        {/* TAB: MY BOOKINGS */}
        {activeTab === 'my_bookings' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-stone-900">
                  My Bookings & Travel Passes
                </h1>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Categorized view of your Travel + Hotel, Hotel Only, and Travel Only reservations.
                </p>
              </div>

              <button
                onClick={() => setShowBookingWizard(true)}
                className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                + Book New Trip
              </button>
            </div>

            {bookings.length === 0 ? (
              <div className="p-12 bg-white rounded-3xl border border-stone-200 text-center space-y-3">
                <Ticket className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="font-bold text-base text-stone-800">No Bookings Yet</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Ready to discover Ooty, Madurai or Kodaikanal? Your bookings with free travel kits and offline passes will appear here.
                </p>
                <button
                  onClick={() => setShowBookingWizard(true)}
                  className="px-6 py-2.5 bg-stone-900 text-amber-400 font-bold text-xs rounded-xl"
                >
                  Book Your First Adventure (10% OFF)
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map(b => (
                  <div
                    key={b.id}
                    className="p-6 bg-white rounded-3xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-extrabold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md">
                          {b.bookingRef}
                        </span>
                        <span className="font-extrabold text-base text-stone-900">{b.destinationName}</span>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                          {b.bookingStatus.toUpperCase()}
                        </span>
                      </div>

                      <div className="text-xs text-stone-600 flex flex-wrap items-center gap-4">
                        <span>Dates: <strong>{b.startDate} to {b.returnDate}</strong></span>
                        <span>•</span>
                        <span>Travellers: <strong>{b.travellers}</strong></span>
                        <span>•</span>
                        <span className="capitalize">Mode: <strong>{b.bookingServiceType.replace(/_/g, ' ')}</strong></span>
                      </div>

                      {b.hotelDetails && (
                        <div className="text-[11px] text-stone-500">
                          🏨 Hotel: {b.hotelDetails.hotelName} ({b.hotelDetails.roomType})
                        </div>
                      )}
                      {b.transportDetails && (
                        <div className="text-[11px] text-stone-500">
                          🚗 Transport: {b.transportDetails.vehicleType}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
                      <div className="text-right">
                        <div className="text-[10px] text-stone-400">Total Price</div>
                        <div className="text-lg font-extrabold text-amber-800">
                          ₹{b.finalPrice.toLocaleString('en-IN')}
                        </div>
                        {b.discountAmount > 0 && (
                          <div className="text-[10px] text-emerald-700 font-bold">
                            Saved ₹{b.discountAmount}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => setActiveTab('offline')}
                        className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold cursor-pointer"
                      >
                        View Offline QR Pass
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 text-xs py-12 border-t border-stone-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white font-extrabold text-lg font-display">
                <Compass className="w-5 h-5 text-amber-500" />
                <span>TN Stories</span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Smart Tourism & Trip Booking Platform dedicated 100% to the cultural heritage, hills, and temples of Tamil Nadu, India.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">Features</h4>
              <ul className="space-y-2 text-stone-400 text-xs">
                <li><button onClick={() => setActiveTab('destinations')} className="hover:text-white cursor-pointer">Destinations</button></li>
                <li><button onClick={() => setShowSpinWheel(true)} className="hover:text-white cursor-pointer">Daily Spin & Win</button></li>
                <li><button onClick={() => setActiveTab('weather')} className="hover:text-white cursor-pointer">Weather Danger Zones</button></li>
                <li><button onClick={() => setActiveTab('offline')} className="hover:text-white cursor-pointer">Offline Trip Mode</button></li>
                <li><button onClick={() => setActiveTab('beach')} className="hover:text-white cursor-pointer">Beach Changing Rooms (₹0)</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">Tourism Partners</h4>
              <ul className="space-y-2 text-stone-400 text-xs">
                <li><button onClick={() => setActiveTab('travel_kit')} className="hover:text-white cursor-pointer">Aavin & TN Khadi Kits</button></li>
                <li><button onClick={() => setActiveTab('bus_booking')} className="hover:text-white cursor-pointer">Chartered Bus Operators</button></li>
                <li><button onClick={() => setActiveTab('savings')} className="hover:text-white cursor-pointer">Monthly Savings Plans</button></li>
                <li><button onClick={() => setShowAdminDashboard(true)} className="hover:text-white cursor-pointer">Admin Governance Portal</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">Legal & Safety</h4>
              <ul className="space-y-2 text-stone-400 text-xs">
                <li>
                  <button onClick={() => setShowTermsModal(true)} className="hover:text-white cursor-pointer underline">
                    Terms & Conditions (v2.4)
                  </button>
                </li>
                <li><span>Tamil Nadu Safety Charter</span></li>
                <li><span>TNSDMA Emergency Alerts</span></li>
                <li><span className="text-stone-500">Consumer Support: 1363 (TTDC)</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
            <span>© 2026 TN Stories AI — Explore Tamil Nadu. All rights reserved.</span>
            <div className="flex gap-4">
              <span>English</span>
              <span>தமிழ்</span>
              <span>हिंदी</span>
              <span>മലയാളം</span>
              <span>తెలుగు</span>
            </div>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {/* 1. Language Selection Modal */}
      <LanguageModal
        currentLang={currentLang}
        onSelectLanguage={handleLanguageChange}
        onContinue={handleLanguageModalContinue}
        isOpen={showLanguageModal}
      />

      {/* 2. Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onSuccess={handleAuthSuccess}
        onClose={() => setShowAuthModal(false)}
        canCloseWithoutAuth={true}
      />

      {/* 3. Mandatory Terms & Conditions Modal */}
      <TermsModal
        isOpen={showTermsModal}
        user={user}
        onAccept={handleTermsAccept}
        onDecline={handleTermsDecline}
      />

      {/* 4. Travel Preferences Wizard */}
      <TravelPreferencesWizard
        initialPreferences={preferences}
        onSavePreferences={handlePreferencesSaved}
        isOpen={showPreferencesWizard}
        onClose={() => setShowPreferencesWizard(false)}
      />

      {/* 5. 9-Step Personalized Travel Booking Wizard */}
      <BookingWizardModal
        isOpen={showBookingWizard}
        onClose={() => setShowBookingWizard(false)}
        user={user}
        destinations={destinations}
        packages={packages}
        weatherAlerts={weatherAlerts}
        preselectedDestinationId={wizardPreselectedDestId}
        preselectedPackageId={wizardPreselectedPkgId}
        onBookingConfirmed={(b) => {
          setBookings(StorageService.getBookings());
        }}
      />

      {/* 6. Daily Spin & Win Wheel */}
      <DailySpinWheel
        user={user}
        isOpen={showSpinWheel}
        onClose={() => setShowSpinWheel(false)}
        onApplyCouponToBooking={(code) => {
          setShowSpinWheel(false);
          setShowBookingWizard(true);
        }}
      />

      {/* 7. Destination Details Modal */}
      <DestinationDetailsModal
        destination={selectedDestinationForDetails}
        isOpen={!!selectedDestinationForDetails}
        onClose={() => setSelectedDestinationForDetails(null)}
        user={user}
        packages={packages}
        reviews={reviews}
        onBookNow={(destId) => {
          setSelectedDestinationForDetails(null);
          openBookingWizardWithDest(destId);
        }}
        onReviewAdded={handleRefreshData}
      />

      {/* 8. AI Itinerary Modal */}
      {selectedDestinationForAi && (
        <AiItineraryModal
          destination={selectedDestinationForAi}
          isOpen={!!selectedDestinationForAi}
          onClose={() => setSelectedDestinationForAi(null)}
          preferences={preferences}
        />
      )}

      {/* 9. Admin Dashboard Console */}
      <AdminDashboardModal
        isOpen={showAdminDashboard}
        onClose={() => setShowAdminDashboard(false)}
        destinations={destinations}
        packages={packages}
        bookings={bookings}
        spinRewards={spinRewards}
        weatherAlerts={weatherAlerts}
        beachFacilities={beachFacilities}
        sponsors={sponsors}
        reviews={reviews}
        onDataUpdated={handleRefreshData}
      />
    </div>
  );
}
