import React from 'react';
import { Award, Building2 } from 'lucide-react';

export const CredentialsSection: React.FC = () => {
  return (
    <section id="credentials" className="relative py-16 sm:py-20 bg-white border-y border-slate-200/80 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#10223B] via-[#1B365D] to-[#162E50] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle background radial depth */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#2C7A7B]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#C59B27]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Headline & Value Proposition (7 cols) */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#C59B27]">
                Proven Expertise &amp; Trust
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                21 Years of Enterprise-Grade Security in Your Home
              </h2>
              <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-normal">
                With over two decades securing mission-critical IT infrastructure for medical centers and financial institutions, we bring hospital-grade confidentiality, rigorous data ethics, and CompTIA A+ certified craftsmanship directly to your living room.
              </p>
            </div>

            {/* Right Column: 2 Proof Pillars (5 cols) */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-4">
              {/* Pillar 1: Medical & Financial Background */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/10 shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-[#2C7A7B]/20 border border-[#2C7A7B]/40 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-[#81E6D9]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Healthcare &amp; Finance Heritage</h3>
                  <p className="text-xs text-gray-300 mt-1 leading-normal">
                    21 years adhering to strict data privacy standards where confidentiality is never an afterthought.
                  </p>
                </div>
              </div>

              {/* Pillar 2: CompTIA A+ Certification */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/10 shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-[#C59B27]/20 border border-[#C59B27]/40 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-[#E6CE78]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">CompTIA A+ Certified Engineers</h3>
                  <p className="text-xs text-gray-300 mt-1 leading-normal">
                    Industry-credentialed diagnostics, hardware repair, and operating system troubleshooting you can count on.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
