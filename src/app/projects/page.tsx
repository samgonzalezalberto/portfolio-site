import type { Metadata } from 'next'

import { ProjectCard } from '../../components/content/ProjectCard'
import { Grid } from '../../components/ui/Grid'
import { Section } from '../../components/ui/Section'
import { Typography } from '../../components/ui/Typography'
import { getAllProjects } from '../../lib/mdx'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A curated selection of projects across product and tooling.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Projects',
    description: 'A curated selection of projects across product and tooling.',
    url: '/projects',
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
    title: 'Projects',
    description: 'A curated selection of projects across product and tooling.',
    images: ['/og/default.png'],
  },
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <>
      <Section className="col-span-12">
        <Typography as="h1" className="mb-4">
          Projects
        </Typography>
        <Typography tone="muted" className="max-w-prose">
          Selected work across product, tooling, and design systems.
        </Typography>
      </Section>

      <Section className="col-span-12">
        <Typography as="h2" className="sr-only">
          Project list
        </Typography>
        <Grid cols={12} className="gap-6" aria-label="Projects grid">
          {projects.map((project) => (
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
