/**
 * Single source of truth for everything that identifies the business.
 *
 * Zyrex Bio is run by one person as a sole trader. Nothing on this site may
 * describe it as a company, corporation, laboratory group, "we the team" or
 * anything else that implies an incorporated entity or staff — that wording is
 * both untrue and the exact thing that gets an individual merchant account
 * pulled. Keep the voice singular and personal.
 *
 * >>> BEFORE GOING LIVE: replace the address, ABN and email below with the
 * >>> real registered details. They are placeholders that look plausible so
 * >>> the layout can be reviewed, and nothing else.
 */

export const site = {
  name: 'Zyrex Bio',
  legalName: 'Zyrex Bio',
  /** How the operator is described in copy. Sole trader, never a company. */
  ownership: 'independently owned and run by a single person (sole trader)',
  tagline: 'NAD+ research compounds, supplied for laboratory use only.',
  description:
    'Zyrex Bio supplies NAD+ research compounds at 99% purity for laboratory and research use only. Independently run and dispatched from Melbourne, Australia. Not for human or veterinary use.',
  url: 'https://www.zyrexbioau.com',
  locale: 'en_AU',
  country: 'AU',
  currency: 'AUD',
  currencySymbol: '$',

  contact: {
    email: 'support@zyrexbioau.com',
    /** Sole trader with no staffed phone line — email is the only channel. */
    phone: null as string | null,
    hours: 'Monday to Friday, 9:00am – 5:00pm AEST',
    responseWindow: '1 business day',
  },

  address: {
    line1: '12 Barkly Street',
    line2: 'Suite 4',
    city: 'Brunswick',
    state: 'VIC',
    postcode: '3056',
    country: 'Australia',
    countryCode: 'AU',
  },

  /** Australian Business Number held by the individual, not a company. */
  abn: '00 000 000 000',

  /** Registered sole trader name shown on invoices and policies. */
  proprietor: 'the owner of Zyrex Bio',

  shipping: {
    freeThreshold: 250,
    standardFee: 14.95,
    expressFee: 24.95,
    dispatchWindow: '1–2 business days',
    deliveryWindow: '2–6 business days Australia-wide',
    carrier: 'Australia Post',
  },

  social: {
    instagram: 'https://www.instagram.com/',
    tiktok: 'https://www.tiktok.com/',
  },

  founded: '2024',
} as const

export const fullAddress = [
  site.address.line2,
  site.address.line1,
  `${site.address.city} ${site.address.state} ${site.address.postcode}`,
  site.address.country,
]
  .filter(Boolean)
  .join(', ')

export const shortAddress = `${site.address.city} ${site.address.state}, ${site.address.country}`

/**
 * The compliance line that has to appear anywhere a product is shown.
 * Kept here so it can never drift between pages.
 */
export const RUO_NOTICE =
  'For laboratory research use only. Not for human or veterinary use, not a therapeutic good, and not for diagnostic, cosmetic or food purposes.'

export const RUO_SHORT = 'Research use only — not for human consumption.'
