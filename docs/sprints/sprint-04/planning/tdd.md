## Tests

### M-01: Metadata Verification
**Test:** Public pages render required HEAD elements with unique content  
- **Scenario:** Request Home, About, and two different Project pages.  
- **Expected:** Each response contains valid `<title>`, `<meta name="description">`, and `<link rel="canonical">`. The content of `<meta name="description">` is unique for each page.  
- **Validates:** Basic SEO technical compliance and Page-Specific Content uniqueness.

### M-02: Open Graph / Twitter Card Presence
**Test:** Public pages render social meta tags  
- **Scenario:** Request Home and Project pages. Inspect source for `og:title`, `og:description`, `og:image`, `twitter:card`.  
- **Expected:** All tags are present. `og:image` on Project pages differs from the Home page (project-specific vs default). `og:image` URL returns HTTP 200.  
- **Validates:** Shareability and link preview correctness.

### D-01: Machine Directive Availability
**Test:** Robots.txt and Sitemap.xml are serving  
- **Scenario:** Request `/robots.txt` and `/sitemap.xml`.  
- **Expected:** Return HTTP 200. `robots.txt` contains `User-agent: *` and `Allow: /`. Sitemap is valid XML conforming to Sitemap Protocol 0.9 schema.  
- **Validates:** Crawler discoverability and XML validity.

### E-01: 404 Error Handling
**Test:** Non-existent routes return 404 and NOINDEX  
- **Scenario:** Request `/this-page-does-not-exist`.  
- **Expected:** Server returns HTTP 404 status code (not 200). HTML `<head>` contains `<meta name="robots" content="noindex">`. HTML does **not** contain `<link rel="canonical">`.  
- **Validates:** Error handling and index prevention.

### C-01: Credibility Signal Presence
**Test:** Credibility links are present and correct  
- **Scenario:** Inspect "Contact" and "About" pages.  
- **Expected:** 
  1. Static anchor tags link to external GitHub profile.
  2. Resume link exists with `download` attribute or points to `.pdf`.
  3. Email display is obfuscated (checked via source inspection not containing raw mailto without encoding).
- **Validates:** Trust signal availability and privacy.

### Edge-01: Canonical Trailing Slashes
**Test:** Canonical URLs exclude trailing slashes  
- **Scenario:** Request `/about/`.  
- **Expected:** The `<link rel="canonical">` href value is `.../about` (no trailing slash).  
- **Validates:** Canonical strictness protocol.

### Edge-02: Root Resolution
**Test:** Root alias resolves to Root Canonical  
- **Scenario:** Request `/`.  
- **Expected:** Canonical URL matches the domain root without path segments or file extensions.  
- **Validates:** Domain root authority.

## Edge Cases

- **Trailing Slashes:** Ensure `canonical` tags are consistent (e.g., always strictly **without** trailing slash) to avoid duplication.
- **Root vs Home:** Ensure `/` and `/page` (if applicable) resolve to the same canonical URL.
- **Missing Images:** Verify build fails or warns if an `og:image` reference points to a missing file.

## Success Criteria

- All tests pass in CI automation (Playwright).

- LightHouse SEO score is ≥ 95 on production build.
- LightHouse Best Practices score is ≥ 95 on production build.
- No "hard" 404s on intended public routes; strict 404s on intended private/missing routes.

