
## Phase 1 — Configure Design System (Tailwind)

### Design tokens (source of truth)

The Sprint-02 task-engine spec restricts color usage to exactly 4 tokens: `canvas`, `foreground`, `muted`, `accent`.

These are defined as CSS variables in `src/app/globals.css` and surfaced to Tailwind as theme colors in `tailwind.config.ts`.

Exact values used:

- `canvas`: `#ffffff`
- `foreground`: `#0b0b0c`
- `muted`: `#6b7280`
- `accent`: `#2563eb`

### Typography scale calculation

The spec requires a modular type scale but does not specify a ratio. I used a conservative “major second” modular ratio:

- Base size $b = 16\,px$ (Tailwind `text-base` = `1rem`)
- Ratio $r = 1.125$
- Scale formula: $s_n = b \cdot r^n$

Computed (rounded) Tailwind mappings:

- `text-xs`: $16 / r^2 \approx 12.64px$ → `0.79rem`
- `text-sm`: $16 / r \approx 14.22px$ → `0.889rem`
- `text-base`: $16px$ → `1rem`
- `text-lg`: $16 \cdot r = 18px$ → `1.125rem`
- `text-xl`: $16 \cdot r^2 \approx 20.25px$ → `1.266rem`
- `text-2xl`: $16 \cdot r^3 \approx 22.78px$ → `1.424rem`
- `text-3xl`: $16 \cdot r^4 \approx 25.63px$ → `1.602rem`
- `text-4xl`: $16 \cdot r^5 \approx 28.84px$ → `1.802rem`

Line-heights were chosen to land on the 4px grid (e.g., 20px, 24px, 28px, 32px...).

### Spacing tokens

No custom spacing tokens were specified in the authorized Sprint-02 task-engine docs.
The default Tailwind spacing scale already aligns to a 4px base (`1` = `0.25rem` = 4px, `2` = 8px, etc.), matching the “4px/8px grid” success criteria noted in the Sprint-02 TDD.

## Phase 2 — Layout & Typography Primitives

### Component APIs (props)

- `Container(props)`
	- `children: ReactNode`
	- `as?: 'div' | 'main' | 'section' | 'header' | 'footer' | 'article' | 'aside'`
	- `className?: string`
- `Grid(props)`
	- `children: ReactNode`
	- `as?: 'div' | 'section' | 'ul' | 'ol'`
	- `cols?: 1 | 2 | ... | 12` (default `12`)
	- `className?: string`
- `Section(props)`
	- `children: ReactNode`
	- `className?: string`
- `Typography(props)`
	- `children: ReactNode`
	- `as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'code'`
	- `variant?: 'body' | 'mono'` (default `body`)
	- `tone?: 'foreground' | 'muted' | 'accent'` (default `foreground`)
	- `className?: string`

### Prop → className mappings

- `Container`
	- Always: `mx-auto w-full max-w-screen-xl px-6`
	- Appends `className` if provided
- `Grid`
	- Always: `grid`
	- `cols=12` → `grid-cols-swiss` (Tailwind token)
	- `cols=n` (1..11) → `grid-cols-n`
- `Section`
	- Always: `py-12`
- `Typography`
	- `tone` → `text-foreground | text-muted | text-accent`
	- `variant='mono'` → `font-mono text-sm` and defaults to `<code>` if no `as`
	- `variant='body'` uses modular scale classes per tag (e.g., `h1` → `text-4xl`)

## Phase 3 — Content Modules

### Component APIs (props)

- `SkillBadge(props)`
	- `label: string`
	- `className?: string`
- `ProjectCard(props)`
	- `title: string`
	- `description: string`
	- `technologies: string[]`
	- `repoUrl?: string`
	- `liveUrl?: string`
	- `className?: string`
- `ExperienceItem(props)`
	- `role: string`
	- `company: string`
	- `startDate: string` (YYYY-MM)
	- `endDate: string` (YYYY-MM or "Present")
	- `location?: string`
	- `description?: string`
	- `className?: string`

### Optional fields decisions

- `ProjectCard.repoUrl` and `ProjectCard.liveUrl` are conditionally rendered:
	- If `repoUrl` is missing, the “Code” link is omitted.
	- If `liveUrl` is missing, the “Demo” link is omitted.
	- If both are missing, the entire link row is omitted.

## Phase 4 — Data Layer (MDX)

### Library choice

Chose `gray-matter` for MDX frontmatter parsing.

Reason: it is a lightweight, filesystem-friendly parser for YAML frontmatter and leaves MDX body content intact for later rendering (we only need server-side loading + typed data at this phase).

### Content added

- Projects added: 3 (`src/content/projects/*.mdx`)
- Experience items added: 1 (`src/content/experience/*.mdx`)

## Phase 5 — Assembly & Page Integration

### Next.js App Router notes / deviations

- Active route styling in the primary navigation requires access to the current pathname.
	- Implemented `Header` as a Client Component using `usePathname()` (no `useEffect`) to satisfy the TDD requirement that active links reflect sub-paths.
	- All pages remain Server Components and load MDX content server-side via `src/lib/mdx.ts`.

## Phase 6 — Final Verification

### Test results

- `npm run test:unit`: pass
- `npm run build`: pass
- `npm run test:e2e` (Playwright routing + visual snapshots): pass
- Playwright accessibility audit (axe-core): pass (no serious/critical violations on `/`, `/about`, `/projects`, `/contact`)

### Fixed during verification

- Updated Playwright HTML snapshots after replacing placeholder pages with MDX-backed content (expected intentional change).

