# Phase 3: Blog Index Experience - Research

**Researched:** 2026-02-20
**Domain:** Client-side blog filtering, search, and interactive UI
**Confidence:** HIGH

## Summary

Phase 3 focuses on transforming the existing blog index (`/blog/index.html`) from a simple list into an engaging, functional discovery experience with search, filtering, and sorting capabilities. The project uses vanilla JavaScript with no build tools (GitHub Pages constraint), and already loads blog post data from `/data/posts.json`.

**Current state:** Basic blog index exists with full-width cards, green layered box-shadow, and clickable posts. Posts are sorted chronologically (newest first) with basic metadata display (single tag, date, excerpt, read time).

**Primary recommendation:** Use Fuse.js (7.1.0) via CDN for fuzzy search with debounced input, native JavaScript for tag filtering/sorting, and enhance existing card hover states with scale transforms and refined shadow depth. Maintain vanilla JS approach for GitHub Pages compatibility.

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| BLOG-01 | Visually distinctive blog index with strong personality | Existing layered box-shadow pattern + enhanced hover states with transform scales |
| BLOG-02 | Search functionality by title or content | Fuse.js 7.1.0 CDN for fuzzy search with keys configuration, debounced input (300ms) |
| BLOG-03 | Tag/category filtering system | Native array filter on posts.json tags array, multi-select checkboxes or filter pills UI |
| BLOG-04 | Sorting options (date, read time) | Native array sort with custom comparators, dropdown or button group UI |
| BLOG-05 | Improved visual hierarchy and metadata display | All tags visible (not just first), pill-style tag display, date formatting |
| BLOG-06 | Hover states and interactive feedback | Transform translateY + scale on hover, enhanced layered shadow depth, smooth transitions |

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Fuse.js | 7.1.0 | Client-side fuzzy search | Industry standard for client-side search, zero dependencies, 20k+ GitHub stars, lightweight (~3KB gzipped), works without backend |
| Native JavaScript | ES6 | Filtering, sorting, DOM manipulation | No build tools requirement (GitHub Pages), browser-native array methods (filter, sort, map), sufficient for medium-sized datasets |
| CSS Transforms | Standard | Interactive animations | Hardware-accelerated (transform, scale), smooth 60fps performance, no library needed |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| None required | - | - | Vanilla approach sufficient for this phase |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Fuse.js | Manual string matching | Fuse.js provides fuzzy matching, handles typos, configurable threshold; manual matching requires exact text and more code |
| Fuse.js | List.js | List.js good for simple exact-match search but lacks fuzzy matching capabilities; Fuse.js better for user experience with typos |
| Native JS sorting | Lodash | Lodash adds 24KB+ for functionality already in native JS; unnecessary overhead for simple array operations |

**Installation:**
```html
<!-- CDN (production-ready) -->
<script src="https://cdn.jsdelivr.net/npm/fuse.js@7.1.0/dist/fuse.min.js"></script>
```

## Architecture Patterns

### Recommended Project Structure

Current structure (no changes needed):
```
blog/
  └── index.html          # Blog hub page
data/
  └── posts.json          # Blog post metadata
posts/
  └── *.html              # Individual post pages
style.css                 # Global styles including blog styles
```

### Pattern 1: Debounced Search Input

**What:** Delay search execution until user stops typing to avoid excessive filtering operations

**When to use:** Any text input that triggers expensive operations (search, filtering, API calls)

**Example:**
```javascript
// Source: CSS-Tricks debouncing guide
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Usage with search input
const searchInput = document.getElementById('search');
const debouncedSearch = debounce((query) => {
  performSearch(query);
}, 300); // 300ms delay

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

### Pattern 2: Fuse.js Configuration for Blog Search

**What:** Configure Fuse.js to search across multiple post fields with appropriate thresholds

**When to use:** When implementing fuzzy search across blog post titles, excerpts, and tags

**Example:**
```javascript
// Source: Fuse.js official docs v7.1.0
const posts = await fetch('/data/posts.json').then(r => r.json());

