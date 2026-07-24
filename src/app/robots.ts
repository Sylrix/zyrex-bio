import type { MetadataRoute } from 'next'

import { absoluteUrl } from '@/lib/seo'

/** Required for metadata routes under `output: 'export'`. */
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // These three hold a live cart or a personal order reference. Nothing
        // there is useful in an index and some of it is personal.
        disallow: ['/cart/', '/checkout/', '/order-confirmed/'],
      },
    ],
    sitemap: `${absoluteUrl('/sitemap.xml').replace(/\/$/, '')}`,
    host: absoluteUrl('/').replace(/\/$/, ''),
  }
}
