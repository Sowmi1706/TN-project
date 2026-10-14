import React, { useState } from 'react';
import { 
  Umbrella, 
  Sparkles, 
  MapPin, 
  Clock, 
  Users, 
  ShieldCheck, 
  QrCode, 
  Check, 
  Phone, 
  Building2, 
  ArrowRight,
  Droplets,
  Lock,
  Baby
} from 'lucide-react';
import { BeachFacility, BeachBooking, User } from '../types';
import { StorageService } from '../services/storageService';

interface BeachChangingRoomBookingProps {
  user: User;
  facilities: BeachFacility[];
  beachBookings: BeachBooking[];
  onBookingSuccess: (booking: BeachBooking) => void;
}

export const BeachChangingRoomBooking: React.FC<BeachChangingRoomBookingProps> = ({
  user,
  facilities,
  beachBookings,
  onBookingSuccess
}) => {
  const [selectedFacility, setSelectedFacility] = useState<BeachFacility>(facilities[0]);
  const [date, setDate] = useState('2026-10-25');
  const [timeSlot, setTimeSlot] = useState('07:00 AM – 09:00 AM');
  const [guests, setGuests] = useState(2);
  const [includeValuablesLocker, setIncludeValuablesLocker] = useState(false);
  const [includeRefreshment, setIncludeRefreshment] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BeachBooking | null>(null);

  // Partner Registration Form
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [pBeach, setPBeach] = useState('Marina Beach (Chennai)');
  const [pDistrict, setPDistrict] = useState('Chennai');
  const [pFacilityName, setPFacilityName] = useState('');
  const [pPhone, setPPhone] = useState('');
  const [partnerRegistered, setPartnerRegistered] = useState(false);

  const TIME_SLOTS = [
    '05:30 AM – 07:30 AM (Sunrise Dip)',
    '07:30 AM – 09:30 AM',
    '09:30 AM – 11:30 AM',
    '03:00 PM – 05:00 PM',
    '05:00 PM – 07:00 PM (Sunset Hours)',
    '07:00 PM – 09:00 PM'
  ];

  // Optional services calculation (Customer approved only)
  let optionalCost = 0;
  const optionalAddons: string[] = [];
  if (includeValuablesLocker) {
    optionalCost += 30;
    optionalAddons.push('Valuables Locker (+₹30)');
  }
  if (includeRefreshment) {
    optionalCost += 50;
    optionalAddons.push('Tender Coconut & Refreshment (+₹50)');
  }

  const handleBookFacility = (e: React.FormEvent) => {
    e.preventDefault();

    const newBooking: BeachBooking = {
      id: `bch-${Date.now()}`,
      bookingRef: `TN-BEACH-${Math.floor(1000 + Math.random() * 9000)}`,
      facilityId: selectedFacility.id,
      facilityName: selectedFacility.facilityName,
      beachName: selectedFacility.beachName,
      userId: user.id,
      customerName: user.name,
      date,
      timeSlot,
      guests,
      qrCode: `TN-ROOM-QR-${Date.now()}`,
      optionalAddons,
      totalPayable: optionalCost,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    StorageService.saveBeachBooking(newBooking);
    setConfirmedBooking(newBooking);
    onBookingSuccess(newBooking);
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pFacilityName || !pPhone) return;

    const newFacility: BeachFacility = {
      id: `bch-${Date.now()}`,
      beachName: pBeach,
      district: pDistrict,
      facilityName: pFacilityName,
      photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      amenities: [
        'Private Changing Cubicles',
        'Freshwater Showers',
        'Clean Sanitized Restrooms',
        'Footwash Stations'
      ],
      freeServiceNotice: 'No Booking Fee – Customer Payable: ₹0',
      openHours: '06:00 AM – 08:30 PM',
      distanceFromShore: '50m from shore',
      verified: false, // Requires admin verification
      phone: pPhone
    };

    const current = StorageService.getBeachFacilities();
    current.unshift(newFacility);
    StorageService.setBeachFacilities(current);
    setPartnerRegistered(true);
    setTimeout(() => {
      setPartnerRegistered(false);
      setShowPartnerModal(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-sky-850 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-400/30">
              <Umbrella className="w-3.5 h-3.5 text-sky-300" />
              <span>Beach Trip Public Amenities</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              Beach Changing Rooms & Refreshment Facilities
            </h1>
            <p className="text-xs sm:text-sm text-stone-200 max-w-2xl leading-relaxed">
              Reserve hygienic changing cubicles (Men, Women & Families), freshwater shower stalls, cloakrooms, and baby-care stations across Marina, Mahabalipuram, and Kanyakumari.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            {/* Free Booking Highlight Policy Banner */}
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center">
              <div className="text-[10px] font-bold text-sky-200 uppercase tracking-wider">Free Booking Policy</div>
              <div className="text-sm font-extrabold text-white">Customer Payable: ₹0</div>
              <div className="text-[9px] text-sky-100">Zero Convenience or Booking Fees</div>
            </div>

            <button
              onClick={() => setShowPartnerModal(true)}
              className="px-4 py-2 bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 text-xs font-bold rounded-2xl border border-sky-400/40 transition-colors cursor-pointer self-center"
            >
              Partner / Facility Owner Registration
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmedBooking && (
        <div className="p-6 bg-emerald-50 border-2 border-emerald-500 rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 animate-in zoom-in-95">
          <div className="space-y-1.5 text-left">
            <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm">
              <Check className="w-5 h-5 text-emerald-600" />
              <span>Changing Room Reservation Confirmed!</span>
            </div>
            <div className="text-xs text-stone-700">
              Facility: <strong>{confirmedBooking.facilityName}</strong> ({confirmedBooking.beachName})
            </div>
            <div className="text-xs text-stone-600">
              Slot: <strong>{confirmedBooking.timeSlot}</strong> on <strong>{confirmedBooking.date}</strong> ({confirmedBooking.guests} Guests)
            </div>
            <div className="text-xs font-bold text-emerald-900">
              Standard Service: ₹0 Free • Total Amount: ₹{confirmedBooking.totalPayable}
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="w-20 h-20 bg-white p-2 rounded-2xl border border-emerald-300 flex items-center justify-center shadow-xs">
              <QrCode className="w-16 h-16 text-stone-800" />
            </div>
            <button
              onClick={() => setConfirmedBooking(null)}
              className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Main Grid: Facility Selector & Booking Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Beach Facilities Listing */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-stone-900 text-sm flex items-center justify-between">
            <span>Verified Coastal Amenities Pavilions</span>
            <span className="text-xs text-stone-500 font-normal">Select a location to book</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {facilities.map(fac => {
              const isSelected = selectedFacility.id === fac.id;
              return (
                <div
                  key={fac.id}
                  onClick={() => setSelectedFacility(fac)}
                  className={`p-4 rounded-3xl border-2 transition-all cursor-pointer bg-white flex flex-col justify-between ${
                    isSelected ? 'border-sky-600 ring-2 ring-sky-300 shadow-md' : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div>
                    <div className="relative h-32 rounded-2xl overflow-hidden mb-3">
                      <img src={fac.photo} alt={fac.facilityName} className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-stone-900/80 text-white text-[10px] font-bold">
                        {fac.distanceFromShore}
                      </div>
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                        {fac.freeServiceNotice}
                      </div>
                    </div>

                    <div className="font-bold text-sm text-stone-900">{fac.facilityName}</div>
                    <div className="text-xs font-medium text-sky-800 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{fac.beachName} ({fac.district})</span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {fac.amenities.map(am => (
                        <span key={am} className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md">
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{fac.openHours}</span>
                    </span>
                    <span className="font-extrabold text-sky-700">Select & Book</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Booking Reservation Form */}
        <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-md space-y-4">
          <div className="space-y-1">
            <h3 className="font-bold text-base font-display text-stone-900">
              Book Changing Room Pass
            </h3>
            <p className="text-xs text-stone-500">
              Selected: <strong className="text-stone-800">{selectedFacility.facilityName}</strong>
            </p>
          </div>

          <form onSubmit={handleBookFacility} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Visit Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2.5 text-xs border border-stone-300 rounded-xl bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Preferred Time Slot</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full p-2.5 text-xs border border-stone-300 rounded-xl bg-white"
              >
                {TIME_SLOTS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Guests / Family Members</label>
              <input
                type="number"
                min={1}
                max={15}
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                className="w-full p-2.5 text-xs border border-stone-300 rounded-xl bg-white"
                required
              />
            </div>

            {/* Optional Services - Explicit Customer Approval */}
            <div className="pt-2 border-t border-stone-200 space-y-2">
              <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                Optional Add-on Amenities (Explicit Opt-In)
              </div>

              <label className="flex items-center justify-between p-2 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer text-xs">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={includeValuablesLocker}
                    onChange={(e) => setIncludeValuablesLocker(e.target.checked)}
                    className="rounded text-sky-600"
                  />
                  <span>Electronic Valuables Locker (2 Hrs)</span>
                </span>
                <span className="font-bold text-stone-800">+₹30</span>
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer text-xs">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={includeRefreshment}
                    onChange={(e) => setIncludeRefreshment(e.target.checked)}
                    className="rounded text-sky-600"
                  />
                  <span>Tender Coconut & Mineral Water</span>
                </span>
                <span className="font-bold text-stone-800">+₹50</span>
              </label>
            </div>

            {/* Total Breakdown */}
            <div className="p-3 bg-sky-50 rounded-2xl border border-sky-200 text-xs space-y-1">
              <div className="flex justify-between font-bold text-sky-950">
                <span>Standard Changing & Shower:</span>
                <span className="text-emerald-700">FREE (₹0)</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Optional Amenities:</span>
                <span>₹{optionalCost}</span>
              </div>
              <div className="flex justify-between font-extrabold text-sm text-stone-900 pt-1 border-t border-sky-200">
                <span>Total Customer Payable:</span>
                <span className="text-sky-800">₹{optionalCost}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Confirm & Generate QR Pass</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Partner Modal */}
      {showPartnerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-stone-900">Partner Registration</h3>
              <button onClick={() => setShowPartnerModal(false)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>
            {partnerRegistered ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 text-xs rounded-xl font-bold">
                Facility registered successfully! Waiting for admin inspection & publishing.
              </div>
            ) : (
              <form onSubmit={handlePartnerSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold mb-1">Beach Name</label>
                  <input
                    type="text"
                    value={pBeach}
                    onChange={(e) => setPBeach(e.target.value)}
                    className="w-full p-2 border rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Facility Name</label>
                  <input
                    type="text"
                    value={pFacilityName}
                    onChange={(e) => setPFacilityName(e.target.value)}
                    placeholder="e.g. Elliot's Coastline Shower Suites"
                    className="w-full p-2 border rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={pPhone}
                    onChange={(e) => setPPhone(e.target.value)}
                    placeholder="+91 94440 00000"
                    className="w-full p-2 border rounded-xl"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-sky-600 text-white rounded-xl font-bold cursor-pointer hover:bg-sky-700"
                >
                  Submit For Admin Verification
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
