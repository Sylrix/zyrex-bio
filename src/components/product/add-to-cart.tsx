'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Check, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useState } from 'react'

import { useCart } from '@/components/cart/cart-provider'
import { Button, ButtonLink } from '@/components/ui/button'
import { MAX_QTY_PER_LINE } from '@/lib/cart-store'
import type { Product } from '@/lib/products'
import { formatPrice } from '@/lib/utils'

export function AddToCart({ product }: { readonly product: Product }) {
  const { add } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    add(product.slug, qty)
    setAdded(true)
    // Purely a confirmation flourish; the drawer already opened.
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <div
          className="flex items-center gap-1 rounded-full border-2 border-ink bg-white p-1"
          role="group"
          aria-label="Quantity"
        >
          <button
            type="button"
            onClick={() => setQty((value) => Math.max(1, value - 1))}
            disabled={qty <= 1}
            aria-label="Decrease quantity"
            className="rounded-full p-2 transition-colors hover:bg-blue-soft disabled:opacity-40"
          >
            <Minus className="h-4 w-4" strokeWidth={3} />
          </button>
          <span
            aria-live="polite"
            className="min-w-8 text-center font-mono text-lg font-extrabold"
          >
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((value) => Math.min(MAX_QTY_PER_LINE, value + 1))}
            disabled={qty >= MAX_QTY_PER_LINE}
            aria-label="Increase quantity"
            className="rounded-full p-2 transition-colors hover:bg-blue-soft disabled:opacity-40"
          >
            <Plus className="h-4 w-4" strokeWidth={3} />
          </button>
        </div>

        <Button size="lg" onClick={handleAdd} className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span
                key="added"
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <Check className="h-5 w-5" strokeWidth={3} /> Added
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <ShoppingBag className="h-5 w-5" strokeWidth={2.6} />
                Add {qty > 1 ? `${qty} ` : ''}— {formatPrice(product.price * qty)}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>

      <ButtonLink href="/checkout" variant="outline" size="md">
        Go to checkout
      </ButtonLink>

      <p className="text-[0.78rem] leading-relaxed text-slate">
        Maximum {MAX_QTY_PER_LINE} per line online. Need more for a project?
        Email and it can be quoted directly.
      </p>
    </div>
  )
}
