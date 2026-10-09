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
  northampton: {
    id: 'northampton',
    name: 'Northampton & Northamptonshire',
    tagline: 'Northampton, Kettering, Corby, Wellingborough, Rushden, Daventry & Towcester',
    phone: '+44 7375 614692',
    phoneRaw: '+447375614692',
    email: 'info@ecoshinecleaners.uk.com',
    address: 'Derngate Cultural Quarter, Northampton, Northamptonshire, NN1 1TY',
    whatsapp: 'https://wa.me/447375614692',
    whatsappNumber: '+44 7375 614692',
    postcodePrefixes: ['NN1', 'NN2', 'NN3', 'NN4', 'NN5', 'NN6', 'NN7', 'NN8', 'NN9', 'NN10', 'NN11', 'NN12', 'NN13', 'NN14', 'NN15', 'NN16', 'NN17', 'NN18'],
    samplePostcode: 'NN1 5AA',
    activeZones: 'NN1, NN2, NN3, NN4, NN5 & NN15',
    riverOrWaterway: 'our River Nene waters',
  },
  southampton: {
    id: 'southampton',
    name: 'Southampton & Hampshire',
    tagline: 'Southampton, Ocean Village, Bassett, Totton, Eastleigh, Romsey & Winchester',
    phone: '+44 7375 614692',
    phoneRaw: '+447375614692',
    email: 'info@ecoshinecleaners.uk.com',
    address: 'Guildhall Square, Cultural Quarter, Southampton, Hampshire, SO14 7FP',
    whatsapp: 'https://wa.me/447375614692',
    whatsappNumber: '+44 7375 614692',
    postcodePrefixes: ['SO14', 'SO15', 'SO16', 'SO17', 'SO18', 'SO19', 'SO23', 'SO30', 'SO31', 'SO40', 'SO45', 'SO50', 'SO51', 'SO52', 'SO53'],
    samplePostcode: 'SO14 3TL',
    activeZones: 'SO14, SO15, SO16 & SO30',
    riverOrWaterway: 'our Solent waters',
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
    promoTag: '🌱 Save 15% on Weekly Schedules',
    features: [
      'Dedicated vetted cleaner (same friendly face each visit)',
      '100% plant-based EcoShine formulas & microfiber cloths provided',
      'HEPA-filter allergy vacuuming across all floor surfaces',
      'Surface sanitation of kitchen, bathrooms, bedrooms & lounge',
      'Safe key holding & flexible digital rescheduling',
      '24-Hour satisfaction re-clean guarantee'
    ],
    ctaLabel: 'Book Regular Clean',
    isPopular: true
  },
  {
    id: 'deep',
    title: 'Deep Clean & Spring Revival',
    badge: 'Seasonal Refresh',
    badgeType: 'highlight',
    shortDesc: 'Intensive top-to-bottom non-toxic refresh',
    priceDisplay: '£120',
    priceSub: 'fixed rate (up to 3 beds)',
    promoTag: 'Includes Full Limescale & Descaling',
    features: [
      'Complete high-to-low dusting including light fixtures & vents',
      'Intensive bathroom descaling with plant enzymes & citric acid',
      'Deep kitchen degreasing (stovetops, tile splashbacks & exterior units)',
      'Baseboards, skirting boards, door frames & switches detailed',
      'Inside window glass & sills thoroughly buffed',
      'Under & behind reachable furniture cleaned'
    ],
    ctaLabel: 'Book Deep Revival Clean'
  },
  {
    id: 'tenancy',
    title: 'End of Tenancy Move-Out',
    badge: '100% Deposit Guarantee',
    badgeType: 'accent',
    shortDesc: 'Inventory-approved tenancy handovers',
    priceDisplay: '£165',
    priceSub: 'fixed rate (flat / small house)',
    promoTag: 'Official Letting Agent Checklist Compliant',
    features: [
      'Comprehensive estate agent checkout specification',
      'Inside kitchen cupboards, pantry, fridge & appliance exterior',
      'Deep oven & extractor treatment (fume-free organic paste)',
      'Complete sanitisation of all sanitary ware & grout revival',
      'Free 48-hour re-clean guarantee if inventory clerk raises a note',
      'Digital signed handover receipt for your landlord / agency'
    ],
    ctaLabel: 'Book Tenancy Clean'
  },
  {
    id: 'commercial',
    title: 'Commercial & Airbnb Care',
    badge: 'Bespoke Business',
    badgeType: 'neutral',
    shortDesc: 'Offices, studios, holiday lets & clinic spaces',
    priceDisplay: 'Bespoke',
    priceSub: 'tailored per square footage',
    promoTag: 'Zero Chemical Odour For Staff & Guests',
    features: [
      'Flexible out-of-hours scheduling (evenings, early mornings, weekends)',
      'Turnover care for Airbnb hosts (linen changes & restock options)',
      'High-touch surface disinfection (keyboards, handles, desk dividers)',
      'Communal kitchens, water points & bathroom hygiene care',
      'Full COSHH sheets & DBS-cleared insured cleaning staff',
      'Monthly invoicing & dedicated account management'
    ],
    ctaLabel: 'Enquire for Business'
  }
];

