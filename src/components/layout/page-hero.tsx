import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

import { BlobField } from '@/components/motion/blob-field'
import { Reveal } from '@/components/motion/reveal'

interface PageHeroProps {
  readonly eyebrow: string
  readonly title: ReactNode
  readonly description?: ReactNode
  readonly crumbs: ReadonlyArray<{ name: string; path: string }>
  readonly children?: ReactNode
}

/**
 * Shared masthead for every page below the home page. Keeping breadcrumbs,
 * heading rhythm and the colour wash in one component is what stops interior
 * pages from slowly drifting apart from each other.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink bg-gradient-to-b from-paper-2 to-paper py-12 sm:py-16">
      <BlobField className="opacity-60" />
      <div className="grain absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-[0.78rem] font-semibold text-slate">
            {crumbs.map((crumb, index) => {
              const last = index === crumbs.length - 1
              return (
                <li key={crumb.path} className="flex items-center gap-1">
                  {last ? (
                    <span aria-current="page" className="text-ink">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={crumb.path} className="hover:text-blue">
                      {crumb.name}
                    </Link>
                  )}
                  {last ? null : (
                    <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />
                  )}
                </li>
              )
            })}
          </ol>
        </nav>

        <Reveal>
          <div className="mt-6 max-w-3xl">
            <span className="font-display text-[0.8rem] font-extrabold tracking-[0.2em] text-blue uppercase">
              {eyebrow}
            </span>
            <h1 className="mt-3 text-[clamp(2.2rem,5.5vw,3.6rem)]">{title}</h1>
            {description ? (
              <p className="mt-4 text-[1.02rem] leading-relaxed text-slate">
                {description}
              </p>
            ) : null}
          </div>
        </Reveal>

        {children}
      </div>
    </section>
  )
}
