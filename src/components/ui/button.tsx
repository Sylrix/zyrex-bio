import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type Variant = 'primary' | 'ink' | 'lime' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

const BASE =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-display font-extrabold tracking-tight ' +
  'transition-[transform,box-shadow,background-color,color] duration-200 ease-out ' +
  'active:translate-y-[3px] active:shadow-none disabled:pointer-events-none disabled:opacity-55'

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-blue text-white border-2 border-ink shadow-[var(--shadow-pop)] hover:-translate-y-[3px] hover:bg-blue-deep',
  ink: 'bg-ink text-paper border-2 border-ink shadow-[0_6px_0_0_var(--color-blue)] hover:-translate-y-[3px]',
  lime: 'bg-lime text-ink border-2 border-ink shadow-[var(--shadow-pop)] hover:-translate-y-[3px]',
  outline:
    'bg-paper text-ink border-2 border-ink shadow-[var(--shadow-pop-sm)] hover:-translate-y-[3px] hover:bg-blue-soft',
  ghost: 'text-ink hover:bg-blue-soft border-2 border-transparent',
}

const SIZES: Record<Size, string> = {
  sm: 'px-4 py-2 text-[0.82rem]',
  md: 'px-6 py-3 text-[0.95rem]',
  lg: 'px-8 py-4 text-[1.05rem]',
}

interface CommonProps {
  readonly variant?: Variant
  readonly size?: Size
  readonly className?: string
  readonly children: ReactNode
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...rest}
    >
      {children}
    </Link>
  )
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: CommonProps & ComponentProps<'button'>) {
  return (
    <button
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...rest}
    >
      {children}
    </button>
  )
}
