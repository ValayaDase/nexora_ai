'use client';

import React from 'react';
import Header from '@/sections/Header';
import Hero from '@/sections/Hero';
import TrustedCompanies from '@/sections/TrustedCompanies';
import Features from '@/sections/Features';
import BentoGrid from '@/sections/BentoGrid';
import Workflow from '@/sections/Workflow';
import Pricing from '@/sections/Pricing';
import Testimonials from '@/sections/Testimonials';
import FAQ from '@/sections/FAQ';
import CTA from '@/sections/CTA';
import Footer from '@/sections/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Home() {
  // Mount scroll reveals
  useScrollReveal();

  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'NEXORA AI',
    'description': 'Deploy autonomous AI agents that orchestrate pipeline tasks, route query workflows, and sync vector database memories at the edge.',
    'operatingSystem': 'All',
    'applicationCategory': 'DeveloperApplication',
    'offers': {
      '@type': 'AggregateOffer',
      'priceCurrency': 'USD',
      'lowPrice': '19',
      'highPrice': '299',
      'offerCount': '3',
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '142',
    },
  };

  return (
    <>
      {/* Insert JSON-LD structured data for Google bots */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />
      <main className="flex-1 w-full bg-bg-dark text-[#f1f6f4] overflow-hidden">
        {/* Hero Section */}
        <Hero />

        {/* Logo Ticker */}
        <div className="scroll-reveal">
          <TrustedCompanies />
        </div>

        {/* Feature Cards Grid */}
        <div className="scroll-reveal">
          <Features />
        </div>

        {/* State-synchronized Bento Grid & Accordion */}
        <div className="scroll-reveal">
          <BentoGrid />
        </div>

        {/* Interactive Step-by-Step AI Workflow Console */}
        <div className="scroll-reveal">
          <Workflow />
        </div>

        {/* Currency & Billing isolated Pricing matrix */}
        <div className="scroll-reveal">
          <Pricing />
        </div>

        {/* Client Testimonials */}
        <div className="scroll-reveal">
          <Testimonials />
        </div>

        {/* Keyboard-accessible Accordion FAQ */}
        <div className="scroll-reveal">
          <FAQ />
        </div>

        {/* Bottom CTA Panel */}
        <div className="scroll-reveal">
          <CTA />
        </div>
      </main>
      <Footer />
    </>
  );
}
