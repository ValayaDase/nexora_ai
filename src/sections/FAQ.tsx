'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<(HTMLDivElement | null)[]>([]);

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
    
    faqsRef.current.forEach((faq) => {
      if (faq) observer.observe(faq);
    });

    return () => observer.disconnect();
  }, []);

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'What runtime latency overhead does NEXORA AI add?',
      answer: 'Near zero. NEXORA AI’s execution layer runs on serverless edge V8 containers distributed globally. The telemetry logs, database synchronization checks, and model compression handlers add less than 15ms of total overhead.',
    },
    {
      id: 'faq-2',
      question: 'How does the performance-isolated pricing matrix update?',
      answer: 'Our pricing uses an observer-pattern model store. Changing currencies or billing options triggers updates exclusively in the final price text nodes on the client, avoiding full-page or parent component re-renders for maximum performance.',
    },
    {
      id: 'faq-3',
      question: 'How is data security handled during agent runs?',
      answer: 'We redact all personally identifiable information (PII) before it reaches public LLM endpoints. All prompt vectors are encrypted using AES-256 at rest, and vector queries run inside VPC-isolated edge networks.',
    },
    {
      id: 'faq-4',
      question: 'Can I connect custom model endpoints or local open-source LLMs?',
      answer: 'Yes. In addition to commercial APIs like OpenAI and Anthropic, NEXORA AI supports custom HTTP endpoints, allowing you to route workloads to self-hosted Llama-3, Mistral, or proprietary model clusters securely.',
    },
    {
      id: 'faq-5',
      question: 'How does the annual discount calculation work?',
      answer: 'Choosing the Annual option applies a 20% discount factor dynamically to all tiers. Our system computes prices dynamically using the matrix configuration and displays the converted values.',
    },
  ];

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 px-6 relative z-10 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div 
          ref={headerRef}
          className="flex flex-col items-center text-center space-y-4 mb-16 opacity-0 translate-y-10 transition-all duration-[400ms] ease-in-out"
        >
          <div className="text-violet-400 text-xs font-semibold tracking-wider uppercase">
            Questions & Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="max-w-2xl text-zinc-400 text-sm sm:text-base leading-relaxed">
            Have questions about system latency, vector DB support, security compliance, or billing matrices? Here are the answers.
          </p>
        </div>

        {/* FAQs List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              // OUTER WRAPPER: Sirf scroll animation ke liye
              <div
                key={faq.id}
                ref={(el) => { faqsRef.current[index] = el; }}
                className="opacity-0 translate-y-10 transition-all duration-[400ms] ease-out"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* INNER WRAPPER: Tumhare original colors aur styling */}
                <div className="border border-white/[0.08] rounded-xl overflow-hidden bg-zinc-950/40 backdrop-blur-xl transition-colors duration-200 hover:border-white/[0.12]">
                  
                  {/* FAQ Header Button */}
                  <button
                    className="w-full px-6 py-5 flex items-center justify-between text-left outline-none cursor-pointer focus-visible:bg-white/[0.02] focus-visible:ring-2 focus-visible:ring-violet-500 rounded-t-xl"
                    onClick={() => handleToggle(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    id={`faq-header-${faq.id}`}
                  >
                    <span className="font-semibold text-sm sm:text-base text-zinc-100 hover:text-white transition-colors">
                      {faq.question}
                    </span>
                    <svg
                      className={cn(
                        'w-5 h-5 text-zinc-400 transition-transform duration-300 shrink-0 ml-4',
                        isOpen && 'rotate-180 text-violet-400'
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* FAQ Answer Panel */}
                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-header-${faq.id}`}
                    className={cn(
                      'transition-all duration-300 ease-in-out overflow-hidden',
                      isOpen ? 'max-h-[200px] border-t border-white/[0.04]' : 'max-h-0'
                    )}
                  >
                    <p className="px-6 py-5 text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      {faq.answer}
                    </p>
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

export default FAQ;