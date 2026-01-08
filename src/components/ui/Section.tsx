import type { ReactNode } from 'react'

type SectionProps = {
  children: ReactNode
  className?: string
}

export function Section({ children, className }: SectionProps) {
  const classes = ['py-12', className].filter(Boolean).join(' ')

  return <section className={classes}>{children}</section>
}
