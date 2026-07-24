import type { Metadata } from 'next'

import type { Product } from '@/lib/products'
import { RUO_NOTICE, fullAddress, site } from '@/lib/site'
import { priceValue } from '@/lib/utils'

/** Absolute URL for a route. Every canonical and JSON-LD `@id` goes through here. */
export function absoluteUrl(path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  const trailing = clean === '/' ? '/' : clean.endsWith('/') ? clean : `${clean}/`
  return `${site.url}${trailing}`
}

interface PageMetaInput {
  readonly title: string
  readonly description: string
  readonly path: string
  readonly image?: string
  readonly keywords?: readonly string[]
  readonly noIndex?: boolean
}

/**
 * Build page metadata with a canonical that always matches the exported path.
 * A canonical that disagrees with the served URL is worse than none at all.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = '/products/nad-plus-500mg.webp',
  keywords,
  noIndex,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path)

  return {
    title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: 'website',
      url,
      siteName: site.name,
      title,
      description,
      locale: site.locale,
      images: [{ url: absoluteUrl(image).replace(/\/$/, ''), width: 1200, height: 1200, alt: site.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl(image).replace(/\/$/, '')],
    },
  }
}

type Json = Record<string, unknown>

/**
 * Organisation markup for a one person business.
 *
 * `OnlineStore` is a Schema.org type, not a claim of incorporation, the copy
 * in `description` states plainly that this is a sole trader, and no employee
 * count, founder team or corporate structure is asserted anywhere.
 */
export function storeJsonLd(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    '@id': `${site.url}/#store`,
    name: site.name,
    url: absoluteUrl('/'),
    description: `${site.description} Zyrex Bio is ${site.ownership}.`,
    email: site.contact.email,
    currenciesAccepted: site.currency,
    paymentAccepted: 'Credit Card, Bank Transfer, PayID, Apple Pay, Google Pay',
    areaServed: { '@type': 'Country', name: 'Australia' },
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${site.address.line2}, ${site.address.line1}`,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postcode,
      addressCountry: site.address.countryCode,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: site.contact.email,
      availableLanguage: 'English',
      areaServed: 'AU',
    },
  }
}

export function websiteJsonLd(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: absoluteUrl('/'),
    name: site.name,
    description: site.description,
    inLanguage: 'en-AU',
    publisher: { '@id': `${site.url}/#store` },
  }
}

export function productJsonLd(product: Product): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${site.url}/product/${product.slug}/#product`,
    name: product.name,
    description: `${product.summary} ${RUO_NOTICE}`,
    sku: product.sku,
    mpn: product.sku,
    image: [absoluteUrl(product.image).replace(/\/$/, '')],
    brand: { '@type': 'Brand', name: site.name },
    category: 'Laboratory Research Chemicals',
    url: absoluteUrl(`/product/${product.slug}`),
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Purity', value: product.purity },
      { '@type': 'PropertyValue', name: 'Strength', value: product.strength },
      { '@type': 'PropertyValue', name: 'Vials per pack', value: String(product.vials) },
      { '@type': 'PropertyValue', name: 'Intended use', value: 'Research use only' },
    ],
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(`/product/${product.slug}`),
      priceCurrency: site.currency,
      price: priceValue(product.price),
      itemCondition: 'https://schema.org/NewCondition',
      availability:
        product.stock === 'in_stock'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      seller: { '@id': `${site.url}/#store` },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: priceValue(
            product.price >= site.shipping.freeThreshold
              ? 0
              : site.shipping.standardFee
          ),
          currency: site.currency,
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'AU',
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'AU',
        returnPolicyCategory:
          'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/ReturnShippingFees',
      },
    },
  }
}

export function breadcrumbJsonLd(
  trail: ReadonlyArray<{ name: string; path: string }>
): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  }
}

export function faqJsonLd(
  entries: ReadonlyArray<{ q: string; a: string }>
): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.q,
      acceptedAnswer: { '@type': 'Answer', text: entry.a },
    })),
  }
}

export function itemListJsonLd(
  products: readonly Product[],
  path: string
): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${absoluteUrl(path)}#list`,
    name: `${site.name} catalogue`,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/product/${product.slug}`),
      name: product.name,
    })),
  }
}

export function contactPageJsonLd(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${site.url}/contact/#page`,
    url: absoluteUrl('/contact'),
    name: `Contact ${site.name}`,
    description: `Email ${site.contact.email}. Orders are packed and dispatched from ${fullAddress}.`,
  }
}
