import React from 'react';
import { BUSINESS } from '../config';
import { QuoteForm, CheckIcon } from './QuoteForm';

interface QuoteViewProps {
  defaultService?: string;
}

export const QuoteView: React.FC<QuoteViewProps> = ({ defaultService }) => {
  const regionConfig = BUSINESS;
  const displayPhone = regionConfig.phone;

  return (
    <div className="w-full bg-[#F4FAEF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-6 lg:pt-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#18201C] leading-[1.08]">Get a free quote</h1>
          <p className="mt-5 text-lg text-gray-700 max-w-xl leading-relaxed">
            Tell us a little about your home or premises and we will come back with a price and availability, usually the same day.
          </p>
          <ul className="mt-8 space-y-3">
            {['No obligation to book', 'Reply within an hour during working hours', 'Plant-based products as standard', 'Fully insured, DBS-checked cleaners'].map((t) => (
              <li key={t} className="flex gap-3 text-gray-700">
                <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-[#DDF3C7] text-[#004A2B] flex items-center justify-center"><CheckIcon className="w-3.5 h-3.5" /></span>
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-gray-600">
            Prefer to talk? Call <a href={`tel:${regionConfig.phoneRaw}`} className="font-semibold text-[#004A2B]">{displayPhone}</a>
            {' '}or <a href={`tel:${regionConfig.phone2Raw}`} className="font-semibold text-[#004A2B]">{regionConfig.phone2}</a>
          </p>
        </div>
        <div className="lg:col-span-6">
          <QuoteForm defaultService={defaultService} source="Quote page" />
        </div>
      </div>
    </div>
  );
};
