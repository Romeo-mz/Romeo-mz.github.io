# External Integrations

**Analysis Date:** 2026-02-20

## APIs & External Services

**External Resources:**
- Excalidraw - Embedded diagram viewer
  - Used in: `posts/2026-02-18-cyber-resilience-act-sbom-devops.html`
  - Implementation: iframe embed (`https://excalidraw.com/#json=...`)
  - Purpose: Display technical infographics

**External Links (Informational only):**
- GitHub profile links - `https://github.com/Romeo-mz`
- LinkedIn profile - `https://www.linkedin.com/in/roméo-m-656686210/`
- Devminds website - `https://devminds.fr`
- Various documentation links in blog posts (k9scli.io, kubernetes.io, EUR-Lex, etc.)

## Data Storage

**Databases:**
- None

**File Storage:**
- Local filesystem only
- Blog post metadata: `data/posts.json`
- Blog post HTML: `posts/*.html`
- Static assets: `images/` directory

**Caching:**
- Browser cache only (default HTTP caching)

## Authentication & Identity

**Auth Provider:**
- None - Public static site

**User Management:**
- No user accounts or authentication

## Monitoring & Observability

**Error Tracking:**
- None

**Logs:**
- Browser console only
- Basic try-catch in JavaScript: `blog/index.html` lines 78-80

**Analytics:**
- Not detected

## CI/CD & Deployment

**Hosting:**
- GitHub Pages
  - Repository: `Romeo-mz.github.io`
  - Default GitHub Pages deployment (likely automatic on push to main)

**CI Pipeline:**
- No `.github/workflows/` directory detected
- Likely using default GitHub Pages automatic deployment

**Deployment Method:**
- Git push to main branch triggers GitHub Pages rebuild

## Environment Configuration

**Required env vars:**
- None required

**Secrets location:**
- No secrets needed (public static site)

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## Content Delivery

**CDN Usage:**
- Google Fonts CDN
  - Font: Roboto Mono (weights 300, 400, 700)
  - Files: `index.html`, `blog/index.html`

**Static Assets:**
- CSS: `/style.css` (single file, 1061 lines)
- JSON: `/data/posts.json` (blog post metadata)
- Images: `/images/` directory (infographics and visual assets)

## Data Flow

**Blog Post Loading:**
1. User visits `/blog/`
2. JavaScript fetches `/data/posts.json`
3. Posts rendered dynamically as cards
4. Click navigates to static HTML in `/posts/`

**Portfolio Interaction:**
1. Pure client-side JavaScript for card flip animation
2. Swipe/keyboard navigation for skills sections
3. No server communication required

---

*Integration audit: 2026-02-20*
