import type { MetadataRoute } from 'next'

import { getAllProjects } from '../lib/mdx'
import { getSiteUrl } from '../lib/site-url'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl()
  const projects = await getAllProjects()

  const staticRoutes = ['/', '/about', '/contact', '/projects']

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteUrl.origin}${path === '/' ? '' : path}`,
    })),
    ...projects.map((project) => ({
      url: `${siteUrl.origin}/projects/${project.slug}`,
    })),
  ]
}
