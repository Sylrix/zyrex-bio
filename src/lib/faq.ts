import { RUO_NOTICE, fullAddress, site } from '@/lib/site'
import { formatPrice } from '@/lib/utils'

export interface FaqEntry {
  readonly q: string
  readonly a: string
}

/**
 * One list, used by the home page, the FAQ page and the FAQPage JSON-LD.
 * Duplicating the copy would guarantee the structured data and the visible
 * answers eventually disagree, which is exactly what rich-result checks flag.
 */
export const faqs: readonly FaqEntry[] = [
  {
    q: 'What exactly am I buying?',
    a: `A sealed glass vial of NAD+ supplied as a lyophilised powder, tested at 99% purity or better, with the compound, quantity and batch reference printed on the label. ${RUO_NOTICE}`,
  },
  {
    q: 'Can I use this on myself or an animal?',
    a: 'No. Everything sold by Zyrex Bio is a research material intended for laboratory use by qualified individuals. It is not a medicine, not a supplement and not a therapeutic good, and it must not be administered to a human or an animal.',
  },
  {
    q: 'Who runs Zyrex Bio?',
    a: `Zyrex Bio is ${site.ownership}. It is not a company or an incorporated laboratory group — one person sources the material, packs the orders and answers the email.`,
  },
  {
    q: 'How is my order shipped?',
    a: `Orders are packed within ${site.shipping.dispatchWindow} and sent tracked with ${site.shipping.carrier}, typically arriving in ${site.shipping.deliveryWindow}. Shipping is ${formatPrice(site.shipping.standardFee)} and free on orders over ${formatPrice(site.shipping.freeThreshold)}. Outer packaging is plain and says nothing about the contents.`,
  },
  {
    q: 'Do you ship outside Australia?',
    a: 'Not at the moment. Orders are only accepted for delivery to Australian addresses so the research-use conditions attached to the material can be met.',
  },
  {
    q: 'How do I pay?',
    a: 'Choose card, Australian bank transfer, PayID, Apple Pay or Google Pay at checkout. No card number, expiry or CVC is ever entered on this site — the order is recorded and an invoice with a secure payment link for your chosen method is emailed back.',
  },
  {
    q: 'Why does the site not take my card directly?',
    a: 'Because the site is a static storefront with no payment server behind it. Sending you to a hosted payment page keeps card data with the payment provider, where it belongs, rather than passing through a form here.',
  },
  {
    q: 'How should the vials be stored?',
    a: 'Keep them sealed at 2–8°C and out of direct light. They arrive in an insulated mailer, and the seal should stay intact until the material is used in the lab.',
  },
  {
    q: 'Can I return an order?',
    a: 'Unopened vials with the seal intact can be returned within 30 days of delivery. Once a seal is broken the material cannot be resold and is not returnable, other than where Australian Consumer Law requires a remedy.',
  },
  {
    q: 'Where do orders ship from?',
    a: `Everything is packed and posted from ${fullAddress}.`,
  },
]

/** The shorter subset shown on the home page. */
export const homeFaqs = faqs.slice(0, 5)
