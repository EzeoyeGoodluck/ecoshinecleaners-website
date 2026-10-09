import React, { useState } from 'react';
import { REGION_ZONES, REGIONS } from '../data/cleaningData';
import { Region } from '../types';

interface ServiceAreasViewProps {
  selectedRegion: Region;
  onOpenQuote: () => void;
}

export const ServiceAreasView: React.FC<ServiceAreasViewProps> = ({
  selectedRegion,
  onOpenQuote,
}) => {
  const regionConfig = REGIONS[selectedRegion];
  const [searchTerm, setSearchTerm] = useState('');

  const currentZones = REGION_ZONES[selectedRegion] || [];

  const filteredZones = currentZones.filter(
    (z) =>
      z.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      z.areaName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      z.suburbs.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase text-[#57B900] tracking-widest block mb-2">
          Local Coverage Matrix
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18201C]">
          Service Areas & Daily Eco-Routes
        </h1>
        <p className="mt-3 text-gray-600 text-sm sm:text-base">
          Our zero-emission mobile cleaning vans cover all principal postcodes across{' '}
          {regionConfig.name}. We guarantee punctual arrivals, verified key holding, and zero travel surcharges.
        </p>

        {/* Live Search */}
        <div className="mt-6 max-w-md mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              selectedRegion === 'northampton'
                ? "Search your town or postcode (e.g. Northampton, NN1, Kettering, Towcester)..."
                : "Search your town, suburb or postcode (e.g. Ocean Village, SO14, Romsey)..."
            }
            className="w-full p-3.5 rounded-2xl border border-gray-300 text-sm focus:ring-[#57B900] focus:border-[#57B900] bg-white shadow-xs"
          />
        </div>
      </div>

      {/* Grid of zones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredZones.map((zone, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-emerald-900/10 p-6 shadow-sm hover:shadow-md hover:border-[#57B900] transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-[#004A2B] text-white rounded-lg text-xs font-extrabold">
                  {zone.code}
                </span>
                <span className="text-xs font-bold text-[#57B900] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#57B900] animate-pulse" />
                  {zone.status}
                </span>
              </div>
              <h2 className="text-lg font-bold text-[#18201C]">{zone.areaName}</h2>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">{zone.suburbs}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-500">Zero Travel Surcharge</span>
              <button
                onClick={onOpenQuote}
                className="text-xs font-bold text-[#004A2B] hover:text-[#57B900] py-1 px-3 rounded-lg bg-[#F4FAEF] hover:bg-[#DDF3C7] transition"
              >
                Book in {zone.code.split('&')[0].trim()} →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Banner */}
      <div className="bg-[#004A2B] text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <span className="bg-[#57B900] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            Specialist Out-of-Area Requests
          </span>
          <h2 className="text-2xl font-extrabold text-white">Live just outside our primary boundary?</h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
            We routinely add bespoke cleaning slots for neighbouring villages and rural homes across{' '}
            {regionConfig.name.split('&')[1] || 'the county'}. Give us a quick call to check route timings.
          </p>
        </div>
        <a
          href={`tel:${regionConfig.phoneRaw}`}
          className="bg-[#57B900] hover:bg-[#4ea600] text-white font-bold py-3.5 px-6 rounded-xl text-sm shrink-0 shadow-md transition"
        >
          Call Dispatch on {regionConfig.phone}
        </a>
      </div>
    </div>
  );
};
