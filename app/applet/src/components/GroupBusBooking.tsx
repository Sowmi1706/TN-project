import React, { useState } from 'react';
import { 
  Bus, 
  Users, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Phone, 
  Sparkles, 
  Check, 
  Send, 
  ArrowRight,
  Clock
} from 'lucide-react';
import { BusAgent, BusQuotationRequest, User } from '../types';
import { INITIAL_BUS_AGENTS } from '../data/mockData';
import { StorageService } from '../services/storageService';

interface GroupBusBookingProps {
  user: User;
}

export const GroupBusBooking: React.FC<GroupBusBookingProps> = ({ user }) => {
  const [agents, setAgents] = useState<BusAgent[]>(INITIAL_BUS_AGENTS);
  const [tripType, setTripType] = useState('Temple Pilgrimage Tour (Arupadai Veedu)');
  const [route, setRoute] = useState('Chennai -> Trichy -> Madurai -> Rameswaram -> Chennai');
  const [startDate, setStartDate] = useState('2026-11-10');
  const [returnDate, setReturnDate] = useState('2026-11-14');
  const [passengerCount, setPassengerCount] = useState(30);
  const [preferredBusType, setPreferredBusType] = useState('35-Seater Air Suspension Tourist Coach');
  const [purpose, setPurpose] = useState('Family Devotional Gathering');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const request: BusQuotationRequest = {
      id: `bus-req-${Date.now()}`,
      userId: user.id,
      customerName: user.name,
      phone: user.phone || '+91 98401 23456',
      tripType,
      route,
      startDate,
      returnDate,
      passengerCount,
      preferredBusType,
      purpose,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    StorageService.saveBusQuotation(request);
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 via-stone-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
            <Bus className="w-3.5 h-3.5 text-amber-400" />
            <span>Dedicated Group Bus & Fleet Booking Service</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Chartered Buses & Coaches for Group Journeys
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 max-w-2xl leading-relaxed">
            Connect with verified Tamil Nadu tourist bus operators for temple circuits, festival visits, college industrial visits, wedding groups, and research expeditions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Fleet & Operators Showcase */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="font-bold text-stone-900 text-base">Verified Tamil Nadu Bus Operators</h3>

          <div className="space-y-4">
            {agents.map(agent => (
              <div
                key={agent.id}
                className="p-6 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-base text-stone-900">{agent.agencyName}</span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Verified Operator</span>
                      </span>
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5">
                      Managing Operator: {agent.operatorName} • Hubs: {agent.district}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-amber-500 font-extrabold text-xs">★ {agent.rating}</span>
                    <a
                      href={`tel:${agent.phone.replace(/\s+/g, '')}`}
                      className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>{agent.phone}</span>
                    </a>
                  </div>
                </div>

                {/* Fleet table */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {agent.fleetTypes.map(fleet => (
                    <div key={fleet.type} className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                      <div className="font-bold text-stone-800 truncate">{fleet.type}</div>
                      <div className="text-[10px] text-stone-500">{fleet.seats} Seater</div>
                      <div className="text-xs font-extrabold text-amber-800 mt-1">₹{fleet.ratePerKm}/km</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {agent.specialties.map(spec => (
                    <span key={spec} className="text-[10px] font-semibold bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-200">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Instant Quotation Request Form */}
        <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-md space-y-4">
          <div className="space-y-1">
            <h3 className="font-bold text-base font-display text-stone-900">
              Request Fast Bus Quotation
            </h3>
            <p className="text-xs text-stone-500">
              Receive competitive quotes directly from verified operators within 30 minutes.
            </p>
          </div>

          {submitted ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-950">
                <Check className="w-5 h-5 text-emerald-600" />
                <span>Quotation Request Submitted!</span>
              </div>
              <p>
                Our verified Tamil Nadu bus coordinators have received your route ({route}) for {passengerCount} passengers. You will receive quotes via phone/SMS shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-bold text-emerald-800 underline"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Trip Type / Circuit</label>
                <select
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                  className="w-full p-2 text-xs border border-stone-300 rounded-xl bg-white"
                >
                  <option value="Temple Pilgrimage Tour (Arupadai Veedu)">Temple Pilgrimage Tour (Arupadai Veedu)</option>
                  <option value="Navagraha Temple Circuit">Navagraha Temple Circuit</option>
                  <option value="College / School Educational Tour">College / School Educational Tour</option>
                  <option value="Friends Western Ghats Adventure">Friends Western Ghats Adventure</option>
                  <option value="Family Wedding / Function Group">Family Wedding / Function Group</option>
                  <option value="Historical Archaeology Research Team">Historical Archaeology Research Team</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Route / Destinations</label>
                <input
                  type="text"
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                  className="w-full p-2 text-xs border border-stone-300 rounded-xl bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2 text-xs border border-stone-300 rounded-xl bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Passengers</label>
                  <input
                    type="number"
                    min={6}
                    max={100}
                    value={passengerCount}
                    onChange={(e) => setPassengerCount(parseInt(e.target.value) || 10)}
                    className="w-full p-2 text-xs border border-stone-300 rounded-xl bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Preferred Coach Type</label>
                <select
                  value={preferredBusType}
                  onChange={(e) => setPreferredBusType(e.target.value)}
                  className="w-full p-2 text-xs border border-stone-300 rounded-xl bg-white"
                >
                  <option value="12-Seater AC Tempo Traveller">12-Seater AC Tempo Traveller</option>
                  <option value="20-Seater Deluxe Mini Bus">20-Seater Deluxe Mini Bus</option>
                  <option value="35-Seater Air Suspension Tourist Coach">35-Seater Air Suspension Tourist Coach</option>
                  <option value="45-Seater Multi-Axle Volvo AC Coach">45-Seater Multi-Axle Volvo AC Coach</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Request Bus Agent Quotations</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
