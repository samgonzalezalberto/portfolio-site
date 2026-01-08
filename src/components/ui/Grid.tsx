import type { ReactNode } from 'react'

type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type GridProps = {
  children: ReactNode
  as?: 'div' | 'section' | 'ul' | 'ol'
  cols?: GridCols
  className?: string
}

const COLS_CLASS: Record<GridCols, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-swiss',
}

export function Grid({
  children,
  as: Component = 'div',
  cols = 12,
  className,
}: GridProps) {
  const classes = ['grid', COLS_CLASS[cols], className].filter(Boolean).join(' ')

  return <Component className={classes}>{children}</Component>
}
