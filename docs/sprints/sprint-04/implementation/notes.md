
## Sprint-04 — Phase 1 (Global Metadata & Structure)

### Canonical URL generation logic
- Base site URL is determined at build/runtime module-evaluation time from the first defined value in:
	1) `NEXT_PUBLIC_SITE_URL`
	2) `SITE_URL`
	3) `VERCEL_URL`
	4) fallback `http://localhost:3000`
- If the selected value does not start with `http://` or `https://`, it is treated as a host and prefixed with `https://`.
- The base URL is normalized by stripping username/password, query string, hash, and any pathname.
- The global canonical is emitted via Next.js `alternates.canonical` as `siteUrl.origin` (absolute, no query params, no trailing slash).

### Favicons (formats + sizes)
Generated assets placed in `src/app/`:
- `favicon.ico` (multi-size: 16x16, 32x32, 48x48)
- `icon.svg` (vector)
- `icon-192.png` (192x192)
- `icon-512.png` (512x512)
- `apple-icon.png` (180x180)

### Next.js metadata API decisions
- Global metadata is defined via `export const metadata` in `src/app/layout.tsx`.
- Viewport is defined via `export const viewport` (Next.js 14+ convention).
- Web app manifest is served via `src/app/manifest.ts` (Next.js manifest route), linked from metadata as `/manifest.webmanifest`.

## Sprint-04 — Phase 2 (Page-Level Signals)

### Email obfuscation
- Implemented as human-readable text with no `mailto:` link in the HTML source.
- Contact page renders: `hello [at] example.com`.

### Open Graph images
- Default site preview image: `/og/default.png` (1200x630).
- Project preview images use a strict naming convention: `/og/projects/<slug>.png` (1200x630), where `<slug>` matches the MDX filename in `src/content/projects/`.

### Unique meta descriptions
- Home (`/`): "A component-driven portfolio powered by file-based MDX content."
- About (`/about`): "Background, experience, and the principles behind this portfolio site."
- Contact (`/contact`): "How to reach me and where to find my work online."
- Projects index (`/projects`): "A curated selection of projects across product and tooling."
- Project detail (`/projects/<slug>`): Uses the project MDX frontmatter `description` (unique per project).

## Sprint-04 — Phase 3 (Machine Directives & Error Handling)

### Sitemap generation
- Implemented as a Next.js build-time route via `src/app/sitemap.ts`.
- URL list is generated from:
	- Static Public Surface routes: `/`, `/about`, `/contact`, `/projects`
	- Project routes derived from MDX filenames in `src/content/projects/*.mdx` → `/projects/<slug>`

### 404 status + indexing
- Implemented via Next.js `not-found.tsx` convention (ensures HTTP 404 for unknown routes).
- `src/app/not-found.tsx` exports metadata `robots: { index: false, follow: false }` which renders `<meta name="robots" content="noindex">`.
- Canonical is not emitted on the 404 page (no `alternates.canonical` is set for Not Found).

### URLs included in sitemap
- `/`
- `/about`
- `/contact`
- `/projects`
- `/projects/portfolio-site`
- `/projects/task-engine`
- `/projects/design-primitives`

## Sprint-04 — Phase 4 (Final Verification)

### Playwright (full E2E suite)
- `npx playwright test` → **30 passed**
	- Includes console cleanliness checks for `/`, `/about`, `/projects`, `/contact`, and `/projects/portfolio-site`.

### Lighthouse (SEO + Best Practices threshold)
- Lighthouse was run against a production server (`next start`) using Playwright-managed Chromium via `CHROME_PATH`.
- Saved reports:
	- `test-results/lighthouse-home.json` → Performance 100, Accessibility 100, Best Practices 96, SEO 100
	- `test-results/lighthouse-project.json` → Performance 100, Accessibility 100, Best Practices 96, SEO 100

### Missing `og:image` guard
- Project pages enforce that `public/og/projects/<slug>.png` exists during `generateMetadata()`.
- If an image is missing, build fails with a descriptive error (prevents shipping broken `og:image` URLs).

