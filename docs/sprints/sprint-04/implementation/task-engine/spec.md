## High-Level Model

Sprint-04 defines the **Public Surface Layer** of the portfolio. This layer consists of static meta-tags, machine-readable directives, and human-readable credibility signals that wrap the existing application logic. This layer ensures that the strictly "functional" application from previous sprints is correctly interpreted by search engines, social crawlers, and human reviewers. It does not introduce new runtime logic but exposes existing content and structure via standardized protocols (Open Graph, JSON-LD, Robots.txt).

## Component Definitions

### Global Metadata
The set of standards-compliant HTML `<meta>` tags injected into the `<head>` of every page via `layout.tsx`.
*   **Canonical URL Rule**: Must be absolute, exclude query parameters, and **exclude trailing slashes** to enforce a single source of truth.
*   **404 Exception**: The 404 error page must **not** include a canonical tag.

### Social Cards
Static image assets and accompanied `og:*` and `twitter:*` meta tags.
*   **Image Strategy**: The home, about, and contact pages use a single default site-preview image. Project pages use a specific cover image relevant to that project.
*   **Uniqueness**: `og:image` URL must be valid and resolvable for every public route.

### Machine Directives
Standardized text and XML files (`robots.txt`, `sitemap.xml`) served from the domain root. These explicitly instruct web crawlers on which pages to index and how to discover them based on the **Public Surface Area**.

### Credibility Signals
Visible, static UI elements integrated into existing pages.
*   **Email Obfuscation**: Email addresses in the UI must be rendered as encoded HTML entities (e.g., `&#64;`) or human-readable text (e.g., `[at]`) to mitigate scraping; raw `mailto:` is permitted only if entity-encoded.
*   **Resume**: The resume link must point to a static PDF and include a `download` attribute or appropriate headers to trigger download.

### 404 Handler
A specialized, static error view rendered when a requested route does not exist.
*   **Indexing**: Must include `<meta name="robots" content="noindex">` to prevent search engines from indexing error states.
*   **Visuals**: Maintains design system integrity but clearly communicates status.

### Target Browsers
For the purpose of visual verification and favicon/manifest support, "Target Browsers" are defined as the latest 2 major versions of Chrome, Firefox, Safari, and Edge on both Desktop and Mobile viewports.

## Behavior / Semantics

### Crawling Authority
The `robots.txt` file explicitly grants `User-agent: *` full access to all public routes and points to the `sitemap.xml` for discovery. No blocking primitives are used for public content.


### Indexing Safety
All public pages are marked `index, follow` by default. Canonical tags serve as the source of truth for URL uniqueness, preventing duplicate content penalties if query parameters are introduced.

### Social Previews
When a public URL is shared on a platform supporting Open Graph or Twitter Cards, the platform scrapes the static HTML and renders a card containing the Page Title, specific Meta Description, and a pre-defined static preview image.

### Offline/No-JS Fallback
All metadata, credibility signals, and content are fully present in the initial server-rendered HTML. No client-side JavaScript execution is required for a search engine or human to access 100% of the semantic content.

