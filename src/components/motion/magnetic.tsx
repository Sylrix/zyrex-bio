'use client'

import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useRef, type ReactNode } from 'react'

interface MagneticProps {
  readonly children: ReactNode
  readonly className?: string
  /** Fraction of the cursor offset the element follows. */
  readonly strength?: number
}

/**
 * Pulls its child a little toward the cursor and springs back on leave.
 *
 * Pointer-only: on touch there is no hover, and the transform would stick at
 * wherever the finger lifted. `useSpring` rather than a raw motion value so
 * the return trip settles instead of snapping.
 */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 240, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 240, damping: 18, mass: 0.4 })

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={(event) => {
        if (event.pointerType !== 'mouse') return
        const box = ref.current?.getBoundingClientRect()
        if (!box) return
        x.set((event.clientX - (box.left + box.width / 2)) * strength)
        y.set((event.clientY - (box.top + box.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
