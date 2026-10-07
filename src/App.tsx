/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveScreen, ServiceType, Region, BookingState } from './types';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { ServicesView } from './components/ServicesView';
import { ServiceAreasView } from './components/ServiceAreasView';
import { ReviewsView } from './components/ReviewsView';
import { ContactView } from './components/ContactView';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { QuoteBookingModal } from './components/QuoteBookingModal';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('home');
  const [selectedRegion, setSelectedRegion] = useState<Region>('southampton');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteInitialService, setQuoteInitialService] = useState<ServiceType>('regular');
  const [quoteInitialData, setQuoteInitialData] = useState<Partial<BookingState> | undefined>(undefined);

  const handleOpenQuote = (
    service?: ServiceType,
    initialDataOrAddOns?: Partial<BookingState> | string[]
  ) => {
    if (service) setQuoteInitialService(service);
    if (Array.isArray(initialDataOrAddOns)) {
      setQuoteInitialData({ selectedAddOns: initialDataOrAddOns });
    } else {
      setQuoteInitialData(initialDataOrAddOns);
    }
    setIsQuoteOpen(true);
  };

  const handleNavigate = (screen: ActiveScreen) => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Listen to hash changes if any
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'pricing-grid' || hash === 'services' || hash === 'regular' || hash === 'deep-clean' || hash === 'tenancy') {
        setActiveScreen('services');
      } else if (hash === 'contact' || hash === 'enquiry-form') {
        setActiveScreen('contact');
      } else if (hash === 'reviews') {
        setActiveScreen('reviews');
      } else if (hash === 'areas' || hash === 'comparison-matrix') {
        setActiveScreen('areas');
      }
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4FAEF] text-[#18201C] pb-14 lg:pb-0 selection:bg-[#DDF3C7] selection:text-[#004A2B]">
      {/* Sticky Header with Notification Bar */}
      <Header
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
        onOpenQuote={() => handleOpenQuote('regular')}
        selectedRegion={selectedRegion}
        onSelectRegion={setSelectedRegion}
      />

      {/* Main Dynamic Screen Content */}
      <main className="flex-grow">
        {activeScreen === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenQuote={handleOpenQuote}
            selectedRegion={selectedRegion}
          />
        )}

        {activeScreen === 'services' && (
          <ServicesView
            onOpenQuote={handleOpenQuote}
            selectedRegion={selectedRegion}
          />
        )}

        {activeScreen === 'areas' && (
          <ServiceAreasView
            selectedRegion={selectedRegion}
            onOpenQuote={() => handleOpenQuote('regular')}
          />
        )}

        {activeScreen === 'reviews' && (
          <ReviewsView
            selectedRegion={selectedRegion}
            onOpenQuote={() => handleOpenQuote('regular')}
          />
        )}

        {activeScreen === 'contact' && (
          <ContactView selectedRegion={selectedRegion} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} selectedRegion={selectedRegion} />

      {/* Mobile Sticky Bottom CTA */}
      <MobileStickyBar
        onOpenQuote={() => handleOpenQuote('regular')}
        selectedRegion={selectedRegion}
      />

      {/* Interactive Booking & Instant Quote Modal */}
      <QuoteBookingModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialService={quoteInitialService}
        initialData={quoteInitialData}
        selectedRegion={selectedRegion}
      />
    </div>
  );
}
