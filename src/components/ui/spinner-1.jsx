import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Spinner Component
 * Multi-blade 5-pill orbital spinner with staggered phase delays.
 * Features dynamic sizing, color / invert options, and crisp GPU-accelerated rotation.
 */
export function Spinner({ size = 16, invert, disabled, className, color, ...props }) {
  if (disabled) return null;

  const sizePx = `${size}px`;
  const barWidth = `${(size * 0.2).toFixed(2)}px`;
  const barHeight = `${(size * 0.075).toFixed(2)}px`;

  return (
    <div
      className={cn('relative inline-flex items-center justify-center shrink-0', className)}
      style={{ width: sizePx, height: sizePx }}
      {...props}
    >
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 flex animate-spin justify-center"
          style={{
            animationDelay: `${i * 100}ms`,
          }}
        >
          <div
            style={{
              backgroundColor: color || (invert ? 'var(--background, #ffffff)' : 'var(--foreground, currentColor)'),
              width: barWidth,
              height: barHeight,
              borderRadius: '9999px',
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default Spinner;
