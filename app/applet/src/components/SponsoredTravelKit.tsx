import React, { useState } from 'react';
import { 
  Gift, 
  Sparkles, 
  Check, 
  QrCode, 
  Building2, 
  Package, 
  Send, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  Tag
} from 'lucide-react';
import { Sponsor, Booking, User } from '../types';
import { StorageService } from '../services/storageService';

interface SponsoredTravelKitProps {
  user: User;
  sponsors: Sponsor[];
  bookings: Booking[];
  onOpenBookingWizard: () => void;
}

export const SponsoredTravelKit: React.FC<SponsoredTravelKitProps> = ({
  user,
  sponsors,
  bookings,
  onOpenBookingWizard
}) => {
  const [activeTab, setActiveTab] = useState<'kit' | 'partner'>('kit');

  // Partner application form state
  const [brandName, setBrandName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [category, setCategory] = useState('Organic & Herbal');
  const [description, setDescription] = useState('');
  const [productsSupplied, setProductsSupplied] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const eligibleBookings = bookings.filter(b => b.travelKitClaimed);

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName || !companyName) return;

    const newSponsor: Sponsor = {
      id: `sp-${Date.now()}`,
      brandName,
      companyName,
      category,
      logo: `🏷️ ${brandName.toUpperCase()}`,
      description,
      status: 'pending', // Requires admin review
      productsInKit: productsSupplied.split(',').map(s => s.trim()).filter(Boolean),
      activeCampaigns: 'New Sponsor Application',
      kitsDistributed: 0
    };

    StorageService.addSponsor(newSponsor);
    setSubmitted(true);
    setBrandName('');
    setCompanyName('');
    setDescription('');
    setProductsSupplied('');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <Gift className="w-3.5 h-3.5 text-emerald-300" />
              <span>Free Sponsored Travel Kit Initiative</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              Complimentary Travel Kits for Every Booked Traveler
            </h1>
            <p className="text-xs sm:text-sm text-stone-200 max-w-2xl leading-relaxed">
              In partnership with iconic Tamil Nadu brands like Aavin, Tamil Nadu Khadi Board, and Wildcraft, we provide complimentary travel essentials and herbal personal care kits on eligible bookings.
            </p>
          </div>

          <button
            onClick={onOpenBookingWizard}
            className="px-6 py-3.5 bg-white hover:bg-stone-100 text-emerald-950 font-bold text-xs rounded-2xl shadow-lg flex items-center gap-2 transition-all hover:scale-105 cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>Book Trip & Claim Free Kit</span>
          </button>
        </div>
      </div>

      {/* Navigation Switch */}
      <div className="flex border-b border-stone-200 bg-stone-50 rounded-2xl p-1 max-w-md">
        <button
          onClick={() => setActiveTab('kit')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'kit' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          🎁 What's in the Travel Kit?
        </button>
        <button
          onClick={() => setActiveTab('partner')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'partner' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          🤝 Become a Brand Sponsor
        </button>
      </div>

      {activeTab === 'kit' && (
        <div className="space-y-8">
          {/* Kit Items Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xl">
                🥛
              </div>
              <h3 className="font-bold text-base text-stone-900">Aavin Heritage Treats</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Single-serve Aavin Badam milk powder travel sachet and traditional ghee peda snack for energy on long highway drives.
              </p>
              <div className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md inline-block">
                Sponsored by Aavin Tamil Nadu
              </div>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl">
                🌿
              </div>
              <h3 className="font-bold text-base text-stone-900">TN Khadi Herbal Care</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Organic neem hand wipes, herbal mosquito repellent roll-on, and a handloom cotton face towel woven by rural weavers.
              </p>
              <div className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md inline-block">
                Sponsored by TN Khadi Board
              </div>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xl">
                🎒
              </div>
              <h3 className="font-bold text-base text-stone-900">Eco Travel Essentials</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Reusable collapsible silicone water flask, waterproof pouch, first-aid strip, and a miniature Chola temple brass souvenir.
              </p>
              <div className="text-[11px] font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md inline-block">
                Sponsored by Wildcraft & TN Artisans
              </div>
            </div>
          </div>

          {/* User's Claimed Kits */}
          <div className="p-6 bg-stone-50 rounded-3xl border border-stone-200 space-y-4">
            <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Your Active Travel Kit Claim Passes</span>
            </h3>

            {eligibleBookings.length === 0 ? (
              <div className="text-xs text-stone-500">
                You have no active bookings with an unclaimed travel kit. Book any tour package or bus travel to automatically unlock your free QR collection pass!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {eligibleBookings.map(b => (
                  <div
                    key={b.id}
                    className="p-4 bg-white rounded-2xl border border-stone-200 flex items-center justify-between gap-4 shadow-2xs"
                  >
                    <div>
                      <div className="font-bold text-xs text-stone-900">{b.destinationName} Travel Kit</div>
                      <div className="text-[10px] text-stone-500 font-mono mt-0.5">Ref: {b.bookingRef}</div>
                      <div className="text-[10px] text-emerald-700 font-bold mt-1">
                        Ready for Pickup at Boarding Station
                      </div>
                    </div>
                    <div className="w-16 h-16 bg-stone-50 p-1 rounded-xl border border-stone-200 flex items-center justify-center shrink-0">
                      <QrCode className="w-12 h-12 text-stone-800" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'partner' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Partner Registration Form */}
          <div className="p-6 sm:p-8 bg-white rounded-3xl border border-stone-200 shadow-md space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold font-display text-stone-900">
                Partner With TN Stories AI
              </h2>
              <p className="text-xs text-stone-500">
                Put your brand in the hands of over 50,000 tourists travelling across Tamil Nadu every month.
              </p>
            </div>

            {submitted && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Your sponsorship proposal was submitted! Our brand partnership team will review it within 24 hours.</span>
              </div>
            )}

            <form onSubmit={handlePartnerSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Brand Name</label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="e.g. Aavin / Pothys"
                  className="w-full p-2.5 text-xs border border-stone-300 rounded-xl bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Registered Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Tamil Nadu Milk Federation"
                  className="w-full p-2.5 text-xs border border-stone-300 rounded-xl bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Sponsorship Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 text-xs border border-stone-300 rounded-xl bg-white"
                >
                  <option value="Organic & Herbal">Organic & Herbal Personal Care</option>
                  <option value="Food & Beverages">Food, Snacks & Beverages</option>
                  <option value="Outdoor & Travel Gear">Outdoor & Travel Gear</option>
                  <option value="Handloom & Textiles">Handloom, Textiles & Souvenirs</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Proposed Kit Products (comma separated)</label>
                <input
                  type="text"
                  value={productsSupplied}
                  onChange={(e) => setProductsSupplied(e.target.value)}
                  placeholder="e.g. Herbal Wipes, 50ml Sanitizer, Energy Bar"
                  className="w-full p-2.5 text-xs border border-stone-300 rounded-xl bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Brief Proposal & Goals</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your brand's presence in Tamil Nadu and distribution vision..."
                  className="w-full p-2.5 text-xs border border-stone-300 rounded-xl bg-white"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Brand Sponsorship Application</span>
              </button>
            </form>
          </div>

          {/* Active Partners List */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-stone-900">Current Verified Brand Partners</h3>
            <div className="space-y-3">
              {sponsors.map(sp => (
                <div
                  key={sp.id}
                  className="p-5 bg-white rounded-3xl border border-stone-200 shadow-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-stone-900">{sp.brandName}</span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {sp.category}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">{sp.description}</p>
                  <div className="text-[11px] text-stone-500 pt-1">
                    Products in Kit: <span className="font-semibold text-stone-800">{sp.productsInKit.join(', ')}</span>
                  </div>
                  <div className="text-[10px] text-stone-400">
                    Kits Distributed so far: <strong className="text-stone-700">{sp.kitsDistributed.toLocaleString()} kits</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
