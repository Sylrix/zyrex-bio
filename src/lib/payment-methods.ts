/**
 * How a customer would *like* to settle up.
 *
 * This is a preference, not a charge. No card number, expiry, CVC or bank
 * login is collected anywhere on this site — the order is recorded, then an
 * invoice with a secure link for the chosen method is emailed back. Keeping
 * card data off the site entirely is the whole point: there is no server here
 * to protect it with.
 */

export const paymentMethods = [
  {
    id: 'card',
    label: 'Card',
    blurb:
      'Visa, Mastercard or American Express. A secure payment link is emailed to you — the card is entered on the payment provider’s page, never here.',
    marks: ['visa', 'mastercard', 'amex'],
  },
  {
    id: 'bank-transfer',
    label: 'Bank transfer / PayID',
    blurb:
      'Australian bank transfer or PayID. Account details and a reference number come with your invoice, and the order is packed once it clears.',
    marks: ['bank', 'payid'],
  },
  {
    id: 'apple-pay',
    label: 'Apple Pay',
    blurb:
      'Settle from your iPhone or Mac. The invoice link opens an Apple Pay sheet — nothing is stored on this site.',
    marks: ['apple-pay'],
  },
  {
    id: 'google-pay',
    label: 'Google Pay',
    blurb:
      'Settle from Android or Chrome. The invoice link opens Google Pay — nothing is stored on this site.',
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
