'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { useState } from 'react'

import type { FaqEntry } from '@/lib/faq'
import { cn } from '@/lib/utils'

export function FaqAccordion({
  entries,
  className,
}: {
  readonly entries: readonly FaqEntry[]
  readonly className?: string
}) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <ul className={cn('flex flex-col gap-3', className)}>
      {entries.map((entry, index) => {
        const expanded = open === index
        const panelId = `faq-panel-${index}`
        const buttonId = `faq-button-${index}`

        return (
          <li
            key={entry.q}
            className={cn(
              'overflow-hidden rounded-2xl border-2 transition-colors duration-200',
              expanded ? 'border-ink bg-white' : 'border-line bg-white hover:border-ink'
            )}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
              >
                <span className="font-display text-[1.02rem] leading-tight font-extrabold sm:text-[1.12rem]">
                  {entry.q}
                </span>
                <span
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-ink transition-transform duration-300',
                    expanded ? 'rotate-45 bg-blue text-white' : 'bg-paper'
                  )}
                >
                  <Plus className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {expanded ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-[0.92rem] leading-relaxed text-slate sm:px-6 sm:pb-6">
                    {entry.a}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}
