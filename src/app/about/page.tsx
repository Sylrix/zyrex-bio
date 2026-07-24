import type { Metadata } from 'next'
import Image from 'next/image'
import { PackageCheck, Snowflake, UserRound } from 'lucide-react'

import { PageHero } from '@/components/layout/page-hero'
import { CountUp } from '@/components/motion/count-up'
import { Reveal } from '@/components/motion/reveal'
import { ButtonLink } from '@/components/ui/button'
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo'
import { RUO_NOTICE, fullAddress, site } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'About Zyrex Bio',
  description:
    'Zyrex Bio is a one-person operation in Melbourne supplying NAD+ research compounds at 99% purity. No company, no call centre — one sole trader who packs every order.',
  path: '/about',
  keywords: ['about Zyrex Bio', 'independent research compound supplier Australia'],
})

const CREDS = [
  {
    icon: UserRound,
    title: 'A sole trader, not a company',
    body: `Zyrex Bio is ${site.ownership}, registered under ABN ${site.abn}. There is no board, no team page and no "our labs" — there is one person, and that person is accountable for everything on this site.`,
  },
  {
    icon: Snowflake,
    title: 'Stock held properly',
    body: 'Material arrives cold, goes straight into a monitored 2–8°C fridge out of direct light, and stays there until the moment an order is packed.',
  },
  {
    icon: PackageCheck,
    title: 'Every order packed by hand',
    body: 'No fulfilment partner, no dropship. Vials are checked against the order, seated in a moulded insert, sealed into an insulated mailer and lodged in person.',
  },
] as const

export default function AboutPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }}
      />

      <PageHero
        eyebrow="Who is behind this"
        title={
          <>
            One person, <span className="text-gradient">one compound,</span> done
            properly.
          </>
        }
        description={`Zyrex Bio supplies NAD+ research material from ${site.address.city}, ${site.address.state}. It is ${site.ownership} — not a company, not a laboratory group, and not a reseller network.`}
        crumbs={crumbs}
      />

      <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal direction="right">
          <div className="flex flex-col gap-5">
            <h2 className="text-[clamp(1.7rem,4vw,2.6rem)]">
              Why it exists
            </h2>
            <p className="text-[1rem] leading-relaxed text-slate">
              Sourcing a research compound in Australia usually means one of two
              things: an overseas listing with no documentation and a six-week
              wait, or a distributor that will not talk to you unless you are
              buying by the kilo.
            </p>
            <p className="text-[1rem] leading-relaxed text-slate">
              Zyrex Bio sits in between. One compound, sourced from a supplier
              whose analysis actually holds up, tested before it is listed, held
              cold, and posted from inside the country in a couple of days. You
              can buy a single vial to see whether the material suits your work,
              and if you need documentation for a batch you can just ask.
            </p>
            <p className="text-[1rem] leading-relaxed text-slate">
              It is deliberately small. Keeping it to one person and one product
              line is what makes it possible to know where every vial came from.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                { to: 99, suffix: '%', label: 'Minimum purity' },
                { to: 500, suffix: 'mg', label: 'Per vial' },
                { to: 1, suffix: '', label: 'Person, start to end' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border-2 border-ink bg-white p-4"
                >
                  <p className="font-display text-2xl leading-none font-extrabold text-blue">
                    <CountUp to={stat.to} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1.5 text-[0.72rem] leading-tight font-semibold text-slate">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal direction="left">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border-2 border-ink bg-gradient-to-br from-cyan-soft via-white to-lilac-soft">
            <span
              aria-hidden="true"
              className="absolute inset-12 animate-[var(--animate-spin-slow)] rounded-full border-2 border-dashed border-blue/25"
            />
            <Image
              src="/products/nad-plus-500mg.webp"
              alt="Zyrex Bio NAD+ 500mg research vial"
              fill
              sizes="(min-width: 1024px) 32rem, 90vw"
              className="relative animate-[var(--animate-bob)] object-contain p-10"
            />
          </div>
        </Reveal>
      </section>

      <section className="border-y-2 border-ink bg-paper-2 py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-[clamp(1.7rem,4vw,2.6rem)]">
              How it actually runs
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {CREDS.map((cred, index) => (
              <Reveal key={cred.title} delay={index * 0.1}>
                <article className="flex h-full flex-col gap-3 rounded-3xl border-2 border-ink bg-white p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-ink bg-blue-soft">
                    <cred.icon className="h-5 w-5" strokeWidth={2.4} />
                  </span>
                  <h3 className="font-display text-lg leading-tight font-extrabold">
                    {cred.title}
                  </h3>
                  <p className="text-[0.9rem] leading-relaxed text-slate">
                    {cred.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-3xl border-2 border-ink bg-lime/40 p-7">
            <h2 className="font-display text-xl font-extrabold">
              What is sold here, plainly
            </h2>
            <p className="mt-3 text-[0.92rem] leading-relaxed">{RUO_NOTICE}</p>
            <p className="mt-3 text-[0.92rem] leading-relaxed">
              No claim is made about what this compound does in a human or an
              animal, and no dosing or protocol information is provided. If that
              is what you are looking for, this is not the right supplier.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-8 rounded-3xl border-2 border-line bg-white p-7">
            <h2 className="font-display text-xl font-extrabold">
              Business details
            </h2>
            <dl className="mt-4 flex flex-col gap-2.5 text-[0.9rem]">
              <div className="flex flex-wrap justify-between gap-2">
                <dt className="text-slate">Trading name</dt>
                <dd className="font-semibold">{site.name}</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <dt className="text-slate">Structure</dt>
                <dd className="font-semibold">Sole trader (individual)</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <dt className="text-slate">ABN</dt>
                <dd className="font-mono font-semibold">{site.abn}</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <dt className="text-slate">Address</dt>
                <dd className="text-right font-semibold">{fullAddress}</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <dt className="text-slate">Email</dt>
                <dd className="font-semibold">{site.contact.email}</dd>
              </div>
            </dl>

            <ButtonLink href="/contact" className="mt-6">
              Contact
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  )
}
