import React, { useState, useEffect } from 'react';
import { 
  WifiOff, 
  Wifi, 
  Download, 
  Trash2, 
  PhoneCall, 
  MapPin, 
  Calendar, 
  ShieldAlert, 
  CheckCircle2, 
  QrCode, 
  Database, 
  HardDrive, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { Booking, Destination, WeatherInfo } from '../types';
import { StorageService } from '../services/storageService';

interface OfflineTripModeProps {
  bookings: Booking[];
  destinations: Destination[];
  weatherAlerts: WeatherInfo[];
  isOnline: boolean;
  onToggleSimulatedOffline: () => void;
}

export const OfflineTripMode: React.FC<OfflineTripModeProps> = ({
  bookings,
  destinations,
  weatherAlerts,
  isOnline,
  onToggleSimulatedOffline
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [storageUsed, setStorageUsed] = useState('142 KB');
  const [offlineData, setOfflineData] = useState<any>(null);

  useEffect(() => {
    loadOfflineState();
  }, []);

  const loadOfflineState = () => {
    const cached = StorageService.getOfflineCache();
    setOfflineData(cached);
    setStorageUsed(StorageService.calculateStorageUsed());
  };

  const handleDownloadTrip = () => {
    setDownloading(true);
    setDownloadProgress(10);

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          // Complete download
          const cachePayload = {
            downloadedAt: new Date().toISOString(),
            destinations: destinations.slice(0, 10),
            bookings: bookings,
            weatherSnapshot: weatherAlerts,
            emergencySOS: [
              { title: "Tamil Nadu Police Helpline", number: "100 / 112", desc: "24/7 State Emergency Dispatch" },
              { title: "Ambulance & Trauma Medical Care", number: "108", desc: "Free Rapid Medical Emergency Service" },
              { title: "Women Tourist Helpline", number: "1091", desc: "Dedicated Women Protection Cell" },
              { title: "Tamil Nadu Tourist Helpline (TTDC)", number: "1363", desc: "Government Tourist Advisory & Assistance" },
              { title: "TNSDMA Disaster Control Room", number: "1070", desc: "State Disaster Management Authority" }
            ],
            offlineMapPins: [
              { name: "Madurai Meenakshi Temple", lat: 9.9195, lng: 78.1193, category: "Temple" },
              { name: "Ooty Botanical Garden", lat: 11.4102, lng: 76.6950, category: "Hill Station" },
              { name: "Mahabalipuram Shore Temple", lat: 12.6269, lng: 80.1927, category: "Heritage" },
              { name: "Kanyakumari Pier & Sunset Ghat", lat: 8.0883, lng: 77.5385, category: "Coast" }
            ]
          };
          StorageService.saveOfflineCache(cachePayload);
          setOfflineData(cachePayload);
          setStorageUsed(StorageService.calculateStorageUsed());
          setDownloading(false);
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  const handleClearOffline = () => {
    if (confirm("Are you sure you want to delete stored offline trip files and maps?")) {
      StorageService.clearOfflineCache();
      setOfflineData(null);
      setStorageUsed(StorageService.calculateStorageUsed());
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 mb-2">
            <WifiOff className="w-3.5 h-3.5 text-amber-400" />
            <span>TN Stories Smart Offline Trip Mode</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Travel Without Internet Worries
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
            Download your itinerary, booked hotel vouchers, bus tickets, QR boarding passes, offline maps, and emergency SOS contacts before heading to remote Western Ghats hills or deep beaches.
          </p>
        </div>

        {/* Network Toggle / Status */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
          <div className="px-3.5 py-2 rounded-2xl bg-stone-950/80 border border-stone-700 flex items-center gap-2 text-xs">
            {isOnline ? (
              <>
                <Wifi className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white">Online Mode</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="font-bold text-amber-300">Offline Simulation Active</span>
              </>
            )}
          </div>

          <button
            onClick={onToggleSimulatedOffline}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold rounded-xl border border-stone-600 transition-colors cursor-pointer"
          >
            {isOnline ? "Simulate Offline Mode" : "Switch Back to Online"}
          </button>
        </div>
      </div>

      {/* Storage Management & Download Action Panel */}
      <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-wider">
            <HardDrive className="w-4 h-4 text-stone-600" />
            <span>Local Offline Storage Footprint</span>
          </div>
          <div className="text-2xl font-extrabold text-stone-900">{storageUsed}</div>
          <p className="text-xs text-stone-500">
            {offlineData
              ? `Downloaded package active (Last synced: ${new Date(offlineData.downloadedAt).toLocaleTimeString()})`
              : "No offline package saved yet. Click Download to cache your trips."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {downloading ? (
            <div className="w-48 space-y-1.5">
              <div className="flex justify-between text-[11px] font-bold text-stone-700">
                <span>Saving offline data...</span>
                <span>{downloadProgress}%</span>
              </div>
              <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-600 h-full transition-all duration-300"
                  style={{ width: `${downloadProgress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <button
              onClick={handleDownloadTrip}
              className="px-5 py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-md shadow-amber-900/20 cursor-pointer transition-all hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>{offlineData ? "Update Downloaded Data" : "Download Trip for Offline Use"}</span>
            </button>
          )}

          {offlineData && (
            <button
              onClick={handleClearOffline}
              className="p-3 text-stone-400 hover:text-red-600 rounded-2xl border border-stone-200 hover:bg-red-50 transition-colors cursor-pointer"
              title="Delete stored offline files"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Grid: Offline Tickets / Itinerary & Emergency SOS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Offline Bookings & QR Passes */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-700" />
            <span>Offline Tickets & QR Passes (Works Without Internet)</span>
          </h3>

          {bookings.length === 0 ? (
            <div className="p-8 bg-white rounded-3xl border border-stone-200 text-center space-y-2">
              <QrCode className="w-10 h-10 text-stone-300 mx-auto" />
              <div className="text-sm font-bold text-stone-800">No Confirmed Bookings Yet</div>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Once you book a trip or hotel, your boarding QR passes and vouchers appear here automatically for offline display.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map(b => (
                <div
                  key={b.id}
                  className="p-5 bg-white rounded-3xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">
                        {b.bookingRef}
                      </span>
                      <span className="text-xs font-bold text-stone-900">{b.destinationName}</span>
                    </div>

                    <div className="text-xs text-stone-500 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>{b.startDate} to {b.returnDate} • {b.travellers} Passenger(s)</span>
                    </div>

                    <div className="text-[11px] text-stone-600 capitalize">
                      Service: <strong className="text-stone-800">{b.bookingServiceType.replace(/_/g, ' ')}</strong>
                      {b.hotelDetails && ` • ${b.hotelDetails.hotelName}`}
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-stone-100 p-1.5 rounded-xl border border-stone-200 flex items-center justify-center">
                      <QrCode className="w-12 h-12 text-stone-800" />
                    </div>
                    <div className="text-[10px] text-stone-400">
                      Offline Pass<br />
                      <span className="text-emerald-700 font-bold">Verified</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right 1 Col: Emergency SOS Speed Dial */}
        <div className="space-y-4">
          <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-600" />
            <span>Emergency SOS Speed Dial</span>
          </h3>

          <div className="p-5 bg-red-50/70 border-2 border-red-200 rounded-3xl space-y-3">
            <div className="text-xs text-red-950 font-medium">
              Available 24/7 even in cellular edge networks across Tamil Nadu:
            </div>

            {[
              { name: "TN Police Emergency", number: "112", desc: "Immediate police response" },
              { name: "Medical Ambulance", number: "108", desc: "Paramedics & emergency transport" },
              { name: "Women Tourist Helpline", number: "1091", desc: "Safe travel assistance" },
              { name: "Tourist Information Helpline", number: "1363", desc: "TTDC advisory desk" },
              { name: "Disaster Control Room", number: "1070", desc: "Landslide/flood relief" }
            ].map(sos => (
              <div
                key={sos.name}
                className="p-3 bg-white rounded-2xl border border-red-200 flex items-center justify-between shadow-2xs"
              >
                <div>
                  <div className="font-bold text-xs text-stone-900">{sos.name}</div>
                  <div className="text-[10px] text-stone-500">{sos.desc}</div>
                </div>
                <a
                  href={`tel:${sos.number.replace(/\s+/g, '')}`}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{sos.number}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
