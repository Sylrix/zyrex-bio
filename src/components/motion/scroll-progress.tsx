'use client'

import { motion, useScroll, useSpring } from 'motion/react'

/**
 * Thin gradient bar pinned under the header that tracks page scroll.
 * `transformOrigin: 0%` is what makes it grow from the left rather than
 * scaling out from the centre.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-gradient-to-r from-blue via-cyan to-lilac"
    />
  )
}
