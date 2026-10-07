import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'full';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = 'h-14',
  variant = 'light',
  showTagline = true,
}) => {
  const isDarkBg = variant === 'dark';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Scalable SVG Emblem */}
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto shrink-0 drop-shadow-xs"
        aria-label="EcoShine Logo"
      >
        {/* Sparkles / Stars above roof */}
        <g fill="#57B900">
          {/* Top star */}
          <path d="M102 24 C102 32 105 34 113 34 C105 34 102 36 102 44 C102 36 99 34 91 34 C99 34 102 32 102 24 Z" />
          {/* Right star */}
          <path d="M120 42 C120 48 122 50 128 50 C122 50 120 52 120 58 C120 52 118 50 112 50 C118 50 120 48 120 42 Z" />
          {/* Small star */}
          <path d="M96 52 C96 56 97.5 57 101.5 57 C97.5 57 96 58 96 62 C96 58 94.5 57 90.5 57 C94.5 57 96 56 96 52 Z" />
        </g>

        {/* Outer Circular Leaf Arc */}
        <path
          d="M 68 112 C 108 116, 138 92, 132 52 C 127 28, 98 22, 82 32 C 112 28, 126 50, 116 80 C 104 102, 80 110, 68 112 Z"
          fill="#57B900"
        />

        {/* Botanical Leaves on Left */}
        {/* Leaf 1 (Top Left) */}
        <path
          d="M 52 64 C 52 44, 72 40, 78 40 C 78 58, 62 76, 52 64 Z"
          fill="#57B900"
        />
        {/* Leaf 2 (Middle Left) */}
        <path
          d="M 40 82 C 34 64, 52 56, 62 58 C 60 76, 48 88, 40 82 Z"
          fill="#449800"
        />
        {/* Leaf 3 (Bottom Left) */}
        <path
          d="M 44 98 C 36 86, 50 78, 60 82 C 58 96, 48 104, 44 98 Z"
          fill="#57B900"
        />

        {/* House Silhouette */}
        <g fill={isDarkBg ? '#FFFFFF' : '#004A2B'}>
          {/* Roof Line */}
          <path
            d="M 58 84 L 92 56 L 126 84 L 121 89 L 92 65 L 63 89 Z"
            strokeLinejoin="round"
          />
          {/* Chimney */}
          <path d="M 106 63 L 114 69 L 114 56 L 106 56 Z" />
          {/* House Base & Walls */}
          <path d="M 68 83 L 68 114 L 116 114 L 116 83 L 92 64 Z" />
        </g>

        {/* Window 4 Panes in White or Contrast */}
        <g fill={isDarkBg ? '#004A2B' : '#FFFFFF'}>
          <rect x="85" y="86" width="6.5" height="6.5" rx="1" />
          <rect x="93.5" y="86" width="6.5" height="6.5" rx="1" />
          <rect x="85" y="94.5" width="6.5" height="6.5" rx="1" />
          <rect x="93.5" y="94.5" width="6.5" height="6.5" rx="1" />
        </g>
      </svg>

      {/* Typography Brand Block */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline tracking-tight font-extrabold leading-none text-xl sm:text-2xl">
          <span className={isDarkBg ? 'text-white' : 'text-[#004A2B]'}>Eco</span>
          <span className="text-[#57B900]">Shine</span>
        </div>
        <div className="flex items-center justify-between text-[8px] sm:text-[9.5px] font-black uppercase tracking-[0.28em] mt-1">
          <span className={`h-px w-2 sm:w-3 ${isDarkBg ? 'bg-white/40' : 'bg-[#004A2B]/40'}`} />
          <span className={isDarkBg ? 'text-emerald-100' : 'text-[#004A2B]'}>CLEANERS</span>
          <span className={`h-px w-2 sm:w-3 ${isDarkBg ? 'bg-white/40' : 'bg-[#004A2B]/40'}`} />
        </div>
        {showTagline && (
          <div className="hidden sm:block text-[6.5px] sm:text-[7px] font-bold uppercase tracking-wider text-gray-500 mt-0.5">
            Clean Spaces. Healthy Spaces. Happy Spaces.
          </div>
        )}
      </div>
    </div>
  );
};
