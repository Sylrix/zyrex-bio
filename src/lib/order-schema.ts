import { z } from 'zod'

import { paymentMethodIds } from '@/lib/payment-methods'

/**
 * Shape of a submitted order.
 *
 * Every constraint carries its own message. Without one, Zod emits its
 * internal wording ("Too big: expected string to have <=60 characters") and
 * that string ends up rendered directly under a customer's input.
 */

const AU_POSTCODE = /^\d{4}$/
const PHONE_CHARS = /^[\d\s+()./-]+$/

export const AU_STATES = [
  { code: 'ACT', name: 'Australian Capital Territory' },
  { code: 'NSW', name: 'New South Wales' },
  { code: 'NT', name: 'Northern Territory' },
  { code: 'QLD', name: 'Queensland' },
  { code: 'SA', name: 'South Australia' },
  { code: 'TAS', name: 'Tasmania' },
  { code: 'VIC', name: 'Victoria' },
  { code: 'WA', name: 'Western Australia' },
] as const

const AU_STATE_CODES = AU_STATES.map((state) => state.code) as [
  string,
  ...string[],
]

export const orderSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'Please enter your first name.')
    .max(60, 'Please keep your first name under 60 characters.'),
  lastName: z
    .string()
    .trim()
    .min(1, 'Please enter your last name.')
    .max(60, 'Please keep your last name under 60 characters.'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email address.')
    .email('Please enter a valid email address.')
    .max(160, 'Please enter a shorter email address.'),
  phone: z
    .string()
    .trim()
    .min(8, 'Please enter a contact number the courier can use.')
    .max(24, 'Please enter a shorter phone number.')
    .regex(PHONE_CHARS, 'Please enter a valid phone number.'),
  organisation: z
    .string()
    .trim()
    .max(120, 'Please keep this under 120 characters.')
    .optional()
    .or(z.literal('')),
  addressLine1: z
    .string()
    .trim()
    .min(1, 'Please enter your street address.')
    .max(160, 'Please keep this line under 160 characters.'),
  addressLine2: z
    .string()
    .trim()
    .max(160, 'Please keep this line under 160 characters.')
    .optional()
    .or(z.literal('')),
  city: z
    .string()
    .trim()
    .min(1, 'Please enter your suburb or city.')
    .max(80, 'Please keep this under 80 characters.'),
  state: z.enum(AU_STATE_CODES, { message: 'Please choose your state.' }),
  postcode: z
    .string()
    .trim()
    .regex(AU_POSTCODE, 'Please enter a valid 4-digit Australian postcode.'),
  notes: z
    .string()
    .trim()
    .max(1000, 'Please keep delivery notes under 1000 characters.')
    .optional()
    .or(z.literal('')),
  /** A preference only — no card details are collected on this site. */
  paymentPreference: z.enum(paymentMethodIds, {
    message: 'Please choose how you would like to pay.',
  }),
  /** Research-use declaration. Non-negotiable, hence `literal(true)`. */
  researchDeclaration: z.literal(true, {
    message:
      'Please confirm the order is for laboratory research use before continuing.',
  }),
  agreeToTerms: z.literal(true, {
    message: 'Please confirm you have read the terms before placing the order.',
  }),
})

export type OrderInput = z.infer<typeof orderSchema>
export type OrderFieldErrors = Partial<Record<keyof OrderInput, string>>

/** Flatten Zod issues into one message per field, first issue wins. */
export function fieldErrorsFrom(error: z.ZodError): OrderFieldErrors {
  const errors: OrderFieldErrors = {}

  for (const issue of error.issues) {
    const key = issue.path[0]
    if (typeof key !== 'string') continue
    if (errors[key as keyof OrderInput]) continue
    errors[key as keyof OrderInput] = issue.message
  }

  return errors
}
