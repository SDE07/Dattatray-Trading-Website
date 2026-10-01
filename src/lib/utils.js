import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn() — Merge Tailwind CSS classes without conflicts.
 * Industry-standard pattern from shadcn/ui.
 * Combines clsx (conditional classes) + tailwind-merge (smart dedup).
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-emerald-500 text-white', className)
 * cn('text-sm font-bold', { 'text-golden': isGolden, 'opacity-50': disabled })
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default cn;
