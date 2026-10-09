import React, { useState } from 'react';
import { Logo } from './Logo';
import { ActiveScreen, Region } from '../types';
import { REGIONS } from '../data/cleaningData';

interface HeaderProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  onOpenQuote: () => void;
  selectedRegion: Region;
  onSelectRegion: (region: Region) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  onNavigate,
  onOpenQuote,
  selectedRegion,
  onSelectRegion,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const regionConfig = REGIONS[selectedRegion];

  const handleNav = (screen: ActiveScreen) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* BEGIN: Top Announcement Utility Bar */}
      <aside
        className="bg-[#004A2B] text-white text-xs font-medium py-2.5 px-4 border-b border-white/10"
        data-purpose="announcement-bar"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
          {/* USP Highlight & Region Indicator */}
          <div className="flex items-center space-x-2">
            <span className="inline-block">
              🌿 100% Non-Toxic, Plant-Based & Pet-Safe Cleaning Across {regionConfig.name}
            </span>
          </div>

          {/* Region Switcher & Contact Quick Info */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-slate-200">
            {/* Region Selector */}
            <div className="inline-flex items-center bg-white/10 rounded-full px-2.5 py-0.5 text-[11px] font-semibold">
              <span className="text-emerald-300 mr-1.5">📍 Hub:</span>
              <select
                value={selectedRegion}
                onChange={(e) => onSelectRegion(e.target.value as Region)}
                className="bg-transparent text-white border-0 text-[11px] font-bold focus:ring-0 cursor-pointer pr-4 py-0"
                aria-label="Select service hub region"
              >
                <option value="northampton" className="bg-[#004A2B] text-white">
                  Northamptonshire (HQ)
                </option>
                <option value="southampton" className="bg-[#004A2B] text-white">
                  Southampton & Hampshire
                </option>
              </select>
            </div>

            <a
              className="hover:text-[#57B900] transition-colors flex items-center gap-1.5"
              href={`tel:${regionConfig.phoneRaw}`}
            >
              <span>📞</span>
              <span className="font-semibold text-white">{regionConfig.phone}</span>
            </a>

            <a
              className="hover:text-[#57B900] transition-colors flex items-center gap-1.5 hidden sm:flex"
              href={`mailto:${regionConfig.email}`}
            >
              <span>✉️</span>
              <span>{regionConfig.email}</span>
            </a>

            <span className="hidden lg:inline text-white/40">|</span>
            <span className="hidden lg:inline text-slate-300">Mon–Sat: 8:00am–6:30pm</span>
          </div>
        </div>
      </aside>
      {/* END: TopBar */}

      {/* BEGIN: MainHeader */}
      <header
        className="bg-white sticky top-0 z-40 shadow-xs border-b border-emerald-900/10"
        data-purpose="main-navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left focus:outline-hidden"
            aria-label="Go to Home"
          >
            <Logo className="h-12 sm:h-14" variant="light" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-[15px] font-semibold text-[#18201C]">
            <button
              onClick={() => handleNav('home')}
              className={`px-3.5 py-2 rounded-lg transition ${
                activeScreen === 'home'
                  ? 'bg-[#DDF3C7] text-[#004A2B] font-bold'
                  : 'hover:text-[#004A2B] hover:bg-[#F4FAEF]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('services')}
              className={`px-3.5 py-2 rounded-lg transition ${
                activeScreen === 'services'
                  ? 'bg-[#DDF3C7] text-[#004A2B] font-bold'
                  : 'hover:text-[#004A2B] hover:bg-[#F4FAEF]'
              }`}
            >
              Services & Pricing
            </button>
            <button
              onClick={() => handleNav('areas')}
              className={`px-3.5 py-2 rounded-lg transition ${
                activeScreen === 'areas'
                  ? 'bg-[#DDF3C7] text-[#004A2B] font-bold'
                  : 'hover:text-[#004A2B] hover:bg-[#F4FAEF]'
              }`}
            >
              Service Areas
            </button>
            <button
              onClick={() => handleNav('reviews')}
              className={`px-3.5 py-2 rounded-lg transition ${
                activeScreen === 'reviews'
                  ? 'bg-[#DDF3C7] text-[#004A2B] font-bold'
                  : 'hover:text-[#004A2B] hover:bg-[#F4FAEF]'
              }`}
            >
              Reviews
            </button>
            <button
              onClick={() => handleNav('contact')}
              className={`px-3.5 py-2 rounded-lg transition ${
                activeScreen === 'contact'
                  ? 'bg-[#DDF3C7] text-[#004A2B] font-bold'
                  : 'hover:text-[#004A2B] hover:bg-[#F4FAEF]'
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden xl:flex flex-col text-right">
              <span className="text-[11px] uppercase font-bold text-gray-500 tracking-wider">
                Bookings & Advice
              </span>
              <a
                className="text-base font-extrabold text-[#004A2B] hover:text-[#57B900] transition"
                href={`tel:${regionConfig.phoneRaw}`}
              >
                {regionConfig.phone}
              </a>
            </div>

            <button
              onClick={onOpenQuote}
              className="hidden md:flex bg-[#57B900] hover:bg-[#4ea600] text-white font-bold px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl shadow-md shadow-[#57B900]/25 hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-xs sm:text-sm items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Get Instant Quote</span>
              <span className="text-base sm:text-lg">→</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
            <button
              onClick={() => handleNav('home')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold ${
                activeScreen === 'home' ? 'bg-[#DDF3C7] text-[#004A2B]' : 'text-[#18201C]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('services')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold ${
                activeScreen === 'services' ? 'bg-[#DDF3C7] text-[#004A2B]' : 'text-[#18201C]'
              }`}
            >
              Services & Pricing
            </button>
            <button
              onClick={() => handleNav('areas')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold ${
                activeScreen === 'areas' ? 'bg-[#DDF3C7] text-[#004A2B]' : 'text-[#18201C]'
              }`}
            >
              Service Areas
            </button>
            <button
              onClick={() => handleNav('reviews')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold ${
                activeScreen === 'reviews' ? 'bg-[#DDF3C7] text-[#004A2B]' : 'text-[#18201C]'
              }`}
            >
              Reviews
            </button>
            <button
              onClick={() => handleNav('contact')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold ${
                activeScreen === 'contact' ? 'bg-[#DDF3C7] text-[#004A2B]' : 'text-[#18201C]'
              }`}
            >
              Contact Us
            </button>

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <a
                href={`tel:${regionConfig.phoneRaw}`}
                className="w-full text-center py-2.5 rounded-lg bg-[#F4FAEF] text-[#004A2B] font-bold text-sm"
              >
                📞 Call {regionConfig.phone}
              </a>
              <button
                onClick={() => handleNav('contact')}
                className="w-full text-center py-2.5 rounded-lg bg-[#004A2B] text-white font-bold text-sm shadow-sm"
              >
                ✉️ Contact Local Team
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
