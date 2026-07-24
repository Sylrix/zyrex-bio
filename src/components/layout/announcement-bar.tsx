import { Marquee } from '@/components/motion/marquee'
import { RUO_SHORT, site } from '@/lib/site'
import { formatPrice } from '@/lib/utils'

const MESSAGES = [
  '99% purity, batch tested',
  RUO_SHORT,
  `Free shipping over ${formatPrice(site.shipping.freeThreshold)}`,
  `Posted from ${site.address.city} ${site.address.state}`,
  'Packed within ' + site.shipping.dispatchWindow,
  'Independently run — one person, no middlemen',
]

/**
 * The ticker above the header. Decorative motion, but the text is real
 * information, so the same messages are also rendered to assistive tech once
 * in a visually hidden list rather than looping forever.
 */
export function AnnouncementBar() {
  const items = MESSAGES.map((message, index) => (
    <span key={index} className="flex items-center gap-6 px-6">
      <span className="font-display text-[0.78rem] font-extrabold tracking-wide whitespace-nowrap uppercase">
        {message}
      </span>
      <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-lime" />
    </span>
  ))

  return (
    <div className="relative border-b-2 border-ink bg-ink py-2 text-paper">
      <Marquee items={items} />
      <ul className="visually-hidden">
        {MESSAGES.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    </div>
  )
}
