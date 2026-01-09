import { GridContainer } from '../ui/GridContainer'

export function Footer() {
  return (
    <footer>
      <GridContainer className="py-8">
        <div className="grid grid-cols-swiss items-center gap-y-4">
          <p className="col-span-12 font-sans text-xs text-muted">©</p>
          <div className="col-span-12 flex gap-gutter">
            <a
              href="https://example.com"
              className="font-sans text-xs text-foreground hover:text-accent underline focus-ring interactive-transition"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://example.com"
              className="font-sans text-xs text-foreground hover:text-accent underline focus-ring interactive-transition"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </GridContainer>
    </footer>
  )
}
