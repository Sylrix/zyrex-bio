import type { CartTotals } from '@/lib/cart-store'
import type { OrderInput } from '@/lib/order-schema'
import { paymentMethodLabel } from '@/lib/payment-methods'
import { fullAddress, site } from '@/lib/site'
import { formatPrice } from '@/lib/utils'

/**
 * Order delivery for a site with no server.
 *
 * The storefront is exported as static HTML onto GitHub Pages, so there is no
 * route handler to POST to. Orders go to Web3Forms, which forwards them as
 * email to the address the key is registered against.
 *
 * Two consequences worth being explicit about:
 *  - The access key is public by design. It can only submit to the one inbox
 *    it is bound to, so the worst case is junk email, not data exposure.
 *  - The payload carries no payment credential of any kind.
 *    `paymentPreference` is a word like "card", nothing more. Anything else
 *    would be putting payment credentials through an email relay.
 */

const ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? ''

export interface SubmitResult {
  readonly reference: string
  /** False when no key is configured, the order still needs emailing in. */
  readonly delivered: boolean
  readonly error?: string
}

/**
 * Human-readable, collision-resistant enough for a small storefront:
 * ZB-YYMMDD-XXXX where the suffix is 4 random base-36 characters.
 */
export function orderReference(now = new Date()): string {
  const stamp = [
    String(now.getFullYear()).slice(2),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('')

  const random = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `ZB-${stamp}-${random}`
}

function orderSummaryText(order: OrderInput, totals: CartTotals, reference: string) {
  const lines = totals.lines
    .map(
      (line) =>
        `  • ${line.qty} × ${line.product.name} (${line.product.sku}), ${formatPrice(line.lineTotal)}`
    )
    .join('\n')

  return [
    `New order ${reference}`,
    '',
    'ITEMS',
    lines,
    '',
    `Subtotal: ${formatPrice(totals.subtotal)}`,
    `Shipping: ${totals.shipping === 0 ? 'Free' : formatPrice(totals.shipping)}`,
    `Total due: ${formatPrice(totals.total)} ${site.currency}`,
    '',
    'CUSTOMER',
    `  ${order.firstName} ${order.lastName}`,
    `  ${order.email}`,
    `  ${order.phone}`,
    order.organisation ? `  ${order.organisation}` : '',
    '',
    'DELIVER TO',
    `  ${order.addressLine1}`,
    order.addressLine2 ? `  ${order.addressLine2}` : '',
    `  ${order.city} ${order.state} ${order.postcode}`,
    '  Australia',
    '',
    `Payment preference: ${paymentMethodLabel(order.paymentPreference)}`,
    `Laboratory use declaration accepted: yes`,
    `Terms accepted: yes`,
    order.notes ? `\nNotes: ${order.notes}` : '',
    '',
    `Dispatch from: ${fullAddress}`,
    '',
    'No payment has been taken. Send an invoice with a secure payment link for',
    'the preference above.',
  ]
    .filter((row) => row !== '')
    .join('\n')
}

export async function submitOrder(
  order: OrderInput,
  totals: CartTotals
): Promise<SubmitResult> {
  const reference = orderReference()

  if (!ACCESS_KEY) {
    return {
      reference,
      delivered: false,
      error:
        'Order delivery is not configured yet. Please email the reference above and nothing will be lost.',
    }
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: `Zyrex order ${reference}, ${formatPrice(totals.total)}`,
        from_name: `${site.name} storefront`,
        replyto: order.email,
        reference,
        name: `${order.firstName} ${order.lastName}`,
        email: order.email,
        message: orderSummaryText(order, totals, reference),
      }),
    })

    if (!response.ok) {
      return {
        reference,
        delivered: false,
        error:
          'Your order could not be sent automatically. Please email the reference above so it can be picked up manually.',
      }
    }

    return { reference, delivered: true }
  } catch {
    return {
      reference,
      delivered: false,
      error:
        'Your order could not be sent, the connection failed. Please email the reference above and it will be processed.',
    }
  }
}
