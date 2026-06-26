import React from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  glow?: boolean;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', glow = false, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium transition-all duration-200 outline-none select-none cursor-pointer focus-visible:ring-2 focus-visible:ring-forsythia focus-visible:ring-offset-2 focus-visible:ring-offset-black',
          {
            // Primary variant: Premium dark button with glowing text, borders, and hover expansion
            'bg-white text-black hover:bg-zinc-100 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.15)]':
              variant === 'primary',
            // Secondary variant: Glassmorphism with hover glow
            'glass text-zinc-300 hover:text-white hover:bg-white/[0.05] hover:border-white/[0.2] hover:scale-[1.02] active:scale-[0.98]':
              variant === 'secondary',
            // Tertiary variant: Subtle text-only button
            'text-zinc-400 hover:text-white hover:translate-x-0.5':
              variant === 'tertiary',
          },
          className
        )}
        {...props}
      >
        {/* Glow background for primary variant */}
        {variant === 'primary' && glow && (
          <span className="absolute -inset-px rounded-xl bg-gradient-to-r from-forsythia via-deep-saffron to-nocturnal-expedition opacity-20 blur-sm group-hover:opacity-40 transition-opacity" />
        )}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
