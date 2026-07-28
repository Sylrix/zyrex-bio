/**
 * Single source of truth for everything that identifies the business.
 *
 * Zyrex is run by one person as a sole trader. Nothing on this site may
 * describe it as a company, corporation, laboratory group, "we the team" or
 * anything else that implies an incorporated entity or staff. That wording is
 * both untrue and the exact thing that gets an individual merchant account
 * pulled. Keep the voice singular and personal.
 *
 * House rules for any customer facing copy added here or anywhere else:
 *  1. No dash punctuation. Use a comma, a full stop or the word "to".
 *  2. Do not describe what the checkout does not collect. State how payment is
 *     completed and stop there.
 *  3. Do not name the substance, and do not use category jargon for it. It is
 *     a high purity vial supplied for laboratory use. The "not for human or
 *     veterinary use" safety line always stays.
 */

export const site = {
  name: 'Zyrex',
  legalName: 'Zyrex',
  /** How the operator is described in copy. Sole trader, never a company. */
  ownership: 'independently owned and run by a single person (sole trader)',
  tagline: 'High purity vials, supplied for laboratory use only.',
  description:
    'Zyrex supplies high purity 500mg vials for laboratory use only. Independently run and dispatched from Bacchus Marsh, Victoria. Not for human or veterinary use.',
  /**
   * Where the site actually answers. Canonicals, JSON-LD @ids, the sitemap and
   * the product feed are all built from this, so it has to match reality. A
   * canonical pointing at a domain that does not resolve yet is worse than no
   * canonical at all. Set NEXT_PUBLIC_SITE_URL at build time; the fallback is
   * the current live URL.
   */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zyrex-bio.netlify.app'
  ).replace(/\/$/, ''),
  locale: 'en_AU',
  country: 'AU',
  currency: 'AUD',
  currencySymbol: '$',

  /** Verifies the property for Google Search Console and Merchant Center. */
  googleSiteVerification: 'ZFSF7P94tIXo8j8uFX6j_343SWZoyRAiI3rIoajPKg4',

  contact: {
    email: 'info@zyrexbioau.com',
    /** Sole trader with no staffed phone line, so email is the only channel. */
    phone: null as string | null,
    hours: 'Monday to Friday, 9:00am to 5:00pm AEST',
    responseWindow: '1 business day',
  },

  address: {
    line1: 'Hallets Way',
    line2: '',
    city: 'Bacchus Marsh',
    state: 'VIC',
    postcode: '3340',
    country: 'Australia',
    countryCode: 'AU',
  },

  /** Registered sole trader name shown on invoices and policies. */
  proprietor: 'the owner of Zyrex',

  shipping: {
    freeThreshold: 250,
    standardFee: 14.95,
    expressFee: 24.95,
    dispatchWindow: '1 to 2 business days',
    deliveryWindow: '2 to 6 business days Australia wide',
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
 * The safety line that has to appear anywhere a product is shown. Kept here so
 * it can never drift between pages. The substance name and category jargon are
 * deliberately absent; "not for human or veterinary use" is deliberately
 * present and must stay.
 */
export const RUO_NOTICE =
  'For laboratory use only. Not for human or veterinary use, not a therapeutic good, and not for diagnostic, cosmetic or food purposes.'

export const RUO_SHORT = 'Laboratory use only. Not for human consumption.'
