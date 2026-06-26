'use client';

import React, { useState, useEffect, useRef } from 'react';
import Card from '@/components/Card';

export const Features = () => {
  // --- STATE FOR FEATURE 2: CONTEXT LOCK ---
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const featuresList = [
    {
      id: 'routing',
      title: 'Neural Model Routing',
      description: 'Dynamically route workloads to GPT-4o, Claude 3.5, or Llama 3 based on query complexity.',
      iconFile: '/SVGs/cog-8-tooth.svg', 
      bentoClass: 'md:col-span-2 md:row-span-1', 
    },
    {
      id: 'vector',
      title: 'Real-time Vector Sync',
      description: 'Sync local data store states with vector indexes instantly, ensuring context relevance.',
      iconFile: '/SVGs/arrow-path.svg',
      bentoClass: 'md:col-span-1 md:row-span-1',
    },
    {
      id: 'execution',
      title: 'Edge Parallelization',
      description: 'Execute nested workflow tasks in parallel inside distributed edge containers.',
      iconFile: '/SVGs/cube-16-solid.svg', 
      bentoClass: 'md:col-span-1 md:row-span-2', 
    },
    {
      id: 'observability',
      title: 'Visual Step Debugging',
      description: 'Trace LLM calls, arguments, state updates, and tool invocations step-by-step.',
      iconFile: '/SVGs/search.svg',
      bentoClass: 'md:col-span-2 md:row-span-1',
    },
    {
      id: 'security',
      title: 'Enterprise Access',
      description: 'Secure pipelines with SAML/OIDC, granular API scopes, and secrets rotation.',
      iconFile: '/SVGs/link-solid.svg',
      bentoClass: 'md:col-span-1 md:row-span-1',
    },
    {
      id: 'webhooks',
      title: 'Bidirectional Webhooks',
      description: 'Listen to event streams from Stripe or GitHub to trigger downstream sequences.',
      iconFile: '/SVGs/arrow-trending-up.svg', 
      bentoClass: 'md:col-span-1 md:row-span-1',
    },
  ];

  return (
    <section id="features" className="py-24 px-6 relative z-10 scroll-mt-20 overflow-hidden bg-bg-dark">
      <div className="max-w-7xl mx-auto">
        
        <div 
          ref={headerRef}
          className="flex flex-col items-center text-center space-y-4 mb-16 opacity-0 translate-y-10 transition-all duration-[400ms] ease-in-out"
        >
          <div className="text-forsythia font-mono text-xs font-semibold tracking-wider uppercase border border-forsythia/20 bg-forsythia/5 px-4 py-1.5 rounded-full">
            Core Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            Engineered for Autonomy
          </h2>
          <p className="max-w-2xl text-mystic-mint/70 text-sm sm:text-base leading-relaxed font-sans">
            A premium bento architecture seamlessly adapting to your device. Resize the window to test state persistence.
          </p>
        </div>

        {!isMobile ? (
          <div className="hidden md:grid grid-cols-3 gap-6">
            {featuresList.map((feature, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={feature.id}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  className={`${feature.bentoClass} opacity-0 translate-y-10 transition-all duration-[500ms] ease-out`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Card 
                    glow={true} 
                    interactive={true}
                    className={`h-full flex flex-col gap-5 transition-transform duration-[300ms] ease-out ${isActive ? '-translate-y-2' : ''}`}
                  >
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors duration-300 ${isActive ? 'border-[#FFC801]/40 bg-[#FFC801]/10' : 'border-white/[0.08] bg-white/[0.02]'}`}>
                      <img 
                        src={feature.iconFile} 
                        alt={feature.title} 
                        className={`w-6 h-6 invert transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-60'}`} 
                      />
                    </div>
                    
                    <div>
                      <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 font-sans tracking-wide ${isActive ? 'text-[#FF9932]' : 'text-white'}`}>
                        {feature.title}
                      </h3>
                      <p className={`text-sm leading-relaxed transition-colors duration-300 font-sans ${isActive ? 'text-[#D9E8E2]' : 'text-[#D9E8E2]/60'}`}>
                        {feature.description}
                      </p>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex md:hidden flex-col space-y-4">
            {featuresList.map((feature, index) => {
              const isOpen = activeIndex === index;
              return (
                <div
                  key={feature.id}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  className="opacity-0 translate-y-10 transition-all duration-[400ms] ease-out"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <Card className="p-0 sm:p-0 overflow-hidden" glow={isOpen} interactive={true}>
                    <button
                      onClick={() => setActiveIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-colors duration-300 ${isOpen ? 'border-[#FFC801]/40 bg-[#FFC801]/10' : 'border-white/[0.08] bg-white/[0.02]'}`}>
                          <img 
                            src={feature.iconFile} 
                            alt={feature.title} 
                            className={`w-5 h-5 invert transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-60'}`} 
                          />
                        </div>
                        <span className={`font-bold text-base font-sans transition-colors duration-300 ${isOpen ? 'text-[#FF9932]' : 'text-white'}`}>
                          {feature.title}
                        </span>
                      </div>
                      <svg 
                        className={`w-5 h-5 transition-transform duration-[300ms] ease-in-out ${isOpen ? 'rotate-180 text-forsythia' : 'text-white/40'}`} 
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div 
                      className={`grid transition-all duration-[400ms] ease-in-out px-6
                        ${isOpen ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'}
                      `}
                    >
                      <div className="overflow-hidden">
                        <p className="text-sm text-mystic-mint/80 leading-relaxed font-sans pl-14">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Features;