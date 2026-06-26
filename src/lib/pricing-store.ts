import { Currency, BillingCycle } from '@/types';

type Listener = () => void;

class PricingStore {
  private currency: Currency = 'USD';
  private billing: BillingCycle = 'monthly';
  private listeners: Set<Listener> = new Set();

  // Return a primitive string to avoid object reference recreation on every call.
  // Object.is comparison in useSyncExternalStore will then correctly determine if state has changed.
  getStateString = (): string => {
    return `${this.currency}:${this.billing}`;
  };

  getServerSnapshot = (): string => {
    return 'USD:monthly'; // Default for SSR
  };

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  setCurrency = (currency: Currency) => {
    if (this.currency === currency) return;
    this.currency = currency;
    this.emit();
  };

  setBilling = (billing: BillingCycle) => {
    if (this.billing === billing) return;
    this.billing = billing;
    this.emit();
  };

  getCurrency = (): Currency => this.currency;
  getBilling = (): BillingCycle => this.billing;

  private emit() {
    this.listeners.forEach((listener) => listener());
  }
}

export const pricingStore = new PricingStore();
export type PricingStoreType = typeof pricingStore;
export type PricingState = { currency: Currency; billing: BillingCycle };
