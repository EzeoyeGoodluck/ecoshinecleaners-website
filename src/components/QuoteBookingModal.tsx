import React, { useState, useEffect } from 'react';
import { ServiceType, BookingState, Region } from '../types';
import { REGIONS } from '../data/cleaningData';

const TARGET_EMAIL = 'info@ecoshinecleaners.uk.com';
const TARGET_PHONE = '+44 7375 614692';
const TARGET_PHONE_RAW = '+447375614692';

interface QuoteBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceType | string;
  initialData?: Partial<BookingState>;
  selectedRegion: Region;
}

const SERVICE_OPTIONS = [
  { value: 'regular', label: 'Regular Domestic Cleaning' },
  { value: 'deep', label: 'Deep Clean & Spring Revival' },
  { value: 'tenancy', label: 'End of Tenancy Move-Out Clean' },
  { value: 'commercial', label: 'Commercial & Office Cleaning' },
  { value: 'carpet', label: 'Carpet & Upholstery Cleaning' },
  { value: 'other', label: 'Other / Custom Cleaning Request' },
];

export const QuoteBookingModal: React.FC<QuoteBookingModalProps> = ({
  isOpen,
  onClose,
  initialService = 'regular',
  initialData,
  selectedRegion,
}) => {
  const regionConfig = REGIONS[selectedRegion];

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    postcode: regionConfig.samplePostcode,
    serviceType: typeof initialService === 'string' ? initialService : 'regular',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Sync state when modal opens or initial props change
  useEffect(() => {
    if (isOpen) {
      setForm((prev) => ({
        ...prev,
        fullName: initialData?.fullName || prev.fullName,
        phone: initialData?.phone || prev.phone,
        email: initialData?.email || prev.email,
        postcode: initialData?.postcode || prev.postcode || regionConfig.samplePostcode,
        serviceType: (initialService as string) || (initialData?.serviceType as string) || prev.serviceType || 'regular',
        notes: initialData?.notes || prev.notes,
      }));
    }
  }, [isOpen, initialService, initialData, regionConfig.samplePostcode]);

  if (!isOpen) return null;

  const currentServiceLabel =
    SERVICE_OPTIONS.find((s) => s.value === form.serviceType)?.label ||
    form.serviceType ||
    'Domestic Cleaning';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const ref = 'ECO-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);

    const payload = {
      referenceId: ref,
      fullName: form.fullName,
      phone: form.phone,
      email: form.email,
      postcode: form.postcode,
      serviceType: currentServiceLabel,
      whatTheyWant: form.notes || 'General cleaning enquiry',
      source: 'Instant Quote Modal (Direct)',
      region: regionConfig.name,
      targetEmail: TARGET_EMAIL,
      targetPhone: TARGET_PHONE,
    };

    try {
      // 1. Send to Express backend API
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch((err) => console.log('Backend log:', err));

      // 2. Direct client-side dispatch to FormSubmit for instant inbox delivery
      await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `⚡ New Instant Quote Request: ${form.fullName} (${form.postcode})`,
          _replyto: form.email,
          _template: 'table',
          _captcha: 'false',
          ...payload,
        }),
      }).catch((err) => console.log('Direct email dispatch:', err));
    } catch (err) {
      console.log('Submission error:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  const whatsappText = encodeURIComponent(
    `Hello EcoShine Cleaners!\nI just requested an instant quote (Ref: ${bookingRef}):\nName: ${form.fullName}\nPhone: ${form.phone}\nPostcode: ${form.postcode}\nService: ${currentServiceLabel}\nDetails: ${form.notes || 'Ready for a quote'}`
  );

  const mailtoBody = encodeURIComponent(
    `Hi EcoShine Team,\n\nI have submitted an instant quote request:\nReference: ${bookingRef}\nName: ${form.fullName}\nPhone: ${form.phone}\nPostcode: ${form.postcode}\nService: ${currentServiceLabel}\nDetails: ${form.notes || 'Looking forward to hearing from you.'}`
  );

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={handleResetAndClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-emerald-900/10 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-[#004A2B] text-white p-5 sm:p-6 relative">
          <button
            onClick={handleResetAndClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg transition font-bold cursor-pointer"
            aria-label="Close quote modal"
          >
            ✕
          </button>

          <div className="inline-flex items-center gap-1.5 bg-[#57B900]/25 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <span>🌿</span>
            <span>Quick & Simple Quote • Northamptonshire</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">
            {submitted ? 'Quote Request Sent!' : 'Get an Instant Quote'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-md">
            {submitted
              ? 'We have received your details and will be in touch shortly.'
              : 'Fill in your details below and tell us what you need. Our friendly local team will get straight back to you.'}
          </p>
        </div>

        {submitted ? (
          /* Clean Confirmation Screen */
          <div className="p-6 sm:p-8 space-y-5 text-center">
            <div className="w-16 h-16 bg-[#DDF3C7] text-[#004A2B] rounded-full flex items-center justify-center mx-auto text-3xl font-extrabold shadow-inner">
              ✓
            </div>

            <div>
              <span className="text-xs uppercase font-extrabold text-[#57B900] tracking-wider block mb-1">
                Quote Reference: {bookingRef}
              </span>
              <h3 className="text-2xl font-extrabold text-[#004A2B]">Thank You, {form.fullName}!</h3>
              <p className="text-xs text-gray-600 mt-1">
                Your request has been delivered directly to our dispatch desk.
              </p>

              <div className="mt-2.5 inline-flex items-center gap-2 bg-[#DDF3C7] text-[#004A2B] px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#57B900]/30">
                <span>✉️ Sent to:</span>
                <span className="underline">{TARGET_EMAIL}</span>
              </div>
            </div>

            {/* Submitted Summary */}
            <div className="bg-[#F4FAEF] p-4 rounded-2xl border border-emerald-900/10 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between pb-1.5 border-b border-gray-200">
                <span className="text-gray-500">Service:</span>
                <span className="font-bold text-gray-900">{currentServiceLabel}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-gray-200">
                <span className="text-gray-500">Phone:</span>
                <span className="font-semibold text-gray-800">{form.phone}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-gray-200">
                <span className="text-gray-500">Email:</span>
                <span className="font-semibold text-gray-800">{form.email}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-gray-200">
                <span className="text-gray-500">Postcode Area:</span>
                <span className="font-semibold text-gray-800 uppercase">{form.postcode}</span>
              </div>
              {form.notes && (
                <div className="pt-1">
                  <span className="text-gray-500 block mb-0.5">Your Requirements:</span>
                  <span className="font-medium text-gray-800 italic">"{form.notes}"</span>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
              <a
                href={`https://wa.me/${TARGET_PHONE_RAW.replace('+', '')}?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>💬 Chat on WhatsApp ({TARGET_PHONE})</span>
              </a>

              <a
                href={`tel:${TARGET_PHONE_RAW}`}
                className="bg-[#DDF3C7] text-[#004A2B] px-4 py-3 rounded-xl font-bold text-xs hover:bg-[#cbe8ae] transition flex items-center justify-center gap-1.5"
              >
                <span>📞 Call Team</span>
              </a>

              <a
                href={`mailto:${TARGET_EMAIL}?subject=Quote%20Request%20${bookingRef}&body=${mailtoBody}`}
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 px-4 py-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5"
              >
                <span>✉️ Email Us</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={handleResetAndClose}
                className="text-xs text-gray-500 hover:text-gray-800 font-semibold underline cursor-pointer"
              >
                Return to Site
              </button>
            </div>
          </div>
        ) : (
          /* Straight-to-the-Point Form */
          <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-4">
            {/* Full Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 text-sm p-3 focus:ring-2 focus:ring-[#57B900] focus:border-[#57B900] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 07375 614692"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 text-sm p-3 focus:ring-2 focus:ring-[#57B900] focus:border-[#57B900] outline-hidden"
                />
              </div>
            </div>

            {/* Email & Postcode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sarah@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 text-sm p-3 focus:ring-2 focus:ring-[#57B900] focus:border-[#57B900] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Postcode / Town <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NN1 5AA (Northampton)"
                  value={form.postcode}
                  onChange={(e) => setForm({ ...form, postcode: e.target.value.toUpperCase() })}
                  className="w-full rounded-xl border border-gray-300 text-sm p-3 uppercase focus:ring-2 focus:ring-[#57B900] focus:border-[#57B900] outline-hidden"
                />
              </div>
            </div>

            {/* Service Type Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                What Service Do You Need? <span className="text-red-500">*</span>
              </label>
              <select
                value={form.serviceType}
                onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                className="w-full rounded-xl border border-gray-300 text-sm p-3 bg-white focus:ring-2 focus:ring-[#57B900] focus:border-[#57B900] outline-hidden cursor-pointer"
              >
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Requirements / What they want */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                What Would You Like Cleaned? <span className="text-gray-400 font-normal">(Brief details)</span>
              </label>
              <textarea
                rows={3}
                placeholder="Tell us what you want (e.g. 3 bed house, focus on kitchen and bathrooms, move-in clean, regular weekly care)..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full rounded-xl border border-gray-300 text-sm p-3 focus:ring-2 focus:ring-[#57B900] focus:border-[#57B900] outline-hidden"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#57B900] hover:bg-[#4ea600] disabled:bg-[#57B900]/60 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-md shadow-[#57B900]/25 transition-all text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin inline-block">⏳</span>
                    <span>Sending Your Request...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Quote Request</span>
                    <span className="text-lg">→</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-[11px] text-gray-500 pt-1">
              ✓ Direct to <strong>{TARGET_EMAIL}</strong> • Call or WhatsApp: <strong>{TARGET_PHONE}</strong>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
