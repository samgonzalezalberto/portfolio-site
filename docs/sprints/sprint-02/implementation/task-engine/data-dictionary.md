## Entities / Objects

These entities define the Frontmatter schemas for the Markdown/MDX files used to populate the site, adhering to the architecture's file-based content requirement.

-   **`Project`**: Represents a single piece of work. Defined in `src/content/projects/*.mdx`.
-   **`Experience`**: Represents a professional role. Defined in `src/content/experience/*.mdx`.
-   **`Skill`**: A specific technology. Derived from frontmatter arrays.
-   **`SocialLink`**: External profile connection points. Defined in global configuration or bio file.

## Fields / Attributes

### Project (Frontmatter)
-   `title` (string): Display name.
-   `description` (string): Brief summary (< 200 chars).
-   `technologies` (string[]): List of tags/skills used.
-   `repoUrl` (string, optional): Git repository link.
-   `liveUrl` (string, optional): Deployed demo link.
-   `featured` (boolean): Whether to display on the Home page.
-   `date` (string): Sort order date (YYYY-MM).

### Experience (Frontmatter)
-   `company` (string): Employer name.
-   `role` (string): Job title.
-   `startDate` (string): Start date (YYYY-MM).
-   `endDate` (string | "Present"): End date.
-   `location` (string): City/Remote status.

### SocialLink (Global Config)
-   `platform` (string): Name (GitHub, LinkedIn).
-   `url` (string): Full HTTPS URL.
-   `label` (string): Display text.

## Relationships

-   **One-to-Many**: The Portfolio (User) has many **Experiences**.
-   **One-to-Many**: The Portfolio (User) has many **Projects**.
-   **Many-to-Many**: **Projects** feature multiple **Skills**.
-   **Persistence**: Content is stored as static MDX files with YAML frontmatter in `src/content/`. This aligns with the `docs/project/architecture.md` requirement for file-based content.
