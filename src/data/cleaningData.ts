import { CleaningPackage, AddOnItem, PostcodeZone, Review, Region } from '../types';

export interface RegionConfig {
  id: Region;
  name: string;
  tagline: string;
  phone: string;
  phoneRaw: string;
  email: string;
  address: string;
  whatsapp: string;
  whatsappNumber: string;
  postcodePrefixes: string[];
  samplePostcode: string;
  activeZones: string;
  riverOrWaterway: string;
}

export const REGIONS: Record<Region, RegionConfig> = {
  southampton: {
    id: 'southampton',
    name: 'Southampton & Hampshire',
    tagline: 'Southampton, Ocean Village, Bassett, Totton, Eastleigh, Romsey & Winchester',
    phone: '+44 7375 614692',
    phoneRaw: '+447375614692',
    email: 'ecoshinecleanerslimited@gmail.com',
    address: 'Guildhall Square, Cultural Quarter, Southampton, Hampshire, SO14 7FP',
    whatsapp: 'https://wa.me/447375614692',
    whatsappNumber: '+44 7375 614692',
    postcodePrefixes: ['SO14', 'SO15', 'SO16', 'SO17', 'SO18', 'SO19', 'SO23', 'SO30', 'SO31', 'SO40', 'SO45', 'SO50', 'SO51', 'SO52', 'SO53'],
    samplePostcode: 'SO14 3TL',
    activeZones: 'SO14, SO15, SO16 & SO30',
    riverOrWaterway: 'our Solent waters',
  },
  northampton: {
    id: 'northampton',
    name: 'Northampton & Northamptonshire',
    tagline: 'Northampton, Duston, Kingsthorpe, Abington, Wootton, Daventry & Towcester',
    phone: '+44 7375 614692',
    phoneRaw: '+447375614692',
    email: 'ecoshinecleanerslimited@gmail.com',
    address: 'Derngate Cultural Quarter, Northampton, Northamptonshire, NN1 1TY',
    whatsapp: 'https://wa.me/447375614692',
    whatsappNumber: '+44 7375 614692',
    postcodePrefixes: ['NN1', 'NN2', 'NN3', 'NN4', 'NN5', 'NN6', 'NN7', 'NN8', 'NN9', 'NN10', 'NN11', 'NN12', 'NN14', 'NN15'],
    samplePostcode: 'NN1 5AA',
    activeZones: 'NN1, NN2, NN3, NN4 & NN5',
    riverOrWaterway: 'our River Nene waters',
  }
};

export const CLEANING_PACKAGES: CleaningPackage[] = [
  {
    id: 'regular',
    title: 'Regular Domestic Clean',
    badge: 'Most Popular Routine',
    badgeType: 'primary',
    shortDesc: 'Weekly, Fortnightly, or Monthly routine care',
    priceDisplay: '£18.50',
    priceSub: '/ hour (min 2 hrs)',
    promoTag: '🔄 Flexible schedules • Cancel anytime',
    features: [
      'Dedicated regular cleaner (same face every clean)',
      'Full kitchen degreasing, exterior hobs & worktops',
      'Sanitary bathroom scrub & light eco descaling',
      'HEPA anti-allergen vacuuming & mopping',
      'Organic citrus & eucalyptus botanical freshening'
    ],
    ctaLabel: 'Book Regular Clean →',
    isPopular: true
  },
  {
    id: 'deep',
    title: 'Deep Spring Clean',
    badge: '★ Best Value Season Revival',
    badgeType: 'highlight',
    shortDesc: 'Total property refresh, corner to corner',
    priceDisplay: '£120',
    priceSub: 'fixed quote (from)',
    promoTag: '🌿 Complete Botanical Detail',
    features: [
      'Heavy limescale removal (taps, tiles & shower glass)',
      'Inside oven extractor hood & exterior filter wipe',
      'Behind & under accessible furniture & appliances',
      'Detailed woodwork: doors, frames, skirting baseboards',
      'Interior window sills, reachable light switches & sockets'
    ],
    ctaLabel: 'Schedule Deep Clean →',
    isPopular: true
  },
  {
    id: 'tenancy',
    title: 'End of Tenancy Move-Out',
    badge: '100% Deposit Guarantee',
    badgeType: 'accent',
    shortDesc: 'Tenant, landlord & letting agent approval',
    priceDisplay: '£165',
    priceSub: 'fixed price (from)',
    promoTag: '🛡️ 48-Hour Re-Clean Free',
    features: [
      'Strict Letting Agency Checklist compliant (ARLA/RICS)',
      'Full oven valet included using plant-based bio degreasers',
      'Inside all kitchen cupboards, drawers, fridge/freezer wipe',
      'Restorative scale removal in sinks, taps, baths & toilets',
      'Formal invoice & Certificate of Eco-Cleaning issued'
    ],
    ctaLabel: 'Book Move-Out Clean →'
  },
  {
    id: 'commercial',
    title: 'Commercial & Airbnb',
    badge: 'Hospitality & Offices',
    badgeType: 'neutral',
    shortDesc: 'Holiday lets, studios, & commercial offices',
    priceDisplay: 'Bespoke',
    priceSub: 'Contract or Per-Turn',
    promoTag: '⚡ Fast 10am–3pm Window',
    features: [
      'Same-day guest turnaround with photo inspection report',
      'Hotel-grade linen laundry & bed dressing service',
      'Organic toiletries restocking & welcome hamper staging',
      'Key safe management & co-host sync',
      'Dedicated Commercial Account Manager & B2B VAT invoicing'
    ],
    ctaLabel: 'Request Business Quote →'
  }
];

