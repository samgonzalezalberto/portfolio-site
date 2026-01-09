## Sprint Goal

Transform the functionally complete portfolio application into a publicly discoverable, credible, and professionally interpretable artifact. This sprint establishes the static metadata layer, credibility signals, and governance rules required for the site to be correctly indexed by machines and trusted by human reviewers, without altering the underlying runtime architecture or design system.

## Non-Goals

- Implementation of dynamic sitemap generation or server-side sitemap logic (must be build-time)
- New visual component design or changes to the existing design system
- Analytics, tracking pixels, or third-party observability scripts
- Dynamic content fetching or API integration for credibility signals
- "Blog-like" features (RSS feeds, comments, dynamic tagging)
- Interactive resume or complex data visualization
- Performance optimization beyond existing budgets

## Invariants

- All metadata and signals are statically generated at build time; no runtime generation
- No client-side JavaScript is required for metadata interpretation by crawlers
- The "Separation of Concerns" principle from `architecture.md` is strictly maintained; metadata lives with content or configuration
- No personal data collection occurs; privacy policy remains implicit by absence of collection
- URLs defined in this sprint become permanent permalinks; changing them requires a major revision

## Definition of Done

- **Global Metadata**: `layout.tsx` includes correct `title` templates, `meta description`, `canonical` tags, and `viewport` settings.
- **Open Graph / Twitter Cards**: All public pages render valid `og:*` and `twitter:*` meta tags with appropriate static preview images.
- **Machine Directives**: `robots.txt` and `sitemap.xml` are present, valid, and accurately reflect the public surface area.
- **Credibility Content**: "About" and "Contact" pages include explicit, static verification signals (e.g., email obfuscation, GitHub links, resume download link).
- **Error Handling**: A static custom `404` page is implemented and visually consistent with the design system.
- **Project Signals**: All project case studies include standardized metadata for "Role", "Duration", and "Tech Stack".
- **Asset Optimization**: Favicons and web app manifests are present and valid across target browsers.
- **Validation**: All public pages pass LightHouse "SEO" and "Best Practices" audits with scores ≥ 95.
