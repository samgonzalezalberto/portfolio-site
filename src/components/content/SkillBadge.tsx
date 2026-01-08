type SkillBadgeProps = {
  label: string
  className?: string
}

export function SkillBadge({ label, className }: SkillBadgeProps) {
  const classes = [
    'inline-flex items-center rounded-full border border-muted px-2 py-1',
    'font-mono text-xs text-muted',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <span className={classes}>{label}</span>
}
