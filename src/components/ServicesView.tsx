import React, { useState } from 'react';
import { ServiceType, Region } from '../types';
import {
  CLEANING_PACKAGES,
  COMPARISON_ROWS,
  ADD_ONS,
  INGREDIENT_STANDARDS,
  FAQS,
  REGIONS,
} from '../data/cleaningData';
import heroSuppliesImg from '../assets/images/hero_cleaning_supplies_1791129317063.jpg';

interface ServicesViewProps {
  onOpenQuote: (service?: ServiceType, initialAddOns?: string[]) => void;
  selectedRegion: Region;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  onOpenQuote,
  selectedRegion,
}) => {
  const regionConfig = REGIONS[selectedRegion];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const filteredPackages =
    selectedCategory === 'all'
      ? CLEANING_PACKAGES
      : CLEANING_PACKAGES.filter((p) => {
          if (selectedCategory === 'domestic') return p.id === 'regular';
          if (selectedCategory === 'deep') return p.id === 'deep';
          if (selectedCategory === 'tenancy') return p.id === 'tenancy';
          if (selectedCategory === 'commercial') return p.id === 'commercial';
          return true;
        });

  const handleAddOnSelect = (addOnId: string) => {
    onOpenQuote('regular', [addOnId]);
  };

  return (
    <div className="w-full">
      {/* BEGIN: HeroSection (matches Image 1.png) */}
      <section
        className="py-12 lg:py-16 bg-gradient-to-b from-[#F4FAEF] to-white relative overflow-hidden border-b border-emerald-900/5"
        data-purpose="hero-overview"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Hero Text Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#DDF3C7] text-[#004A2B] font-extrabold text-xs tracking-wider uppercase px-3.5 py-1.5 rounded-full border border-[#004A2B]/15">
                <span>●</span>
                <span>
                  Transparent {regionConfig.name.includes('Southampton') ? 'Hampshire' : 'Northamptonshire'} Pricing • No Hidden Fees
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18201C] leading-tight">
                Tailored Eco-Cleaning Packages for Every{' '}
                <span className="text-[#004A2B] underline decoration-[#57B900] decoration-4 underline-offset-4">
                  {regionConfig.name.includes('Southampton') ? 'Southampton Home' : 'Northampton Home'}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl">
                Zero harsh chemicals, 100% plant-powered botanicals, HEPA-filtered vacuuming, and fully
                vetted local cleaning professionals. Safe for toddlers, pets, and{' '}
                {regionConfig.riverOrWaterway}.
              </p>

              {/* Key Trust Badges */}
              <div className="pt-1 flex flex-wrap gap-3 text-xs sm:text-sm font-semibold text-gray-800">
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-xs">
                  <span className="text-[#57B900] font-bold">✓</span> Enhanced DBS-Checked Staff
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-xs">
                  <span className="text-[#57B900] font-bold">✓</span> £2M Public Liability Cover
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-xs">
                  <span className="text-[#57B900] font-bold">✓</span> Biodegradable & Plastic-Conscious
                </span>
              </div>

              {/* Quick Service Category Pills */}
              <div className="pt-3">
                <span className="text-xs uppercase font-bold text-gray-500 tracking-wider block mb-2.5">
                  Jump to cleaning type:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition shadow-xs ${
                      selectedCategory === 'all'
                        ? 'bg-[#004A2B] text-white'
                        : 'bg-white border border-gray-200 hover:border-[#004A2B] text-gray-800'
                    }`}
                  >
                    All Services
                  </button>
                  <button
                    onClick={() => setSelectedCategory('domestic')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                      selectedCategory === 'domestic'
                        ? 'bg-[#004A2B] text-white font-bold'
                        : 'bg-white border border-gray-200 hover:border-[#004A2B] text-gray-800'
                    }`}
                  >
                    Domestic Routine
                  </button>
                  <button
                    onClick={() => setSelectedCategory('deep')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                      selectedCategory === 'deep'
                        ? 'bg-[#004A2B] text-white font-bold'
                        : 'bg-white border border-gray-200 hover:border-[#004A2B] text-gray-800'
                    }`}
                  >
                    Deep Cleans
                  </button>
                  <button
                    onClick={() => setSelectedCategory('tenancy')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                      selectedCategory === 'tenancy'
                        ? 'bg-[#004A2B] text-white font-bold'
                        : 'bg-white border border-gray-200 hover:border-[#004A2B] text-gray-800'
                    }`}
                  >
                    End of Tenancy
                  </button>
                  <button
                    onClick={() => setSelectedCategory('commercial')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                      selectedCategory === 'commercial'
                        ? 'bg-[#004A2B] text-white font-bold'
                        : 'bg-white border border-gray-200 hover:border-[#004A2B] text-gray-800'
                    }`}
                  >
                    Commercial / Airbnb
                  </button>
                </div>
              </div>
            </div>

            {/* Hero Image Showcase (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
                <img
                  src={heroSuppliesImg}
                  alt="Eco-friendly home cleaning supplies on marble countertop"
                  className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-white/40 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#004A2B] uppercase tracking-wider">
                        Natural Botanicals
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-[#18201C]">
                        Amber glass, citrus essential oils, & zero toxins
                      </p>
                    </div>
                    <span className="bg-[#DDF3C7] text-[#004A2B] text-xs font-bold px-2.5 py-1 rounded-md">
                      Pure Clean
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-3 -right-3 bg-[#004A2B] text-white p-3 rounded-full shadow-lg hidden sm:block border-2 border-white">
                <span className="text-xl">✨</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: HeroSection */}

      {/* BEGIN: PricingCardsSection */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="pricing-grid">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-extrabold uppercase text-[#57B900] tracking-widest mb-2">
            Clear & Fair Rates
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-[#18201C]">
            Choose Your EcoShine Solution
          </p>
          <p className="mt-3 text-gray-600 text-sm sm:text-base">
            All cleans include our bespoke range of plant-based detergents, microfiber cloths, HEPA
            vacuums, and fully insured local cleaners.
          </p>
        </div>

        {/* 4-Tier Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 items-stretch">
          {filteredPackages.map((pkg) => (
            <article
              key={pkg.id}
              className={`bg-white rounded-2xl transition flex flex-col relative overflow-hidden shadow-lg hover:shadow-2xl ${
                pkg.badgeType === 'highlight'
                  ? 'border-2 border-[#57B900] ring-1 ring-[#57B900]/20'
                  : 'border-2 border-emerald-900/10 hover:border-[#004A2B]/40'
              }`}
            >
              {pkg.badgeType === 'highlight' && (
                <div className="bg-[#57B900] text-white text-center py-1.5 text-xs font-extrabold uppercase tracking-wider">
                  {pkg.badge}
                </div>
              )}

              {/* Card Header */}
              <div className="p-6 border-b border-gray-100 flex-grow-0">
                {pkg.badge && pkg.badgeType !== 'highlight' && (
                  <span
                    className={`inline-block text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2 ${
                      pkg.badgeType === 'primary'
                        ? 'bg-[#DDF3C7] text-[#004A2B]'
                        : pkg.badgeType === 'accent'
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {pkg.badge}
                  </span>
                )}
                {pkg.badgeType === 'highlight' && (
                  <span className="inline-block bg-[#DDF3C7] text-[#004A2B] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                    Thorough Detox
                  </span>
                )}

                <h3 className="text-xl font-bold text-[#18201C]">{pkg.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{pkg.shortDesc}</p>

                <div className="mt-5 flex items-baseline gap-1">
                  {pkg.priceDisplay.startsWith('£') && pkg.id !== 'regular' && (
                    <span className="text-xs font-semibold text-gray-500 mr-1">From</span>
                  )}
                  <span className="text-4xl font-extrabold text-[#004A2B]">{pkg.priceDisplay}</span>
                  <span className="text-xs font-semibold text-gray-500">{pkg.priceSub}</span>
                </div>

                {pkg.promoTag && (
                  <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-700 bg-[#F4FAEF] px-2.5 py-1 rounded border border-emerald-900/5">
                    <span>{pkg.promoTag}</span>
                  </div>
                )}
              </div>

              {/* Features List */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <ul className="space-y-3.5 text-xs text-[#18201C]">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-[#57B900] font-bold shrink-0 mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <button
                    onClick={() => onOpenQuote(pkg.id)}
                    className={`w-full text-center font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition cursor-pointer ${
                      pkg.badgeType === 'highlight'
                        ? 'bg-[#57B900] hover:bg-[#4ca500] text-white shadow-md'
                        : pkg.badgeType === 'neutral'
                        ? 'bg-[#18201C] hover:bg-black text-white'
                        : 'bg-[#004A2B] hover:bg-black text-white'
                    }`}
                  >
                    {pkg.ctaLabel}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      {/* END: PricingCardsSection */}

      {/* BEGIN: ComparisonMatrixSection */}
      <section
        className="py-16 bg-white border-y border-emerald-900/10"
        data-purpose="service-comparison-table"
        id="comparison-matrix"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold text-[#57B900] uppercase tracking-wider">
              Detailed Inclusions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18201C] mt-1">
              Compare Clean Packages Side-by-Side
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              Find the exact match for your home or property lifecycle requirements.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-left text-sm border-collapse min-w-[720px]">
              <thead>
                <tr className="bg-[#F4FAEF] text-[#18201C] border-b border-gray-200">
                  <th className="py-4 px-6 font-bold w-2/5" scope="col">
                    Package Inclusions & Standards
                  </th>
                  <th className="py-4 px-4 font-bold text-center" scope="col">
                    Regular Domestic
                  </th>
                  <th className="py-4 px-4 font-bold text-center text-[#004A2B] bg-[#DDF3C7]/40" scope="col">
                    Deep Spring
                  </th>
                  <th className="py-4 px-4 font-bold text-center" scope="col">
                    End of Tenancy
                  </th>
                  <th className="py-4 px-4 font-bold text-center" scope="col">
                    Commercial / B2B
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {COMPARISON_ROWS.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-6 font-medium text-[#18201C] flex items-center gap-2">
                      <span className="text-[#57B900] font-bold">✓</span>
                      <span>{row.name}</span>
                    </td>
                    <td className="text-center text-[#004A2B] font-bold">{row.regular}</td>
                    <td className="text-center text-[#004A2B] font-bold bg-[#DDF3C7]/20">
                      {row.deep}
                    </td>
                    <td className="text-center text-[#004A2B] font-bold">{row.tenancy}</td>
                    <td className="text-center text-[#004A2B] font-bold">{row.commercial}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {/* END: ComparisonMatrixSection */}

      {/* BEGIN: AddOnMenuSection */}
      <section className="py-16 bg-[#F4FAEF]" data-purpose="extra-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-extrabold text-[#57B900] uppercase tracking-wider">
                A La Carte Options
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18201C] mt-1">
                Eco-Friendly Cleaning Add-Ons
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Bolt these specialist tasks onto any routine or one-off clean.
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-xs text-gray-500 italic">
              *All treatments use 100% pet-friendly & biodegradable solutions.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {ADD_ONS.map((addOn) => (
              <div
                key={addOn.id}
                className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between hover:border-[#004A2B] transition"
              >
                <div>
                  <div className="text-2xl mb-2">{addOn.icon}</div>
                  <h3 className="font-bold text-sm text-[#18201C]">{addOn.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{addOn.desc}</p>
                </div>
                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-[#004A2B]">
                    £{addOn.price}
                    {addOn.unit && <span className="text-xs text-gray-400 font-normal">{addOn.unit}</span>}
                  </span>
                  <button
                    onClick={() => handleAddOnSelect(addOn.id)}
                    className="text-xs font-bold text-[#004A2B] hover:text-[#57B900] py-1 px-2.5 rounded-lg bg-[#F4FAEF] hover:bg-[#DDF3C7] transition cursor-pointer"
                  >
                    + Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* END: AddOnMenuSection */}

      {/* BEGIN: IngredientStandardsSection */}
      <section className="py-16 bg-white" data-purpose="ingredient-guarantee">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#004A2B] text-white rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-xl">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute -left-10 -top-10 w-60 h-60 rounded-full bg-white/5 pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="inline-block bg-[#57B900] text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  {regionConfig.name.includes('Southampton') ? 'Hampshire Standards Guarantee' : 'Northampton Standards Guarantee'}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                  What Goes Into Our Bottles (And What We Ban Forever)
                </h2>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  Traditional domestic cleans leave petrochemical films, synthetic perfumes, and
                  volatile organic compounds (VOCs) lingering in your indoor air. We hand-mix active
                  botanical formulas that deliver showroom shine without toxic compromise.
                </p>
              </div>

              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {INGREDIENT_STANDARDS.map((std, i) => (
                  <div
                    key={i}
                    className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15"
                  >
                    <div
                      className={`text-base font-bold mb-1 ${
                        std.tone === 'banned' ? 'text-rose-300' : 'text-[#57B900]'
                      }`}
                    >
                      {std.title}
                    </div>
                    <p className="text-slate-300 leading-relaxed">{std.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: IngredientStandardsSection */}

      {/* BEGIN: QuickFaqSection */}
      <section className="py-14 bg-[#F4FAEF] border-t border-emerald-900/10" data-purpose="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-[#18201C] text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQS.slice(0, 3).map((faq, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs transition"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full text-left font-bold text-[#18201C] text-sm sm:text-base flex justify-between items-center"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#57B900] text-lg font-bold">
                    {openFaqIndex === i ? '−' : '+'}
                  </span>
                </button>
                <div
                  className={`mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed transition-all ${
                    openFaqIndex === i ? 'block' : 'block'
                  }`}
                >
                  {faq.a}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-600">
              Have a custom query? Call our team directly on{' '}
              <a
                className="font-bold text-[#004A2B] underline hover:text-[#57B900]"
                href={`tel:${regionConfig.phoneRaw}`}
              >
                {regionConfig.phone}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
      {/* END: QuickFaqSection */}
    </div>
  );
};
