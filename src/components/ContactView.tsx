import React, { useState } from 'react';
import { Region } from '../types';
import { REGION_ZONES, REGIONS, FAQS } from '../data/cleaningData';
import cleanerPortraitImg from '../assets/images/cleaner_portrait_1791129329275.jpg';

interface ContactViewProps {
  selectedRegion: Region;
}

export const ContactView: React.FC<ContactViewProps> = ({ selectedRegion }) => {
  const regionConfig = REGIONS[selectedRegion];

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    postcode: '',
    serviceType: 'domestic',
    contactMethod: 'whatsapp',
    message: '',
    hasPets: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionRef, setSubmissionRef] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const ref = 'ECO-' + Math.floor(100000 + Math.random() * 900000);
    setSubmissionRef(ref);

    const payload = {
      referenceId: ref,
      fullName: form.fullName,
      phone: form.phone,
      email: form.email,
      postcode: form.postcode,
      serviceType: form.serviceType,
      contactMethod: form.contactMethod,
      message: form.message,
      hasPets: form.hasPets,
      source: 'Online Contact Enquiry',
      region: regionConfig.name,
      targetEmail: 'info@ecoshinecleaners.uk.com',
      targetPhone: '+44 7375 614692',
    };

    try {
      // 1. Submit to local Express backend API
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch((err) => console.log('Backend log:', err));

      // 2. Direct client-side dispatch to FormSubmit for info@ecoshinecleaners.uk.com
      await fetch('https://formsubmit.co/ajax/info@ecoshinecleaners.uk.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `New EcoShine Clean Enquiry from ${form.fullName} (${form.serviceType})`,
          _template: 'table',
          _captcha: 'false',
          ...payload,
        }),
      }).catch((err) => console.log('Direct email dispatch status:', err));
    } catch (err) {
      console.log('Submission handled:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello EcoShine Cleaners!\nI submitted an enquiry (Ref: ${submissionRef}):\nName: ${form.fullName}\nPhone: ${form.phone}\nEmail: ${form.email}\nPostcode: ${form.postcode}\nService: ${form.serviceType}\nPets: ${form.hasPets ? 'Yes' : 'No'}\nMessage: ${form.message || 'Ready to book'}`
  );

  const mailtoBody = encodeURIComponent(
    `Hi EcoShine Team,\n\nI have submitted an enquiry:\nRef: ${submissionRef}\nName: ${form.fullName}\nPhone: ${form.phone}\nPostcode: ${form.postcode}\nService: ${form.serviceType}\nPets: ${form.hasPets ? 'Yes' : 'No'}\n\nNotes: ${form.message || 'Please contact me.'}`
  );

  return (
    <div className="w-full bg-[#F4FAEF] min-h-screen">
      {/* BEGIN: HeroSection (matches Image 7.png) */}
      <section
        className="hero-glow pt-12 pb-10 sm:pt-16 sm:pb-12 text-center px-4"
        data-purpose="contact-hero"
      >
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#DDF3C7] border border-[#57B900]/30 text-[#004A2B] font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-[#57B900] animate-ping" />
            <span>
              {regionConfig.name.includes('Southampton')
                ? 'SOUTHAMPTON LOCAL SUPPORT & DISPATCH'
                : 'NORTHAMPTON LOCAL SUPPORT & DISPATCH'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#004A2B] tracking-tight mb-4">
            Get in Touch with Our Friendly <br className="hidden sm:inline" />
            {regionConfig.name.includes('Southampton') ? 'Hampshire Eco-Team' : 'Northamptonshire Eco-Team'}
          </h1>

          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Have a question about our non-toxic methods, need a custom commercial quote, or want to
            confirm coverage for your postcode? We typically reply within 15 minutes during operating
            hours.
          </p>
        </div>
      </section>
      {/* END: HeroSection */}

      {/* BEGIN: MainContentGrid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Contact Form (7 cols) */}
          <section
            className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 custom-shadow border border-emerald-100"
            data-purpose="enquiry-form-card"
            id="enquiry-form"
          >
            <div className="border-b border-gray-100 pb-4 mb-6">
              <h2 className="text-2xl font-bold text-[#004A2B] flex items-center gap-2">
                Send an Online Enquiry
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Fill in the quick details below and your local {regionConfig.name.split('&')[0]} coordinator
                will be in touch shortly.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-5 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-[#DDF3C7] text-[#004A2B] rounded-full flex items-center justify-center mx-auto text-3xl font-extrabold">
                  ✓
                </div>
                <div>
                  <span className="text-xs uppercase font-extrabold text-[#57B900] tracking-wider block mb-1">
                    Enquiry Reference: {submissionRef}
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#004A2B]">Enquiry Dispatched!</h3>
                  <div className="mt-2.5 inline-flex items-center gap-2 bg-[#DDF3C7] text-[#004A2B] px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#57B900]/30">
                    <span>✉️ Sent to:</span>
                    <span className="underline">info@ecoshinecleaners.uk.com</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{form.fullName}</strong>! Your message has been received by our
                  dispatch desk. We will contact you via{' '}
                  <strong className="uppercase text-[#004A2B]">{form.contactMethod}</strong> at{' '}
                  <strong>{form.phone}</strong> within 15 minutes.
                </p>

                {/* Instant Connect Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`https://wa.me/447375614692?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#25D366] hover:bg-[#1ebc57] text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
                  >
                    <span>💬 WhatsApp Dispatch (+44 7375 614692)</span>
                  </a>

                  <a
                    href={`mailto:info@ecoshinecleaners.uk.com?subject=EcoShine Enquiry [${submissionRef}]&body=${mailtoBody}`}
                    className="bg-[#004A2B] hover:bg-black text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
                  >
                    <span>✉️ Email Draft Copy</span>
                  </a>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        fullName: '',
                        phone: '',
                        email: '',
                        postcode: '',
                        serviceType: 'domestic',
                        contactMethod: 'whatsapp',
                        message: '',
                        hasPets: false,
                      });
                    }}
                    className="text-xs text-gray-500 hover:text-[#004A2B] underline font-semibold"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs font-semibold uppercase tracking-wider text-[#18201C] mb-1.5"
                      htmlFor="full-name"
                    >
                      Full Name <span className="text-[#57B900] font-bold">*</span>
                    </label>
                    <input
                      id="full-name"
                      required
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full rounded-lg border-gray-300 focus:border-[#57B900] focus:ring-[#57B900] text-sm py-2.5"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold uppercase tracking-wider text-[#18201C] mb-1.5"
                      htmlFor="phone"
                    >
                      Phone Number <span className="text-[#57B900] font-bold">*</span>
                    </label>
                    <input
                      id="phone"
                      required
                      type="tel"
                      placeholder="e.g. 07912 345678"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-lg border-gray-300 focus:border-[#57B900] focus:ring-[#57B900] text-sm py-2.5"
                    />
                  </div>
                </div>

                {/* Email & Postcode Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs font-semibold uppercase tracking-wider text-[#18201C] mb-1.5"
                      htmlFor="email"
                    >
                      Email Address <span className="text-[#57B900] font-bold">*</span>
                    </label>
                    <input
                      id="email"
                      required
                      type="email"
                      placeholder="sarah@example.co.uk"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-lg border-gray-300 focus:border-[#57B900] focus:ring-[#57B900] text-sm py-2.5"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold uppercase tracking-wider text-[#18201C] mb-1.5"
                      htmlFor="postcode"
                    >
                      {regionConfig.name.includes('Southampton') ? 'Hampshire Postcode' : 'Northampton Postcode'}{' '}
                      <span className="text-[#57B900] font-bold">*</span>
                    </label>
                    <input
                      id="postcode"
                      required
                      type="text"
                      placeholder={`e.g. ${regionConfig.samplePostcode}`}
                      value={form.postcode}
                      onChange={(e) => setForm({ ...form, postcode: e.target.value.toUpperCase() })}
                      className="w-full rounded-lg border-gray-300 focus:border-[#57B900] focus:ring-[#57B900] text-sm py-2.5 uppercase"
                    />
                  </div>
                </div>

                {/* Service of Interest */}
                <div>
                  <label
                    className="block text-xs font-semibold uppercase tracking-wider text-[#18201C] mb-1.5"
                    htmlFor="service-type"
                  >
                    Service of Interest
                  </label>
                  <select
                    id="service-type"
                    value={form.serviceType}
                    onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                    className="w-full rounded-lg border-gray-300 focus:border-[#57B900] focus:ring-[#57B900] text-sm py-2.5 bg-white"
                  >
                    <option value="domestic">Regular Domestic Eco-Cleaning (Weekly/Bi-weekly)</option>
                    <option value="deep-clean">Deep Spring Clean & Refresh</option>
                    <option value="tenancy">End of Tenancy Deposit-Back Guarantee Clean</option>
                    <option value="commercial">Commercial, Office & Airbnb Turnover</option>
                    <option value="general">General Enquiry / Custom Requirements</option>
                  </select>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#18201C] mb-2">
                    Preferred Contact Method
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['whatsapp', 'phone', 'email'].map((method) => (
                      <label
                        key={method}
                        className={`flex items-center justify-center p-2.5 border rounded-lg cursor-pointer transition capitalize text-xs font-medium ${
                          form.contactMethod === method
                            ? 'border-[#57B900] bg-[#DDF3C7]/40 text-[#004A2B] font-bold'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="contact-method"
                          value={method}
                          checked={form.contactMethod === method}
                          onChange={(e) => setForm({ ...form, contactMethod: e.target.value })}
                          className="mr-2 text-[#57B900] focus:ring-[#57B900]"
                        />
                        <span>{method === 'whatsapp' ? 'WhatsApp' : method === 'phone' ? 'Phone Call' : 'Email'}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    className="block text-xs font-semibold uppercase tracking-wider text-[#18201C] mb-1.5"
                    htmlFor="message"
                  >
                    Message / Special Property Requirements
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="Tell us about number of bedrooms, bathrooms, flooring types or specific key handling details..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-lg border-gray-300 focus:border-[#57B900] focus:ring-[#57B900] text-sm p-3"
                  />
                </div>

                {/* Pet-friendly Checkbox */}
                <div className="p-3.5 bg-[#F4FAEF] rounded-xl border border-[#DDF3C7] flex items-start gap-3">
                  <input
                    id="pets"
                    type="checkbox"
                    checked={form.hasPets}
                    onChange={(e) => setForm({ ...form, hasPets: e.target.checked })}
                    className="h-4 w-4 text-[#57B900] rounded border-gray-300 focus:ring-[#57B900] mt-0.5"
                  />
                  <label
                    htmlFor="pets"
                    className="text-xs text-[#004A2B] font-medium leading-relaxed cursor-pointer"
                  >
                    🐾 <strong>I have pets at home</strong> — please dispatch with our specialist
                    pet-safe botanical & probiotic solutions (completely non-toxic to cats & dogs).
                  </label>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-lg bg-[#57B900] hover:bg-[#4ea800] text-white font-bold text-base transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
                  >
                    <span>Send Message / Request Callback</span>
                    <span className="text-lg">→</span>
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
                    <span>🔒</span> We protect your data. No spam, ever. Response guaranteed within 2 hours.
                  </p>
                </div>
              </form>
            )}
          </section>

          {/* Right Column: Direct Contact & Dispatch Hub (5 cols) */}
          <section className="lg:col-span-5 space-y-6" data-purpose="contact-sidebar">
            {/* Team Image Banner Card */}
            <div
              className="bg-white rounded-2xl overflow-hidden border border-emerald-100 custom-shadow"
              data-purpose="team-showcase"
            >
              <div className="relative h-56 w-full">
                <img
                  src={cleanerPortraitImg}
                  alt="Friendly professional eco cleaner team member"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white">
                    <span className="bg-[#57B900] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wider">
                      {regionConfig.name.includes('Southampton') ? 'Local Southampton Crew' : 'Local Northampton Crew'}
                    </span>
                    <p className="text-sm font-semibold mt-1">
                      Vetted, DBS-Checked & Living Wage Accredited
                    </p>
                  </div>
                </div>
              </div>

              {/* Fast Connect Channels */}
              <div className="p-6 bg-white divide-y divide-gray-100">
                {/* Direct Phone */}
                <div className="pb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#DDF3C7]/60 flex items-center justify-center text-[#004A2B] font-bold">
                      📞
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">Direct Telephone</div>
                      <a
                        className="text-base font-bold text-[#004A2B] hover:text-[#57B900] transition"
                        href={`tel:${regionConfig.phoneRaw}`}
                      >
                        {regionConfig.phone}
                      </a>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-800 bg-[#DDF3C7] px-2.5 py-1 rounded font-bold">
                    Immediate
                  </span>
                </div>

                {/* WhatsApp Direct */}
                <div className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-[#57B900] font-bold">
                      💬
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">WhatsApp Business</div>
                      <a
                        className="text-base font-bold text-[#004A2B] hover:text-[#57B900] transition"
                        href={regionConfig.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {regionConfig.whatsappNumber}
                      </a>
                    </div>
                  </div>
                  <a
                    className="text-xs bg-[#004A2B] text-white px-3 py-1.5 rounded-md font-semibold hover:bg-black transition"
                    href={regionConfig.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Chat Dispatch
                  </a>
                </div>

                {/* Email Direct */}
                <div className="py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-bold">
                    ✉️
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium">Support Email</div>
                    <a
                      className="text-sm font-bold text-[#004A2B] hover:text-[#57B900] transition"
                      href={`mailto:${regionConfig.email}`}
                    >
                      {regionConfig.email}
                    </a>
                  </div>
                </div>

                {/* Operational Hours */}
                <div className="pt-4 text-xs text-gray-600 space-y-1">
                  <div className="flex justify-between font-medium">
                    <span>Monday – Saturday:</span>
                    <span className="text-[#18201C] font-semibold">8:00 AM – 6:30 PM</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Sunday:</span>
                    <span className="text-emerald-700 font-semibold">
                      Emergency / End-of-Tenancy Priority
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Local Dispatch Base Card */}
            <div
              className="bg-[#004A2B] text-white rounded-2xl p-6 custom-shadow relative overflow-hidden"
              data-purpose="hub-location-card"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <span>📍</span>{' '}
                    <span>
                      {regionConfig.name.includes('Southampton') ? 'Southampton Dispatch Hub' : 'Northampton Dispatch Hub'}
                    </span>
                  </h3>
                  <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 border border-[#57B900]/40 px-2.5 py-1 rounded-full text-[11px] text-[#DDF3C7]">
                    <span className="w-2 h-2 rounded-full bg-[#57B900] animate-pulse" />
                    <span>Live Active</span>
                  </span>
                </div>

                <p className="text-xs text-emerald-100 leading-relaxed mb-4">
                  EcoShine Cleaners Ltd
                  <br />
                  {regionConfig.address}
                </p>

                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs border border-white/10 text-xs text-emerald-50">
                  <p className="font-semibold text-[#DDF3C7] mb-0.5">Live Dispatch Status:</p>
                  <p>
                    🟢 Active mobile teams on route in{' '}
                    <strong className="text-white">{regionConfig.activeZones}</strong> today.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      {/* END: MainContentGrid */}

      {/* BEGIN: CoverageFinderSection (matches Image 7.png) */}
      <section
        className="bg-white border-y border-emerald-100 py-16"
        data-purpose="postcode-coverage-finder"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#57B900]">
              {regionConfig.name.includes('Southampton') ? 'Hampshire Coverage Map' : 'Northamptonshire Coverage Map'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#004A2B] mt-1 mb-3">
              Areas We Cover Across {regionConfig.name}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Our mobile zero-emission van hubs dispatch fully supplied with eco-concentrates and
              HEPA-filter gear across these key regional sectors:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(REGION_ZONES[selectedRegion] || []).map((zone, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-gray-200 bg-[#F4FAEF]/40 hover:border-[#57B900] transition shadow-2xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold bg-[#004A2B] text-white px-2 py-0.5 rounded">
                    {zone.code}
                  </span>
                  <span className="text-[11px] text-[#57B900] font-bold flex items-center gap-1">
                    ✓ {zone.status}
                  </span>
                </div>
                <h4 className="font-bold text-[#004A2B] text-base">{zone.areaName}</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">{zone.suburbs}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-[#DDF3C7]/70 border border-[#57B900]/30 rounded-xl p-4 text-center text-xs sm:text-sm text-[#004A2B] font-medium">
            🔔 Don’t see your specific postcode? Call our friendly team on{' '}
            <a className="underline font-bold hover:text-[#57B900]" href={`tel:${regionConfig.phoneRaw}`}>
              {regionConfig.phone}
            </a>{' '}
            — we frequently accommodate nearby locations with zero extra travel surcharge.
          </div>
        </div>
      </section>
      {/* END: CoverageFinderSection */}

      {/* BEGIN: FAQSection */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full" data-purpose="contact-faqs">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#004A2B]">
            Frequently Asked Contact Questions
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Everything you need to know about booking our team
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'How quickly can you arrange an eco-clean?',
              a: 'For regular weekly or fortnightly cleaning, we can typically commence service within 48 to 72 hours of your initial quote. For short-notice End of Tenancy or emergency moves, we hold dedicated standby dispatch slots across our core sectors.',
            },
            {
              q: 'Do I need to be home when your team arrives?',
              a: 'No, the majority of our regular domestic clients are at work. We offer a secure key-holding service managed through high-security lockbox codes. All our cleaners are fully insured, enhanced DBS-checked, and vetted.',
            },
            {
              q: "What happens if my letting agent isn't satisfied with an End of Tenancy clean?",
              a: 'All our End of Tenancy cleans include a 100% Deposit-Back Guarantee. In the rare event your estate agent or landlord flags any area on their check-out inventory, our mobile team returns free of charge within 48 hours to rectify it.',
            },
          ].map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 border border-emerald-100 shadow-2xs transition cursor-pointer"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="font-bold text-[#004A2B] text-base flex justify-between items-center">
                <span>{faq.q}</span>
                <span className="text-[#57B900] font-bold text-xl">
                  {openFaq === i ? '↑' : '↓'}
                </span>
              </div>
              {openFaq === i && (
                <p className="text-sm text-gray-600 mt-3 leading-relaxed animate-in fade-in">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
      {/* END: FAQSection */}
    </div>
  );
};
