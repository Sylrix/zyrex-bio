'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Plus } from 'lucide-react'

import { useCart } from '@/components/cart/cart-provider'
import { TiltCard } from '@/components/motion/tilt-card'
import type { Product } from '@/lib/products'
import { cn, formatPrice } from '@/lib/utils'

export function ProductCard({
  product,
  priority = false,
}: {
  readonly product: Product
  readonly priority?: boolean
}) {
  const { add } = useCart()
  const perVial = product.price / product.vials

  return (
    <TiltCard
      className="relative flex h-full flex-col overflow-hidden rounded-3xl border-2 border-ink bg-white shadow-[var(--shadow-pop-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-pop)]"
      max={7}
    >
      {product.badge ? (
        <span className="absolute top-4 left-4 z-10 rounded-full border-2 border-ink bg-lime px-3 py-1 font-display text-[0.7rem] font-extrabold tracking-wide uppercase">
          {product.badge}
        </span>
      ) : null}

      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-gradient-to-br from-cyan-soft via-white to-blue-soft"
        aria-label={`View ${product.name}`}
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-8 bottom-6 h-24 rounded-full bg-blue/20 blur-2xl"
        />
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 90vw"
          className="relative object-contain p-6 transition-transform duration-500 ease-out will-change-transform group-hover:scale-105 hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 border-t-2 border-ink p-5">
        <div className="flex flex-wrap items-center gap-1.5">
          <Chip>{product.purity} purity</Chip>
          <Chip>{product.vials} × {product.strength}</Chip>
          <Chip tone="lilac">Research use only</Chip>
        </div>

        <h3 className="font-display text-xl leading-tight font-extrabold">
          <Link href={`/product/${product.slug}`} className="hover:text-blue">
            {product.name}
          </Link>
        </h3>

        <p className="text-sm leading-relaxed text-slate">{product.summary}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-extrabold">
                {formatPrice(product.price)}
              </span>
              {product.compareAt ? (
                <span className="font-mono text-sm text-slate line-through">
                  {formatPrice(product.compareAt)}
                </span>
              ) : null}
            </div>
            <p className="mt-0.5 text-[0.72rem] font-semibold text-slate">
              {formatPrice(perVial)} per vial
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/product/${product.slug}`}
              aria-label={`View details for ${product.name}`}
              className="rounded-full border-2 border-ink bg-paper p-2.5 transition-transform hover:-translate-y-[2px] hover:bg-blue-soft"
            >
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.8} />
            </Link>
            <button
              type="button"
              onClick={() => add(product.slug)}
              aria-label={`Add ${product.name} to cart`}
              className="rounded-full border-2 border-ink bg-blue p-2.5 text-white shadow-[var(--shadow-pop-sm)] transition-transform hover:-translate-y-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <Plus className="h-4 w-4" strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </TiltCard>
  )
}

function Chip({
  children,
  tone = 'blue',
}: {
  readonly children: React.ReactNode
  readonly tone?: 'blue' | 'lilac'
}) {
  return (
    <span
      className={cn(
        'rounded-full px-2.5 py-1 text-[0.68rem] font-bold tracking-wide uppercase',
        tone === 'blue' ? 'bg-blue-soft text-blue-deep' : 'bg-lilac-soft text-ink'
      )}
    >
      {children}
    </span>
  )
}