const fuse = new Fuse(posts, {
  keys: [
    { name: 'title', weight: 2 },      // Title most important
    { name: 'excerpt', weight: 1 },    // Excerpt medium priority
    { name: 'tags', weight: 1.5 }      // Tags high priority
  ],
  threshold: 0.4,          // 0.0 = perfect match, 1.0 = match anything (0.4 = good balance)
  ignoreLocation: true,    // Don't care where in string match occurs
  includeScore: true,      // Include match score for debugging
  minMatchCharLength: 2    // Ignore single character matches
});

// Search returns array of objects with .item and .score
const results = fuse.search('kubernetes');
// results = [{ item: {...post data...}, refIndex: 0, score: 0.23 }]
```

### Pattern 3: State-Based Filtering & Rendering

**What:** Maintain application state for active filters/sort, rerender only when state changes

**When to use:** When multiple filter types (search, tags, sort) need to work together

**Example:**
```javascript
// State object holds current filter criteria
const state = {
  searchQuery: '',
  activeTags: [],
  sortBy: 'date', // 'date' | 'readTime'
  sortOrder: 'desc' // 'asc' | 'desc'
};

// Single render function applies all filters
function renderPosts() {
  let filtered = allPosts;
  
  // Apply search if query exists
  if (state.searchQuery.length >= 2) {
    const results = fuse.search(state.searchQuery);
    filtered = results.map(r => r.item);
  }
  
  // Apply tag filter if tags selected
  if (state.activeTags.length > 0) {
    filtered = filtered.filter(post => 
      state.activeTags.some(tag => post.tags.includes(tag))
    );
  }
  
  // Apply sorting
  filtered.sort((a, b) => {
    if (state.sortBy === 'date') {
      const diff = new Date(b.date) - new Date(a.date);
      return state.sortOrder === 'desc' ? diff : -diff;
    } else if (state.sortBy === 'readTime') {
      const aTime = parseInt(a.readTime);
      const bTime = parseInt(b.readTime);
      return state.sortOrder === 'desc' ? bTime - aTime : aTime - bTime;
    }
  });
  
  // Update DOM with filtered results
  updateDOM(filtered);
}
```

### Pattern 4: Enhanced Card Hover States

**What:** Multi-property transforms for rich hover feedback (translate + scale + shadow)

**When to use:** Interactive cards that need to "lift" off the page on hover

**Example:**
```css
/* Existing card base (from current implementation) */
.blog-article-card {
  background: white;
  border-radius: 1.2em;
  padding: 1.8em;
  box-shadow: 
    rgba(0, 163, 108, 0.3) 3px 3px,
    rgba(0, 163, 108, 0.2) 6px 6px,
    rgba(0, 163, 108, 0.1) 9px 9px,
    rgba(0, 163, 108, 0.05) 12px 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
}

/* Enhanced hover state (Phase 3 addition) */
.blog-article-card:hover,
.blog-article-card:focus-visible {
  transform: translateY(-8px) scale(1.01);  /* Lift + subtle grow */
  box-shadow: 
    rgba(0, 163, 108, 0.4) 5px 5px,
    rgba(0, 163, 108, 0.3) 10px 10px,
    rgba(0, 163, 108, 0.2) 15px 15px,
    rgba(0, 163, 108, 0.1) 20px 20px;        /* Deeper shadow */
}
```

### Pattern 5: Tag Extraction and Display

**What:** Extract unique tags from all posts, display all tags per post (not just first)

**When to use:** When building tag filter UI and improving post card metadata

**Example:**
```javascript
// Extract all unique tags from posts
function getAllTags(posts) {
  const tagSet = new Set();
  posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => tagSet.add(tag));
    }
  });
  return Array.from(tagSet).sort();
}

