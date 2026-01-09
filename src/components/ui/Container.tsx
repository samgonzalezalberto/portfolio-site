import type { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  as?: 'div' | 'main' | 'section' | 'header' | 'footer' | 'article' | 'aside'
  className?: string
}

export function Container({
  children,
  as: Component = 'div',
  className,
}: ContainerProps) {
  const classes = ['mx-auto', 'w-full', 'max-w-screen-xl', 'px-gutter', className]
    .filter(Boolean)
    .join(' ')

  return <Component className={classes}>{children}</Component>
}
