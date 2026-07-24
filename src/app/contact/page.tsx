import type { Metadata } from 'next'
import { Clock, Mail, MapPin, Truck } from 'lucide-react'

import { ContactForm } from '@/components/contact/contact-form'
import { PageHero } from '@/components/layout/page-hero'
import { Reveal } from '@/components/motion/reveal'
import { breadcrumbJsonLd, contactPageJsonLd, pageMetadata } from '@/lib/seo'
import { fullAddress, site } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description: `Email ${site.contact.email} for orders, batch documentation or bulk quotes. Zyrex Bio ships from ${site.address.city}, ${site.address.state}, replies within ${site.contact.responseWindow}.`,
  path: '/contact',
  keywords: ['contact Zyrex Bio', 'NAD+ supplier Australia contact'],
})

export default function ContactPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([contactPageJsonLd(), breadcrumbJsonLd(crumbs)]),
        }}
      />

      <PageHero
        eyebrow="Say hello"
        title={
          <>
            Talk to the person who{' '}
            <span className="text-gradient">packs the box.</span>
          </>
        }
        description={`Email is the fastest way through. Replies land within ${site.contact.responseWindow}, ${site.contact.hours}.`}
        crumbs={crumbs}
      />

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8">
        <Reveal className="lg:col-span-5">
          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <InfoCard icon={Mail} title="Email">
              <a
                href={`mailto:${site.contact.email}`}
                className="font-semibold text-blue underline-offset-4 hover:underline"
              >
                {site.contact.email}
              </a>
              <p className="mt-1 text-[0.82rem] text-slate">
                Orders, batch documentation, bulk quotes, anything else.
              </p>
            </InfoCard>

            <InfoCard icon={Clock} title="Hours">
              <p className="font-semibold">{site.contact.hours}</p>
              <p className="mt-1 text-[0.82rem] text-slate">
                One person answers these, so replies come during business hours
                rather than instantly at 2am.
              </p>
            </InfoCard>

            <InfoCard icon={MapPin} title="Registered address">
              <address className="font-semibold not-italic">{fullAddress}</address>
              <p className="mt-1 text-[0.82rem] text-slate">
                Postal and registered address for {site.name}. Not a shopfront,
                so please email before sending anything by post.
              </p>
            </InfoCard>

            <InfoCard icon={Truck} title="Dispatch">
              <p className="font-semibold">
                {site.shipping.dispatchWindow} · {site.shipping.carrier} tracked
              </p>
              <p className="mt-1 text-[0.82rem] text-slate">
                {site.shipping.deliveryWindow}. Australian delivery addresses
                only.
              </p>
            </InfoCard>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.1}>
          <div className="rounded-3xl border-2 border-ink bg-white p-6 sm:p-8">
            <h2 className="font-display text-2xl font-extrabold">
              Send a message
            </h2>
            <p className="mt-2 mb-6 text-[0.9rem] leading-relaxed text-slate">
              Everything here goes straight to the same inbox as the email
              address on the left.
            </p>
            <ContactForm />
          </div>
        </Reveal>
      </section>
    </>
  )
}

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  readonly icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  readonly title: string
  readonly children: React.ReactNode
}) {
  return (
    <div className="flex gap-4 rounded-3xl border-2 border-line bg-white p-5 transition-colors hover:border-ink">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-2 border-ink bg-blue-soft">
        <Icon className="h-5 w-5" strokeWidth={2.4} />
      </span>
      <div className="min-w-0">
        <h3 className="font-display text-base font-extrabold">{title}</h3>
        <div className="mt-1 text-[0.9rem] break-words">{children}</div>
      </div>
    </div>
  )
}
