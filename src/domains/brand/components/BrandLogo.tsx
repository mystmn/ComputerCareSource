import React from 'react';

export interface BrandLogoProps {
  /**
   * Color variant:
   * - 'light': for dark backgrounds (navbar, footer) -> white text
   * - 'dark': for light backgrounds -> deep navy text
   */
  variant?: 'light' | 'dark';
  /**
   * Size preset:
   * - 'sm': Small icon tile (Favicon / Icon with "CCS") or compact inline
   * - 'md': Medium header / mobile size
   * - 'lg': Large desktop presentation
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Visual layout orientation:
   * - 'horizontal': Emblem on left, text on right (Desktop standard)
   * - 'stacked': Emblem centered on top, text stacked on 3 lines below (Mobile / Header)
   * - 'icon': Rounded navy app tile with "CCS" (Small Favicon format)
   */
  layout?: 'horizontal' | 'stacked' | 'icon';
  /**
   * Optional tagline: "Your personal IT department, at home."
   */
  showSlogan?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  size = 'md',
  layout = 'horizontal',
  showSlogan = false,
  className = '',
}) => {
  const isLightText = variant === 'light';

  // 1. Small / Icon layout (Rounded Navy tile with emblem + "CCS")
  if (layout === 'icon') {
    const tileSizes = {
      sm: 'w-9 h-9',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
    };
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        <img
          src="/brand/logo-small.png"
          alt="Computer Care Source (CCS)"
          className={`${tileSizes[size]} object-contain drop-shadow-sm rounded-xl`}
          loading="eager"
        />
      </div>
    );
  }

  // 2. Medium Stacked layout (Emblem centered on top, "Computer Care Source" on 3 lines below)
  if (layout === 'stacked') {
    return (
      <div className={`inline-flex flex-col items-center text-center select-none ${className}`}>
        <img
          src="/brand/logo-mark.png"
          alt="Computer Care Source Emblem"
          className="w-16 h-12 sm:w-20 sm:h-16 object-contain mb-2"
          loading="eager"
        />
        <div className="flex flex-col leading-tight font-black tracking-tight text-sm sm:text-base">
          <span className={isLightText ? 'text-white' : 'text-[#06244E]'}>Computer</span>
          <span className={isLightText ? 'text-white' : 'text-[#06244E]'}>Care</span>
          <span className={isLightText ? 'text-white' : 'text-[#06244E]'}>Source</span>
        </div>
        {showSlogan && (
          <p className="mt-1.5 text-[11px] text-gray-300 font-normal">
            Your personal IT department, at home.
          </p>
        )}
      </div>
    );
  }

  // 3. Horizontal layout (Desktop & standard header)
  const emblemSizes = {
    sm: 'w-9 h-7',
    md: 'w-12 h-9',
    lg: 'w-16 h-12',
  };

  const titleSizes = {
    sm: 'text-sm font-bold tracking-tight',
    md: 'text-lg sm:text-xl font-extrabold tracking-tight',
    lg: 'text-2xl sm:text-3xl font-black tracking-tight',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official House + Laptop + Gold Checkmark Emblem */}
      <img
        src="/brand/logo-mark.png"
        alt="Computer Care Source Emblem"
        className={`${emblemSizes[size]} object-contain flex-shrink-0`}
        loading="eager"
      />

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className={`leading-none flex items-center gap-1.5 ${titleSizes[size]}`}>
          <span className={isLightText ? 'text-white' : 'text-[#06244E]'}>
            Computer Care
          </span>
          <span className={isLightText ? 'text-white' : 'text-[#06244E]'}>
            Source
          </span>
        </div>
        {showSlogan && (
          <span className={`mt-1 font-normal tracking-wide text-xs ${isLightText ? 'text-gray-300' : 'text-[#4A5568]'}`}>
            Your personal IT department, at home.
          </span>
        )}
      </div>
    </div>
  );
};