// Display all tags on post card (not just first)
function createPostCard(post) {
  const tagsHTML = post.tags
    .map(tag => `<span class="blog-tag">${tag}</span>`)
    .join('');
  
  return `
    <article class="blog-article-card">
      <div class="blog-article-header">
        <div class="blog-article-meta">
          <div class="blog-tags">${tagsHTML}</div>
          <time class="blog-date" datetime="${post.date}">${post.date}</time>
        </div>
        <h2 class="blog-article-title">${post.title}</h2>
        <p class="blog-article-excerpt">${post.excerpt}</p>
      </div>
      <footer class="blog-article-footer">
        <span class="read-time">${post.readTime}</span>
        <a href="${post.href}" class="read-more">Read full article →</a>
      </footer>
    </article>
  `;
}
```

### Anti-Patterns to Avoid

- **Calling debounce inside event handler:** Create debounced function once outside handler, reuse it
- **Over-throttling search input:** 300ms is sweet spot; <100ms causes lag, >500ms feels unresponsive
- **Filtering on every keypress without debounce:** Causes jank with large datasets (>50 posts)
- **Complex regex for search:** Use Fuse.js instead; regex brittle and doesn't handle fuzzy matching
- **Inline styles for hover states:** Use CSS classes for better performance and maintainability
- **Re-sorting on every render:** Only sort when sort criteria changes, not on tag filter

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Fuzzy string matching | Custom Levenshtein distance algorithm | Fuse.js | Handles edge cases (Unicode, diacritics), optimized Bitap algorithm, battle-tested with 20k+ GitHub stars |
| Debouncing utility | Custom setTimeout wrapper | Simple debounce function from CSS-Tricks or use existing in codebase | Easy to get wrong (closure scope, argument passing, cancel method), proven patterns available |
| Date parsing | String manipulation | Native `Date` constructor or `Intl.DateTimeFormat` | Handles timezone, locale, edge cases; native APIs optimized |
| Unique array values | Manual loop with conditionals | `Set` + `Array.from()` | Native, fast, one-liner, handles any value type |

**Key insight:** Client-side search is well-solved problem domain. Use proven libraries (Fuse.js) rather than reinventing algorithms. Focus effort on UX and visual design, not search implementation details.

## Common Pitfalls

### Pitfall 1: Not Debouncing Search Input

**What goes wrong:** Search function executes on every keystroke, causing performance issues and jank

**Why it happens:** Direct event handler binding to input event without debounce

**How to avoid:** Always wrap search functions in debounce with 200-400ms delay

**Warning signs:** Browser lag when typing in search box, high CPU usage, choppy animations

### Pitfall 2: Improper Fuse.js Threshold Configuration

**What goes wrong:** Too low threshold (e.g., 0.1) returns no results; too high (e.g., 0.9) returns irrelevant results

**Why it happens:** Default threshold (0.6) not suitable for all use cases, requires tuning

**How to avoid:** Test with real queries (typos, partial words). Sweet spot for blog search: 0.3-0.5. Use `includeScore: true` during development to debug match quality.

**Warning signs:** Users complain "search doesn't find anything" or "search returns wrong posts"

### Pitfall 3: Forgetting to Update Fuse Instance on State Change

**What goes wrong:** Search results become stale when underlying data changes (e.g., after tag filter)

**Why it happens:** Fuse instance created once with all posts, not updated when posts filtered

**How to avoid:** Either recreate Fuse instance when filter changes, OR search first then filter results

**Warning signs:** Search + filter combination returns unexpected results

### Pitfall 4: Inefficient DOM Manipulation

**What goes wrong:** Clearing and rebuilding entire post list on every filter change causes flicker

**Why it happens:** Using `innerHTML = ''` then appending new elements in loop

**How to avoid:** Build complete HTML string first, then set innerHTML once. Or use document fragment.

**Warning signs:** Visible flicker when filtering, slow rendering with many posts

### Pitfall 5: Poor Mobile Hover State Handling

**What goes wrong:** Hover states "stick" on mobile after tap, creating confusing UI

**Why it happens:** Touch devices trigger :hover on tap, but don't reliably clear it

**How to avoid:** Add :active states for touch, consider `@media (hover: hover)` query to conditionally apply hover styles only on devices with true hover capability

**Warning signs:** Cards remain in hover state after navigation away on mobile

### Pitfall 6: Extracting Read Time Number Without Validation

**What goes wrong:** Sorting by read time fails if format changes from "X min read" to something else

**Why it happens:** Naive `parseInt(post.readTime)` assumes specific format

**How to avoid:** Use regex to extract number: `/(\d+)/.exec(post.readTime)?.[1]` with fallback to 0

**Warning signs:** Sort by read time shows posts in random order

## Code Examples

Verified patterns from official sources and project codebase:

### Complete Blog Search Implementation

```javascript
// Source: Fuse.js v7.1.0 docs + project implementation pattern
let allPosts = [];
let fuse = null;

