import { CountUp } from '@/components/motion/count-up'
import { Reveal } from '@/components/motion/reveal'

const STATS = [
  { to: 99, suffix: '%', label: 'Minimum purity, HPLC verified' },
  { to: 500, suffix: 'mg', label: 'Fill weight per sealed vial' },
  { to: 48, suffix: 'h', label: 'Typical pack and post window' },
  { to: 1, suffix: '', label: 'Person behind every order', prefix: '' },
] as const

export function StatsStrip() {
  return (
    <section className="border-y-2 border-ink bg-ink py-12 text-paper">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {STATS.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.08} direction="up">
            <div className="flex flex-col gap-1.5">
              <span className="font-display text-[clamp(2.4rem,5vw,3.4rem)] leading-none font-extrabold text-lime">
                <CountUp to={stat.to} suffix={stat.suffix} />
              </span>
              <span className="text-sm leading-relaxed text-paper/75">
                {stat.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
