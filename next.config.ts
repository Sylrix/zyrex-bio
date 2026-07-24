import type { NextConfig } from 'next'

/**
 * The site ships as a folder of static HTML — that is what GitHub Pages serves.
 *
 * `basePath` is empty for the custom domain (zyrexbioau.com, set in
 * `public/CNAME`). If you ever publish to `sylrix.github.io/zyrex-bio` instead,
 * set NEXT_PUBLIC_BASE_PATH=/zyrex-bio before `npm run build` and every asset,
 * link and image picks the prefix up automatically.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  // Pages has no rewrite layer, so /about must resolve to /about/index.html.
  trailingSlash: true,
  images: {
    // No Node server at runtime means no on-the-fly image optimisation.
    unoptimized: true,
  },
  reactStrictMode: true,
}

export default nextConfig
