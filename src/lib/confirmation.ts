import type { PaymentMethodId } from '@/lib/payment-methods'

/**
 * The confirmation page is a separate static document, so the order details
 * have to survive a navigation. sessionStorage rather than a query string:
 * an email address and order total do not belong in a URL that ends up in
 * history, referrer headers and analytics.
 */
export const CONFIRMATION_STORAGE_KEY = 'zyrex.lastOrder.v1'

export interface Confirmation {
  readonly reference: string
  readonly delivered: boolean
  readonly error: string | null
  readonly email: string
  readonly total: number
  readonly paymentPreference: PaymentMethodId
}

/**
 * Snapshot source for `useSyncExternalStore`. Returns the raw string so the
 * value is referentially stable between renders; parsing happens behind a
 * `useMemo` in the component.
 */
export function subscribeToConfirmation(): () => void {
  // Written once by the checkout before it navigates here, then never changed
  // while this page is open, there is nothing to listen to.
  return () => {}
}

export function getConfirmationSnapshot(): string | null {
  try {
    return window.sessionStorage.getItem(CONFIRMATION_STORAGE_KEY)
  } catch {
    return null
  }
}

/** No sessionStorage during prerender. */
export function getConfirmationServerSnapshot(): string | null {
  return null
}

export function parseConfirmation(raw: string | null): Confirmation | null {
  try {
    if (!raw) return null

    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return null

    const value = parsed as Partial<Confirmation>
    if (typeof value.reference !== 'string' || typeof value.email !== 'string') {
      return null
    }

    return {
      reference: value.reference,
      delivered: Boolean(value.delivered),
      error: typeof value.error === 'string' ? value.error : null,
      email: value.email,
      total: typeof value.total === 'number' ? value.total : 0,
      paymentPreference: (value.paymentPreference ?? 'card') as PaymentMethodId,
    }
  } catch {
    return null
  }
}
