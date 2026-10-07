import React from 'react';
import { REGIONS } from '../data/cleaningData';
import { Region } from '../types';

interface MobileStickyBarProps {
  onOpenQuote: () => void;
  selectedRegion: Region;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  onOpenQuote,
  selectedRegion,
}) => {
  const regionConfig = REGIONS[selectedRegion];

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-3 py-2.5 shadow-2xl flex items-center justify-between gap-3 safe-bottom"
      data-purpose="mobile-sticky-action"
    >
      <a
        href={`tel:${regionConfig.phoneRaw}`}
        className="flex-1 py-2.5 px-3 bg-[#F4FAEF] hover:bg-[#DDF3C7] text-[#004A2B] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-emerald-900/10 transition"
      >
        <span>📞</span>
        <span>Call Local Team</span>
      </a>

      <button
        onClick={onOpenQuote}
        className="flex-1 py-2.5 px-4 bg-[#57B900] hover:bg-[#4ea600] text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-md shadow-[#57B900]/25 transition cursor-pointer"
      >
        <span>Get Price</span>
        <span>→</span>
      </button>
    </div>
  );
};
