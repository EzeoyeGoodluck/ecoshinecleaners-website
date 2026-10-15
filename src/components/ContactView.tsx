import React, { useState } from 'react';
import { BUSINESS } from '../config';
import { submitLead, SERVICE_OPTIONS } from '../lib/submit';
import { CheckIcon } from './QuoteForm';

interface ContactViewProps {
}

export const ContactView: React.FC<ContactViewProps> = () => {
  const regionConfig = BUSINESS;
  const displayPhone = regionConfig.phone;
  const displayPhone2 = regionConfig.phone2;
  const [form, setForm] = useState({ service: '', name: '', email: '', phone: '', message: '', company: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.company) return;
    setStatus('sending');
    await submitLead(`[EcoShine Contact] ${form.name}`, {
      source: 'Online Contact Enquiry',
      serviceType: form.service,
      fullName: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
      serviceArea: regionConfig.area,
      _replyto: form.email,
    });
    setStatus('sent');
  };

  const cards = [
    { title: 'Call us', body: <><a href={`tel:${regionConfig.phoneRaw}`} className="font-semibold text-[#004A2B]">{displayPhone}</a><br /><a href={`tel:${regionConfig.phone2Raw}`} className="font-semibold text-[#004A2B]">{displayPhone2}</a></> },
    { title: 'WhatsApp', body: <a href={regionConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#004A2B]">Message us on WhatsApp</a> },
    { title: 'Email', body: <a href={`mailto:${regionConfig.email}`} className="font-semibold text-[#004A2B] break-all">{regionConfig.email}</a> },
    { title: 'Service area', body: <span>{regionConfig.areaLong}</span> },
  ];

  return (
    <div className="w-full">
      <section className="bg-[#F4FAEF] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#18201C]">Get in touch</h1>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl">
            Call, WhatsApp, or send us a few details and we will come back to you with a price and availability, usually the same day.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((c) => (
              <div key={c.title} className="bg-white rounded-2xl border border-gray-200 p-5">
                <h2 className="text-sm font-bold text-gray-500">{c.title}</h2>
                <p className="mt-2 text-[#18201C] leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold text-[#18201C]">Send a quick enquiry</h2>
          <p className="mt-2 text-gray-600">Prefer not to call? Fill this in and we will get back to you.</p>

          {status === 'sent' ? (
            <div className="mt-8 bg-[#F4FAEF] rounded-2xl p-8 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#DDF3C7] text-[#004A2B] flex items-center justify-center mb-4"><CheckIcon className="w-7 h-7" /></div>
              <h3 className="text-2xl font-extrabold text-[#18201C]">Thanks, we have your message</h3>
              <p className="mt-2 text-gray-600">We will be in touch shortly. Prefer to talk now?</p>
              <a href={`tel:${regionConfig.phoneRaw}`} className="btn-primary mt-6">Call {displayPhone}</a>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 space-y-4">
              <input type="text" name="company" value={form.company} onChange={update('company')} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <label className="block">
                <span className="text-sm font-semibold text-[#18201C]">What service do you need?</span>
                <select required value={form.service} onChange={update('service')} className="field mt-1.5">
                  <option value="" disabled>Choose a service</option>
                  {SERVICE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[#18201C]">Your name</span>
                <input required type="text" value={form.name} onChange={update('name')} className="field mt-1.5" autoComplete="name" />
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-semibold text-[#18201C]">Email address</span>
                  <input required type="email" value={form.email} onChange={update('email')} className="field mt-1.5" autoComplete="email" />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-[#18201C]">Phone number</span>
                  <input required type="tel" value={form.phone} onChange={update('phone')} className="field mt-1.5" autoComplete="tel" />
                </label>
              </div>
              <label className="block">
                <span className="text-sm font-semibold text-[#18201C]">Message</span>
                <textarea required rows={5} value={form.message} onChange={update('message')} className="field mt-1.5" />
              </label>
              <button type="submit" disabled={status === 'sending'} className="btn-accent w-full text-base disabled:opacity-60">
                {status === 'sending' ? 'Sending...' : 'Send enquiry'}
              </button>
              <p className="text-xs text-gray-500 text-center">We reply by phone or email. No obligation to book.</p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
