import * as React from 'react'

export type ButtonVariant = 'primary' | 'text'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

function buttonClass(variant: ButtonVariant) {
  const base = [
    'font-sans text-base',
    'focus-ring',
    'interactive-transition',
    'disabled:pointer-events-none disabled:opacity-50',
  ]

  if (variant === 'text') {
    return [
      ...base,
      'inline-flex items-center justify-center',
      'rounded-md px-1 py-1',
      'text-foreground hover:text-accent',
      'hover:underline underline-offset-4',
    ].join(' ')
  }

  return [
    ...base,
    'inline-flex items-center justify-center',
    'rounded-md px-4 py-2',
    'bg-accent text-canvas',
    'hover:opacity-90 active:opacity-80',
  ].join(' ')
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', className, type = 'button', ...props },
  ref,
) {
  const classes = [buttonClass(variant), className].filter(Boolean).join(' ')

  return <button ref={ref} type={type} className={classes} {...props} />
})
