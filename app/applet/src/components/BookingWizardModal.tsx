import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Calendar, 
  Users, 
  MapPin, 
  ShieldCheck, 
  Tag, 
  Sparkles, 
  Compass, 
  Building2, 
  Car, 
  Bus, 
  UserCheck, 
  AlertTriangle, 
  ShieldAlert, 
  QrCode, 
  Gift, 
  Umbrella,
  FileText
} from 'lucide-react';
import { 
  User, 
  Destination, 
  TourPackage, 
  Booking, 
  BookingServiceType, 
  TravelGroupType, 
  WeatherInfo,
  Language
} from '../types';
import { StorageService } from '../services/storageService';
import { getTranslation } from '../utils/translations';

interface BookingWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  destinations: Destination[];
  packages: TourPackage[];
  weatherAlerts: WeatherInfo[];
  preselectedDestinationId?: string;
  preselectedPackageId?: string;
  onBookingConfirmed: (booking: Booking) => void;
}

export const BookingWizardModal: React.FC<BookingWizardModalProps> = ({
  isOpen,
  onClose,
  user,
  destinations,
  packages,
  weatherAlerts,
  preselectedDestinationId,
  preselectedPackageId,
  onBookingConfirmed
}) => {
  const [step, setStep] = useState<number>(1);

  // STEP 1: Destination
  const [searchDest, setSearchDest] = useState('');
  const [selectedDestId, setSelectedDestId] = useState<string>(
    preselectedDestinationId || destinations[0]?.id || 'madurai'
  );

  // STEP 2: Travel Details
  const [startDate, setStartDate] = useState('2026-10-25');
  const [returnDate, setReturnDate] = useState('2026-10-28');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // STEP 3: Travel Companion
  const [companionType, setCompanionType] = useState<TravelGroupType>('family');

  // STEP 4: Arrangement & Flexible Booking Mode
  const [arrangementPreference, setArrangementPreference] = useState<'plan_for_me' | 'plan_own'>('plan_for_me');
  const [bookingServiceType, setBookingServiceType] = useState<BookingServiceType>('travel_and_hotel');
  const [selectedVehicle, setSelectedVehicle] = useState('AC Tourist Tempo Traveller');
  const [hotelRoomType, setHotelRoomType] = useState('Deluxe Heritage Room');

  // STEP 5: Caretaker & Local Guide
  const [caretakerSelected, setCaretakerSelected] = useState(false);
  const [guideSelected, setGuideSelected] = useState(false);

  // STEP 6: Packages & Add-on Services
  const [selectedPkgId, setSelectedPkgId] = useState<string>(preselectedPackageId || '');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // STEP 7: Discounts & Coupons
  const [couponInput, setCouponInput] = useState('');
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // STEP 9: Confirmation State
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Sync preselected props
  useEffect(() => {
    if (preselectedDestinationId) setSelectedDestId(preselectedDestinationId);
    if (preselectedPackageId) {
      setSelectedPkgId(preselectedPackageId);
      setArrangementPreference('plan_for_me');
    }
  }, [preselectedDestinationId, preselectedPackageId]);

  if (!isOpen) return null;

  const currentDest = destinations.find(d => d.id === selectedDestId) || destinations[0];
  const isRedAlert = currentDest.weatherDangerStatus === 'red' || currentDest.bookingRestricted;

  // Pricing calculations
  const travellersCount = adults + children;
  const nightsCount = Math.max(1, Math.round((new Date(returnDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24)));

  let basePrice = 0;
  if (arrangementPreference === 'plan_for_me') {
    const pkg = packages.find(p => p.id === selectedPkgId) || packages.find(p => p.destinationId === currentDest.id);
    if (pkg) {
      basePrice = pkg.pricePerPerson * adults + (pkg.pricePerPerson * 0.6 * children);
    } else {
      basePrice = currentDest.estimatedCost * travellersCount;
    }
  } else {
    // Custom planning (Flexible modes)
    if (bookingServiceType === 'travel_and_hotel' || bookingServiceType === 'hotel_only') {
      basePrice += 2200 * nightsCount; // Hotel stay
    }
    if (bookingServiceType === 'travel_and_hotel' || bookingServiceType === 'travel_only') {
      basePrice += 1800 * (travellersCount > 4 ? 2 : 1); // Transport
    }
  }

  // Caretaker / Guide fees
  const caretakerFee = caretakerSelected ? 800 * nightsCount : 0;
  const guideFee = guideSelected ? 1200 * nightsCount : 0;
  const assistanceTotal = caretakerFee + guideFee;

  // Add-on services
  const ADDONS_LIST = [
    { id: 'heritage_pass', name: 'Archaeological Survey (ASI) Fast-Track Monument Pass', price: 250 },
    { id: 'photography_kit', name: 'Visual Storytelling Photography Guide & Trip Album', price: 750 },
    { id: 'ayurvedic_spa', name: 'Herbal Foot Relief & Traditional Rejuvenation Session', price: 950 }
  ];

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const item = ADDONS_LIST.find(a => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const subtotal = Math.max(0, basePrice + assistanceTotal + addonsTotal);

  // Discount calculation: First booking 10% off (min ₹1500, max ₹1500)
  let discountAmount = 0;
  let isFirstBookingDiscount = false;

  if (!user.firstBookingDiscountUsed && subtotal >= 1500) {
    isFirstBookingDiscount = true;
    discountAmount = Math.min(1500, Math.round(subtotal * 0.10));
  } else if (appliedCouponCode) {
    if (appliedCouponCode.includes('100')) discountAmount = 100;
    else if (appliedCouponCode.includes('50')) discountAmount = 50;
    else if (appliedCouponCode.includes('20')) discountAmount = 20;
    else if (appliedCouponCode.includes('VIP')) discountAmount = 250;
  }

  const finalPayable = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = () => {
    setCouponError(null);
    const clean = couponInput.trim().toUpperCase();
    if (!clean) return;
    if (clean.startsWith('TNSPIN') || clean.startsWith('TNGIFT')) {
      setAppliedCouponCode(clean);
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code. Use codes won from Daily Spin & Win!');
    }
  };

  const handleConfirm = () => {
    if (isRedAlert) return;

    const newBooking: Booking = {
      id: `bkg-${Date.now()}`,
      bookingRef: `TN-${Math.floor(100000 + Math.random() * 900000)}`,
      userId: user.id,
      customerName: user.name,
      customerEmail: user.email,
      customerPhone: user.phone || '+91 98401 23456',
      destinationId: currentDest.id,
      destinationName: currentDest.name,
      bookingServiceType,
      startDate,
      returnDate,
      travellers: travellersCount,
      adults,
      children,
      companionType,
      arrangementPreference,
      selectedPackageId: selectedPkgId || undefined,
      hotelDetails: bookingServiceType !== 'travel_only' ? {
        hotelName: `${currentDest.name} Grand Heritage Stay`,
        roomType: hotelRoomType,
        nights: nightsCount,
        pricePerNight: 2200
      } : undefined,
      transportDetails: bookingServiceType !== 'hotel_only' ? {
        vehicleType: selectedVehicle,
        pickupLocation: 'Chennai / Madurai / Coimbatore',
        dropLocation: currentDest.name,
        price: 1800
      } : undefined,
      caretakerGuide: {
        caretaker: caretakerSelected,
        guide: guideSelected,
        caretakerFee,
        guideFee
      },
      addOnServices: selectedAddons.map(id => {
        const item = ADDONS_LIST.find(a => a.id === id)!;
        return { id: item.id, name: item.name, price: item.price };
      }),
      originalPrice: subtotal,
      appliedCoupon: appliedCouponCode || (isFirstBookingDiscount ? 'FIRST10' : undefined),
      discountPercentage: isFirstBookingDiscount ? 10 : undefined,
      discountAmount,
      finalPrice: finalPayable,
      bookingStatus: 'confirmed',
      paymentStatus: 'pending', // Pending payment workflow as per instructions
      isFirstBookingDiscount,
      travelKitClaimed: true,
      travelKitQr: `TN-KIT-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    StorageService.saveBooking(newBooking);
    setConfirmedBooking(newBooking);
    onBookingConfirmed(newBooking);
    setStep(9);
  };

  const handleReset = () => {
    setStep(1);
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-6 flex flex-col max-h-[92vh]">
        {/* Wizard Header */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 px-6 py-4 text-white flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-900/50 px-2 py-0.5 rounded-full border border-amber-600/40">
              {step === 9 ? 'Booking Confirmed' : `Step ${step} of 8 • Personalized Booking Wizard`}
            </span>
            <h2 className="text-base sm:text-lg font-bold font-display text-white mt-1">
              {step === 1 && 'Step 1: Select Tamil Nadu Destination'}
              {step === 2 && 'Step 2: Dates & Traveller Count'}
              {step === 3 && 'Step 3: Who are you travelling with?'}
              {step === 4 && 'Step 4: Trip Arrangement & Flexible Modes'}
              {step === 5 && 'Step 5: Caretaker & Local Guide Assistance'}
              {step === 6 && 'Step 6: Packages & Add-on Services'}
              {step === 7 && 'Step 7: First-Booking Discount & Spin Coupons'}
              {step === 8 && 'Step 8: Review Complete Booking Summary'}
              {step === 9 && 'Step 9: Booking Confirmation & Travel Passes'}
            </h2>
          </div>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wizard Body Steps */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* STEP 1: Select Destination */}
          {step === 1 && (
            <div className="space-y-4">
              <input
                type="text"
                value={searchDest}
                onChange={(e) => setSearchDest(e.target.value)}
                placeholder="Search Tamil Nadu destinations (e.g. Madurai, Ooty, Mahabalipuram)..."
                className="w-full p-2.5 text-xs border border-stone-300 rounded-xl bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
                {destinations
                  .filter(d => 
                    d.name.toLowerCase().includes(searchDest.toLowerCase()) || 
                    d.district.toLowerCase().includes(searchDest.toLowerCase())
                  )
                  .map(dest => {
                    const isSelected = selectedDestId === dest.id;
                    const hasRed = dest.weatherDangerStatus === 'red' || dest.bookingRestricted;

                    return (
                      <div
                        key={dest.id}
                        onClick={() => setSelectedDestId(dest.id)}
                        className={`p-3 rounded-2xl border-2 flex gap-3 transition-all cursor-pointer relative ${
                          isSelected
                            ? 'border-amber-600 bg-amber-50/70 shadow-xs'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-20 h-20 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-stone-900 truncate">{dest.name}</span>
                            {isSelected && <Check className="w-4 h-4 text-amber-600 shrink-0" />}
                          </div>
                          <div className="text-[10px] text-stone-500">{dest.district} District</div>
                          <div className="text-[11px] text-stone-600 line-clamp-2 mt-1">
                            {dest.shortDescription}
                          </div>

                          <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-100">
                            <span className="text-[10px] text-stone-400">Est. ₹{dest.estimatedCost}/day</span>
                            {hasRed && (
                              <span className="text-[9px] font-extrabold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">
                                Red Alert Active
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {isRedAlert && (
                <div className="p-3 bg-red-50 border border-red-300 text-red-900 rounded-xl text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                  <span>
                    Warning: <strong>{currentDest.name}</strong> currently has an active Red Alert danger zone. Confirmation will be blocked in Step 8 to ensure safety.
                  </span>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Travel Details */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-700" />
                <span>Selected Destination: {currentDest.name} ({currentDest.district})</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Departure Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2.5 text-xs border border-stone-300 rounded-xl bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Return Date</label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full p-2.5 text-xs border border-stone-300 rounded-xl bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                  <label className="block text-xs font-bold text-stone-700 mb-1">Adults (12+ years)</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={adults}
                    onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full p-2 text-xs border border-stone-300 rounded-xl bg-white font-bold"
                  />
                </div>
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                  <label className="block text-xs font-bold text-stone-700 mb-1">Children (2-11 years)</label>
                  <input
                    type="number"
                    min={0}
                    max={20}
                    value={children}
                    onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full p-2 text-xs border border-stone-300 rounded-xl bg-white font-bold"
                  />
                </div>
              </div>

              <div className="text-xs text-stone-500 pt-1">
                Trip Duration: <strong className="text-stone-800">{nightsCount} Night(s)</strong> • Total Passengers: <strong className="text-stone-800">{travellersCount}</strong>
              </div>
            </div>
          )}

          {/* STEP 3: Travel Companion */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-xs text-stone-600 font-medium">
                Who are you travelling with? This customizes accommodation privacy, dining recommendations, and vehicle arrangements.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'solo', label: 'Solo Travel', desc: 'Travelling alone on a personal journey', icon: Users },
                  { id: 'family', label: 'Family Trip', desc: 'Travelling with family, parents or kids', icon: Users },
                  { id: 'friends', label: 'Friends Trip', desc: 'Travelling with friends or colleagues', icon: Users },
                  { id: 'group_connect', label: 'Group Trip', desc: 'Travelling as an organized group (clubs/devotees)', icon: Bus },
                  { id: 'couple', label: 'Meet New Travellers', desc: 'Join a verified group experience in Tamil Nadu', icon: Compass }
                ].map((item) => {
                  const isSelected = companionType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCompanionType(item.id as TravelGroupType)}
                      className={`p-4 rounded-2xl border-2 text-left cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-amber-600 bg-amber-50/80 shadow-xs' 
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-sm text-stone-900">{item.label}</span>
                        {isSelected && <Check className="w-4 h-4 text-amber-600" />}
                      </div>
                      <div className="text-xs text-stone-500">{item.desc}</div>
                    </button>
                  );
                })}
              </div>

              {companionType === 'couple' && (
                <div className="p-3 bg-stone-100 rounded-xl border border-stone-200 text-xs text-stone-600">
                  ℹ️ <strong>Group Joining Status:</strong> Active departure groups available for {currentDest.name} leaving every weekend. Verified IDs required at meetup.
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Travel Arrangement & Flexible Booking Mode */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="text-xs text-stone-600 font-medium">
                How would you like to plan your trip?
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setArrangementPreference('plan_for_me')}
                  className={`p-4 rounded-2xl border-2 text-left cursor-pointer transition-all ${
                    arrangementPreference === 'plan_for_me' 
                      ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold' 
                      : 'border-stone-200 text-stone-700'
                  }`}
                >
                  <div className="text-sm font-bold">Option A: Plan My Trip for Me</div>
                  <div className="text-xs text-stone-500 mt-1 font-normal">
                    Complete curated tour package with hotel, transport & sightseeing.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setArrangementPreference('plan_own')}
                  className={`p-4 rounded-2xl border-2 text-left cursor-pointer transition-all ${
                    arrangementPreference === 'plan_own' 
                      ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold' 
                      : 'border-stone-200 text-stone-700'
                  }`}
                >
                  <div className="text-sm font-bold">Option B: I'll Plan My Own Trip</div>
                  <div className="text-xs text-stone-500 mt-1 font-normal">
                    Choose individual services independently: Hotel Only, Travel Only, or Both.
                  </div>
                </button>
              </div>

              {/* Flexible 3-Option Booking System */}
              {arrangementPreference === 'plan_own' && (
                <div className="mt-4 pt-3 border-t border-stone-200 space-y-3">
                  <div className="text-xs font-bold text-stone-800">
                    Select Your Service Combination (Never forced to book both):
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'travel_and_hotel', label: 'Travel + Hotel', desc: 'Both transport & lodging' },
                      { id: 'hotel_only', label: 'Hotel Only', desc: 'Lodging without travel' },
                      { id: 'travel_only', label: 'Travel Only', desc: 'Vehicles/buses only' }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setBookingServiceType(opt.id as BookingServiceType)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          bookingServiceType === opt.id 
                            ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold' 
                            : 'border-stone-200 text-stone-600'
                        }`}
                      >
                        <div className="text-xs font-bold">{opt.label}</div>
                        <div className="text-[10px] text-stone-400 mt-0.5">{opt.desc}</div>
                      </button>
                    ))}
                  </div>

                  {bookingServiceType !== 'hotel_only' && (
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                      <label className="block font-bold text-stone-700 mb-1">Select Transport Vehicle</label>
                      <select
                        value={selectedVehicle}
                        onChange={(e) => setSelectedVehicle(e.target.value)}
                        className="w-full p-2 border border-stone-300 rounded-lg bg-white"
                      >
                        <option value="AC Tourist Sedan (4-Seater)">AC Tourist Sedan (4-Seater) – ₹1,800/day</option>
                        <option value="Innova Crysta SUV (7-Seater)">Innova Crysta SUV (7-Seater) – ₹2,400/day</option>
                        <option value="AC Tourist Tempo Traveller (12-Seater)">AC Tourist Tempo Traveller (12-Seater) – ₹4,200/day</option>
                        <option value="Executive Tourist Bus (35-Seater)">Executive Tourist Bus (35-Seater) – ₹8,500/day</option>
                      </select>
                    </div>
                  )}

                  {bookingServiceType !== 'travel_only' && (
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                      <label className="block font-bold text-stone-700 mb-1">Select Accommodation Category</label>
                      <select
                        value={hotelRoomType}
                        onChange={(e) => setHotelRoomType(e.target.value)}
                        className="w-full p-2 border border-stone-300 rounded-lg bg-white"
                      >
                        <option value="Comfort Budget Room">Comfort Budget Stay – ₹1,500/night</option>
                        <option value="Deluxe Heritage Room">Deluxe Heritage Room – ₹2,200/night</option>
                        <option value="Executive Suite / Villa">Executive Suite / Villa – ₹4,500/night</option>
                      </select>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* STEP 5: Caretaker & Local Guide */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="text-xs text-stone-600 font-medium">
                Would you like someone to assist you during your trip?
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => { setCaretakerSelected(true); setGuideSelected(false); }}
                  className={`p-4 rounded-2xl border-2 text-left cursor-pointer transition-all ${
                    caretakerSelected && !guideSelected 
                      ? 'border-amber-600 bg-amber-50 shadow-xs' 
                      : 'border-stone-200 bg-white'
                  }`}
                >
                  <div className="font-bold text-sm text-stone-900">Yes, I need a caretaker</div>
                  <div className="text-xs text-stone-500 mt-1">
                    Elderly assistance, baggage care, medicine reminders & darshan queue support (+₹800/night).
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => { setGuideSelected(true); setCaretakerSelected(false); }}
                  className={`p-4 rounded-2xl border-2 text-left cursor-pointer transition-all ${
                    guideSelected && !caretakerSelected 
                      ? 'border-amber-600 bg-amber-50 shadow-xs' 
                      : 'border-stone-200 bg-white'
                  }`}
                >
                  <div className="font-bold text-sm text-stone-900">Yes, I need a local travel guide</div>
                  <div className="text-xs text-stone-500 mt-1">
                    Licensed multilingual local historian & photography angle expert (+₹1,200/night).
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => { setCaretakerSelected(true); setGuideSelected(true); }}
                  className={`p-4 rounded-2xl border-2 text-left cursor-pointer transition-all ${
                    caretakerSelected && guideSelected 
                      ? 'border-amber-600 bg-amber-50 shadow-xs' 
                      : 'border-stone-200 bg-white'
                  }`}
                >
                  <div className="font-bold text-sm text-stone-900">Yes, I need both</div>
                  <div className="text-xs text-stone-500 mt-1">
                    Full personal caregiver + registered tour guide for peace of mind (+₹2,000/night).
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => { setCaretakerSelected(false); setGuideSelected(false); }}
                  className={`p-4 rounded-2xl border-2 text-left cursor-pointer transition-all ${
                    !caretakerSelected && !guideSelected 
                      ? 'border-amber-600 bg-amber-50 shadow-xs' 
                      : 'border-stone-200 bg-white'
                  }`}
                >
                  <div className="font-bold text-sm text-stone-900">No, I can manage on my own</div>
                  <div className="text-xs text-stone-500 mt-1">
                    Self-guided exploration. You can reach our 24/7 helpline anytime at ₹0.
                  </div>
                </button>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs flex justify-between items-center">
                <span>Assistance Service Total:</span>
                <span className="font-bold text-stone-900">₹{assistanceTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          )}

          {/* STEP 6: Packages & Add-on Services */}
          {step === 6 && (
            <div className="space-y-4">
              <div className="text-xs text-stone-600 font-medium">
                Select curated packages or special add-on experiences:
              </div>

              <div className="space-y-2">
                {ADDONS_LIST.map(addon => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`p-3 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                        isChecked ? 'border-amber-600 bg-amber-50/70' : 'border-stone-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            if (isChecked) setSelectedAddons(selectedAddons.filter(id => id !== addon.id));
                            else setSelectedAddons([...selectedAddons, addon.id]);
                          }}
                          className="rounded text-amber-600"
                        />
                        <span className="text-xs font-bold text-stone-800">{addon.name}</span>
                      </div>
                      <span className="text-xs font-bold text-stone-900">+₹{addon.price}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 7: First-Booking Discount & Coupons */}
          {step === 7 && (
            <div className="space-y-4">
              {/* First-Booking Offer Status */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-100">
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>TN Stories First-Booking Offer</span>
                </div>
                <div className="text-lg font-extrabold font-display mt-1">10% OFF Welcome Discount</div>
                <p className="text-xs text-amber-100 mt-1">
                  {user.firstBookingDiscountUsed
                    ? 'You have already used your first-booking welcome promotion on a previous trip.'
                    : subtotal >= 1500
                    ? `Eligible! 10% discount (-₹${discountAmount}) automatically calculated on this ₹${subtotal.toLocaleString('en-IN')} booking.`
                    : 'Minimum booking value of ₹1,500 required to unlock 10% discount.'}
                </p>
              </div>

              {/* Spin Coupon code input */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <label className="block text-xs font-bold text-stone-700">
                  Have a Daily Spin & Win Coupon Code?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="e.g. TNSPIN50 or TNSPIN100"
                    className="flex-1 p-2 text-xs border border-stone-300 rounded-xl bg-white uppercase font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-red-600 font-semibold">{couponError}</p>}
                {appliedCouponCode && (
                  <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Coupon {appliedCouponCode} applied successfully!</span>
                  </p>
                )}
              </div>

              {/* Price Calculation Card */}
              <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Trip Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount Applied</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between font-extrabold text-sm text-stone-900 pt-2 border-t border-stone-200">
                  <span>Final Payable</span>
                  <span className="text-amber-800">₹{finalPayable.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 8: Review Complete Booking Summary */}
          {step === 8 && (
            <div className="space-y-4">
              {/* Danger Zone Blocker */}
              {isRedAlert && (
                <div className="p-4 bg-red-100 border-2 border-red-500 rounded-2xl text-red-950 space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-red-900">
                    <ShieldAlert className="w-5 h-5 text-red-600" />
                    <span>BOOKING BLOCKED: DANGER ZONE – RED ALERT ACTIVE</span>
                  </div>
                  <p className="text-xs text-red-800">
                    {currentDest.name} has severe weather risks. To guarantee your safety, trip bookings to this destination are blocked until the alert is cleared. Please return to Step 1 and pick a safe alternative (e.g. Yercaud, Madurai, or Thanjavur).
                  </p>
                </div>
              )}

              {/* Transparent Summary Table */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2.5 text-xs text-stone-700">
                <div className="flex justify-between pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Destination</span>
                  <span className="font-bold text-stone-900">{currentDest.name} ({currentDest.district})</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Dates & Duration</span>
                  <span className="font-bold text-stone-900">{startDate} to {returnDate} ({nightsCount} Nights)</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Travellers</span>
                  <span className="font-bold text-stone-900">{adults} Adult(s), {children} Child(ren)</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Travel Companion</span>
                  <span className="font-bold text-stone-900 capitalize">{companionType.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Arrangement & Mode</span>
                  <span className="font-bold text-stone-900 capitalize">
                    {arrangementPreference === 'plan_for_me' ? 'Plan For Me (Package)' : bookingServiceType.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Assistance Caretaker/Guide</span>
                  <span className="font-bold text-stone-900">
                    {caretakerSelected && guideSelected ? 'Both Caretaker & Guide' : caretakerSelected ? 'Caretaker' : guideSelected ? 'Local Guide' : 'Self-guided'}
                  </span>
                </div>

                <div className="pt-2 flex justify-between text-base font-extrabold text-stone-900">
                  <span>Total Amount</span>
                  <span className="text-amber-800">₹{finalPayable.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-xs flex items-center gap-2">
                <Gift className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  Every confirmed booking includes a <strong>Free Sponsored Travel Kit</strong> and access to <strong>Beach Changing Rooms (Customer Payable: ₹0)</strong>!
                </span>
              </div>
            </div>
          )}

          {/* STEP 9: Booking Confirmation & Travel Passes */}
          {step === 9 && confirmedBooking && (
            <div className="space-y-5 text-center animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold font-display text-stone-900">
                  Trip Booking Request Recorded!
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Your reference ID: <strong className="font-mono text-stone-900">{confirmedBooking.bookingRef}</strong>
                </p>
                <div className="inline-block mt-2 px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full">
                  Status: Pending Confirmation / Verified Request
                </div>
              </div>

              {/* Free Travel Kit Pass Card */}
              <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 text-left flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                    <Gift className="w-4 h-4 text-amber-700" />
                    <span>Free Sponsored Travel Kit Claim QR</span>
                  </div>
                  <div className="text-[11px] text-stone-600 mt-1">
                    Show this QR at the pickup counter or boarding station to collect your free kit sponsored by Aavin & TN Khadi.
                  </div>
                  <div className="font-mono text-xs font-bold text-stone-800 mt-1">
                    Kit Code: {confirmedBooking.travelKitQr}
                  </div>
                </div>

                <div className="w-20 h-20 bg-white p-2 rounded-xl border border-stone-200 flex items-center justify-center shrink-0 shadow-xs">
                  <QrCode className="w-16 h-16 text-stone-800" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  View in My Bookings
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-3 border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Navigation */}
        {step < 9 && (
          <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 border border-stone-300 text-stone-700 hover:bg-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div></div>
            )}

            {step < 8 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isRedAlert}
                onClick={handleConfirm}
                className={`px-6 py-2.5 text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer ${
                  isRedAlert 
                    ? 'bg-stone-300 text-stone-500 cursor-not-allowed shadow-none' 
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Confirm & Request Booking</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
