import React from 'react';
import { Logo } from './Logo';
import { ActiveScreen, Region } from '../types';
import { REGIONS } from '../data/cleaningData';

interface FooterProps {
  onNavigate: (screen: ActiveScreen) => void;
  selectedRegion: Region;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, selectedRegion }) => {
  const regionConfig = REGIONS[selectedRegion];

  return (
    <footer
      className="bg-[#004A2B] text-white pt-14 pb-8 border-t-4 border-[#57B900]"
      data-purpose="site-footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/15">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white inline-block p-2 rounded-xl shadow-xs">
              <Logo className="h-12 w-auto" variant="light" showTagline={false} />
            </div>
            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              EcoShine Cleaners is {regionConfig.name.split('&')[0]}’s premier eco-conscious home &
              commercial cleaning provider. Clean spaces. Healthy spaces. Happy spaces.
            </p>

            {/* Eco Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="bg-white/10 text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                🐰 Cruelty-Free
              </span>
              <span className="bg-white/10 text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                🌱 100% Vegan
              </span>
              <span className="bg-white/10 text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                🌍 Carbon Offset
              </span>
            </div>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#57B900] uppercase tracking-wider">
              Cleaning Services
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition text-left"
                >
                  Regular Domestic Care
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition text-left"
                >
                  Deep Spring Revival
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition text-left"
                >
                  End of Tenancy Move
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition text-left"
                >
                  Holiday Let & Airbnb
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition text-left"
                >
                  Commercial & Offices
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition text-left"
                >
                  Carpet & Upholstery Steam
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Service Areas */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#57B900] uppercase tracking-wider">
              Primary Service Areas
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {regionConfig.name.includes('Southampton') ? (
                <>
                  <li>Southampton City Centre (SO14)</li>
                  <li>Ocean Village & Woolston (SO14/SO19)</li>
                  <li>Bassett, Chilworth & Highfield (SO16/SO17)</li>
                  <li>Shirley & Millbrook (SO15)</li>
                  <li>Eastleigh & Chandlers Ford</li>
                  <li>Romsey & Test Valley</li>
                </>
              ) : (
                <>
                  <li>Northampton Town Centre (NN1)</li>
                  <li>Abington & Kingsthorpe (NN2/NN3)</li>
                  <li>Duston & Upton (NN5)</li>
                  <li>Wootton & Grange Park (NN4)</li>
                  <li>Kettering & Corby (NN15/NN17)</li>
                  <li>Wellingborough & Rushden (NN8/NN10)</li>
                  <li>Daventry & Towcester (NN11/NN12)</li>
                </>
              )}
            </ul>
          </div>

          {/* Col 5: Hub Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#57B900] uppercase tracking-wider">
              {regionConfig.name.includes('Northampton') ? 'Northamptonshire HQ' : 'Regional Hub'}
            </h3>
            <div className="text-xs text-slate-300 space-y-2">
              <p className="flex items-start gap-1.5">
                <span>📍</span>
                <span>{regionConfig.address}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <span>📞</span>
                <a
                  className="text-white font-bold hover:text-[#57B900] transition"
                  href={`tel:${regionConfig.phoneRaw}`}
                >
                  {regionConfig.phone}
                </a>
              </p>
              <p className="flex items-center gap-1.5">
                <span>✉️</span>
                <a
                  className="hover:text-white transition"
                  href={`mailto:${regionConfig.email}`}
                >
                  {regionConfig.email}
                </a>
              </p>
              <p className="flex items-center gap-1.5 pt-1 text-slate-400">
                <span>⏰</span>
                <span>Mon–Sat: 8am–6:30pm</span>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© 2026 EcoShine Cleaners Ltd. Registered in England & Wales. All rights reserved.</p>
          <div className="flex space-x-5">
            <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition">Health & Safety Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
