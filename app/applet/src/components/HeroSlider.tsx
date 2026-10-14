import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Compass, Calendar, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';

interface HeroSliderProps {
  currentLang: Language;
  onExploreDestinations: () => void;
  onBookTrip: () => void;
}

interface Slide {
  id: string;
  name: string;
  district: string;
  tagline: string;
  image: string;
  fallbackImage: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 'madurai',
    name: 'Madurai Meenakshi Amman Temple',
    district: 'Madurai',
    tagline: 'Timeless architectural wonder and spiritual beacon of Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=1600&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1606298855672-3efb63017be8?auto=format&fit=crop&w=1600&q=85'
  },
  {
    id: 'ooty',
    name: 'Ooty (Nilgiri Tea Hills)',
    district: 'Nilgiris',
    tagline: 'Queen of Hill Stations draped in emerald mist and rolling plantations',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1600&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=85'
  },
  {
    id: 'mahabalipuram',
    name: 'Mahabalipuram Shore Temple',
    district: 'Chengalpattu',
    tagline: 'UNESCO 7th-century rock sanctuaries overlooking the Bay of Bengal',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1600&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85'
  },
  {
    id: 'kanyakumari',
    name: 'Kanyakumari & Vivekananda Rock',
    district: 'Kanyakumari',
    tagline: 'The dramatic tri-sea confluence and sacred southernmost edge of India',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=85'
  },
  {
    id: 'kodaikanal',
    name: 'Kodaikanal Star Lake & Pine Valleys',
    district: 'Dindigul',
    tagline: 'Alpine tranquility, mystical Pillar Rocks, and cool mountain breezes',
    image: 'https://images.unsplash.com/photo-1609137144822-263e80629ec5?auto=format&fit=crop&w=1600&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1600&q=85'
  }
];

export const HeroSlider: React.FC<HeroSliderProps> = ({
  currentLang,
  onExploreDestinations,
  onBookTrip
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgErrorMap, setImgErrorMap] = useState<Record<number, boolean>>({});

  const t = (key: string, fallback?: string) => getTranslation(currentLang, key, fallback);

  // Auto transition every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <div className="relative w-full h-[520px] sm:h-[600px] lg:h-[650px] overflow-hidden bg-stone-900 select-none">
      {/* Background Slides with cross-fade */}
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === currentIndex;
        const hasError = imgErrorMap[idx];
        const src = hasError ? slide.fallbackImage : slide.image;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105'
            }`}
            style={{ transitionProperty: 'opacity, transform' }}
          >
            <img
              src={src}
              alt={slide.name}
              onError={() => {
                setImgErrorMap((prev) => ({ ...prev, [idx]: true }));
              }}
              className="w-full h-full object-cover object-center transform transition-transform duration-10000 ease-out"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
            {/* Subtle multi-layer gradient overlay for optimum text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/45 to-stone-950/20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/40 to-transparent"></div>
          </div>
        );
      })}

      {/* Hero Foreground Content */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 sm:pb-20">
        <div className="max-w-3xl space-y-4">
          {/* Brand & Slide badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-300/30 text-amber-300 text-xs font-semibold animate-in fade-in slide-in-from-left duration-500">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>TN Stories AI • Tamil Nadu Tourism</span>
            <span className="text-amber-400/60">•</span>
            <span className="flex items-center gap-1 text-white font-medium">
              <MapPin className="w-3 h-3 text-amber-400" />
              {currentSlide.name} ({currentSlide.district})
            </span>
          </div>

          {/* Main Headline & Subtitle */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-tight">
            {t('exploreTamilNadu', 'Discover the Beauty of Tamil Nadu')}
          </h1>

          <p className="text-sm sm:text-lg text-stone-200/90 font-medium leading-relaxed max-w-2xl">
            {t('heroSubtitle', 'Your journey, your story. Explore amazing places and create unforgettable memories.')}
          </p>

          {/* Slide Description Subtext */}
          <div className="text-xs sm:text-sm text-amber-300/90 italic flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{currentSlide.tagline}</span>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={onExploreDestinations}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-bold text-sm rounded-xl shadow-lg shadow-amber-900/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>{t('exploreDestinations', 'Explore Destinations')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onBookTrip}
              className="px-6 py-3.5 bg-white/90 hover:bg-white text-stone-900 hover:text-amber-800 font-bold text-sm rounded-xl shadow-md backdrop-blur-xs flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer border border-white/40"
            >
              <Calendar className="w-4 h-4 text-amber-700" />
              <span>{t('bookYourTrip', 'Book Your Trip')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Manual Slide Controls */}
      <div className="absolute z-20 right-4 sm:right-8 bottom-6 sm:bottom-10 flex items-center gap-2">
        <button
          onClick={handlePrev}
          aria-label="Previous destination"
          className="w-10 h-10 rounded-full bg-stone-900/60 hover:bg-stone-900/90 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs hover:scale-105"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next destination"
          className="w-10 h-10 rounded-full bg-stone-900/60 hover:bg-stone-900/90 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs hover:scale-105"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slider Pagination Dots */}
      <div className="absolute z-20 left-1/2 transform -translate-x-1/2 bottom-4 flex items-center gap-2">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              idx === currentIndex ? 'w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
