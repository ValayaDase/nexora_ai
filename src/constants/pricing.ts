import { PricingMatrix } from '@/types';

export const pricingMatrix: PricingMatrix = {
  currencies: {
    USD: { symbol: '$', rate: 1.0, prefix: true, code: 'USD' },
    INR: { symbol: '₹', rate: 83.5, prefix: true, code: 'INR' },
    EUR: { symbol: '€', rate: 0.92, prefix: true, code: 'EUR' },
  },
  annualDiscount: 0.20, // 20% discount
  plans: [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Essential AI capabilities for small teams and developers.',
      basePriceUSD: 19,
      ctaText: 'Start Free Trial',
      features: [
        '5,000 monthly automation steps',
        '2 concurrent active pipelines',
        'Standard GPT-4o & Claude 3.5 access',
        'Basic webhook integrations',
        'Email support (24h response)',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Unleash the full potential of autonomous AI operations.',
      basePriceUSD: 79,
      isPopular: true,
      ctaText: 'Upgrade to Pro',
      features: [
        '50,000 monthly automation steps',
        '10 concurrent active pipelines',
        'Priority Claude 3.5 Sonnet & GPT-4o access',
        'Advanced vector storage & search',
        'Custom webhooks & OAuth connectors',
        'Priority Slack & email support (2h response)',
        'Detailed analytical dashboard',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Custom governance, infinite scaling, and dedicated neural models.',
      basePriceUSD: 299,
      ctaText: 'Contact Sales',
      features: [
        'Unlimited automation steps',
        'Unlimited concurrent pipelines',
        'Custom fine-tuned agent deployments',
        'Dedicated agent containers',
        'Enterprise SSO (SAML/OIDC) & RBAC',
        'Uptime SLA guarantee (99.99%)',
        'Dedicated Solutions Architect support',
      ],
    },
  ],
};