export interface ComparisonRow {
  name: string;
  regular: string;
  deep: string;
  tenancy: string;
  commercial: string;
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    name: '100% Non-Toxic & Plant Detergents',
    regular: '✓ Always',
    deep: '✓ Always',
    tenancy: '✓ Always',
    commercial: '✓ Always',
  },
  {
    name: 'DBS-Vetted & Living Wage Cleaners',
    regular: '✓ Dedicated',
    deep: '✓ Team of 2',
    tenancy: '✓ Specialist Crew',
    commercial: '✓ Vetted & Insured',
  },
  {
    name: 'HEPA-Filter Allergy Vacuuming',
    regular: '✓ Included',
    deep: '✓ Intensive',
    tenancy: '✓ Full Property',
    commercial: '✓ Commercial Grade',
  },
  {
    name: 'Descaling & Mineral Revival',
    regular: 'Routine',
    deep: '✓ Intensive',
    tenancy: '✓ Complete',
    commercial: 'As Specified',
  },
  {
    name: 'Inside Windows & French Doors',
    regular: 'Optional Add-on',
    deep: '✓ Included',
    tenancy: '✓ Included',
    commercial: 'Optional',
  },
  {
    name: 'Inside Ovens & Deep Appliances',
    regular: 'Optional Add-on',
    deep: 'Optional Add-on',
    tenancy: '✓ Full Oven & Hob',
    commercial: 'Optional',
  },
  {
    name: 'Satisfaction Re-Clean Guarantee',
    regular: '24-Hour',
    deep: '24-Hour',
    tenancy: '✓ 100% Deposit Pass',
    commercial: 'SLA Guaranteed',
  },
  {
    name: 'Zero Single-Use Plastic Policy',
    regular: '✓ Amber Refills',
    deep: '✓ Amber Refills',
    tenancy: '✓ Amber Refills',
    commercial: '✓ Bulk Concentrates',
  },
];

export const ADD_ONS: AddOnItem[] = [
  {
    id: 'oven',
    name: 'Eco Oven & Grill Deep Treatment',
    icon: '🍳',
    desc: 'Fume-free soda paste & natural pumice lift burnt-on grease without toxic oven fumes.',
    price: 45
  },
  {
    id: 'carpet',
    name: 'Room Carpet Botanical Steam Extraction',
    icon: '🧼',
    desc: 'Deep warm water extraction using enzyme deodorisers that lift stains and pet dander.',
    price: 35,
    unit: 'per room'
  },
  {
    id: 'fridge',
    name: 'Interior Refrigerator & Freezer Deep Sanitisation',
    icon: '❄️',
    desc: 'Food-safe plant alcohol cleans seals, shelves and crisper drawers without synthetic chemicals.',
    price: 25
  },
  {
    id: 'windows',
    name: 'Internal Glazing & French Doors Buffing',
    icon: '🪟',
    desc: 'Vinegar & alcohol-based plant buff leaves streak-free glass without chemical ammonia.',
    price: 30
  },
  {
    id: 'upholstery',
    name: 'Fabric Sofa & Cushion Eco Refresh',
    icon: '🛋️',
    desc: 'Natural probiotic mist neutralises odours and revitalises sofa fibres safely.',
    price: 40
  }
];