// Initialize on page load
async function initBlogIndex() {
  try {
    const resp = await fetch('/data/posts.json');
    allPosts = await resp.json();
    
    // Initialize Fuse.js
    fuse = new Fuse(allPosts, {
      keys: [
        { name: 'title', weight: 2 },
        { name: 'excerpt', weight: 1 },
        { name: 'tags', weight: 1.5 }
      ],
      threshold: 0.4,
      ignoreLocation: true,
      minMatchCharLength: 2
    });
    
    // Initial render
    renderPosts(allPosts);
    
    // Setup event listeners
    setupSearchInput();
    setupTagFilters();
    setupSortControls();
  } catch (err) {
    console.error('Failed to load blog posts:', err);
  }
}

// Debounced search
const debouncedSearch = debounce((query) => {
  const trimmed = query.trim();
  let filtered = allPosts;
  
  if (trimmed.length >= 2) {
    const results = fuse.search(trimmed);
    filtered = results.map(r => r.item);
  }
  
  applyFiltersAndRender(filtered);
}, 300);

function setupSearchInput() {
  const input = document.getElementById('blogSearch');
  input.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
  });
}

initBlogIndex();
```

### Tag Filtering with Multiple Selection

```javascript
// Source: Project pattern + native JS filter
const state = {
  activeTags: [] // Array of selected tag strings
};

function setupTagFilters() {
  const allTags = getAllTags(allPosts);
  const container = document.getElementById('tagFilters');
  
  allTags.forEach(tag => {
    const button = document.createElement('button');
    button.textContent = tag;
    button.className = 'tag-filter-btn';
    button.dataset.tag = tag;
    
    button.addEventListener('click', () => {
      toggleTag(tag);
      button.classList.toggle('active');
      applyAllFilters();
    });
    
    container.appendChild(button);
  });
}

function toggleTag(tag) {
  const index = state.activeTags.indexOf(tag);
  if (index > -1) {
    state.activeTags.splice(index, 1);
  } else {
    state.activeTags.push(tag);
  }
}

function filterByTags(posts) {
  if (state.activeTags.length === 0) return posts;
  
  return posts.filter(post => 
    state.activeTags.some(tag => post.tags.includes(tag))
  );
}
```

### Sorting Implementation

```javascript
// Source: Native JS sort patterns
function sortPosts(posts, sortBy, sortOrder) {
  const sorted = [...posts]; // Create copy to avoid mutation
  
  sorted.sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'date') {
      comparison = new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'readTime') {
      const aTime = parseInt(/(\d+)/.exec(a.readTime)?.[1] || '0');
      const bTime = parseInt(/(\d+)/.exec(b.readTime)?.[1] || '0');
      comparison = bTime - aTime;
    }
    
    return sortOrder === 'desc' ? comparison : -comparison;
  });
  
  return sorted;
}

function setupSortControls() {
  const sortSelect = document.getElementById('sortBy');
  sortSelect.addEventListener('change', (e) => {
    applyAllFilters();
  });
}
```

### Enhanced Card Rendering with All Tags

```javascript
// Source: Current blog implementation enhanced
function renderPosts(posts) {
  const container = document.getElementById('blogArticles');
  
  if (posts.length === 0) {
    container.innerHTML = '<p class="no-results">No posts found. Try adjusting your filters.</p>';
    return;
  }
  
  const html = posts.map(post => `
    <article class="blog-article-card" tabindex="0" data-href="${post.href}">
      <div class="blog-article-header">
        <div class="blog-article-meta">
          <div class="blog-tags">
            ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
          </div>
          <time class="blog-date" datetime="${post.date}">${formatDate(post.date)}</time>
        </div>
        <h2 class="blog-article-title">${post.title}</h2>
        <p class="blog-article-excerpt">${post.excerpt}</p>
      </div>
      <footer class="blog-article-footer">
        <span class="read-time">${post.readTime}</span>
        <a href="${post.href}" class="read-more">Read full article →</a>
      </footer>
    </article>
  `).join('');
  
  container.innerHTML = html;
  
  // Re-attach click handlers
  container.querySelectorAll('.blog-article-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('a')) {
        window.location = card.dataset.href;
      }
    });
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Server-side full-text search | Client-side fuzzy search (Fuse.js) | ~2014 | Enables instant search without backend; practical for <1000 posts |
| jQuery for DOM manipulation | Vanilla JS with template literals | ~2017 | Faster, smaller bundle, native browser APIs sufficiently ergonomic |
| CSS transitions only | CSS transforms + transitions | ~2015 | Hardware-accelerated animations (60fps), smoother hover effects |
| Exact string matching | Fuzzy search with typo tolerance | ~2016 | Better UX, handles user errors gracefully |
| Single tag display | Multiple tag display | 2026 (Phase 3) | Better discoverability, richer metadata |

