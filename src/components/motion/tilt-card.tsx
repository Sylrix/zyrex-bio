'use client'

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react'
import { useRef, type ReactNode } from 'react'

interface TiltCardProps {
  readonly children: ReactNode
  readonly className?: string
  /** Maximum tilt in degrees at the card's corner. */
  readonly max?: number
  readonly glare?: boolean
}

/**
 * 3D tilt on hover, with an optional light sweep that tracks the cursor.
 *
 * The rotation is applied to the card while `transform-style: preserve-3d` and
 * a perspective live on the wrapper, putting perspective on the card itself
 * flattens the effect to a skew.
 */
export function TiltCard({
  children,
  className,
  max = 9,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 })
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.55), transparent 55%)`

  if (reduced) return <div className={className}>{children}</div>

  return (
    <div style={{ perspective: 1100 }}>
      <motion.div
        ref={ref}
        className={className}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onPointerMove={(event) => {
          if (event.pointerType !== 'mouse') return
          const box = ref.current?.getBoundingClientRect()
          if (!box) return

          const px = (event.clientX - box.left) / box.width
          const py = (event.clientY - box.top) / box.height

          rotateY.set((px - 0.5) * max * 2)
          rotateX.set((0.5 - py) * max * 2)
          glareX.set(px * 100)
          glareY.set(py * 100)
        }}
        onPointerLeave={() => {
          rotateX.set(0)
          rotateY.set(0)
        }}
      >
        {children}
        {glare ? (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 hover:opacity-100"
            style={{ background: glareBackground }}
          />
        ) : null}
      </motion.div>
    </div>
  )
}
