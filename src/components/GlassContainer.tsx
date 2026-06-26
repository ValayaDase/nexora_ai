'use client';

import React, { useRef } from 'react';
import { cn } from '@/utils/cn';

interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  interactive?: boolean;
}

export const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  className,
  glow = true,
  interactive = true,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !glow) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/40 backdrop-blur-xl transition-all duration-300',
        interactive && 'hover:border-white/[0.15] hover:bg-zinc-900/40 hover:shadow-[0_0_40px_rgba(139,92,246,0.03)]',
        className
      )}
      {...props}
    >
      {/* Spotlit gradient overlay (fades in on parent hover) */}
      {glow && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: 'radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 153, 50, 0.05), transparent 40%)',
          }}
        />
      )}
      
      {/* Border glow spotlight */}
      {glow && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 200, 1, 0.15), transparent 40%)',
            maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1px',
          }}
        />
      )}

      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default GlassContainer;
