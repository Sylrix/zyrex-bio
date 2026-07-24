import type { Metadata } from 'next'

import { LegalPage } from '@/components/legal/legal-page'
import { pageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Returns and refunds',
  description:
    'Zyrex Bio returns policy: 30 days on unopened, sealed vials, plus your rights under Australian Consumer Law.',
  path: '/returns-policy',
})

export default function ReturnsPolicyPage() {
  return (
    <LegalPage
      eyebrow="If something is wrong"
      title="Returns and refunds"
      intro="Sealed vials can come back within 30 days. Nothing here limits the rights you have under Australian Consumer Law."
      updated="24 July 2026"
      path="/returns-policy"
      sections={[
        {
          heading: 'The 30-day window',
          body: [
            'Unopened vials with the aluminium flip off seal intact can be returned within 30 days of delivery for a refund of the purchase price. Return postage is at your cost unless the return is because of an error or a fault.',
            'Start a return by emailing the order reference and what you would like to send back. Return instructions come back the same or next business day.',
          ],
        },
        {
          heading: 'What cannot be returned',
          body: [
            'Once a seal is broken the material cannot be verified or resold, so opened vials are not returnable other than where Australian Consumer Law requires a remedy.',
            'This is not a technicality, a research material whose chain of custody is unknown has no place going back into stock for someone else.',
          ],
        },
        {
          heading: 'Faults, damage and wrong items',
          body: [
            `If an order arrives damaged, incomplete, or is not what was ordered, email ${site.contact.email} within 7 days of delivery with the reference and a photograph. A replacement or a full refund including postage is arranged straight away, you will not be asked to send a damaged parcel back at your own expense.`,
          ],
        },
        {
          heading: 'Your rights under Australian Consumer Law',
          body: [
            'Goods sold in Australia come with consumer guarantees that cannot be excluded. If a product has a major problem you are entitled to a replacement or a refund, and to compensation for any other reasonably foreseeable loss or damage.',
            'If the problem is not major, it can be put right within a reasonable time. If that does not happen, you may cancel and get a refund. Nothing in this policy reduces those rights.',
          ],
        },
        {
          heading: 'Cancelling before dispatch',
          body: [
            'An order can be cancelled for a full refund at any point before it has been packed and lodged. Because orders are packed quickly, email as soon as possible and the run will be stopped if it has not already gone out.',
          ],
        },
        {
          heading: 'How refunds are paid',
          body: [
            'Refunds go back by the same method used to pay the invoice, usually within 3 business days of the return being received or the cancellation being agreed. How long the money then takes to appear depends on your bank or card issuer.',
          ],
        },
      ]}
    />
  )
}
