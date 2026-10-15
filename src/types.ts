export type ActiveScreen =
  | 'home'
  | 'regular'
  | 'deep'
  | 'tenancy'
  | 'commercial'
  | 'faq'
  | 'quote'
  | 'contact';

export type ServiceType = 'regular' | 'deep' | 'tenancy' | 'commercial';

export interface Review {
  id: string;
  name: string;
  location: string;
  serviceType: string;
  rating: number;
  quote: string;
  verified: boolean;
}
