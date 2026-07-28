import type { Metadata } from 'next'

import { CartPageContent } from '@/components/cart/cart-page-content'
import { PageHero } from '@/components/layout/page-hero'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Your cart',
  description:
    'Review the lab vials and kits in your Zyrex cart before checking out.',
  path: '/cart',
  noIndex: true,
})

export default function CartPage() {
  return (
    <>
      <PageHero
        eyebrow="Cart"
        title={
          <>
            What you are <span className="text-gradient">taking.</span>
          </>
        }
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Cart', path: '/cart' },
        ]}
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <CartPageContent />
      </section>
    </>
  )
}
