import type { Metadata } from 'next'

import { LegalPage } from '@/components/legal/legal-page'
import { pageMetadata } from '@/lib/seo'
import { RUO_NOTICE, site } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Research use only policy',
  description:
    'Everything Zyrex Bio supplies is a laboratory research material. Read the conditions of sale, who may order, and what these compounds must never be used for.',
  path: '/research-use',
  keywords: ['research use only', 'NAD+ research material conditions'],
})

export default function ResearchUsePage() {
  return (
    <LegalPage
      eyebrow="The important one"
      title="Research use only policy"
      intro="This is the condition every order is sold under. Please read it in full before you buy."
      updated="24 July 2026"
      path="/research-use"
      sections={[
        {
          heading: 'What these products are',
          body: [
            `Everything listed on this site is a research material supplied to qualified individuals for use in a laboratory setting. ${RUO_NOTICE}`,
            'The vials contain a lyophilised powder intended for in-vitro and analytical work. They are not sterile injectables, they are not compounded for administration, and they are not prepared, labelled or supplied as anything a person or an animal should receive.',
          ],
        },
        {
          heading: 'What they are not',
          body: [
            'To be completely unambiguous, nothing sold here is any of the following:',
          ],
          list: [
            'A medicine, prescription drug or therapeutic good of any kind',
            'A dietary supplement, food, food ingredient or beverage additive',
            'A cosmetic or personal care product',
            'A diagnostic product or medical device',
            'A veterinary product or animal feed additive',
          ],
        },
        {
          heading: 'No claims are made',
          body: [
            'Zyrex Bio makes no claim, express or implied, about any effect these materials may have on the body of a human or an animal. No dosing information, protocol, reconstitution guidance for administration, or suggested use is provided, and none will be provided on request.',
            'Any statement you find elsewhere describing a use for this compound in people is not endorsed by Zyrex Bio and forms no part of what is being sold here.',
          ],
        },
        {
          heading: 'Who may order',
          body: [
            'By placing an order you confirm that you are 18 years of age or older, that you are ordering the material for laboratory research use, and that you are competent to handle research chemicals safely in an appropriate setting.',
            'You also confirm that you will not administer the material to a human or an animal, will not resell it for that purpose, and will comply with every law that applies to you regarding possession, handling, storage and disposal.',
          ],
        },
        {
          heading: 'Orders that will not be filled',
          body: [
            'Orders are refused, and refunded in full, where there is a reasonable belief that the material is intended for human or veterinary use, for resale as a supplement or medicine, or for any purpose prohibited by law.',
            'Refusing an order costs nothing and protects everyone involved, so it happens without argument and without a fee.',
          ],
        },
        {
          heading: 'Handling and storage',
          body: [
            'Store sealed vials at 2 to 8°C, protected from light, and keep them out of reach of children and anyone not involved in the research. Handle in a controlled setting with appropriate protective equipment, and dispose of unused material and packaging in line with the rules that apply to your facility and your local authority.',
          ],
        },
        {
          heading: 'Your responsibility',
          body: [
            `${site.name} supplies the material and the information printed on its label. What happens after it arrives is the responsibility of the person who ordered it. If any part of this policy does not fit your intended use, do not place an order.`,
          ],
        },
      ]}
    />
  )
}
