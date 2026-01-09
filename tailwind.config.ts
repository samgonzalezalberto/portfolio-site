import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--canvas)',
        foreground: 'var(--foreground)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'monospace'],
      },
      fontSize: {
        // Major Third (1.250) modular scale anchored at 1rem
        xs: ['0.8rem', { lineHeight: '1.25rem' }],
        sm: ['1rem', { lineHeight: '1.5rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.25rem', { lineHeight: '1.75rem' }],
        xl: ['1.5625rem', { lineHeight: '2rem' }],
        '2xl': ['1.953125rem', { lineHeight: '2.25rem' }],
        '3xl': ['2.44140625rem', { lineHeight: '2.5rem' }],
        '4xl': ['3.0517578125rem', { lineHeight: '1' }],
      },
      spacing: {
        // Standardized "gutter" token for consistent grid gaps
        gutter: '1.5rem',
      },
      gridTemplateColumns: {
        swiss: 'repeat(12, minmax(0, 1fr))',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.focus-ring': {
          outline: '2px solid transparent',
          outlineOffset: '2px',
        },
        '.focus-ring:focus-visible': {
          boxShadow: '0 0 0 2px var(--accent), 0 0 0 4px var(--canvas)',
        },
        '.interactive-transition': {},
        '@media (prefers-reduced-motion: no-preference)': {
          '.interactive-transition': {
            transitionProperty: 'color, opacity, transform',
            transitionDuration: '150ms',
            transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      })
    }),
  ],
}

export default config
