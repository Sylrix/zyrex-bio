import type { Metadata } from 'next'

import { CheckoutForm } from '@/components/checkout/checkout-form'
import { PageHero } from '@/components/layout/page-hero'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Checkout',
  description:
    'Complete your Zyrex order. Choose card, bank transfer, PayID, Apple Pay or Google Pay, then settle the invoice through a secure payment link.',
  path: '/checkout',
  noIndex: true,
})

export default function CheckoutPage() {
  return (
    <>
      <PageHero
        eyebrow="Checkout"
        title={
          <>
            Almost <span className="text-gradient">done.</span>
          </>
        }
        description="Three short steps. Nothing is charged here, you will get an invoice with a secure payment link for the method you pick."
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Cart', path: '/cart' },
          { name: 'Checkout', path: '/checkout' },
        ]}
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <CheckoutForm />
      </section>
    </>
  )
}
