'use client';

import React, { useEffect, useRef } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { pricingMatrix } from '@/constants/pricing';

// --- VANILLA DOM STATE (Zero React Re-renders for Feature 1) ---
// We keep state outside React to strictly prevent component re-flows.
let currentCurrency: 'USD' | 'EUR' | 'INR' = 'USD';
let currentBilling: 'monthly' | 'annual' = 'monthly';

// Hardcoded logic exactly as per rules to compute dynamic matrix without UI hardcoding
const computePrice = (baseRate: number, currency: string, billing: string) => {
  let multiplier = 1; // Default USD
  if (currency === 'EUR') multiplier = 0.92;
  if (currency === 'INR') multiplier = 83.5;

  let finalPrice = baseRate * multiplier;
  if (billing === 'annual') finalPrice = finalPrice * 0.8; // Flat 20% discount multiplier

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(finalPrice);
};

// Global function to manually update text nodes (Strict DOM Isolation)
const updatePriceDOM = () => {
  pricingMatrix.plans.forEach(plan => {
    const priceNode = document.getElementById(`price-node-${plan.id}`);
    const cycleNode = document.getElementById(`cycle-node-${plan.id}`);
    
    if (priceNode) {
      priceNode.innerText = computePrice(plan.basePriceUSD, currentCurrency, currentBilling);
    }
    if (cycleNode) {
      cycleNode.innerText = currentBilling === 'monthly' ? '/ mo' : '/ yr';
    }
  });
};

