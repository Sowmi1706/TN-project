import React, { useState } from 'react';
import { 
  PiggyBank, 
  Calendar, 
  Sparkles, 
  Compass, 
  Check, 
  TrendingUp, 
  Bus, 
  Car, 
  Train, 
  ArrowRight,
  Info
} from 'lucide-react';
import { Destination } from '../types';

interface MonthlySavingsPlannerProps {
  destinations: Destination[];
  onSelectDestination: (destId: string) => void;
}

export const MonthlySavingsPlanner: React.FC<MonthlySavingsPlannerProps> = ({
  destinations,
  onSelectDestination
}) => {
  const [monthlyAmount, setMonthlyAmount] = useState<number>(2000);
  const [monthsCount, setMonthsCount] = useState<number>(12);
  const [travellers, setTravellers] = useState<number>(2);
  const [targetMonth, setTargetMonth] = useState('October 2027');
  const [savedGoalCreated, setSavedGoalCreated] = useState(false);

  // Calculations
  const totalAccumulated = monthlyAmount * monthsCount;
  const perPersonBudget = Math.round(totalAccumulated / travellers);

  // Filter destinations that fit inside total accumulated savings
  const affordableDestinations = destinations.filter(d => (d.estimatedCost * 2 * travellers) <= totalAccumulated);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
            <PiggyBank className="w-3.5 h-3.5 text-amber-400" />
            <span>Monthly Savings Trip Planner (Plan Now, Travel Later)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Save Small Every Month, Travel Big in Tamil Nadu
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 max-w-2xl leading-relaxed">
            Set aside a comfortable monthly amount (e.g. ₹2,000/month) and watch your dream journey to Ooty, Madurai, or Rameswaram materialize with structured schedules and zero financial stress.
          </p>
        </div>
      </div>

      {/* Simulator Inputs & Progress Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Controls */}
        <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-md space-y-5">
          <h3 className="font-bold text-base text-stone-900">Configure Savings Parameters</h3>

          <div>
            <div className="flex justify-between items-center text-xs font-bold text-stone-700 mb-1">
              <span>Monthly Contribution</span>
              <span className="text-amber-800 text-sm font-extrabold">₹{monthlyAmount.toLocaleString('en-IN')}/mo</span>
            </div>
            <input
              type="range"
              min={1000}
              max={15000}
              step={500}
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(parseInt(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-0.5">
              <span>₹1,000</span>
              <span>₹7,500</span>
              <span>₹15,000</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-bold text-stone-700 mb-1">
              <span>Saving Duration</span>
              <span className="text-amber-800 text-sm font-extrabold">{monthsCount} Months</span>
            </div>
            <input
              type="range"
              min={3}
              max={24}
              step={1}
              value={monthsCount}
              onChange={(e) => setMonthsCount(parseInt(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-0.5">
              <span>3 Mos</span>
              <span>12 Mos (1 Yr)</span>
              <span>24 Mos</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Number of Travellers</label>
              <input
                type="number"
                min={1}
                max={20}
                value={travellers}
                onChange={(e) => setTravellers(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full p-2 text-xs border border-stone-300 rounded-xl bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Target Trip Month</label>
              <input
                type="text"
                value={targetMonth}
                onChange={(e) => setTargetMonth(e.target.value)}
                placeholder="e.g. October 2027"
                className="w-full p-2 text-xs border border-stone-300 rounded-xl bg-white"
              />
            </div>
          </div>

          <button
            onClick={() => setSavedGoalCreated(true)}
            className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all"
          >
            {savedGoalCreated ? "Goal Saved to Tracker ✓" : "Save Trip Savings Goal"}
          </button>
        </div>

        {/* Center & Right: Progress Bar & Financial Projection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Big Projection Card */}
          <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border border-amber-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                  Projected Vacation Corpus
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-amber-950 font-display mt-0.5">
                  ₹{totalAccumulated.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="text-right sm:text-right">
                <span className="text-xs text-stone-500">Per Person Budget</span>
                <div className="text-lg font-bold text-stone-900">₹{perPersonBudget.toLocaleString('en-IN')}</div>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-stone-700">
                <span>Saving Progress Milestone</span>
                <span>Target: {targetMonth}</span>
              </div>
              <div className="w-full bg-stone-200 h-3 rounded-full overflow-hidden p-0.5">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full w-2/3 animate-pulse"></div>
              </div>
            </div>

            {/* Transport Cost Comparison Matrix */}
            <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-amber-200/80 text-center text-xs">
              <div className="p-2.5 bg-white rounded-2xl border border-amber-200">
                <Bus className="w-4 h-4 text-amber-700 mx-auto mb-1" />
                <div className="text-[10px] text-stone-400 uppercase font-bold">Group Bus / Coach</div>
                <div className="font-bold text-stone-900 mt-0.5">~₹1,200 / head</div>
              </div>
              <div className="p-2.5 bg-white rounded-2xl border border-amber-200">
                <Train className="w-4 h-4 text-blue-700 mx-auto mb-1" />
                <div className="text-[10px] text-stone-400 uppercase font-bold">Express Train</div>
                <div className="font-bold text-stone-900 mt-0.5">~₹600 / head</div>
              </div>
              <div className="p-2.5 bg-white rounded-2xl border border-amber-200">
                <Car className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
                <div className="text-[10px] text-stone-400 uppercase font-bold">Private Cab / SUV</div>
                <div className="font-bold text-stone-900 mt-0.5">~₹3,000 / head</div>
              </div>
            </div>
          </div>

          {/* Recommended Destinations within this Saved Budget */}
          <div className="space-y-3">
            <h3 className="font-bold text-stone-900 text-sm flex items-center justify-between">
              <span>Places You Can Comfortably Visit with ₹{totalAccumulated.toLocaleString('en-IN')}</span>
              <span className="text-xs text-amber-800 font-bold">{affordableDestinations.length} Places Match</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {affordableDestinations.slice(0, 4).map(dest => (
                <div
                  key={dest.id}
                  onClick={() => onSelectDestination(dest.id)}
                  className="p-3 bg-white rounded-2xl border border-stone-200 flex items-center justify-between gap-3 hover:border-amber-500 cursor-pointer shadow-2xs transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img src={dest.image} alt={dest.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <div className="font-bold text-xs text-stone-900">{dest.name}</div>
                      <div className="text-[10px] text-stone-500">{dest.district} • ₹{dest.estimatedCost}/day</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-amber-700" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
