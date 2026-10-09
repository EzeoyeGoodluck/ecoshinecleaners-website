import React, { useState } from 'react';
import { REVIEWS, REGIONS } from '../data/cleaningData';
import { Region } from '../types';

interface ReviewsViewProps {
  selectedRegion: Region;
  onOpenQuote: () => void;
}

export const ReviewsView: React.FC<ReviewsViewProps> = ({ selectedRegion, onOpenQuote }) => {
  const regionConfig = REGIONS[selectedRegion];
  const [filter, setFilter] = useState<string>('all');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submittedFeedback, setSubmittedFeedback] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', location: '', rating: 5, quote: '', service: 'Domestic Clean' });

  const filteredReviews = filter === 'all'
    ? REVIEWS
    : REVIEWS.filter((r) => r.serviceType.toLowerCase().includes(filter.toLowerCase()));

  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReview(true);

    const payload = {
      source: 'Customer Review',
      name: newReview.name,
      location: newReview.location,
      rating: newReview.rating,
      quote: newReview.quote,
      serviceType: newReview.service,
      region: regionConfig.name,
      targetEmail: 'info@ecoshinecleaners.uk.com',
      targetPhone: '+44 7375 614692',
    };

    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch((err) => console.log('Backend review submit error:', err));

      await fetch('https://formsubmit.co/ajax/info@ecoshinecleaners.uk.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `[EcoShine Customer Review] ${newReview.name} (${newReview.location})`,
          _template: 'table',
          _captcha: 'false',
          ...payload,
        }),
      }).catch((err) => console.log('FormSubmit review error:', err));
    } catch (err) {
      console.log('Handled review submit:', err);
    } finally {
      setIsSubmittingReview(false);
      setSubmittedFeedback(true);
      setTimeout(() => {
        setShowSubmitModal(false);
        setSubmittedFeedback(false);
      }, 3500);
    }
  };

  return (
    <div className="w-full py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Title & Trust Score */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-extrabold uppercase text-[#57B900] tracking-widest block">
          Verified Customer Ratings
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18201C]">
          What {regionConfig.name.includes('Southampton') ? 'Hampshire' : 'Northamptonshire'} Residents Say About Us
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Real feedback from local homeowners, busy parents, landlords, and holiday let hosts who
          breathe cleaner air thanks to EcoShine.
        </p>

        {/* Big Trust Score Banner */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
            <span className="text-4xl sm:text-5xl font-black text-[#004A2B]">4.9</span>
            <div className="text-left">
              <div className="text-[#57B900] text-lg font-bold">★★★★★</div>
              <div className="text-xs font-bold text-gray-800">340+ Verified Local Cleans</div>
              <div className="text-[11px] text-gray-500">100% Non-Toxic Chemical-Free Score</div>
            </div>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-5 py-3 rounded-xl bg-white border border-[#004A2B] text-[#004A2B] hover:bg-[#F4FAEF] font-bold text-xs transition"
          >
            ✍️ Leave Your Feedback
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {['all', 'domestic', 'tenancy', 'deep', 'commercial'].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition capitalize ${
              filter === category
                ? 'bg-[#004A2B] text-white shadow-xs'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
            }`}
          >
            {category === 'all'
              ? 'All Reviews (340+)'
              : category === 'domestic'
              ? 'Domestic Routine'
              : category === 'tenancy'
              ? 'End of Tenancy'
              : category === 'deep'
              ? 'Deep Cleans'
              : 'Commercial'}
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReviews.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-2xl border border-emerald-900/10 p-6 sm:p-7 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#57B900] text-base font-bold">
                  {'★'.repeat(r.rating)}
                </span>
                <span className="text-[11px] text-emerald-800 bg-[#DDF3C7] px-2.5 py-0.5 rounded-full font-bold">
                  ✓ Verified Clean
                </span>
              </div>
              <p className="text-sm text-gray-700 italic leading-relaxed">
                "{r.quote}"
              </p>
            </div>

            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
              <div className="w-10 h-10 rounded-full bg-[#004A2B] text-white font-extrabold text-xs flex items-center justify-center">
                {r.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#18201C]">{r.name}</h4>
                <p className="text-xs text-gray-500">
                  {r.location} • <span className="text-[#004A2B] font-semibold">{r.serviceType}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="bg-[#DDF3C7] rounded-3xl p-8 text-center max-w-2xl mx-auto space-y-4 border border-[#57B900]/20">
        <h3 className="text-2xl font-extrabold text-[#004A2B]">
          Ready to experience the pure difference?
        </h3>
        <p className="text-xs sm:text-sm text-gray-700">
          Book your first weekly, fortnightly, or one-off eco-clean in less than 60 seconds.
        </p>
        <button
          onClick={onOpenQuote}
          className="bg-[#004A2B] hover:bg-black text-white font-extrabold py-3.5 px-8 rounded-xl text-sm transition shadow-md"
        >
          Get Your Instant Quote →
        </button>
      </div>

      {/* Feedback Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-200">
            {submittedFeedback ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-[#DDF3C7] text-[#004A2B] rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h4 className="font-bold text-lg text-[#004A2B]">Thank You for Your Feedback!</h4>
                <div className="inline-flex items-center gap-1.5 bg-[#DDF3C7] text-[#004A2B] px-3 py-1 rounded-full text-[11px] font-bold">
                  <span>✉️ Forwarded to:</span>
                  <span className="underline">info@ecoshinecleaners.uk.com</span>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Your feedback helps us maintain our 5-star chemical-free standard across Northamptonshire and all local routes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b">
                  <h3 className="font-bold text-[#004A2B] text-lg">Leave a Customer Review</h3>
                  <button type="button" onClick={() => setShowSubmitModal(false)} className="text-gray-400 font-bold hover:text-gray-700">✕</button>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Name *</label>
                  <input
                    required
                    type="text"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-[#57B900] focus:border-[#57B900]"
                    placeholder="e.g. Rachel K."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Area / Suburb *</label>
                  <input
                    required
                    type="text"
                    value={newReview.location}
                    onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-[#57B900] focus:border-[#57B900]"
                    placeholder="e.g. Abington, Northampton"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Review *</label>
                  <textarea
                    required
                    rows={3}
                    value={newReview.quote}
                    onChange={(e) => setNewReview({ ...newReview, quote: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-[#57B900] focus:border-[#57B900]"
                    placeholder="Tell us about the cleaner, the scent, and your experience..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="w-full bg-[#57B900] hover:bg-[#4ea600] disabled:bg-[#57B900]/60 text-white py-3 rounded-xl font-bold text-xs transition cursor-pointer"
                >
                  {isSubmittingReview ? 'Submitting to EcoShine...' : 'Submit Review to Team →'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
