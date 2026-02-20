# Architecture

**Analysis Date:** 2026-02-20

## Pattern Overview

**Overall:** Static Site Architecture with Client-Side Rendering

**Key Characteristics:**
- Server-less GitHub Pages deployment - all HTML, CSS, and JavaScript served statically
- No backend framework or build tooling - vanilla JavaScript and HTML
- Client-side data fetching from static JSON files
- Single global stylesheet for all pages

## Layers

**Presentation Layer:**
- Purpose: HTML structure and semantic markup for content delivery
- Location: `index.html`, `blog/index.html`, `posts/*.html`
- Contains: Page templates, navigation headers, article structures
- Depends on: `style.css` for styling, inline `<script>` tags for behavior
- Used by: End users via web browsers

**Styling Layer:**
- Purpose: All visual presentation and responsive design
- Location: `style.css`
- Contains: CSS variables, component styles, animations, responsive media queries
- Depends on: Google Fonts (Roboto Mono)
- Used by: All HTML pages via `<link rel="stylesheet" href="/style.css">`

**Data Layer:**
- Purpose: Static content and blog post metadata
- Location: `data/posts.json`
- Contains: Blog post metadata (title, excerpt, date, tags, readTime, href)
- Depends on: Nothing
- Used by: `blog/index.html` via `fetch('/data/posts.json')`

**Client Behavior Layer:**
- Purpose: Interactive functionality and dynamic content loading
- Location: Inline `<script>` blocks within HTML files
- Contains: Event listeners, DOM manipulation, data fetching
- Depends on: Browser APIs (fetch, DOM)
- Used by: User interactions

## Data Flow

**Portfolio Page Load:**

1. Browser requests `index.html`
2. HTML loads with embedded navigation header and business card component
3. `style.css` loaded and applied
4. Inline JavaScript initializes card flip interactions and keyboard accessibility
5. User interactions trigger flip animations and panel transitions via CSS classes

**Blog Index Page Load:**

1. Browser requests `blog/index.html`
2. Page skeleton loads with empty `#blogArticles` container
3. `loadBlogArticles()` function fetches `data/posts.json`
4. Posts sorted by date (newest first)
5. DOM elements dynamically created for each post
6. Event listeners attached to make cards clickable

**Blog Post Page Load:**

1. Browser requests `posts/{date}-{slug}.html` directly
2. Static HTML content served with complete article markup
3. No dynamic data loading - all content pre-rendered in HTML
4. Navigation header allows return to blog index

**State Management:**
- No global state management - all state is ephemeral DOM state
- Card flip state managed via `.is-flipped` CSS class on card element
- Slider state managed via `.show-soft-skills` CSS class
- No persistence - state resets on page reload

## Key Abstractions

**Page Container:**
- Purpose: Consistent layout wrapper for all pages
- Examples: `index.html`, `blog/index.html`, `posts/*.html`
- Pattern: `<main class="page-container">` with max-width constraint

**Page Header:**
- Purpose: Consistent navigation across site
- Examples: Present in all HTML files
- Pattern: Logo + navigation links with active state highlighting

**Blog Article Card:**
- Purpose: Represents a single blog post in the index
- Examples: Dynamically generated in `blog/index.html`
- Pattern: `<article class="blog-article-card">` with header, excerpt, and footer

**Interactive Business Card:**
- Purpose: Portfolio showcase with flip interaction
- Examples: `index.html` main component
- Pattern: 3D CSS transform with `.card__front` and `.card__back` faces

**Post Article:**
- Purpose: Full blog post content container
- Examples: All files in `posts/` directory
- Pattern: `<article class="post">` with semantic section structure

## Entry Points

**Portfolio Homepage:**
- Location: `index.html`
- Triggers: Direct navigation or root URL request
- Responsibilities: Display professional profile, handle card flip interactions, initialize event listeners

**Blog Index:**
- Location: `blog/index.html`
- Triggers: Navigation from portfolio or direct URL
- Responsibilities: Fetch post metadata, render blog cards, handle navigation

**Individual Blog Posts:**
- Location: `posts/{date}-{slug}.html`
- Triggers: Click from blog index or direct URL
- Responsibilities: Display article content with navigation

## Error Handling

**Strategy:** Graceful degradation with silent failures

**Patterns:**
- Fetch errors logged to console but don't break page: `console.error('Failed to load blog articles:', err)`
- Missing data handled with fallback empty strings: `${p.title || ''}`
- No user-facing error messages - page remains functional with partial content
- Link guards to prevent navigation on invalid hrefs: `if (readLink && readLink.getAttribute('href') && readLink.getAttribute('href') !== '#')`

## Cross-Cutting Concerns

**Logging:** Console-only logging for fetch failures and debugging - no analytics or error tracking service

**Validation:** Minimal client-side validation - href checks before navigation, array type checks for fetched data

**Authentication:** None - fully public static site

**Accessibility:** Keyboard navigation support via `tabindex`, ARIA attributes (`aria-hidden`, `aria-label`), semantic HTML structure

**Performance:** Lazy loading for iframes in posts (`loading="lazy"`), no build optimization or bundling

---

*Architecture analysis: 2026-02-20*