**Deprecated/outdated:**
- jQuery `$.ajax()` for fetching data: Use native `fetch()` API (standard since 2015)
- Moment.js for date parsing: Use native `Date` or `Intl.DateTimeFormat` (lighter, no external dep)
- Custom debounce implementations: Use lodash/debounce snippet or simple closure pattern (well-understood)

## Open Questions

1. **Filter UI Layout: Inline vs Sidebar**
   - What we know: Current blog index has centered, narrow layout (max-width: 850px). Tags could go above posts or in sidebar.
   - What's unclear: Best UX for mobile - filters above posts (pushes content down) vs collapsible drawer
   - Recommendation: Start with filters above posts in horizontal pill layout. Measure user engagement before adding complexity.

2. **Search Placeholder Behavior**
   - What we know: Empty search should show all posts. But what about "no results" state?
   - What's unclear: Should we show helpful message with popular tags, or just "No posts found"?
   - Recommendation: Show empty state with suggestion: "No posts found. Try searching for: [popular tags]"

3. **Tag Filter Logic: AND vs OR**
   - What we know: Multiple tags can be selected
   - What's unclear: Should posts match ALL selected tags (AND) or ANY selected tag (OR)?
   - Recommendation: Use OR logic (more permissive, shows more results). Add UI hint: "Showing posts with: Tag1 OR Tag2"

4. **Read Time Sorting: Ascending or Descending Default**
   - What we know: Users might want quick reads (ascending) or deep dives (descending)
   - What's unclear: Which default makes more sense for DevOps content audience
   - Recommendation: Default to ascending (quick reads first) - users browsing blog likely want quick wins

## Sources

### Primary (HIGH confidence)

- **Fuse.js v7.1.0 Official Documentation** - [https://fusejs.io](https://fusejs.io)
  - Installation guide, API options, examples, scoring theory
  - Verified: CDN URLs, configuration options, API methods
- **Fuse.js GitHub Repository** - [https://github.com/krisk/Fuse](https://github.com/krisk/Fuse)
  - Version information (7.1.0 latest), license (Apache-2.0), 20k+ stars
- **Project Codebase** - `/blog/index.html`, `/data/posts.json`, `/style.css` (lines 1146-1253)
  - Current implementation: card styles, sorting logic, data structure
  - Verified: green layered box-shadow pattern, existing hover states, post JSON schema

### Secondary (MEDIUM confidence)

- **CSS-Tricks: Debouncing and Throttling** - [https://css-tricks.com/debouncing-throttling-explained-examples/](https://css-tricks.com/debouncing-throttling-explained-examples/)
  - Debounce implementation patterns, 300ms recommendation for search
  - Multiple expert sources in comments validate patterns
- **jsDelivr CDN for Fuse.js** - [https://jsdelivr.com/package/npm/fuse.js](https://jsdelivr.com/package/npm/fuse.js)
  - CDN URL validation, version availability, package stats

### Tertiary (LOW confidence)

- None - all findings verified with official documentation or project codebase

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Fuse.js is industry standard with official docs; native JS well-documented
- Architecture: HIGH - Patterns verified in official Fuse.js docs + existing project code
- Pitfalls: HIGH - Based on common issues documented in Fuse.js GitHub issues and CSS-Tricks articles

**Research date:** 2026-02-20
**Valid until:** 2026-03-20 (30 days) - Fuse.js stable library with infrequent breaking changes

**Notes:**
- No CONTEXT.md exists for Phase 3, no user constraints to honor
- Phase 3 has no dependencies on incomplete phases (Phase 1 design system complete)
- Current blog implementation already solid foundation (layered shadows, clickable cards, JSON data structure)
- Fuse.js v7.1.0 released Feb 2025, very recent and stable
