'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AlertCircle, ArrowLeft, ArrowRight, Loader2, Lock } from 'lucide-react'
import { useState } from 'react'

import { useCart } from '@/components/cart/cart-provider'
import {
  CheckboxField,
  SelectField,
  TextAreaField,
  TextField,
} from '@/components/checkout/fields'
import { OrderSummary } from '@/components/checkout/order-summary'
import { PaymentStep } from '@/components/checkout/payment-step'
import { Button, ButtonLink } from '@/components/ui/button'
import {
  AU_STATES,
  fieldErrorsFrom,
  orderSchema,
  type OrderFieldErrors,
  type OrderInput,
} from '@/lib/order-schema'
import type { PaymentMethodId } from '@/lib/payment-methods'
import { paymentMethodLabel } from '@/lib/payment-methods'
import { CONFIRMATION_STORAGE_KEY } from '@/lib/confirmation'
import { submitOrder } from '@/lib/submit-order'
import { RUO_NOTICE, site } from '@/lib/site'
import { cn, formatPrice } from '@/lib/utils'

const STEPS = ['Delivery', 'Payment', 'Review'] as const

/** Which fields each step is responsible for, so errors surface on the right screen. */
const STEP_FIELDS: ReadonlyArray<ReadonlyArray<keyof OrderInput>> = [
  [
    'firstName',
    'lastName',
    'email',
    'phone',
    'organisation',
    'addressLine1',
    'addressLine2',
    'city',
    'state',
    'postcode',
    'notes',
  ],
  ['paymentPreference'],
  ['researchDeclaration', 'agreeToTerms'],
]

interface FormValues {
  firstName: string
  lastName: string
  email: string
  phone: string
  organisation: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  postcode: string
  notes: string
  paymentPreference: PaymentMethodId | ''
  researchDeclaration: boolean
  agreeToTerms: boolean
}

const EMPTY: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  organisation: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postcode: '',
  notes: '',
  paymentPreference: '',
  researchDeclaration: false,
  agreeToTerms: false,
}

