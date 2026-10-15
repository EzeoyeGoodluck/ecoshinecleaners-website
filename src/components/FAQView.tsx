import React, { useState } from 'react';
import { ActiveScreen } from '../types';
import { FAQS } from '../data/cleaningData';
import { BUSINESS } from '../config';

interface FAQViewProps {
  onOpenBooking: () => void;
  onNavigate: (screen: ActiveScreen) => void;
}

const EXTRA_FAQS = [
  {
    q: 'Do I need to be home during the clean?',
    a: 'No. Many customers give us a key or a key safe code. Every cleaner is DBS-checked and insured, and keys are logged and stored securely.',
  },
  {
    q: 'How do I pay?',
    a: 'We invoice after each clean and you can pay by bank transfer or card. Regular customers can set up a monthly invoice.',
  },
  {
    q: 'Can I cancel or reschedule?',
    a: 'Yes. Give us 24 hours notice and there is no charge. Just call, message us on WhatsApp or email.',
  },
];

export const FAQView: React.FC<FAQViewProps> = ({ onOpenBooking, onNavigate }) => {
  const regionConfig = BUSINESS;
  const [open, setOpen] = useState<number | null>(0);
  const items = [...FAQS, ...EXTRA_FAQS];

  return (
    <div className="w-full">
      <section className="bg-[#F4FAEF] border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#18201C]">Frequently asked questions</h1>
          <p className="mt-4 text-lg text-gray-700">
            Everything you need to know before booking an eco clean in {regionConfig.areaLong}.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-[#18201C] text-base sm:text-lg">{item.q}</span>
                  <span className={`shrink-0 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-[#004A2B] transition-transform ${isOpen ? 'rotate-45' : ''}`} aria-hidden="true">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                  </span>
                </button>
                {isOpen && <p className="pb-6 text-gray-600 leading-relaxed">{item.a}</p>}
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-[#F4FAEF] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-extrabold text-[#18201C]">Still have a question?</h2>
          <p className="mt-2 text-gray-600">Call us on {regionConfig.phone} or send a message and we will get back to you.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => onNavigate('quote')} className="btn-accent">Get a quote</button>
            <button onClick={() => onNavigate('contact')} className="btn-secondary">Contact us</button>
          </div>
        </div>
      </section>
    </div>
  );
};
