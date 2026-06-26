'use client';

import React from 'react';

export const TrustedCompanies: React.FC = () => {
  const companies = [
    {
      name: 'Stripe',
      logo: (
        <svg className="h-6 w-auto text-zinc-500 hover:text-white transition-colors" viewBox="0 0 60 25" fill="currentColor">
          <path d="M54.02 10.3c0-3.66-2.52-6.1-6.14-6.1-3.62 0-6.14 2.44-6.14 6.1 0 3.66 2.52 6.1 6.14 6.1 3.62 0 6.14-2.44 6.14-6.1zm-8.8 0c0-2 .95-3.37 2.66-3.37s2.66 1.37 2.66 3.37c0 2-.95 3.37-2.66 3.37s-2.66-1.37-2.66-3.37zM40.2 4.54H37.3V1.65l-2.9 1V4.54h-2.1v2.7h2.1V13.8c0 2.25 1.54 3.75 3.72 3.75a7.3 7.3 0 0 0 1.28-.1v-2.65a4.2 4.2 0 0 1-.78.05c-.83 0-1.32-.44-1.32-1.37V7.24h2.9v-2.7zM29.56 1.3H26.8v15.2h2.76V1.3zm.06 13.9a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM22.5 7.84c0-2.45-1.92-3.64-4.88-3.64a10.84 10.84 0 0 0-4.66 1.05v2.85a9 9 0 0 1 4.14-.95c1.47 0 2.52.54 2.52 1.62v.5a11.16 11.16 0 0 0-4.9 1.15c-2.47 1.06-3.4 2.55-3.4 4.3 0 2.2 1.77 3.68 4.4 3.68 2.05 0 3.52-.92 4.16-2.02l.14 1.77h2.62V7.84zm-2.78 4.26c0 1.57-1.18 2.57-2.82 2.57-1.4 0-2.22-.6-2.22-1.63 0-1.12 1.02-1.74 2.87-2.22a7.33 7.33 0 0 1 2.17-.3v1.58zM10.15 4.54H7.4V1.65l-2.9 1V4.54H2.4V7.24H4.5V13.8c0 2.25 1.54 3.75 3.72 3.75a7.3 7.3 0 0 0 1.28-.1v-2.65a4.2 4.2 0 0 1-.78.05c-.83 0-1.32-.44-1.32-1.37V7.24h3.05v-2.7z" />
        </svg>
      ),
    },
    {
      name: 'Vercel',
      logo: (
        <svg className="h-5 w-auto text-zinc-500 hover:text-white transition-colors" viewBox="0 0 116 26" fill="currentColor">
          <path d="M12.15 0L24.3 21H0L12.15 0zM35 18.24c0-2.82 2.18-5.06 4.97-5.06 2.8 0 4.98 2.24 4.98 5.06 0 2.82-2.18 5.06-4.98 5.06-2.8 0-4.98-2.24-4.98-5.06zm7.26 0c0-1.38-.97-2.43-2.28-2.43-1.32 0-2.29 1.05-2.29 2.43 0 1.38.97 2.43 2.29 2.43 1.31 0 2.28-1.05 2.28-2.43zm12.3-5h2.52v9.75h-2.52V13.25zm0-3.37h2.52v2.37h-2.52V9.88zm8.12 3.37h2.4v1.1c.54-.78 1.48-1.35 2.76-1.35 2.23 0 3.38 1.38 3.38 3.52v6.48h-2.52v-5.69c0-1.12-.55-1.74-1.57-1.74-1.07 0-1.95.78-1.95 2.06v5.37h-2.5V13.25zm22.42 5c0-2.83 2.15-5.07 4.94-5.07 2.8 0 4.94 2.24 4.94 5.07v.52H83c.12 1.33 1.05 2.1 2.37 2.1 1 0 1.76-.45 2.06-1.19h2.58c-.5 1.9-2.3 3.67-4.64 3.67-2.8 0-5.2-2.24-5.2-5.06zm7.26-.8c0-1.19-.8-1.94-2.15-1.94-1.32 0-2.15.75-2.23 1.94h4.38zm13.14-4.2h2.52v9.75h-2.52V13.25zm0-3.37h2.52v2.37h-2.52V9.88z" />
        </svg>
      ),
    },
    {
      name: 'Linear',
      logo: (
        <span className="font-semibold text-sm tracking-wider text-zinc-500 hover:text-white transition-colors uppercase select-none">
          // LINEAR
        </span>
      ),
    },
    {
      name: 'Supabase',
      logo: (
        <span className="font-bold text-sm tracking-tight text-zinc-500 hover:text-white transition-colors select-none flex items-center gap-1">
          <span className="text-emerald-500">⚡</span> SUPABASE
        </span>
      ),
    },
    {
      name: 'Figma',
      logo: (
        <span className="font-medium text-sm text-zinc-500 hover:text-white transition-colors select-none">
          FIGMA
        </span>
      ),
    },
    {
      name: 'Raycast',
      logo: (
        <span className="font-semibold text-sm tracking-wider text-zinc-500 hover:text-white transition-colors select-none">
          RAYCAST
        </span>
      ),
    },
  ];

  return (
    <section className="border-y border-white/[0.04] bg-zinc-950/20 py-8 relative overflow-hidden select-none z-10">
      <div className="max-w-7xl mx-auto px-6 mb-4 flex justify-center">
        <h2 className="text-xs font-semibold text-zinc-500 tracking-widest uppercase text-center">
          Trusted by high-throughput engineering teams
        </h2>
      </div>

      {/* Infinite scrolling ticker container */}
      <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,#000_15%,#000_85%,transparent_100%)]">
        <div className="flex gap-20 items-center justify-around min-w-full shrink-0 animate-ticker">
          {companies.map((co, index) => (
            <div key={`${co.name}-${index}`} className="flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all">
              {co.logo}
            </div>
          ))}
        </div>
        <div className="flex gap-20 items-center justify-around min-w-full shrink-0 animate-ticker" aria-hidden="true">
          {companies.map((co, index) => (
            <div key={`${co.name}-clone-${index}`} className="flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all">
              {co.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
