import Link from 'next/link'

import type { Metadata } from 'next'

import { Section } from '../components/ui/Section'
import { Typography } from '../components/ui/Typography'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <Section className="col-span-12">
      <Typography as="h1" className="mb-4">
        Not Found
      </Typography>
      <Typography tone="muted" className="max-w-prose">
        The page you’re looking for doesn’t exist.
      </Typography>
      <div className="mt-6">
        <Link href="/" className="font-sans text-sm text-accent underline">
          Go back home
        </Link>
      </div>
    </Section>
  )
}
