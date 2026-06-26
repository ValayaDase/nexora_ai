'use client';

import React, { useEffect, useRef } from 'react';
import Card from '@/components/Card';
import { Testimonial } from '@/types';

export const Testimonials: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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
    
    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const testimonials: Testimonial[] = [
    {
      id: 'quote-1',
      name: 'Sarah Jenkins',
      role: 'VP of Engineering',
      company: 'Logix Labs',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
      quote: 'Nexora.ai reduced our data parsing cycle latency by 80%. We went from maintaining custom Node.js script workers to deploying self-correcting agents in less than two weeks. This is the future of serverless orchestration.',
    },
    {
      id: 'quote-2',
      name: 'Marcus Chen',
      role: 'Lead Architect',
      company: 'Synapse',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      quote: 'The performance isolation pricing matrix is indicative of the engineering detail throughout this platform. Our token consumption fees fell by 60% using their Prompt Compression agent, and integration setup was seamless.',
    },
    {
      id: 'quote-3',
      name: 'Elena Rostova',
      role: 'Director of Platform Operations',
      company: 'DevFlow',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
      quote: 'Deploying agents at the edge with near-zero latency has completely changed how we handle automated alert escalation. The visual debugger let us trim down unnecessary model calls in minutes.',
    },
  ];

  return (
    <section className="py-24 px-6 relative z-10 overflow-hidden bg-bg-dark">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div 
          ref={headerRef}
          className="flex flex-col items-center text-center space-y-4 mb-16 opacity-0 translate-y-10 transition-all duration-[400ms] ease-in-out"
        >
          <div className="text-[#FFC801] font-mono text-xs font-semibold tracking-wider uppercase">
            Platform Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F6F4] font-sans">
            Endorsed by Technical Leaders
          </h2>
          <p className="max-w-2xl text-[#D9E8E2]/80 text-sm sm:text-base leading-relaxed font-sans">
            See how scaling engineering teams automate workflows, secure context retrieval, and control model routing costs with NEXORA AI.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={t.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="opacity-0 translate-y-10 transition-all duration-[500ms] ease-out"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card
                glow
                interactive
                className="h-full p-8 flex flex-col justify-between border-[#F1F6F4]/10 bg-[#172B36]/40 hover:border-[#FFC801]/30 transition-colors duration-[300ms]"
              >
                <div className="space-y-6">
                  {/* 5 Star Rating Indicator */}
                  <div className="flex items-center gap-1.5 text-[#FFC801] select-none">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 drop-shadow-[0_0_8px_rgba(255,200,1,0.5)]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-[#D9E8E2]/90 text-sm font-normal leading-relaxed italic font-sans">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* User profile details */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#F1F6F4]/[0.05]">
                  {/* Premium Brand Gradient Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF9932] to-[#FFC801] flex items-center justify-center text-[#114C5A] text-xs font-extrabold font-mono shadow-[0_0_15px_rgba(255,200,1,0.2)] uppercase select-none">
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#F1F6F4] leading-none font-sans">{t.name}</h4>
                    <p className="text-xs text-[#D9E8E2]/60 mt-1 font-sans">
                      {t.role} at <span className="text-[#D9E8E2]/90">{t.company}</span>
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;