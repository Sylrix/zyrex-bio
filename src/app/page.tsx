import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldAlert } from 'lucide-react'

import { ClosingCta } from '@/components/home/closing-cta'
import { FeaturedGrid } from '@/components/home/featured-grid'
import { Hero } from '@/components/home/hero'
import { HomeFaq } from '@/components/home/home-faq'
import { HowItWorks } from '@/components/home/how-it-works'
import { StatsStrip } from '@/components/home/stats-strip'
import { WhyZyrex } from '@/components/home/why-zyrex'
import { Reveal } from '@/components/motion/reveal'
import { homeFaqs } from '@/lib/faq'
import { products } from '@/lib/products'
import { faqJsonLd, itemListJsonLd, pageMetadata } from '@/lib/seo'
import { RUO_NOTICE, site } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: `${site.name} | High Purity Lab Vials, 99% Purity | Australia`,
  description:
    'Buy Zyrex 500mg vials at 99% purity, packed and posted Australia wide by an independent sole trader in Bacchus Marsh, Victoria. For laboratory use only, not for human consumption.',
  path: '/',
  keywords: [
    'lab vial',
    'Zyrex 500mg Australia',
    'laboratory use only Zyrex 500mg',
    'lab laboratory materials Australia',
  ],
})

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqJsonLd(homeFaqs), itemListJsonLd(products, '/')]),
        }}
      />

      <Hero />
      <StatsStrip />
      <FeaturedGrid />
      <ComplianceBand />
      <WhyZyrex />
      <HowItWorks />
      <HomeFaq />
      <ClosingCta />
    </>
  )
}

/** Compliance is not a footnote here, it gets its own band, mid-page. */
function ComplianceBand() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal direction="scale">
        <div className="flex flex-col items-start gap-4 rounded-3xl border-2 border-ink bg-lime/45 p-6 sm:flex-row sm:items-center sm:p-8">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-ink bg-white">
            <ShieldAlert className="h-6 w-6" strokeWidth={2.4} />
          </span>
          <div>
            <h2 className="font-display text-lg font-extrabold sm:text-xl">
              Read this before you order
            </h2>
            <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink/80">
              {RUO_NOTICE} By ordering you confirm you are 18 or over and that
              the material is for laboratory use.{' '}
              <Link
                href="/lab-use"
                className="font-semibold underline underline-offset-4"
              >
                Read the full laboratory use policy
              </Link>
              .
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
