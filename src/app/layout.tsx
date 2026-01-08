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
        <Header />
        <GridContainer as="main" className="py-10">
          <div id="page-root" className="grid grid-cols-swiss">
            {children}
          </div>
        </GridContainer>
        <Footer />
      </body>
    </html>
  )
}
