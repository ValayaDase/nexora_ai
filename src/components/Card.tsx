import React from 'react';
import GlassContainer from './GlassContainer';
import { cn } from '@/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  glow = true,
  interactive = true,
  ...props
}) => {
  return (
    <GlassContainer
      glow={glow}
      interactive={interactive}
      className={cn('p-6 sm:p-8', className)}
      {...props}
    >
      {children}
    </GlassContainer>
  );
};

export default Card;
