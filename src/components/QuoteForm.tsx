import React, { useState } from 'react';
import { BUSINESS } from '../config';
import { submitLead, SERVICE_OPTIONS } from '../lib/submit';

interface QuoteFormProps {
  defaultService?: string;
  source?: string;
  title?: string;
}

export const CheckIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const QuoteForm: React.FC<QuoteFormProps> = ({
  defaultService = '',
  source = 'Quote Form',
  title = 'Get your free quote',
}) => {
  const regionConfig = BUSINESS;
  const displayPhone = regionConfig.phone;
  const [form, setForm] = useState({ service: defaultService, name: '', phone: '', postcode: '', company: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.company) return;
    setStatus('sending');
    await submitLead(`[EcoShine Quote] ${form.name} (${form.postcode.toUpperCase()})`, {
      source,
      serviceType: form.service,
      fullName: form.name,
      phone: form.phone,
      postcode: form.postcode.toUpperCase(),
      serviceArea: regionConfig.area,
    });
    setStatus('sent');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_20px_50px_-20px_rgba(0,74,43,0.25)] p-6 sm:p-8">
      {status === 'sent' ? (
        <div className="text-center py-6">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#DDF3C7] text-[#004A2B] flex items-center justify-center mb-4">
            <CheckIcon className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#18201C]">Thanks, we have your enquiry</h2>
          <p className="mt-2 text-gray-600">We will be in touch shortly with your price and availability. Prefer to talk now?</p>
          <a href={`tel:${regionConfig.phoneRaw}`} className="btn-primary mt-6">Call {displayPhone}</a>
          <p className="mt-3 text-sm text-gray-600">
            or <a href={`tel:${regionConfig.phone2Raw}`} className="font-semibold text-[#004A2B]">{regionConfig.phone2}</a>
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <h2 className="text-2xl font-extrabold text-[#18201C]">{title}</h2>
            <p className="text-sm text-gray-600 mt-1">No obligation. We reply within an hour during working hours.</p>
          </div>
          <input type="text" name="company" value={form.company} onChange={update('company')} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <label className="block">
            <span className="text-sm font-semibold text-[#18201C]">What service do you need?</span>
            <select required value={form.service} onChange={update('service')} className="field mt-1.5">
              <option value="" disabled>Choose a service</option>
              {SERVICE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-[#18201C]">Your name</span>
            <input required type="text" value={form.name} onChange={update('name')} className="field mt-1.5" autoComplete="name" />
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-semibold text-[#18201C]">Phone number</span>
              <input required type="tel" value={form.phone} onChange={update('phone')} className="field mt-1.5" autoComplete="tel" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-[#18201C]">Postcode</span>
              <input required type="text" value={form.postcode} onChange={update('postcode')} className="field mt-1.5 uppercase" placeholder={regionConfig.samplePostcode} autoComplete="postal-code" />
            </label>
          </div>
          <button type="submit" disabled={status === 'sending'} className="btn-accent w-full text-base disabled:opacity-60">
            {status === 'sending' ? 'Sending...' : 'Get my price'}
          </button>
          <p className="text-xs text-gray-500 text-center">We reply by phone or email. No obligation to book.</p>
        </form>
      )}
    </div>
  );
};
