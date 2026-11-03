import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  size = 'md',
}) => {
  const isDark = variant === 'dark';

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const titleSizes = {
    sm: 'text-base font-bold tracking-tight',
    md: 'text-xl font-bold tracking-tight',
    lg: 'text-2xl font-extrabold tracking-tight',
  };

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Brand Icon: House enclosing a laptop with a gold shield & checkmark */}
      <div
        className={`relative ${iconSizes[size]} flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#1B365D] to-[#10223B] border border-[#C59B27]/40 shadow-md p-1.5`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M24 4L6 18.5V42C6 43.1046 6.89543 44 8 44H40C41.1046 44 42 43.1046 42 42V18.5L24 4Z"
            stroke="#C59B27"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-sm"
          />
          <path
            d="M24 8L38 19.5V40H10V19.5L24 8Z"
            fill="#1B365D"
            opacity="0.85"
          />
          <rect
            x="14"
            y="18"
            width="20"
            height="13"
            rx="1.5"
            fill="#FFFFFF"
            stroke="#2C7A7B"
            strokeWidth="1.5"
          />
          <rect
            x="16"
            y="20"
            width="16"
            height="9"
            rx="0.5"
            fill="#F7FAFC"
          />
          <path
            d="M11 32.5C11 31.6716 11.6716 31 12.5 31H35.5C36.3284 31 37 31.6716 37 32.5V33.5C37 34.3284 36.3284 35 35.5 35H12.5C11.6716 35 11 34.3284 11 33.5V32.5Z"
            fill="#E2E8F0"
            stroke="#2C7A7B"
            strokeWidth="1.2"
          />
          <g transform="translate(24, 21)">
            <path
              d="M10 2C10 2 15 0.5 17 0C19 0.5 24 2 24 2C24 9 19 14 17 15.5C15 14 10 9 10 2Z"
              fill="#C59B27"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              className="drop-shadow"
            />
            <path
              d="M13.5 6.5L16 9L20.5 4"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>

      {/* Brand Name */}
      <div className={`leading-none flex items-center gap-1 ${titleSizes[size]}`}>
        <span className={isDark ? 'text-[#1B365D]' : 'text-white'}>Computer Care</span>
        <span className="text-[#C59B27]">Source</span>
      </div>
    </div>
  );
};
