import type { Config } from 'tailwindcss'

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
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'monospace'],
      },
      fontSize: {
        xs: ['0.79rem', { lineHeight: '1.25rem' }],
        sm: ['0.889rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.266rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.424rem', { lineHeight: '2rem' }],
        '3xl': ['1.602rem', { lineHeight: '2.25rem' }],
        '4xl': ['1.802rem', { lineHeight: '2.5rem' }],
      },
      gridTemplateColumns: {
        swiss: 'repeat(12, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}

export default config
