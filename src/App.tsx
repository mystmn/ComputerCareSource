import { useState } from 'react';
import { Navbar } from './domains/navigation/components/Navbar';
import { HeroSection } from './domains/hero/components/HeroSection';
import { ServicesSection } from './domains/services/components/ServicesSection';
import { CredentialsSection } from './domains/credentials/components/CredentialsSection';
import { PricingSection } from './domains/pricing/components/PricingSection';
import { HowItWorksSection } from './domains/how-it-works/components/HowItWorksSection';
import { BookingSection } from './domains/booking/components/BookingSection';
import { Footer } from './domains/footer/components/Footer';

export function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('computer-repair');

  const scrollToBooking = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFC] text-[#4A5568] selection:bg-[#C59B27]/20 selection:text-[#1B365D]">
      {/* Sticky Header / Navigation */}
      <Navbar onBookClick={() => scrollToBooking()} />

      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />

        {/* Core Concierge Services (2x2 Grid) */}
        <ServicesSection onSelectService={(serviceId) => scrollToBooking(serviceId)} />

        {/* Experience & Credentials */}
        <CredentialsSection />

        {/* Honest & Direct Pricing Section */}
        <PricingSection />

        {/* How It Works (3 Simple Steps) */}
        <HowItWorksSection />

        {/* Lead Capture / Booking Footer */}
        <BookingSection selectedServiceId={selectedServiceId} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
