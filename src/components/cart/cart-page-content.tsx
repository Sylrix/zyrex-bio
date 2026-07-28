'use client'

import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'

import { useCart } from '@/components/cart/cart-provider'
import { PaymentMarks } from '@/components/payment/payment-marks'
import { ButtonLink } from '@/components/ui/button'
import { RUO_NOTICE, site } from '@/lib/site'
import { formatPrice } from '@/lib/utils'

export function CartPageContent() {
  const { lines, subtotal, shipping, total, itemCount, setQty, remove, hydrated, freeShippingGap } =
    useCart()

  if (!hydrated) {
    return (
      <div className="h-64 animate-pulse rounded-3xl border-2 border-line bg-white" />
    )
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-5 rounded-3xl border-2 border-ink bg-white p-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-soft">
          <ShoppingBag className="h-7 w-7 text-blue" strokeWidth={2.4} />
        </span>
        <h2 className="font-display text-2xl font-extrabold">Your cart is empty</h2>
        <p className="text-sm leading-relaxed text-slate">
          Four pack sizes of Zyrex 500mg are waiting. Add one and it will show up
          here.
        </p>
        <ButtonLink href="/shop" size="lg">
          Browse Zyrex 500mg
        </ButtonLink>
      </div>
    )
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7 xl:col-span-8">
        <ul className="flex flex-col gap-4">
          <AnimatePresence initial={false}>
            {lines.map((line) => (
              <motion.li
                key={line.slug}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.28 }}
                className="flex flex-col gap-4 rounded-3xl border-2 border-line bg-white p-4 transition-colors hover:border-ink sm:flex-row sm:items-center sm:p-5"
              >
                <Link
                  href={`/product/${line.slug}`}
                  className="relative h-28 w-28 shrink-0 self-center overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-soft to-blue-soft"
                >
                  <Image
                    src={line.product.image}
                    alt={line.product.imageAlt}
                    fill
                    sizes="112px"
                    className="object-contain p-2"
                  />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <Link
                    href={`/product/${line.slug}`}
                    className="font-display text-lg leading-tight font-extrabold hover:text-blue"
                  >
                    {line.product.name}
                  </Link>
                  <p className="font-mono text-[0.78rem] text-slate">
                    {line.product.sku} · {line.product.purity} purity
                  </p>
                  <p className="text-[0.8rem] text-slate">
                    {formatPrice(line.product.price)} each
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <div className="flex items-center gap-1 rounded-full border-2 border-ink bg-white p-0.5">
                    <button
                      type="button"
                      onClick={() => setQty(line.slug, line.qty - 1)}
                      aria-label={`Decrease quantity of ${line.product.name}`}
                      className="rounded-full p-2 transition-colors hover:bg-blue-soft"
                    >
                      <Minus className="h-3.5 w-3.5" strokeWidth={3} />
                    </button>
                    <span className="min-w-6 text-center font-mono font-bold">
                      {line.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty(line.slug, line.qty + 1)}
                      aria-label={`Increase quantity of ${line.product.name}`}
                      className="rounded-full p-2 transition-colors hover:bg-blue-soft"
                    >
                      <Plus className="h-3.5 w-3.5" strokeWidth={3} />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-lg font-extrabold">
                      {formatPrice(line.lineTotal)}
                    </span>
                    <button
                      type="button"
                      onClick={() => remove(line.slug)}
                      aria-label={`Remove ${line.product.name}`}
                      className="rounded-full p-2 text-slate transition-colors hover:bg-coral/15 hover:text-coral"
                    >
                      <Trash2 className="h-4 w-4" strokeWidth={2.4} />
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <p className="mt-6 rounded-2xl border-2 border-line bg-paper-2 p-5 text-[0.8rem] leading-relaxed text-slate">
          {RUO_NOTICE}
        </p>
      </div>

      <div className="lg:col-span-5 xl:col-span-4">
        <div className="lg:sticky lg:top-28 rounded-3xl border-2 border-ink bg-white p-6">
          <h2 className="font-display text-lg font-extrabold">
            Summary
            <span className="ml-2 rounded-full bg-lime px-2.5 py-0.5 text-[0.7rem] font-bold">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </span>
          </h2>

          <dl className="mt-5 flex flex-col gap-2.5 text-[0.9rem]">
            <div className="flex justify-between">
              <dt className="text-slate">Subtotal</dt>
              <dd className="font-mono font-bold">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate">Shipping</dt>
              <dd className="font-mono font-bold">
                {shipping === 0 ? 'Free' : formatPrice(shipping)}
              </dd>
            </div>
            {freeShippingGap > 0 ? (
              <p className="rounded-full bg-lime/50 px-3 py-1.5 text-center text-[0.76rem] font-semibold">
                {formatPrice(freeShippingGap)} away from free shipping
              </p>
            ) : null}
            <div className="flex items-baseline justify-between border-t-2 border-line pt-3">
              <dt className="font-display font-extrabold">Total</dt>
              <dd className="font-mono text-2xl font-extrabold">
                {formatPrice(total)}
              </dd>
            </div>
          </dl>

          <ButtonLink href="/checkout" size="lg" className="mt-6 w-full">
            Checkout
          </ButtonLink>

          <ButtonLink href="/shop" variant="ghost" size="sm" className="mt-2 w-full">
            Keep shopping
          </ButtonLink>

          <div className="mt-6 border-t-2 border-line pt-5">
            <p className="text-[0.75rem] font-bold">Ways to settle up</p>
            <PaymentMarks className="mt-2.5" />
            <p className="mt-3 text-[0.72rem] leading-relaxed text-slate">
              Pay by secure link once your invoice arrives. Ships from{' '}
              {site.address.city}, {site.address.state} within{' '}
              {site.shipping.dispatchWindow}.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