export function CheckoutForm() {
  const router = useRouter()
  const cart = useCart()
  const [step, setStep] = useState(0)
  const [values, setValues] = useState<FormValues>(EMPTY)
  const [errors, setErrors] = useState<OrderFieldErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }))
    // Clearing on edit rather than re-validating on every keystroke: nobody
    // wants "invalid email" while they are still typing the local part.
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  /**
   * Validate the whole payload, then keep only the issues belonging to the
   * steps the customer has already worked through. Running a partial schema
   * per step would mean maintaining three schemas that can drift apart.
   */
  function errorsUpTo(index: number): OrderFieldErrors {
    const parsed = orderSchema.safeParse(values)
    if (parsed.success) return {}

    const all = fieldErrorsFrom(parsed.error)
    const allowed = new Set(STEP_FIELDS.slice(0, index + 1).flat())

    const filtered: OrderFieldErrors = {}
    for (const [key, message] of Object.entries(all)) {
      if (allowed.has(key as keyof OrderInput) && message) {
        filtered[key as keyof OrderInput] = message
      }
    }
    return filtered
  }

  function goNext() {
    const stepErrors = errorsUpTo(step)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      setFormError('Please fix the highlighted fields before continuing.')
      return
    }

    setErrors({})
    setFormError(null)
    setStep((current) => Math.min(current + 1, STEPS.length - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goBack() {
    setFormError(null)
    setStep((current) => Math.max(current - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit() {
    const parsed = orderSchema.safeParse(values)

    if (!parsed.success) {
      const all = fieldErrorsFrom(parsed.error)
      setErrors(all)
      setFormError('Please fix the highlighted fields before placing the order.')

      // Send them back to the earliest step that still has a problem.
      const firstBadStep = STEP_FIELDS.findIndex((fields) =>
        fields.some((field) => all[field])
      )
      if (firstBadStep >= 0) setStep(firstBadStep)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (cart.lines.length === 0) {
      setFormError('Your cart is empty.')
      return
    }

    setSubmitting(true)
    setFormError(null)

    const result = await submitOrder(parsed.data, cart)

    window.sessionStorage.setItem(
      CONFIRMATION_STORAGE_KEY,
      JSON.stringify({
        reference: result.reference,
        delivered: result.delivered,
        error: result.error ?? null,
        email: parsed.data.email,
        total: cart.total,
        paymentPreference: parsed.data.paymentPreference,
      })
    )

    cart.clear()
    router.push('/order-confirmed')
  }

  if (cart.hydrated && cart.lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-5 rounded-3xl border-2 border-ink bg-white p-10 text-center">
        <h2 className="font-display text-2xl font-extrabold">
          There is nothing to check out
        </h2>
        <p className="text-sm leading-relaxed text-slate">
          Add a NAD+ vial or kit to your cart and this page will fill itself in.
        </p>
        <ButtonLink href="/shop" size="lg">
          Browse NAD+
        </ButtonLink>
      </div>
    )
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7 xl:col-span-8">
        <Stepper current={step} />

        {formError ? (
          <div
            role="alert"
            className="mt-6 flex items-start gap-2.5 rounded-2xl border-2 border-coral bg-coral/10 px-4 py-3 text-[0.86rem] font-semibold"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2.6} />
            {formError}
          </div>
        ) : null}

        <form
          className="mt-6"
          onSubmit={(event) => {
            event.preventDefault()
            if (step === STEPS.length - 1) void handleSubmit()
            else goNext()
          }}
        >
          {/*
            Entrance-only, deliberately. An AnimatePresence exit would look a
            little smoother, but it makes the step visible only once the
            outgoing animation finishes, and in a backgrounded tab
            requestAnimationFrame is paused, so that never happens and the
            customer is stranded on a step they have already completed. A
            keyed div swaps instantly and animates in from wherever it lands.
          */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 0 ? (
              <DeliveryStep values={values} errors={errors} update={update} />
            ) : null}

            {step === 1 ? (
              <PaymentStep
                value={values.paymentPreference}
                error={errors.paymentPreference}
                onSelect={(id) => update('paymentPreference', id)}
              />
            ) : null}

            {step === 2 ? (
              <ReviewStep values={values} errors={errors} update={update} total={cart.total} />
            ) : null}
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {step > 0 ? (
              <Button type="button" variant="outline" onClick={goBack}>
                <ArrowLeft className="h-4 w-4" strokeWidth={2.8} /> Back
              </Button>
            ) : (
              <ButtonLink href="/cart" variant="ghost">
                <ArrowLeft className="h-4 w-4" strokeWidth={2.8} /> Back to cart
              </ButtonLink>
            )}

            {step < STEPS.length - 1 ? (
              <Button type="submit" size="lg" className="flex-1 sm:flex-none">
                Continue <ArrowRight className="h-4 w-4" strokeWidth={3} />
              </Button>
            ) : (
              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="flex-1 sm:flex-none"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={3} />
                    Placing order…
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" strokeWidth={2.8} />
                    Place order, {formatPrice(cart.total)}
                  </>
                )}
              </Button>
            )}
          </div>

          <p className="mt-4 text-[0.75rem] leading-relaxed text-slate">
            Placing the order does not charge you. An invoice with a secure
            payment link for your chosen method is emailed within{' '}
            {site.contact.responseWindow}.
          </p>
        </form>
      </div>

      <div className="lg:col-span-5 xl:col-span-4">
        <OrderSummary />
      </div>
    </div>
  )
}

function Stepper({ current }: { readonly current: number }) {
  return (
    <ol className="flex items-center gap-2">
      {STEPS.map((label, index) => {
        const done = index < current
        const active = index === current

        return (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-ink font-display text-sm font-extrabold transition-colors',
                active ? 'bg-blue text-white' : done ? 'bg-lime' : 'bg-white text-slate'
              )}
              aria-current={active ? 'step' : undefined}
            >
              {index + 1}
            </span>
            <span
              className={cn(
                'hidden text-[0.85rem] font-bold sm:inline',
                active ? 'text-ink' : 'text-slate'
              )}
            >
              {label}
            </span>
            {index < STEPS.length - 1 ? (
              <span className="h-0.5 flex-1 rounded-full bg-line">
                <motion.span
                  className="block h-full rounded-full bg-blue"
                  initial={false}
                  animate={{ width: done ? '100%' : '0%' }}
                  transition={{ duration: 0.4 }}
                />
              </span>
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}

function DeliveryStep({
  values,
  errors,
  update,
}: {
  readonly values: FormValues
  readonly errors: OrderFieldErrors
  readonly update: <K extends keyof FormValues>(key: K, value: FormValues[K]) => void
}) {
  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="font-display text-xl font-extrabold">
        Where is it going?
      </legend>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id="firstName"
          label="First name"
          required
          autoComplete="given-name"
          value={values.firstName}
          error={errors.firstName}
          onChange={(value) => update('firstName', value)}
        />
        <TextField
          id="lastName"
          label="Last name"
          required
          autoComplete="family-name"
          value={values.lastName}
          error={errors.lastName}
          onChange={(value) => update('lastName', value)}
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          inputMode="email"
          required
          autoComplete="email"
          hint="Your invoice and tracking number go here."
          value={values.email}
          error={errors.email}
          onChange={(value) => update('email', value)}
        />
        <TextField
          id="phone"
          label="Phone"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          hint="Used by the courier only."
          value={values.phone}
          error={errors.phone}
          onChange={(value) => update('phone', value)}
        />
      </div>

      <TextField
        id="organisation"
        label="Lab or organisation (optional)"
        autoComplete="organization"
        value={values.organisation}
        error={errors.organisation}
        onChange={(value) => update('organisation', value)}
      />

      <TextField
        id="addressLine1"
        label="Street address"
        required
        autoComplete="address-line1"
        value={values.addressLine1}
        error={errors.addressLine1}
        onChange={(value) => update('addressLine1', value)}
      />
      <TextField
        id="addressLine2"
        label="Unit, floor or building (optional)"
        autoComplete="address-line2"
        value={values.addressLine2}
        error={errors.addressLine2}
        onChange={(value) => update('addressLine2', value)}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <TextField
          id="city"
          label="Suburb / city"
          required
          autoComplete="address-level2"
          value={values.city}
          error={errors.city}
          onChange={(value) => update('city', value)}
        />
        <SelectField
          id="state"
          label="State"
          required
          autoComplete="address-level1"
          placeholder="Choose…"
          options={AU_STATES.map((state) => ({
            value: state.code,
            label: `${state.code}, ${state.name}`,
          }))}
          value={values.state}
          error={errors.state}
          onChange={(value) => update('state', value)}
        />
        <TextField
          id="postcode"
          label="Postcode"
          required
          inputMode="numeric"
          maxLength={4}
          autoComplete="postal-code"
          value={values.postcode}
          error={errors.postcode}
          onChange={(value) => update('postcode', value)}
        />
      </div>

      <TextAreaField
        id="notes"
        label="Delivery notes (optional)"
        placeholder="Safe-drop instructions, building access, anything the courier should know."
        value={values.notes}
        error={errors.notes}
        onChange={(value) => update('notes', value)}
      />

      <p className="text-[0.78rem] leading-relaxed text-slate">
        Orders are accepted for Australian delivery addresses only. Everything
        posts from {site.address.city}, {site.address.state}.
      </p>
    </fieldset>
  )
}

function ReviewStep({
  values,
  errors,
  update,
  total,
}: {
  readonly values: FormValues
  readonly errors: OrderFieldErrors
  readonly update: <K extends keyof FormValues>(key: K, value: FormValues[K]) => void
  readonly total: number
}) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-display text-xl font-extrabold">Check it over</h2>

      <dl className="grid gap-4 rounded-3xl border-2 border-line bg-white p-6 sm:grid-cols-2">
        <Row label="Name" value={`${values.firstName} ${values.lastName}`} />
        <Row label="Email" value={values.email} />
        <Row label="Phone" value={values.phone} />
        {values.organisation ? (
          <Row label="Organisation" value={values.organisation} />
        ) : null}
        <Row
          label="Deliver to"
          value={[
            values.addressLine1,
            values.addressLine2,
            `${values.city} ${values.state} ${values.postcode}`,
            'Australia',
          ]
            .filter(Boolean)
            .join(', ')}
        />
        <Row
          label="Paying by"
          value={
            values.paymentPreference
              ? paymentMethodLabel(values.paymentPreference)
              : ', '
          }
        />
        <Row label="Total due" value={formatPrice(total)} />
      </dl>

      <CheckboxField
        id="researchDeclaration"
        checked={values.researchDeclaration}
        error={errors.researchDeclaration}
        onChange={(checked) => update('researchDeclaration', checked)}
      >
        I am 18 or over and I am buying this material for laboratory research
        use only. I will not administer it to a human or an animal, and I
        understand it is not a medicine, supplement or therapeutic good.
      </CheckboxField>

      <CheckboxField
        id="agreeToTerms"
        checked={values.agreeToTerms}
        error={errors.agreeToTerms}
        onChange={(checked) => update('agreeToTerms', checked)}
      >
        I have read the{' '}
        <Link href="/terms" className="font-semibold text-blue underline underline-offset-4">
          terms of sale
        </Link>
       ,{' '}
        <Link
          href="/returns-policy"
          className="font-semibold text-blue underline underline-offset-4"
        >
          returns policy
        </Link>{' '}
        and{' '}
        <Link
          href="/privacy-policy"
          className="font-semibold text-blue underline underline-offset-4"
        >
          privacy policy
        </Link>
       , and I understand this places an order rather than taking a payment.
      </CheckboxField>

      <p className="rounded-2xl border-2 border-ink bg-lime/40 p-4 text-[0.8rem] leading-relaxed font-semibold">
        {RUO_NOTICE}
      </p>
    </div>
  )
}

function Row({ label, value }: { readonly label: string; readonly value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-[0.75rem] font-bold tracking-wide text-slate uppercase">
        {label}
      </dt>
      <dd className="text-[0.9rem] font-semibold break-words">{value}</dd>
    </div>
  )
}
