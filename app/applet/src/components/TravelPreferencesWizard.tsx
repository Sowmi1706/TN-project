import React, { useState } from 'react';
import { 
  Compass, 
  Users, 
  User, 
  Heart, 
  Sparkles, 
  Flame, 
  BookOpen, 
  Camera, 
  Utensils, 
  GraduationCap, 
  Trees, 
  Landmark, 
  IndianRupee, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Check, 
  Bus,
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { 
  UserPreferences, 
  TravelGroupType, 
  TravelerCategory, 
  TripPurpose, 
  BudgetLevel, 
  PlanningStyle 
} from '../types';

interface TravelPreferencesWizardProps {
  initialPreferences: UserPreferences;
  onSavePreferences: (pref: UserPreferences) => void;
  isOpen: boolean;
  onClose?: () => void;
}

export const TravelPreferencesWizard: React.FC<TravelPreferencesWizardProps> = ({
  initialPreferences,
  onSavePreferences,
  isOpen,
  onClose
}) => {
  const [step, setStep] = useState<number>(1);

  // Selections
  const [groupType, setGroupType] = useState<TravelGroupType>(initialPreferences.groupType || 'family');
  const [categories, setCategories] = useState<TravelerCategory[]>(initialPreferences.categories || ['temple_spiritual', 'nature_wildlife']);
  const [tripPurpose, setTripPurpose] = useState<TripPurpose>(initialPreferences.tripPurpose || 'devotional');
  const [budgetLevel, setBudgetLevel] = useState<BudgetLevel>(initialPreferences.budgetLevel || 'standard');
  const [approxBudget, setApproxBudget] = useState<number>(initialPreferences.approxBudget || 15000);
  const [planningStyle, setPlanningStyle] = useState<PlanningStyle>(initialPreferences.planningStyle || 'planned');

  // Specific inputs
  const [adults, setAdults] = useState<number>(initialPreferences.adults || 2);
  const [children, setChildren] = useState<number>(initialPreferences.children || 1);
  const [friendsCount, setFriendsCount] = useState<number>(initialPreferences.friendsCount || 4);
  const [nightlifeInterest, setNightlifeInterest] = useState<boolean>(initialPreferences.nightlifeInterest || false);
  const [startDate, setStartDate] = useState<string>(initialPreferences.startDate || '2026-10-25');
  const [returnDate, setReturnDate] = useState<string>(initialPreferences.returnDate || '2026-10-28');
  const [startLocation, setStartLocation] = useState<string>(initialPreferences.startLocation || 'Chennai');
  const [currentLocation, setCurrentLocation] = useState<string>(initialPreferences.currentLocation || 'Chennai Central');
  const [transportPreference, setTransportPreference] = useState(initialPreferences.transportPreference || 'bus');
  const [needBusQuote, setNeedBusQuote] = useState<boolean>(initialPreferences.needBusQuote || false);

  if (!isOpen) return null;

  const toggleCategory = (cat: TravelerCategory) => {
    if (categories.includes(cat)) {
      if (categories.length > 1) {
        setCategories(categories.filter(c => c !== cat));
      }
    } else {
      setCategories([...categories, cat]);
    }
  };

  const handleFinish = () => {
    const preferences: UserPreferences = {
      groupType,
      categories,
      tripPurpose,
      budgetLevel,
      approxBudget,
      planningStyle,
      adults,
      children,
      friendsCount,
      nightlifeInterest,
      startDate,
      returnDate,
      startLocation,
      currentLocation,
      transportPreference: transportPreference as any,
      needBusQuote
    };
    onSavePreferences(preferences);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-300/50 my-6 flex flex-col max-h-[92vh]">
        {/* Wizard Header */}
        <div className="bg-gradient-to-r from-amber-800 via-amber-900 to-stone-900 px-6 py-5 text-white shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-700/60">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Step {step} of 4 • Smart Personalization</span>
            </span>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="text-stone-300 hover:text-white text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            What type of trip are you planning?
          </h2>
          <p className="text-xs text-amber-200/80 mt-0.5">
            TN Stories customizes 100% authentic Tamil Nadu destinations, packages, stays, and bus routes based on your selection.
          </p>

          {/* Step indicator bar */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {['Group Type', 'Special Interests', 'Purpose & Budget', 'Planning Style'].map((label, idx) => (
              <div key={label} className="text-center">
                <div className={`h-1.5 rounded-full transition-all ${idx + 1 <= step ? 'bg-amber-400' : 'bg-stone-700'}`}></div>
                <div className="text-[10px] text-stone-300 font-medium mt-1 truncate">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Wizard Step Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* STEP 1: TRAVEL GROUP TYPE */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="text-xs text-stone-500 font-medium">
                Select who will be travelling with you. This shapes our stay suggestions, safety advisories, and activities.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Solo */}
                <button
                  type="button"
                  onClick={() => setGroupType('solo')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    groupType === 'solo' 
                      ? 'border-amber-600 bg-amber-50/80 shadow-xs' 
                      : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                      <User className="w-5 h-5" />
                    </div>
                    {groupType === 'solo' && <Check className="w-5 h-5 text-amber-600" />}
                  </div>
                  <div className="font-bold text-sm text-stone-900">Solo Trip</div>
                  <div className="text-xs text-stone-500 mt-1">
                    Solo-friendly destinations, individual packages, solo safety guidance & verified stays.
                  </div>
                </button>

                {/* Family */}
                <button
                  type="button"
                  onClick={() => setGroupType('family')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    groupType === 'family' 
                      ? 'border-amber-600 bg-amber-50/80 shadow-xs' 
                      : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                      <Users className="w-5 h-5" />
                    </div>
                    {groupType === 'family' && <Check className="w-5 h-5 text-amber-600" />}
                  </div>
                  <div className="font-bold text-sm text-stone-900">Family Trip</div>
                  <div className="text-xs text-stone-500 mt-1">
                    Safe for elders and children, family suites, easy transportation & child-friendly spots.
                  </div>
                </button>

                {/* Friends */}
                <button
                  type="button"
                  onClick={() => setGroupType('friends')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    groupType === 'friends' 
                      ? 'border-amber-600 bg-amber-50/80 shadow-xs' 
                      : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                      <Flame className="w-5 h-5" />
                    </div>
                    {groupType === 'friends' && <Check className="w-5 h-5 text-amber-600" />}
                  </div>
                  <div className="font-bold text-sm text-stone-900">Friends Trip</div>
                  <div className="text-xs text-stone-500 mt-1">
                    Adventure, scenic viewpoints, cafes, group stays, cost splitting & shared buses.
                  </div>
                </button>

                {/* Couple */}
                <button
                  type="button"
                  onClick={() => setGroupType('couple')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    groupType === 'couple' 
                      ? 'border-amber-600 bg-amber-50/80 shadow-xs' 
                      : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                      <Heart className="w-5 h-5" />
                    </div>
                    {groupType === 'couple' && <Check className="w-5 h-5 text-amber-600" />}
                  </div>
                  <div className="font-bold text-sm text-stone-900">Couple Trip</div>
                  <div className="text-xs text-stone-500 mt-1">
                    Scenic hill stations, serene beaches, candlelit viewpoints & peaceful private itineraries.
                  </div>
                </button>

                {/* Group Connect */}
                <button
                  type="button"
                  onClick={() => setGroupType('group_connect')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer sm:col-span-2 ${
                    groupType === 'group_connect' 
                      ? 'border-amber-600 bg-amber-50/80 shadow-xs' 
                      : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                      <Bus className="w-5 h-5" />
                    </div>
                    {groupType === 'group_connect' && <Check className="w-5 h-5 text-amber-600" />}
                  </div>
                  <div className="font-bold text-sm text-stone-900">Group Trip / Connect With New Travellers</div>
                  <div className="text-xs text-stone-500 mt-1">
                    Join verified group trips across Tamil Nadu or request group bus quotations (12 to 45 seats).
                  </div>
                </button>
              </div>

              {/* Group-specific configurations */}
              {groupType === 'family' && (
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Number of Adults</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={adults}
                      onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
                      className="w-full p-2 text-xs border border-stone-300 rounded-xl bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Number of Children</label>
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={children}
                      onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
                      className="w-full p-2 text-xs border border-stone-300 rounded-xl bg-white"
                    />
                  </div>
                </div>
              )}

              {groupType === 'friends' && (
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Number of Friends</label>
                    <input
                      type="number"
                      min={2}
                      max={50}
                      value={friendsCount}
                      onChange={(e) => setFriendsCount(parseInt(e.target.value) || 2)}
                      className="w-full p-2 text-xs border border-stone-300 rounded-xl bg-white"
                    />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={nightlifeInterest}
                      onChange={(e) => setNightlifeInterest(e.target.checked)}
                      className="rounded text-amber-600"
                    />
                    <span className="text-xs font-medium text-stone-700">
                      Include late-night food walks & entertainment cafes where safely accessible
                    </span>
                  </label>
                </div>
              )}

              {groupType === 'group_connect' && (
                <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 flex items-center justify-between">
                  <div className="text-xs text-amber-950 font-medium">
                    Need a private bus/coach quotation for your organization, temple club, or college group?
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-xs text-amber-900">
                    <input
                      type="checkbox"
                      checked={needBusQuote}
                      onChange={(e) => setNeedBusQuote(e.target.checked)}
                      className="rounded text-amber-700"
                    />
                    <span>Request Quotation</span>
                  </label>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: TRAVELER CATEGORIES & INTERESTS */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="text-xs text-stone-500 font-medium">
                Choose the specialized categories that match your travel passion. These have their own dedicated discovery sections.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Temple & Spiritual */}
                <button
                  type="button"
                  onClick={() => toggleCategory('temple_spiritual')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    categories.includes('temple_spiritual')
                      ? 'border-amber-600 bg-amber-50/80 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="p-2 rounded-xl bg-amber-100 text-amber-900">
                      <Landmark className="w-5 h-5" />
                    </div>
                    {categories.includes('temple_spiritual') && <Check className="w-4 h-4 text-amber-600" />}
                  </div>
                  <div className="font-bold text-sm text-stone-900">Temple & Spiritual Travelers</div>
                  <div className="text-xs text-stone-500 mt-1">
                    District-wise temples, darshan/pooja timings, dress codes, vegetarian dining & pilgrimage circuits.
                  </div>
                </button>

                {/* Historical & Heritage */}
                <button
                  type="button"
                  onClick={() => toggleCategory('historical_heritage')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    categories.includes('historical_heritage')
                      ? 'border-amber-600 bg-amber-50/80 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="p-2 rounded-xl bg-amber-100 text-amber-900">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    {categories.includes('historical_heritage') && <Check className="w-4 h-4 text-amber-600" />}
                  </div>
                  <div className="font-bold text-sm text-stone-900">Historical & Heritage Researchers</div>
                  <div className="text-xs text-stone-500 mt-1">
                    Keezhadi, Mahabalipuram, Gangaikonda Cholapuram, Sittanavasal, epigraphy & research circuits.
                  </div>
                </button>

                {/* Nature & Wildlife */}
                <button
                  type="button"
                  onClick={() => toggleCategory('nature_wildlife')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    categories.includes('nature_wildlife')
                      ? 'border-amber-600 bg-amber-50/80 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="p-2 rounded-xl bg-amber-100 text-amber-900">
                      <Trees className="w-5 h-5" />
                    </div>
                    {categories.includes('nature_wildlife') && <Check className="w-4 h-4 text-amber-600" />}
                  </div>
                  <div className="font-bold text-sm text-stone-900">Nature, Wildlife & Eco-Tourism</div>
                  <div className="text-xs text-stone-500 mt-1">
                    Pichavaram mangroves, Western Ghats waterfalls, tiger reserves, tea hills & eco-treks.
                  </div>
                </button>

                {/* Photography */}
                <button
                  type="button"
                  onClick={() => toggleCategory('photography')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    categories.includes('photography')
                      ? 'border-amber-600 bg-amber-50/80 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="p-2 rounded-xl bg-amber-100 text-amber-900">
                      <Camera className="w-5 h-5" />
                    </div>
                    {categories.includes('photography') && <Check className="w-4 h-4 text-amber-600" />}
                  </div>
                  <div className="font-bold text-sm text-stone-900">Photography & Visual Exploration</div>
                  <div className="text-xs text-stone-500 mt-1">
                    Sunrise/sunset points, lighting angles, monument permits & cultural landscapes.
                  </div>
                </button>

                {/* Food & Culture */}
                <button
                  type="button"
                  onClick={() => toggleCategory('food_culture')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    categories.includes('food_culture')
                      ? 'border-amber-600 bg-amber-50/80 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="p-2 rounded-xl bg-amber-100 text-amber-900">
                      <Utensils className="w-5 h-5" />
                    </div>
                    {categories.includes('food_culture') && <Check className="w-4 h-4 text-amber-600" />}
                  </div>
                  <div className="font-bold text-sm text-stone-900">Food & Culture Travelers</div>
                  <div className="text-xs text-stone-500 mt-1">
                    Madurai street foods, Chettinad royal feasts, Tirunelveli halwa, local markets & festivals.
                  </div>
                </button>

                {/* Educational */}
                <button
                  type="button"
                  onClick={() => toggleCategory('educational_research')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    categories.includes('educational_research')
                      ? 'border-amber-600 bg-amber-50/80 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="p-2 rounded-xl bg-amber-100 text-amber-900">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    {categories.includes('educational_research') && <Check className="w-4 h-4 text-amber-600" />}
                  </div>
                  <div className="font-bold text-sm text-stone-900">Educational & Student Groups</div>
                  <div className="text-xs text-stone-500 mt-1">
                    Museums, science centers, student group logistics & coordinator tools.
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: TRIP PURPOSE & BUDGET */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-2">
                  What is the primary purpose of your trip?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'devotional', label: 'Devotional & Temples' },
                    { id: 'nature_hills', label: 'Nature & Hill Station' },
                    { id: 'beaches', label: 'Beaches & Coastal' },
                    { id: 'adventure', label: 'Adventure & Trekking' },
                    { id: 'relaxation', label: 'Relaxation & Wellness' },
                    { id: 'food_culture', label: 'Food & Culinary Tour' },
                    { id: 'historical_research', label: 'Historical Research' },
                    { id: 'weekend_getaway', label: 'Weekend Getaway' },
                    { id: 'festival', label: 'Festival / Special Occasion' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setTripPurpose(p.id as TripPurpose)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-center cursor-pointer transition-all ${
                        tripPurpose === p.id 
                          ? 'border-amber-600 bg-amber-600 text-white shadow-xs' 
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget preference */}
              <div className="pt-4 border-t border-stone-200">
                <label className="block text-xs font-bold text-stone-800 mb-2">
                  Select Budget Tier
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  {[
                    { id: 'budget', label: 'Budget-Friendly', desc: '₹1,500 - ₹3,000 / day' },
                    { id: 'standard', label: 'Standard', desc: '₹3,000 - ₹6,000 / day' },
                    { id: 'premium', label: 'Premium', desc: '₹6,000 - ₹12,000 / day' },
                    { id: 'luxury', label: 'Luxury Stays', desc: '₹12,000+ / day' }
                  ].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBudgetLevel(b.id as BudgetLevel)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        budgetLevel === b.id 
                          ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold' 
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <div className="text-xs font-bold">{b.label}</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">{b.desc}</div>
                    </button>
                  ))}
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-stone-700 mb-1">
                    <span>Approximate Total Trip Budget (INR)</span>
                    <span className="text-amber-800 font-extrabold text-sm">₹{approxBudget.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min={3000}
                    max={100000}
                    step={1000}
                    value={approxBudget}
                    onChange={(e) => setApproxBudget(parseInt(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                    <span>₹3,000 (Short Trip)</span>
                    <span>₹50,000 (Grand Tour)</span>
                    <span>₹1,00,000+ (Luxury)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: PLANNING STYLE & DATES */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPlanningStyle('planned')}
                  className={`p-4 rounded-2xl border-2 text-left cursor-pointer transition-all ${
                    planningStyle === 'planned' 
                      ? 'border-amber-600 bg-amber-50/80 shadow-xs' 
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Calendar className="w-5 h-5 text-amber-700" />
                    {planningStyle === 'planned' && <Check className="w-5 h-5 text-amber-600" />}
                  </div>
                  <div className="font-bold text-sm text-stone-900">Planned Trip</div>
                  <div className="text-xs text-stone-500 mt-1">
                    Structured day-by-day itineraries, advance booking suggestions & transport reservations.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPlanningStyle('unplanned')}
                  className={`p-4 rounded-2xl border-2 text-left cursor-pointer transition-all ${
                    planningStyle === 'unplanned' 
                      ? 'border-amber-600 bg-amber-50/80 shadow-xs' 
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Clock className="w-5 h-5 text-amber-700" />
                    {planningStyle === 'unplanned' && <Check className="w-5 h-5 text-amber-600" />}
                  </div>
                  <div className="font-bold text-sm text-stone-900">Spontaneous / Flexible Trip</div>
                  <div className="text-xs text-stone-500 mt-1">
                    Immediate nearby destinations, same-day accessibility, real-time weather & flexible booking.
                  </div>
                </button>
              </div>

              {planningStyle === 'planned' ? (
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Departure Date</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full p-2 text-xs border border-stone-300 rounded-xl bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Return Date</label>
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full p-2 text-xs border border-stone-300 rounded-xl bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Starting City in Tamil Nadu</label>
                    <select
                      value={startLocation}
                      onChange={(e) => setStartLocation(e.target.value)}
                      className="w-full p-2 text-xs border border-stone-300 rounded-xl bg-white"
                    >
                      <option value="Chennai">Chennai</option>
                      <option value="Madurai">Madurai</option>
                      <option value="Coimbatore">Coimbatore</option>
                      <option value="Trichy">Tiruchirappalli (Trichy)</option>
                      <option value="Salem">Salem</option>
                      <option value="Tirunelveli">Tirunelveli</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Current Location</label>
                    <input
                      type="text"
                      value={currentLocation}
                      onChange={(e) => setCurrentLocation(e.target.value)}
                      placeholder="e.g. Madurai Junction, Chennai Koyambedu"
                      className="w-full p-2 text-xs border border-stone-300 rounded-xl bg-white"
                    />
                  </div>
                  <div className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                    💡 We will display tourist spots accessible within 2-4 hours from your current location with live weather safety checks.
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Wizard Footer Navigation */}
        <div className="p-5 bg-stone-50 border-t border-stone-200 flex items-center justify-between shrink-0">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-900 border border-stone-300 rounded-xl hover:bg-white cursor-pointer"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 hover:from-amber-700 hover:to-amber-950 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <span>Explore My Personalized Tamil Nadu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
