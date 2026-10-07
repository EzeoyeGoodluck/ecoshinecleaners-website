import React, { useState, useEffect } from 'react';
import { ServiceType, BookingState, Region } from '../types';
import { ADD_ONS, REGIONS, CLEANING_PACKAGES } from '../data/cleaningData';

const TARGET_EMAIL = 'ecoshinecleanerslimited@gmail.com';
const TARGET_PHONE = '+44 7375 614692';
const TARGET_PHONE_RAW = '+447375614692';

interface QuoteBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceType;
  initialData?: Partial<BookingState>;
  selectedRegion: Region;
}

export const QuoteBookingModal: React.FC<QuoteBookingModalProps> = ({
  isOpen,
  onClose,
  initialService = 'regular',
  initialData,
  selectedRegion,
}) => {
  const regionConfig = REGIONS[selectedRegion];

  const [booking, setBooking] = useState<BookingState>({
    serviceType: initialService,
    frequency: 'weekly',
    bedrooms: 2,
    bathrooms: 1,
    selectedAddOns: [],
    postcode: regionConfig.samplePostcode,
    phone: '',
    fullName: '',
    email: '',
    notes: '',
    hasPets: false,
    preferredDate: '',
    preferredTime: 'morning',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Sync when initial props or modal opening changes
  useEffect(() => {
    if (isOpen) {
      setBooking((prev) => ({
        ...prev,
        serviceType: initialService || prev.serviceType,
        postcode: initialData?.postcode || prev.postcode || regionConfig.samplePostcode,
        phone: initialData?.phone || prev.phone,
        bedrooms: initialData?.bedrooms ?? prev.bedrooms,
        bathrooms: initialData?.bathrooms ?? prev.bathrooms,
        frequency: initialData?.frequency || prev.frequency,
        ...(initialData || {}),
      }));
    }
  }, [isOpen, initialService, initialData, regionConfig.samplePostcode]);

  if (!isOpen) return null;

  // Calculate pricing
  const calculateTotal = () => {
    let base = 0;
    let hours = 2.5;

    if (booking.serviceType === 'regular') {
      hours = Math.max(2, booking.bedrooms * 0.75 + booking.bathrooms * 0.6);
      base = hours * 18.5;
      // Frequency discount
      if (booking.frequency === 'weekly') base *= 0.85;
      else if (booking.frequency === 'fortnightly') base *= 0.90;
      else if (booking.frequency === 'monthly') base *= 0.95;
    } else if (booking.serviceType === 'deep') {
      base = 120 + (booking.bedrooms - 1) * 20 + (booking.bathrooms - 1) * 15;
      hours = Math.max(4, booking.bedrooms * 1.2 + booking.bathrooms * 1.0);
    } else if (booking.serviceType === 'tenancy') {
      base = 165 + (booking.bedrooms - 1) * 25 + (booking.bathrooms - 1) * 20;
      hours = Math.max(5, booking.bedrooms * 1.4 + booking.bathrooms * 1.2);
    } else {
      // commercial bespoke
      base = 150;
      hours = 4;
    }

    // Add-ons
    const addOnTotal = booking.selectedAddOns.reduce((sum, addOnId) => {
      const found = ADD_ONS.find((a) => a.id === addOnId);
      return sum + (found ? found.price : 0);
    }, 0);

    return {
      price: Math.round(base + addOnTotal),
      hours: Math.round(hours * 10) / 10,
    };
  };

  const { price, hours } = calculateTotal();

  const toggleAddOn = (id: string) => {
    setBooking((prev) => ({
      ...prev,
      selectedAddOns: prev.selectedAddOns.includes(id)
        ? prev.selectedAddOns.filter((item) => item !== id)
        : [...prev.selectedAddOns, id],
    }));
  };

  const selectedPackage = CLEANING_PACKAGES.find((p) => p.id === booking.serviceType);
  const selectedAddOnNames = booking.selectedAddOns
    .map((id) => ADD_ONS.find((a) => a.id === id)?.name)
    .filter(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const ref = 'ECO-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);

    const payload = {
      referenceId: ref,
      fullName: booking.fullName,
      phone: booking.phone,
      email: booking.email,
      postcode: booking.postcode,
      serviceType: selectedPackage?.title || booking.serviceType,
      frequency: booking.frequency,
      bedrooms: booking.bedrooms,
      bathrooms: booking.bathrooms,
      selectedAddOns: selectedAddOnNames,
      hasPets: booking.hasPets,
      preferredDate: booking.preferredDate || 'Flexible / Soonest',
      preferredTime: booking.preferredTime || 'Morning (8am–12pm)',
      estimatedPrice: price,
      estimatedHours: hours,
      notes: booking.notes,
      source: 'Instant Quote & Booking Modal',
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

      // 2. Direct client-side dispatch to FormSubmit for instant receipt
      await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `[EcoShine Booking] ${payload.serviceType} - ${booking.fullName} (${booking.postcode})`,
          _template: 'table',
          _captcha: 'false',
          _replyto: booking.email,
          ...payload,
        }),
      }).catch((err) => console.log('Direct email dispatch:', err));
    } catch (err) {
      console.log('Submission handling complete:', err);
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
    `Hello EcoShine Cleaners!\nI booked a clean online:\nRef: ${bookingRef}\nName: ${booking.fullName}\nPhone: ${booking.phone}\nEmail: ${booking.email}\nPostcode: ${booking.postcode}\nService: ${selectedPackage?.title}\nFrequency: ${booking.frequency}\nHome: ${booking.bedrooms} Bed, ${booking.bathrooms} Bath\nEst. Total: £${price}.00\nPreferred Date: ${booking.preferredDate || 'Soonest'}\nNotes: ${booking.notes || 'None'}`
  );

  const mailtoBody = encodeURIComponent(
    `Hi EcoShine Team,\n\nI just scheduled my booking online.\n\nBooking Reference: ${bookingRef}\nName: ${booking.fullName}\nPhone: ${booking.phone}\nPostcode: ${booking.postcode}\nService: ${selectedPackage?.title}\nFrequency: ${booking.frequency}\nBedrooms: ${booking.bedrooms}\nBathrooms: ${booking.bathrooms}\nEstimated Investment: £${price}.00\nPets at home: ${booking.hasPets ? 'Yes' : 'No'}\nPreferred Date: ${booking.preferredDate || 'Soonest'}\n\nClient Notes: ${booking.notes || 'Please confirm slot'}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-emerald-900/10 overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="bg-[#004A2B] text-white p-5 sm:p-6 flex items-center justify-between">
          <div>
            <span className="inline-block bg-[#57B900] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
              Instant Fixed Quote & Scheduling
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Configure Your Pure Eco-Clean
            </h2>
            <p className="text-xs text-emerald-100 mt-0.5">
              100% non-toxic botanical cleaning in {regionConfig.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg font-bold transition cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          /* Confirmation Screen */
          <div className="p-8 sm:p-10 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-[#DDF3C7] text-[#004A2B] rounded-full flex items-center justify-center mx-auto text-3xl font-extrabold shadow-sm">
              ✓
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold text-[#57B900] tracking-wider block mb-1">
                Booking Reference: {bookingRef}
              </span>
              <h3 className="text-2xl font-extrabold text-[#18201C]">
                Your Eco-Clean Request is Dispatched!
              </h3>
              
              {/* Direct email recipient confirmation */}
              <div className="mt-2.5 inline-flex items-center gap-2 bg-[#DDF3C7] text-[#004A2B] px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#57B900]/30">
                <span>✉️ Sent to:</span>
                <span className="underline">{TARGET_EMAIL}</span>
              </div>

              <p className="text-sm text-gray-600 mt-3 max-w-md mx-auto">
                Thank you, <strong>{booking.fullName || 'Valued Client'}</strong>! Our dispatch manager at{' '}
                <strong>{TARGET_PHONE}</strong> has received your clean details and will confirm your slot within 15 minutes.
              </p>
            </div>

            <div className="bg-[#F4FAEF] p-5 rounded-2xl border border-emerald-900/10 text-left max-w-md mx-auto text-xs space-y-2">
              <div className="flex justify-between pb-1.5 border-b border-gray-200">
                <span className="text-gray-500">Service:</span>
                <span className="font-bold text-[#004A2B]">
                  {selectedPackage?.title}
                </span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-gray-200">
                <span className="text-gray-500">Frequency:</span>
                <span className="font-semibold text-gray-800 capitalize">{booking.frequency}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-gray-200">
                <span className="text-gray-500">Home Size:</span>
                <span className="font-semibold text-gray-800">
                  {booking.bedrooms} Bed, {booking.bathrooms} Bath
                </span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-gray-200">
                <span className="text-gray-500">Postcode Area:</span>
                <span className="font-semibold text-gray-800 uppercase">{booking.postcode}</span>
              </div>
              {selectedAddOnNames.length > 0 && (
                <div className="flex justify-between pb-1.5 border-b border-gray-200">
                  <span className="text-gray-500">Add-ons:</span>
                  <span className="font-semibold text-gray-800">
                    {selectedAddOnNames.join(', ')}
                  </span>
                </div>
              )}
              {booking.preferredDate && (
                <div className="flex justify-between pb-1.5 border-b border-gray-200">
                  <span className="text-gray-500">Preferred Date:</span>
                  <span className="font-semibold text-gray-800">
                    {booking.preferredDate} ({booking.preferredTime})
                  </span>
                </div>
              )}
              <div className="flex justify-between pt-1 text-sm font-extrabold text-[#004A2B]">
                <span>Estimated Total:</span>
                <span>£{price}.00</span>
              </div>
            </div>

            {/* Quick Action Channels for User */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/${TARGET_PHONE_RAW.replace('+', '')}?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-5 py-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>💬 WhatsApp Dispatch ({TARGET_PHONE})</span>
              </a>

              <a
                href={`mailto:${TARGET_EMAIL}?subject=Booking%20Confirmation%20${bookingRef}&body=${mailtoBody}`}
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 px-4 py-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5"
              >
                <span>✉️ Open in Email Client</span>
              </a>

              <a
                href={`tel:${TARGET_PHONE_RAW}`}
                className="bg-[#DDF3C7] text-[#004A2B] px-4 py-3 rounded-xl font-bold text-xs hover:bg-[#cbe8ae] transition flex items-center justify-center gap-1.5"
              >
                <span>📞 Call Desk</span>
              </a>
            </div>

            <div className="pt-1">
              <button
                onClick={handleResetAndClose}
                className="text-xs text-gray-500 hover:text-gray-800 font-semibold underline cursor-pointer"
              >
                Return to Site
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Configuration Form */
          <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Step 1: Select Service */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                1. Select Service Package
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CLEANING_PACKAGES.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setBooking({ ...booking, serviceType: pkg.id })}
                    className={`p-3 rounded-xl text-left border transition text-xs font-bold ${
                      booking.serviceType === pkg.id
                        ? 'border-[#57B900] bg-[#DDF3C7]/40 text-[#004A2B] ring-2 ring-[#57B900]'
                        : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
                    }`}
                  >
                    <div className="text-[11px] font-extrabold">{pkg.title}</div>
                    <div className="text-[#57B900] text-[10px] mt-0.5">{pkg.priceDisplay}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Frequency & Home Size */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Frequency
                </label>
                <select
                  value={booking.frequency}
                  onChange={(e) =>
                    setBooking({ ...booking, frequency: e.target.value as any })
                  }
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border-gray-300 bg-white focus:ring-[#57B900] focus:border-[#57B900]"
                >
                  <option value="weekly">Weekly (Save 15%)</option>
                  <option value="fortnightly">Fortnightly (Save 10%)</option>
                  <option value="monthly">Monthly (Save 5%)</option>
                  <option value="one-off">One-Off Deep Service</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Bedrooms
                </label>
                <select
                  value={booking.bedrooms}
                  onChange={(e) =>
                    setBooking({ ...booking, bedrooms: Number(e.target.value) })
                  }
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border-gray-300 bg-white focus:ring-[#57B900] focus:border-[#57B900]"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Bedroom' : 'Bedrooms'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Bathrooms
                </label>
                <select
                  value={booking.bathrooms}
                  onChange={(e) =>
                    setBooking({ ...booking, bathrooms: Number(e.target.value) })
                  }
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border-gray-300 bg-white focus:ring-[#57B900] focus:border-[#57B900]"
                >
                  {[1, 2, 3, 4].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Bathroom' : 'Bathrooms'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 3: Add-Ons */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Optional Specialist Add-Ons
                </label>
                <span className="text-[10px] text-gray-400">Non-toxic, plant-based supplies</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ADD_ONS.map((addon) => {
                  const isSelected = booking.selectedAddOns.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddOn(addon.id)}
                      className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between text-xs cursor-pointer ${
                        isSelected
                          ? 'border-[#57B900] bg-[#DDF3C7]/30 text-[#004A2B] font-bold'
                          : 'border-gray-200 hover:border-gray-300 bg-white text-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <span>{addon.icon}</span>
                        <span className="truncate text-[11px]">{addon.name}</span>
                      </div>
                      <span className="text-[11px] font-extrabold text-[#57B900] shrink-0 ml-1">
                        +£{addon.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Scheduling & Contact Details */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Your Contact & Scheduling
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="date"
                  value={booking.preferredDate}
                  onChange={(e) => setBooking({ ...booking, preferredDate: e.target.value })}
                  className="rounded-xl border-gray-300 text-xs p-2.5 focus:ring-[#57B900] focus:border-[#57B900]"
                />
                <select
                  value={booking.preferredTime}
                  onChange={(e) => setBooking({ ...booking, preferredTime: e.target.value })}
                  className="rounded-xl border-gray-300 text-xs p-2.5 bg-white focus:ring-[#57B900] focus:border-[#57B900]"
                >
                  <option value="morning">Morning Arrival (8:30am - 12:00pm)</option>
                  <option value="afternoon">Afternoon Arrival (12:30pm - 4:30pm)</option>
                  <option value="flexible">Flexible / Anytime</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={booking.fullName}
                  onChange={(e) => setBooking({ ...booking, fullName: e.target.value })}
                  className="rounded-xl border-gray-300 text-xs p-2.5 focus:ring-[#57B900] focus:border-[#57B900]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number (e.g. 07912 345678) *"
                  value={booking.phone}
                  onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                  className="rounded-xl border-gray-300 text-xs p-2.5 focus:ring-[#57B900] focus:border-[#57B900]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={booking.email}
                  onChange={(e) => setBooking({ ...booking, email: e.target.value })}
                  className="rounded-xl border-gray-300 text-xs p-2.5 focus:ring-[#57B900] focus:border-[#57B900]"
                />
                <input
                  type="text"
                  required
                  placeholder={`Postcode (e.g. ${regionConfig.samplePostcode}) *`}
                  value={booking.postcode}
                  onChange={(e) => setBooking({ ...booking, postcode: e.target.value.toUpperCase() })}
                  className="rounded-xl border-gray-300 text-xs p-2.5 uppercase focus:ring-[#57B900] focus:border-[#57B900]"
                />
              </div>

              <textarea
                rows={2}
                placeholder="Special instructions (e.g. parking info, key safe code, focus areas)..."
                value={booking.notes}
                onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                className="w-full rounded-xl border-gray-300 text-xs p-2.5 focus:ring-[#57B900] focus:border-[#57B900]"
              />
            </div>

            {/* Pet Checkbox */}
            <div className="p-3 bg-[#F4FAEF] rounded-xl border border-[#DDF3C7] flex items-center gap-3">
              <input
                id="modal-pets"
                type="checkbox"
                checked={booking.hasPets}
                onChange={(e) => setBooking({ ...booking, hasPets: e.target.checked })}
                className="h-4 w-4 text-[#57B900] rounded border-gray-300 focus:ring-[#57B900]"
              />
              <label htmlFor="modal-pets" className="text-xs text-[#004A2B] font-medium cursor-pointer">
                🐾 <strong>I have pets at home</strong> — dispatch with specialist pet-safe botanical formulations.
              </label>
            </div>

            {/* Price Preview & Submit */}
            <div className="bg-[#004A2B] text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-[11px] text-emerald-200 uppercase font-bold tracking-wider">
                  Live Estimated Investment
                </div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl font-black text-white">£{price}.00</span>
                  <span className="text-xs text-emerald-200">
                    / Approx. {hours} hrs care
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 mt-1">
                  Sent directly to {TARGET_EMAIL} • No upfront deposit
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-[#57B900] hover:bg-[#4ea600] disabled:bg-[#57B900]/60 text-white font-extrabold px-6 py-3.5 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 text-sm shrink-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin inline-block">⏳</span>
                    <span>Dispatching...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Quote & Book</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-[10px] text-gray-500">
              🔒 SSL Encrypted • Sent to {TARGET_EMAIL} • Call & WhatsApp: {TARGET_PHONE}
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
