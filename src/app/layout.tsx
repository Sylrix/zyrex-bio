import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google'

import './globals.css'

import { CartDrawer } from '@/components/cart/cart-drawer'
import { CartProvider } from '@/components/cart/cart-provider'
import { AnnouncementBar } from '@/components/layout/announcement-bar'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { ScrollProgress } from '@/components/motion/scroll-progress'
import { absoluteUrl, storeJsonLd, websiteJsonLd } from '@/lib/seo'
import { site } from '@/lib/site'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
})

const space = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-space',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | High Purity Lab Vials, 99% Purity | Australia`,
    template: `%s | ${site.name}`,
  },
  verification: {
    // Verifies the property for Google Search Console and Merchant Center.
    google: site.googleSiteVerification,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'Zyrex 500mg vial',
    'high purity lab vial Australia',
    'laboratory vials 99% purity',
    'buy Zyrex 500mg Australia',
    'laboratory supplies Australia',
    'sealed glass vial 500mg',
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: absoluteUrl('/') },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale,
    url: absoluteUrl('/'),
    title: `${site.name} High Purity Lab Vials, 99% Purity`,
    description: site.description,
    images: [
      {
        url: '/products/zyrex-500mg.webp',
        width: 1200,
        height: 1200,
        alt: 'Zyrex 500mg vial',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} High Purity Lab Vials`,
    description: site.description,
    images: ['/products/zyrex-500mg.webp'],
  },
  category: 'Laboratory supplies',
  formatDetection: { telephone: false, address: false, email: false },
}

export const viewport: Viewport = {
  themeColor: '#0b5cff',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-AU"
      className={`${bricolage.variable} ${jakarta.variable} ${space.variable}`}
    >
      <body className="antialiased">
        {/* Site-wide graph. Page-level JSON-LD references these by @id. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([storeJsonLd(), websiteJsonLd()]),
          }}
        />

        <a
          href="#main"
          className="visually-hidden focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:h-auto focus:w-auto focus:rounded-full focus:border-2 focus:border-ink focus:bg-lime focus:px-4 focus:py-2 focus:font-display focus:font-extrabold"
        >
          Skip to content
        </a>

        <CartProvider>
          <ScrollProgress />
          <AnnouncementBar />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}
