import type { ReactNode } from 'react'

import './globals.css'

import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { GridContainer } from '../components/ui/GridContainer'

export const metadata = {
  title: {
    default: 'Portfolio',
    template: '%s | Portfolio',
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
        <GridContainer as="main" className="py-10">
          <div id="page-root" tabIndex={-1} className="grid grid-cols-swiss">
            {children}
          </div>
        </GridContainer>
        <Footer />
      </body>
    </html>
  )
}
