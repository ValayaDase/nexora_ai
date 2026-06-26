import React from 'react';
import { cn } from '@/utils/cn';

export type IconName =
  | 'search'
  | 'x-mark'
  | 'chevron-up-solid'
  | 'chevron-up'
  | 'cog-8-tooth'
  | 'cube-16-solid'
  | 'link-solid'
  | 'link'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'arrow-path'
  | 'arrow-trending-up'
  | 'chart-pie';

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: IconName;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className, ...props }) => {
  return (
    <span
      className={cn('inline-block shrink-0 bg-current', className)}
      style={{
        maskImage: `url(/SVGs/${name}.svg)`,
        WebkitMaskImage: `url(/SVGs/${name}.svg)`,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
      {...props}
    />
  );
};

export default Icon;
