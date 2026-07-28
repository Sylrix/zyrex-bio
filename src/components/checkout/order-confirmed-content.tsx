'use client'

import { motion } from 'motion/react'
import { AlertTriangle, Check, Copy, Mail } from 'lucide-react'
import { useMemo, useState, useSyncExternalStore } from 'react'

import { ButtonLink } from '@/components/ui/button'
import {
  getConfirmationServerSnapshot,
  getConfirmationSnapshot,
  parseConfirmation,
  subscribeToConfirmation,
} from '@/lib/confirmation'
import { paymentMethodLabel } from '@/lib/payment-methods'
import { site } from '@/lib/site'
import { formatPrice } from '@/lib/utils'

export function OrderConfirmedContent() {
  const [copied, setCopied] = useState(false)

  // sessionStorage is an external store, and it does not exist while this page
  // is prerendered, hence the separate server snapshot.
  const raw = useSyncExternalStore(
    subscribeToConfirmation,
    getConfirmationSnapshot,
    getConfirmationServerSnapshot
  )
  const loaded = useSyncExternalStore(
    subscribeToConfirmation,
    () => true,
    () => false
  )

  const order = useMemo(() => parseConfirmation(raw), [raw])

  if (!loaded) {
    return <div className="h-64 animate-pulse rounded-3xl border-2 border-line bg-white" />
  }

  if (!order) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-5 rounded-3xl border-2 border-ink bg-white p-10 text-center">
        <h2 className="font-display text-2xl font-extrabold">
          No recent order on this device
        </h2>
        <p className="text-sm leading-relaxed text-slate">
          Confirmation details are only held for the current browser session. If
          you have already ordered, the email is on its way, otherwise start a
          new order below.
        </p>
        <ButtonLink href="/shop" size="lg">
          Browse Zyrex 500mg
        </ButtonLink>
      </div>
    )
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-ink bg-lime"
      >
        <Check className="h-9 w-9" strokeWidth={3.4} />
      </motion.div>

      <div className="text-center">
        <h2 className="font-display text-[clamp(1.9rem,4.5vw,2.8rem)] font-extrabold">
          Order received
        </h2>
        <p className="mt-3 text-[1rem] leading-relaxed text-slate">
          Nothing has been charged yet. An invoice with a secure payment link
          for <strong className="text-ink">{paymentMethodLabel(order.paymentPreference)}</strong>{' '}
          is emailed to <strong className="text-ink">{order.email}</strong>{' '}
          within {site.contact.responseWindow}.
        </p>
      </div>

      <div className="rounded-3xl border-2 border-ink bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[0.75rem] font-bold tracking-wide text-slate uppercase">
              Your reference
            </p>
            <p className="font-mono text-2xl font-extrabold">{order.reference}</p>
          </div>

          <button
            type="button"
            onClick={() => {
              void navigator.clipboard?.writeText(order.reference)
              setCopied(true)
              window.setTimeout(() => setCopied(false), 1600)
            }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-4 py-2 text-[0.8rem] font-bold transition-transform hover:-translate-y-[2px]"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" strokeWidth={3} /> Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" strokeWidth={2.6} /> Copy
              </>
            )}
          </button>
        </div>

        <dl className="mt-5 flex flex-col gap-2.5 border-t-2 border-line pt-5 text-[0.9rem]">
          <div className="flex justify-between">
            <dt className="text-slate">Total due</dt>
            <dd className="font-mono font-bold">{formatPrice(order.total)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate">Paying by</dt>
            <dd className="font-bold">
              {paymentMethodLabel(order.paymentPreference)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate">Dispatch</dt>
            <dd className="font-bold">
              {site.shipping.dispatchWindow} after payment clears
            </dd>
          </div>
        </dl>
      </div>

      {!order.delivered ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-3xl border-2 border-coral bg-coral/10 p-5"
        >
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2.6} />
          <div className="text-[0.86rem] leading-relaxed">
            <p className="font-bold">Please send this reference through</p>
            <p className="mt-1">
              {order.error ??
                'The order could not be delivered automatically.'}{' '}
              Email{' '}
              <a
                href={`mailto:${site.contact.email}?subject=Order%20${order.reference}`}
                className="font-semibold underline underline-offset-4"
              >
                {site.contact.email}
              </a>{' '}
              quoting <strong>{order.reference}</strong> and it will be picked up
              straight away.
            </p>
          </div>
        </div>
      ) : null}

      <div className="rounded-3xl border-2 border-line bg-paper-2 p-6">
        <h3 className="flex items-center gap-2 font-display text-base font-extrabold">
          <Mail className="h-4.5 w-4.5 text-blue" strokeWidth={2.5} />
          What happens next
        </h3>
        <ol className="mt-3 flex flex-col gap-2 text-[0.88rem] leading-relaxed text-slate">
          <li>1. Your order is checked and an invoice is emailed to you.</li>
          <li>2. You settle it using the secure link for your chosen method.</li>
          <li>
            3. Vials are packed within {site.shipping.dispatchWindow} and sent
            tracked with {site.shipping.carrier}.
          </li>
          <li>4. The tracking number lands in the same inbox.</li>
        </ol>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink href="/shop" size="lg">
          Keep shopping
        </ButtonLink>
        <ButtonLink href="/contact" variant="outline" size="lg">
          Contact
        </ButtonLink>
      </div>
    </div>
  )
}
