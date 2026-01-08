import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

type ProjectFrontmatter = {
  title: unknown
  description: unknown
  technologies: unknown
  repoUrl?: unknown
  liveUrl?: unknown
  featured: unknown
  date: unknown
}

type ExperienceFrontmatter = {
  company: unknown
  role: unknown
  startDate: unknown
  endDate: unknown
  location: unknown
}

export type Project = {
  title: string
  description: string
  technologies: string[]
  repoUrl?: string
  liveUrl?: string
  featured: boolean
  date: string
  slug: string
}

export type Experience = {
  company: string
  role: string
  startDate: string
  endDate: string
  location: string
  description: string
  slug: string
}

const CONTENT_ROOT = path.join(process.cwd(), 'src', 'content')

function assertString(value: unknown, fieldName: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`Invalid ${fieldName}: expected non-empty string`)
  }
  return value
}

function assertBoolean(value: unknown, fieldName: string): boolean {
  if (typeof value !== 'boolean') {
    throw new Error(`Invalid ${fieldName}: expected boolean`)
  }
  return value
}

function assertStringArray(value: unknown, fieldName: string): string[] {
  if (!Array.isArray(value) || value.some((v) => typeof v !== 'string')) {
    throw new Error(`Invalid ${fieldName}: expected string[]`)
  }
  return value as string[]
}

function optionalString(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx$/i, '')
}

async function readMdxFile(filePath: string) {
  const raw = await fs.readFile(filePath, 'utf8')
  return matter(raw)
}

export async function getAllProjects(): Promise<Project[]> {
  const dir = path.join(CONTENT_ROOT, 'projects')
  const entries = await fs.readdir(dir)
  const mdxFiles = entries.filter((f) => f.endsWith('.mdx'))

  const projects = await Promise.all(
    mdxFiles.map(async (filename) => {
      const filePath = path.join(dir, filename)
      const { data } = await readMdxFile(filePath)
      const frontmatter = data as ProjectFrontmatter

      return {
        title: assertString(frontmatter.title, 'Project.title'),
        description: assertString(frontmatter.description, 'Project.description'),
        technologies: assertStringArray(frontmatter.technologies, 'Project.technologies'),
        repoUrl: optionalString(frontmatter.repoUrl),
        liveUrl: optionalString(frontmatter.liveUrl),
        featured: assertBoolean(frontmatter.featured, 'Project.featured'),
        date: assertString(frontmatter.date, 'Project.date'),
        slug: slugFromFilename(filename),
      } satisfies Project
    }),
  )

  return projects.sort((a, b) => b.date.localeCompare(a.date))
}

export async function getAllExperiences(): Promise<Experience[]> {
  const dir = path.join(CONTENT_ROOT, 'experience')
  const entries = await fs.readdir(dir)
  const mdxFiles = entries.filter((f) => f.endsWith('.mdx'))

  const experiences = await Promise.all(
    mdxFiles.map(async (filename) => {
      const filePath = path.join(dir, filename)
      const { data, content } = await readMdxFile(filePath)
      const frontmatter = data as ExperienceFrontmatter

      return {
        company: assertString(frontmatter.company, 'Experience.company'),
        role: assertString(frontmatter.role, 'Experience.role'),
        startDate: assertString(frontmatter.startDate, 'Experience.startDate'),
        endDate: assertString(frontmatter.endDate, 'Experience.endDate'),
        location: assertString(frontmatter.location, 'Experience.location'),
        description: content.trim(),
        slug: slugFromFilename(filename),
      } satisfies Experience
    }),
  )

  return experiences.sort((a, b) => b.startDate.localeCompare(a.startDate))
}
