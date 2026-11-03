import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const trustPillars = [
    {
      title: 'At-Home Convenience',
      subtitle: 'We come directly to your desk',
    },
    {
      title: 'Insured & Certified',
      subtitle: 'Vetted, seasoned engineers',
    },
    {
      title: 'Zero Tech Jargon',
      subtitle: 'Patient, plain-English support',
    },
  ];

  return (
    <div className="relative">
      {/* ZONE 1: Main Hero Canvas (Headline + Subheadline + Primary Action) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#10223B] via-[#1B365D] to-[#162E50] pt-20 pb-28 sm:pt-28 sm:pb-36">
        {/* Architectural Dot Grid */}
        <div className="absolute inset-0 bg-architectural-grid opacity-50 pointer-events-none" />

        {/* Ambient Depth Orbs */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[42rem] h-[24rem] rounded-full bg-[#2C7A7B]/20 blur-[110px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#C59B27]/15 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Group 1: Core Pitch (Headline + Subheadline) */}
          <div className="space-y-6 mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Your Personal IT Department,{' '}
              <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-[#FBF7EC] via-[#C59B27] to-[#E6CE78]">
                Right at Your Door.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-200/90 max-w-2xl mx-auto leading-relaxed font-normal">
              Skip the geek line and leave the cables plugged in. We provide confidential,
              concierge computer repair, network setup, and data recovery inside the comfort of your home.
            </p>
          </div>

          {/* Group 2: Rate Reassurance */}
          <div className="inline-flex items-center px-6 py-3 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/15 shadow-xl text-xs sm:text-sm text-gray-200">
            <span className="text-[#E6CE78] font-bold uppercase tracking-wider text-xs">
              Transparent Rates
            </span>
            <span className="text-white/30 mx-3">&bull;</span>
            <span className="font-bold text-white">$140 First Hour</span>
            <span className="text-white/30 mx-3">|</span>
            <span className="text-gray-300">$119 Additional Hours</span>
          </div>
        </div>
      </section>

      {/* ZONE 2: Dedicated Trust Bar Section (Bridging Hero & Page Body) */}
      <section aria-label="Service Guarantees" className="relative z-20 -mt-12 sm:-mt-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto rounded-2xl bg-white border border-slate-200/90 shadow-spatial p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200/80 gap-6 md:gap-0">
            {trustPillars.map((pillar, idx) => (
              <div
                key={pillar.title}
                className={`flex items-center gap-4 ${
                  idx === 0 ? 'md:pr-6' : idx === 1 ? 'pt-5 md:pt-0 md:px-6' : 'pt-5 md:pt-0 md:pl-6'
                }`}
              >
                <div className="w-11 h-11 rounded-xl bg-[#E6FFFA] border border-[#2C7A7B]/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-[#2C7A7B]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#1B365D] leading-snug">
                    {pillar.title}
                  </h2>
                  <p className="text-xs text-[#4A5568] mt-0.5">{pillar.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
