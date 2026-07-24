import { getProductBySlug, type Product } from '@/lib/products'
import { site } from '@/lib/site'

export const MAX_QTY_PER_LINE = 10
export const CART_STORAGE_KEY = 'zyrexbio.cart.v1'

export interface CartLine {
  readonly slug: string
  readonly qty: number
}

export interface PricedLine extends CartLine {
  readonly product: Product
  readonly lineTotal: number
}

export interface CartTotals {
  readonly lines: readonly PricedLine[]
  readonly itemCount: number
  readonly subtotal: number
  readonly shipping: number
  readonly total: number
  readonly freeShippingGap: number
}

/**
 * Parse whatever localStorage handed back.
 *
 * Anything unrecognised is dropped rather than trusted: a stale slug from an
 * old catalogue would otherwise price as NaN and poison every total on screen.
 */
export function parseCart(raw: string | null): CartLine[] {
  if (!raw) return []

  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    const lines: CartLine[] = []
    for (const entry of parsed) {
      if (typeof entry !== 'object' || entry === null) continue
      const { slug, qty } = entry as { slug?: unknown; qty?: unknown }
      if (typeof slug !== 'string' || !getProductBySlug(slug)) continue
      if (typeof qty !== 'number' || !Number.isFinite(qty)) continue

      const clamped = Math.min(Math.max(Math.trunc(qty), 1), MAX_QTY_PER_LINE)
      const existing = lines.findIndex((line) => line.slug === slug)
      if (existing >= 0) {
        lines[existing] = {
          slug,
          qty: Math.min(lines[existing].qty + clamped, MAX_QTY_PER_LINE),
        }
      } else {
        lines.push({ slug, qty: clamped })
      }
    }

    return lines
  } catch {
    return []
  }
}

export function priceCart(lines: readonly CartLine[]): CartTotals {
  const priced: PricedLine[] = []

  for (const line of lines) {
    const product = getProductBySlug(line.slug)
    if (!product) continue
    priced.push({ ...line, product, lineTotal: product.price * line.qty })
  }

  const subtotal = priced.reduce((sum, line) => sum + line.lineTotal, 0)
  const itemCount = priced.reduce((sum, line) => sum + line.qty, 0)

  const qualifies = subtotal >= site.shipping.freeThreshold
  const shipping = subtotal === 0 || qualifies ? 0 : site.shipping.standardFee

  return {
    lines: priced,
    itemCount,
    subtotal,
    shipping,
    total: subtotal + shipping,
    freeShippingGap: Math.max(site.shipping.freeThreshold - subtotal, 0),
  }
}
