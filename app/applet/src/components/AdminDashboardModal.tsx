import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  Package, 
  Ticket, 
  Sparkles, 
  CloudRain, 
  Umbrella, 
  Gift, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { 
  Destination, 
  TourPackage, 
  Booking, 
  SpinReward, 
  WeatherInfo, 
  BeachFacility, 
  Sponsor, 
  Review 
} from '../types';
import { StorageService } from '../services/storageService';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinations: Destination[];
  packages: TourPackage[];
  bookings: Booking[];
  spinRewards: SpinReward[];
  weatherAlerts: WeatherInfo[];
  beachFacilities: BeachFacility[];
  sponsors: Sponsor[];
  reviews: Review[];
  onDataUpdated: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  destinations,
  packages,
  bookings,
  spinRewards,
  weatherAlerts,
  beachFacilities,
  sponsors,
  reviews,
  onDataUpdated
}) => {
  const [activeTab, setActiveTab] = useState<
    'bookings' | 'destinations' | 'packages' | 'weather' | 'spin' | 'sponsors' | 'beach' | 'reviews'
  >('bookings');

  // Toggle Red Alert on a district
  const handleToggleRedAlert = (districtName: string) => {
    const alerts = StorageService.getWeatherAlerts();
    const updated = alerts.map(a => {
      if (a.district === districtName) {
        const isNowRed = a.severity !== 'red';
        return {
          ...a,
          severity: isNowRed ? ('red' as const) : ('green' as const),
          bookingRestricted: isNowRed,
          alertHeadline: isNowRed 
            ? `DANGER ZONE – RED ALERT: High Risk Alert active for ${districtName}` 
            : `Safe weather conditions reported for ${districtName}`
        };
      }
      return a;
    });
    StorageService.setWeatherAlerts(updated);

    // Sync destinations
    const dests = StorageService.getDestinations();
    const destUpdated = dests.map(d => {
      if (districtName.toLowerCase().includes(d.district.toLowerCase())) {
        const matchingAlert = updated.find(u => u.district === districtName);
        return {
          ...d,
          weatherDangerStatus: matchingAlert?.severity || 'green',
          bookingRestricted: matchingAlert?.bookingRestricted || false
        };
      }
      return d;
    });
    StorageService.setDestinations(destUpdated);

    onDataUpdated();
  };

  // Update spin probabilities
  const handleUpdateSpinProb = (rewardId: string, newProb: number) => {
    const list = StorageService.getSpinRewards();
    const updated = list.map(r => r.id === rewardId ? { ...r, probability: newProb } : r);
    StorageService.setSpinRewards(updated);
    onDataUpdated();
  };

  // Approve Sponsor
  const handleApproveSponsor = (id: string) => {
    const current = StorageService.getSponsors();
    const updated = current.map(s => s.id === id ? { ...s, status: 'active' as const } : s);
    StorageService.setSponsors(updated);
    onDataUpdated();
  };

  // Verify Beach Facility
  const handleVerifyBeachFacility = (id: string) => {
    const current = StorageService.getBeachFacilities();
    const updated = current.map(f => f.id === id ? { ...f, verified: true } : f);
    StorageService.setBeachFacilities(updated);
    onDataUpdated();
  };

  // Delete Review
  const handleDeleteReview = (id: string) => {
    StorageService.deleteReview(id);
    onDataUpdated();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-300 my-6 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-950 via-stone-900 to-purple-950 px-6 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-display text-white">
                TN Stories Tourism Administration Console
              </h2>
              <p className="text-[11px] text-purple-200/80">
                Department of Tourism & Cultural Development Control Center
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-4 text-xs font-bold text-stone-600 overflow-x-auto shrink-0">
          {[
            { id: 'bookings', label: `Bookings (${bookings.length})` },
            { id: 'destinations', label: `Destinations (${destinations.length})` },
            { id: 'weather', label: `Weather & Danger Zones` },
            { id: 'spin', label: `Daily Spin & Coupons` },
            { id: 'sponsors', label: `Sponsors (${sponsors.length})` },
            { id: 'beach', label: `Beach Facilities (${beachFacilities.length})` },
            { id: 'reviews', label: `Reviews Moderation (${reviews.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3.5 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
                activeTab === tab.id ? 'border-purple-700 text-purple-900 font-extrabold' : 'border-transparent hover:text-stone-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* BOOKINGS TAB */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-stone-800">Recent Customer Bookings</span>
                <span className="text-stone-500">Auto-persisted in local storage database</span>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-12 text-xs text-stone-400">
                  No bookings recorded yet. Use the Booking Wizard to submit a trip booking.
                </div>
              ) : (
                <div className="border border-stone-200 rounded-2xl overflow-hidden divide-y divide-stone-100 text-xs">
                  <div className="grid grid-cols-6 bg-stone-100 p-3 font-bold text-stone-700 text-[11px]">
                    <span>Reference / Customer</span>
                    <span>Destination</span>
                    <span>Dates</span>
                    <span>Mode</span>
                    <span>Discounts</span>
                    <span className="text-right">Final Amount</span>
                  </div>
                  {bookings.map(b => (
                    <div key={b.id} className="grid grid-cols-6 p-3 items-center hover:bg-stone-50">
                      <div>
                        <div className="font-mono font-bold text-stone-900">{b.bookingRef}</div>
                        <div className="text-[10px] text-stone-500">{b.customerName}</div>
                      </div>
                      <div className="font-semibold text-stone-800">{b.destinationName}</div>
                      <div className="text-[11px] text-stone-500">{b.startDate}</div>
                      <div className="capitalize text-[11px]">{b.bookingServiceType.replace(/_/g, ' ')}</div>
                      <div className="text-emerald-700 font-bold">
                        {b.discountAmount > 0 ? `-₹${b.discountAmount}` : 'None'}
                      </div>
                      <div className="text-right font-bold text-amber-800">
                        ₹{b.finalPrice.toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* WEATHER & DANGER ZONES TAB */}
          {activeTab === 'weather' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900">
                <strong>Meteorological Danger Zone Simulator:</strong> You can toggle 🔴 RED ALERT status on any district below. Toggling a district to Red Alert immediately restricts bookings and activates danger zone banners across the user app!
              </div>

              <div className="space-y-3">
                {weatherAlerts.map(alert => {
                  const isRed = alert.severity === 'red';
                  return (
                    <div
                      key={alert.district}
                      className="p-4 bg-white rounded-2xl border border-stone-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-extrabold text-sm text-stone-900">{alert.district}</div>
                        <div className="text-[11px] text-stone-500">
                          {alert.condition} • Temp: {alert.temperature}°C • Rainfall: {alert.rainfall}
                        </div>
                        <div className="mt-1">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            isRed ? 'bg-red-600 text-white' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {isRed ? 'RED ALERT (BOOKING BLOCKED)' : 'NORMAL / SAFE'}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleRedAlert(alert.district)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                          isRed
                            ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                            : 'bg-red-600 hover:bg-red-700 text-white'
                        }`}
                      >
                        {isRed ? 'Clear Red Alert' : 'Trigger Red Alert Danger Zone'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* DAILY SPIN & WIN CONFIG TAB */}
          {activeTab === 'spin' && (
            <div className="space-y-4">
              <div className="text-xs text-stone-600">
                Adjust prize probabilities and coupon budgets. Default 90% non-winning / 10% reward split is maintained.
              </div>

              <div className="space-y-2.5">
                {spinRewards.map(reward => (
                  <div
                    key={reward.id}
                    className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-stone-900">{reward.label}</span>
                      <span className="text-stone-400 text-[10px] ml-2">
                        {reward.isWinning ? `Coupon: ${reward.couponCode}` : 'Non-winning segment'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-stone-600">Probability:</span>
                      <input
                        type="number"
                        step={0.5}
                        min={0}
                        max={100}
                        value={reward.probability}
                        onChange={(e) => handleUpdateSpinProb(reward.id, parseFloat(e.target.value) || 0)}
                        className="w-16 p-1 border border-stone-300 rounded-lg text-right font-bold bg-white text-xs"
                      />
                      <span className="text-xs font-bold">%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SPONSORS TAB */}
          {activeTab === 'sponsors' && (
            <div className="space-y-3">
              {sponsors.map(sp => (
                <div
                  key={sp.id}
                  className="p-4 bg-white rounded-2xl border border-stone-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-sm text-stone-900">{sp.brandName}</div>
                    <div className="text-[10px] text-stone-500">{sp.companyName} • {sp.category}</div>
                    <div className="text-[11px] text-stone-600 mt-1">
                      Kit Items: {sp.productsInKit.join(', ')}
                    </div>
                  </div>

                  <div>
                    {sp.status === 'pending' ? (
                      <button
                        onClick={() => handleApproveSponsor(sp.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs cursor-pointer"
                      >
                        Approve Sponsorship
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md">
                        Active Sponsor ✓
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* BEACH FACILITIES TAB */}
          {activeTab === 'beach' && (
            <div className="space-y-3">
              {beachFacilities.map(fac => (
                <div
                  key={fac.id}
                  className="p-4 bg-white rounded-2xl border border-stone-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-sm text-stone-900">{fac.facilityName}</div>
                    <div className="text-[10px] text-stone-500">{fac.beachName} ({fac.district})</div>
                    <div className="text-[11px] text-stone-600 mt-0.5">{fac.distanceFromShore} • {fac.openHours}</div>
                  </div>

                  <div>
                    {fac.verified ? (
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md">
                        Verified & Published ✓
                      </span>
                    ) : (
                      <button
                        onClick={() => handleVerifyBeachFacility(fac.id)}
                        className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs cursor-pointer"
                      >
                        Verify & Publish
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <div className="space-y-3">
              {reviews.map(rev => (
                <div
                  key={rev.id}
                  className="p-4 bg-white rounded-2xl border border-stone-200 flex items-center justify-between text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900">{rev.userName}</span>
                      <span className="text-stone-400">reviewed</span>
                      <span className="font-bold text-amber-800">{rev.destinationName}</span>
                      <span className="text-amber-500 font-bold">★ {rev.rating}</span>
                    </div>
                    <p className="text-stone-600">{rev.text}</p>
                  </div>

                  <button
                    onClick={() => handleDeleteReview(rev.id)}
                    className="p-2 text-stone-400 hover:text-red-600 cursor-pointer"
                    title="Moderate / Delete review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* DESTINATIONS TAB */}
          {activeTab === 'destinations' && (
            <div className="space-y-3">
              <div className="text-xs text-stone-500">100% Verified Tamil Nadu Tourist Destinations</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {destinations.map(d => (
                  <div key={d.id} className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center gap-3">
                    <img src={d.image} alt={d.name} className="w-14 h-14 rounded-xl object-cover" />
                    <div>
                      <div className="font-bold text-stone-900">{d.name}</div>
                      <div className="text-[10px] text-stone-500">{d.district} • Rating: {d.rating}</div>
                      <div className="text-[10px] font-bold text-amber-800 mt-0.5">Est. ₹{d.estimatedCost}/day</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
