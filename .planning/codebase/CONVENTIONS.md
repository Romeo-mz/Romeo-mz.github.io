# Coding Conventions

**Analysis Date:** 2026-02-20

## Naming Patterns

**Files:**
- HTML files: kebab-case with date prefix for blog posts - `2026-02-18-cyber-resilience-act-sbom-devops.html`
- Root pages: lowercase without prefix - `index.html`
- CSS files: lowercase - `style.css`
- JSON data: lowercase - `posts.json`

**Functions:**
- JavaScript: camelCase - `setSoftSkillsVisible()`, `toggleFlip()`, `loadBlogArticles()`

**Variables:**
- JavaScript: camelCase - `skillsSlider`, `pointerStartX`, `backHint`, `blogArticles`
- DOM constants: camelCase with descriptive names - `card`, `front`, `back`, `slideToggle`

**CSS Classes:**
- BEM-like naming: block__element pattern - `card__side`, `card__front`, `card__back`
- Modifier classes: block-modifier pattern - `card-content`, `blog-card-draft`
- Multi-word: kebab-case - `page-container`, `blog-article-card`, `back-slider-viewport`

## Code Style

**Formatting:**
- No automated formatter detected (no .prettierrc or .editorconfig found)
- Manual formatting with consistent patterns observed

**Indentation:**
- HTML: 2 spaces per indent level
- CSS: 2 spaces per indent level  
- JavaScript: 2 spaces per indent level

**Linting:**
- No linter configuration detected (no .eslintrc or similar)
- Code follows manual conventions

**HTML Structure:**
- Semantic HTML5 - `<main>`, `<header>`, `<article>`, `<section>`, `<footer>`, `<nav>`
- Accessibility attributes included - `aria-label`, `aria-hidden`, `tabindex`, `role`
- Meta tags consistently applied - viewport, charset UTF-8, description

## Import Organization

**Order:**
Not applicable - vanilla JavaScript, no module system

**External Resources:**
1. Google Fonts (in `<head>`)
2. Local stylesheet (`/style.css`)
3. Inline `<script>` tags at end of `<body>`

**Path Convention:**
- Absolute paths from root: `/style.css`, `/blog/`, `/posts/`
- Relative paths for same-level resources: `../images/`

## Error Handling

**Patterns:**
- Try-catch blocks for async operations:
```javascript
try {
  const resp = await fetch('/data/posts.json');
  if (!resp.ok) return;
  // process response
} catch (err) {
  console.error('Failed to load blog articles:', err);
}
```

**Validation:**
- Guard clauses for early returns - `if (!resp.ok) return;`
- Null checks before operations - `if (!backHint) return;`
- Array type validation - `if (!Array.isArray(posts)) return;`
- Truthy checks for DOM elements - `if (readLink && readLink.getAttribute('href'))`

**Error Communication:**
- Console errors for debugging - `console.error('Failed to load blog articles:', err);`
- Graceful degradation (no user-facing error UI detected)

## Logging

**Framework:** Native `console` API

**Patterns:**
- Error logging only - `console.error()` for failed operations
- No debug/info/warn logging observed
- Minimal logging approach (production-ready)

## Comments

**When to Comment:**
- Section headers in CSS using uppercase separators:
```css
/* ========== PAGE HEADER / NAVIGATION ========== */
/* ========== CARD 3D FLIP ========== */
```

- Inline clarifications for complex logic:
```javascript
// don't flip when clicking links
// let links handle themselves
```

- Implementation notes for major functionality:
```javascript
// Blog post loading now uses the static `data/posts.json` file only.
// (Context7 integration removed — site is fully static HTML.)
```

**JSDoc/TSDoc:**
- Not used (vanilla JavaScript, no type annotations)

## Function Design

**Size:**
- Small, focused functions - typically 10-30 lines
- Single responsibility principle followed
- Example: `setSoftSkillsVisible()`, `toggleFlip()`, `loadBlogArticles()`

**Parameters:**
- Minimal parameters (0-2 typically)
- Boolean flags for state - `setSoftSkillsVisible(visible)`
- Event objects passed through - `function(e)`

**Return Values:**
- Early returns for guard clauses
- Implicit undefined for DOM manipulation functions
- No explicit return statements for side-effect functions

## Module Design

**Exports:**
- Not applicable - no module system
- Global scope functions defined in inline `<script>` tags

**Organization:**
- All JavaScript inline in HTML files
- Grouped by functionality within single `<script>` block
- Initialization code at bottom of script

## CSS Architecture

**Organization:**
- Single monolithic `style.css` file (1061 lines)
- Organized by component sections with clear comment headers
- Progressive enhancement approach

**Selector Patterns:**
- Class-based selectors primarily - `.card`, `.blog-article-card`
- Descendant selectors for scoping - `.card__side .card-content`
- Pseudo-classes for interaction - `:hover`, `:focus-visible`
- Attribute selectors for state - `.card:not(.is-flipped)`

**Responsive Design:**
- Mobile-first principles
- Media queries at: 768px (tablet), 480px (mobile)
- Consolidated at end of stylesheet

## Accessibility Conventions

**ARIA Attributes:**
- Labels for interactive elements - `aria-label="Show soft skills"`
- Hidden states managed - `aria-hidden="true"` toggled on flip
- Semantic landmarks - `aria-label` on sections

**Keyboard Navigation:**
- `tabindex="0"` on interactive cards
- Enter and Space key handlers for custom controls
- Arrow key navigation for sliders (ArrowLeft, ArrowRight)

**Focus Management:**
- `:focus-visible` pseudo-class for keyboard focus styling
- Outline styles with offset - `outline: 3px solid rgba(0, 163, 108, 0.8); outline-offset: 4px;`

## Data Conventions

**JSON Structure:**
- Array of objects in `data/posts.json`
- Consistent property names: `title`, `excerpt`, `date`, `tags`, `readTime`, `href`
- ISO date format - `YYYY-MM-DD`
- Tags as arrays of strings

**HTML Data Attributes:**
- Standard attributes used - `datetime` for `<time>` elements
- No custom `data-*` attributes observed

---

*Convention analysis: 2026-02-20*
