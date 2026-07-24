'use client'

import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useCart } from '@/components/cart/cart-provider'
import { Logo } from '@/components/layout/logo'
import { Magnetic } from '@/components/motion/magnetic'
import { ButtonLink } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/research-use', label: 'Research use' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
] as const

export function SiteHeader() {
  const pathname = usePathname()
  const { itemCount, hydrated, openDrawer } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300',
        scrolled
          ? 'border-b-2 border-ink bg-paper/85 backdrop-blur-xl'
          : 'border-b-2 border-transparent bg-transparent'
      )}
    >
      <div className="mx-auto flex h-[4.5rem] w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={cn(
                'relative rounded-full px-4 py-2 text-[0.92rem] font-semibold transition-colors',
                isActive(item.href) ? 'text-blue' : 'text-ink hover:text-blue'
              )}
            >
              {item.label}
              {isActive(item.href) ? (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-blue-soft"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Magnetic strength={0.25} className="hidden sm:block">
            <ButtonLink href="/shop" size="sm" variant="ink">
              Buy NAD+
            </ButtonLink>
          </Magnetic>

          <button
            type="button"
            onClick={openDrawer}
            aria-label={`Open cart, ${hydrated ? itemCount : 0} items`}
            className="relative rounded-full border-2 border-ink bg-paper p-2.5 transition-transform hover:-translate-y-[2px] hover:bg-blue-soft"
          >
            <ShoppingBag className="h-4.5 w-4.5" strokeWidth={2.4} />
            <AnimatePresence>
              {hydrated && itemCount > 0 ? (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                  className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-ink bg-lime px-1 font-mono text-[0.65rem] font-bold"
                >
                  {itemCount}
                </motion.span>
              ) : null}
            </AnimatePresence>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="rounded-full border-2 border-ink bg-paper p-2.5 lg:hidden"
          >
            {menuOpen ? (
              <X className="h-4.5 w-4.5" strokeWidth={2.6} />
            ) : (
              <Menu className="h-4.5 w-4.5" strokeWidth={2.6} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t-2 border-ink bg-paper lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4 sm:px-6">
              {NAV.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index }}
                >
                  <Link
                    href={item.href}
                    // Closed here rather than in an effect on `pathname`:
                    // tapping a link is the thing that dismisses the sheet, and
                    // watching the route would also fire on a back navigation
                    // the customer did not initiate from this menu.
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'block rounded-xl px-4 py-3 font-display text-lg font-extrabold',
                      isActive(item.href) ? 'bg-blue-soft text-blue' : 'hover:bg-paper-2'
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
              <li className="pt-2">
                <ButtonLink
                  href="/shop"
                  onClick={() => setMenuOpen(false)}
                  className="w-full"
                  size="md"
                >
                  Buy NAD+
                </ButtonLink>
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
