import React, { useState } from 'react';
import { ServiceType, ActiveScreen, Region, BookingState } from '../types';
import { CLEANING_PACKAGES, REVIEWS, REGIONS } from '../data/cleaningData';
import heroSuppliesImg from '../assets/images/hero_cleaning_supplies_1791129317063.jpg';
import cleanerPortraitImg from '../assets/images/cleaner_portrait_1791129329275.jpg';
import livingRoomImg from '../assets/images/eco_home_living_room_1791129344773.jpg';

interface HomeViewProps {
  onNavigate: (screen: ActiveScreen) => void;
  onOpenQuote: (service?: ServiceType, initialData?: Partial<BookingState>) => void;
  selectedRegion: Region;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenQuote,
  selectedRegion,
}) => {
  const regionConfig = REGIONS[selectedRegion];

  // Postcode check state
  const [postcodeInput, setPostcodeInput] = useState('');
  const [postcodeStatus, setPostcodeStatus] = useState<'idle' | 'covered' | 'uncovered'>('idle');

  // Interactive Calculator State
  const [calcService, setCalcService] = useState<ServiceType>('regular');
  const [calcFreq, setCalcFreq] = useState('weekly');
  const [calcBeds, setCalcBeds] = useState(3);
  const [calcBaths, setCalcBaths] = useState(2);
  const [calcPostcode, setCalcPostcode] = useState(regionConfig.samplePostcode);
  const [calcPhone, setCalcPhone] = useState('');

  // Calculate live estimate
  const getEstimatedPrice = () => {
    let base = 0;
    let hours = 3.0;

    if (calcService === 'regular') {
      hours = Math.max(2, calcBeds * 0.75 + calcBaths * 0.6);
      base = hours * 18.5;
      if (calcFreq === 'weekly') base *= 0.85;
      else if (calcFreq === 'fortnightly') base *= 0.90;
      else if (calcFreq === 'monthly') base *= 0.95;
    } else if (calcService === 'deep') {
      base = 120 + (calcBeds - 1) * 20 + (calcBaths - 1) * 15;
      hours = Math.max(4, calcBeds * 1.2 + calcBaths * 1.0);
    } else if (calcService === 'tenancy') {
      base = 165 + (calcBeds - 1) * 25 + (calcBaths - 1) * 20;
      hours = Math.max(5, calcBeds * 1.4 + calcBaths * 1.2);
    } else {
      base = 140;
      hours = 3.5;
    }

    return {
      price: Math.round(base),
      hours: Math.round(hours * 10) / 10,
    };
  };

  const estimated = getEstimatedPrice();

  const handleCheckPostcode = (code?: string) => {
    const val = (code || postcodeInput).trim().toUpperCase();
    if (!val) return;
    const isCovered = regionConfig.postcodePrefixes.some((prefix) =>
      val.startsWith(prefix)
    ) || val.length >= 3;
    setPostcodeStatus(isCovered ? 'covered' : 'uncovered');
  };

  const popularAreasSouthampton = [
    'Ocean Village',
    'Bassett',
    'Shirley',
    'Romsey',
    'Eastleigh',
    'Winchester',
  ];

  const popularAreasNorthampton = [
    'Abington',
    'Duston',
    'Kingsthorpe',
    'Wootton',
    'Daventry',
    'Towcester',
  ];

  const popularAreas =
    selectedRegion === 'southampton' ? popularAreasSouthampton : popularAreasNorthampton;

  return (
    <div className="w-full">
      {/* BEGIN: HeroSection */}
      <section
        className="py-10 sm:py-16 bg-gradient-to-b from-[#F4FAEF] to-white relative overflow-hidden border-b border-emerald-900/5"
        data-purpose="hero-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Hero Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#DDF3C7] text-[#004A2B] font-extrabold text-xs tracking-wider uppercase px-3.5 py-1.5 rounded-full border border-[#004A2B]/15">
                <span>🌿</span>
                <span>ZERO HARSH TOXINS • 100% BIODEGRADABLE CLEANING</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-[#18201C] leading-[1.15] tracking-tight">
                Sparkling Clean Homes,{' '}
                <span className="text-[#004A2B] underline decoration-[#57B900] decoration-4 underline-offset-4">
                  Powered by Nature.
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl">
                Professional, non-toxic domestic and commercial cleaning tailored for{' '}
                <strong className="text-[#004A2B]">{regionConfig.name}</strong>, including{' '}
                {regionConfig.tagline}. Breathe pure, fresh air without chlorine or petrochemical
                residues.
              </p>

              {/* Interactive Postcode Availability Checker */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-900/10 shadow-sm space-y-3">
                <span className="text-xs uppercase font-extrabold text-gray-500 tracking-wider block">
                  Check Availability in Your Neighbourhood:
                </span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-grow">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      📍
                    </span>
                    <input
                      type="text"
                      placeholder={`Enter postcode (e.g. ${regionConfig.postcodePrefixes.slice(0, 3).join(', ')})...`}
                      value={postcodeInput}
                      onChange={(e) => {
                        setPostcodeInput(e.target.value.toUpperCase());
                        setPostcodeStatus('idle');
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && handleCheckPostcode()}
                      className="w-full pl-9 pr-3 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold uppercase focus:ring-[#57B900] focus:border-[#57B900]"
                    />
                  </div>
                  <button
                    onClick={() => handleCheckPostcode()}
                    className="bg-[#004A2B] hover:bg-black text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl transition flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <span>Check Availability</span>
                    <span>✓</span>
                  </button>
                </div>

                {/* Feedback status */}
                {postcodeStatus === 'covered' && (
                  <div className="p-3 bg-[#DDF3C7] text-[#004A2B] rounded-xl text-xs font-bold flex items-center justify-between animate-in fade-in">
                    <span>
                      🎉 Great news! We have active eco-cleaning slots available in your sector this week.
                    </span>
                    <button
                      onClick={() => onOpenQuote('regular')}
                      className="underline font-black hover:text-black"
                    >
                      Book Now →
                    </button>
                  </div>
                )}
                {postcodeStatus === 'uncovered' && (
                  <div className="p-3 bg-amber-50 text-amber-900 rounded-xl text-xs font-semibold flex items-center justify-between animate-in fade-in">
                    <span>
                      We frequently accommodate surrounding postal routes with zero travel charge.
                    </span>
                    <a href={`tel:${regionConfig.phoneRaw}`} className="underline font-bold">
                      Call {regionConfig.phone}
                    </a>
                  </div>
                )}

                {/* Popular areas */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs text-gray-500">
                  <span className="font-semibold text-gray-400">Popular Areas:</span>
                  {popularAreas.map((area) => (
                    <button
                      key={area}
                      onClick={() => {
                        setPostcodeInput(area);
                        handleCheckPostcode(area);
                      }}
                      className="px-2.5 py-1 bg-[#F4FAEF] hover:bg-[#DDF3C7] hover:text-[#004A2B] text-gray-700 rounded-md text-[11px] font-semibold transition"
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <button
                  onClick={() => onOpenQuote('regular')}
                  className="bg-[#57B900] hover:bg-[#4ea600] text-white font-extrabold px-6 py-3.5 rounded-xl shadow-md shadow-[#57B900]/25 hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Get an Instant Quote</span>
                  <span>→</span>
                </button>
                <button
                  onClick={() => onNavigate('services')}
                  className="bg-white border-2 border-gray-200 hover:border-[#004A2B] text-[#18201C] font-bold px-6 py-3.5 rounded-xl transition text-sm sm:text-base"
                >
                  View Rates & Services
                </button>
              </div>

              {/* Trust Checkmarks */}
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-gray-700">
                <span className="flex items-center gap-1.5">
                  <span className="text-[#57B900] font-bold">✓</span> DBS-Vetted Cleaners
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#57B900] font-bold">✓</span> 100% Plant-Based
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#57B900] font-bold">✓</span> 24h Re-Clean Guarantee
                </span>
              </div>
            </div>

            {/* Hero Right Visual Showcase (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
                <img
                  src={livingRoomImg}
                  alt="Bright sunlit living room with natural botanical cleaning solutions on countertop"
                  className="w-full h-[440px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 bg-[#004A2B]/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl border border-white/20 text-xs font-bold flex items-center gap-2">
                  <span className="text-[#57B900]">★</span>
                  <span>{regionConfig.name.includes('Southampton') ? "HAMPSHIRE'S CHOICE" : "NORTHANTS CHOICE"}</span>
                  <span className="text-white/40">|</span>
                  <span className="text-emerald-200">#1 Eco Cleaning Service</span>
                </div>

                {/* Bottom Trust Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={cleanerPortraitImg}
                      alt="Local friendly vetted cleaner portrait"
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#57B900]"
                    />
                    <div>
                      <p className="text-xs font-extrabold text-[#004A2B] uppercase tracking-wider">
                        Vetted Local Crew
                      </p>
                      <p className="text-xs text-gray-600">Enhanced DBS & Living Wage</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-[#18201C] flex items-center gap-1">
                      <span>4.9</span>
                      <span className="text-[#57B900]">★★★★★</span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-semibold">340+ verified local homes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: HeroSection */}

      {/* BEGIN: Trust Stats Bar */}
      <section className="bg-[#004A2B] text-white py-8 border-y border-emerald-900/20" data-purpose="trust-stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:text-left">
            {/* Stat 1 */}
            <div className="p-3 border-r border-white/10 last:border-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">340+</div>
              <div className="text-xs font-bold text-[#57B900] mt-0.5">Verified Local Reviews</div>
              <div className="text-[11px] text-slate-300 mt-1">4.9 / 5.0 Average Rating</div>
            </div>
            {/* Stat 2 */}
            <div className="p-3 border-r border-white/10 last:border-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">100%</div>
              <div className="text-xs font-bold text-[#57B900] mt-0.5">Plant-Powered & Pet Safe</div>
              <div className="text-[11px] text-slate-300 mt-1">Essential oils & zero toxic fumes</div>
            </div>
            {/* Stat 3 */}
            <div className="p-3 border-r border-white/10 last:border-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">£2M</div>
              <div className="text-xs font-bold text-[#57B900] mt-0.5">Liability Insured</div>
              <div className="text-[11px] text-slate-300 mt-1">Enhanced DBS screened key-holders</div>
            </div>
            {/* Stat 4 */}
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">0%</div>
              <div className="text-xs font-bold text-[#57B900] mt-0.5">Harsh Petrochemicals</div>
              <div className="text-[11px] text-slate-300 mt-1">No chlorine, ammonia or phosphates</div>
            </div>
          </div>
        </div>
      </section>
      {/* END: Trust Stats Bar */}

      {/* BEGIN: Package Overview Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-purpose="services-overview">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase text-[#57B900] tracking-widest block mb-2">
            Tailored Cleaning Solutions
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#18201C]">
            Impeccable Standards. Absolutely Zero Toxins.
          </h2>
          <p className="mt-3 text-gray-600 text-sm sm:text-base">
            Every clean utilizes medical-grade HEPA filtration vacuums and lab-certified biodegradable
            plant detergents that leave your home smelling like crisp botanical gardens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {CLEANING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white rounded-2xl border-2 transition-all flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl ${
                pkg.badgeType === 'highlight'
                  ? 'border-[#57B900] ring-2 ring-[#57B900]/20'
                  : 'border-emerald-900/10 hover:border-[#004A2B]/40'
              }`}
            >
              {pkg.badge && (
                <div
                  className={`text-center py-1.5 text-[11px] font-extrabold uppercase tracking-wider ${
                    pkg.badgeType === 'highlight'
                      ? 'bg-[#57B900] text-white'
                      : pkg.badgeType === 'primary'
                      ? 'bg-[#DDF3C7] text-[#004A2B]'
                      : pkg.badgeType === 'accent'
                      ? 'bg-emerald-100 text-emerald-900'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {pkg.badge}
                </div>
              )}

              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-[#18201C]">{pkg.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{pkg.shortDesc}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#004A2B]">{pkg.priceDisplay}</span>
                  <span className="text-xs text-gray-500">{pkg.priceSub}</span>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <ul className="space-y-3 text-xs text-gray-700">
                  {pkg.features.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#57B900] font-bold shrink-0">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onOpenQuote(pkg.id)}
                  className={`mt-6 w-full py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    pkg.badgeType === 'highlight'
                      ? 'bg-[#57B900] hover:bg-[#4ea600] text-white shadow-md'
                      : 'bg-[#004A2B] hover:bg-black text-white'
                  }`}
                >
                  <span>{pkg.ctaLabel}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* END: Package Overview Grid */}

      {/* BEGIN: The EcoShine Guarantee */}
      <section className="py-16 bg-[#F4FAEF] border-y border-emerald-900/10" data-purpose="guarantee-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold text-[#57B900] uppercase tracking-wider">
              Pure Clean, No Compromise
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18201C] mt-1">
              The EcoShine Pure Living Guarantee
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              Traditional cleaners leave behind lingering toxic volatile compounds. We believe a truly
              clean home should protect your lungs, pets, and {regionConfig.riverOrWaterway}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-900/10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#DDF3C7] text-2xl flex items-center justify-center mb-4">
                  🌱
                </div>
                <h3 className="text-lg font-bold text-[#004A2B]">100% Plant-Based Formulations</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2.5 leading-relaxed">
                  We exclusively use plant-derived active surfactants, organic white vinegar extracts,
                  and pure essential oils. Zero chlorine bleach, artificial synthetic scents, or endocrine
                  disruptors. Safe for crawling infants and curious pets.
                </p>
              </div>
              <button
                onClick={() => onNavigate('services')}
                className="mt-6 text-xs font-bold text-[#004A2B] hover:text-[#57B900] flex items-center gap-1"
              >
                <span>Read our ingredient pledge</span>
                <span>→</span>
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-900/10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-2xl flex items-center justify-center mb-4">
                  🛡️
                </div>
                <h3 className="text-lg font-bold text-[#004A2B]">Rigorous DBS Vetting & Insurance</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2.5 leading-relaxed">
                  Every EcoShine cleaner undergoes in-person interviews, full enhanced background checks,
                  reference verifications, and professional training. Backed by our comprehensive
                  £2,000,000 public liability insurance.
                </p>
              </div>
              <button
                onClick={() => onNavigate('contact')}
                className="mt-6 text-xs font-bold text-[#004A2B] hover:text-[#57B900] flex items-center gap-1"
              >
                <span>Fully vetted local keyholders</span>
                <span>→</span>
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-900/10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#DDF3C7] text-2xl flex items-center justify-center mb-4">
                  💛
                </div>
                <h3 className="text-lg font-bold text-[#004A2B]">100% Happiness Guarantee</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2.5 leading-relaxed">
                  Your complete delight is our only metric. If any corner, baseboard, or surface isn’t
                  cleaned to pristine perfection, let us know within 24 hours and our team will
                  promptly return to re-clean the area completely free of charge.
                </p>
              </div>
              <span className="mt-6 text-xs font-bold text-[#57B900]">
                Zero-hassle re-clean promise ✓
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* END: The EcoShine Guarantee */}

      {/* BEGIN: 3-Step Process */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-purpose="how-it-works">
        <span className="text-xs font-extrabold uppercase text-[#57B900] tracking-widest block mb-2">
          Effortless Routine
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18201C] mb-12">
          How EcoShine Works in 3 Simple Steps
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#004A2B] text-white font-extrabold text-xl flex items-center justify-center mb-4 shadow-md">
              1
            </div>
            <h3 className="font-bold text-base text-[#18201C]">Book Online in 60 Seconds</h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed max-w-xs">
              Select your postcode, number of bedrooms, and preferred schedule. Transparent fixed
              pricing with zero surprises.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#57B900] text-white font-extrabold text-xl flex items-center justify-center mb-4 shadow-md">
              2
            </div>
            <h3 className="font-bold text-base text-[#18201C]">Eco-Cleaners Arrive</h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed max-w-xs">
              Your vetted cleaner arrives on time with botanical spray solutions, microfiber mops, and
              HEPA filtration vacuums ready to work.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#004A2B] text-white font-extrabold text-xl flex items-center justify-center mb-4 shadow-md">
              3
            </div>
            <h3 className="font-bold text-base text-[#18201C]">Enjoy a Sparkling, Pure Home</h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed max-w-xs">
              Step into a spotless sanctuary infused with gentle essential oils, zero harmful airborne
              toxins, and polished surfaces.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <button
            onClick={() => onOpenQuote('regular')}
            className="bg-[#004A2B] hover:bg-black text-white font-bold py-3.5 px-8 rounded-xl text-sm transition shadow-md"
          >
            Book Your First Pure Clean Today
          </button>
        </div>
      </section>
      {/* END: 3-Step Process */}

      {/* BEGIN: Interactive Calculator Widget */}
      <section className="py-16 bg-white border-y border-emerald-900/10" data-purpose="pricing-calculator">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-[#F4FAEF] rounded-3xl p-6 sm:p-10 border border-emerald-900/15 shadow-xl relative overflow-hidden">
            {/* Decorative leaf watermarks */}
            <div className="text-center mb-8">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#57B900] bg-white px-3 py-1 rounded-full border border-[#57B900]/20 inline-block mb-2">
                Instant {regionConfig.name.includes('Southampton') ? 'Southampton' : 'Northampton'} Estimate
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18201C]">
                Calculate Your Eco-Clean
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Get an immediate fixed rate and pick your preferred time slot.
              </p>
            </div>

            <div className="space-y-4">
              {/* Row 1: Service & Frequency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Select Service Type
                  </label>
                  <select
                    value={calcService}
                    onChange={(e) => setCalcService(e.target.value as ServiceType)}
                    className="w-full rounded-xl border-gray-300 text-xs font-semibold p-3 bg-white focus:ring-[#57B900] focus:border-[#57B900]"
                  >
                    <option value="regular">Regular Domestic Cleaning (from £18.50/hr)</option>
                    <option value="deep">Deep Clean & Spring Revival (from £120 fixed)</option>
                    <option value="tenancy">End of Tenancy Move-Out (from £165 fixed)</option>
                    <option value="commercial">Commercial & Airbnb Care (Bespoke)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Cleaning Frequency
                  </label>
                  <select
                    value={calcFreq}
                    onChange={(e) => setCalcFreq(e.target.value)}
                    className="w-full rounded-xl border-gray-300 text-xs font-semibold p-3 bg-white focus:ring-[#57B900] focus:border-[#57B900]"
                  >
                    <option value="weekly">Weekly (Best Value - Save 15%)</option>
                    <option value="fortnightly">Fortnightly (Save 10%)</option>
                    <option value="monthly">Monthly Routine (Save 5%)</option>
                    <option value="oneoff">One-Off Refresh</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Beds & Baths */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Bedrooms
                  </label>
                  <select
                    value={calcBeds}
                    onChange={(e) => setCalcBeds(Number(e.target.value))}
                    className="w-full rounded-xl border-gray-300 text-xs font-semibold p-3 bg-white focus:ring-[#57B900] focus:border-[#57B900]"
                  >
                    <option value={1}>1 Bedroom</option>
                    <option value={2}>2 Bedrooms</option>
                    <option value={3}>3 Bedrooms</option>
                    <option value={4}>4 Bedrooms</option>
                    <option value={5}>5+ Bedrooms</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Bathrooms
                  </label>
                  <select
                    value={calcBaths}
                    onChange={(e) => setCalcBaths(Number(e.target.value))}
                    className="w-full rounded-xl border-gray-300 text-xs font-semibold p-3 bg-white focus:ring-[#57B900] focus:border-[#57B900]"
                  >
                    <option value={1}>1 Bathroom</option>
                    <option value={2}>2 Bathrooms</option>
                    <option value={3}>3 Bathrooms</option>
                    <option value={4}>4+ Bathrooms</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Postcode & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Postcode
                  </label>
                  <input
                    type="text"
                    value={calcPostcode}
                    onChange={(e) => setCalcPostcode(e.target.value.toUpperCase())}
                    placeholder={`e.g. ${regionConfig.samplePostcode}`}
                    className="w-full rounded-xl border-gray-300 text-xs font-semibold p-3 bg-white uppercase focus:ring-[#57B900] focus:border-[#57B900]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={calcPhone}
                    onChange={(e) => setCalcPhone(e.target.value)}
                    placeholder="e.g. 07123 456789"
                    className="w-full rounded-xl border-gray-300 text-xs font-semibold p-3 bg-white focus:ring-[#57B900] focus:border-[#57B900]"
                  />
                </div>
              </div>

              {/* Live Price Estimation Box */}
              <div className="bg-[#DDF3C7]/60 p-4 sm:p-5 rounded-2xl border border-[#57B900]/30 flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
                <div>
                  <span className="text-xs uppercase font-extrabold text-[#004A2B] tracking-wider block">
                    Estimated Rate Per Clean:
                  </span>
                  <span className="text-[11px] text-gray-600">
                    Includes non-toxic plant supplies & full equipment
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-3xl sm:text-4xl font-black text-[#004A2B]">
                    £{estimated.price}.00
                  </div>
                  <div className="text-xs font-semibold text-gray-600">
                    Approx. {estimated.hours} Hours Care
                  </div>
                </div>
              </div>

              {/* Submit / Proceed */}
              <div className="pt-2">
                <button
                  onClick={() =>
                    onOpenQuote(calcService, {
                      serviceType: calcService,
                      frequency: calcFreq as any,
                      bedrooms: calcBeds,
                      bathrooms: calcBaths,
                      postcode: calcPostcode,
                      phone: calcPhone,
                    })
                  }
                  className="w-full bg-[#57B900] hover:bg-[#4ea600] text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-[#57B900]/30 transition flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
                >
                  <span>Calculate My Price & View Available Slots</span>
                  <span>→</span>
                </button>
                <p className="text-center text-[10px] text-gray-500 mt-2.5">
                  🔒 SSL Encrypted • No Upfront Card Required • Cancel or Reschedule Anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: Interactive Calculator Widget */}

      {/* BEGIN: Southampton Reviews */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-purpose="testimonials">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
          <div>
            <span className="text-xs font-extrabold uppercase text-[#57B900] tracking-widest block mb-1">
              Real {regionConfig.name.includes('Southampton') ? 'Southampton' : 'Northampton'} Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18201C]">
              Loved by Families, Landlords & Pets
            </h2>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-xs">
            <span>4.9 / 5.0 Star Local TrustScore</span>
            <span className="text-[#57B900] text-sm">★★★★★</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.slice(0, 3).map((r) => (
            <div
              key={r.id}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="text-[#57B900] text-base mb-3 font-bold">★★★★★</div>
                <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                  "{r.quote}"
                </p>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
                <div className="w-9 h-9 rounded-full bg-[#004A2B] text-white font-bold text-xs flex items-center justify-center">
                  {r.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#18201C]">{r.name}</h4>
                  <p className="text-[10px] text-gray-500">
                    {r.location} • {r.serviceType}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* END: Southampton Reviews */}

      {/* BEGIN: Coverage Hub Banner */}
      <section className="py-16 bg-[#F4FAEF] border-t border-emerald-900/10" data-purpose="local-hub">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: Area badges */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-extrabold uppercase text-[#57B900] tracking-widest block">
                Local Regional Hub
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18201C]">
                Proudly Serving {regionConfig.name}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Our mobile teams are equipped with eco-friendly vans and all plant-based equipment.
                We never charge extra for travel within our core local coverage zones:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {[
                  'Ocean Village (SO14)',
                  'Southampton Centre',
                  'Bassett & Chilworth',
                  'Shirley & Maybush',
                  'Portswood & Highfield',
                  'Bitterne & Woolston',
                  'Totton & Waterside',
                  "Eastleigh & Chandler's",
                  'Romsey & Wellow',
                  'Winchester City',
                  'Hedge End & Botley',
                  'Hamble & Netley',
                ].map((zone) => (
                  <div
                    key={zone}
                    className="p-2.5 bg-white rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 flex items-center gap-1.5 shadow-xs"
                  >
                    <span className="text-[#57B900]">●</span>
                    <span className="truncate">{zone}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-gray-500">
                <span>Don’t see your specific postcode?</span>
                <button
                  onClick={() => onNavigate('contact')}
                  className="font-bold text-[#004A2B] hover:underline"
                >
                  Speak with dispatch →
                </button>
              </div>
            </div>

            {/* Right 5 cols: Live Dispatch Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-lg space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#004A2B] text-white flex items-center justify-center text-lg">
                    📍
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#18201C]">
                      {regionConfig.name.includes('Southampton') ? 'Southampton Central Headquarters' : 'Northampton Dispatch Hub'}
                    </h3>
                    <p className="text-[11px] text-gray-500">Dispatching daily to all core sectors</p>
                  </div>
                </div>

                <div className="p-4 bg-[#F4FAEF] rounded-2xl border border-[#DDF3C7] space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-[#004A2B]">
                    <span className="w-2 h-2 rounded-full bg-[#57B900] animate-ping" />
                    <span>Current Status: Active Cleaners in {regionConfig.activeZones}</span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    {regionConfig.address}
                    <br />
                    Rapid response dispatch across Greater {regionConfig.name.split('&')[0]}.
                  </p>
                  <button
                    onClick={() => onOpenQuote('regular')}
                    className="w-full bg-[#004A2B] hover:bg-black text-white py-2.5 rounded-xl font-bold text-xs mt-2 transition"
                  >
                    BOOK IN MY AREA
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
                  <span>⚡ Same-day emergency cleans upon request</span>
                  <span>🌱 100% Zero-emission transit routes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: Coverage Hub Banner */}
    </div>
  );
};
