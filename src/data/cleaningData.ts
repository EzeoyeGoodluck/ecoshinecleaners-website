import { Review } from '../types';

export const FAQS = [
  {
    q: 'Do I need to supply cleaning products or a vacuum?',
    a: 'Not at all! Our cleaners bring their own professional commercial HEPA-filtered vacuum cleaners, washed microfiber cloths, and full kits of plant-based EcoShine solutions in amber refill bottles.'
  },
  {
    q: 'Which areas in Northamptonshire do you cover?',
    a: 'We cover all Northamptonshire postcodes across Northampton (NN1 through NN5), plus Kettering, Corby, Wellingborough, Daventry, Towcester, Rushden, Brackley, and surrounding county towns and villages with zero travel surcharge.'
  },
  {
    q: 'How does your 100% Deposit Return Guarantee work?',
    a: 'Our move-out team follows an official letting agent inventory checklist. If your property manager flags any cleaning issue within 48 hours of inspection, we return and reclean the highlighted item completely free of charge.'
  },
  {
    q: 'Are your botanical products really as effective as bleach?',
    a: 'Yes! Our high-grade enzyme concentrates and natural citric acid formulations break down grease and limescale at a microscopic level, destroying 99.9% of bacteria without releasing volatile organic compounds (VOCs) into your home’s air.'
  },
  {
    q: 'What if I have curious cats or dogs?',
    a: 'All our formulations are strictly pet-safe, non-toxic, and free from endocrine-disrupting artificial musk. We also ensure our team knows how to gently navigate around your furry companions.'
  }
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Sarah M.',
    location: 'Abington, Northampton',
    serviceType: 'Regular Domestic Clean',
    rating: 5,
    quote: 'EcoShine has been cleaning our home in Abington for 6 months now. Fresh, clean, and no chemical smell! With a 4-month-old baby and a golden retriever, having zero chemical bleach smells gives us total peace of mind. Truly spotless results every Tuesday!',
    verified: true
  },
  {
    id: '2',
    name: 'James T.',
    location: 'Northampton Town Centre (NN1)',
    serviceType: 'End of Tenancy Clean',
    rating: 5,
    quote: 'Best end-of-tenancy clean I’ve ever booked. We moved out of our Derngate flat, and the inventory check-out clerk said it was the cleanest flat they’d inspected all month. Full deposit returned without a single question.',
    verified: true
  },
  {
    id: '3',
    name: 'Claire & David',
    location: 'Towcester & Daventry',
    serviceType: 'Deep Clean Revival',
    rating: 5,
    quote: 'Reliable, always on time, and our dog doesn’t sneeze after they clean! The natural lemongrass and eucalyptus scent is heavenly. Their customer support over WhatsApp is also wonderfully responsive.',
    verified: true
  },
  {
    id: '4',
    name: 'Marcus L.',
    location: 'Duston & Kingsthorpe',
    serviceType: 'Commercial Office Care',
    rating: 5,
    quote: 'We switched our business studio in Duston to EcoShine. Staff immediately noticed the fresher air quality. Zero fumes in the morning, and the team handles keys with total professional discretion.',
    verified: true
  },
  {
    id: '5',
    name: 'Emma P.',
    location: 'Wootton & Grange Park',
    serviceType: 'Regular Domestic Clean',
    rating: 5,
    quote: 'Finding a reliable, eco-friendly cleaner in Northamptonshire was tough until we found EcoShine. Our bathrooms sparkle without that harsh stinging bleach smell. Highly recommended!',
    verified: true
  },
  {
    id: '6',
    name: 'Robert K.',
    location: 'Kettering & Burton Latimer',
    serviceType: 'Deep Clean Revival',
    rating: 5,
    quote: 'Prompt, courteous and left our 4-bedroom house gleaming from top to bottom. Fantastic to have a local Northamptonshire company dedicated to non-toxic methods.',
    verified: true
  }
];
