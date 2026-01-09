import type { Metadata } from 'next'

import { IndexList } from '../../components/ui/IndexList'
import { Grid, GridItem } from '../../components/ui/Grid'
import { Section } from '../../components/ui/Section'
import { TypographicBody, TypographicHeading, Typography } from '../../components/ui/Typography'
import { getAllExperiences } from '../../lib/mdx'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Background, experience, and the principles behind this portfolio site.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About',
    description:
      'Background, experience, and the principles behind this portfolio site.',
    url: '/about',
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
    title: 'About',
    description:
      'Background, experience, and the principles behind this portfolio site.',
    images: ['/og/default.png'],
  },
}

export default async function AboutPage() {
  const experiences = await getAllExperiences()

  return (
    <Grid cols={12} className="col-span-12">
      <GridItem span={{ base: 12, md: 5 }}>
        <Section>
          <TypographicHeading as="h1" className="mb-6">
            About
          </TypographicHeading>
          <TypographicBody tone="muted" className="max-w-[65ch]">
            I build clean, accessible interfaces with a focus on systems and
            maintainability.
          </TypographicBody>

          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="https://github.com/samgonzalezalberto"
              className="font-sans text-xs text-accent underline focus-ring interactive-transition"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="/resume.pdf"
              download
              className="font-sans text-xs text-accent underline focus-ring interactive-transition"
            >
              Resume (PDF)
            </a>
          </div>
        </Section>

        <Section>
          <Typography as="h2" className="mb-6">
            Experience
          </Typography>

          <IndexList aria-label="Experience">
            {experiences.map((exp) => {
              const dateRange = exp.endDate ? `${exp.startDate} – ${exp.endDate}` : exp.startDate
              const meta = [exp.company, exp.location].filter(Boolean).join(' • ')

              return (
                <IndexList.Item
                  key={exp.slug}
                  meta={
                    <Typography as="p" variant="mono" tone="muted" className="text-xs">
                      {dateRange}
                    </Typography>
                  }
                >
                  <Typography as="h3" className="mb-1 text-2xl tracking-tighter md:text-3xl">
                    {exp.role}
                  </Typography>
                  <Typography tone="muted" className="mb-3">
                    {meta}
                  </Typography>
                  {exp.description ? <Typography>{exp.description}</Typography> : null}
                </IndexList.Item>
              )
            })}
          </IndexList>
        </Section>
      </GridItem>

      <GridItem span={{ md: 7 }} className="hidden md:block">
        {null}
      </GridItem>
    </Grid>
  )
}
