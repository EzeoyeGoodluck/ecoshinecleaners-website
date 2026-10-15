import { ActiveScreen } from '../types';

export interface ServiceContent {
  id: ActiveScreen;
  nav: string;
  title: string;
  intro: string;
  formService: string;
  isCommercial?: boolean;
  audienceHeading: string;
  audienceIntro?: string;
  audience: { title: string; text: string }[];
  includedIntro: string;
  included: { area: string; items: string[] }[];
  addOns?: string[];
  whyHeading: string;
  why: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  ctaHeading: string;
  ctaText?: string;
}

const insured = { title: 'Fully insured', text: 'Covered by public liability insurance, with DBS-checked cleaners on every job.' };
const reclean = { title: 'Reclean guarantee', text: 'Not happy? Tell us within 24 hours and we will come back and put it right at no extra cost.' };
const plantBased = { title: 'Plant-based products', text: 'No chlorine bleach, ammonia or synthetic fragrance. Safe around children, pets and allergies.' };
const products = {
  q: 'Do I need to provide cleaning products?',
  a: 'No. Our cleaners bring their own plant-based products, cloths and a HEPA-filter vacuum. If you would rather we use yours, just say so when you book.',
};

export const SERVICES: ServiceContent[] = [
  {
    id: 'regular',
    nav: 'Regular Cleaning',
    title: 'Regular cleaning',
    intro: 'Weekly or fortnightly visits from a consistent cleaner, so your home stays looked after without you having to think about it.',
    formService: 'Regular Domestic Cleaning',
    audienceHeading: 'Who it is for',
    audience: [
      { title: 'Busy professionals', text: 'Want a consistently tidy home without spending evenings and weekends cleaning it themselves.' },
      { title: 'Families', text: 'Need regular help keeping on top of a busy household: kitchens, bathrooms and living spaces used every day.' },
      { title: 'Anyone who would rather not', text: 'Simply do not want to spend free time cleaning, and want the same trusted cleaner each visit.' },
    ],
    includedIntro: 'Every regular visit covers these areas as standard.',
    included: [
      { area: 'Kitchen', items: ['Worktops cleared and disinfected', 'Hob top wiped, oven exterior wiped', 'Cabinet fronts and handles wiped', 'Appliance exteriors wiped', 'Sink, taps and drain covers scrubbed and polished', 'Bins emptied, floor swept and mopped'] },
      { area: 'Bathrooms', items: ['Toilet cleaned inside and out, limescale removed', 'Sink and worktops scrubbed and polished', 'Shower and bath exterior cleaned', 'Mirrors and glass polished streak-free', 'Floor mopped'] },
      { area: 'Bedrooms', items: ['Surfaces, skirting boards and picture frames dusted', 'Mirrors and glass surfaces cleaned', 'Floor vacuumed, bins emptied', 'Bed made, if requested'] },
      { area: 'Living areas and throughout', items: ['Surfaces, shelves and decorative items dusted', 'Floors vacuumed, hard floors mopped', 'Mirrors cleaned, TV screen wiped', 'Light switches and door handles wiped', 'Internal windows and sills cleaned'] },
    ],
    addOns: ['Oven interior clean', 'Fridge interior clean', 'Cabinet interiors', 'Reachable interior windows'],
    whyHeading: 'Why book regular cleaning with us',
    why: [
      { title: 'Same cleaner each visit', text: 'We aim to keep you with a consistent cleaner, so you are not explaining your home to someone new every time.' },
      insured,
      { title: 'Easy to pause or change', text: 'Going away or need to skip a visit? Just let us know. No long, rigid contracts.' },
      reclean,
    ],
    faqs: [
      { q: 'Can I choose weekly or fortnightly?', a: 'Yes. Tell us your preference when you get your price and we will schedule accordingly.' },
      { q: 'Will I get the same cleaner every time?', a: 'We aim to keep you with the same consistent cleaner for all your regular visits.' },
      products,
      { q: 'How do I get a price?', a: 'Tell us about your home using the quote form and we will come back to you with a price. No obligation to book.' },
    ],
    ctaHeading: 'Ready for a cleaner home?',
  },
  {
    id: 'deep',
    nav: 'Deep Cleaning',
    title: 'Deep cleaning',
    intro: 'A thorough, top-to-bottom clean. Ideal before guests arrive, after a renovation, or simply as a reset for your home.',
    formService: 'Deep Cleaning',
    audienceHeading: 'Who it is for',
    audience: [
      { title: 'Before a big event', text: 'Guests coming, a party, or a new baby on the way. Get the whole house to a standard you are proud of.' },
      { title: 'After building work', text: 'Dust gets everywhere after a renovation. We clean every surface, inside and out.' },
      { title: 'A seasonal reset', text: 'When regular cleaning is not enough and the place needs a proper going over.' },
    ],
    includedIntro: 'Everything in a regular clean, plus the detail work below.',
    included: [
      { area: 'Kitchen', items: ['Cupboard fronts degreased inside and out', 'Tiles and splashbacks descaled and degreased', 'Appliance exteriors, including behind where reachable', 'Extractor hood and filters cleaned', 'Oven exterior, hob and surrounds detailed'] },
      { area: 'Bathrooms', items: ['Full limescale removal from taps, tiles and glass', 'Grout scrubbed', 'Shower screens and bath descaled', 'Toilet descaled inside and behind', 'Extractor vents dusted'] },
      { area: 'Throughout', items: ['High-level dusting: light fittings, tops of doors, cornices', 'Skirting boards, door frames and switches washed', 'Inside window glass and sills', 'Under and behind reachable furniture', 'Radiators and vents dusted'] },
    ],
    addOns: ['Oven interior clean', 'Fridge and freezer interior', 'Carpet or upholstery clean', 'Inside cupboards and wardrobes'],
    whyHeading: 'Why book a deep clean with us',
    why: [
      plantBased,
      { title: 'A team, not one cleaner', text: 'Deep cleans are done by two cleaners so the whole house is finished in one visit.' },
      insured,
      reclean,
    ],
    faqs: [
      { q: 'How long does a deep clean take?', a: 'It depends on the size and condition of the property. Most homes take between four and eight hours with two cleaners.' },
      { q: 'Do I need to be home?', a: 'No. Many customers leave a key or key safe code. Every cleaner is DBS-checked and insured.' },
      products,
      { q: 'Can I add an oven or carpet clean?', a: 'Yes. Just mention it when you request your quote and we will include it.' },
    ],
    ctaHeading: 'Ready for a proper reset?',
  },
  {
    id: 'tenancy',
    nav: 'End of Tenancy',
    title: 'End of tenancy cleaning',
    intro: 'A detailed, checklist-led clean so tenants and landlords can hand over or move into a property with confidence.',
    formService: 'End of Tenancy Cleaning',
    audienceHeading: 'Who it is for',
    audience: [
      { title: 'Tenants moving out', text: 'Get the property back to check-in condition and give yourself the best chance of a full deposit return.' },
      { title: 'Landlords and agents', text: 'A reliable turnaround clean between tenancies, ready for viewings or new tenants.' },
      { title: 'Buyers and sellers', text: 'A clean, empty property ready for completion day or for you to move into.' },
    ],
    includedIntro: 'We follow a standard letting agent checkout specification. Every room is covered.',
    included: [
      { area: 'Kitchen', items: ['Inside and outside all cupboards and drawers', 'Oven, hob and extractor deep cleaned', 'Fridge and freezer interior cleaned', 'Washing machine drawer and seal cleaned', 'Tiles, worktops and sink descaled and polished'] },
      { area: 'Bathrooms', items: ['Full descale of all sanitary ware', 'Grout and sealant scrubbed', 'Shower screens, mirrors and glass polished', 'Extractor fan and vents cleaned', 'Floors washed'] },
      { area: 'Bedrooms and living areas', items: ['Inside wardrobes, cupboards and drawers', 'Skirting boards, doors and frames washed', 'Light fittings, switches and sockets cleaned', 'Inside windows, sills and tracks', 'Floors vacuumed and mopped edge to edge'] },
    ],
    addOns: ['Carpet steam clean', 'Upholstery clean', 'Balcony or patio sweep', 'Wall spot cleaning'],
    whyHeading: 'Why book your end of tenancy clean with us',
    why: [
      { title: 'Checklist led', text: 'We work to a standard inventory checkout list so nothing is missed.' },
      { title: 'Reclean guarantee', text: 'If your inventory clerk raises a cleaning issue within 48 hours, we come back and fix it free of charge.' },
      insured,
      plantBased,
    ],
    faqs: [
      { q: 'Does the property need to be empty?', a: 'Ideally yes. An empty property lets us clean inside cupboards and reach every corner. If furniture is staying, let us know when you book.' },
      { q: 'Do you clean carpets?', a: 'Carpet steam cleaning is available as an add-on. Mention it when you request your quote.' },
      { q: 'What if the agent is not happy?', a: 'Tell us within 48 hours of the inspection and we will return to reclean the items raised, free of charge.' },
      products,
    ],
    ctaHeading: 'Moving out? Let us handle the clean.',
  },
  {
    id: 'commercial',
    nav: 'Commercial',
    title: 'Commercial cleaning',
    intro: 'Tailored cleaning schedules for offices and commercial premises across Northamptonshire, from a team already trusted with people\'s homes.',
    formService: 'Commercial Cleaning',
    isCommercial: true,
    audienceHeading: 'Who we serve',
    audienceIntro: 'A flavour of the kinds of premises we clean. If you are not sure whether your space is a fit, just ask.',
    audience: [
      { title: 'Offices', text: 'Workspaces, meeting rooms and reception areas kept presentable for staff and visitors alike.' },
      { title: 'Retail and hospitality', text: 'Shop floors, fitting rooms and counters cleaned around your trading hours.' },
      { title: 'Studios, clinics and holiday lets', text: 'Spaces where fume-free products and a reliable turnaround matter.' },
    ],
    includedIntro: 'A general guide to the areas we clean. Your actual scope is agreed against your contract, since every premises is different.',
    included: [
      { area: 'Entrance, reception and common areas', items: ['Furniture, ledges, sills and fixtures dusted', 'Reception desks cleaned and sanitised', 'High-touch points wiped: handles, switches, intercoms', 'Floors vacuumed and mopped', 'Entrance glass cleaned', 'Bins emptied and relined'] },
      { area: 'Workspaces and offices', items: ['Desks, chairs and equipment dusted where cleared', 'Carpets vacuumed, hard floors cleaned', 'Loose items tidied where your contract allows'] },
      { area: 'Kitchen and break room', items: ['Surfaces, tables and chairs disinfected', 'Appliances wiped', 'Sink and taps cleaned and polished', 'Floor mopped, bins emptied'] },
      { area: 'Toilets and washrooms', items: ['Toilets, urinals and sinks disinfected', 'Taps polished, surfaces wiped', 'Mirrors cleaned', 'Consumables restocked if included', 'Floors swept and mopped'] },
    ],
    whyHeading: 'Why choose us for commercial cleaning',
    why: [
      { title: 'Scope agreed upfront', text: 'Your contract sets what is included, so there is no ambiguity about what each visit covers.' },
      { title: 'Out of hours available', text: 'Evenings, early mornings and weekends, so cleaning never gets in the way of your business.' },
      insured,
      { title: 'Local Northamptonshire team', text: 'Based in Northampton and covering the county, not a national call centre.' },
    ],
    faqs: [
      { q: 'What premises do you clean?', a: 'Offices, retail units, studios, clinics and holiday lets across Northamptonshire. Get in touch to check we are a fit for your space.' },
      { q: 'Can cleaning happen outside business hours?', a: 'Yes. We can arrange cleaning outside business hours or at weekends if that suits your premises better.' },
      { q: 'Do you provide your own supplies and equipment?', a: 'Yes. We bring plant-based products and commercial-grade equipment. We can use your products if you prefer.' },
      { q: 'How do I get a quote?', a: 'Fill in the quote form or give us a call. Either way, we will come back with a tailored quote.' },
    ],
    ctaHeading: 'Tailored to your premises',
    ctaText: 'Every commercial space is different, so we build a cleaning schedule around your business. Frequency, hours and areas covered are agreed with you directly rather than fitted into a fixed package.',
  },
];

export const getService = (id: ActiveScreen) => SERVICES.find((s) => s.id === id);
