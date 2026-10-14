import React, { useState } from 'react';
import { Compass, Check, ArrowRight, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface LanguageModalProps {
  currentLang: Language;
  onSelectLanguage: (lang: Language) => void;
  onContinue: () => void;
  isOpen: boolean;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({
  currentLang,
  onSelectLanguage,
  onContinue,
  isOpen
}) => {
  const [selected, setSelected] = useState<Language>(currentLang);

  if (!isOpen) return null;

  const languages: { code: Language; name: string; nativeName: string; greeting: string; scriptDesc: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English', greeting: 'Welcome to Tamil Nadu', scriptDesc: 'Explore historic temples & hill stations' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', greeting: 'வணக்கம்! தமிழ்நாட்டிற்கு நல்வரவு', scriptDesc: 'எழுத்துக்களில் வடிக்க முடியாத அழகிய கதைகள்' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', greeting: 'नमस्ते! तमिलनाडु में आपका स्वागत है', scriptDesc: 'भव्य मंदिर और खूबसूरत हिल स्टेशन' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', greeting: 'നമസ്കാരം! തമിഴ്‌നാട്ടിലേക്ക് സ്വാഗതം', scriptDesc: 'ക്ഷേത്രനഗരങ്ങളും പച്ചപ്പണിഞ്ഞ മലനിരകളും' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', greeting: 'నమస్కారం! తమిళనాడుకు స్వాగతం', scriptDesc: 'అద్భుతమైన ఆలయాలు మరియు పర్యాటక ప్రాంతాలు' }
  ];

  const handleSelect = (lang: Language) => {
    setSelected(lang);
    onSelectLanguage(lang);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-300">
      {/* Background imagery container */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-200/50">
        {/* Banner with Tamil Nadu aesthetic */}
        <div className="relative h-44 bg-gradient-to-br from-amber-700 via-amber-800 to-stone-900 px-6 py-8 flex flex-col justify-end text-white overflow-hidden">
          {/* Subtle background motif */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fde68a_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-amber-500/20 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/30 backdrop-blur-xs border border-amber-300/30 text-amber-200 text-xs font-semibold mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>TN Stories AI • Tamil Nadu Smart Tourism</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Welcome to TN Stories
            </h1>
            <p className="text-amber-200/90 text-sm font-medium mt-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Every place has a STORY</span>
            </p>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8">
          <div className="text-stone-800 font-bold text-base mb-1">
            Select Your Preferred Language
          </div>
          <p className="text-xs text-stone-500 mb-6">
            Choose how you would like to experience Tamil Nadu’s destinations, itineraries, bus bookings, and voice-assisted stories.
          </p>

          {/* Language Options Grid */}
          <div className="space-y-2.5 mb-8">
            {languages.map((lang) => {
              const isSelected = selected === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'border-amber-600 bg-amber-50/80 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/60'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                      isSelected ? 'border-amber-600 bg-amber-600 text-white' : 'border-stone-300 bg-white'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-stone-900">{lang.name}</span>
                        <span className="text-xs font-semibold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-md">
                          {lang.nativeName}
                        </span>
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5">{lang.scriptDesc}</div>
                    </div>
                  </div>
                  <span className="text-xs text-stone-400 italic hidden sm:inline">
                    {lang.greeting}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action button */}
          <button
            type="button"
            onClick={onContinue}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-bold text-sm shadow-lg shadow-amber-900/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            <span>Continue to TN Stories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
