import Link from 'next/link'

import { BlobField } from '@/components/motion/blob-field'
import { ButtonLink } from '@/components/ui/button'

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-24">
      <BlobField className="opacity-60" />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <p className="font-display text-[clamp(5rem,18vw,10rem)] leading-none font-extrabold text-gradient">
          404
        </p>
        <h1 className="text-[clamp(1.8rem,4.5vw,2.8rem)]">
          That page has left the fridge.
        </h1>
        <p className="max-w-md text-[1rem] leading-relaxed text-slate">
          The link is broken or the page has moved. The NAD+ is still exactly
          where it should be.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href="/shop" size="lg">
            Shop NAD+
          </ButtonLink>
          <ButtonLink href="/" variant="outline" size="lg">
            Back home
          </ButtonLink>
        </div>

        <p className="text-[0.82rem] text-slate">
          Or try the{' '}
          <Link href="/faq" className="font-semibold text-blue underline underline-offset-4">
            FAQ
          </Link>{' '}
          and{' '}
          <Link
            href="/contact"
            className="font-semibold text-blue underline underline-offset-4"
          >
            contact page
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
