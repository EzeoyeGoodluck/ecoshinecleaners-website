import React, { useState, useEffect } from 'react';
import { ActiveScreen } from './types';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { ServicePage } from './components/ServicePage';
import { FAQView } from './components/FAQView';
import { QuoteView } from './components/QuoteView';
import { ContactView } from './components/ContactView';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { QuoteBookingModal } from './components/QuoteBookingModal';
import { getService } from './data/services';

const SCREENS: ActiveScreen[] = ['home', 'regular', 'deep', 'tenancy', 'commercial', 'faq', 'quote', 'contact'];

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState('');

  const openBooking = (service = '') => {
    setBookingService(service);
    setIsBookingOpen(true);
  };

  const navigate = (screen: ActiveScreen) => {
    setActiveScreen(screen);
    window.history.replaceState(null, '', screen === 'home' ? window.location.pathname : `#${screen}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const fromHash = () => {
      const hash = window.location.hash.replace('#', '') as ActiveScreen;
      if (SCREENS.includes(hash)) setActiveScreen(hash);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  const service = getService(activeScreen);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#18201C] pb-16 lg:pb-0 selection:bg-[#DDF3C7] selection:text-[#004A2B]">
      <Header activeScreen={activeScreen} onNavigate={navigate} onOpenBooking={() => openBooking()} />

      <main className="flex-grow">
        {activeScreen === 'home' && <HomeView onNavigate={navigate} onOpenBooking={openBooking} />}
        {service && <ServicePage service={service} onOpenBooking={() => openBooking(service.formService)} onNavigate={navigate} />}
        {activeScreen === 'faq' && <FAQView onOpenBooking={() => openBooking()} onNavigate={navigate} />}
        {activeScreen === 'quote' && <QuoteView />}
        {activeScreen === 'contact' && <ContactView />}
      </main>

      <Footer onNavigate={navigate} />
      <MobileStickyBar onOpenBooking={() => openBooking()} />
      <QuoteBookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} initialService={bookingService} />
    </div>
  );
}
