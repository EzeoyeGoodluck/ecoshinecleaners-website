import React from "react";
import { ActiveScreen } from "../types";
import { REVIEWS } from "../data/cleaningData";
import { BUSINESS } from "../config";
import { QuoteForm, CheckIcon } from "./QuoteForm";
import { IMAGES } from "../images";

interface HomeViewProps {
  onNavigate: (screen: ActiveScreen) => void;
  onOpenBooking: (service?: string) => void;
}

const StarRow = () => (
  <span className="text-[#F5B400] tracking-tight" aria-label="5 star rating">
    ★★★★★
  </span>
);

const SERVICES = [
  {
    id: "regular" as ActiveScreen,
    formService: "Regular Domestic Cleaning",
    title: "Regular Cleaning",
    text: "Weekly or fortnightly visits from the same vetted cleaner, using plant-based products. Keeps your home on top of itself without you lifting a finger.",
    img: IMAGES.regular,
    alt: "Bright, tidy living room",
  },
  {
    id: "deep" as ActiveScreen,
    formService: "Deep Cleaning",
    title: "Deep Cleaning",
    text: "A thorough top-to-bottom clean, including descaling, degreasing and skirting boards. Ideal before guests, after a renovation, or as a seasonal reset.",
    img: IMAGES.deep,

    alt: "Cleaning a kitchen worktop",
  },
  {
    id: "tenancy" as ActiveScreen,
    formService: "End of Tenancy Cleaning",
    title: "End of Tenancy Cleaning",
    text: "A detailed, checklist-led clean so tenants and landlords can hand over with confidence. Inside cupboards, ovens and appliances included.",
    img: IMAGES.tenancy,
    alt: "Empty, clean kitchen ready for handover",
  },
];

