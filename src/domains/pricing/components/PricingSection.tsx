import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const includedItems = [
    'Travel directly to your home',
    'Comprehensive system diagnostics',
    'Hands-on repair & tuning',
    'Final PC performance & security check before we leave',
  ];

  return (
    <section id="pricing" className="relative py-16 sm:py-24 bg-[#F7FAFC] scroll-mt-16 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B365D] tracking-tight">
            Transparent Pricing
          </h2>
        </div>

        {/* 3-Layer Spatial Pricing Spotlight */}
        <div className="relative">
          {/* Layer 1: Ambient Gold/Teal Glow */}
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-r from-[#C59B27]/20 via-[#2C7A7B]/15 to-[#C59B27]/20 blur-2xl pointer-events-none" />

          {/* Layer 2: Physical Stacked Navy Backplate */}
          <div className="absolute inset-0 translate-y-3.5 scale-[0.96] rounded-[2rem] bg-[#1B365D] shadow-2xl pointer-events-none" />

          {/* Layer 3: Main Gold-Bordered Spotlight Card */}
          <div className="relative z-10 rounded-[2rem] bg-white border-2 border-[#C59B27] shadow-2xl p-7 sm:p-11">
            {/* Recessed Rate Wells */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Hour Well */}
              <div className="rounded-2xl bg-[#F7FAFC] border border-slate-200/80 p-6 text-center md:text-left space-y-1 shadow-inner">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2C7A7B]">
                  The Concierge House Call
                </span>
                <div className="flex items-baseline justify-center md:justify-start gap-2 pt-1">
                  <span className="text-5xl font-black text-[#1B365D]">$140</span>
                  <span className="text-base font-semibold text-[#4A5568]">first hour</span>
                </div>
              </div>

              {/* Extended Support Well */}
              <div className="rounded-2xl bg-[#FBF7EC]/60 border border-[#C59B27]/30 p-6 text-center md:text-left space-y-1 shadow-inner">
                <span className="text-xs font-bold uppercase tracking-wider text-[#AF8820]">
                  Extended Support
                </span>
                <div className="flex items-baseline justify-center md:justify-start gap-2 pt-1">
                  <span className="text-4xl font-extrabold text-[#1B365D]">$119/hr</span>
                  <span className="text-sm font-medium text-[#4A5568]">additional hours</span>
                </div>
              </div>
            </div>

            {/* Included in Every Visit */}
            <div className="pt-8 mt-8 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1B365D] mb-4 text-center md:text-left">
                Included in Every Visit — No Hidden Trip Fees or Surprise Markups:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {includedItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#F7FAFC] border border-slate-100 text-sm sm:text-base text-[#4A5568]"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#2C7A7B] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
