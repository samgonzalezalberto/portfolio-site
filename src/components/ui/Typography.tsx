import type { ReactNode } from 'react'

type TypographyTone = 'foreground' | 'muted' | 'accent'

type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'code'

type TypographyVariant = 'body' | 'mono'

type TypographyProps = {
  children: ReactNode
  as?: TypographyTag
  variant?: TypographyVariant
  tone?: TypographyTone
  className?: string
}

const BODY_CLASSES_BY_TAG: Record<TypographyTag, string> = {
  h1: 'font-sans text-4xl tracking-tighter',
  h2: 'font-sans text-3xl tracking-tighter',
  h3: 'font-sans text-2xl tracking-tight',
  h4: 'font-sans text-xl tracking-tight',
  h5: 'font-sans text-lg tracking-tight',
  h6: 'font-sans text-base tracking-tight',
  p: 'font-sans text-base',
  span: 'font-sans text-base',
  code: 'font-mono text-sm',
}

const TONE_CLASS: Record<TypographyTone, string> = {
  foreground: 'text-foreground',
  muted: 'text-muted',
  accent: 'text-accent',
}

export function Typography({
  children,
  as,
  variant = 'body',
  tone = 'foreground',
  className,
}: TypographyProps) {
  const Component: TypographyTag = as ?? (variant === 'mono' ? 'code' : 'p')

  const baseClasses =
    variant === 'mono'
      ? 'font-mono text-sm'
      : (BODY_CLASSES_BY_TAG[Component] ?? 'font-sans text-base')

  const classes = [baseClasses, TONE_CLASS[tone], className]
    .filter(Boolean)
    .join(' ')

  return <Component className={classes}>{children}</Component>
}

type TypographicProps = {
  children: ReactNode
  as?: TypographyTag
  tone?: TypographyTone
  className?: string
}

const TYPOGRAPHIC_TONE_CLASS: Record<TypographyTone, string> = {
  foreground: 'text-foreground',
  muted: 'text-muted',
  accent: 'text-accent',
}

export function TypographicHero({
  children,
  as: Component = 'h1',
  tone = 'foreground',
  className,
}: TypographicProps) {
  const classes = [
    'font-sans',
    'tracking-tighter',
    'leading-none',
    'break-words',
    'text-[clamp(4rem,10vw,6rem)]',
    'md:text-[clamp(6rem,8vw,7rem)]',
    TYPOGRAPHIC_TONE_CLASS[tone],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <Component className={classes}>{children}</Component>
}

export function TypographicHeading({
  children,
  as: Component = 'h2',
  tone = 'foreground',
  className,
}: TypographicProps) {
  const classes = [
    'font-sans',
    'tracking-tighter',
    'leading-none',
    'text-[clamp(4rem,8vw,5rem)]',
    'md:text-[clamp(6rem,6vw,6rem)]',
    TYPOGRAPHIC_TONE_CLASS[tone],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <Component className={classes}>{children}</Component>
}

export function TypographicBody({
  children,
  as: Component = 'p',
  tone = 'foreground',
  className,
}: TypographicProps) {
  const classes = ['font-sans', 'text-base', TYPOGRAPHIC_TONE_CLASS[tone], className]
    .filter(Boolean)
    .join(' ')

  return <Component className={classes}>{children}</Component>
}
