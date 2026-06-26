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
    <section id="bento" className="py-24 px-6 relative z-10 scroll-mt-20 overflow-hidden bg-bg-dark">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div 
          ref={headerRef} 
          className="flex flex-col items-center text-center space-y-4 mb-16 opacity-0 translate-y-10 transition-all duration-[400ms] ease-in-out"
        >
          <div className="text-[#FFC801] text-xs font-semibold tracking-wider uppercase font-mono">
            Feature Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F6F4] font-sans">
            Architecture for Critical Operations
          </h2>
          <p className="max-w-2xl text-[#D9E8E2]/80 text-sm sm:text-base leading-relaxed font-sans">
            Examine the components driving our low-latency infrastructure. Click elements to inspect features and maintain structural context.
          </p>
        </div>

        {/* --- DESKTOP GRID --- */}
        <div className="hidden sm:grid grid-cols-12 gap-6">
          
          {bentoItems.map((item, idx) => {
            const isActive = activeIndex === idx;
            // Determine col spans based on original layout (0 is span-8, 1 is span-4, etc.)
            const colSpanClass = idx === 0 ? 'col-span-12 md:col-span-8' : 'col-span-12 md:col-span-4';
            const cardHeightClass = idx < 2 ? 'h-[340px]' : 'h-[320px]';

            return (
              <div
                key={item.id}
                ref={(el) => { desktopCardsRef.current[idx] = el; }}
                className={`${colSpanClass} cursor-pointer outline-none group focus-visible:ring-2 focus-visible:ring-[#FFC801] rounded-2xl opacity-0 translate-y-10 transition-all duration-[400ms] ease-out`}
                style={{ transitionDelay: `${idx * 100}ms` }}
                onClick={() => handleSelect(idx)}
                onMouseEnter={() => handleSelect(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
              >
                <Card
                  glow
                  className={cn(
                    `${cardHeightClass} flex flex-col justify-between border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(17,76,90,0.5)]`,
                    isActive 
                      ? 'border-[#FFC801]/50 bg-[#114C5A]/30 shadow-[0_0_30px_rgba(255,200,1,0.08)]' 
                      : 'border-[#F1F6F4]/10 bg-[#172B36]/40'
                  )}
                >
                  <div>
                    <span className="px-2.5 py-1 rounded-md bg-[#FFC801]/10 border border-[#FFC801]/20 text-[10px] font-semibold text-[#FFC801] uppercase tracking-wider font-mono">
                      {item.badge}
                    </span>
                    <h3 className="text-xl font-bold text-[#F1F6F4] mt-4 font-sans">{item.title}</h3>
                    <p className="text-[#D9E8E2]/70 text-sm mt-2 max-w-xl font-sans">{item.description}</p>
                  </div>

                  <div className={idx === 0 ? "flex gap-4 items-center mt-4" : "space-y-1.5"}>
                    {item.details.map((detail, detailIdx) => (
                      <div 
                        key={detailIdx} 
                        className={idx === 0 
                          ? "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F1F6F4]/[0.03] border border-[#F1F6F4]/[0.06] text-xs text-[#D9E8E2] font-sans" 
                          : "text-xs text-[#D9E8E2]/80 flex items-center gap-2 font-sans"
                        }
                      >
                        {idx === 0 ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF9932]" />
                        ) : (
                          <span className="text-[#FF9932]">•</span>
                        )}
                        {detail}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            );
          })}

        </div>

        {/* --- MOBILE ACCORDION --- */}
        <div className="block sm:hidden space-y-4">
          {bentoItems.map((item, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div
                key={item.id}
                ref={(el) => { mobileCardsRef.current[idx] = el; }}
                className={cn(
                  "border rounded-xl overflow-hidden transition-all duration-[400ms] ease-out opacity-0 translate-y-10",
                  isOpen ? "bg-[#114C5A]/80 border-[#FFC801]/40" : "bg-[#172B36] border-[#F1F6F4]/10"
                )}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <button
                  className="w-full px-5 py-4 flex items-center justify-between text-left outline-none focus-visible:bg-[#F1F6F4]/[0.05]"
                  onClick={() => handleSelect(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`accordion-body-${idx}`}
                  id={`accordion-header-${idx}`}
                >
                  <div className="flex flex-col">
                    <span className="text-[9px] font-semibold tracking-wider text-[#FFC801] uppercase font-mono">
                      {item.badge}
                    </span>
                    <span className="text-base font-bold text-[#F1F6F4] mt-1 font-sans">
                      {item.title}
                    </span>
                  </div>
                  <svg
                    className={cn('w-5 h-5 transition-transform duration-300 shrink-0 ml-4', isOpen ? 'rotate-180 text-[#FFC801]' : 'text-[#D9E8E2]/50')}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  id={`accordion-body-${idx}`}
                  role="region"
                  aria-labelledby={`accordion-header-${idx}`}
                  className={cn(
                    'transition-all duration-300 ease-in-out overflow-hidden',
                    isOpen ? 'max-h-[300px] border-t border-[#F1F6F4]/[0.05]' : 'max-h-0'
                  )}
                >
                  <div className="p-5 space-y-4">
                    <p className="text-[#D9E8E2]/80 text-sm leading-relaxed font-sans">
                      {item.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {item.details.map((detail, detailIdx) => (
                        <li key={detailIdx} className="flex items-center gap-2 text-xs text-[#D9E8E2]/90 font-sans">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF9932] shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
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