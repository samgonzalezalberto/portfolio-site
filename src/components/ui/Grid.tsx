import type { ReactNode } from 'react'

type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl'

type ResponsiveValue<T> =
  | T
  | {
      base?: T
      sm?: T
      md?: T
      lg?: T
      xl?: T
    }

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
  const classes = ['grid', COLS_CLASS[cols], 'gap-gutter', className]
    .filter(Boolean)
    .join(' ')

  return <Component className={classes}>{children}</Component>
}

type GridItemProps = {
  children: ReactNode
  as?: 'div' | 'section' | 'li' | 'article' | 'aside'
  span?: ResponsiveValue<GridCols>
  start?: ResponsiveValue<GridCols>
  className?: string
}

// Tailwind only generates classes it can statically detect in source.
// Because `GridItem` spans/starts are computed from props, we must enumerate
// the possible class strings here so the production CSS bundle includes them.
const COL_SPAN_CLASSES: Record<Breakpoint, Record<GridCols, string>> = {
  base: {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12',
  },
  sm: {
    1: 'sm:col-span-1',
    2: 'sm:col-span-2',
    3: 'sm:col-span-3',
    4: 'sm:col-span-4',
    5: 'sm:col-span-5',
    6: 'sm:col-span-6',
    7: 'sm:col-span-7',
    8: 'sm:col-span-8',
    9: 'sm:col-span-9',
    10: 'sm:col-span-10',
    11: 'sm:col-span-11',
    12: 'sm:col-span-12',
  },
  md: {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    4: 'md:col-span-4',
    5: 'md:col-span-5',
    6: 'md:col-span-6',
    7: 'md:col-span-7',
    8: 'md:col-span-8',
    9: 'md:col-span-9',
    10: 'md:col-span-10',
    11: 'md:col-span-11',
    12: 'md:col-span-12',
  },
  lg: {
    1: 'lg:col-span-1',
    2: 'lg:col-span-2',
    3: 'lg:col-span-3',
    4: 'lg:col-span-4',
    5: 'lg:col-span-5',
    6: 'lg:col-span-6',
    7: 'lg:col-span-7',
    8: 'lg:col-span-8',
    9: 'lg:col-span-9',
    10: 'lg:col-span-10',
    11: 'lg:col-span-11',
    12: 'lg:col-span-12',
  },
  xl: {
    1: 'xl:col-span-1',
    2: 'xl:col-span-2',
    3: 'xl:col-span-3',
    4: 'xl:col-span-4',
    5: 'xl:col-span-5',
    6: 'xl:col-span-6',
    7: 'xl:col-span-7',
    8: 'xl:col-span-8',
    9: 'xl:col-span-9',
    10: 'xl:col-span-10',
    11: 'xl:col-span-11',
    12: 'xl:col-span-12',
  },
}

const COL_START_CLASSES: Record<Breakpoint, Record<GridCols, string>> = {
  base: {
    1: 'col-start-1',
    2: 'col-start-2',
    3: 'col-start-3',
    4: 'col-start-4',
    5: 'col-start-5',
    6: 'col-start-6',
    7: 'col-start-7',
    8: 'col-start-8',
    9: 'col-start-9',
    10: 'col-start-10',
    11: 'col-start-11',
    12: 'col-start-12',
  },
  sm: {
    1: 'sm:col-start-1',
    2: 'sm:col-start-2',
    3: 'sm:col-start-3',
    4: 'sm:col-start-4',
    5: 'sm:col-start-5',
    6: 'sm:col-start-6',
    7: 'sm:col-start-7',
    8: 'sm:col-start-8',
    9: 'sm:col-start-9',
    10: 'sm:col-start-10',
    11: 'sm:col-start-11',
    12: 'sm:col-start-12',
  },
  md: {
    1: 'md:col-start-1',
    2: 'md:col-start-2',
    3: 'md:col-start-3',
    4: 'md:col-start-4',
    5: 'md:col-start-5',
    6: 'md:col-start-6',
    7: 'md:col-start-7',
    8: 'md:col-start-8',
    9: 'md:col-start-9',
    10: 'md:col-start-10',
    11: 'md:col-start-11',
    12: 'md:col-start-12',
  },
  lg: {
    1: 'lg:col-start-1',
    2: 'lg:col-start-2',
    3: 'lg:col-start-3',
    4: 'lg:col-start-4',
    5: 'lg:col-start-5',
    6: 'lg:col-start-6',
    7: 'lg:col-start-7',
    8: 'lg:col-start-8',
    9: 'lg:col-start-9',
    10: 'lg:col-start-10',
    11: 'lg:col-start-11',
    12: 'lg:col-start-12',
  },
  xl: {
    1: 'xl:col-start-1',
    2: 'xl:col-start-2',
    3: 'xl:col-start-3',
    4: 'xl:col-start-4',
    5: 'xl:col-start-5',
    6: 'xl:col-start-6',
    7: 'xl:col-start-7',
    8: 'xl:col-start-8',
    9: 'xl:col-start-9',
    10: 'xl:col-start-10',
    11: 'xl:col-start-11',
    12: 'xl:col-start-12',
  },
}

function responsiveClasses(
  kind: 'span' | 'start',
  value?: ResponsiveValue<GridCols>,
) {
  if (!value) return []

  const map = kind === 'span' ? COL_SPAN_CLASSES : COL_START_CLASSES

  if (typeof value === 'number') {
    return [map.base[value]]
  }

  const classes: string[] = []
  const entries = Object.entries(value) as Array<[keyof typeof value, GridCols | undefined]>

  for (const [breakpoint, v] of entries) {
    if (!v) continue
    const bp = breakpoint === 'base' ? 'base' : (breakpoint as Breakpoint)
    classes.push(map[bp][v])
  }

  return classes
}

export function GridItem({
  children,
  as: Component = 'div',
  span,
  start,
  className,
}: GridItemProps) {
  const classes = [
    ...responsiveClasses('span', span),
    ...responsiveClasses('start', start),
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <Component className={classes}>{children}</Component>
}
