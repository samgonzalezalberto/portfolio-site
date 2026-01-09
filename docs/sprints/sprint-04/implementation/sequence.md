# Sprint-04 Implementation Phases

## PHASE 1 — GLOBAL METADATA & STRUCTURE

**Purpose**
To implement the Global Metadata component and establish the base `Metadata` object structure in Next.js `layout.tsx`, including favicon assets and viewport settings. This satisfies tests M-01, M-02 (partial), and establishes the foundation for all page-level metadata.

**Authorized Inputs**
The coding agent's sole authoritative inputs are:
- `docs/sprints/sprint-04/implementation/task-engine/spec.md`
- `docs/sprints/sprint-04/implementation/task-engine/tdd.md`
- `docs/sprints/sprint-04/implementation/task-engine/data-dictionary.md`

The coding agent may not reference planning documents or project-level documents.

**Tasks to Perform**
1. Read `spec.md` "Global Metadata" section and "Target Browsers" definition.
2. Update `src/app/layout.tsx` to export a `metadata` object (Next.js App Router convention) that includes:
   - `title` template (e.g., `%s | Portfolio Name`)
   - Default `description` meta tag
   - `viewport` settings
   - `canonical` URL logic (absolute, no trailing slashes, no query parameters)
3. Generate favicon assets (`.ico`, `.png`, `.svg`) and place them in `src/app/` or `public/` as per Next.js conventions.
4. Create or update `src/app/manifest.json` (web app manifest) with basic metadata (name, short_name, icons, theme_color).
5. Ensure all metadata is statically generated (Server Components only, no `use client`).

**Explicit Non-Goals**
- Do NOT implement page-specific metadata overrides yet (e.g., for `/about`, `/projects`).
- Do NOT create `robots.txt` or `sitemap.xml` yet.
- Do NOT alter `tailwind.config.ts`, `app/globals.css`, or any UI components.
- Do NOT add analytics scripts or third-party trackers.

**Notes Requirement**
Record in `notes.md`:
- The exact canonical URL generation logic (e.g., how domain is determined).
- Favicon sizes and formats generated.
- Any Next.js-specific metadata API decisions.

**Completion Criteria**
- `npm run build` succeeds without errors.
- Test M-01 passes: Home page renders `<title>`, `<meta name="description">`, and `<link rel="canonical">`.
- Favicons are present and valid in target browsers (manual verification or automated check).
- No regression in existing page rendering.

---

## PHASE 2 — PAGE-LEVEL SIGNALS

**Purpose**
To implement page-specific metadata overrides and credibility signals for `/about`, `/contact`, and project pages. This satisfies tests M-01 (uniqueness), M-02 (social cards), and C-01 (credibility signals).

**Authorized Inputs**
The coding agent's sole authoritative inputs are:
- `docs/sprints/sprint-04/implementation/task-engine/spec.md`
- `docs/sprints/sprint-04/implementation/task-engine/tdd.md`
- `docs/sprints/sprint-04/implementation/task-engine/data-dictionary.md`

The coding agent may not reference planning documents or project-level documents.

**Tasks to Perform**
1. Read `spec.md` "Social Cards", "Credibility Signals", and "Page-Specific Content" definitions.
2. Update `src/app/about/page.tsx`:
   - Export a `metadata` object with unique `title`, `description`, and `openGraph` properties.
   - Add credibility signals: GitHub profile link (static anchor tag), resume download link (with `download` attribute or `.pdf` target).
3. Update `src/app/contact/page.tsx`:
   - Export a `metadata` object with unique `title`, `description`, and `openGraph` properties.
   - Add obfuscated email display (HTML entity encoding or human-readable format like `[at]`).
   - Add GitHub profile link.
4. Update project page templates (e.g., `src/app/projects/[slug]/page.tsx` or equivalent):
   - Export a `metadata` object with project-specific `title`, `description`, and `openGraph.image` (project cover image).
   - Ensure `og:image` points to a valid static asset.
5. Create or identify default and project-specific Open Graph images (1200x630px) and place them in `public/` or appropriate directory.
6. Ensure all `og:*` and `twitter:*` meta tags are present (`og:title`, `og:description`, `og:image`, `og:type`, `twitter:card`).

**Explicit Non-Goals**
- Do NOT implement dynamic content fetching or API integration.
- Do NOT create interactive resume or complex data visualization.
- Do NOT alter the design system or visual components.

**Notes Requirement**
Record in `notes.md`:
- How email obfuscation was implemented (specific encoding method).
- How project-specific `og:image` is determined (file naming convention, frontmatter field, etc.).
- List of unique meta descriptions created for each page.

**Completion Criteria**
- Test M-01 passes: Each page (Home, About, Contact, two different Projects) has unique `<meta name="description">`.
- Test M-02 passes: All pages render `og:*` and `twitter:*` tags; `og:image` URLs return HTTP 200; project pages have different images than Home.
- Test C-01 passes: Contact and About pages have GitHub links, resume link with `download` attribute, and obfuscated email.
- `npm run build` succeeds without errors.
- No regression in existing page rendering.

