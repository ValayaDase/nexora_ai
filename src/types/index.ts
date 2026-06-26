export type Currency = 'USD' | 'INR' | 'EUR';
export type BillingCycle = 'monthly' | 'annual';

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  basePriceUSD: number;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export interface CurrencyConfig {
  symbol: string;
  rate: number; // Multiplier relative to USD
  prefix: boolean;
  code: Currency;
}

export interface PricingMatrix {
  currencies: Record<Currency, CurrencyConfig>;
  plans: PricingPlan[];
  annualDiscount: number; // Fraction, e.g. 0.20 for 20%
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconPath: string; // SVG path
}

export interface BentoCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  visualType: 'grid' | 'network' | 'logs' | 'map' | 'timeline';
}

export interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  badge: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  quote: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
