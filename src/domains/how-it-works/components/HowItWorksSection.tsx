import React from 'react';
import { CalendarCheck, UserCheck, Wrench } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '1',
      watermark: '01',
      title: 'Schedule Your Visit',
      desc: 'Pick a time that fits your schedule via our online form or phone.',
      icon: CalendarCheck,
    },
    {
      num: '2',
      watermark: '02',
      title: 'We Arrive at Your Door',
      desc: 'A background-checked, seasoned engineer arrives on time and ready to work.',
      icon: UserCheck,
    },
    {
      num: '3',
      watermark: '03',
      title: 'Problem Solved on the Spot',
      desc: 'We fix the issue right in front of you and verify everything works before we pack up.',
      icon: Wrench,
    },
  ];

  return (
    <section id="how-it-works" className="relative py-20 sm:py-24 bg-white border-t border-slate-200/80 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B365D] tracking-tight">
            How It Works
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Spatial Connecting Track Line (Behind Cards on Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-16 right-16 -translate-y-1/2 h-0.5 bg-gradient-to-r from-[#1B365D]/15 via-[#C59B27]/50 to-[#2C7A7B]/25 z-0 pointer-events-none" />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative z-10 rounded-3xl bg-[#F7FAFC] border border-white shadow-spatial pt-11 pb-8 px-7 text-center space-y-3 hover:-translate-y-1 transition-transform duration-300"
              >
                {/* Recessed Background Watermark Number */}
                <span className="absolute top-3 right-5 text-5xl font-black text-[#1B365D]/[0.05] select-none pointer-events-none">
                  {step.watermark}
                </span>

                {/* Overlapping Floating Icon Badge */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-13 h-13 rounded-2xl bg-gradient-to-br from-[#1B365D] to-[#10223B] text-[#C59B27] ring-4 ring-white shadow-lg flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-[#1B365D]">
                  {step.num}. {step.title}
                </h3>
                <p className="text-base text-[#4A5568] leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