---

## PHASE 3 — MACHINE DIRECTIVES & ERROR HANDLING

**Purpose**
To implement `robots.txt`, `sitemap.xml`, and the custom 404 page. This satisfies tests D-01, E-01, Edge-01, and Edge-02.

**Authorized Inputs**
The coding agent's sole authoritative inputs are:
- `docs/sprints/sprint-04/implementation/task-engine/spec.md`
- `docs/sprints/sprint-04/implementation/task-engine/tdd.md`
- `docs/sprints/sprint-04/implementation/task-engine/data-dictionary.md`

The coding agent may not reference planning documents or project-level documents.

**Tasks to Perform**
1. Read `spec.md` "Machine Directives", "404 Handler", "Public Surface Area", and "Canonical URL Rule" definitions.
2. Create `src/app/robots.txt` (or `public/robots.txt` if using static file):
   - Include `User-agent: *`
   - Include `Allow: /`
   - Include `Sitemap: <absolute-url>/sitemap.xml`
3. Create `src/app/sitemap.xml` (or use Next.js `sitemap.ts` route handler for build-time generation):
   - Enumerate all public canonical URLs from the Public Surface Area (`/`, `/about`, `/contact`, `/projects/*`).
   - Ensure XML conforms to Sitemap Protocol 0.9 schema.
   - Exclude `/404`, `/api/*`, and any non-public routes.
4. Create `src/app/not-found.tsx`:
   - Export a `metadata` object with `<meta name="robots" content="noindex">`.
   - Do NOT include a `<link rel="canonical">` tag.
   - Render a custom 404 UI that is visually consistent with the design system.
   - Ensure the server returns HTTP 404 status code.
5. Verify canonical URL logic excludes trailing slashes (as per spec).

**Explicit Non-Goals**
- Do NOT implement dynamic sitemap generation or server-side sitemap logic.
- Do NOT add new visual component design or changes to the existing design system.
- Do NOT add analytics or tracking scripts.

**Notes Requirement**
Record in `notes.md`:
- How sitemap URLs are generated (static list vs. dynamic file system scan).
- How the 404 page ensures HTTP 404 status (Next.js convention vs. explicit configuration).
- List of all URLs included in the sitemap.

**Completion Criteria**
- Test D-01 passes: `/robots.txt` and `/sitemap.xml` return HTTP 200; `robots.txt` contains correct directives; sitemap is valid XML conforming to Sitemap Protocol 0.9.
- Test E-01 passes: `/this-page-does-not-exist` returns HTTP 404, includes `<meta name="robots" content="noindex">`, and does NOT include `<link rel="canonical">`.
- Test Edge-01 passes: Requesting `/about/` (with trailing slash) renders canonical URL as `.../about` (no trailing slash).
- Test Edge-02 passes: Requesting `/` renders canonical URL matching domain root without path segments.
- `npm run build` succeeds without errors.
- No regression in existing page rendering.

---

## PHASE 4 — FINAL VERIFICATION

**Purpose**
Execute the comprehensive test suite and Lighthouse audits to ensure the "Definition of Done" is met. This validates all tests from `tdd.md` and confirms SEO/Best Practices scores.

**Authorized Inputs**
The coding agent's sole authoritative inputs are:
- `docs/sprints/sprint-04/implementation/task-engine/tdd.md`

**Tasks to Perform**
1. Ensure the development server or production build is running.
2. Run `npx playwright test` (or existing E2E command) to execute all tests from `tdd.md`:
   - M-01: Metadata Verification
   - M-02: Open Graph / Twitter Card Presence
   - D-01: Machine Directive Availability
   - E-01: 404 Error Handling
   - C-01: Credibility Signal Presence
   - Edge-01: Canonical Trailing Slashes
   - Edge-02: Root Resolution
3. If tests fail, debug and fix the code (do not lower test standards).
4. Run Lighthouse audits on production build:
   - Verify SEO score ≥ 95.
   - Verify Best Practices score ≥ 95.
5. Verify console is clean (no hydration errors, no missing image warnings).
6. Verify build process warns or fails if an `og:image` reference points to a missing file (edge case from `tdd.md`).

**Explicit Non-Goals**
- No new feature development.
- Do NOT alter test definitions or lower success criteria.

**Notes Requirement**
Record in `notes.md`:
- Summarize test results (pass/fail counts).
- List any bugs discovered and fixed during verification.
- Document Lighthouse scores (SEO, Best Practices, Accessibility, Performance).

**Completion Criteria**
- All tests from `tdd.md` pass in CI automation (Playwright).
- Lighthouse SEO score ≥ 95.
- Lighthouse Best Practices score ≥ 95.
- No "hard" 404s on intended public routes; strict 404s on intended private/missing routes.
- Sprint is ready for review.