const CurrencySelector: React.FC = React.memo(() => {
  const currencies: ('USD' | 'EUR' | 'INR')[] = ['USD', 'EUR', 'INR'];

  const handleCurrencyChange = (curr: 'USD' | 'EUR' | 'INR', e: React.MouseEvent<HTMLButtonElement>) => {
    currentCurrency = curr;
    updatePriceDOM();
    
    // Manually toggle classes to avoid React re-render of the parent
    const parent = e.currentTarget.parentElement;
    if (parent) {
      Array.from(parent.children).forEach(btn => {
        btn.className = "px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all outline-none cursor-pointer text-[#D9E8E2]/60 hover:text-white";
      });
    }
    e.currentTarget.className = "px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all outline-none cursor-pointer bg-[#F1F6F4] text-[#114C5A] font-bold shadow-md";
  };

  return (
    <div className="inline-flex rounded-xl bg-white/[0.02] border border-[#F1F6F4]/[0.06] p-1 select-none">
      {currencies.map((curr) => (
        <button
          key={curr}
          onClick={(e) => handleCurrencyChange(curr, e)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all outline-none cursor-pointer ${
            curr === 'USD'
              ? 'bg-[#F1F6F4] text-[#114C5A] font-bold shadow-md'
              : 'text-[#D9E8E2]/60 hover:text-white'
          }`}
        >
          {curr}
        </button>
      ))}
    </div>
  );
});
CurrencySelector.displayName = 'CurrencySelector';

const BillingSelector: React.FC = React.memo(() => {
  const handleBillingChange = (cycle: 'monthly' | 'annual', e: React.MouseEvent<HTMLButtonElement>) => {
    currentBilling = cycle;
    updatePriceDOM();
    
    // Manually toggle classes
    const parent = e.currentTarget.parentElement;
    if (parent) {
      Array.from(parent.children).forEach(btn => {
        btn.className = "px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all outline-none cursor-pointer text-[#D9E8E2]/60 hover:text-white";
      });
    }
    e.currentTarget.className = "px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all outline-none cursor-pointer bg-[#F1F6F4] text-[#114C5A] font-bold shadow-md";
  };

  return (
    <div className="inline-flex items-center gap-4 select-none">
      <div className="inline-flex rounded-xl bg-white/[0.02] border border-[#F1F6F4]/[0.06] p-1">
        <button
          onClick={(e) => handleBillingChange('monthly', e)}
          className="px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all outline-none cursor-pointer bg-[#F1F6F4] text-[#114C5A] font-bold shadow-md"
        >
          Monthly
        </button>
        <button
          onClick={(e) => handleBillingChange('annual', e)}
          className="px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all outline-none cursor-pointer text-[#D9E8E2]/60 hover:text-white"
        >
          Annual
        </button>
      </div>
      <span className="text-[10px] font-bold text-[#FFC801] uppercase tracking-widest bg-[#FFC801]/10 px-2 py-1 rounded border border-[#FFC801]/20 font-mono">
        Save 20%
      </span>
    </div>
  );
});
BillingSelector.displayName = 'BillingSelector';

interface PricingCardProps {
  plan: typeof pricingMatrix.plans[0];
}

const PricingCard: React.FC<PricingCardProps> = React.memo(({ plan }) => {
  // Initial compute for SSR/First render
  const initialPrice = computePrice(plan.basePriceUSD, 'USD', 'monthly');

  return (
    <Card
      glow
      className={`relative p-8 flex flex-col justify-between border-[#F1F6F4]/10 min-h-[500px] transition-transform duration-300 hover:-translate-y-1 ${
        plan.isPopular ? 'border-[#FFC801]/50 bg-[#114C5A]/40 shadow-[0_0_40px_rgba(255,200,1,0.08)]' : 'bg-[#172B36]/40'
      }`}
    >
      {plan.isPopular && (
        <span className="absolute -top-3 right-8 bg-gradient-to-r from-[#FF9932] to-[#FFC801] text-[#172B36] font-extrabold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-md font-mono">
          Most Popular
        </span>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-[#F1F6F4] font-sans">{plan.name}</h3>
          <p className="text-xs text-[#D9E8E2]/70 mt-2 leading-relaxed h-10 overflow-hidden font-sans">
            {plan.description}
          </p>
        </div>

        <div className="py-4 border-y border-[#F1F6F4]/[0.05]">
          {/* Isolated DOM nodes for text updates */}
          <div className="flex items-baseline gap-1 font-sans">
            <span id={`price-node-${plan.id}`} className="text-4xl font-extrabold text-[#F1F6F4] tracking-tight">
              {initialPrice}
            </span>
            <span id={`cycle-node-${plan.id}`} className="text-sm font-semibold text-[#D9E8E2]/50">
              / mo
            </span>
          </div>
        </div>

        <ul className="space-y-3.5 text-xs text-[#D9E8E2]/90 font-sans">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <svg
                className="w-4 h-4 text-[#FF9932] shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 pt-4 border-t border-[#F1F6F4]/[0.05]">
        <Button
          variant={plan.isPopular ? 'primary' : 'secondary'}
          glow={plan.isPopular}
          className={`w-full justify-center py-3.5 font-bold ${plan.isPopular ? 'bg-[#FFC801] text-[#172B36] hover:bg-[#FF9932]' : 'bg-[#F1F6F4]/5 text-[#F1F6F4] hover:bg-[#F1F6F4]/10'}`}
        >
          {plan.ctaText}
        </Button>
      </div>
    </Card>
  );
});
PricingCard.displayName = 'PricingCard';

export const Pricing: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Native Intersection Observer for entry animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (cardsContainerRef.current) observer.observe(cardsContainerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" className="py-24 px-6 relative z-10 scroll-mt-20 overflow-hidden bg-bg-dark">
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[500px] h-[300px] bg-[#114C5A]/20 blur-[150px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div 
          ref={headerRef}
          className="flex flex-col items-center text-center space-y-4 mb-16 opacity-0 translate-y-10 transition-all duration-[400ms] ease-in-out"
        >
          <div className="text-[#FFC801] font-mono text-xs font-semibold tracking-wider uppercase">
            Flexible Licensing
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F6F4] font-sans">
            Simple, Transparent Pricing
          </h2>
          <p className="max-w-2xl text-[#D9E8E2]/80 text-sm sm:text-base leading-relaxed font-sans">
            Choose a tier optimized for your transaction volume. Instantly convert values across key enterprise currencies without layout reflows.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-semibold text-[#D9E8E2]/50 uppercase tracking-widest font-mono">Select Currency</span>
            <CurrencySelector />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-semibold text-[#D9E8E2]/50 uppercase tracking-widest font-mono">Select Term</span>
            <BillingSelector />
          </div>
        </div>

        <div 
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-0 translate-y-10 transition-all duration-[500ms] ease-in-out"
        >
          {pricingMatrix.plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;