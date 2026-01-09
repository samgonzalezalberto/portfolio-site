import { Typography } from '../ui/Typography'
import { SkillBadge } from './SkillBadge'

type ProjectCardProps = {
  title: string
  description: string
  technologies: string[]
  repoUrl?: string
  liveUrl?: string
  className?: string
}

export function ProjectCard({
  title,
  description,
  technologies,
  repoUrl,
  liveUrl,
  className,
}: ProjectCardProps) {
  const classes = [
    'rounded-lg border border-muted p-6',
    'bg-canvas text-foreground',
    'interactive-transition',
    'hover:border-accent hover:shadow-md',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const hasLinks = Boolean(repoUrl || liveUrl)

  return (
    <article className={classes}>
      <Typography as="h3" className="mb-2">
        {title}
      </Typography>
      <Typography tone="muted" className="mb-4">
        {description}
      </Typography>

      {technologies.length > 0 ? (
        <ul className="mb-4 flex flex-wrap gap-2" aria-label="Technologies">
          {technologies.map((tech) => (
            <li key={tech}>
              <SkillBadge label={tech} />
            </li>
          ))}
        </ul>
      ) : null}

      {hasLinks ? (
        <div className="flex gap-4">
          {repoUrl ? (
            <a
              href={repoUrl}
              className="font-sans text-sm text-accent underline"
              rel="noreferrer"
            >
              Code
            </a>
          ) : null}
          {liveUrl ? (
            <a
              href={liveUrl}
              className="font-sans text-sm text-accent underline"
              rel="noreferrer"
            >
              Demo
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  )
}
