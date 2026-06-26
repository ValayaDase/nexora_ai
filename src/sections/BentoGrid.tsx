'use client';

import React, { useState, useEffect, useRef } from 'react';
import Card from '@/components/Card';
import { cn } from '@/utils/cn';

interface BentoItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  details: string[];
}

export const BentoGrid: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // --- ANIMATION REFS ---
  const headerRef = useRef<HTMLDivElement>(null);
  const desktopCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

    if (headerRef.current) observer.observe(headerRef.current);
    
    desktopCardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });
    
    mobileCardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const bentoItems: BentoItem[] = [
    {
      id: 0,
      title: 'Autonomous Agent Orchestration',
      subtitle: 'Self-governing process threads',
      description: 'Define agent objectives and let our runtime dynamically assemble steps, fetch resources, handle exceptions, and output verified results.',
      badge: 'Core Engine',
      details: [
        'Dynamic state recovery',
        'Automatic retry on model hallucination',
        'Integrated tools execution canvas'
      ],
    },
    {
      id: 1,
      title: 'Global Knowledge Retainer',
      subtitle: 'Distributed vector caching',
      description: 'Caching layer for context retrieval. Syncs model memories across geolocated regional caches to serve queries in under 5ms.',
      badge: 'Database',
      details: [
        'Regional low-latency caches',
        'Zero-trust data encryption at rest',
        'Auto-indexing vector stores'
      ],
    },
    {
      id: 2,
      title: 'Model Token Optimizer',
      subtitle: 'Real-time cost savings',
      description: 'Analyze semantic queries before passing them to expensive LLMs. Trim context, compress prompt tokens, and switch to small models when possible.',
      badge: 'Efficiency',
      details: [
        'Save up to 68% in token fees',
        'Dynamic prompt compression',
        'Transparent cost dashboards'
      ],
    },
    {
      id: 3,
      title: 'Military-Grade Guardrails',
      subtitle: 'Enterprise compliance checks',
      description: 'Automatic PII masking, safety alignment filters, and prompt injection detection shielding your pipelines from data leaks.',
      badge: 'Security',
      details: [
        'Instant PII redacting',
        'Safety alignment rulesets',
        'Prompt injection sanitizers'
      ],
    },
    {
      id: 4,
      title: 'Multi-Agent Edge Swarm',
      subtitle: 'Parallel worker clusters',
      description: 'Launch coordinate worker nodes that execute segments of complex tasks in parallel. Perfect for high-speed file parsing and data extraction.',
      badge: 'Scale',
      details: [
        'Parallelized tasks swarms',
        'Auto-scaling edge instances',
        'Streaming telemetry pipes'
      ],
    },
  ];

  const handleSelect = (index: number) => {
    setActiveIndex(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(index);
    }
  };

  return (
    <section id="bento" className="py-24 px-6 relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div 
          ref={headerRef} 
          className="flex flex-col items-center text-center space-y-4 mb-16 opacity-0 translate-y-10 transition-all duration-[400ms] ease-in-out"
        >
          <div className="text-[#FFC801] text-xs font-semibold tracking-wider uppercase">
            Feature Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Architecture for Critical Operations
          </h2>
          <p className="max-w-2xl text-zinc-400 text-sm sm:text-base leading-relaxed">
            Examine the components driving our low-latency infrastructure. Click elements to inspect features and maintain structural context.
          </p>
        </div>

        {/* --- DESKTOP GRID --- */}
        <div className="hidden sm:grid grid-cols-12 gap-6">
          {/* Card 1: Orchestration */}
          <div
            ref={(el) => { desktopCardsRef.current[0] = el; }}
            className="col-span-12 md:col-span-8 cursor-pointer outline-none group focus-visible:ring-2 focus-visible:ring-violet-500 rounded-2xl opacity-0 translate-y-10 transition-all duration-[400ms] ease-out"
            style={{ transitionDelay: '0ms' }}
            onClick={() => handleSelect(0)}
            onMouseEnter={() => handleSelect(0)}
            onKeyDown={(e) => handleKeyDown(e, 0)}
            tabIndex={0}
            role="button"
            aria-pressed={activeIndex === 0}
          >
            <Card
              glow
              className={cn(
                'h-[340px] flex flex-col justify-between border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]',
                activeIndex === 0 ? 'border-violet-500 bg-violet-950/10 shadow-[0_0_30px_rgba(139,92,246,0.1)]' : 'border-white/[0.08]'
              )}
            >
              <div>
                <span className="px-2.5 py-1 rounded-md bg-violet-500/10 border border-violet-500/20 text-[10px] font-semibold text-violet-400 uppercase tracking-wider">
                  {bentoItems[0].badge}
                </span>
                <h3 className="text-xl font-bold text-white mt-4">{bentoItems[0].title}</h3>
                <p className="text-zinc-400 text-sm mt-2 max-w-xl">{bentoItems[0].description}</p>
              </div>
              <div className="flex gap-4 items-center mt-4">
                {bentoItems[0].details.map((detail, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                    {detail}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Card 2: Knowledge Retainer */}
          <div
            ref={(el) => { desktopCardsRef.current[1] = el; }}
            className="col-span-12 md:col-span-4 cursor-pointer outline-none group focus-visible:ring-2 focus-visible:ring-violet-500 rounded-2xl opacity-0 translate-y-10 transition-all duration-[400ms] ease-out"
            style={{ transitionDelay: '100ms' }}
            onClick={() => handleSelect(1)}
            onMouseEnter={() => handleSelect(1)}
            onKeyDown={(e) => handleKeyDown(e, 1)}
            tabIndex={0}
            role="button"
            aria-pressed={activeIndex === 1}
          >
            <Card
              glow
              className={cn(
                'h-[340px] flex flex-col justify-between border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]',
                activeIndex === 1 ? 'border-cyan-500 bg-cyan-950/10 shadow-[0_0_30px_rgba(6,182,212,0.1)]' : 'border-white/[0.08]'
              )}
            >
              <div>
                <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-semibold text-cyan-400 uppercase tracking-wider">
                  {bentoItems[1].badge}
                </span>
                <h3 className="text-xl font-bold text-white mt-4">{bentoItems[1].title}</h3>
                <p className="text-zinc-400 text-sm mt-2">{bentoItems[1].description}</p>
              </div>
              <div className="space-y-1.5">
                {bentoItems[1].details.map((detail, idx) => (
                  <div key={idx} className="text-xs text-zinc-400 flex items-center gap-1">
                    <span className="text-cyan-400">•</span> {detail}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Card 3: Token Optimizer */}
          <div
            ref={(el) => { desktopCardsRef.current[2] = el; }}
            className="col-span-12 md:col-span-4 cursor-pointer outline-none group focus-visible:ring-2 focus-visible:ring-violet-500 rounded-2xl opacity-0 translate-y-10 transition-all duration-[400ms] ease-out"
            style={{ transitionDelay: '200ms' }}
            onClick={() => handleSelect(2)}
            onMouseEnter={() => handleSelect(2)}
            onKeyDown={(e) => handleKeyDown(e, 2)}
            tabIndex={0}
            role="button"
            aria-pressed={activeIndex === 2}
          >
            <Card
              glow
              className={cn(
                'h-[320px] flex flex-col justify-between border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]',
                activeIndex === 2 ? 'border-emerald-500 bg-emerald-950/10 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'border-white/[0.08]'
              )}
            >
              <div>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                  {bentoItems[2].badge}
                </span>
                <h3 className="text-lg font-bold text-white mt-4">{bentoItems[2].title}</h3>
                <p className="text-zinc-400 text-sm mt-2">{bentoItems[2].description}</p>
              </div>
              <div className="space-y-1.5">
                {bentoItems[2].details.map((detail, idx) => (
                  <div key={idx} className="text-xs text-zinc-400 flex items-center gap-1">
                    <span className="text-emerald-400">•</span> {detail}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Card 4: Guardrails */}
          <div
            ref={(el) => { desktopCardsRef.current[3] = el; }}
            className="col-span-12 md:col-span-4 cursor-pointer outline-none group focus-visible:ring-2 focus-visible:ring-violet-500 rounded-2xl opacity-0 translate-y-10 transition-all duration-[400ms] ease-out"
            style={{ transitionDelay: '300ms' }}
            onClick={() => handleSelect(3)}
            onMouseEnter={() => handleSelect(3)}
            onKeyDown={(e) => handleKeyDown(e, 3)}
            tabIndex={0}
            role="button"
            aria-pressed={activeIndex === 3}
          >
            <Card
              glow
              className={cn(
                'h-[320px] flex flex-col justify-between border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]',
                activeIndex === 3 ? 'border-amber-500 bg-amber-950/10 shadow-[0_0_30px_rgba(245,158,11,0.1)]' : 'border-white/[0.08]'
              )}
            >
              <div>
                <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                  {bentoItems[3].badge}
                </span>
                <h3 className="text-lg font-bold text-white mt-4">{bentoItems[3].title}</h3>
                <p className="text-zinc-400 text-sm mt-2">{bentoItems[3].description}</p>
              </div>
              <div className="space-y-1.5">
                {bentoItems[3].details.map((detail, idx) => (
                  <div key={idx} className="text-xs text-zinc-400 flex items-center gap-1">
                    <span className="text-amber-400">•</span> {detail}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Card 5: Swarm */}
          <div
            ref={(el) => { desktopCardsRef.current[4] = el; }}
            className="col-span-12 md:col-span-4 cursor-pointer outline-none group focus-visible:ring-2 focus-visible:ring-violet-500 rounded-2xl opacity-0 translate-y-10 transition-all duration-[400ms] ease-out"
            style={{ transitionDelay: '400ms' }}
            onClick={() => handleSelect(4)}
            onMouseEnter={() => handleSelect(4)}
            onKeyDown={(e) => handleKeyDown(e, 4)}
            tabIndex={0}
            role="button"
            aria-pressed={activeIndex === 4}
          >
            <Card
              glow
              className={cn(
                'h-[320px] flex flex-col justify-between border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]',
                activeIndex === 4 ? 'border-blue-500 bg-blue-950/10 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : 'border-white/[0.08]'
              )}
            >
              <div>
                <span className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-[10px] font-semibold text-blue-400 uppercase tracking-wider">
                  {bentoItems[4].badge}
                </span>
                <h3 className="text-lg font-bold text-white mt-4">{bentoItems[4].title}</h3>
                <p className="text-zinc-400 text-sm mt-2">{bentoItems[4].description}</p>
              </div>
              <div className="space-y-1.5">
                {bentoItems[4].details.map((detail, idx) => (
                  <div key={idx} className="text-xs text-zinc-400 flex items-center gap-1">
                    <span className="text-blue-400">•</span> {detail}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* --- MOBILE ACCORDION (Original Colors + Wrapper Fix) --- */}
        <div className="block sm:hidden space-y-4">
          {bentoItems.map((item, idx) => {
            const isOpen = activeIndex === idx;
            
            // Get original color based on index
            const badgeColor = 
              idx === 0 ? 'text-violet-400' :
              idx === 1 ? 'text-cyan-400' :
              idx === 2 ? 'text-emerald-400' :
              idx === 3 ? 'text-amber-400' :
              'text-blue-400';
              
            const bulletColor = 
              idx === 0 ? 'bg-violet-400' :
              idx === 1 ? 'bg-cyan-400' :
              idx === 2 ? 'bg-emerald-400' :
              idx === 3 ? 'bg-amber-400' :
              'bg-blue-400';

            return (
              // THE WRAPPER FIX
              <div
                key={item.id}
                ref={(el) => { mobileCardsRef.current[idx] = el; }}
                className="opacity-0 translate-y-10 transition-all duration-[400ms] ease-out"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* YOUR EXACT ORIGINAL INNER CARD STYLING */}
                <div className="border border-white/[0.08] rounded-xl overflow-hidden bg-zinc-950/40 backdrop-blur-xl">
                  {/* Accordion Header */}
                  <button
                    className="w-full px-5 py-4 flex items-center justify-between text-left outline-none focus-visible:bg-white/[0.02]"
                    onClick={() => handleSelect(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`accordion-body-${idx}`}
                    id={`accordion-header-${idx}`}
                  >
                    <div className="flex flex-col">
                      <span className={cn("text-[9px] font-semibold tracking-wider uppercase", badgeColor)}>
                        {item.badge}
                      </span>
                      <span className="text-base font-bold text-white mt-1">
                        {item.title}
                      </span>
                    </div>
                    <svg
                      className={cn('w-5 h-5 text-zinc-400 transition-transform duration-300 shrink-0 ml-4', isOpen && 'rotate-180')}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Accordion Body */}
                  <div
                    id={`accordion-body-${idx}`}
                    role="region"
                    aria-labelledby={`accordion-header-${idx}`}
                    className={cn(
                      'transition-all duration-300 ease-in-out overflow-hidden',
                      isOpen ? 'max-h-[300px] border-t border-white/[0.04]' : 'max-h-0'
                    )}
                  >
                    <div className="p-5 space-y-4">
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                      
                      <ul className="space-y-2">
                        {item.details.map((detail, detailIdx) => (
                          <li key={detailIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                            <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", bulletColor)} />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default BentoGrid;