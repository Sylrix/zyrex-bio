'use client'

import { Check, ShieldOff } from 'lucide-react'

import { FieldError } from '@/components/checkout/fields'
import { PaymentMarks } from '@/components/payment/payment-marks'
import { paymentMethods, type PaymentMethodId } from '@/lib/payment-methods'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

/**
 * Step 2 — a preference, never a payment.
 *
 * There is deliberately no card number, expiry or CVC field anywhere in this
 * form, and the notice above the group says so in the plainest words
 * available. The marks are shown so a customer can confirm their method is
 * accepted before they commit to the order.
 */
export function PaymentStep({
  value,
  error,
  onSelect,
}: {
  readonly value: PaymentMethodId | ''
  readonly error?: string
  readonly onSelect: (id: PaymentMethodId) => void
}) {
  const groupId = 'paymentPreference'
  const errorId = error ? `${groupId}-error` : undefined

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-3 rounded-2xl border-2 border-ink bg-lime/40 px-5 py-4">
        <ShieldOff className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2.4} aria-hidden="true" />
        <p className="text-[0.86rem] leading-relaxed font-medium">
          <span className="font-extrabold">
            No card details are taken on this site.
          </span>{' '}
          There is no card number, expiry or CVC field anywhere in this form.
          Pick how you would rather settle up and an invoice with a secure link
          for that method is emailed within {site.contact.responseWindow}.
        </p>
      </div>

      <div
        role="radiogroup"
        aria-label="How you would like to pay"
        aria-describedby={errorId}
        className="grid gap-4 sm:grid-cols-2"
      >
        {paymentMethods.map((method, index) => {
          const selected = value === method.id

          return (
            <label
              key={method.id}
              className={cn(
                // `relative` is load-bearing: the radio is visually hidden and
                // absolutely positioned, so without it focus would scroll to
                // whatever positioned ancestor happens to be nearest.
                'relative flex cursor-pointer flex-col gap-4 rounded-2xl border-2 p-5',
                'transition-[background-color,border-color,transform,box-shadow] duration-200',
                'hover:-translate-y-[2px] focus-within:outline-3 focus-within:outline-offset-3 focus-within:outline-blue',
                selected
                  ? 'border-ink bg-blue-soft shadow-[var(--shadow-pop-sm)]'
                  : 'border-line bg-white hover:border-ink'
              )}
            >
              <span className="flex gap-3">
                <input
                  id={index === 0 ? groupId : `${groupId}-${method.id}`}
                  type="radio"
                  name={groupId}
                  value={method.id}
                  checked={selected}
                  onChange={() => onSelect(method.id)}
                  className="visually-hidden"
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-ink',
                    selected ? 'bg-ink' : 'bg-white'
                  )}
                >
                  {selected ? <Check className="h-3 w-3 text-white" strokeWidth={4} /> : null}
                </span>
                <span className="flex flex-col gap-1.5">
                  <span className="font-display text-[1.05rem] leading-tight font-extrabold">
                    {method.label}
                  </span>
                  <span className="text-[0.82rem] leading-relaxed text-slate">
                    {method.blurb}
                  </span>
                </span>
              </span>

              <PaymentMarks ids={method.marks} className="pl-8" />
            </label>
          )
        })}
      </div>

      {error && errorId ? <FieldError id={errorId} message={error} /> : null}
    </div>
  )
}
