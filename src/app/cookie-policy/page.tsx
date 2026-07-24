import type { Metadata } from 'next'

import { LegalPage } from '@/components/legal/legal-page'
import { pageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Cookie policy',
  description:
    'Zyrex Bio sets no advertising or tracking cookies. Here is exactly what is stored in your browser and how to clear it.',
  path: '/cookie-policy',
})

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Browser storage"
      title="Cookie policy"
      intro="There is no cookie banner here because there is nothing to consent to."
      updated="24 July 2026"
      path="/cookie-policy"
      sections={[
        {
          heading: 'No tracking, no advertising',
          body: [
            'This site sets no advertising cookies, no analytics cookies and no third-party tracking pixels. Nothing follows you to another website, and no profile is built from your visit.',
          ],
        },
        {
          heading: 'What is stored on your device',
          body: [
            'Two pieces of browser storage make the shop work. Both stay on your device and are readable only by this site:',
          ],
          list: [
            'zyrexbio.cart.v1, local storage holding the items in your cart so it survives a refresh. Cleared when you empty the cart.',
            'zyrexbio.lastOrder.v1, session storage holding your order reference so the confirmation page can display it. Cleared when you close the tab.',
          ],
        },
        {
          heading: 'Why local storage rather than cookies',
          body: [
            'Local storage is never sent to a server with each request the way a cookie is. Your cart genuinely stays on your machine until you choose to submit an order.',
          ],
        },
        {
          heading: 'Clearing it',
          body: [
            'Emptying your cart removes the cart entry. Closing the tab removes the confirmation entry. Clearing site data in your browser settings removes both immediately, and the site will keep working normally afterwards, you will simply start with an empty cart.',
          ],
        },
        {
          heading: 'Third parties',
          body: [
            'Fonts are served from this site rather than a font CDN, so no third party sees your visit. When you follow the payment link in your invoice you leave this site and the payment provider’s own cookie policy applies there.',
          ],
        },
        {
          heading: 'Questions',
          body: [
            `If something about browser storage on this site is unclear, email ${site.contact.email} and you will get a plain answer.`,
          ],
        },
      ]}
    />
  )
}
