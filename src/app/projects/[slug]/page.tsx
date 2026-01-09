import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import fs from 'node:fs/promises'
import path from 'node:path'

import { Grid } from '../../../components/ui/Grid'
import { Section } from '../../../components/ui/Section'
import { Typography } from '../../../components/ui/Typography'
import { getAllProjects } from '../../../lib/mdx'

type PageProps = {
  params: {
    slug: string
  }
}

function ogImageForProject(slug: string) {
  return `/og/projects/${slug}.png`
}

async function assertOgImageExists(publicPath: string) {
  const absolutePath = path.join(process.cwd(), 'public', publicPath)
  await fs.access(absolutePath)
}

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const projects = await getAllProjects()
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) return {}

  const title = project.title
  const description = project.description
  const canonical = `/projects/${project.slug}`
  const imageUrl = ogImageForProject(project.slug)

  try {
    await assertOgImageExists(imageUrl)
  } catch {
    throw new Error(
      `Missing Open Graph image for project "${project.slug}": expected public${imageUrl}`,
    )
  }

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const projects = await getAllProjects()
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) notFound()

  return (
    <>
      <Section className="col-span-12">
        <Typography as="h1" className="mb-4">
          {project.title}
        </Typography>
        <Typography tone="muted" className="max-w-prose">
          {project.description}
        </Typography>
      </Section>

      <Section className="col-span-12">
        <Typography as="h2" className="mb-6">
          Details
        </Typography>

        <Grid cols={12}>
          <div className="col-span-12">
            {project.technologies.length > 0 ? (
              <div>
                <Typography tone="muted" className="mb-2">
                  Technologies
                </Typography>
                <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="inline-flex items-center rounded-full border border-muted px-2 py-1 font-mono text-xs text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {(project.repoUrl || project.liveUrl) && (
              <div className="mt-4 flex gap-4">
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
          </div>
        </Grid>
      </Section>
    </>
  )
}
