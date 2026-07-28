import Link from 'next/link'
import { Mail, MapPin, Clock } from 'lucide-react'

import { Logo } from '@/components/layout/logo'
import { PaymentMarks } from '@/components/payment/payment-marks'
import { RUO_NOTICE, fullAddress, site } from '@/lib/site'

const SHOP_LINKS = [
  { href: '/shop', label: 'All Zyrex 500mg products' },
  { href: '/product/zyrex-500mg-single-vial', label: 'Zyrex 500mg single vial' },
  { href: '/product/zyrex-500mg-3-vial-kit', label: 'Zyrex 500mg 3 vial kit' },
  { href: '/product/zyrex-500mg-5-vial-kit', label: 'Zyrex 500mg 5 vial kit' },
  { href: '/product/zyrex-500mg-10-vial-case', label: 'Zyrex 500mg 10 vial case' },
] as const

const INFO_LINKS = [
  { href: '/about', label: 'About Zyrex' },
  { href: '/lab-use', label: 'Laboratory use policy' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
] as const

const LEGAL_LINKS = [
  { href: '/shipping-policy', label: 'Shipping policy' },
  { href: '/returns-policy', label: 'Returns & refunds' },
  { href: '/terms', label: 'Terms of sale' },
  { href: '/privacy-policy', label: 'Privacy policy' },
  { href: '/cookie-policy', label: 'Cookie policy' },
  { href: '/accessibility', label: 'Accessibility' },
] as const

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t-2 border-ink bg-paper-2">
      <div className="grain absolute inset-0 opacity-70" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate">
              {site.tagline} Packed and posted from {site.address.city},{' '}
              {site.address.state} by a one person operation, no call centre, no
              middlemen, just the person who packed your box.
            </p>

            <ul className="mt-5 flex flex-col gap-2.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue" strokeWidth={2.4} />
                <address className="not-italic text-slate">{fullAddress}</address>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-blue" strokeWidth={2.4} />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-slate underline-offset-4 hover:text-blue hover:underline"
                >
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-blue" strokeWidth={2.4} />
                <span className="text-slate">{site.contact.hours}</span>
              </li>
            </ul>
          </div>

          <FooterColumn title="Shop" links={SHOP_LINKS} className="lg:col-span-3" />
          <FooterColumn title="Info" links={INFO_LINKS} className="lg:col-span-2" />
          <FooterColumn title="Policies" links={LEGAL_LINKS} className="lg:col-span-3" />
        </div>

        <div className="mt-12 rounded-2xl border-2 border-ink bg-white p-5">
          <p className="font-display text-sm font-extrabold tracking-tight uppercase">
            Laboratory use only
          </p>
          <p className="mt-2 text-[0.82rem] leading-relaxed text-slate">
            {RUO_NOTICE} Products are supplied to individuals aged 18 or over who
            confirm they are purchasing for laboratory use. Nothing on this
            site is medical advice, and no claim is made about any effect on the
            body of a human or an animal.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t-2 border-line pt-7 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1.5">
            <p className="text-[0.8rem] text-slate">
              © {site.founded} to {new Date().getFullYear()} {site.name}. Trading
              as a sole trader in Australia.
            </p>
            <p className="text-[0.8rem] text-slate">
              Zyrex is {site.ownership}. It is not a company, laboratory group
              or incorporated entity.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 md:items-end">
            <PaymentMarks />
            <p className="text-[0.72rem] text-slate">
              Paid by secure link sent with your invoice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
  className,
}: {
  readonly title: string
  readonly links: ReadonlyArray<{ href: string; label: string }>
  readonly className?: string
}) {
  return (
    <div className={className}>
      <h2 className="font-display text-sm font-extrabold tracking-widest uppercase">
        {title}
      </h2>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1.5 text-sm text-slate transition-colors hover:text-blue"
            >
              <span className="h-1 w-1 rounded-full bg-line transition-all group-hover:w-3 group-hover:bg-blue" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
