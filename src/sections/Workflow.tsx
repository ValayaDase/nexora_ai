'use client';

import React, { useState, useEffect, useRef } from 'react';
import Card from '@/components/Card';
import { cn } from '@/utils/cn';

interface WorkflowStep {
  id: number;
  title: string;
  badge: string;
  description: string;
  simulation: {
    log: string;
    metrics: string;
    details: string[];
  };
}

export const Workflow: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  
  // --- ANIMATION REFS ---
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

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
    if (stepsContainerRef.current) observer.observe(stepsContainerRef.current);
    if (terminalRef.current) observer.observe(terminalRef.current);

    return () => observer.disconnect();
  }, []);

  const steps: WorkflowStep[] = [
    {
      id: 0,
      title: 'Event Trigger & Ingestion',
      badge: 'Step 1: Event',
      description: 'Accept triggers via webhook, SQS queues, cron schedules, or direct SDK calls. The payload is sanitized and parsed in 1ms.',
      simulation: {
        log: 'Inbound webhook [POST /api/v1/event] received',
        metrics: 'Size: 2.4KB • Latency: 0.8ms',
        details: [
          'Sanitized raw headers & body',
          'Parsed JSON payload structure',
          'Assigned unique execution ID: wfk_90432a'
        ]
      }
    },
    {
      id: 1,
      title: 'Dynamic Context Retrieval',
      badge: 'Step 2: Retrieval',
      description: 'The semantic engine queries global vector stores to load relevant history and documentation into prompt caches.',
      simulation: {
        log: 'Querying regional Pinecone index (us-east-1)',
        metrics: 'Similarity threshold: 0.88 • Time: 12.4ms',
        details: [
          'Retrieved 3 context blocks',
          'Loaded client CRM metadata',
          'Injected document reference #402'
        ]
      }
    },
    {
      id: 2,
      title: 'Neural Agent Routing',
      badge: 'Step 3: Route',
      description: 'Based on semantic intent, work is routed to specialized agent worker pools. Prompts are compressed to minimize latency.',
      simulation: {
        log: 'Router selected Claude-3.5-Sonnet cluster',
        metrics: 'Compression: -30% tokens • Time: 4.2ms',
        details: [
          'Calculated model intent score: 0.96',
          'Applied pricing-cap threshold rules',
          'Formatted prompts into chat schema'
        ]
      }
    },
    {
      id: 3,
      title: 'Execution & Self-Healing',
      badge: 'Step 4: Execute',
      description: 'Worker agents run API actions and parse outputs. If schema validation fails, the agent auto-corrects using model feedback loop.',
      simulation: {
        log: 'Executing Hubspot API patch [update_lead]',
        metrics: 'Attempts: 1/3 • Time: 184ms',
        details: [
          'Authorized OAuth token',
          'Ran API mutation',
          'Verified response schema matching'
        ]
      }
    },
    {
      id: 4,
      title: 'Structured Output Validation',
      badge: 'Step 5: Output',
      description: 'Results are verified against strict JSON schemas before being dispatched to downstream client webhooks.',
      simulation: {
        log: 'Output validation check succeeded',
        metrics: 'Schema: Strict JSON • Time: 0.5ms',
        details: [
          'Confirmed required fields exist',
          'Dispatched callback to billing webhooks',
          'Archived log status to dashboard'
        ]
      }
    }
  ];

  return (
    <section id="workflow" className="py-24 px-6 relative z-10 scroll-mt-20 overflow-hidden bg-bg-dark">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div 
          ref={headerRef}
          className="flex flex-col items-center text-center space-y-4 mb-16 opacity-0 translate-y-10 transition-all duration-[400ms] ease-in-out"
        >
          <div className="text-[#FFC801] font-mono text-xs font-semibold tracking-wider uppercase">
            Operational Lifecycle
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F6F4] font-sans">
            How NEXORA AI Orchestrates Tasks
          </h2>
          <p className="max-w-2xl text-[#D9E8E2]/80 text-sm sm:text-base leading-relaxed font-sans">
            Follow an event as it processes through the ingestion pipeline to output generation. Click a pipeline phase to inspect live logs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Timeline List */}
          <div 
            ref={stepsContainerRef}
            className="lg:col-span-5 flex flex-col gap-4 opacity-0 translate-y-10 transition-all duration-[400ms] ease-in-out" 
            style={{ transitionDelay: '100ms' }}
          >
            {steps.map((step) => {
              const isActive = activeStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className="w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-[#FFC801] rounded-xl"
                  aria-pressed={isActive}
                >
                  <div
                    className={cn(
                      'p-5 rounded-xl border transition-all duration-300 text-left cursor-pointer group',
                      isActive
                        ? 'border-[#FFC801]/50 bg-[#FFC801]/10 shadow-[0_0_30px_rgba(255,200,1,0.05)] -translate-x-1'
                        : 'border-[#F1F6F4]/10 bg-transparent hover:border-[#F1F6F4]/20 hover:bg-[#F1F6F4]/[0.02]'
                    )}
                  >
                    <span
                      className={cn(
                        'text-[10px] font-bold uppercase tracking-wider font-mono transition-colors duration-300',
                        isActive ? 'text-[#FF9932]' : 'text-[#D9E8E2]/50 group-hover:text-[#D9E8E2]/80'
                      )}
                    >
                      {step.badge}
                    </span>
                    <h3
                      className={cn(
                        'text-base font-bold mt-1 transition-colors duration-300 font-sans',
                        isActive ? 'text-[#F1F6F4]' : 'text-[#D9E8E2]/70 group-hover:text-[#F1F6F4]'
                      )}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[#D9E8E2]/50 text-xs mt-2 leading-relaxed font-sans">
                      {step.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Terminal Console */}
          <div 
            ref={terminalRef}
            className="lg:col-span-7 opacity-0 translate-y-10 transition-all duration-[400ms] ease-in-out"
            style={{ transitionDelay: '200ms' }}
          >
            <Card glow className="h-full p-6 sm:p-8 flex flex-col justify-between border-[#F1F6F4]/10 bg-[#114C5A]/40 min-h-[380px]">
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b border-[#F1F6F4]/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-[#FFC801]" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] text-[#D9E8E2]/60 font-mono ml-4 select-none">
                    nexora_console://wfk_90432a
                  </span>
                </div>
                <span className="text-[10px] text-[#FFC801] font-mono font-semibold px-2 py-0.5 rounded bg-[#FFC801]/10 uppercase tracking-widest border border-[#FFC801]/20">
                  Live Terminal
                </span>
              </div>

              {/* Terminal Output Area */}
              <div className="flex-1 font-mono text-[12px] space-y-5">
                <div className="space-y-1.5 transition-opacity duration-300">
                  <div className="text-[#D9E8E2]/40 select-none"># Execute sequence stream</div>
                  <div className="text-[#FF9932] flex items-start gap-2">
                    <span className="text-[#FFC801] shrink-0 font-bold">&gt;</span>
                    <span className="font-semibold">{steps[activeStep].simulation.log}</span>
                  </div>
                </div>

                <div className="space-y-1.5 transition-opacity duration-300 delay-75">
                  <div className="text-[#D9E8E2]/40 select-none"># Sequence telemetry metrics</div>
                  <div className="text-[#D9E8E2] font-medium pl-4 border-l-2 border-[#172B36]">
                    {steps[activeStep].simulation.metrics}
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-[#F1F6F4]/[0.05] transition-opacity duration-300 delay-150">
                  <div className="text-[#D9E8E2]/40 select-none mb-2"># Execution logs</div>
                  {steps[activeStep].simulation.details.map((detail, idx) => (
                    <div key={idx} className="text-[#D9E8E2]/80 flex items-start gap-2 pl-4">
                      <span className="text-[#D9E8E2]/40 select-none">[{idx + 1}]</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terminal Footer */}
              <div className="mt-8 border-t border-[#F1F6F4]/[0.05] pt-4 flex items-center justify-between text-[11px] text-[#D9E8E2]/50 font-mono">
                <span>Status: LISTENING</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Console synced (GMT+5:30)
                </span>
              </div>

            </Card>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Workflow;