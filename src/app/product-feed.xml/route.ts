import { GOOGLE_PRODUCT_CATEGORY, products } from '@/lib/products'
import { absoluteUrl } from '@/lib/seo'
import { RUO_NOTICE, site } from '@/lib/site'
import { priceValue } from '@/lib/utils'

/**
 * Google Merchant Center RSS 2.0 feed.
 *
 * `force-static` is what lets a GET route handler survive `output: 'export'`, * the XML is written out at build time and served as a plain file.
 *
 * The laboratory use notice is inside every description on purpose. A shopping
 * feed for laboratory materials that omits it is the fastest route to a policy
 * suspension.
 *
 * Two things here are deliberate and easy to "tidy" back into bugs:
 *
 *  - title, link and description are plain RSS 2.0 core elements, not g:
 *    namespaced. Google documents both spellings inconsistently, and the core
 *    elements are the ones an RSS parser is guaranteed to read. Using the
 *    unambiguous form removes a whole class of "missing required attribute".
 *
 *  - There is no identifier_exists. It means "this product has no GTIN and no
 *    brand plus MPN", which would contradict the brand and mpn sent below.
 *    These vials have no GTIN, but brand plus MPN is a valid identifier pair,
 *    so the attribute is simply omitted and defaults to yes.
 */
export const dynamic = 'force-static'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function GET() {
  const items = products
    .map((product) => {
      const url = absoluteUrl(`/product/${product.slug}`)
      const image = absoluteUrl(product.image).replace(/\/$/, '')
      const description = `${product.vials} × ${product.strength} Zyrex 500mg supplied as a lyophilised powder in sealed glass vials at ${product.purity} purity. ${RUO_NOTICE}`

      return `    <item>
      <g:id>${escapeXml(product.sku)}</g:id>
      <title>${escapeXml(product.name)}</title>
      <link>${escapeXml(url)}</link>
      <description>${escapeXml(description)}</description>
      <g:image_link>${escapeXml(image)}</g:image_link>
      <g:availability>${product.stock === 'in_stock' ? 'in_stock' : 'out_of_stock'}</g:availability>
      <g:price>${priceValue(product.price)} ${site.currency}</g:price>
      <g:condition>new</g:condition>
      <g:brand>${escapeXml(site.name)}</g:brand>
      <g:mpn>${escapeXml(product.sku)}</g:mpn>
      <g:google_product_category>${GOOGLE_PRODUCT_CATEGORY}</g:google_product_category>
      <g:product_type>Laboratory Supplies &gt; Reference Materials</g:product_type>
      <g:adult>no</g:adult>
      <g:shipping>
        <g:country>AU</g:country>
        <g:service>Standard tracked</g:service>
        <g:price>${priceValue(product.price >= site.shipping.freeThreshold ? 0 : site.shipping.standardFee)} ${site.currency}</g:price>
      </g:shipping>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${escapeXml(site.name)}, Zyrex 500mg laboratory materials</title>
    <link>${escapeXml(absoluteUrl('/'))}</link>
    <description>${escapeXml(site.description)}</description>
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
