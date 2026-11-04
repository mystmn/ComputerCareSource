import React from 'react';
import { CheckCircle2, Phone, MessageSquare } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const includedItems = [
    'Travel directly to your home',
    'Comprehensive system diagnostics',
    'Hands-on repair',
    'Final PC performance & security check before we leave',
  ];

  return (
    <section id="pricing" className="relative py-16 sm:py-24 bg-[#F7FAFC] scroll-mt-16 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B365D] tracking-tight">
            Honest & Direct Pricing
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
            {/* Call or Text for Quote Highlight */}
            <div className="rounded-2xl bg-[#F7FAFC] border border-slate-200/80 p-8 sm:p-10 text-center space-y-4 shadow-inner">
              <div className="text-3xl sm:text-5xl font-black text-[#1B365D] tracking-tight">
                Call or text for a quote
              </div>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="tel:6143822874"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-b from-[#1B365D] to-[#10223B] hover:from-[#10223B] hover:to-[#0D1C30] text-white font-bold text-base shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Phone className="w-5 h-5 text-[#C59B27]" />
                  <span>Call (614) 382-2874</span>
                </a>
                <a
                  href="sms:6143822874"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-[#1B365D] font-bold text-base shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 text-[#2C7A7B]" />
                  <span>Text Us</span>
                </a>
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