export const COMPARISON_ROWS = [
  {
    name: 'Plant-Based, Toxin-Free Detergents',
    regular: 'Yes',
    deep: 'Yes',
    tenancy: 'Yes',
    commercial: 'Yes',
    highlightDeep: false
  },
  {
    name: 'HEPA Dual-Filtration Allergen Vacuuming',
    regular: 'Yes',
    deep: 'Yes',
    tenancy: 'Yes',
    commercial: 'Yes',
    highlightDeep: false
  },
  {
    name: 'Full Kitchen Surfaces & Splashback Sanitisation',
    regular: 'Yes',
    deep: 'Yes',
    tenancy: 'Yes',
    commercial: 'Yes',
    highlightDeep: false
  },
  {
    name: 'Oven Interior, Racks & Hob Detailing',
    regular: 'Add-on (£45)',
    deep: 'Add-on / Discounted',
    tenancy: 'Included Free',
    commercial: 'Add-on Option',
    highlightDeep: true
  },
  {
    name: 'Inside Empty Cabinets, Drawers & Pantries',
    regular: '—',
    deep: 'Upon Request',
    tenancy: 'Yes (Full Detail)',
    commercial: 'Yes',
    highlightDeep: true
  },
  {
    name: 'Limescale Removal Depth',
    regular: 'Standard Maintenance',
    deep: 'Heavy Descaling',
    tenancy: 'Restorative Grade',
    commercial: 'Standard Daily',
    highlightDeep: true
  },
  {
    name: 'Deposit Return 48-Hour Guarantee Certificate',
    regular: '—',
    deep: '—',
    tenancy: '✓ Included (100%)',
    commercial: '—',
    highlightDeep: false
  },
  {
    name: 'Key Holding & Dedicated Account Manager',
    regular: '—',
    deep: '—',
    tenancy: '—',
    commercial: 'Yes (Dedicated)',
    highlightDeep: false
  }
];

export const ADD_ONS: AddOnItem[] = [
  {
    id: 'oven',
    name: 'Eco Oven Bio-Valet',
    icon: '🍳',
    desc: 'Fume-free plant enzymatic breakdown of baked carbon & grease.',
    price: 45
  },
  {
    id: 'carpet',
    name: 'Carpet Steam Extraction',
    icon: '🧼',
    desc: 'High-temp hot water extraction with zero detergent residue.',
    price: 35,
    unit: '/room'
  },
  {
    id: 'windows',
    name: 'Inside Windows & Frames',
    icon: '🪟',
    desc: 'Streak-free vinegar & corn starch spray with micro-lint wipe.',
    price: 25
  },
  {
    id: 'upholstery',
    name: 'Upholstery Plant-Foam',
    icon: '🛋️',
    desc: 'Gentle stain & odor extraction for 2–3 seater sofas.',
    price: 40
  },
  {
    id: 'fridge',
    name: 'Fridge/Freezer Deep Clean',
    icon: '❄️',
    desc: 'Shelves washed, antibacterial tea tree oil misting.',
    price: 30
  }
];

