import type { ReactNode } from 'react'

type GridContainerProps = {
  children: ReactNode
  as?: 'div' | 'main' | 'section'
  className?: string
}

export function GridContainer({
  children,
  as: Component = 'div',
  className,
}: GridContainerProps) {
  const classes = ['mx-auto', 'w-full', 'max-w-screen-2xl', 'px-gutter', className]
    .filter(Boolean)
    .join(' ')

  return <Component className={classes}>{children}</Component>
}
