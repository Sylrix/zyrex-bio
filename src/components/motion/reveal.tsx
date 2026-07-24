'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale'

interface RevealProps {
  readonly children: ReactNode
  readonly delay?: number
  readonly direction?: Direction
  readonly className?: string
  /** How far past the viewport edge before it fires. */
  readonly amount?: number
}

const OFFSETS: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 32 },
  right: { x: -32 },
  scale: { scale: 0.94 },
}

/**
 * Scroll-in reveal. `once` matters, re-animating on every scroll pass reads
 * as a glitch rather than a flourish, and it thrashes the compositor on long
 * pages. When the OS asks for reduced motion this renders a plain div.
 */
export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  amount = 0.25,
}: RevealProps) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...OFFSETS[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: 0.62,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Same idea, but staggers direct children. Use for grids and lists so cards
 * cascade instead of snapping in as one block.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  delay = 0,
}: {
  readonly children: ReactNode
  readonly className?: string
  readonly stagger?: number
  readonly delay?: number
}) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className,
}: {
  readonly children: ReactNode
  readonly className?: string
}) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 26, scale: 0.97 },
        shown: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
