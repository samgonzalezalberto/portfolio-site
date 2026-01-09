import type { Metadata } from 'next'

import { ExperienceItem } from '../../components/content/ExperienceItem'
import { Grid } from '../../components/ui/Grid'
import { Section } from '../../components/ui/Section'
import { Typography } from '../../components/ui/Typography'
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
    <>
      <Section className="col-span-12">
        <Typography as="h1" className="mb-4">
          About
        </Typography>
        <Typography tone="muted" className="max-w-prose">
          I build clean, accessible interfaces with a focus on systems and
          maintainability.
        </Typography>

        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href="https://github.com/example"
            className="font-sans text-sm text-accent underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="/resume.pdf"
            download
            className="font-sans text-sm text-accent underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            Resume (PDF)
          </a>
        </div>
      </Section>

      <Section className="col-span-12">
        <Typography as="h2" className="mb-6">
          Experience
        </Typography>
        <Grid cols={12} className="gap-6">
          {experiences.map((exp) => (
            <div key={exp.slug} className="col-span-12">
              <ExperienceItem
                role={exp.role}
                company={exp.company}
                startDate={exp.startDate}
                endDate={exp.endDate}
                location={exp.location}
                description={exp.description}
              />
            </div>
          ))}
        </Grid>
      </Section>
    </>
  )
}