export const INGREDIENT_STANDARDS = [
  {
    title: '🌱 Coconut & Corn Surfactants',
    text: 'Natural plant cleansers that bind and lift surface grease effortlessly without stripping sealants.',
    tone: 'safe'
  },
  {
    title: '🍋 Citric & White Acetic Acids',
    text: 'Natural food-grade limescale dissolvers formulated specifically for hard tap water.',
    tone: 'safe'
  },
  {
    title: '🌿 100% Pure Essential Oils',
    text: 'French eucalyptus, sweet orange, and organic tea tree for natural antimicrobial fragrance.',
    tone: 'safe'
  },
  {
    title: '🚫 0% Chlorine Bleach or Ammonia',
    text: 'No carcinogenic fumes, no corrosive irritants, and zero harm to local drainage and waterways.',
    tone: 'banned'
  }
];

export const FAQS = [
  {
    q: 'Do I need to supply cleaning products or a vacuum?',
    a: 'Not at all! Our cleaners bring their own professional commercial HEPA-filtered vacuum cleaners, washed microfiber cloths, and full kits of plant-based EcoShine solutions in amber refill bottles.'
  },
  {
    q: 'Which areas in Southampton and Hampshire do you cover?',
    a: 'We cover all Southampton postcodes (SO14 through SO19, plus Totton, Romsey, Chandlers Ford, Eastleigh, Winchester, and surrounding Waterside areas with zero travel surcharge).'
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
    location: 'Bassett, Southampton',
    serviceType: 'Regular Domestic Clean',
    rating: 5,
    quote: 'EcoShine has been cleaning our home in Bassett for 6 months now. Fresh, clean, and no chemical smell! With a 4-month-old baby and a golden retriever, having zero chemical bleach smells gives us total peace of mind. Truly spotless results every Tuesday!',
    verified: true
  },
  {
    id: '2',
    name: 'James T.',
    location: 'Ocean Village Marina',
    serviceType: 'End of Tenancy Clean',
    rating: 5,
    quote: 'Best end-of-tenancy clean I’ve ever booked. We moved out of our Ocean Village flat, and the inventory check-out clerk said it was the cleanest flat they’d inspected all month. Full deposit returned without a single question.',
    verified: true
  },
  {
    id: '3',
    name: 'Claire & David',
    location: 'Winchester & Totton',
    serviceType: 'Deep Clean Revival',
    rating: 5,
    quote: 'Reliable, always on time, and our dog doesn’t sneeze after they clean! The natural lemongrass and eucalyptus scent is heavenly. Their customer support over WhatsApp is also wonderfully responsive.',
    verified: true
  },
  {
    id: '4',
    name: 'Marcus L.',
    location: 'Portswood & Highfield',
    serviceType: 'Commercial Office Care',
    rating: 5,
    quote: 'We switched our creative agency studio to EcoShine. Staff immediately noticed the fresher air quality. Zero fumes in the morning, and the team handles keys with total professional discretion.',
    verified: true
  }
];

export const HAMPSHIRE_ZONES: PostcodeZone[] = [
  {
    code: 'SO14',
    areaName: 'Southampton Central & Waterfront',
    suburbs: 'Ocean Village, St Mary’s, Cultural Quarter, Oxford Street, City Centre.',
    status: 'Daily Route',
    eligible: true
  },
  {
    code: 'SO15 & SO16',
    areaName: 'Southampton West & North',
    suburbs: 'Shirley, Millbrook, Freemantle, Bassett, Chilworth, Highfield & Swaythling.',
    status: 'Daily Route',
    eligible: true
  },
  {
    code: 'SO18 & SO19',
    areaName: 'Southampton East & Rivers',
    suburbs: 'Bitterne, Woolston, Peartree, Sholing, Thornhill, Netley Abbey.',
    status: 'Daily Route',
    eligible: true
  },
  {
    code: 'SO40 & SO45',
    areaName: 'Waterside & New Forest Borders',
    suburbs: 'Totton, Marchwood, Hythe, Dibden Purlieu, Ashurst, Waterside.',
    status: 'Regular Route',
    eligible: true
  },
  {
    code: 'SO51 & SO52',
    areaName: 'Test Valley & North',
    suburbs: 'Romsey, North Baddesley, Ampfield, Awbridge, Valley Park.',
    status: 'Regular Route',
    eligible: true
  },
  {
    code: 'SO50 & SO23',
    areaName: 'Eastleigh & Winchester',
    suburbs: 'Eastleigh Central, Chandler’s Ford, Fair Oak, Winchester City Centre.',
    status: 'Priority Route',
    eligible: true
  }
];
