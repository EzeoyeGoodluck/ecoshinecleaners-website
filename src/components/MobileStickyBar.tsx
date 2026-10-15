import React from 'react';
import { BUSINESS } from '../config';

interface MobileStickyBarProps {
  onOpenBooking: () => void;
}

const WhatsAppIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 1.8a8.2 8.2 0 1 1-4.2 15.3l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8zm-3.3 4.4c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.2 5 4.4 2.5 1 3 .8 3.5.7.6 0 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4l-.5-.3-2-.9c-.2-.1-.4-.2-.6.1l-.9 1.1c-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.5-1.7-1.6-2-.2-.3 0-.4.1-.6l.4-.5.3-.5v-.5l-.9-2.2c-.2-.5-.5-.5-.6-.5z" />
  </svg>
);

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenBooking }) => {
  const regionConfig = BUSINESS;

  return (
    <>
      {/* Floating WhatsApp button */}
      <a
        href={regionConfig.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed right-4 bottom-20 lg:bottom-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center hover:scale-105 transition"
      >
        <WhatsAppIcon />
      </a>

      {/* Mobile sticky bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-3 pt-2.5 safe-bottom grid grid-cols-2 gap-2">
        <button onClick={onOpenBooking} className="btn-accent text-sm py-3">
          Book now
        </button>
        <a href={`tel:${regionConfig.phoneRaw}`} className="btn-secondary text-sm py-3">
          Call
        </a>
      </div>
    </>
  );
};
