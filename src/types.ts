export type ActiveScreen = 'home' | 'services' | 'areas' | 'reviews' | 'contact';

export type ServiceType = 
  | 'regular' 
  | 'deep' 
  | 'tenancy' 
  | 'commercial';

export interface CleaningPackage {
  id: ServiceType;
  title: string;
  badge?: string;
  badgeType?: 'primary' | 'highlight' | 'accent' | 'neutral';
  shortDesc: string;
  priceDisplay: string;
  priceSub: string;
  promoTag?: string;
  features: string[];
  ctaLabel: string;
  isPopular?: boolean;
}

export interface AddOnItem {
  id: string;
  name: string;
  icon: string;
  desc: string;
  price: number;
  unit?: string;
}

export interface PostcodeZone {
  code: string;
  areaName: string;
  suburbs: string;
  status: 'Daily Route' | 'Regular Route' | 'Priority Route';
  eligible: boolean;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  serviceType: string;
  rating: number;
  quote: string;
  verified: boolean;
}

export interface BookingState {
  serviceType: ServiceType;
  frequency: 'weekly' | 'fortnightly' | 'monthly' | 'one-off';
  bedrooms: number;
  bathrooms: number;
  selectedAddOns: string[];
  postcode: string;
  phone: string;
  fullName: string;
  email: string;
  notes: string;
  hasPets: boolean;
  preferredDate?: string;
  preferredTime?: string;
}

export type Region = 'southampton' | 'northampton';
