import type { Metadata } from 'next'

import { OrderConfirmedContent } from '@/components/checkout/order-confirmed-content'
import { PageHero } from '@/components/layout/page-hero'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Order received',
  description: 'Your Zyrex order reference and what happens next.',
  path: '/order-confirmed',
  noIndex: true,
})

export default function OrderConfirmedPage() {
  return (
    <>
      <PageHero
        eyebrow="Thank you"
        title={
          <>
            That is <span className="text-gradient">locked in.</span>
          </>
        }
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Order received', path: '/order-confirmed' },
        ]}
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <OrderConfirmedContent />
      </section>
    </>
  )
}
