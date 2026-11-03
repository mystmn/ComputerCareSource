import React from 'react';
import type { ServiceItem } from '../types';
import { Wrench, ShieldAlert, Wifi, HardDrive, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
  onSelect: (serviceId: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  const renderIcon = () => {
    const iconClass = 'w-6 h-6 text-[#2C7A7B] group-hover:text-white transition-colors duration-300';
    switch (service.iconName) {
      case 'wrench':
        return <Wrench className={iconClass} />;
      case 'shield':
        return <ShieldAlert className={iconClass} />;
      case 'wifi':
        return <Wifi className={iconClass} />;
      case 'database':
        return <HardDrive className={iconClass} />;
    }
  };

  return (
    <div
      onClick={() => onSelect(service.id)}
      className="relative group cursor-pointer"
    >
      {/* Spatial Backplate Layer (Offset Depth Plane) */}
      <div className="absolute inset-0 translate-y-2.5 scale-[0.97] rounded-3xl bg-gradient-to-br from-[#1B365D]/10 to-[#2C7A7B]/10 blur-[2px] transition-all duration-300 group-hover:translate-y-3.5 group-hover:from-[#C59B27]/20 group-hover:to-[#2C7A7B]/20" />

      {/* Foreground Elevated Card */}
      <div className="relative z-10 h-full rounded-3xl bg-white p-7 sm:p-8 shadow-spatial group-hover:shadow-spatial-hover transition-all duration-300 group-hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden">
        {/* Subtle Corner Accent Glow */}
        <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-[#E6FFFA]/70 group-hover:bg-[#FBF7EC] transition-colors duration-300 pointer-events-none" />

        <div className="relative">
          <div className="flex items-center gap-4 mb-4">
            {/* Layered Dual-Ring Icon Badge */}
            <div className="p-1.5 rounded-2xl bg-[#E6FFFA]/60 border border-[#2C7A7B]/15 group-hover:border-[#2C7A7B]/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#E6FFFA] flex items-center justify-center flex-shrink-0 group-hover:bg-[#2C7A7B] shadow-sm transition-all duration-300">
                {renderIcon()}
              </div>
            </div>

            <h3 className="text-xl font-bold text-[#1B365D] group-hover:text-[#2C7A7B] transition-colors">
              {service.title}
            </h3>
          </div>

          <p className="text-base text-[#4A5568] leading-relaxed">
            {service.shortDesc}
          </p>
        </div>

        <div className="relative pt-5 mt-6 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-[#1B365D] group-hover:text-[#2C7A7B] transition-colors">
          <span>Schedule {service.title}</span>
          <div className="w-8 h-8 rounded-full bg-[#F7FAFC] group-hover:bg-[#FBF7EC] flex items-center justify-center transition-colors">
            <ArrowRight className="w-4 h-4 text-[#C59B27] group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
