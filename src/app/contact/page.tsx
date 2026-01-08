import { Section } from '../../components/ui/Section'
import { Typography } from '../../components/ui/Typography'

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
            <a
              href="mailto:hello@example.com"
              className="font-sans text-sm text-accent underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            >
              hello@example.com
            </a>
          </div>

          <div>
            <Typography tone="muted" className="mb-1">
              Links
            </Typography>
            <div className="flex gap-4">
              <a
                href="https://example.com"
                className="font-sans text-sm text-accent underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                rel="noreferrer"
              >
                Website
              </a>
              <a
                href="https://example.com"
                className="font-sans text-sm text-accent underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
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
