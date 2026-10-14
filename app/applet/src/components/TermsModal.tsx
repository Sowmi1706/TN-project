import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, FileText, CheckSquare, Square, XCircle, ArrowRight } from 'lucide-react';
import { User } from '../types';

interface TermsModalProps {
  isOpen: boolean;
  user: User;
  onAccept: () => void;
  onDecline: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({
  isOpen,
  user,
  onAccept,
  onDecline
}) => {
  const [agreed, setAgreed] = useState(false);
  const [lang, setLang] = useState<'en' | 'ta'>('en');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-300/60 my-6 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 px-6 py-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/30 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-display text-white">
                {lang === 'en' ? 'Mandatory Terms & Conditions Agreement' : 'கட்டாய விதிமுறைகள் மற்றும் நிபந்தனைகள்'}
              </h2>
              <p className="text-[11px] text-amber-200/80">
                TN Stories Smart Tourism Platform (Version 2.4 - Effective 2026)
              </p>
            </div>
          </div>

          {/* Lang toggle */}
          <div className="flex items-center gap-1 bg-stone-800/80 p-1 rounded-lg border border-stone-700 text-xs">
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded cursor-pointer ${lang === 'en' ? 'bg-amber-600 text-white font-bold' : 'text-stone-300'}`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('ta')}
              className={`px-2 py-0.5 rounded cursor-pointer ${lang === 'ta' ? 'bg-amber-600 text-white font-bold' : 'text-stone-300'}`}
            >
              தமிழ்
            </button>
          </div>
        </div>

        {/* Notice alert */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 text-xs text-amber-900 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            {lang === 'en' 
              ? 'Please read the 8 mandatory legal and safety clauses below to proceed to your traveler dashboard.'
              : 'உங்கள் பயணியர் பக்கத்திற்கு செல்வதற்கு முன் கீழே உள்ள 8 முக்கிய பாதுகாப்பு மற்றும் சட்ட விதிகளை படிக்கவும்.'}
          </span>
        </div>

        {/* Scrollable Terms Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-stone-700 leading-relaxed font-sans divide-y divide-stone-100">
          {lang === 'en' ? (
            <>
              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  1. Natural Disasters, Extreme Weather & Unavoidable Events
                </h4>
                <p>
                  TN Stories and associated service providers shall not be held liable for itinerary changes, delays, road blockages, or trip interruptions arising from force majeure events including, but not limited to, heavy monsoonal rainfalls, cyclones along the Bay of Bengal, ghat road landslides in Nilgiris or Valparai, flash floods, seismic activity, or government-mandated district lockdowns. When official Red Alerts are active, booking access to hazardous regions is automatically suspended to ensure traveler preservation.
                </p>
              </div>

              <div className="pt-3">
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  2. Customer Responsibility, Personal Conduct & Travel Risks
                </h4>
                <p>
                  Travelers are responsible for assessing their personal physical fitness before engaging in adventurous activities such as Western Ghats trekking, waterfall bathing in Courtallam cascades, or sea bathing. Visitors must conduct themselves respectfully at holy shrines, adhere to temple customs, attire guidelines (e.g. traditional dhoti/saree where mandated), and abide by regional wildlife sanctuary protocols.
                </p>
              </div>

              <div className="pt-3">
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  3. Cancellation Charges, Non-Refundable Bookings & Refund Eligibility
                </h4>
                <p>
                  Refund eligibility is strictly governed by provider cancellation milestones, circumstances, and consumer protection regulations. Standard cancellations made at least 48 hours prior to journey departure remain eligible for a partial or full refund as designated by specific hotel/bus operator tiers. Government safety cancellations due to severe weather danger zones shall be eligible for rescheduling or refunds in accordance with statutory guidelines.
                </p>
              </div>

              <div className="pt-3">
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  4. Property Damage & Intentional Misconduct
                </h4>
                <p>
                  Travelers are directly responsible for any intentional or reckless damage caused to hotel facilities, hired coaches, archaeological monuments (such as ASI protected bas-reliefs in Mahabalipuram or Thanjavur), and beach amenities cubicles. Defacing heritage stones, littering plastic in eco-sensitive zones, or violating monument photography restrictions will incur fines under Indian Antiquities laws.
                </p>
              </div>

              <div className="pt-3">
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  5. Government Safety Directives, Weather Alerts & Restricted Zones
                </h4>
                <p>
                  Travelers must comply with all directives issued by the Tamil Nadu State Disaster Management Authority (TNSDMA), local district collectors, police, and forest department rangers. Entering cordoned-off forest tracks, unauthorized ghat paths, or coastal waters during flagged high-tide red alerts is strictly prohibited and invalidates trip assistance.
                </p>
              </div>

              <div className="pt-3">
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  6. Third-Party Hotel & Transportation Provider Responsibilities
                </h4>
                <p>
                  While TN Stories conducts rigorous partner audits and lists verified bus operators, homestays, and beach facility caretakers, independent transport and lodging services operate under their own commercial transport permits and statutory safety licenses. TN Stories acts as a facilitator providing transparent ratings and assistance.
                </p>
              </div>

              <div className="pt-3">
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  7. Emergency SOS Guidance & Limitation of Assistance
                </h4>
                <p>
                  The offline emergency SOS module provides immediate speed-dial routing to Tamil Nadu Police (100 / 112), Medical Ambulance (108), Women Helpline (1091), and National Tourist Helpline (1363). While TN Stories aids in providing location coordinates, response times remain contingent upon public emergency and rescue infrastructure availability.
                </p>
              </div>

              <div className="pt-3">
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  8. Privacy, Data Retention & Digital Rights
                </h4>
                <p>
                  We store necessary user contact information, booking logs, and spin history to safeguard customer bookings, manage offline caches, and verify eligibility for first-trip 10% discounts. Personal data is never sold to third parties. Users maintain the statutory right to request account data deletion through Settings.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  1. இயற்கை பேரிடர்கள், தீவிர வானிலை மற்றும் தவிர்க்க முடியாத நிகழ்வுகள்
                </h4>
                <p>
                  கனமழை, வங்காள விரிகுடா புயல்கள், நீலகிரி அல்லது வால்பாறை மலைப்பாதை நிலச்சரிவுகள் போன்ற இயற்கை பேரிடர்களால் ஏற்படும் பயண மாற்றங்களுக்கு தகுந்த பாதுகாப்பு வழிகாட்டுதல்கள் பின்பற்றப்படும். ரெட் அலர்ட் உள்ள அபாயகரமான பகுதிகளுக்கான முன்பதிவு பயணிகளின் பாதுகாப்பிற்காக தானாக நிறுத்தப்படும்.
                </p>
              </div>

              <div className="pt-3">
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  2. பயணியின் பொறுப்பு, நடத்தை மற்றும் பயண அபாயங்கள்
                </h4>
                <p>
                  மலையேற்றம், குற்றால அருவி குளியல் போன்றவற்றில் ஈடுபடும் போது உடல் தகுதியை உறுதி செய்வது பயணியின் பொறுப்பாகும். கோவில் மரபுகள், பாரம்பரிய உடை கட்டுப்பாடுகள் மற்றும் வனத்துறை விதிகளை முறையாக மதிக்க வேண்டும்.
                </p>
              </div>

              <div className="pt-3">
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  3. ரத்து கட்டணங்கள் மற்றும் பணத்திருப்ப விதிமுறைகள்
                </h4>
                <p>
                  பயண தொடக்கத்திற்கு 48 மணி நேரத்திற்கு முன்னதாக செய்யப்படும் ரத்துகளுக்கு விதிமுறைகளின்படி பணத்திருப்பம் வழங்கப்படும். மோசமான வானிலை காரணமாக ரத்து செய்யப்படும் பயணங்களுக்கு உரிய மறுதேதி அல்லது தொகையளிப்பு முறை செயல்படுத்தப்படும்.
                </p>
              </div>

              <div className="pt-3">
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  4. சொத்து சேதம் மற்றும் பொறுப்புரிமை
                </h4>
                <p>
                  தங்கும் விடுதிகள், வாகனங்கள் மற்றும் மாமல்லபுரம், தஞ்சாவூர் போன்ற தொல்லியல் சின்னங்களுக்கு சேதம் விளைவிக்கக் கூடாது. பிளாஸ்டிக் பயன்பாடு மற்றும் விதிமீறல்களுக்கு அபராதம் விதிக்கப்படும்.
                </p>
              </div>

              <div className="pt-3">
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  5. அரசு பாதுகாப்பு அறிவுறுத்தல்கள் மற்றும் வானிலை எச்சரிக்கைகள்
                </h4>
                <p>
                  தமிழ்நாடு பேரிடர் மேலாண்மை ஆணையம் மற்றும் காவல்துறையின் அறிவுறுத்தல்களை கட்டாயம் பின்பற்ற வேண்டும். தடைசெய்யப்பட்ட பகுதிகளுக்குள் செல்வது முற்றிலும் தடைசெய்யப்பட்டுள்ளது.
                </p>
              </div>

              <div className="pt-3">
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  6. மூன்றாம் தரப்பு தங்கும் விடுதி மற்றும் வாகன சேவை
                </h4>
                <p>
                  சான்றளிக்கப்பட்ட வாகன ஓட்டுநர்கள் மற்றும் தங்கும் விடுதிகள் மட்டுமே இணைக்கப்பட்டுள்ளன. சேவையின் வெளிப்படைத்தன்மை மற்றும் தரத்தை TN Stories உறுதி செய்கிறது.
                </p>
              </div>

              <div className="pt-3">
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  7. அவசர உதவி எண்கள் (SOS) மற்றும் வரம்புகள்
                </h4>
                <p>
                  ஆஃப்லைன் SOS உதவி மூலம் காவல்துறை (100/112), ஆம்புலன்ஸ் (108) மற்றும் சுற்றுலா உதவி (1363) எண்களை எளிதில் தொடர்பு கொள்ளலாம்.
                </p>
              </div>

              <div className="pt-3">
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  8. தனியுரிமை கொள்கை மற்றும் பயனர் உரிமைகள்
                </h4>
                <p>
                  முன்பதிவு விவரங்கள் மற்றும் தள்ளுபடி சலுகைகளை பாதுகாப்பாக பராமரிக்க மட்டுமே உங்கள் தரவுகள் பயன்படுத்தப்படும். உங்கள் தகவல்கள் வேறு யாருக்கும் பகிரப்படாது.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer with Unchecked Checkbox & Explicit Agreement Buttons */}
        <div className="p-6 bg-stone-50 border-t border-stone-200 shrink-0">
          <label className="flex items-start gap-3 cursor-pointer group mb-4">
            <button
              type="button"
              onClick={() => setAgreed(!agreed)}
              className="mt-0.5 text-amber-700 hover:text-amber-800 focus:outline-none cursor-pointer"
            >
              {agreed ? (
                <CheckSquare className="w-5 h-5 text-amber-700" />
              ) : (
                <Square className="w-5 h-5 text-stone-400 group-hover:text-stone-600" />
              )}
            </button>
            <span className="text-xs font-semibold text-stone-800">
              {lang === 'en' 
                ? 'I have read, understood, and unconditionally agree to the TN Stories Terms & Conditions and Safety Policies.'
                : 'நான் TN Stories விதிமுறைகள், நிபந்தனைகள் மற்றும் பாதுகாப்பு கொள்கைகளை படித்து முழுமையாக ஏற்றுக்கொள்கிறேன்.'}
            </span>
          </label>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              disabled={!agreed}
              onClick={onAccept}
              className={`w-full sm:flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                agreed 
                  ? 'bg-amber-700 hover:bg-amber-800 text-white shadow-md shadow-amber-900/20' 
                  : 'bg-stone-300 text-stone-500 cursor-not-allowed'
              }`}
            >
              <span>{lang === 'en' ? 'I Agree & Continue' : 'ஏற்கிறேன் & தொடரவும்'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onDecline}
              className="w-full sm:w-auto py-3 px-5 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <XCircle className="w-4 h-4 text-stone-400" />
              <span>{lang === 'en' ? 'Decline & Exit' : 'நிராகரி'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
