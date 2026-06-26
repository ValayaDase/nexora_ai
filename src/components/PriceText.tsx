'use client';

import React, { useSyncExternalStore } from 'react';
import { pricingStore } from '@/lib/pricing-store';
import { pricingMatrix } from '@/constants/pricing';
import { Currency, BillingCycle } from '@/types';

interface PriceTextProps {
  planId: string;
}

export const PriceText: React.FC<PriceTextProps> = React.memo(({ planId }) => {
  const stateString = useSyncExternalStore(
    pricingStore.subscribe,
    pricingStore.getStateString,
    pricingStore.getServerSnapshot
  );

  const [currency, billing] = stateString.split(':') as [Currency, BillingCycle];

  const plan = pricingMatrix.plans.find((p) => p.id === planId);
  if (!plan) return null;

  const currencyConfig = pricingMatrix.currencies[currency];

  // Calculate rate dynamically based on matrix configuration
  let priceVal = plan.basePriceUSD * currencyConfig.rate;
  if (billing === 'annual') {
    priceVal = priceVal * (1 - pricingMatrix.annualDiscount);
  }

  // Format price without decimals for premium SaaS look
  const formattedPrice = new Intl.NumberFormat(undefined, {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(priceVal);

  return (
    <span className="tabular-nums font-bold text-5xl tracking-tight text-white inline-flex items-baseline">
      {currencyConfig.prefix && (
        <span className="text-3xl font-normal text-zinc-500 mr-1 select-none">
          {currencyConfig.symbol}
        </span>
      )}
      {formattedPrice}
      {!currencyConfig.prefix && (
        <span className="text-3xl font-normal text-zinc-500 ml-1 select-none">
          {currencyConfig.symbol}
        </span>
      )}
      <span className="text-sm font-normal text-zinc-500 tracking-normal ml-2">
        {billing === 'monthly' ? '/mo' : '/yr'}
      </span>
    </span>
  );
});

PriceText.displayName = 'PriceText';
export default PriceText;
