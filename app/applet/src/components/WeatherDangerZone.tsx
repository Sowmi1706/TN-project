import React, { useState } from 'react';
import { 
  CloudRain, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  Wind, 
  Thermometer, 
  Droplets, 
  Compass, 
  MapPin, 
  ArrowRight, 
  Info,
  Calendar,
  CheckCircle,
  ExternalLink,
  Clock
} from 'lucide-react';
import { WeatherInfo, Destination, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface WeatherDangerZoneProps {
  currentLang: Language;
  weatherAlerts: WeatherInfo[];
  destinations: Destination[];
  onSelectDestination: (destId: string) => void;
  onBookSafeAlternative: (destId: string) => void;
}

export const WeatherDangerZone: React.FC<WeatherDangerZoneProps> = ({
  currentLang,
  weatherAlerts,
  destinations,
  onSelectDestination,
  onBookSafeAlternative
}) => {
  const [selectedAlert, setSelectedAlert] = useState<WeatherInfo | null>(
    weatherAlerts.find(a => a.severity === 'red') || weatherAlerts[0]
  );
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const t = (key: string, fallback?: string) => getTranslation(currentLang, key, fallback);

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'red':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white font-extrabold text-xs shadow-md shadow-red-900/30 animate-pulse">
            <ShieldAlert className="w-4 h-4" />
            <span>🔴 RED ALERT – DANGER ZONE</span>
          </span>
        );
      case 'orange':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500 text-white font-bold text-xs">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>🟠 ORANGE – High Weather Risk</span>
          </span>
        );
      case 'yellow':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-amber-950 font-bold text-xs">
            <Info className="w-3.5 h-3.5" />
            <span>🟡 YELLOW – Weather Caution</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>🟢 GREEN – Safe Weather Conditions</span>
          </span>
        );
    }
  };

  const filteredAlerts = weatherAlerts.filter(a => {
    if (filterSeverity === 'all') return true;
    return a.severity === filterSeverity;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-800 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-44 h-44 bg-red-600/10 rounded-full blur-2xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-bold border border-red-500/30 mb-2">
              <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
              <span>Tamil Nadu Disaster & Climate Safety Monitor</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              Weather & Climate Safety Monitoring
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
              Real-time meteorological warnings, interactive danger zones, and automatic booking restrictions to protect travelers during severe weather conditions.
            </p>
          </div>

          {/* Quick stats pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="bg-red-950/70 border border-red-800/80 px-3 py-2 rounded-xl text-red-200">
              <div className="text-[10px] uppercase font-bold text-red-400">Active Red Alerts</div>
              <div className="text-base font-extrabold text-white">
                {weatherAlerts.filter(a => a.severity === 'red').length} District(s)
              </div>
            </div>
            <div className="bg-emerald-950/70 border border-emerald-800/80 px-3 py-2 rounded-xl text-emerald-200">
              <div className="text-[10px] uppercase font-bold text-emerald-400">Safe Tourism Hubs</div>
              <div className="text-base font-extrabold text-white">
                {weatherAlerts.filter(a => a.severity === 'green').length} District(s)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Severe Red Alert Warning Notice if any active */}
      {weatherAlerts.some(a => a.severity === 'red') && (
        <div className="p-4 sm:p-5 rounded-2xl bg-red-50 border-2 border-red-500 shadow-lg text-red-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-red-600 text-white shrink-0 shadow-md">
              <ShieldAlert className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="font-extrabold text-sm sm:text-base text-red-900 flex items-center gap-2">
                <span>DANGER ZONE – RED ALERT RESTRICTIONS ACTIVE</span>
              </div>
              <p className="text-xs text-red-800 mt-0.5">
                Valparai Ghats & surrounding Anaimalai passes are currently closed for bookings due to landslide risks. If you hold existing bookings, our team offers free instant rescheduling or full refunds.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="text-[11px] font-bold text-red-700 bg-red-100 px-3 py-1.5 rounded-xl border border-red-200">
              Booking Suspended
            </span>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-stone-500 mr-2">Filter by Warning Level:</span>
        {[
          { id: 'all', label: 'All Districts' },
          { id: 'red', label: '🔴 Red Alert (Danger Zones)' },
          { id: 'yellow', label: '🟡 Yellow Caution' },
          { id: 'green', label: '🟢 Safe Destinations' }
        ].map(btn => (
          <button
            key={btn.id}
            onClick={() => setFilterSeverity(btn.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterSeverity === btn.id
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Interactive Map Visualizer & District List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: District Weather Cards */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="font-bold text-stone-900 text-sm flex items-center justify-between">
            <span>Monitored Tourist Districts</span>
            <span className="text-xs text-stone-500 font-normal">Click to inspect</span>
          </h3>

          <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
            {filteredAlerts.map(alert => {
              const isSelected = selectedAlert?.district === alert.district;
              const isRed = alert.severity === 'red';

              return (
                <div
                  key={alert.district}
                  onClick={() => setSelectedAlert(alert)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                    isSelected
                      ? isRed 
                        ? 'border-red-600 bg-red-50/70 shadow-md ring-2 ring-red-400' 
                        : 'border-amber-600 bg-amber-50/60 shadow-md'
                      : isRed
                      ? 'border-red-300 bg-red-50/30 hover:border-red-500'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-sm text-stone-900">{alert.district}</span>
                    {getSeverityBadge(alert.severity)}
                  </div>

                  <div className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                    <CloudRain className="w-3.5 h-3.5 text-stone-500" />
                    <span>{alert.condition}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-stone-200/60 text-[11px] text-stone-600">
                    <div>
                      <span className="text-stone-400 block text-[9px] uppercase font-bold">Temp</span>
                      <span className="font-bold text-stone-800">{alert.temperature}°C</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[9px] uppercase font-bold">Rainfall</span>
                      <span className="font-bold text-stone-800">{alert.rainfall}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[9px] uppercase font-bold">Wind</span>
                      <span className="font-bold text-stone-800">{alert.windSpeed}</span>
                    </div>
                  </div>

                  {alert.bookingRestricted && (
                    <div className="mt-2.5 text-[10px] font-extrabold text-red-700 bg-red-100 px-2 py-1 rounded-md text-center">
                      ⛔ BOOKING CURRENTLY RESTRICTED
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Danger Zone Inspector & Interactive Map View */}
        <div className="lg:col-span-2 space-y-6">
          {selectedAlert && (
            <div className={`p-6 rounded-3xl border-2 bg-white shadow-xl ${
              selectedAlert.severity === 'red' ? 'border-red-500' : 'border-stone-200'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    District Safety Dossier
                  </div>
                  <h2 className="text-xl font-extrabold text-stone-900 font-display">
                    {selectedAlert.district}
                  </h2>
                </div>
                {getSeverityBadge(selectedAlert.severity)}
              </div>

              {/* Headline */}
              {selectedAlert.alertHeadline && (
                <div className={`my-4 p-3.5 rounded-2xl text-xs font-semibold flex items-start gap-2.5 ${
                  selectedAlert.severity === 'red'
                    ? 'bg-red-100 text-red-950 border border-red-300'
                    : selectedAlert.severity === 'yellow'
                    ? 'bg-amber-100 text-amber-950 border border-amber-300'
                    : 'bg-emerald-50 text-emerald-950 border border-emerald-200'
                }`}>
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{selectedAlert.alertHeadline}</span>
                </div>
              )}

              {/* Climate Stats Card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-center">
                  <Thermometer className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                  <div className="text-[10px] font-bold text-stone-500 uppercase">Temperature</div>
                  <div className="text-lg font-extrabold text-stone-900">{selectedAlert.temperature}°C</div>
                </div>

                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-center">
                  <Droplets className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-[10px] font-bold text-stone-500 uppercase">Rainfall Accum.</div>
                  <div className="text-lg font-extrabold text-stone-900">{selectedAlert.rainfall}</div>
                </div>

                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-center">
                  <Wind className="w-5 h-5 text-teal-600 mx-auto mb-1" />
                  <div className="text-[10px] font-bold text-stone-500 uppercase">Wind Velocity</div>
                  <div className="text-lg font-extrabold text-stone-900">{selectedAlert.windSpeed}</div>
                </div>

                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-center">
                  <Clock className="w-5 h-5 text-stone-600 mx-auto mb-1" />
                  <div className="text-[10px] font-bold text-stone-500 uppercase">Last Verified</div>
                  <div className="text-xs font-bold text-stone-800 mt-1">{selectedAlert.lastUpdated}</div>
                </div>
              </div>

              {/* Booking Restriction Policy & Alternative Safe Places */}
              {selectedAlert.bookingRestricted ? (
                <div className="mt-5 p-4 rounded-2xl bg-red-950 text-white space-y-3">
                  <div className="flex items-center gap-2 text-red-300 font-extrabold text-xs">
                    <ShieldAlert className="w-4 h-4 text-red-400" />
                    <span>SAFETY RESTRICTION: NEW BOOKINGS SUSPENDED</span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Under the Tamil Nadu Smart Tourism Safety Charter, trip bookings to {selectedAlert.district} are blocked until meteorological agencies withdraw the Red Alert.
                  </p>

                  {/* Alternative Safe Places */}
                  {selectedAlert.alternativeSafePlaces && selectedAlert.alternativeSafePlaces.length > 0 && (
                    <div className="pt-2 border-t border-red-900/80">
                      <div className="text-xs font-bold text-amber-300 mb-2">
                        Recommended Safe Alternatives in Tamil Nadu:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedAlert.alternativeSafePlaces.map(safePlace => (
                          <button
                            key={safePlace}
                            onClick={() => onBookSafeAlternative(safePlace)}
                            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 border border-white/20 transition-all cursor-pointer"
                          >
                            <Compass className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{safePlace}</span>
                            <ArrowRight className="w-3 h-3 text-amber-300" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Conditions are optimal for travel and sightseeing in this destination.</span>
                  </div>
                  <button
                    onClick={() => {
                      const matched = destinations.find(d => d.district.toLowerCase().includes(selectedAlert.district.toLowerCase().split('/')[0].trim()));
                      if (matched) onSelectDestination(matched.id);
                    }}
                    className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Explore District
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Interactive Danger Zone Stylized Map View */}
          <div className="p-6 bg-stone-900 text-white rounded-3xl border border-stone-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base font-display text-white">
                  Live Tamil Nadu Tourism Danger Zone Map
                </h3>
                <p className="text-xs text-stone-400">
                  Interactive representation of active alerts across Tamil Nadu
                </p>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-stone-400">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Red Danger</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Caution</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Safe</span>
              </div>
            </div>

            {/* Stylized Visual Map Grid of Tamil Nadu Districts */}
            <div className="relative h-64 bg-stone-950 rounded-2xl border border-stone-800 p-4 flex items-center justify-center overflow-hidden">
              {/* Background Tamil Nadu outline representation */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#475569_1px,transparent_1px)] [background-size:20px_20px]"></div>

              <div className="relative w-full max-w-lg h-full grid grid-cols-3 sm:grid-cols-4 gap-2 items-center justify-center">
                {weatherAlerts.map(alert => {
                  const isRed = alert.severity === 'red';
                  const isYellow = alert.severity === 'yellow';

                  return (
                    <button
                      key={alert.district}
                      onClick={() => setSelectedAlert(alert)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer relative ${
                        isRed
                          ? 'bg-red-950/80 border-red-500 text-red-200 ring-2 ring-red-500 animate-pulse'
                          : isYellow
                          ? 'bg-amber-950/40 border-amber-500 text-amber-200'
                          : 'bg-stone-900 border-stone-700 text-stone-300 hover:border-emerald-500'
                      }`}
                    >
                      <div className="text-[10px] font-bold truncate">{alert.district.split('/')[0]}</div>
                      <div className="text-[9px] text-stone-400">{alert.temperature}°C</div>
                      {isRed && (
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
