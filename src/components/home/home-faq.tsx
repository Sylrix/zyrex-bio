import { ArrowRight } from 'lucide-react'

import { FaqAccordion } from '@/components/faq/faq-accordion'
import { Reveal } from '@/components/motion/reveal'
import { ButtonLink } from '@/components/ui/button'
import { homeFaqs } from '@/lib/faq'

export function HomeFaq() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <span className="font-display text-[0.8rem] font-extrabold tracking-[0.2em] text-blue uppercase">
              Straight answers
            </span>
            <h2 className="mt-3 text-[clamp(2rem,4.6vw,3.1rem)]">
              The things people <span className="text-gradient">actually ask.</span>
            </h2>
            <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-slate">
              No fine print games. If something is not covered here, email and
              you will get a real answer from the person who runs this.
            </p>
            <ButtonLink href="/faq" variant="outline" className="mt-6">
              Full FAQ <ArrowRight className="h-4 w-4" strokeWidth={2.8} />
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.1}>
          <FaqAccordion entries={homeFaqs} />
        </Reveal>
      </div>
    </section>
  )
}
