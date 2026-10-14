import React from 'react';
import { Tag, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Language, User } from '../types';
import { getTranslation } from '../utils/translations';

interface FirstBookingBannerProps {
  currentLang: Language;
  user: User;
  onClaimOffer: () => void;
}

export const FirstBookingBanner: React.FC<FirstBookingBannerProps> = ({
  currentLang,
  user,
  onClaimOffer
}) => {
  const t = (key: string, fallback?: string) => getTranslation(currentLang, key, fallback);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white rounded-3xl shadow-xl shadow-amber-900/15 border border-amber-400/40 p-6 sm:p-8">
      {/* Decorative background circles */}
      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
      <div className="absolute left-1/3 -top-10 w-32 h-32 bg-amber-400/20 rounded-full blur-lg pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-amber-100 text-xs font-extrabold uppercase tracking-wider border border-white/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>{t('welcomeBannerTitle', 'Welcome to TN Stories! 🎉')}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
            {t('welcomeBannerSub', 'Your first adventure comes with a special offer!')}
          </h3>

          <p className="text-sm text-amber-100 font-medium leading-relaxed">
            Book your first eligible trip across Tamil Nadu and enjoy an instant <span className="underline font-bold text-white">10% OFF</span> on your booking total. Verified at checkout with free sponsored travel kits!
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-amber-200">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>Max Discount: ₹1,500</span>
            </span>
            <span>•</span>
            <span>Min. Booking: ₹1,500</span>
            <span>•</span>
            <span>Auto-Applied on First Confirmation</span>
          </div>
        </div>

        <div className="shrink-0 w-full sm:w-auto">
          <button
            onClick={onClaimOffer}
            className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-stone-100 text-amber-900 hover:text-amber-950 font-extrabold text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Tag className="w-4 h-4 text-amber-600" />
            <span>{t('claimOffer', 'Claim 10% OFF – Book Now')}</span>
            <ArrowRight className="w-4 h-4 text-amber-600" />
          </button>
        </div>
      </div>
    </div>
  );
};
