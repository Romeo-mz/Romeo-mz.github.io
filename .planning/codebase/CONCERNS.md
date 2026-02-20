# Codebase Concerns

**Analysis Date:** 2026-02-20

## Tech Debt

**No build system or asset optimization:**
- Issue: Static HTML/CSS/JS with no bundling, minification, or optimization pipeline
- Files: `index.html`, `blog/index.html`, `style.css`, all post HTML files
- Impact: 22KB unminified CSS, inline JavaScript in HTML files, no code splitting, potential performance issues on slower connections
- Fix approach: Add build tooling (Vite, Parcel, or similar) to minify CSS/JS, optimize images, and enable caching strategies

**Large unoptimized image asset:**
- Issue: 764KB PNG infographic with no optimization or responsive variants
- Files: `images/infographie.png`
- Impact: Slow page load on mobile/slower connections, wasted bandwidth
- Fix approach: Compress PNG with tools like pngquant or convert to WebP, provide multiple sizes for responsive loading

**No package.json scripts:**
- Issue: Empty scripts object in `package.json`
- Files: `package.json`
- Impact: No defined workflows for development, testing, or deployment
- Fix approach: Add scripts for local dev server, building, linting, and deployment

**Inline JavaScript without modules:**
- Issue: All JavaScript is inline in HTML files with no module system
- Files: `index.html` (lines 118-265), `blog/index.html` (lines 34-85)
- Impact: No code reusability, difficult to test, violates separation of concerns, increases maintenance burden
- Fix approach: Extract to separate `.js` files, use ES modules or simple script includes

**Manual post management:**
- Issue: Blog posts require manual HTML file creation and manual updates to `data/posts.json`
- Files: `data/posts.json`, `posts/*.html`
- Impact: Error-prone workflow, no validation that JSON matches actual files, potential for stale/broken links
- Fix approach: Use static site generator (11ty, Hugo) or create build script to generate JSON from frontmatter

**CSS duplication for responsive breakpoints:**
- Issue: Multiple media query blocks with duplicated selectors and properties
- Files: `style.css` (lines 404-656)
- Impact: Hard to maintain, easy to miss updates across breakpoints, file bloat
- Fix approach: Use CSS custom properties for shared values, consider utility-first CSS or CSS-in-JS

**Comment in blog/index.html references removed feature:**
- Issue: Comment mentions "Context7 integration removed — site is fully static HTML"
- Files: `blog/index.html` (line 263)
- Impact: Confusing for future maintainers, implies incomplete migration
- Fix approach: Remove legacy comments referencing old architecture

## Known Bugs

**Silent failure in blog post loading:**
- Symptoms: If `/data/posts.json` fails to load, blog page shows empty state with no user feedback
- Files: `blog/index.html` (lines 36-81)
- Trigger: Network failure, incorrect path, malformed JSON
- Workaround: None - users see blank page
- Fix: Add error UI fallback showing "Failed to load posts" message

**console.error in production code:**
- Symptoms: Error logging to console only, invisible to users
- Files: `blog/index.html` (line 79)
- Trigger: Any fetch/JSON parsing failure
- Workaround: Check browser console manually
- Fix: Add user-visible error message or retry mechanism

**No validation of posts.json structure:**
- Symptoms: Malformed post entries may render incorrectly or break the page
- Files: `blog/index.html` (lines 49-77)
- Trigger: Missing required fields (title, href, date, etc.) in JSON
- Workaround: Manually validate JSON before deployment
- Fix: Add schema validation or defensive rendering with fallbacks

## Security Considerations

**Missing .gitignore:**
- Risk: Accidental commit of sensitive files (env vars, credentials, IDE configs)
- Files: None - `.gitignore` missing entirely
- Current mitigation: None
- Recommendations: Add `.gitignore` with common patterns (node_modules, .env*, .DS_Store, IDE configs)

**External iframe without sandbox:**
- Risk: Embedded Excalidraw iframe has full page access
- Files: `posts/2026-02-18-cyber-resilience-act-sbom-devops.html` (lines 36-41)
- Current mitigation: Using HTTPS source, iframe from trusted domain
- Recommendations: Add `sandbox="allow-scripts allow-same-origin"` attribute to limit iframe capabilities

**No Content Security Policy:**
- Risk: No CSP headers to prevent XSS or unauthorized resource loading
- Files: All HTML files
- Current mitigation: Static site with no user input reduces risk
- Recommendations: Add CSP meta tags or HTTP headers allowing only needed origins (fonts.googleapis.com, excalidraw.com)

**No Subresource Integrity (SRI) for external resources:**
- Risk: Google Fonts CDN could be compromised, serving malicious CSS
- Files: `index.html` (line 7), `blog/index.html` (line 7), all post HTML files
- Current mitigation: HTTPS connection only
- Recommendations: Add SRI hashes to external stylesheet/font links or self-host fonts

**Git user email exposed in repository config:**
- Risk: Personal email visible in `.git/config`
- Files: `.git/config` (line 13)
- Current mitigation: Email appears to be typo "romeo.martinez@orange.Fr" (note capital F)
- Recommendations: Use GitHub no-reply email or dedicated public email, fix typo

## Performance Bottlenecks

**Single large CSS file:**
- Problem: 22KB unminified CSS loaded on every page
- Files: `style.css` (1060 lines)
- Cause: All styles bundled together, including unused styles on specific pages
- Improvement path: Split critical CSS inline, defer non-critical styles, use CSS custom properties to reduce duplication

**Blocking JavaScript in HTML:**
- Problem: Inline scripts block HTML parsing and rendering
- Files: `index.html` (lines 118-265), `blog/index.html` (lines 34-85)
- Cause: Scripts placed in `<body>` without async/defer
- Improvement path: Move scripts to end of body or external files with `defer` attribute

