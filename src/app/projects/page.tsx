import type { Metadata } from 'next'

import { IndexList } from '../../components/ui/IndexList'
import { Grid, GridItem } from '../../components/ui/Grid'
import { Section } from '../../components/ui/Section'
import { TypographicBody, TypographicHeading, Typography } from '../../components/ui/Typography'
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
    <Grid cols={12} className="col-span-12">
      <GridItem span={{ base: 12, md: 5 }}>
        <Section>
          <TypographicHeading as="h1" className="mb-6">
            Projects
          </TypographicHeading>
          <TypographicBody tone="muted" className="max-w-[65ch]">
            Selected work across product, tooling, and design systems.
          </TypographicBody>
        </Section>

        <Section>
          <Typography as="h2" className="sr-only">
            Project list
          </Typography>

          <IndexList aria-label="Projects">
            {projects.map((project) => (
              <IndexList.Item
                key={project.slug}
                meta={
                  project.date ? (
                    <Typography as="p" variant="mono" tone="muted" className="text-xs">
                      {project.date}
                    </Typography>
                  ) : null
                }
              >
                <Typography as="h3" className="mb-2 break-words text-3xl tracking-tighter md:text-4xl">
                  {project.title}
                </Typography>
                <Typography tone="muted" className="mb-4 max-w-[65ch]">
                  {project.description}
                </Typography>

                {project.technologies.length > 0 ? (
                  <ul className="mb-4 flex flex-wrap gap-2" aria-label="Technologies">
                    {project.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="inline-flex items-center rounded-full border border-muted px-2 py-1 font-mono text-xs text-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {(project.repoUrl || project.liveUrl) && (
                  <div className="flex gap-4">
                    {project.repoUrl ? (
                      <a
                        href={project.repoUrl}
                        className="font-sans text-xs text-accent underline focus-ring interactive-transition"
                        rel="noreferrer"
                      >
                        Code
                      </a>
                    ) : null}
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        className="font-sans text-xs text-accent underline focus-ring interactive-transition"
                        rel="noreferrer"
                      >
                        Demo
                      </a>
                    ) : null}
                  </div>
                )}
              </IndexList.Item>
            ))}
          </IndexList>
        </Section>
      </GridItem>

      <GridItem span={{ md: 7 }} className="hidden md:block">
        {null}
      </GridItem>
    </Grid>
  )
}
