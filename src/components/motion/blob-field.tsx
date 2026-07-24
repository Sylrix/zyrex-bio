'use client'

import { cn } from '@/lib/utils'

/**
 * Soft animated colour wash used behind hero and CTA sections.
 *
 * Purely decorative and `pointer-events-none`, so it can sit above the section
 * background without eating clicks. Blur is heavy on purpose — crisp circles
 * read as bugs, a diffuse wash reads as a gradient.
 */
export function BlobField({ className }: { readonly className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <span className="absolute -top-32 -left-24 h-[26rem] w-[26rem] animate-[var(--animate-float)] rounded-full bg-cyan/45 blur-[90px]" />
      <span className="absolute top-1/3 -right-28 h-[30rem] w-[30rem] animate-[var(--animate-bob)] rounded-full bg-blue/30 blur-[110px]" />
      <span className="absolute -bottom-40 left-1/4 h-[24rem] w-[24rem] animate-[var(--animate-float)] rounded-full bg-lilac/40 blur-[100px] [animation-delay:-3s]" />
      <span className="absolute top-10 left-1/2 h-[16rem] w-[16rem] animate-[var(--animate-bob)] rounded-full bg-lime/35 blur-[90px] [animation-delay:-1.5s]" />
    </div>
  )
}
