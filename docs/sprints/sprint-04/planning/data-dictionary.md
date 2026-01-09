## Entities / Objects

### Robots Directive
A strictly formatted instruction set in `robots.txt` that defines which parts of the site are open to automated crawlers.

### Sitemap
An XML document (`sitemap.xml`) that enumerates the complete list of public, canonical URLs available for indexing. It must strictly conform to the **Sitemap Protocol 0.9** XML schema.

### Canonical URL
The authoritative, absolute URL string (including protocol and domain) defined in the `<head>` of a page. It tells search engines which URL is the "master" copy to aggregate ranking signals.

### Public Surface Area
The strict set of routes intended for public indexing: `/`, `/about`, `/contact`, and `/projects/*`. This explicitly excludes `/404`, `/api/*`, and any route not in this enumerated list.

### Page-Specific Content
Metadata (specifically `title` and `meta description`) that is distinct for every URL in the Public Surface Area. No two public URLs may share the same Meta Description.

### Open Graph Image
A static image file (typically JPG or PNG, 1200x630px) explicitly referenced by the `og:image` meta tag. It is the visual representation of the page when shared on social streams.

### Meta Description
A 150-160 character summary of the page content defined in the `<meta name="description">` tag. It serves as the snippet text in search engine results pages (SERPs).

### Credibility Signal
A verifiable data point or external link (e.g., GitHub URL, Resume PDF, clear Project Duration) embedded statically in the DOM to establish trust with human reviewers.

### Permalink
A URL structure that is guaranteed to persist indefinitely. In Sprint-04, all existing routes (`/projects/*`, `/about`, `/`) are declared Permalinks.

## Fields / Attributes

### `og:type`
**Type:** String (Enum)  
**Meaning:** The type of object the page represents (e.g., `website`, `article`, `profile`). Default for this portfolio is `website`.

### `twitter:card`
**Type:** String (Enum)  
**Meaning:** The layout type for Twitter previews. We standardly use `summary_large_image` to maximize visual impact of project screenshots.

### `noindex`
**Type:** Boolean directive  
**Meaning:** A `<meta name="robots" content="noindex">` tag instructing crawlers *not* to include the page in search indices. Used unconditionally for 404 pages and system routes.

## Relationships

- **Page 1:1 Canonical URL**: Every rendered HTML page maps to exactly one Canonical URL, except 404 pages which have none.
- **Page 1:1 Meta Description**: Every public page must have a unique Meta Description.
- **Project 1:N Signals**: A Project page contains multiple Credibility Signals (Tech Stack, Role, Links).
- **Sitemap 1:N Canonical URL**: The sitemap enumerates all public Canonical URLs in the Public Surface Area.


