import React from 'react';
import { BrandLogo } from '../../brand/components/BrandLogo';
import { Phone } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#10223B] text-gray-300 py-10 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <BrandLogo variant="light" size="md" />

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm">
          <a
            href="tel:16143822874"
            className="flex items-center gap-2 text-white hover:text-[#C59B27] font-semibold transition-colors"
          >
            <Phone className="w-4 h-4 text-[#C59B27]" />
            <span>(614) 382-2874</span>
          </a>
        </div>

        <div className="flex flex-col sm:items-end items-center text-xs text-gray-400 gap-1.5 text-center sm:text-right">
          <p>&copy; {CURRENT_YEAR} Computer Care Source. All rights reserved.</p>
          <p>
            Created By{' '}
            <a
              href="https://theevergreenstrategy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#C59B27] underline decoration-gray-600 hover:decoration-[#C59B27] transition-colors font-medium"
            >
              Evergreen Strategy, LLC.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
