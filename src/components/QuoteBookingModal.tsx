import React, { useEffect, useState } from 'react';
import { BUSINESS } from '../config';
import { submitLead, SERVICE_OPTIONS } from '../lib/submit';
import { CheckIcon } from './QuoteForm';

interface QuoteBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const empty = { service: '', name: '', phone: '', email: '', postcode: '', date: '', time: '', notes: '', company: '' };

export const QuoteBookingModal: React.FC<QuoteBookingModalProps> = ({ isOpen, onClose, initialService = '' }) => {
  const regionConfig = BUSINESS;
  const displayPhone = regionConfig.phone;
  const [form, setForm] = useState({ ...empty, service: initialService });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  useEffect(() => {
    if (isOpen) {
      setForm((f) => ({ ...f, service: initialService || f.service }));
      setStatus('idle');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, initialService]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!isOpen) return null;

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.company) return;
    setStatus('sending');
    await submitLead(`[EcoShine Booking] ${form.service} - ${form.name} (${form.postcode.toUpperCase()})`, {
      source: 'Book Now',
      serviceType: form.service,
      fullName: form.name,
      phone: form.phone,
      email: form.email,
      postcode: form.postcode.toUpperCase(),
      preferredDate: form.date,
      preferredTime: form.time,
      notes: form.notes,
      serviceArea: regionConfig.area,
      _replyto: form.email,
    });
    setStatus('sent');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true" aria-labelledby="booking-title">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-gray-100">
          <h2 id="booking-title" className="text-xl font-extrabold text-[#18201C]">Book your clean</h2>
          <button onClick={onClose} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100" aria-label="Close">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {status === 'sent' ? (
          <div className="p-8 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#DDF3C7] text-[#004A2B] flex items-center justify-center mb-4"><CheckIcon className="w-7 h-7" /></div>
            <h3 className="text-2xl font-extrabold text-[#18201C]">Booking request received</h3>
            <p className="mt-2 text-gray-600">We will confirm your slot by phone or email shortly. Need it sooner?</p>
            <a href={`tel:${regionConfig.phoneRaw}`} className="btn-primary mt-6">Call {displayPhone}</a>
            <button onClick={onClose} className="block mx-auto mt-4 text-sm font-semibold text-gray-500 hover:text-[#004A2B]">Close</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="p-6 space-y-4">
            <p className="text-sm text-gray-600">Tell us what you need and when. We will confirm availability and your price before anything is booked.</p>
            <input type="text" name="company" value={form.company} onChange={update('company')} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <label className="block">
              <span className="text-sm font-semibold text-[#18201C]">Service</span>
              <select required value={form.service} onChange={update('service')} className="field mt-1.5">
                <option value="" disabled>Choose a service</option>
                {SERVICE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-semibold text-[#18201C]">Your name</span>
                <input required type="text" value={form.name} onChange={update('name')} className="field mt-1.5" autoComplete="name" />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[#18201C]">Phone number</span>
                <input required type="tel" value={form.phone} onChange={update('phone')} className="field mt-1.5" autoComplete="tel" />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[#18201C]">Email</span>
                <input required type="email" value={form.email} onChange={update('email')} className="field mt-1.5" autoComplete="email" />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[#18201C]">Postcode</span>
                <input required type="text" value={form.postcode} onChange={update('postcode')} className="field mt-1.5 uppercase" placeholder={regionConfig.samplePostcode} autoComplete="postal-code" />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[#18201C]">Preferred date</span>
                <input type="date" value={form.date} onChange={update('date')} className="field mt-1.5" />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[#18201C]">Preferred time</span>
                <select value={form.time} onChange={update('time')} className="field mt-1.5">
                  <option value="">No preference</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
              </label>
            </div>
            <label className="block">
              <span className="text-sm font-semibold text-[#18201C]">Anything we should know? <span className="font-normal text-gray-500">(optional)</span></span>
              <textarea rows={3} value={form.notes} onChange={update('notes')} className="field mt-1.5" placeholder="Number of bedrooms, pets, parking, access..." />
            </label>
            <button type="submit" disabled={status === 'sending'} className="btn-accent w-full text-base disabled:opacity-60">
              {status === 'sending' ? 'Sending...' : 'Request booking'}
            </button>
            <p className="text-xs text-gray-500 text-center">No payment taken online. We confirm everything with you first.</p>
          </form>
        )}
      </div>
    </div>
  );
};
