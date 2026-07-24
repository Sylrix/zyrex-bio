import Link from 'next/link'
import type { ReactNode } from 'react'

import { PageHero } from '@/components/layout/page-hero'
import { Reveal } from '@/components/motion/reveal'
import { breadcrumbJsonLd } from '@/lib/seo'
import { fullAddress, site } from '@/lib/site'

export interface LegalSection {
  readonly heading: string
  readonly body: ReadonlyArray<string>
  readonly list?: ReadonlyArray<string>
}

interface LegalPageProps {
  readonly eyebrow: string
  readonly title: string
  readonly intro: string
  readonly updated: string
  readonly path: string
  readonly sections: ReadonlyArray<LegalSection>
  readonly footer?: ReactNode
}

/**
 * Every policy page shares this shell: same rhythm, same contact block, same
 * breadcrumb markup. One template means a wording change lands everywhere
 * instead of in whichever page someone remembered to edit.
 */
export function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  path,
  sections,
  footer,
}: LegalPageProps) {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: title, path },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }}
      />

      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={intro}
        crumbs={crumbs}
      />

      <article className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="rounded-full border-2 border-line bg-white px-4 py-2 text-center text-[0.78rem] font-semibold text-slate">
          Last updated {updated}
        </p>

        <div className="mt-10 flex flex-col gap-9">
          {sections.map((section, index) => (
            <Reveal key={section.heading} delay={Math.min(index * 0.04, 0.2)}>
              <section>
                <h2 className="font-display text-[1.3rem] font-extrabold sm:text-[1.5rem]">
                  {section.heading}
                </h2>
                <div className="mt-3 flex flex-col gap-3">
                  {section.body.map((paragraph, paragraphIndex) => (
                    <p
                      key={paragraphIndex}
                      className="text-[0.95rem] leading-relaxed text-slate"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.list ? (
                    <ul className="flex flex-col gap-2 pl-1">
                      {section.list.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[0.95rem] leading-relaxed text-slate"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        {footer}

        <Reveal>
          <aside className="mt-12 rounded-3xl border-2 border-ink bg-paper-2 p-6">
            <h2 className="font-display text-lg font-extrabold">
              Questions about this policy
            </h2>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-slate">
              Email{' '}
              <a
                href={`mailto:${site.contact.email}`}
                className="font-semibold text-blue underline underline-offset-4"
              >
                {site.contact.email}
              </a>{' '}
              and you will hear back within {site.contact.responseWindow}. Post
              reaches the same person at {fullAddress}.
            </p>
            <p className="mt-3 text-[0.82rem] leading-relaxed text-slate">
              {site.name} is {site.ownership}. It is not a company or
              incorporated entity, so the operator named here is personally
              responsible for the commitments on this page.
            </p>
            <p className="mt-3 text-[0.82rem]">
              <Link
                href="/contact"
                className="font-semibold text-blue underline underline-offset-4"
              >
                Full contact details
              </Link>
            </p>
          </aside>
        </Reveal>
      </article>
    </>
  )
}
