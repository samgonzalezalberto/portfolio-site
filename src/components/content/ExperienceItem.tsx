import { Typography } from '../ui/Typography'

type ExperienceItemProps = {
  role: string
  company: string
  startDate: string
  endDate: string
  location?: string
  description?: string
  className?: string
}

export function ExperienceItem({
  role,
  company,
  startDate,
  endDate,
  location,
  description,
  className,
}: ExperienceItemProps) {
  const classes = ['rounded-lg border border-muted p-6', className]
    .filter(Boolean)
    .join(' ')

  const dateRange = `${startDate} – ${endDate}`
  const meta = [company, location].filter(Boolean).join(' • ')

  return (
    <article className={classes}>
      <Typography as="h3" className="mb-1">
        {role}
      </Typography>
      <Typography tone="muted" className="mb-3">
        {meta}
      </Typography>
      <Typography tone="muted" className="mb-3">
        {dateRange}
      </Typography>
      {description ? <Typography>{description}</Typography> : null}
    </article>
  )
}
