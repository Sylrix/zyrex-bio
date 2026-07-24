/**
 * How a customer would like to settle up.
 *
 * The order is recorded first, then an invoice with a secure link for the
 * chosen method is emailed back and payment is completed on the provider's own
 * hosted page.
 *
 * Copy rule for this file: describe how payment is completed, never what the
 * form does not ask for. Listing absent fields draws attention to the
 * mechanism instead of the product.
 */

export const paymentMethods = [
  {
    id: 'card',
    label: 'Card',
    blurb:
      'Visa, Mastercard or American Express. A secure payment link is emailed to you and the card is entered on the payment provider’s own page.',
    marks: ['visa', 'mastercard', 'amex'],
  },
  {
    id: 'bank-transfer',
    label: 'Bank transfer or PayID',
    blurb:
      'Australian bank transfer or PayID. Account details and a reference number come with your invoice, and the order is packed once it clears.',
    marks: ['bank', 'payid'],
  },
  {
    id: 'apple-pay',
    label: 'Apple Pay',
    blurb:
      'Settle from your iPhone or Mac. The invoice link opens an Apple Pay sheet on the payment provider’s page.',
    marks: ['apple-pay'],
  },
  {
    id: 'google-pay',
    label: 'Google Pay',
    blurb:
      'Settle from Android or Chrome. The invoice link opens Google Pay on the payment provider’s page.',
    marks: ['google-pay'],
  },
] as const

export type PaymentMethodId = (typeof paymentMethods)[number]['id']

export const paymentMethodIds = paymentMethods.map((method) => method.id) as [
  PaymentMethodId,
  ...PaymentMethodId[],
]

export function paymentMethodLabel(id: PaymentMethodId): string {
  return paymentMethods.find((method) => method.id === id)?.label ?? id
}
