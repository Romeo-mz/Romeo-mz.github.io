# Technology Stack

**Analysis Date:** 2026-02-20

## Languages

**Primary:**
- HTML5 - Static pages for portfolio and blog
- CSS3 - Custom styling in `style.css`
- JavaScript (ES6+) - Client-side interactivity and dynamic content loading

**Secondary:**
- JSON - Data storage for blog post metadata (`data/posts.json`)

## Runtime

**Environment:**
- Browser-based (no server-side runtime)
- Pure static HTML/CSS/JS

**Package Manager:**
- npm (minimal usage)
- Lockfile: `package-lock.json` present (lockfileVersion 3)
- Note: `package.json` contains no dependencies or scripts

## Frameworks

**Core:**
- Vanilla JavaScript - No framework used
- Native Fetch API - For loading blog posts from JSON

**Testing:**
- Not detected

**Build/Dev:**
- No build tools configured
- No transpilation or bundling

## Key Dependencies

**Critical:**
- Google Fonts (Roboto Mono) - External CDN
  - URL: `https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;700&display=swap`
  - Used in: `index.html`, `blog/index.html`

**Infrastructure:**
- None - Pure static site

## Configuration

**Environment:**
- No environment variables required
- No `.env` files detected
- Fully client-side execution

**Build:**
- No build configuration files
- No webpack, vite, rollup, or other bundlers
- Direct HTML/CSS/JS serving

## Platform Requirements

**Development:**
- Any text editor
- Local web server (optional, can open HTML files directly)
- No runtime dependencies

**Production:**
- GitHub Pages (hosting detected via `Romeo-mz.github.io` repository name)
- Static file hosting only
- Repository: `https://github.com/Romeo-mz/Romeo-mz.github.io.git`

---

*Stack analysis: 2026-02-20*
