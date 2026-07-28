import Link from 'next/link'

import { cn } from '@/lib/utils'

/**
 * Wordmark. Drawn rather than imaged so it stays crisp at any size and needs
 * no extra request, the swoosh echoes the arc on the vial label.
 */
export function Logo({ className }: { readonly className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Zyrex, home"
      className={cn('group inline-flex items-center gap-2.5', className)}
    >
      <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border-2 border-ink bg-ink transition-transform duration-300 group-hover:-rotate-6">
        <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
          <defs>
            <linearGradient id="zx" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#17c9ff" />
              <stop offset="100%" stopColor="#0b5cff" />
            </linearGradient>
          </defs>
          <path
            d="M6 7h20L12 25h14"
            fill="none"
            stroke="url(#zx)"
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </span>
      <span className="font-display text-[1.35rem] leading-none font-extrabold tracking-tight">
        ZYRE<span className="text-blue">X</span>
      </span>
    </Link>
  )
}
