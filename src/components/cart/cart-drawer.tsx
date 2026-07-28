'use client'

import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useEffect } from 'react'

import { useCart } from '@/components/cart/cart-provider'
import { ButtonLink } from '@/components/ui/button'
import { RUO_SHORT, site } from '@/lib/site'
import { formatPrice } from '@/lib/utils'

/**
 * Slide-over cart.
 *
 * Body scroll is locked while open, without it, scrolling inside the panel
 * chains to the page underneath on iOS and the drawer appears to drift.
 */
export function CartDrawer() {
  const { drawerOpen, closeDrawer, lines, subtotal, itemCount, setQty, remove, freeShippingGap } =
    useCart()

  useEffect(() => {
    if (!drawerOpen) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') closeDrawer()
    }

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [drawerOpen, closeDrawer])

  return (
    <AnimatePresence>
      {drawerOpen ? (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeDrawer}
            className="absolute inset-0 bg-ink/35 backdrop-blur-[3px]"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Your cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l-2 border-ink bg-paper"
          >
            <header className="flex items-center justify-between border-b-2 border-ink px-6 py-5">
              <h2 className="flex items-center gap-2 font-display text-xl font-extrabold">
                <ShoppingBag className="h-5 w-5 text-blue" strokeWidth={2.6} />
                Your cart
                <span className="rounded-full bg-lime px-2.5 py-0.5 text-[0.7rem] font-bold text-ink">
                  {itemCount}
                </span>
              </h2>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close cart"
                className="rounded-full border-2 border-ink p-1.5 transition-transform hover:rotate-90"
              >
                <X className="h-4 w-4" strokeWidth={2.8} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-soft">
                    <ShoppingBag className="h-7 w-7 text-blue" strokeWidth={2.4} />
                  </span>
                  <p className="font-display text-lg font-extrabold">Nothing here yet</p>
                  <p className="max-w-[24ch] text-sm text-slate">
                    Add a Zyrex 500mg vial or kit and it will show up right here.
                  </p>
                  <ButtonLink href="/shop" size="sm" onClick={closeDrawer}>
                    Browse the range
                  </ButtonLink>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  {lines.map((line) => (
                    <li
                      key={line.slug}
                      className="flex gap-4 rounded-2xl border-2 border-line bg-white p-3 transition-colors hover:border-ink"
                    >
                      <Link
                        href={`/product/${line.slug}`}
                        onClick={closeDrawer}
                        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-paper-2"
                      >
                        <Image
                          src={line.product.image}
                          alt={line.product.imageAlt}
                          fill
                          sizes="80px"
                          className="object-contain p-1"
                        />
                      </Link>

                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <Link
                          href={`/product/${line.slug}`}
                          onClick={closeDrawer}
                          className="font-display text-[0.95rem] leading-tight font-extrabold hover:text-blue"
                        >
                          {line.product.name}
                        </Link>

                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1 rounded-full border-2 border-ink">
                            <button
                              type="button"
                              aria-label={`Decrease quantity of ${line.product.name}`}
                              onClick={() => setQty(line.slug, line.qty - 1)}
                              className="rounded-full p-1.5 hover:bg-blue-soft"
                            >
                              <Minus className="h-3 w-3" strokeWidth={3} />
                            </button>
                            <span className="min-w-5 text-center font-mono text-sm font-bold">
                              {line.qty}
                            </span>
                            <button
                              type="button"
                              aria-label={`Increase quantity of ${line.product.name}`}
                              onClick={() => setQty(line.slug, line.qty + 1)}
                              className="rounded-full p-1.5 hover:bg-blue-soft"
                            >
                              <Plus className="h-3 w-3" strokeWidth={3} />
                            </button>
                          </div>

                          <span className="font-mono text-sm font-bold">
                            {formatPrice(line.lineTotal)}
                          </span>

                          <button
                            type="button"
                            aria-label={`Remove ${line.product.name}`}
                            onClick={() => remove(line.slug)}
                            className="rounded-full p-1.5 text-slate transition-colors hover:bg-coral/20 hover:text-coral"
                          >
                            <Trash2 className="h-4 w-4" strokeWidth={2.4} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 ? (
              <footer className="border-t-2 border-ink bg-paper-2 px-6 py-5">
                {freeShippingGap > 0 ? (
                  <p className="mb-3 rounded-full bg-lime/50 px-3 py-1.5 text-center text-[0.78rem] font-semibold">
                    {formatPrice(freeShippingGap)} away from free shipping
                  </p>
                ) : (
                  <p className="mb-3 rounded-full bg-lime px-3 py-1.5 text-center text-[0.78rem] font-bold">
                    Free shipping unlocked
                  </p>
                )}

                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate">Subtotal</span>
                  <span className="font-mono text-xl font-extrabold">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <ButtonLink
                  href="/checkout"
                  onClick={closeDrawer}
                  className="w-full"
                  size="lg"
                >
                  Checkout
                </ButtonLink>

                <p className="mt-3 text-center text-[0.7rem] leading-relaxed text-slate">
                  {RUO_SHORT} Shipping calculated at checkout · Ships from{' '}
                  {site.address.city}, {site.address.state}.
                </p>
              </footer>
            ) : null}
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
