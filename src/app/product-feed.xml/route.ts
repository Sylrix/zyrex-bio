import { GOOGLE_PRODUCT_CATEGORY, products } from '@/lib/products'
import { absoluteUrl } from '@/lib/seo'
import { RUO_NOTICE, site } from '@/lib/site'
import { priceValue } from '@/lib/utils'

/**
 * Google Merchant Center RSS 2.0 feed.
 *
 * `force-static` is what lets a GET route handler survive `output: 'export'`, * the XML is written out at build time and served as a plain file.
 *
 * The research-use notice is inside every description on purpose. A shopping
 * feed for research chemicals that omits it is the fastest route to a policy
 * suspension.
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
      const description = `${product.vials} × ${product.strength} NAD+ supplied as a lyophilised powder in sealed glass vials at ${product.purity} purity. ${RUO_NOTICE}`

      return `    <item>
      <g:id>${escapeXml(product.sku)}</g:id>
      <g:title>${escapeXml(product.name)}</g:title>
      <g:description>${escapeXml(description)}</g:description>
      <g:link>${escapeXml(url)}</g:link>
      <g:image_link>${escapeXml(image)}</g:image_link>
      <g:availability>${product.stock === 'in_stock' ? 'in_stock' : 'out_of_stock'}</g:availability>
      <g:price>${priceValue(product.price)} ${site.currency}</g:price>
      <g:condition>new</g:condition>
      <g:brand>${escapeXml(site.name)}</g:brand>
      <g:mpn>${escapeXml(product.sku)}</g:mpn>
      <g:identifier_exists>no</g:identifier_exists>
      <g:google_product_category>${GOOGLE_PRODUCT_CATEGORY}</g:google_product_category>
      <g:product_type>Laboratory Supplies &gt; Research Chemicals &gt; NAD+</g:product_type>
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
    <title>${escapeXml(site.name)}, NAD+ research compounds</title>
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
