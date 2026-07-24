import type { Metadata } from 'next'

import { LegalPage } from '@/components/legal/legal-page'
import { pageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Accessibility',
  description:
    'How Zyrex Bio approaches accessibility, keyboard support, contrast, reduced motion, and how to report a barrier.',
  path: '/accessibility',
})

export default function AccessibilityPage() {
  return (
    <LegalPage
      eyebrow="Everyone gets in"
      title="Accessibility"
      intro="The site is built to WCAG 2.2 AA as a target. Where it falls short, tell me and it gets fixed."
      updated="24 July 2026"
      path="/accessibility"
      sections={[
        {
          heading: 'What has been done',
          body: ['Accessibility was part of building this site, not a pass at the end:'],
          list: [
            'Every interactive control is reachable and operable by keyboard, with a visible focus ring that meets contrast requirements',
            'A skip link jumps straight to the main content',
            'Headings run in order, and landmarks (header, nav, main, footer) are marked up properly',
            'Form fields have real labels, inline error messages tied to their input, and errors announced to screen readers',
            'The cart drawer traps nothing it should not, closes on Escape, and restores page scrolling on exit',
            'Images carry descriptive alternative text; decorative graphics are hidden from assistive technology',
            'Body text meets 4.5:1 contrast against its background, and the site is light-themed throughout with no low-contrast dark mode',
          ],
        },
        {
          heading: 'Motion',
          body: [
            'The site uses a lot of movement by design. Every animation respects the prefers-reduced-motion setting in your operating system, turn it on and reveals, parallax, marquees and hover effects stop, while the content and the ordering flow stay exactly the same.',
          ],
        },
        {
          heading: 'Zoom and text size',
          body: [
            'Layouts are fluid and reflow cleanly to 400% zoom and down to a 320px viewport without a horizontal scrollbar. Increasing your browser text size will not clip content.',
          ],
        },
        {
          heading: 'Known gaps',
          body: [
            'The product photograph carries text on the vial label. That text is repeated in the page content and in the image alternative text, so nothing is available only in the image.',
            'Some decorative colour washes are outside the contrast requirements. They sit behind content and never carry meaning on their own.',
          ],
        },
        {
          heading: 'Reporting a barrier',
          body: [
            `If something on this site blocks you, email ${site.contact.email} with the page and what happened. You will get a reply within ${site.contact.responseWindow}, and if it is something that needs fixing it moves to the front of the queue.`,
            'If you would rather place an order by email than use the checkout form, that is always an option, say so and it will be handled that way.',
          ],
        },
      ]}
    />
  )
}
