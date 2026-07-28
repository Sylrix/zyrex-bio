import { Reveal } from '@/components/motion/reveal'
import { site } from '@/lib/site'

const STEPS = [
  {
    number: '01',
    title: 'Pick your pack',
    body: 'Single vial or a kit. Prices are in AUD and include GST where it applies.',
  },
  {
    number: '02',
    title: 'Confirm laboratory use',
    body: 'A single tick at checkout confirming you are 18+ and buying the material for laboratory use. No account needed.',
  },
  {
    number: '03',
    title: 'Choose how to settle',
    body: 'Card, bank transfer, PayID, Apple Pay or Google Pay. An invoice with a secure payment link for your choice is emailed straight back.',
  },
  {
    number: '04',
    title: 'It ships',
    body: `Packed within ${site.shipping.dispatchWindow} and tracked via ${site.shipping.carrier}, ${site.shipping.deliveryWindow}.`,
  },
] as const

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden border-y-2 border-ink bg-paper-2 py-20 sm:py-24">
      <div className="grain absolute inset-0 opacity-70" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <span className="font-display text-[0.8rem] font-extrabold tracking-[0.2em] text-blue uppercase">
              How ordering works
            </span>
            <h2 className="mt-3 text-[clamp(2rem,4.6vw,3.1rem)]">
              Four steps. <span className="text-gradient">No surprises.</span>
            </h2>
          </div>
        </Reveal>

        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.1} direction="up">
              <li className="relative flex h-full flex-col gap-3 rounded-3xl border-2 border-ink bg-white p-6">
                <span className="font-display text-5xl leading-none font-extrabold text-blue-soft">
                  {step.number}
                </span>
                <h3 className="font-display text-lg leading-tight font-extrabold">
                  {step.title}
                </h3>
                <p className="text-[0.9rem] leading-relaxed text-slate">
                  {step.body}
                </p>
                {index < STEPS.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 -right-3 hidden h-3 w-3 rotate-45 border-t-2 border-r-2 border-ink bg-paper-2 lg:block"
                  />
                ) : null}
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
