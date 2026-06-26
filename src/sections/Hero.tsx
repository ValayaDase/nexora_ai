'use client';

import React, { useEffect, useRef } from 'react';
import Button from '@/components/Button';
import GlassContainer from '@/components/GlassContainer';

export const Hero: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  // --- STRICT ENTRY ANIMATION (< 500ms, Zero Global Re-flows) ---
  useEffect(() => {
    if (contentRef.current && visualRef.current) {
      // Small timeout to ensure DOM is painted, then trigger CSS transitions
      const timer = setTimeout(() => {
        contentRef.current?.classList.remove('opacity-0', 'translate-y-10');
        contentRef.current?.classList.add('opacity-100', 'translate-y-0');
        
        visualRef.current?.classList.remove('opacity-0', 'translate-y-10');
        visualRef.current?.classList.add('opacity-100', 'translate-y-0');
      }, 50);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-32 pb-20 px-6 overflow-hidden bg-bg-dark">
      {/* Mesh Grid Background Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(241,246,244,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(241,246,244,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0 pointer-events-none" />
      
      {/* Floating Glowing Background Orbs (Strictly Brand Colors) */}
      <div className="absolute top-[25%] left-[20%] w-[350px] h-[350px] rounded-full bg-[#FFC801]/10 blur-[120px] animate-pulse-slow z-0 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] rounded-full bg-[#114C5A]/30 blur-[130px] animate-pulse-slow z-0 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left column: Text copy & CTAs */}
        <div 
          ref={contentRef}
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 opacity-0 translate-y-10 transition-all duration-[400ms] ease-out"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#FFC801]/30 bg-[#FFC801]/5 text-[#FFC801] text-xs font-semibold tracking-wide uppercase select-none font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9932] animate-pulse" />
            Next-Gen Autonomous Workflow Orchestrator
          </div>
          
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-[#F1F6F4] font-sans">
            Run Autonomous AI
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC801] to-[#FF9932]">Pipelines at Scale</span>
          </h1>
          
          {/* Description */}
          <p className="max-w-xl text-base sm:text-lg text-[#D9E8E2]/80 font-normal leading-relaxed font-sans">
            Deploy autonomous agents that connect your APIs, monitor real-time event queues, and execute complex business logic. Built for developers who require high-performance concurrency and zero cold-starts.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto font-sans">
            <Button variant="primary" glow className="px-8 py-4 font-bold text-base shadow-2xl bg-[#FFC801] text-[#172B36] hover:bg-[#FF9932]">
              Start Building Free
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
            <Button variant="secondary" className="px-8 py-4 font-semibold text-base border-[#F1F6F4]/10 text-[#F1F6F4] hover:bg-[#F1F6F4]/[0.05]">
              Schedule Demo
            </Button>
          </div>
        </div>

        {/* Right column: Floating interactive visual elements */}
        <div 
          ref={visualRef}
          className="lg:col-span-5 relative w-full h-[380px] sm:h-[450px] flex items-center justify-center lg:justify-end opacity-0 translate-y-10 transition-all duration-[500ms] ease-out delay-100"
        >
          
          {/* Card 1: Main workflow execution log */}
          <GlassContainer className="w-[85%] sm:w-[360px] p-5 border-[#F1F6F4]/10 bg-[#172B36]/60 shadow-[0_20px_50px_-12px_rgba(17,76,90,0.5)] animate-float-medium select-none z-20">
            <div className="flex items-center justify-between border-b border-[#F1F6F4]/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF9932] animate-pulse" />
                <span className="text-xs font-bold text-[#F1F6F4] font-sans">SalesAgent-01</span>
              </div>
              <span className="text-[10px] text-[#D9E8E2]/50 font-mono">ID: 4d9c2f</span>
            </div>
            
            <div className="space-y-3 font-mono text-[11px] text-[#D9E8E2]/80">
              <div className="flex items-start gap-2">
                <span className="text-[#FFC801]">⚡</span>
                <span>Webhook received from Stripe checkout</span>
              </div>
              <div className="flex items-start gap-2 pl-4 border-l border-[#F1F6F4]/10">
                <span className="text-[#D9E8E2]/50">→</span>
                <span>Parsing buyer intent & email query...</span>
              </div>
              <div className="flex items-start gap-2 pl-4 border-l border-[#F1F6F4]/10">
                <span className="text-[#FF9932]">✓</span>
                <span className="text-[#FF9932] font-semibold">Customer CRM verified (HubSpot)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FFC801]">⚡</span>
                <span>Generating tailored discount code...</span>
              </div>
              <div className="flex items-start gap-2 pl-4 border-l border-[#F1F6F4]/10">
                <span className="text-[#FF9932]">✓</span>
                <span className="text-[#F1F6F4]">Draft response composed</span>
              </div>
            </div>
            
            <div className="mt-5 pt-3 border-t border-[#F1F6F4]/10 flex items-center justify-between text-[10px] text-[#D9E8E2]/50 font-mono">
              <span>Steps: 5/5</span>
              <span className="text-[#FFC801] font-bold tracking-wide">Success (232ms)</span>
            </div>
          </GlassContainer>

          {/* Card 2: Micro graph visual */}
          <GlassContainer className="absolute left-4 top-10 w-[140px] sm:w-[170px] p-4 border-[#F1F6F4]/10 bg-[#114C5A]/40 animate-float-slow z-10">
            <span className="text-[10px] text-[#D9E8E2]/60 font-semibold tracking-wider uppercase block font-mono">Tokens/sec</span>
            <div className="text-xl font-extrabold text-[#FFC801] mt-1 font-mono">2.4k</div>
            
            {/* Simple CSS simulated chart bar with Strict Colors */}
            <div className="flex items-end gap-1.5 h-12 mt-4">
              <div className="w-full bg-[#FF9932]/40 rounded-sm h-[30%] animate-pulse" />
              <div className="w-full bg-[#FF9932]/60 rounded-sm h-[60%]" />
              <div className="w-full bg-[#FF9932]/50 rounded-sm h-[45%]" />
              <div className="w-full bg-[#FFC801] rounded-sm h-[90%] animate-pulse shadow-[0_0_10px_rgba(255,200,1,0.5)]" />
              <div className="w-full bg-[#FF9932]/80 rounded-sm h-[70%]" />
            </div>
          </GlassContainer>

          {/* Card 3: Model select float status */}
          <GlassContainer className="absolute right-4 bottom-12 w-[160px] sm:w-[190px] p-4 border-[#F1F6F4]/10 bg-[#172B36]/80 animate-float-fast z-30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FFC801]/10 flex items-center justify-center border border-[#FFC801]/20">
                <svg className="w-4 h-4 text-[#FFC801]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <span className="text-[9px] text-[#D9E8E2]/60 block font-semibold uppercase tracking-wide font-mono">Active Model</span>
                <span className="text-xs font-bold text-[#F1F6F4] font-sans">Claude-3.5</span>
              </div>
            </div>
          </GlassContainer>
          
        </div>
      </div>
    </section>
  );
};
export default Hero;