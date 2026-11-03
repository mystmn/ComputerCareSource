import React from 'react';
import { CONCIERGE_SERVICES } from '../data/servicesData';
import { ServiceCard } from './ServiceCard';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="relative pt-20 pb-24 bg-subtle-dots scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B365D] tracking-tight">
            Core Concierge Services
          </h2>
        </div>

        {/* 2x2 Grid of Multi-Plane Elevated Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {CONCIERGE_SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={onSelectService}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
