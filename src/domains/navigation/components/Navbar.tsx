import React, { useState, useEffect } from 'react';
import { BrandLogo } from '../../brand/components/BrandLogo';
import { Phone, Calendar, Menu, X } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Experience', href: '#credentials' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'How It Works', href: '#how-it-works' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? 'bg-[#1B365D]/95 backdrop-blur-md shadow-lg py-3' : 'bg-[#1B365D] py-4'
      } border-b border-white/10`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#" className="focus:outline-none">
          <BrandLogo variant="light" size="md" />
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-200 hover:text-[#C59B27] font-medium text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden sm:flex items-center space-x-4">
          <a
            href="tel:16143822874"
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-200 hover:text-white transition-colors"
          >
            <Phone className="w-4 h-4 text-[#C59B27]" />
            <span>(614) 382-2874</span>
          </a>

          <button
            onClick={onBookClick}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#C59B27] hover:bg-[#AF8820] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book a House Call</span>
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex sm:hidden items-center space-x-2">
          <button
            onClick={onBookClick}
            className="px-3 py-1.5 rounded-lg bg-[#C59B27] text-white font-bold text-xs shadow"
          >
            Book Now
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#10223B] border-t border-white/10 px-4 py-4 space-y-4">
          <div className="flex justify-center pb-3 border-b border-white/10">
            <BrandLogo variant="light" size="md" layout="stacked" />
          </div>
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-[#C59B27]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
