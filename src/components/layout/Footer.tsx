import { GridContainer } from '../ui/GridContainer'

export function Footer() {
  return (
    <footer>
      <GridContainer className="py-8">
        <div className="grid grid-cols-swiss items-center gap-y-4">
          <p className="col-span-12 font-sans text-sm text-muted">©</p>
          <div className="col-span-12 flex gap-6">
            <a
              href="https://example.com"
              className="font-sans text-sm text-foreground hover:text-accent underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://example.com"
              className="font-sans text-sm text-foreground hover:text-accent underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
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
