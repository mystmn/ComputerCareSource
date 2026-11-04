import React from 'react';
import { BrandLogo } from '../../brand/components/BrandLogo';
import { Phone, Mail } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#10223B] text-gray-300 py-10 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <BrandLogo variant="light" size="md" />

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm">
          <a
            href="tel:18005552273"
            className="flex items-center gap-2 text-white hover:text-[#C59B27] font-semibold transition-colors"
          >
            <Phone className="w-4 h-4 text-[#C59B27]" />
            <span>(800) 555-CARE</span>
          </a>
          <a
            href="mailto:dispatch@computercaresource.com"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4 text-[#2C7A7B]" />
            <span>dispatch@computercaresource.com</span>
          </a>
        </div>

        <p className="text-xs text-gray-400">
          &copy; {CURRENT_YEAR} Computer Care Source. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
