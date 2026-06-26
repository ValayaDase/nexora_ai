'use client';

import React, { useEffect, useRef } from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';

export const CTA: React.FC = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

  // --- NATIVE SCROLL ANIMATION (Zero External Libs) ---
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

    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 px-6 relative z-10 overflow-hidden bg-bg-dark">
      {/* Background ambient glow behind CTA - Matched to Brand Accent */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FFC801]/10 blur-[160px] pointer-events-none select-none" />

      <div className="max-w-5xl mx-auto">
        <div 
          ref={ctaRef}
          className="opacity-0 translate-y-10 transition-all duration-[500ms] ease-out"
        >
          <Card
            glow
            className="relative p-10 sm:p-16 border-[#F1F6F4]/10 bg-[#172B36]/60 flex flex-col items-center text-center space-y-8 overflow-hidden rounded-3xl"
          >
            {/* Subtle overlay lines grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(241,246,244,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(241,246,244,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

            <div className="space-y-4 max-w-2xl relative z-10">
              <span className="text-[#FFC801] text-xs font-semibold tracking-widest uppercase font-mono">
                Deploy Instantly
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F1F6F4] leading-tight font-sans">
                Ready to Automate Your Operations?
              </h2>
              <p className="text-[#D9E8E2]/80 text-sm sm:text-base leading-relaxed font-sans">
                Join thousands of engineering teams building resilient agent pipelines. Set up your first webhook trigger in less than 5 minutes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-10">
              <Button variant="primary" glow className="px-8 py-4 font-bold bg-[#FFC801] text-[#172B36] hover:bg-[#FF9932]">
                Start Building Free
              </Button>
              <Button variant="secondary" className="px-8 py-4 font-semibold border-[#F1F6F4]/10 text-[#F1F6F4] hover:bg-[#F1F6F4]/[0.05]">
                Talk to Solutions Engineer
              </Button>
            </div>

            <div className="text-[#D9E8E2]/60 text-xs font-medium tracking-wide flex flex-col sm:flex-row gap-4 sm:gap-8 pt-4 select-none relative z-10 font-sans">
              <span className="flex items-center gap-1.5 justify-center">
                <span className="text-[#FF9932] font-bold">✓</span> No Credit Card Required
              </span>
              <span className="flex items-center gap-1.5 justify-center">
                <span className="text-[#FF9932] font-bold">✓</span> 5,000 Free Credits / Month
              </span>
              <span className="flex items-center gap-1.5 justify-center">
                <span className="text-[#FF9932] font-bold">✓</span> Cancel Anytime
              </span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CTA;