**Synchronous fetch on page load:**
- Problem: Blog page waits for posts.json before rendering anything
- Files: `blog/index.html` (line 38)
- Cause: No loading skeleton or progressive enhancement
- Improvement path: Add loading skeleton, cache posts.json, or pre-render blog cards at build time

**No HTTP caching strategy:**
- Problem: No indication of cache headers or asset versioning
- Files: All static assets
- Cause: No build system generating cache-busted filenames
- Improvement path: Add cache-busting hashes to filenames, configure proper cache headers on hosting

**Large PNG image not lazy-loaded:**
- Problem: 764KB infographic loads immediately even if below fold
- Files: `images/infographie.png`, referenced in `posts/2026-02-18-cyber-resilience-act-sbom-devops.html`
- Cause: No lazy loading attribute on image
- Improvement path: Add `loading="lazy"` to image tags, or use Intersection Observer

## Fragile Areas

**Card flip interaction JavaScript:**
- Files: `index.html` (lines 118-226)
- Why fragile: Complex state management for card flip, slider, keyboard navigation all in one event handler
- Safe modification: Test all interaction modes (click, keyboard, touch) after changes; consider splitting into smaller functions
- Test coverage: None - no automated tests for interaction logic

**Blog card rendering from JSON:**
- Files: `blog/index.html` (lines 49-77)
- Why fragile: Direct innerHTML injection with string templates, assumes specific JSON structure
- Safe modification: Validate post structure before rendering, use DocumentFragment instead of innerHTML
- Test coverage: None - no validation of posts.json schema

**CSS 3D transforms and perspective:**
- Files: `style.css` (lines 100-193, card flip)
- Why fragile: Complex 3D CSS with backface-visibility and z-index layering
- Safe modification: Test across browsers (Safari, Firefox, mobile browsers) after changes
- Test coverage: None - manual visual testing only

**Responsive breakpoints:**
- Files: `style.css` (lines 404-656)
- Why fragile: Three breakpoints (768px, 480px, 480px duplicate) with cascading overrides
- Safe modification: Test at exact breakpoint widths (768px, 480px) and in-between values
- Test coverage: None - responsive design tested manually

## Scaling Limits

**Static JSON for blog posts:**
- Current capacity: ~6 posts currently, manageable up to ~50 posts
- Limit: Performance degrades with hundreds of posts, no pagination
- Scaling path: Add pagination/filtering, use static site generator with build-time rendering, or migrate to CMS

**No CDN configuration:**
- Current capacity: GitHub Pages hosting, single global location
- Limit: Slower load times for users far from primary server
- Scaling path: Configure CDN (Cloudflare, AWS CloudFront) with edge caching

**No analytics or monitoring:**
- Current capacity: No visibility into errors, performance, or usage
- Limit: Can't identify issues proactively or measure impact of changes
- Scaling path: Add privacy-friendly analytics (Plausible, Fathom) and error tracking (Sentry)

## Dependencies at Risk

**No dependencies currently:**
- Risk: No external npm dependencies is actually low-risk for this static site
- Impact: N/A - site uses only browser APIs and CDN fonts
- Migration plan: Keep dependencies minimal; if adding build tools, lock versions and audit regularly

**Google Fonts CDN dependency:**
- Risk: External service outage or deprecation of Roboto Mono font
- Impact: Fallback to system monospace fonts, visual inconsistency
- Migration plan: Self-host fonts for full control and performance

## Missing Critical Features

**No README or documentation:**
- Problem: No documentation on how to add posts, deploy, or contribute
- Blocks: Collaboration with other contributors, onboarding new maintainers
- Priority: High - fundamental for maintainability

**No LICENSE file:**
- Problem: No clear licensing terms for code or content
- Blocks: Others can't legally reuse, fork, or contribute
- Priority: Medium - important for open source clarity

**No automated deployment:**
- Problem: Manual deployment process not documented
- Blocks: Reliable, repeatable deployments
- Priority: Medium - reduces deployment risk

**No local development server:**
- Problem: No npm script or documented way to run locally
- Blocks: Testing changes requires manual file opening or separate server setup
- Priority: Medium - impacts development velocity

**No link validation:**
- Problem: No way to detect broken internal/external links
- Blocks: Quality assurance, broken links accumulate over time
- Priority: Low - can be addressed with CI/CD later

## Test Coverage Gaps

**All JavaScript interaction logic:**
- What's not tested: Card flip, slider, keyboard navigation, blog card clicks
- Files: `index.html` (lines 118-226), `blog/index.html` (lines 68-76)
- Risk: Regressions in user interactions go unnoticed until manual testing
- Priority: High - core user experience depends on this

**Blog post loading and rendering:**
- What's not tested: Fetch logic, JSON parsing, error handling, DOM injection
- Files: `blog/index.html` (lines 36-81)
- Risk: Silent failures, broken rendering, security issues from malformed data
- Priority: High - page is non-functional if this breaks

**Responsive CSS behavior:**
- What's not tested: Layout correctness at different viewport sizes
- Files: `style.css` (lines 404-656)
- Risk: Broken layouts on specific devices/sizes
- Priority: Medium - visual bugs affect user experience but don't break functionality

**Accessibility features:**
- What's not tested: Keyboard navigation, screen reader announcements, focus management
- Files: All interactive elements
- Risk: Accessibility regressions exclude users with disabilities
- Priority: Medium - important for inclusive design

**Link integrity:**
- What's not tested: Internal links to posts, external links in content
- Files: All HTML files, `data/posts.json`
- Risk: 404 errors for users, poor SEO
- Priority: Low - can be caught manually but should be automated

---

*Concerns audit: 2026-02-20*
