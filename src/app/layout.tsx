import type { ReactNode } from 'react'

import type { Metadata, Viewport } from 'next'

import './globals.css'

import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { GridContainer } from '../components/ui/GridContainer'
import { getSiteUrl } from '../lib/site-url'

const siteUrl = getSiteUrl()

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: 'Portfolio',
    template: '%s | Portfolio',
  },
  description: 'A component-driven portfolio powered by file-based MDX content.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    siteName: 'Portfolio',
    images: [
      {
        url: '/og/default.png',
        width: 1200,
        height: 630,
        alt: 'Portfolio preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og/default.png'],
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <a
          href="#page-root"
          className="sr-only focus:not-sr-only focus-ring interactive-transition fixed left-4 top-4 z-50 rounded-md bg-canvas px-3 py-2 text-foreground"
        >
          Skip to Content
        </a>
        <Header />
        <GridContainer as="main" className="pt-24 pb-32">
          <div id="page-root" tabIndex={-1} className="grid grid-cols-swiss">
            {children}
          </div>
        </GridContainer>
        <Footer />
      </body>
    </html>
  )
}
