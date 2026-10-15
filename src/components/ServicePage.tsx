import React from 'react';
import { ActiveScreen } from '../types';
import { BUSINESS } from '../config';
import { ServiceContent } from '../data/services';
import { QuoteForm, CheckIcon } from './QuoteForm';

interface ServicePageProps {
  service: ServiceContent;
  onOpenBooking: () => void;
  onNavigate: (screen: ActiveScreen) => void;
}

export const ServicePage: React.FC<ServicePageProps> = ({ service, onOpenBooking, onNavigate }) => {
  const regionConfig = BUSINESS;
  const displayPhone = regionConfig.phone;
  const town = regionConfig.area;

  return (
    <div className="w-full">
      {/* Hero with form */}
      <section className="bg-[#F4FAEF] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-7 lg:pt-4">
            <p className="text-sm text-gray-600 mb-3">
              {service.isCommercial ? (
                <span>Commercial cleaning</span>
              ) : (
                <>
                  <button onClick={() => onNavigate('regular')} className="hover:text-[#004A2B]">Residential cleaning</button>
                  <span className="mx-2">›</span>
                  <span>{service.nav}</span>
                </>
              )}
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#18201C] leading-[1.08]">
              {service.title} in {town}
            </h1>
            <p className="mt-5 text-lg text-gray-700 max-w-xl leading-relaxed">{service.intro}</p>
            <p className="mt-8 text-sm text-gray-600">
              Prefer to book straight away?{' '}
              <button onClick={onOpenBooking} className="font-semibold text-[#004A2B] underline underline-offset-4">Book now</button>
              {' '}or call{' '}
              <a href={`tel:${regionConfig.phoneRaw}`} className="font-semibold text-[#004A2B]">{displayPhone}</a>
            </p>
          </div>
          <div className="lg:col-span-5">
            <QuoteForm defaultService={service.formService} source={`${service.title} page`} />
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#18201C]">{service.audienceHeading}</h2>
          {service.audienceIntro && <p className="mt-3 text-gray-600 text-lg max-w-2xl">{service.audienceIntro}</p>}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.audience.map((a) => (
              <div key={a.title} className="bg-[#F4FAEF] rounded-2xl p-6">
                <h3 className="text-lg font-bold text-[#18201C]">{a.title}</h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Included */}
      <section className="py-16 bg-[#F4FAEF] border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#18201C]">What is included</h2>
          <p className="mt-3 text-gray-600 text-lg max-w-2xl">{service.includedIntro}</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.included.map((block) => (
              <div key={block.area} className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-[#18201C]">{block.area}</h3>
                <ul className="mt-4 space-y-2.5">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-gray-700">
                      <span className="mt-0.5 text-[#57B900] shrink-0"><CheckIcon className="w-4 h-4" /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {service.addOns && (
            <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-[#18201C]">Optional add-ons</h3>
              <p className="mt-1 text-sm text-gray-600">Available on request. Just let us know when you book.</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {service.addOns.map((a) => (
                  <li key={a} className="px-3.5 py-1.5 rounded-full bg-[#F4FAEF] text-sm font-semibold text-[#004A2B]">{a}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Why */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#18201C]">{service.whyHeading}</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
            {service.why.map((w) => (
              <div key={w.title} className="flex gap-4">
                <span className="mt-1 w-7 h-7 shrink-0 rounded-full bg-[#004A2B] text-white flex items-center justify-center"><CheckIcon className="w-4 h-4" /></span>
                <div>
                  <h3 className="font-bold text-lg text-[#18201C]">{w.title}</h3>
                  <p className="mt-1.5 text-gray-600 text-sm leading-relaxed">{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-[#F4FAEF] border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold text-[#18201C]">{service.title} FAQs</h2>
          <dl className="mt-8 space-y-6">
            {service.faqs.map((f) => (
              <div key={f.q}>
                <dt className="font-bold text-[#18201C]">{f.q}</dt>
                <dd className="mt-1.5 text-gray-600 leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#004A2B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold">{service.ctaHeading}</h2>
          {service.ctaText && <p className="mt-3 text-[#DDF3C7] text-lg max-w-2xl mx-auto">{service.ctaText}</p>}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            {service.isCommercial ? (
              <button onClick={() => onNavigate('quote')} className="btn-accent text-base">Get a quote</button>
            ) : (
              <button onClick={onOpenBooking} className="btn-accent text-base">Book now</button>
            )}
            <a href={`tel:${regionConfig.phoneRaw}`} className="inline-flex items-center justify-center rounded-xl border-2 border-white/70 px-6 py-3.5 font-bold text-white hover:bg-white/10 transition">
              Call now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