export const INGREDIENT_STANDARDS = [
  {
    title: '🌿 Plant & Mineral Surfactants',
    text: 'Derived from sustainably harvested coconut, corn sugars, and sugar beets. Fully biodegradable within 28 days.',
    tone: 'safe'
  },
  {
    title: '🍋 Organic Essential Oils & Citric Extracts',
    text: 'Cold-pressed lemon, sweet orange, eucalyptus, and tea tree provide natural antibacterial power with fresh subtle scents.',
    tone: 'safe'
  },
  {
    title: '✨ Pure Sodium Bicarbonate & Washing Soda',
    text: 'Time-tested minerals gently scrub stubborn grease and remove tough limescale without scratching delicate tiles or enamel.',
    tone: 'safe'
  },
  {
    title: '🚫 0% Synthetic Fragrances or Phthalates',
    text: 'We never mask odours with artificial aerosol scents that can trigger asthma, migraines, or allergies.',
    tone: 'banned'
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

export const NORTHAMPTONSHIRE_ZONES: PostcodeZone[] = [
  {
    code: 'NN1',
    areaName: 'Northampton Town Centre & Cultural Quarter',
    suburbs: 'Derngate, Waterside, Becket’s Park, St Giles, Town Centre.',
    status: 'Daily Route',
    eligible: true
  },
  {
    code: 'NN2',
    areaName: 'Kingsthorpe, Boughton & Semilong',
    suburbs: 'Kingsthorpe Village, Boughton, Semilong, Dallington & Queens Park.',
    status: 'Daily Route',
    eligible: true
  },
  {
    code: 'NN3',
    areaName: 'Abington, Weston Favell & Moulton',
    suburbs: 'Abington Park, Weston Favell, Boothville, Moulton & Parklands.',
    status: 'Daily Route',
    eligible: true
  },
  {
    code: 'NN4',
    areaName: 'Wootton, Grange Park & Brackmills',
    suburbs: 'Wootton, Grange Park, Collingtree, East Hunsbury, Hardingstone.',
    status: 'Daily Route',
    eligible: true
  },
  {
    code: 'NN5',
    areaName: 'Duston, Upton & Sixfields',
    suburbs: 'Duston, Upton, New Duston, St James & Sixfields.',
    status: 'Daily Route',
    eligible: true
  },
  {
    code: 'NN8 & NN9',
    areaName: 'Wellingborough & Surrounds',
    suburbs: 'Wellingborough Town, Finedon, Wilby, Great Doddington & Irthlingborough.',
    status: 'Daily Route',
    eligible: true
  },
  {
    code: 'NN10',
    areaName: 'Rushden & Higham Ferrers',
    suburbs: 'Rushden, Higham Ferrers, Rushden Lakes & Chelveston.',
    status: 'Daily Route',
    eligible: true
  },
  {
    code: 'NN14, NN15 & NN16',
    areaName: 'Kettering & Rothwell',
    suburbs: 'Kettering Central, Burton Latimer, Barton Seagrave & Rothwell.',
    status: 'Daily Route',
    eligible: true
  },
  {
    code: 'NN11',
    areaName: 'Daventry & Western Villages',
    suburbs: 'Daventry Town, Weedon Bec, Braunston, Badby & Long Buckby.',
    status: 'Regular Route',
    eligible: true
  },
  {
    code: 'NN12 & NN13',
    areaName: 'Towcester, Brackley & South Northants',
    suburbs: 'Towcester, Silverstone, Brackley, Potterspury & Paulerspury.',
    status: 'Regular Route',
    eligible: true
  },
  {
    code: 'NN17 & NN18',
    areaName: 'Corby & Weldon',
    suburbs: 'Corby Town, Weldon, Great Oakley, Danesholme & Stanion.',
    status: 'Priority Route',
    eligible: true
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

export const REGION_ZONES: Record<Region, PostcodeZone[]> = {
  northampton: NORTHAMPTONSHIRE_ZONES,
  southampton: HAMPSHIRE_ZONES,
};
