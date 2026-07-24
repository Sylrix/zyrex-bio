import type { Metadata } from 'next'

import { FaqAccordion } from '@/components/faq/faq-accordion'
import { PageHero } from '@/components/layout/page-hero'
import { Reveal } from '@/components/motion/reveal'
import { ButtonLink } from '@/components/ui/button'
import { faqs } from '@/lib/faq'
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Frequently asked questions',
  description:
    'Purity, storage, shipping, payment, returns and research-use conditions — the questions people actually ask before ordering NAD+ from Zyrex Bio.',
  path: '/faq',
  keywords: ['NAD+ research FAQ', 'research chemical shipping Australia'],
})

export default function FaqPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'FAQ', path: '/faq' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqJsonLd(faqs), breadcrumbJsonLd(crumbs)]),
        }}
      />

      <PageHero
        eyebrow="Ask away"
        title={
          <>
            Questions, <span className="text-gradient">answered properly.</span>
          </>
        }
        description="No sales fluff. If your question is not here, email and you will get a straight answer from the person who packs the orders."
        crumbs={crumbs}
      />

      <section className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <FaqAccordion entries={faqs} />

        <Reveal>
          <div className="mt-12 rounded-3xl border-2 border-ink bg-paper-2 p-7 text-center">
            <h2 className="font-display text-xl font-extrabold">
              Still not covered?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-[0.9rem] leading-relaxed text-slate">
              Email {site.contact.email} — replies land within{' '}
              {site.contact.responseWindow}, {site.contact.hours}.
            </p>
            <ButtonLink href="/contact" className="mt-5">
              Get in touch
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  )
}
