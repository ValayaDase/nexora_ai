'use client';

import { useEffect } from 'react';

/**
 * Custom hook to trigger scroll animations using native IntersectionObserver.
 * Adds the 'visible' class to any element with the 'scroll-reveal' class.
 */
export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Unobserve once animated
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
}
