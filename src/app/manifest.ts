import type { MetadataRoute } from 'next'

import { site } from '@/lib/site'

/** Required for metadata routes under `output: 'export'`. */
export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name}, NAD+ Research Compounds`,
    short_name: site.name,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#fbfbfe',
    theme_color: '#0b5cff',
    lang: 'en-AU',
    categories: ['shopping', 'science'],
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  }
}
