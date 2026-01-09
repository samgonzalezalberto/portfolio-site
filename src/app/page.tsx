import Link from 'next/link'

import type { Metadata } from 'next'

import { ProjectCard } from '../components/content/ProjectCard'
import { Grid } from '../components/ui/Grid'
import { Section } from '../components/ui/Section'
import { Typography } from '../components/ui/Typography'
import { getAllProjects } from '../lib/mdx'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'A component-driven portfolio powered by file-based MDX content.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Portfolio',
    description: 'A component-driven portfolio powered by file-based MDX content.',
    url: '/',
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
    title: 'Portfolio',
    description: 'A component-driven portfolio powered by file-based MDX content.',
    images: ['/og/default.png'],
  },
}

export default async function HomePage() {
  const projects = await getAllProjects()
  const featured = projects.filter((p) => p.featured).slice(0, 2)

  return (
    <>
      <Section className="col-span-12">
        <Typography as="h1" className="mb-4">
          Portfolio
        </Typography>
        <Typography tone="muted" className="max-w-prose">
          A component-driven portfolio powered by file-based MDX content.
        </Typography>
        <div className="mt-6">
          <Link
            href="/projects"
            className="font-sans text-sm text-accent underline"
          >
            See all projects
          </Link>
        </div>
      </Section>

      <Section className="col-span-12">
        <Typography as="h2" className="mb-6">
          Featured
        </Typography>
        <Grid cols={12} className="gap-6">
          {featured.map((project) => (
            <div key={project.slug} className="col-span-12 md:col-span-6">
              <ProjectCard
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                repoUrl={project.repoUrl}
                liveUrl={project.liveUrl}
              />
            </div>
          ))}
        </Grid>
      </Section>
    </>
  )
}
