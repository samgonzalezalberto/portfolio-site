import type { Metadata } from 'next'

import { Section } from '../../components/ui/Section'
import { Typography } from '../../components/ui/Typography'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'How to reach me and where to find my work online.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact',
    description: 'How to reach me and where to find my work online.',
    url: '/contact',
    type: 'website',
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
    title: 'Contact',
    description: 'How to reach me and where to find my work online.',
    images: ['/og/default.png'],
  },
}

export default function ContactPage() {
  return (
    <>
      <Section className="col-span-12">
        <Typography as="h1" className="mb-4">
          Contact
        </Typography>
        <Typography tone="muted" className="mb-6 max-w-prose">
          Reach out via email or connect on the platforms below.
        </Typography>

        <div className="space-y-3">
          <div>
            <Typography tone="muted" className="mb-1">
              Email
            </Typography>
            <p className="font-sans text-xs text-foreground">samgonzalezalberto@gmail.com</p>
          </div>

          <div>
            <Typography tone="muted" className="mb-1">
              Links
            </Typography>
            <div className="flex gap-4">
              <a
                href="https://example.com"
                className="font-sans text-xs text-accent underline focus-ring interactive-transition"
                rel="noreferrer"
              >
                Website
              </a>
              <a
                href="https://github.com/samgonzalezalberto"
                className="font-sans text-xs text-accent underline focus-ring interactive-transition"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
