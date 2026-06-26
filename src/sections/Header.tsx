'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { cn } from '@/utils/cn';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Showcase', href: '#bento' },
    { label: 'Workflow', href: '#workflow' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-bg-dark/80 border-b border-white/[0.06] backdrop-blur-md py-4'
          : 'bg-transparent border-b border-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group outline-none"
          onClick={(e) => handleLinkClick(e, '#')}
          aria-label="NEXORA AI Homepage"
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
          <span className="font-semibold text-lg tracking-tight text-white select-none font-mono">
            nexora<span className="text-forsythia">.ai</span>
          </span>
        </a>

        {/* Desktop Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors outline-none focus-visible:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action button */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="secondary" className="px-4 py-2 border-white/[0.04] text-zinc-300">
            Sign In
          </Button>
          <Button variant="primary" glow className="px-4 py-2 bg-white text-black font-semibold">
            Launch Console
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-zinc-400 hover:text-white outline-none focus-visible:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <Icon name="x-mark" className="w-6 h-6" />
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer menu */}
      <div
        className={cn(
          'fixed inset-x-0 top-[65px] bottom-0 z-40 bg-bg-dark/95 backdrop-blur-xl border-t border-white/[0.06] p-6 flex flex-col justify-between transition-all duration-300 md:hidden',
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        )}
      >
        <nav className="flex flex-col gap-6 pt-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-lg font-medium text-zinc-300 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-4 pb-8">
          <Button variant="secondary" className="w-full justify-center text-zinc-300">
            Sign In
          </Button>
          <Button variant="primary" glow className="w-full justify-center">
            Launch Console
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
