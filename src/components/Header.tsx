import React, { useState } from 'react';
import { Logo } from './Logo';
import { ActiveScreen } from '../types';
import { BUSINESS } from '../config';

interface HeaderProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  onOpenBooking: () => void;
}

const RESIDENTIAL_LINKS: { label: string; screen: ActiveScreen }[] = [
  { label: 'Regular Cleaning', screen: 'regular' },
  { label: 'Deep Cleaning', screen: 'deep' },
  { label: 'End of Tenancy', screen: 'tenancy' },
];
const RESIDENTIAL_SCREENS: ActiveScreen[] = ['regular', 'deep', 'tenancy'];

const PhoneIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2z" />
  </svg>
);

export const Header: React.FC<HeaderProps> = ({ activeScreen, onNavigate, onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [residentialOpen, setResidentialOpen] = useState(false);
  const regionConfig = BUSINESS;

  const go = (screen: ActiveScreen) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
    setResidentialOpen(false);
  };

  const navClass = (active: boolean) =>
    `px-3 py-2 rounded-lg text-[15px] font-semibold transition ${
      active ? 'text-[#004A2B]' : 'text-[#18201C] hover:text-[#004A2B]'
    }`;

  return (
    <>
      {/* Promo strip */}
      <div className="bg-[#004A2B] text-white text-sm py-2 px-4 text-center">
        <span>New customers get <strong>£10 off</strong> your first clean.</span>{' '}
        <button onClick={() => go('quote')} className="underline underline-offset-2 font-semibold hover:text-[#DDF3C7]">
          Claim your offer
        </button>
      </div>

      <header className="bg-white sticky top-0 z-40 border-b border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[76px] flex items-center justify-between gap-4">
          <button onClick={() => go('home')} className="flex items-center text-left" aria-label="EcoShine Cleaners home">
            <Logo className="h-11 sm:h-12" variant="light" showTagline={false} />
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            <div
              className="relative"
              onMouseEnter={() => setResidentialOpen(true)}
              onMouseLeave={() => setResidentialOpen(false)}
            >
              <button
                className={navClass(RESIDENTIAL_SCREENS.includes(activeScreen)) + ' flex items-center gap-1'}
                onClick={() => go('regular')}
                aria-haspopup="true"
                aria-expanded={residentialOpen}
              >
                Residential
                <svg className="w-3.5 h-3.5 mt-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4z" clipRule="evenodd" />
                </svg>
              </button>
              {residentialOpen && (
                <div className="absolute left-0 top-full pt-2">
                  <div className="bg-white border border-gray-200 rounded-xl shadow-lg py-2 w-56">
                    {RESIDENTIAL_LINKS.map((l) => (
                      <button
                        key={l.screen}
                        onClick={() => go(l.screen)}
                        className="w-full text-left px-4 py-2.5 text-sm font-medium text-[#18201C] hover:bg-[#F4FAEF] hover:text-[#004A2B]"
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => go('commercial')} className={navClass(activeScreen === 'commercial')}>
              Commercial
            </button>
            <button onClick={() => go('faq')} className={navClass(activeScreen === 'faq')}>
              FAQs
            </button>
            <button onClick={() => go('quote')} className={navClass(activeScreen === 'quote')}>
              Get a Quote
            </button>
            <button onClick={() => go('contact')} className={navClass(activeScreen === 'contact')}>
              Contact Us
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end leading-tight">
              <a
                href={`tel:${regionConfig.phoneRaw}`}
                className="inline-flex items-center gap-2 text-[15px] font-bold text-[#004A2B] hover:text-[#57B900] transition"
              >
                <PhoneIcon />
                {regionConfig.phone}
              </a>
              <a
                href={`tel:${regionConfig.phone2Raw}`}
                className="hidden xl:inline text-xs font-semibold text-gray-600 hover:text-[#57B900] transition"
              >
                or {regionConfig.phone2}
              </a>
            </div>
            <button onClick={onOpenBooking} className="hidden sm:inline-flex btn-accent text-sm py-2.5 px-5">
              Book now
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-2 pb-5">
            <p className="px-3 pt-3 pb-1 text-xs font-semibold text-gray-500">Residential</p>
            {RESIDENTIAL_LINKS.map((l) => (
              <button
                key={l.screen}
                onClick={() => go(l.screen)}
                className="w-full text-left px-3 py-2.5 rounded-lg text-[15px] font-semibold text-[#18201C] hover:bg-[#F4FAEF]"
              >
                {l.label}
              </button>
            ))}
            <div className="h-px bg-gray-100 my-2" />
            {([
              ['Commercial cleaning', () => go('commercial')],
              ['FAQs', () => go('faq')],
              ['Get a quote', () => go('quote')],
              ['Contact us', () => go('contact')],
            ] as [string, () => void][]).map(([label, fn]) => (
              <button
                key={label}
                onClick={fn}
                className="w-full text-left px-3 py-2.5 rounded-lg text-[15px] font-semibold text-[#18201C] hover:bg-[#F4FAEF]"
              >
                {label}
              </button>
            ))}
            <p className="pt-4 px-3 text-sm text-gray-600">
              Call <a href={`tel:${regionConfig.phoneRaw}`} className="font-bold text-[#004A2B]">{regionConfig.phone}</a>
              {' '}or{' '}
              <a href={`tel:${regionConfig.phone2Raw}`} className="font-bold text-[#004A2B]">{regionConfig.phone2}</a>
            </p>
            <div className="pt-3 grid grid-cols-2 gap-2">
              <a href={`tel:${regionConfig.phoneRaw}`} className="btn-secondary text-sm">
                Call now
              </a>
              <button onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }} className="btn-accent text-sm">
                Book now
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
