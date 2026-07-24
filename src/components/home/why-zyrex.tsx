import { Beaker, Boxes, FileCheck2, PackageCheck, Snowflake, UserRound } from 'lucide-react'

import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'

const REASONS = [
  {
    icon: FileCheck2,
    title: 'Batch documentation on request',
    body: 'Every batch is assigned a reference printed on the vial label. Ask and the corresponding analysis sheet is emailed back, no account, no sales call.',
    tone: 'bg-blue-soft',
  },
  {
    icon: Beaker,
    title: '99% purity, verified',
    body: 'Material is tested by HPLC before it is listed. Anything that comes back below the threshold is not sold, it is returned to the supplier.',
    tone: 'bg-cyan-soft',
  },
  {
    icon: Snowflake,
    title: 'Cold held and light protected',
    body: 'Vials sit at 2 to 8°C and out of light from arrival to dispatch, then travel in an insulated mailer with the seal intact.',
    tone: 'bg-lilac-soft',
  },
  {
    icon: UserRound,
    title: 'One person, start to finish',
    body: 'Zyrex Bio is run by a single sole trader. The person who answers your email is the person who packs the box, there is no support tier to escalate through.',
    tone: 'bg-lime/40',
  },
  {
    icon: PackageCheck,
    title: 'Discreet, tracked postage',
    body: 'Plain outer packaging with a tracking number the moment it leaves. Nothing on the outside describes the contents.',
    tone: 'bg-blue-soft',
  },
  {
    icon: Boxes,
    title: 'Buy one or buy ten',
    body: 'No minimum order and no subscription. Take a single vial to check the material suits your work before committing to a case.',
    tone: 'bg-cyan-soft',
  },
] as const

export function WhyZyrex() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <span className="font-display text-[0.8rem] font-extrabold tracking-[0.2em] text-blue uppercase">
              Why bother with us
            </span>
            <h2 className="mt-3 text-[clamp(2rem,4.6vw,3.1rem)]">
              Small operation.{' '}
              <span className="text-gradient">Serious about the details.</span>
            </h2>
          </div>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason) => (
            <RevealItem key={reason.title} className="h-full">
              <article className="group flex h-full flex-col gap-3 rounded-3xl border-2 border-ink bg-white p-6 transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-pop)]">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-ink ${reason.tone} transition-transform duration-300 group-hover:-rotate-6`}
                >
                  <reason.icon className="h-5.5 w-5.5" strokeWidth={2.3} />
                </span>
                <h3 className="font-display text-lg leading-tight font-extrabold">
                  {reason.title}
                </h3>
                <p className="text-[0.9rem] leading-relaxed text-slate">
                  {reason.body}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
