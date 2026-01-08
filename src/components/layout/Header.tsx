import { GridContainer } from '../ui/GridContainer'
import Link from 'next/link'

export function Header() {
  return (
    <header>
      <GridContainer className="py-6">
        <nav aria-label="Primary" className="grid grid-cols-swiss items-center">
          <Link href="/" className="col-span-6 font-sans text-base">
            Portfolio
          </Link>
          <div className="col-span-6 flex justify-end gap-6 font-sans text-base">
            <Link href="/about">About</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </nav>
      </GridContainer>
    </header>
  )
}
