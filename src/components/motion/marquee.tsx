'use client'

import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface MarqueeProps {
  readonly items: readonly ReactNode[]
  readonly className?: string
  readonly itemClassName?: string
  readonly reverse?: boolean
}

/**
 * Infinite ticker.
 *
 * The item list is rendered twice and the track translates exactly -50%, so
 * the second copy lands pixel-for-pixel where the first started and the loop
 * has no seam. Duplicating fewer times, or translating by anything other than
 * half the track, produces a visible jump every cycle.
 */
export function Marquee({
  items,
  className,
  itemClassName,
  reverse = false,
}: MarqueeProps) {
  const doubled = [...items, ...items]

  return (
    <div
      className={cn('group relative flex overflow-hidden', className)}
      aria-hidden="true"
    >
      <div
        className="flex w-max shrink-0 animate-[var(--animate-marquee)] items-center group-hover:[animation-play-state:paused]"
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {doubled.map((item, index) => (
          <span
            key={index}
            className={cn('flex shrink-0 items-center', itemClassName)}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
