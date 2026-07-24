import type { Metadata } from 'next'

import { LegalPage } from '@/components/legal/legal-page'
import { pageMetadata } from '@/lib/seo'
import { fullAddress, site } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Privacy policy',
  description:
    'What personal information Zyrex Bio collects, why, who it is shared with, and how to ask for a copy or have it deleted.',
  path: '/privacy-policy',
})

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Your information"
      title="Privacy policy"
      intro="A one-person business collects the minimum it needs to post you a parcel. Here is exactly what that is."
      updated="24 July 2026"
      path="/privacy-policy"
      sections={[
        {
          heading: 'Who handles your information',
          body: [
            `${site.name} is ${site.ownership}. The individual who operates it is the only person with access to order information, and can be reached at ${site.contact.email} or by post at ${fullAddress}.`,
          ],
        },
        {
          heading: 'What is collected',
          body: ['Only what an order needs in order to exist:'],
          list: [
            'Your name, email address and phone number',
            'The delivery address you enter at checkout',
            'An optional lab or organisation name, and any delivery notes you add',
            'What you ordered, the total, and which payment method you chose',
            'Your confirmation that the order is for research use',
          ],
        },
        {
          heading: 'What is never collected',
          body: [
            'No card number, expiry date, CVC, bank login or PayID credential is ever entered on this site — there are no fields for them. Payment happens on the payment provider’s own hosted page, so that information never passes through here at all.',
            'No account is created, no password is stored, and no profile is built about you between orders.',
          ],
        },
        {
          heading: 'Why it is collected',
          body: [
            'To accept and pack your order, to invoice you, to post the parcel, to send you tracking details, to answer your questions, and to keep the sales records Australian tax law requires.',
            'Your details are not used for marketing unless you separately ask to be emailed about new stock, and any such list can be left at any time.',
          ],
        },
        {
          heading: 'Who it is shared with',
          body: ['Your information is never sold. It is shared only where an order cannot happen otherwise:'],
          list: [
            `${site.shipping.carrier}, so the parcel can be addressed and tracked`,
            'The payment provider that issues your invoice and processes the payment',
            'The email service used to deliver order notifications',
            'An accountant or a government authority, where the law requires it',
          ],
        },
        {
          heading: 'How long it is kept',
          body: [
            'Order and invoice records are kept for seven years because tax law requires it. Email correspondence is kept for two years. Anything not attached to an order or a legal obligation is deleted once it is no longer needed.',
          ],
        },
        {
          heading: 'Storage and security',
          body: [
            'This storefront is a static site with no customer database attached to it. Order details live in the email inbox and invoicing tool used to run the business, both protected by strong unique passwords and two-factor authentication.',
            'No system is perfect, and no promise is made that one is. If a breach ever affected your information, you would be told about it directly.',
          ],
        },
        {
          heading: 'Your rights',
          body: [
            `Under the Privacy Act 1988 (Cth) you can ask for a copy of the personal information held about you, ask for it to be corrected, or ask for it to be deleted where there is no legal reason to keep it. Email ${site.contact.email} and the request will be actioned within 30 days at no cost.`,
            'If you are unhappy with how a request is handled, you can complain to the Office of the Australian Information Commissioner at oaic.gov.au.',
          ],
        },
        {
          heading: 'Cookies and analytics',
          body: [
            'This site sets no advertising or tracking cookies. Your cart is stored in your own browser using local storage and never leaves your device until you submit an order. The cookie policy has the detail.',
          ],
        },
        {
          heading: 'Children',
          body: [
            'This site is not intended for anyone under 18, and orders are only accepted from adults. No information is knowingly collected from a child.',
          ],
        },
      ]}
    />
  )
}
