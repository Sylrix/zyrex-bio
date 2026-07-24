'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react'

import { MAX_QTY_PER_LINE, parseCart, priceCart, type CartTotals } from '@/lib/cart-store'
import {
  getCartServerSnapshot,
  getCartSnapshot,
  subscribeToCart,
  updateCart,
  writeCart,
} from '@/lib/cart-storage'

interface CartContextValue extends CartTotals {
  /** False during prerender and the first paint, so the badge never flashes. */
  readonly hydrated: boolean
  readonly drawerOpen: boolean
  readonly add: (slug: string, qty?: number) => void
  readonly setQty: (slug: string, qty: number) => void
  readonly remove: (slug: string) => void
  readonly clear: () => void
  readonly openDrawer: () => void
  readonly closeDrawer: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { readonly children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  // The cart lives in localStorage, shared across tabs — an external store,
  // not React state that happens to be persisted.
  const serialised = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    getCartServerSnapshot
  )
  const hydrated = useSyncExternalStore(
    subscribeToCart,
    () => true,
    () => false
  )

  const lines = useMemo(() => parseCart(serialised), [serialised])

  const add = useCallback((slug: string, qty = 1) => {
    updateCart((current) => {
      const index = current.findIndex((line) => line.slug === slug)
      if (index === -1) {
        return [...current, { slug, qty: Math.min(qty, MAX_QTY_PER_LINE) }]
      }

      const next = [...current]
      next[index] = {
        slug,
        qty: Math.min(next[index].qty + qty, MAX_QTY_PER_LINE),
      }
      return next
    })
    setDrawerOpen(true)
  }, [])

  const setQty = useCallback((slug: string, qty: number) => {
    updateCart((current) => {
      if (qty <= 0) return current.filter((line) => line.slug !== slug)
      return current.map((line) =>
        line.slug === slug ? { slug, qty: Math.min(qty, MAX_QTY_PER_LINE) } : line
      )
    })
  }, [])

  const remove = useCallback((slug: string) => {
    updateCart((current) => current.filter((line) => line.slug !== slug))
  }, [])

  const clear = useCallback(() => writeCart([]), [])

  const totals = useMemo(() => priceCart(lines), [lines])

  const value = useMemo<CartContextValue>(
    () => ({
      ...totals,
      hydrated,
      drawerOpen,
      add,
      setQty,
      remove,
      clear,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
    }),
    [totals, hydrated, drawerOpen, add, setQty, remove, clear]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside <CartProvider>.')
  }
  return context
}
