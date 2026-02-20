# Codebase Structure

**Analysis Date:** 2026-02-20

## Directory Layout

```
Romeo-mz.github.io/
├── .git/               # Git repository metadata
├── .planning/          # Project planning and analysis documents
│   └── codebase/       # Codebase mapping documents
├── .vscode/            # VSCode workspace configuration
├── blog/               # Blog index page
│   └── index.html      # Blog listing page
├── data/               # Static data files
│   └── posts.json      # Blog post metadata
├── images/             # Static image assets
│   ├── infographie.png # Blog post images
│   └── logo-2.png      # Site logo
├── posts/              # Individual blog post HTML files
│   ├── 2025-12-05-upgrading-k8s-ansible.html
│   ├── 2026-01-07-monitoring-k9s.html
│   ├── 2026-01-19-contributing-s3ninja.html
│   ├── 2026-02-12-safer-container-ecosystem-docker-hardened-images.html
│   ├── 2026-02-12-why-html-formatting-matters.html
│   └── 2026-02-18-cyber-resilience-act-sbom-devops.html
├── index.html          # Portfolio homepage (entry point)
├── style.css           # Global stylesheet (1060 lines)
├── package.json        # Minimal npm metadata
└── package-lock.json   # npm lockfile
```

## Directory Purposes

**Root Directory:**
- Purpose: Entry point and global assets
- Contains: Homepage HTML, global stylesheet, npm metadata
- Key files: `index.html` (portfolio), `style.css` (all styles)

**blog/**
- Purpose: Blog listing/index page
- Contains: Single HTML file that dynamically loads post cards
- Key files: `index.html` (fetches from `data/posts.json`)

**posts/**
- Purpose: Individual blog post content
- Contains: Static HTML files for each published article
- Key files: `{YYYY-MM-DD}-{slug}.html` format (e.g., `2026-02-18-cyber-resilience-act-sbom-devops.html`)

**data/**
- Purpose: Static JSON data consumed by JavaScript
- Contains: Blog post metadata for index generation
- Key files: `posts.json` (array of post objects with title, excerpt, date, tags, readTime, href)

**images/**
- Purpose: Static image assets
- Contains: Logos, infographics, and blog post illustrations
- Key files: `logo-2.png`, `infographie.png`

**.planning/**
- Purpose: Project planning and documentation
- Contains: Codebase analysis documents
- Key files: Subdirectory for GSD codebase mapping outputs

**.vscode/**
- Purpose: Editor-specific configuration
- Contains: VSCode workspace settings
- Key files: `mcp.json`, `SKILL.md`

## Key File Locations

**Entry Points:**
- `index.html`: Portfolio homepage with interactive business card
- `blog/index.html`: Blog index that fetches and renders post cards
- `posts/{date}-{slug}.html`: Individual blog post pages

**Configuration:**
- `package.json`: Minimal npm configuration (no dependencies or scripts)
- `.vscode/mcp.json`: VSCode MCP configuration

**Core Logic:**
- Inline `<script>` blocks within HTML files (no separate JavaScript files)
- `index.html` lines 118-265: Business card flip/slide interactions
- `blog/index.html` lines 34-85: Blog post loading and rendering

**Styling:**
- `style.css`: Single global stylesheet for entire site (1060 lines)

**Content Data:**
- `data/posts.json`: Blog post metadata (50 lines, 6 posts)

## Naming Conventions

**Files:**
- HTML pages: `kebab-case.html` (e.g., `index.html`)
- Blog posts: `YYYY-MM-DD-kebab-case-slug.html` (e.g., `2026-02-18-cyber-resilience-act-sbom-devops.html`)
- Stylesheets: `lowercase.css` (e.g., `style.css`)
- Images: `lowercase-with-hyphens.png` (e.g., `logo-2.png`)
- Data files: `lowercase.json` (e.g., `posts.json`)

**Directories:**
- All lowercase, no hyphens or underscores (e.g., `blog/`, `posts/`, `images/`)

**CSS Classes:**
- BEM-inspired with double underscores for elements: `.card__side`, `.card__front`, `.card__back`
- Modifier classes: `.is-flipped`, `.show-soft-skills`
- Descriptive compound names: `.page-container`, `.blog-article-card`, `.skill-item`

**JavaScript Variables:**
- camelCase: `businessCard`, `skillsSlider`, `backHint`, `pointerStartX`
- Functions: camelCase (e.g., `setSoftSkillsVisible()`, `toggleFlip()`, `loadBlogArticles()`)

## Where to Add New Code

**New Blog Post:**
- Primary code: Create `posts/{YYYY-MM-DD}-{slug}.html` with standard post template
- Metadata: Add entry to `data/posts.json` with title, excerpt, date, tags, readTime, href
- Images: Place in `images/` and reference with relative path `/images/{filename}`

**New Page:**
- Implementation: Create `{pagename}/index.html` or `{pagename}.html` at root
- Styling: Add styles to `style.css` (reuse existing classes where possible)
- Navigation: Update `.nav-links` in page header of all pages

**Interactive Feature:**
- Implementation: Add inline `<script>` block at end of relevant HTML file before `</body>`
- Styling: Add necessary classes and animations to `style.css`
- Pattern: Follow existing event listener style with accessibility support (tabindex, aria attributes)

**Styling Update:**
- Global styles: Edit `style.css` (single file for entire site)
- Component-specific: Use class-based selectors, avoid IDs except for JavaScript hooks

## Special Directories

**.git/**
- Purpose: Version control metadata
- Generated: Yes (by git)
- Committed: No (standard git exclusion)

**.planning/**
- Purpose: Project planning and GSD documentation
- Generated: Yes (by GSD commands)
- Committed: Yes (documentation is tracked)

**.vscode/**
- Purpose: Editor workspace configuration
- Generated: Partially (manual + editor-generated)
- Committed: Yes (shared workspace settings)

**node_modules/** (if present)
- Purpose: npm dependencies
- Generated: Yes (by npm install)
- Committed: No (excluded via .gitignore)
- Note: Currently no dependencies in package.json, so this directory doesn't exist

## File Organization Patterns

**HTML Structure Pattern:**
All HTML files follow consistent structure:
1. DOCTYPE and HTML language declaration
2. `<head>` with meta tags, title, stylesheet link
3. `<body>` with `<main class="page-container">`
4. Page header with logo and navigation
5. Main content (article, card, or section)
6. Inline `<script>` for page-specific behavior

**Blog Post Template:**
- Standard header with RM logo and nav links
- `<article class="post">` wrapper
- Post header with title and meta (date, category, read time)
- `<section class="post-content">` with article body
- Post footer with back link to blog index

**Asset References:**
- Absolute paths from root: `/style.css`, `/data/posts.json`, `/images/logo-2.png`
- Enables consistent asset loading regardless of page depth

---

*Structure analysis: 2026-02-20*
