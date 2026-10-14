import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Gift, 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  Copy, 
  Volume2, 
  VolumeX, 
  History, 
  Tag, 
  AlertCircle,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { User, SpinReward, SpinHistory } from '../types';
import { StorageService } from '../services/storageService';

interface DailySpinWheelProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onApplyCouponToBooking?: (couponCode: string) => void;
}

export const DailySpinWheel: React.FC<DailySpinWheelProps> = ({
  user,
  isOpen,
  onClose,
  onApplyCouponToBooking
}) => {
  const [rewards, setRewards] = useState<SpinReward[]>([]);
  const [hasSpunToday, setHasSpunToday] = useState(false);
  const [spinHistory, setSpinHistory] = useState<SpinHistory[]>([]);
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedReward, setSelectedReward] = useState<SpinReward | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'wheel' | 'history' | 'rules'>('wheel');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentRotationRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize and load state
  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen, user]);

  const loadData = () => {
    const list = StorageService.getSpinRewards();
    setRewards(list);
    const spun = StorageService.hasUserSpunToday(user.id);
    setHasSpunToday(spun);
    const history = StorageService.getSpinHistory().filter(h => h.userId === user.id);
    setSpinHistory(history);
    setCountdown(StorageService.getTimeUntilNextSpin());
  };

  // Live countdown to next 12:00 AM IST
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setCountdown(StorageService.getTimeUntilNextSpin());
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  // Web Audio Synthesizer Click Sound
  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio fallback
    }
  };

  const playFanfareSound = () => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + idx * 0.1 + 0.35);
      });
    } catch {}
  };

  // Draw wheel on canvas
  const drawWheel = (angleOffset: number) => {
    const canvas = canvasRef.current;
    if (!canvas || rewards.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 16;
    const arc = (2 * Math.PI) / rewards.length;

    ctx.clearRect(0, 0, size, size);

    // Outer decorative golden ring
    ctx.beginPath();
    ctx.arc(center, center, radius + 10, 0, 2 * Math.PI);
    ctx.fillStyle = '#78350f'; // Dark amber
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#f59e0b';
    ctx.stroke();

    // Wheel segments
    rewards.forEach((reward, i) => {
      const angle = angleOffset + i * arc;
      ctx.beginPath();
      ctx.arc(center, center, radius, angle, angle + arc);
      ctx.lineTo(center, center);
      ctx.fillStyle = reward.color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Text label
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(angle + arc / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 3;

      // Draw concise label
      const displayText = reward.label.length > 18 ? reward.label.slice(0, 16) + '...' : reward.label;
      ctx.fillText(displayText, radius - 24, 4);
      ctx.restore();
    });

    // Outer light dots
    for (let i = 0; i < 24; i++) {
      const dotAngle = (i * 2 * Math.PI) / 24;
      const x = center + (radius + 5) * Math.cos(dotAngle);
      const y = center + (radius + 5) * Math.sin(dotAngle);
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = i % 2 === 0 ? '#fef08a' : '#ffffff';
      ctx.fill();
    }

    // Center hub
    ctx.beginPath();
    ctx.arc(center, center, 28, 0, 2 * Math.PI);
    ctx.fillStyle = '#b45309';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(center, center, 14, 0, 2 * Math.PI);
    ctx.fillStyle = '#fef3c7';
    ctx.fill();
  };

  useEffect(() => {
    if (isOpen && rewards.length > 0) {
      drawWheel(currentRotationRef.current);
    }
  }, [isOpen, rewards]);

  // Execute Spin with Backend-calculated weighted probability
  const handleSpinClick = () => {
    if (isSpinning || hasSpunToday || rewards.length === 0) return;

    // 1. Backend-controlled weighted selection
    const rand = Math.random() * 100;
    let accumulated = 0;
    let chosenReward = rewards[0];
    let chosenIndex = 0;

    for (let i = 0; i < rewards.length; i++) {
      accumulated += rewards[i].probability;
      if (rand <= accumulated) {
        chosenReward = rewards[i];
        chosenIndex = i;
        break;
      }
    }

    setIsSpinning(true);
    setSelectedReward(null);

    // Calculate target rotation angle so pointer (top at -Math.PI / 2) points to chosen segment
    const segmentArc = (2 * Math.PI) / rewards.length;
    // Needle is at top: 3 * Math.PI / 2 or -Math.PI / 2
    // Angle of segment i center = i * arc + arc/2
    const targetSegmentAngle = chosenIndex * segmentArc + segmentArc / 2;
    const spinsCount = 5 + Math.floor(Math.random() * 3); // 5 to 7 full revolutions
    const targetAngle = (3 * Math.PI) / 2 - targetSegmentAngle + spinsCount * 2 * Math.PI;

    const startAngle = currentRotationRef.current % (2 * Math.PI);
    const totalRotation = targetAngle + (2 * Math.PI - (startAngle % (2 * Math.PI)));
    const duration = 4800; // ms
    const startTime = performance.now();

    let lastClickTick = 0;

    const animateWheel = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentAngle = startAngle + totalRotation * ease;
      currentRotationRef.current = currentAngle;

      // Play tick sounds as segments pass needle
      const currentTick = Math.floor(currentAngle / segmentArc);
      if (currentTick !== lastClickTick) {
        playClickSound();
        lastClickTick = currentTick;
      }

      drawWheel(currentAngle);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateWheel);
      } else {
        // Spin finished
        setIsSpinning(false);
        setSelectedReward(chosenReward);

        // Record in persistent storage securely
        const historyRecord = StorageService.recordSpin(user.id, chosenReward);
        setHasSpunToday(true);
        setSpinHistory(prev => [historyRecord, ...prev]);

        if (chosenReward.isWinning) {
          playFanfareSound();
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      }
    };

    animationFrameRef.current = requestAnimationFrame(animateWheel);
  };

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-300/60 my-6 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 px-6 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-amber-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-display text-white">
                Daily Spin & Win Rewards
              </h2>
              <p className="text-[11px] text-amber-100">
                1 free spin daily • Resets at 12:00 AM Indian Standard Time (IST)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              title={soundEnabled ? 'Mute sound' : 'Enable sound'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Subheader */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-6 text-xs font-bold text-stone-600">
          <button
            onClick={() => setActiveTab('wheel')}
            className={`py-2.5 px-4 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'wheel' ? 'border-amber-600 text-amber-700' : 'border-transparent hover:text-stone-900'
            }`}
          >
            🎡 Lucky Wheel
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-2.5 px-4 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'history' ? 'border-amber-600 text-amber-700' : 'border-transparent hover:text-stone-900'
            }`}
          >
            🎁 My Rewards ({spinHistory.filter(h => h.couponCode).length})
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`py-2.5 px-4 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'rules' ? 'border-amber-600 text-amber-700' : 'border-transparent hover:text-stone-900'
            }`}
          >
            📜 Rules & Probabilities
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto">
          {activeTab === 'wheel' && (
            <div className="flex flex-col items-center">
              {/* Status Banner */}
              {hasSpunToday ? (
                <div className="w-full mb-4 p-3 bg-stone-100 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-700 gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>You have utilized your free spin for today.</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Next Spin In: {countdown.hours}h {countdown.minutes}m {countdown.seconds}s</span>
                  </div>
                </div>
              ) : (
                <div className="w-full mb-3 p-2.5 bg-amber-50 rounded-2xl border border-amber-200 text-center text-xs font-bold text-amber-900 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
                  <span>Free Spin Available Today! Test your luck for tourism coupons.</span>
                </div>
              )}

              {/* Wheel Container */}
              <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] my-2 select-none">
                {/* Pointer Indicator Arrow at Top */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20 flex flex-col items-center pointer-events-none">
                  <div className="w-5 h-7 bg-red-600 shadow-md transform rotate-180 clip-triangle" style={{
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                  }}></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-300 border-2 border-red-700 -mt-1"></div>
                </div>

                <canvas
                  ref={canvasRef}
                  width={340}
                  height={340}
                  className="w-full h-full drop-shadow-xl"
                />
              </div>

              {/* Result Modal Card */}
              {selectedReward && (
                <div className="w-full mt-4 p-4 rounded-2xl border transition-all animate-in zoom-in-95 duration-200 text-center">
                  {selectedReward.isWinning ? (
                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
                      <div className="text-2xl mb-1">🎉</div>
                      <div className="text-sm font-extrabold text-emerald-900">Congratulations!</div>
                      <div className="text-xs font-semibold text-emerald-800 mt-0.5">
                        You won: <span className="underline">{selectedReward.label}</span>
                      </div>
                      {selectedReward.couponCode && (
                        <div className="mt-3 flex items-center justify-center gap-2">
                          <span className="font-mono font-bold bg-white px-3 py-1.5 rounded-lg border border-emerald-300 text-emerald-800 text-xs">
                            {selectedReward.couponCode}
                          </span>
                          <button
                            onClick={() => handleCopyCoupon(selectedReward.couponCode!)}
                            className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 flex items-center gap-1 cursor-pointer"
                          >
                            {copiedCoupon === selectedReward.couponCode ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl text-stone-700">
                      <div className="text-2xl mb-1">☘️</div>
                      <div className="text-sm font-bold text-stone-900">{selectedReward.label}</div>
                      <div className="text-xs text-stone-500 mt-1">{selectedReward.subtext}</div>
                      <div className="text-[11px] text-amber-800 mt-2">
                        Come back tomorrow after 12:00 AM IST for your next free spin!
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Spin Action Button */}
              <div className="mt-5 w-full flex justify-center">
                <button
                  type="button"
                  disabled={isSpinning || hasSpunToday}
                  onClick={handleSpinClick}
                  className={`w-full max-w-xs py-3.5 px-6 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                    hasSpunToday
                      ? 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none'
                      : isSpinning
                      ? 'bg-amber-600 text-white animate-pulse'
                      : 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white shadow-amber-900/20 hover:scale-105 active:scale-95'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>
                    {isSpinning 
                      ? 'Spinning...' 
                      : hasSpunToday 
                      ? 'Spun Today' 
                      : 'SPIN NOW'}
                  </span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="text-xs text-stone-600">
                Your past spin attempts and awarded coupon codes. Coupons can be applied at trip checkout.
              </div>

              {spinHistory.length === 0 ? (
                <div className="text-center py-8 text-xs text-stone-400">
                  No spin history recorded yet. Give the wheel a spin!
                </div>
              ) : (
                <div className="space-y-2.5">
                  {spinHistory.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-stone-900">{item.rewardLabel}</div>
                        <div className="text-[10px] text-stone-400">
                          {new Date(item.timestamp).toLocaleDateString()} at {new Date(item.timestamp).toLocaleTimeString()}
                        </div>
                      </div>

                      {item.couponCode ? (
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md text-[11px] border border-amber-300">
                            {item.couponCode}
                          </span>
                          <button
                            onClick={() => handleCopyCoupon(item.couponCode!)}
                            className="p-1 text-stone-500 hover:text-stone-800 cursor-pointer"
                            title="Copy Code"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-stone-400 font-medium">No coupon</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="space-y-3 text-xs text-stone-700 leading-relaxed font-sans">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 font-medium">
                ⚖️ <strong>Transparency Notice:</strong> All spins are chance-based and not guaranteed. Outcomes are calculated server-side according to the published probabilities below.
              </div>

              <div className="font-bold text-stone-900 text-sm mt-3">Configured Probability Distribution</div>
              <div className="border border-stone-200 rounded-xl overflow-hidden divide-y divide-stone-100">
                <div className="grid grid-cols-3 bg-stone-100 p-2 font-bold text-stone-700 text-[11px]">
                  <span>Outcome</span>
                  <span>Category</span>
                  <span className="text-right">Probability</span>
                </div>
                {rewards.map((r) => (
                  <div key={r.id} className="grid grid-cols-3 p-2 text-[11px] items-center">
                    <span className="font-medium text-stone-800">{r.label}</span>
                    <span className={r.isWinning ? 'text-emerald-700 font-bold' : 'text-stone-500'}>
                      {r.isWinning ? 'Reward Coupon' : 'Non-Winning'}
                    </span>
                    <span className="text-right font-mono font-bold text-stone-900">
                      {r.probability.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-stone-500 pt-2 space-y-1">
                <p>• Total Non-winning probability: 90.0% (Better luck: 50%, Try again: 25%, No reward: 15%)</p>
                <p>• Total Reward probability: 10.0% (₹20: 5%, ₹50: 3%, ₹100: 1.5%, Special Gift: 0.5%)</p>
                <p>• Resets automatically at 12:00 AM IST (Indian Standard Time).</p>
                <p>• Coupons are single-use per account on eligible bookings.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