const WHY = [
  {
    title: "Reclean guarantee",
    text: "Not happy with something? Tell us within 24 hours and we will come back and put it right at no extra cost.",
  },
  {
    title: "100% plant-based products",
    text: "No chlorine bleach, ammonia or synthetic fragrance. Safe around children, pets and anyone with allergies.",
  },
  {
    title: "Local Northamptonshire team",
    text: "Based in Northampton and covering Northamptonshire and surrounding areas, so you speak to people who know your area, not a call centre.",
  },
  {
    title: "Vetted, insured cleaners",
    text: "Every cleaner is DBS-checked, reference-checked and covered by our public liability insurance.",
  },
];

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const regionConfig = BUSINESS;
  const displayPhone = regionConfig.phone;

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-[#F4FAEF] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            <p className="text-sm font-semibold text-[#004A2B] mb-4">
              {regionConfig.areaLong}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-[1.08] tracking-tight text-[#18201C]">
              A cleaner home, without the chemicals.
            </h1>
            <p className="mt-5 text-lg text-gray-700 max-w-xl leading-relaxed">
              Reliable domestic and commercial cleaning with plant-based
              products. Get your price in minutes and book around your week.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onOpenBooking()}
                className="btn-accent text-base"
              >
                Book online now
              </button>
              <a href="#quote-form" className="btn-secondary text-base">
                Get a free quote
              </a>
            </div>
            <p className="mt-6 text-sm text-gray-600">
              Trusted by homes and businesses across {regionConfig.areaTowns}.
            </p>
          </div>

          {/* Quote form card */}
          <div id="quote-form" className="lg:col-span-5 scroll-mt-28">
            <QuoteForm source="Homepage Quote Form" />
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            ["Reclean guarantee", "We return free of charge"],
            ["Plant-based products", "No bleach, no ammonia"],
            ["DBS-checked cleaners", "Vetted and reference-checked"],
            ["Fully insured", "Public liability cover"],
          ].map(([title, sub]) => (
            <div key={title} className="flex items-start gap-3">
              <span className="mt-0.5 w-7 h-7 shrink-0 rounded-full bg-[#DDF3C7] text-[#004A2B] flex items-center justify-center">
                <CheckIcon className="w-4 h-4" />
              </span>
              <div>
                <p className="font-bold text-[#18201C] text-sm sm:text-base leading-tight">
                  {title}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18201C]">
              Our services
            </h2>
            <p className="mt-3 text-gray-600 text-lg">
              Straightforward cleaning for homes and businesses across{" "}
              {regionConfig.areaLong}.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <article
                key={s.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col"
              >
                <img
                  src={s.img}
                  alt={s.alt}
                  className="w-full h-52 object-cover"
                  loading="lazy"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-[#18201C]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-gray-600 text-sm leading-relaxed flex-grow">
                    {s.text}
                  </p>
                  <div className="mt-5 flex items-center gap-4">
                    <button
                      onClick={() => onNavigate(s.id)}
                      className="btn-primary text-sm py-2.5 px-4"
                    >
                      Learn more
                    </button>
                    <button
                      onClick={() => onOpenBooking(s.formService)}
                      className="text-sm font-semibold text-[#004A2B] hover:underline underline-offset-4"
                    >
                      Book now
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Commercial banner */}
          <div className="mt-8 rounded-2xl bg-[#004A2B] text-white overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            <img
              src={IMAGES.commercial}
              alt="Modern office interior"
              className="lg:col-span-4 w-full h-56 lg:h-full object-cover"
              loading="lazy"
            />
            <div className="lg:col-span-8 p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex-grow">
                <h3 className="text-2xl sm:text-3xl font-extrabold">
                  Commercial cleaning, built around your business
                </h3>
                <p className="mt-3 text-[#DDF3C7] max-w-2xl leading-relaxed">
                  Offices, studios, clinics and holiday lets across{" "}
                  {regionConfig.area}, cleaned around your hours rather than
                  ours. Fume-free products, DBS-cleared staff and one monthly
                  invoice.
                </p>
              </div>
              <button
                onClick={() => onNavigate("commercial")}
                className="btn-accent text-base shrink-0"
              >
                Request a quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 lg:py-20 bg-[#F4FAEF] border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18201C]">
              Why choose EcoShine
            </h2>
            <p className="mt-3 text-gray-600 text-lg">
              A clean home should not come with a chemical smell. Here is what
              you get with every visit.
            </p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
            {WHY.map((w) => (
              <div key={w.title} className="flex gap-4">
                <span className="mt-1 w-7 h-7 shrink-0 rounded-full bg-[#004A2B] text-white flex items-center justify-center">
                  <CheckIcon className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-bold text-lg text-[#18201C]">
                    {w.title}
                  </h3>
                  <p className="mt-1.5 text-gray-600 text-sm leading-relaxed">
                    {w.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18201C]">
              What customers say
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.slice(0, 3).map((r) => (
              <figure
                key={r.id}
                className="bg-[#F4FAEF] rounded-2xl p-6 flex flex-col"
              >
                <div className="text-lg">
                  <StarRow />
                </div>
                <blockquote className="mt-3 text-gray-700 text-sm leading-relaxed flex-grow">
                  {r.quote}
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-bold text-[#18201C]">{r.name}</span>
                  <span className="text-gray-500">, {r.location}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#004A2B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Ready to book your clean?
          </h2>
          <p className="mt-3 text-[#DDF3C7] text-lg">
            Fully insured, easy to schedule and backed by our reclean guarantee.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onOpenBooking()}
              className="btn-accent text-base"
            >
              Book now
            </button>
            <a
              href={`tel:${regionConfig.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/70 px-6 py-3.5 font-bold text-white hover:bg-white/10 transition"
            >
              Call {displayPhone}
            </a>
          </div>
          <p className="mt-4 text-sm text-[#DDF3C7]">
            Second line:{" "}
            <a
              href={`tel:${regionConfig.phone2Raw}`}
              className="font-semibold underline underline-offset-4"
            >
              {regionConfig.phone2}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};
