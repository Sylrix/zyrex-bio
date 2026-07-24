import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const AUD = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  minimumFractionDigits: 2,
})

export function formatPrice(amount: number): string {
  return AUD.format(amount)
}

/** Feed and JSON-LD want a bare "129.00", never "$129.00". */
export function priceValue(amount: number): string {
  return amount.toFixed(2)
}
