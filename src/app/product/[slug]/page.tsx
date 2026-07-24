import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, ShieldAlert, Snowflake, Truck } from 'lucide-react'

import { PageHero } from '@/components/layout/page-hero'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { PaymentMarks } from '@/components/payment/payment-marks'
import { AddToCart } from '@/components/product/add-to-cart'
import { ProductCard } from '@/components/product/product-card'
import { getProductBySlug, products } from '@/lib/products'
import { breadcrumbJsonLd, pageMetadata, productJsonLd } from '@/lib/seo'
import { RUO_NOTICE, site } from '@/lib/site'
import { formatPrice } from '@/lib/utils'

/** Static export needs the full slug list at build time. */
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return { title: 'Product not found', robots: { index: false, follow: false } }
  }

  return pageMetadata({
    title: `${product.name} — ${product.purity} Purity, Research Use Only`,
    description: `${product.summary} ${product.vials} × ${product.strength} NAD+ lyophilised powder at ${product.purity} purity, ${formatPrice(product.price)} ${site.currency}, posted Australia-wide. Research use only.`,
    path: `/product/${product.slug}`,
    image: product.image,
    keywords: [product.name, 'NAD+ research vial', `NAD+ ${product.strength}`],
  })
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) notFound()

  const related = products.filter((item) => item.slug !== product.slug).slice(0, 3)
  const perVial = product.price / product.vials
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: product.name, path: `/product/${product.slug}` },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([productJsonLd(product), breadcrumbJsonLd(crumbs)]),
        }}
      />

      <PageHero
        eyebrow="NAD+ research material"
        title={product.name}
        description={product.summary}
        crumbs={crumbs}
      />

      <section className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal direction="right">
          <div className="lg:sticky lg:top-28">
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border-2 border-ink bg-gradient-to-br from-cyan-soft via-white to-lilac-soft">
              <span
                aria-hidden="true"
                className="absolute inset-10 animate-[var(--animate-spin-slow)] rounded-full border-2 border-dashed border-blue/25"
              />
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 36rem, 92vw"
                className="relative object-contain p-8 drop-shadow-[0_24px_40px_rgba(11,92,255,0.22)]"
              />
              <span className="absolute top-5 left-5 rounded-full border-2 border-ink bg-white px-3 py-1 font-display text-[0.72rem] font-extrabold">
                {product.purity} purity
              </span>
            </div>

            <ul className="mt-5 grid grid-cols-3 gap-3">
              {[
                { icon: Snowflake, label: 'Cold held 2–8°C' },
                { icon: Truck, label: 'Tracked AU post' },
                { icon: ShieldAlert, label: 'Research use only' },
              ].map((item) => (
                <li
                  key={item.label}
                  className="flex flex-col items-center gap-2 rounded-2xl border-2 border-line bg-white p-3 text-center"
                >
                  <item.icon className="h-5 w-5 text-blue" strokeWidth={2.4} />
                  <span className="text-[0.72rem] leading-tight font-semibold">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal direction="left" className="flex flex-col gap-7">
          <div>
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="font-mono text-[2.4rem] leading-none font-extrabold">
                {formatPrice(product.price)}
              </span>
              {product.compareAt ? (
                <span className="font-mono text-lg text-slate line-through">
                  {formatPrice(product.compareAt)}
                </span>
              ) : null}
              <span className="rounded-full bg-blue-soft px-2.5 py-1 text-[0.72rem] font-bold text-blue-deep">
                {formatPrice(perVial)} per vial
              </span>
            </div>
            <p className="mt-2 text-[0.82rem] text-slate">
              {site.currency} · Free shipping over{' '}
              {formatPrice(site.shipping.freeThreshold)} · In stock, packed in{' '}
              {site.shipping.dispatchWindow}
            </p>
          </div>

          <AddToCart product={product} />

          <div className="flex flex-col gap-3">
            {product.description.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === product.description.length - 1
                    ? 'rounded-2xl border-2 border-ink bg-lime/40 p-4 text-[0.86rem] leading-relaxed font-semibold'
                    : 'text-[0.95rem] leading-relaxed text-slate'
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="rounded-3xl border-2 border-ink bg-white p-6">
            <h2 className="font-display text-lg font-extrabold">Specification</h2>
            <dl className="mt-4 divide-y divide-line">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex flex-wrap justify-between gap-2 py-2.5"
                >
                  <dt className="text-[0.86rem] font-semibold text-slate">
                    {spec.label}
                  </dt>
                  <dd className="text-[0.86rem] font-bold">{spec.value}</dd>
                </div>
              ))}
              <div className="flex flex-wrap justify-between gap-2 py-2.5">
                <dt className="text-[0.86rem] font-semibold text-slate">
                  Vials in pack
                </dt>
                <dd className="text-[0.86rem] font-bold">{product.vials}</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-2 py-2.5">
                <dt className="text-[0.86rem] font-semibold text-slate">SKU</dt>
                <dd className="font-mono text-[0.86rem] font-bold">{product.sku}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-3xl border-2 border-line bg-paper-2 p-6">
            <h2 className="font-display text-base font-extrabold">
              Paying for this
            </h2>
            <p className="mt-2 text-[0.86rem] leading-relaxed text-slate">
              Pick card, bank transfer, PayID, Apple Pay or Google Pay at
              checkout. No card details are entered on this site — an invoice
              with a secure link for your chosen method is emailed within{' '}
              {site.contact.responseWindow}.
            </p>
            <PaymentMarks className="mt-4" />
          </div>

          <ul className="flex flex-col gap-2">
            {[
              'Sealed vial with batch reference printed on the label',
              'Analysis documentation emailed on request',
              '30-day return window on unopened, sealed vials',
              'Plain outer packaging, tracked from door to door',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[0.9rem]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>

          <p className="text-[0.78rem] leading-relaxed text-slate">
            {RUO_NOTICE}{' '}
            <Link
              href="/research-use"
              className="font-semibold text-blue underline underline-offset-4"
            >
              Research-use policy
            </Link>
          </p>
        </Reveal>
      </section>

      <section className="border-t-2 border-ink bg-paper-2 py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-[clamp(1.6rem,3.6vw,2.4rem)]">
              Other pack sizes
            </h2>
          </Reveal>

          <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <RevealItem key={item.slug} className="h-full">
                <ProductCard product={item} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  )
}
