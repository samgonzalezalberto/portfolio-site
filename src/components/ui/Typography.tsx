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
