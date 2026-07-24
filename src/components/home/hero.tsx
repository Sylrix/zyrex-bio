'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { ShieldCheck, Sparkles, Truck } from 'lucide-react'
import { useRef } from 'react'

import { BlobField } from '@/components/motion/blob-field'
import { Magnetic } from '@/components/motion/magnetic'
import { ButtonLink } from '@/components/ui/button'
import { products } from '@/lib/products'
import { RUO_SHORT, site } from '@/lib/site'
import { formatPrice } from '@/lib/utils'

const WORDS = ['NAD+', 'purity', 'research'] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Vial drifts up slower than the page — cheap depth, no extra library.
  const vialY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -70])
  const vialRotate = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 8])

  const cheapest = products.reduce((min, product) =>
    product.price < min.price ? product : min
  )

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-paper via-paper-2 to-paper pt-10 pb-20 sm:pt-16 lg:pt-20"
    >
      <BlobField />
      <div className="grain absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        <div className="flex flex-col items-start gap-6">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-4 py-1.5 text-[0.78rem] font-bold"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-[var(--animate-pulse-ring)] rounded-full bg-lime" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-deep" />
            </span>
            Shipping now from {site.address.city}, {site.address.state}
          </motion.span>

          <h1 className="font-display text-[clamp(2.7rem,7.5vw,4.9rem)] font-extrabold">
            <motion.span
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              Lab-grade
            </motion.span>

            <span className="block">
              {WORDS.map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 30, rotate: -3 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + index * 0.09,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mr-3 inline-block text-gradient"
                >
                  {word}
                </motion.span>
              ))}
            </span>

            <motion.span
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              in one vial.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="max-w-xl text-[1.05rem] leading-relaxed text-slate"
          >
            NAD+ 500mg, lyophilised, sealed and batch-tested at 99% purity or
            better — packed by hand and posted Australia-wide. Supplied strictly
            as a research material. {RUO_SHORT}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <ButtonLink href="/shop" size="lg">
                Shop NAD+ — from {formatPrice(cheapest.price)}
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="/research-use" size="lg" variant="outline">
              Read the research-use policy
            </ButtonLink>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="mt-2 flex flex-wrap gap-x-6 gap-y-3 text-[0.85rem] font-semibold"
          >
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4.5 w-4.5 text-blue" strokeWidth={2.6} />
              99% purity, batch tested
            </li>
            <li className="flex items-center gap-2">
              <Truck className="h-4.5 w-4.5 text-blue" strokeWidth={2.6} />
              Free over {formatPrice(site.shipping.freeThreshold)}
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-blue" strokeWidth={2.6} />
              Packed in {site.shipping.dispatchWindow}
            </li>
          </motion.ul>
        </div>

        <motion.div
          style={{ y: vialY, rotate: vialRotate }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-lg"
        >
          <span
            aria-hidden="true"
            className="absolute inset-6 animate-[var(--animate-spin-slow)] rounded-full border-2 border-dashed border-blue/30"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan/40 to-lilac/40 blur-3xl"
          />

          <div className="relative aspect-square animate-[var(--animate-bob)]">
            <Image
              src="/products/nad-plus-500mg.webp"
              alt="Zyrex Bio NAD+ 500mg research vial with teal seal"
              fill
              priority
              sizes="(min-width: 1024px) 32rem, 90vw"
              className="object-contain drop-shadow-[0_28px_45px_rgba(11,92,255,0.28)]"
            />
          </div>

          <FloatingTag className="top-6 -left-2 sm:left-2" delay={0.7}>
            99% purity
          </FloatingTag>
          <FloatingTag className="right-0 bottom-24 sm:right-4" delay={0.85}>
            500mg per vial
          </FloatingTag>
          <FloatingTag className="bottom-4 left-6" delay={1}>
            Research use only
          </FloatingTag>
        </motion.div>
      </div>
    </section>
  )
}

function FloatingTag({
  children,
  className,
  delay,
}: {
  readonly children: React.ReactNode
  readonly className?: string
  readonly delay: number
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 260, damping: 18 }}
      className={`absolute rounded-full border-2 border-ink bg-white px-3.5 py-1.5 font-display text-[0.75rem] font-extrabold shadow-[var(--shadow-pop-sm)] ${className ?? ''}`}
    >
      {children}
    </motion.span>
  )
}
