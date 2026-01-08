import { GridContainer } from '../ui/GridContainer'

export function Footer() {
  return (
    <footer>
      <GridContainer className="py-8">
        <div className="grid grid-cols-swiss">
          <p className="col-span-12 font-sans text-sm">©</p>
        </div>
      </GridContainer>
    </footer>
  )
}
