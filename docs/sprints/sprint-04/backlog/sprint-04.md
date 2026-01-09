# Sprint-04 Backlog

## Deferred Features

- **Dynamic Sitemap Generation**: Server-side or runtime sitemap generation was explicitly excluded. The sitemap is generated at build time only, requiring rebuilds when content changes. Deferred to preserve build-time determinism and avoid runtime complexity.

- **Analytics and Tracking**: Third-party observability scripts, analytics, and tracking pixels were excluded. Deferred to maintain privacy-by-default posture and avoid personal data collection without explicit architectural review.

- **RSS Feeds**: Blog-like features including RSS feeds, comments, and dynamic tagging were excluded. Deferred as the portfolio is not a content publication platform; feature additions must serve evaluation and evidence goals per project vision.

- **Interactive Resume**: Complex data visualization or interactive resume components were excluded. Deferred to maintain static, auditable content model and avoid unnecessary client-side interactivity.

- **JSON-LD Structured Data**: While mentioned in the high-level model, JSON-LD structured data was not implemented. Deferred as Open Graph and meta tags provide sufficient machine-readable signals for current discoverability goals.

## Known Limitations

- **Static Sitemap**: The sitemap is generated at build time from file system scans of `src/content/projects/*.mdx`. Adding new projects requires a rebuild and redeploy to update the sitemap. This trade-off enforces determinism and auditability over dynamic convenience.

- **Environment-Dependent Canonical URLs**: Canonical URL generation depends on environment variables (`NEXT_PUBLIC_SITE_URL`, `SITE_URL`, `VERCEL_URL`) with a localhost fallback. Production deployments must explicitly set the correct domain to avoid incorrect canonical URLs.

- **Email Obfuscation Strategy**: Email is obfuscated using human-readable text (`[at]`) without `mailto:` links. This prevents one-click contact initiation but mitigates scraping. The trade-off prioritizes privacy over convenience.

- **Open Graph Image Naming Convention**: Project Open Graph images must follow strict naming convention (`/og/projects/<slug>.png`) matching MDX filenames. Mismatches cause build failures. This enforces consistency but requires manual asset management.

- **No Query Parameter Handling**: Canonical URLs strip all query parameters. Pages accessed with query strings (e.g., UTM tracking) will have canonicals pointing to the base URL. This prevents duplicate content penalties but loses query context in canonical references.

## Explicitly Postponed Ideas

- **Automated Open Graph Image Generation**: Dynamically generating Open Graph images from project metadata at build time was discussed but postponed. Manual image creation provides better visual control and avoids introducing image generation dependencies.

- **Multi-Language Support**: Internationalization (i18n) and alternate language meta tags were not considered in scope. Postponed as the portfolio targets English-speaking technical audiences exclusively.

- **Performance Optimization Beyond Budgets**: Further performance tuning (image optimization, code splitting refinements) was not pursued. Current Lighthouse Performance score of 100 meets constraints; additional optimization deferred until performance budgets are threatened.

- **Advanced Structured Data**: Schema.org markup for Person, Organization, or Article types was discussed but postponed. Current Open Graph implementation provides sufficient social and search engine signals without additional complexity.
