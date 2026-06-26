'use client';

import React from 'react';

export const Footer: React.FC = () => {
  const links = {
    product: [
      { label: 'Agent Engine', href: '#' },
      { label: 'Vector Sync', href: '#' },
      { label: 'Model Router', href: '#' },
      { label: 'Visual Console', href: '#' },
      { label: 'Pricing Tiers', href: '#pricing' },
    ],
    developers: [
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'GitHub Repo', href: '#' },
      { label: 'Status Page', href: '#' },
      { label: 'Integrations SDK', href: '#' },
    ],
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Engineering Blog', href: '#' },
      { label: 'Careers (We\'re hiring)', href: '#' },
      { label: 'Press Kit', href: '#' },
      { label: 'Contact Sales', href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'GDPR Compliance', href: '#' },
      { label: 'Security & SLA', href: '#' },
    ],
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer className="border-t border-white/[0.04] bg-zinc-950/40 backdrop-blur-md pt-20 pb-12 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 md:gap-8 pb-16">
          
          {/* Logo & Newsletter Column */}
          <div className="col-span-2 space-y-6">
            <a
              href="#"
              onClick={(e) => handleLinkClick(e, '#')}
              className="flex items-center gap-2 group outline-none"
              aria-label="Nexora AI Homepage"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-forsythia via-deep-saffron to-nocturnal-expedition flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
              <span className="font-semibold text-base tracking-tight text-white select-none">
                nexora<span className="text-[#FFC801]">.ai</span>
              </span>
            </a>

            <p className="text-zinc-500 text-xs leading-relaxed max-w-xs font-normal">
              Nexora.ai is the autonomous orchestration engine for high-throughput engineering teams. Connect prompts, retrieve vector records, and trigger workflow actions securely.
            </p>

            <form
              className="flex flex-col gap-2 max-w-xs"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter Subscription"
            >
              <label htmlFor="footer-email" className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                Subscribe to Changelog
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  id="footer-email"
                  placeholder="name@company.com"
                  required
                  className="flex-1 bg-white/[0.02] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-600 outline-none focus:border-violet-500/50 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-white hover:bg-zinc-200 text-black text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Join
                </button>
              </div>
            </form>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 select-none">Product</h3>
            <ul className="space-y-3">
              {links.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-xs text-zinc-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 select-none">Developers</h3>
            <ul className="space-y-3">
              {links.developers.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-xs text-zinc-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 select-none">Company</h3>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-xs text-zinc-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 select-none">Legal</h3>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-xs text-zinc-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom row */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-normal">
          <div>
            &copy; {new Date().getFullYear()} Nexora.ai Technologies, Inc. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Twitter / X</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Discord Community</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
