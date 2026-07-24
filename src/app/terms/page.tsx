import type { Metadata } from 'next'

import { LegalPage } from '@/components/legal/legal-page'
import { pageMetadata } from '@/lib/seo'
import { RUO_NOTICE, fullAddress, site } from '@/lib/site'
import { formatPrice } from '@/lib/utils'

export const metadata: Metadata = pageMetadata({
  title: 'Terms of sale',
  description:
    'The terms you agree to when you order from Zyrex Bio — ordering, pricing, payment, delivery, research-use conditions and liability.',
  path: '/terms',
})

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="The agreement"
      title="Terms of sale"
      intro={`These terms apply to every order placed on ${site.url.replace('https://', '')}.`}
      updated="24 July 2026"
      path="/terms"
      sections={[
        {
          heading: 'Who you are dealing with',
          body: [
            `${site.name} is ${site.ownership}, trading under ABN ${site.abn} from ${fullAddress}. It is not a company, corporation or incorporated laboratory group, and it has no subsidiaries, branches or agents.`,
            `Anywhere these terms say "we" or "us", that means the individual who operates ${site.name}. Contact is by email at ${site.contact.email}.`,
          ],
        },
        {
          heading: 'Placing an order',
          body: [
            'Submitting the checkout form is an offer to buy, not a completed sale. A contract is formed only once the order is accepted and an invoice is issued. Orders may be declined for any lawful reason, including where the research-use conditions cannot be met.',
            'You must be 18 or over to order, and the details you provide must be accurate and your own.',
          ],
        },
        {
          heading: 'Research use conditions',
          body: [
            `${RUO_NOTICE} By ordering you accept the research-use policy in full and confirm the material will be used only for laboratory research.`,
            'Breaching that condition ends the agreement immediately and no refund is owed for material already supplied.',
          ],
        },
        {
          heading: 'Prices and payment',
          body: [
            `Prices are in ${site.currency} and include GST where it applies. Shipping is added at checkout and is free on orders over ${formatPrice(site.shipping.freeThreshold)}.`,
            'No payment is taken on this site and no card details are collected here. Once an order is accepted, an invoice with a secure payment link for your chosen method is emailed to you. Goods are packed once payment has cleared.',
            'Prices may change at any time, but the price shown when your order was placed is the price that will be invoiced.',
          ],
        },
        {
          heading: 'Delivery and risk',
          body: [
            `Orders ship tracked within Australia only. Dispatch is usually within ${site.shipping.dispatchWindow} of payment clearing, and delivery estimates are estimates rather than guarantees.`,
            'Risk in the goods passes to you on delivery to the address given at checkout.',
          ],
        },
        {
          heading: 'Returns',
          body: [
            'Returns are governed by the returns policy, which forms part of these terms. Consumer guarantees under Australian Consumer Law apply and are not excluded by anything written here.',
          ],
        },
        {
          heading: 'Limitation of liability',
          body: [
            'To the extent permitted by law, and other than for the consumer guarantees that cannot be excluded, liability for any claim connected with an order is limited to replacing the goods or refunding what was paid for them.',
            'No liability is accepted for loss arising from use of the material outside the research-use conditions, or for indirect or consequential loss.',
          ],
        },
        {
          heading: 'Intellectual property',
          body: [
            `The text, layout, photography and branding on this site belong to ${site.name}. Product listings may be shared or linked freely; wholesale copying of the site is not permitted.`,
          ],
        },
        {
          heading: 'Governing law',
          body: [
            `These terms are governed by the law of ${site.address.state === 'VIC' ? 'Victoria' : site.address.state}, Australia, and the courts of that state have jurisdiction over any dispute.`,
          ],
        },
        {
          heading: 'Changes',
          body: [
            'These terms may be updated from time to time. The version in force is the one published here on the day your order is placed, and the date at the top of this page shows when it last changed.',
          ],
        },
      ]}
    />
  )
}
