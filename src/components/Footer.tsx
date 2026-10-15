import React from 'react';
import { Logo } from './Logo';
import { ActiveScreen } from '../types';
import { BUSINESS } from '../config';

interface FooterProps {
  onNavigate: (screen: ActiveScreen) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const regionConfig = BUSINESS;
  const displayPhone = regionConfig.phone;
  const year = new Date().getFullYear();

  const links: [string, ActiveScreen][] = [
    ['Home', 'home'],
    ['Regular cleaning', 'regular'],
    ['Deep cleaning', 'deep'],
    ['End of tenancy', 'tenancy'],
    ['Commercial cleaning', 'commercial'],
    ['FAQs', 'faq'],
    ['Get a quote', 'quote'],
    ['Contact us', 'contact'],
  ];

  return (
    <footer className="bg-[#0F2B1E] text-white pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/10">
          <div className="lg:col-span-2 space-y-4">
            <Logo className="h-11" variant="dark" showTagline={false} />
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Plant-based domestic and commercial cleaning across {regionConfig.areaLong}.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-sm mb-3">Quick links</h3>
            <ul className="space-y-2 text-sm text-white/70">
              {links.map(([label, screen]) => (
                <li key={label}>
                  <button onClick={() => onNavigate(screen)} className="hover:text-white transition text-left">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href={`tel:${regionConfig.phoneRaw}`} className="hover:text-white transition">{displayPhone}</a>
              </li>
              <li>
                <a href={`tel:${regionConfig.phone2Raw}`} className="hover:text-white transition">{regionConfig.phone2}</a>
              </li>
              <li>
                <a href={`mailto:${regionConfig.email}`} className="hover:text-white transition">{regionConfig.email}</a>
              </li>
              <li>Serving {regionConfig.areaLong}</li>
              <li>{regionConfig.hours}</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 text-xs text-white/55 space-y-1.5">
          <p>© {year} EcoShine Cleaners. Registered in England and Wales.</p>
          <p>Fully insured for public liability. DBS-checked cleaners.</p>
          <p>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition">Privacy policy</button>
          </p>
        </div>
      </div>
    </footer>
  );
};
