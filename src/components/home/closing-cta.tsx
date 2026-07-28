import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { BlobField } from '@/components/motion/blob-field'
import { Marquee } from '@/components/motion/marquee'
import { Reveal } from '@/components/motion/reveal'
import { ButtonLink } from '@/components/ui/button'
import { RUO_SHORT, site } from '@/lib/site'

const TICKER = ['Zyrex 500mg 500MG', '99% PURITY', 'LABORATORY USE ONLY', 'SHIPS AU WIDE', 'BATCH TESTED']

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal direction="scale">
          <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-ink bg-gradient-to-br from-blue-soft via-white to-lilac-soft px-6 py-14 sm:px-12 sm:py-20">
            <BlobField className="opacity-70" />

            <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-4 py-1.5 text-[0.75rem] font-bold tracking-wide uppercase">
                Ready when you are
              </span>

              <h2 className="text-[clamp(2.1rem,5.5vw,3.6rem)]">
                Get the vial that actually{' '}
                <span className="text-gradient">tests at 99%.</span>
              </h2>

              <p className="max-w-xl text-[1.02rem] leading-relaxed text-slate">
                Packed by hand in {site.address.city}, posted the same week, and
                backed by a batch reference you can ask about any time.{' '}
                {RUO_SHORT}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <ButtonLink href="/shop" size="lg">
                  Shop Zyrex <ArrowRight className="h-4 w-4" strokeWidth={3} />
                </ButtonLink>
                <ButtonLink href="/contact" size="lg" variant="outline">
                  Ask a question first
                </ButtonLink>
              </div>

              <p className="text-[0.78rem] text-slate">
                Questions?{' '}
                <Link
                  href="/contact"
                  className="font-semibold text-blue underline-offset-4 hover:underline"
                >
                  {site.contact.email}
                </Link>{' '}
                · replies within {site.contact.responseWindow}
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 border-y-2 border-ink bg-lime py-3">
        <Marquee
          items={TICKER.map((text, index) => (
            <span key={index} className="flex items-center gap-6 px-6">
              <span className="font-display text-[1.05rem] font-extrabold tracking-tight whitespace-nowrap">
                {text}
              </span>
              <span className="h-2 w-2 shrink-0 rotate-45 bg-ink" />
            </span>
          ))}
          reverse
        />
      </div>
    </section>
  )
}
