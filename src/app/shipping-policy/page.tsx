import type { Metadata } from 'next'

import { LegalPage } from '@/components/legal/legal-page'
import { pageMetadata } from '@/lib/seo'
import { fullAddress, site } from '@/lib/site'
import { formatPrice } from '@/lib/utils'

export const metadata: Metadata = pageMetadata({
  title: 'Shipping policy',
  description: `How Zyrex Bio orders are packed and posted: ${site.shipping.dispatchWindow} dispatch, tracked ${site.shipping.carrier} delivery Australia wide, free over ${formatPrice(site.shipping.freeThreshold)}.`,
  path: '/shipping-policy',
})

export default function ShippingPolicyPage() {
  return (
    <LegalPage
      eyebrow="Getting it to you"
      title="Shipping policy"
      intro={`Packed by hand in ${site.address.city} and sent tracked with ${site.shipping.carrier}.`}
      updated="24 July 2026"
      path="/shipping-policy"
      sections={[
        {
          heading: 'Where orders ship from',
          body: [
            `Every order is picked, packed and lodged from ${fullAddress}. There is no third-party warehouse in between, the person who runs Zyrex Bio packs the box.`,
          ],
        },
        {
          heading: 'Rates',
          body: ['Shipping is charged at a flat rate within Australia:'],
          list: [
            `Standard tracked, ${formatPrice(site.shipping.standardFee)}`,
            `Express tracked, ${formatPrice(site.shipping.expressFee)}, quoted on request before dispatch`,
            `Free standard shipping on orders over ${formatPrice(site.shipping.freeThreshold)}`,
          ],
        },
        {
          heading: 'Dispatch and delivery times',
          body: [
            `Orders are packed within ${site.shipping.dispatchWindow} of payment clearing, Monday to Friday. Delivery then typically takes ${site.shipping.deliveryWindow}, depending on how far from a capital city the address is.`,
            'A tracking number is emailed the moment the parcel is lodged. Once it is with the carrier, its progress is out of anyone here’s hands, though help chasing a slow parcel is always available.',
          ],
        },
        {
          heading: 'Where we ship',
          body: [
            'Orders are accepted for delivery to Australian addresses only, including PO boxes and parcel lockers. International orders are not accepted at this time, and any that are placed will be refunded in full.',
          ],
        },
        {
          heading: 'Packaging',
          body: [
            'Vials travel upright in a moulded insert inside an insulated mailer, with the flip off seal intact. The outer packaging is plain and carries no description of the contents beyond what the carrier requires.',
            'Materials are kept cold and out of light until the parcel is lodged, so the shortest possible time is spent in transit conditions.',
          ],
        },
        {
          heading: 'Damaged or missing parcels',
          body: [
            `If a parcel arrives damaged, photograph it before opening anything further and email ${site.contact.email} within 7 days of delivery. A replacement or refund is arranged once the carrier claim is lodged.`,
            'If tracking has not moved for 10 business days, get in touch and an enquiry will be raised with the carrier on your behalf.',
          ],
        },
        {
          heading: 'Incorrect addresses',
          body: [
            'Please check the delivery address at checkout. If a parcel is returned to sender because the address was wrong or nobody collected it, the order can be re-sent once the return arrives, with postage charged again at the standard rate.',
          ],
        },
      ]}
    />
  )
}
