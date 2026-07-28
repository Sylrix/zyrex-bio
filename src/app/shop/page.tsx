import type { Metadata } from 'next'

import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { PageHero } from '@/components/layout/page-hero'
import { ProductCard } from '@/components/product/product-card'
import { products } from '@/lib/products'
import { breadcrumbJsonLd, itemListJsonLd, pageMetadata } from '@/lib/seo'
import { RUO_NOTICE, site } from '@/lib/site'
import { formatPrice } from '@/lib/utils'

export const metadata: Metadata = pageMetadata({
  title: 'Shop Zyrex Vials & Kits',
  description:
    'Every Zyrex 500mg pack, single vials and 3, 5 and 10 vial kits at 99% purity, posted Australia wide. Laboratory use only.',
  path: '/shop',
  keywords: [
    'buy Zyrex 500mg vial Australia',
    'Zyrex 500mg kit',
    'Zyrex 500mg price',
  ],
})

export default function ShopPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            itemListJsonLd(products, '/shop'),
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Shop', path: '/shop' },
            ]),
          ]),
        }}
      />

      <PageHero
        eyebrow="The catalogue"
        title={
          <>
            All of it is <span className="text-gradient">Zyrex 500mg.</span>
          </>
        }
        description={`Four pack sizes of the same batch tested material. Free shipping over ${formatPrice(site.shipping.freeThreshold)}, packed within ${site.shipping.dispatchWindow}.`}
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Shop', path: '/shop' },
        ]}
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <RevealItem key={product.slug} className="h-full">
              <ProductCard product={product} priority={index < 2} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal>
          <p className="mt-10 rounded-3xl border-2 border-ink bg-white p-6 text-[0.86rem] leading-relaxed text-slate">
            <strong className="font-display text-ink">Laboratory use only. </strong>
            {RUO_NOTICE} Prices are in {site.currency} and orders are accepted
            for delivery to Australian addresses only.
          </p>
        </Reveal>
      </section>
    </>
  )
}
