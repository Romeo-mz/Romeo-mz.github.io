# Phase 1: Design Foundation - Research

**Researched:** 2026-02-20
**Domain:** CSS design systems, typography, color theory, responsive design
**Confidence:** HIGH

## Summary

Phase 1 establishes the visual foundation through CSS custom properties (design tokens), a three-font typography system, contextual spacing approach, and desktop-first responsive design. The research reveals that modern CSS provides excellent native support for design tokens through custom properties, fluid typography through `clamp()`, and semantic color specification through the OKLCH color space.

The user has made specific decisions about: salmon/pink background site-wide, green interactive accents, bold serif ultra-wide headings, neutral sans-serif body text, distinctive monospace code font (NOT Roboto Mono), generous spacing in content areas, tight spacing in UI elements, and vibrant syntax highlighting on transparent backgrounds with green borders.

**Primary recommendation:** Build design system using CSS custom properties with semantic naming, implement fluid typography using `clamp()` for scalability, leverage modern color spaces (OKLCH) for artistic palette generation, and use contextual spacing scales tailored per component type rather than universal spacing system.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Color Palette:**
- Site-wide salmon/pastel pink background (warm, approachable tone)
- Green as primary interactive color (buttons, links, hover states)
- Additional colors should form an artistic palette that harmonizes with pink/green foundation
- Researcher should explore color combinations that feel cohesive and bold

**Typography System:**
- Three-font system with distinct roles:
  - **Headings**: Bold serif ultra-wide typeface (strong visual impact)
  - **Body text**: Neutral sans-serif (readable, unobtrusive)
  - **Code**: Distinctive monospace (NOT Roboto Mono — replace entirely)
- Moving completely away from Roboto Mono across the site
- Font choices should create clear hierarchy and personality

**Spacing Philosophy:**
- **Generous spacing**: Around headings and within blog post content (breathable, immersive)
- **Tight/compact spacing**: Navigation, UI elements, and blog index cards (dense, scannable)
- **Mobile spacing**: Selectively tighter — reduce spacing more aggressively on small screens
- **Contextual approach**: Each component type has its own spacing scale (not one universal system)

**Responsive Approach:**
- Desktop-first design (1440px+ optimal experience)
- Mobile is functional but deliberately simplified
- Flippable business card interaction preserved on mobile (scaled but same behavior)
- Blog index gets different designs: desktop emphasizes rich visuals, mobile optimized for thumb-scrolling
- Blog posts simplify interactions on mobile (keep structure, reduce complexity)

**Code Block Aesthetic:**
- **Syntax highlighting**: Vibrant/saturated colors that pop against the pink background
- **Background**: Transparent or minimal — vibrant syntax colors sit directly on pink page background
- **Borders**: Subtle green border for visual containment (ties to accent color system)
- **Inline code**: Matches code blocks — monospace with vibrant color, transparent background, no additional styling

### Claude's Discretion

- Exact font pairings (within the three-font system constraints)
- Specific color values for artistic palette (as long as they harmonize with pink/green)
- Precise spacing scale values (as long as philosophy is followed: generous in content, tight in UI)
- Exact responsive breakpoints (as long as desktop-first approach is maintained)

### Deferred Ideas (OUT OF SCOPE)

- Scroll animations and transitions — Phase 5 (Interactions & Polish)
- Blog post narrative structure and chapter breaks — Phase 4 (Immersive Reading Experience)
- Business card visual refinement — Phase 2 (Portfolio Transformation)
- Blog index search and filtering UI — Phase 3 (Blog Index Experience)
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DESIGN-01 | Bold, cohesive color palette evolved from existing green accent with strong visual hierarchy | OKLCH color space enables perceptually uniform palette generation; existing green #00a36c and pink #fdc3c6 provide foundation; complementary colors research |
| DESIGN-02 | Typography system with clear font size scale, weights, and line-height for optimal readability | Fluid typography using `clamp()` enables responsive scales; modular scale research (1.25 minor third for content, 1.125 major second for UI); web.dev typography best practices |
| DESIGN-03 | Spacing system (margins, padding, gaps) that creates visual breathing room | Contextual spacing approach: generous base-8 scale for content (8/16/24/32/48/64), tight base-4 scale for UI (4/8/12/16/24); CSS custom properties for scales |
| DESIGN-04 | Responsive breakpoints that adapt layout from mobile to desktop | Desktop-first breakpoints: 1440px+ (optimal), 1024px (laptop), 768px (tablet), 480px (mobile); CSS media queries with `max-width` approach |
| DESIGN-05 | CSS custom properties (variables) for consistent design tokens | Native CSS custom properties (`--token-name`) with @property for type-safe tokens; semantic naming convention; organized by category (color, typography, spacing, layout) |
| TYPE-01 | Hierarchy with distinct heading styles (H1, H2, H3) using size, weight, and spacing | Bold serif ultra-wide for headings with size scale H1:2.5rem → H2:2rem → H3:1.5rem; generous bottom margins; distinctive weight contrast |
| TYPE-02 | Body text optimized for reading (line length, line height, font size) | Neutral sans-serif at 1.05rem with 1.75 line-height; max-width 70ch for optimal line length; system font stack for performance |
| TYPE-03 | Code font treatment that integrates with overall aesthetic | Replace Roboto Mono with distinctive monospace (Source Code Pro, JetBrains Mono, or Fira Code); consistent sizing 0.95rem; vibrant colors on transparent background |
| TYPE-04 | Link styles that are visible but not distracting | Green color #00a36c with dotted underline; hover adds background tint; consistent across all contexts |
| TYPE-05 | List styles (bulleted, numbered) with proper indentation and spacing | Indentation 1.4rem; item spacing 0.55rem; consistent with body text max-width |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| CSS Custom Properties | Native | Design tokens system | Native browser support (100% modern browsers), no build tools required, runtime manipulable via JavaScript, scoped inheritance |
| Google Fonts | API v1 | Web font delivery | Zero configuration, CDN-hosted, optimized delivery, 1000+ font families, free and open source |
| PrismJS | 1.29+ | Syntax highlighting | Lightweight (2KB core), 297 language support, extensive theme system, plugin architecture, static site compatible |
| Modern CSS | Native | Layout & styling | Flexbox, Grid, clamp(), min/max, logical properties — all standard and well-supported |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| System Font Stack | Native | Body text fallback | Performance-first approach, zero web font load |
| OKLCH Color Space | Native CSS | Perceptual color generation | Creating artistic palette, better than HSL for perceptual uniformity |
| @property CSS Rule | Native | Type-safe custom properties | When animating custom properties or enforcing value types |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS Custom Properties | Sass variables | Sass requires build step but provides better variable scoping; custom properties preferred for runtime manipulation and GitHub Pages simplicity |
| Google Fonts | Self-hosted fonts | Self-hosting adds 100% control but requires build pipeline and CDN management; Google Fonts preferred for simplicity |
| PrismJS | Highlight.js | Highlight.js has auto-detection but PrismJS is lighter and more extensible |
| Modern CSS | CSS frameworks (Tailwind, Bootstrap) | Frameworks add overhead and learning curve; vanilla CSS maintains existing workflow |

**Installation:**
```html
<!-- Google Fonts (example - specific fonts TBD) -->
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:wght@400&family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">

<!-- PrismJS (core + theme + languages) -->
<link href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-bash.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-yaml.min.js"></script>
<!-- Additional languages as needed -->
```

## Architecture Patterns

### Recommended Project Structure
```
style.css
├── 1. Design Tokens          # CSS custom properties
├── 2. Reset & Base           # Normalize, box-sizing, root styles
├── 3. Typography             # Font stacks, scales, text styles
├── 4. Color System           # Palette definitions, semantic colors
├── 5. Spacing Utilities      # Margin/padding scales
├── 6. Layout Primitives      # Container, grid, flex patterns
├── 7. Components             # Card, nav, blog styles
├── 8. Code Styling           # Syntax highlighting overrides
└── 9. Responsive Overrides   # Desktop-first media queries
```

**Current structure:** Single `style.css` file — KEEP THIS. No build tools, no file splitting. Organization via CSS comments.

### Pattern 1: CSS Custom Properties for Design Tokens

**What:** Centralize all design values (colors, fonts, spacing, breakpoints) as custom properties in `:root`

**When to use:** Every design decision that appears more than once or might change

**Example:**
```css
/* Source: https://web.dev/learn/css/custom-properties */
:root {
  /* Color tokens */
  --color-background: #fdc3c6;
  --color-interactive: #00a36c;
  --color-interactive-hover: #00b57a;
  --color-text: #333;
  --color-text-muted: #555;
  
  /* Typography tokens */
  --font-heading: 'DM Serif Display', serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-code: 'JetBrains Mono', 'Courier New', monospace;
  
  /* Font size scale (fluid with clamp) */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.5rem);
  --text-xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
  --text-2xl: clamp(2rem, 1.7rem + 1.5vw, 2.5rem);
  
  /* Spacing scales (contextual) */
  --space-content-xs: 1rem;
  --space-content-sm: 1.5rem;
  --space-content-md: 2rem;
  --space-content-lg: 3rem;
  --space-content-xl: 4rem;
  
  --space-ui-xs: 0.25rem;
  --space-ui-sm: 0.5rem;
  --space-ui-md: 0.75rem;
  --space-ui-lg: 1rem;
  --space-ui-xl: 1.5rem;
  
  /* Layout tokens */
  --container-max: 900px;
  --container-padding: 20px;
  --breakpoint-mobile: 480px;
  --breakpoint-tablet: 768px;
  --breakpoint-laptop: 1024px;
  --breakpoint-desktop: 1440px;
}

/* Usage */
.post-content h2 {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  margin-bottom: var(--space-content-md);
  color: var(--color-text);
}
```

**Why this works:** Single source of truth, runtime manipulable, no build tools, inheritance works naturally, fallbacks available via second `var()` argument.

### Pattern 2: Fluid Typography with clamp()

**What:** Responsive font sizes that scale smoothly between min and max values based on viewport width

**When to use:** All typography that needs to scale responsively (headings, body text, UI text)

**Example:**
```css
/* Source: https://web.dev/learn/css/functions */
/* Formula: clamp(min, preferred, max) */
/* preferred = base + (target - base) * (100vw - min-vw) / (max-vw - min-vw) */

/* Simplified approach: */
h1 {
  /* Scales from 2rem at small screens to 2.5rem at large screens */
  font-size: clamp(2rem, 1.7rem + 1.5vw, 2.5rem);
}

.post-content {
  /* Body text: 1rem to 1.125rem */
  font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  /* Line height remains fixed for readability */
  line-height: 1.75;
}

/* UI elements use tighter scaling */
.nav-links a {
  font-size: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
}
```

**Why this works:** Eliminates most responsive typography media queries, smooth scaling across all viewport sizes, more maintainable than breakpoint-based sizing, better accessibility (respects user zoom).

### Pattern 3: Semantic Color System

**What:** Name colors by purpose (interactive, background, text) not by value (green, pink)

**When to use:** All color definitions

**Example:**
```css
:root {
  /* Base palette */
  --color-pink-base: #fdc3c6;
  --color-green-base: #00a36c;
  --color-green-light: #00b57a;
  --color-green-dark: #006b49;
  
  /* Semantic colors (what they're used for) */
  --color-background: var(--color-pink-base);
  --color-surface: #ffffff;
  --color-interactive: var(--color-green-base);
  --color-interactive-hover: var(--color-green-light);
  --color-text: #333;
  --color-text-muted: #555;
  --color-border: rgba(0, 163, 108, 0.2);
  
  /* Code syntax colors (vibrant for pink background) */
  --color-syntax-keyword: #d946ef;      /* Vibrant magenta */
  --color-syntax-string: #0ea5e9;       /* Bright blue */
  --color-syntax-function: #f59e0b;     /* Orange */
  --color-syntax-comment: #6b7280;      /* Muted gray */
  --color-syntax-number: #8b5cf6;       /* Purple */
}

/* Usage is semantic */
a {
  color: var(--color-interactive);
}

a:hover {
  color: var(--color-interactive-hover);
  background: rgba(0, 163, 108, 0.1);
}
```

**Why this works:** Changing theme involves changing base palette only, component styles remain semantic, easier to maintain consistency, clearer intent.

### Pattern 4: Contextual Spacing Scales

**What:** Different spacing scales for different contexts (content vs UI) rather than universal spacing system

**When to use:** Content needs breathing room, UI needs density

**Example:**
```css
:root {
  /* Content spacing (generous, base-8) */
  --space-content-xs: 0.5rem;   /* 8px */
  --space-content-sm: 1rem;     /* 16px */
  --space-content-md: 1.5rem;   /* 24px */
  --space-content-lg: 2rem;     /* 32px */
  --space-content-xl: 3rem;     /* 48px */
  --space-content-2xl: 4rem;    /* 64px */
  
  /* UI spacing (tight, base-4) */
  --space-ui-2xs: 0.125rem;  /* 2px */
  --space-ui-xs: 0.25rem;    /* 4px */
  --space-ui-sm: 0.5rem;     /* 8px */
  --space-ui-md: 0.75rem;    /* 12px */
  --space-ui-lg: 1rem;       /* 16px */
  --space-ui-xl: 1.5rem;     /* 24px */
}

/* Content context: generous spacing */
.post-content h2 {
  margin-top: var(--space-content-xl);
  margin-bottom: var(--space-content-md);
}

.post-content p {
  margin-bottom: var(--space-content-sm);
}

/* UI context: tight spacing */
.nav-links {
  gap: var(--space-ui-xl);
}

.nav-links a {
  padding: var(--space-ui-sm) var(--space-ui-lg);
}

.blog-card {
  padding: var(--space-ui-xl);
  gap: var(--space-ui-lg);
}

/* Mobile: reduce content spacing more aggressively */
@media (max-width: 768px) {
  .post-content h2 {
    margin-top: var(--space-content-lg);  /* 3rem → 2rem */
    margin-bottom: var(--space-content-sm); /* 1.5rem → 1rem */
  }
}
```

**Why this works:** Avoids compromise between conflicting needs (blog posts want space, navigation wants density), scales independently, clearer semantic intent.

### Pattern 5: Desktop-First Media Queries

**What:** Base styles target desktop (1440px+), progressively simplify for smaller screens using `max-width` queries

**When to use:** All responsive styling

**Example:**
```css
/* Base styles: desktop (1440px+) */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.card {
  width: 80%;
  max-width: 850px;
  aspect-ratio: 1.586;  /* Golden ratio */
}

/* Laptop (< 1440px) */
@media (max-width: 1440px) {
  .blog-grid {
    gap: 1.5rem;
  }
}

/* Tablet (< 1024px) */
@media (max-width: 1024px) {
  .card {
    width: 90%;
  }
}

/* Tablet portrait (< 768px) */
@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
  
  .card {
    width: 95%;
    aspect-ratio: 0.8;  /* More vertical on tablets */
  }
}

/* Mobile (< 480px) */
@media (max-width: 480px) {
  .card {
    width: 100%;
    aspect-ratio: 0.6;  /* Vertical for smartphones */
  }
  
  .blog-grid {
    gap: 1rem;
  }
}
```

**Why this works:** Aligns with user's priority (desktop-first), simplification flows naturally (remove complexity for mobile), easier to maintain than mobile-first when desktop is primary target.

### Anti-Patterns to Avoid

- **Universal spacing scale:** Don't force content and UI to share same spacing values — content needs breathing room, UI needs density
- **Pixel-based media queries:** Don't use device-specific pixels (320px, 375px, 414px) — use semantic breakpoints (mobile, tablet, laptop, desktop)
- **Inline styles for design tokens:** Don't use `<div style="color: #00a36c">` — use custom properties for maintainability
- **Hand-rolled color variations:** Don't manually create hover states with hardcoded values — use `color-mix()` or opacity variations
- **Font loading without fallbacks:** Don't rely only on web fonts — use system font stack as fallback
- **Magic numbers:** Don't use arbitrary values like `margin-top: 23px` — use spacing scale tokens

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Syntax highlighting | Custom regex-based highlighter | PrismJS (1.29+) | 297 languages, battle-tested regex patterns, theme ecosystem, plugins for line numbers/highlighting, CDN-hosted, 2KB core |
| Fluid typography calculations | Manual viewport-based formulas | CSS `clamp(min, preferred, max)` | Native browser support, automatic scaling, simpler syntax, better performance |
| Color palette generation | Manual color picking | OKLCH color space + online tools | Perceptually uniform, better than HSL, predictable lightness/chroma, generates harmonious palettes algorithmically |
| Font pairing | Trial-and-error testing | Google Fonts pairing suggestions + type specimen testing | Curated pairings, tested combinations, instant previews, performance metrics |
| Responsive breakpoints | Device-specific pixel values | Semantic breakpoints based on content | Content-driven breakpoints are future-proof, device landscape changes constantly |
| CSS organization | Multiple files + build tool | Single CSS file with comment sections | GitHub Pages simplicity, no build step, easier deployment, existing workflow preserved |

**Key insight:** The static site constraint (GitHub Pages, no build tools) is actually a forcing function for better architecture. Native CSS features (custom properties, clamp, grid, flexbox) eliminate most needs for preprocessors or frameworks. PrismJS solves syntax highlighting completely. Focus effort on design tokens and component organization, not tooling.

## Common Pitfalls

### Pitfall 1: Insufficient Color Contrast on Pink Background

**What goes wrong:** Pastels on pastel background create readability issues, especially for code blocks and muted text

**Why it happens:** Pink background (#fdc3c6) is light (L*~82), reducing contrast with white and light colors

**How to avoid:**
- Use WCAG AA contrast checker for all text/background pairs
- Code blocks: use vibrant/saturated colors (high chroma) not pastels
- Body text: use dark values (#333, #222) for sufficient contrast
- Interactive elements: use full saturation green (#00a36c) which has good contrast
- Test with browser DevTools contrast checker

**Warning signs:** Squinting to read text, difficulty scanning UI elements, code blocks blend into background

### Pitfall 2: Web Font Loading Flash (FOIT/FOUT)

**What goes wrong:** Page renders with system fonts, then flashes/reflows when Google Fonts load

**Why it happens:** Network latency loading fonts, browsers handle loading differently

**How to avoid:**
```css
/* Add font-display: swap to Google Fonts URL */
/* Example: ?display=swap */
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">

/* Define robust fallback stacks */
:root {
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  --font-heading: 'DM Serif Display', Georgia, 'Times New Roman', Times, serif;
  --font-code: 'JetBrains Mono', 'SF Mono', Monaco, 'Cascadia Code', 'Courier New', monospace;
}
```

**Warning signs:** Text invisible then appears (FOIT), layout shift when fonts load (FOUT), different sizing between system and web fonts

### Pitfall 3: Responsive Typography Breaks at Uncommon Viewport Sizes

**What goes wrong:** Font sizes look perfect at tested breakpoints (320px, 768px, 1440px) but too small/large at intermediate sizes (like 950px)

**Why it happens:** Fixed breakpoint approach creates sudden jumps, `clamp()` preferred values not well-calibrated

**How to avoid:**
- Test at many viewport widths (DevTools responsive mode: 320, 480, 600, 768, 900, 1024, 1280, 1440, 1920)
- Use [clamp() calculator tools](https://royalfig.github.io/fluid-typography-calculator/) to verify scaling curves
- Ensure `clamp()` preferred value scales smoothly: `clamp(minrem, baserem + multiplier * vw, maxrem)`
- Validate that min/max values feel appropriate at extreme sizes

**Warning signs:** Text too small at 900px, headings too large at 1280px, awkward scaling between breakpoints

### Pitfall 4: CSS Custom Property Inheritance Confusion

**What goes wrong:** Component overrides custom property but child components don't update as expected

**Why it happens:** Custom properties follow CSS cascade and inheritance, overrides apply to element and descendants

**How to avoid:**
```css
/* DON'T: Override global token locally */
.special-card {
  --color-background: #fff;  /* This affects children! */
}

/* DO: Create component-specific token */
.special-card {
  --card-bg: #fff;
  background: var(--card-bg);
}

/* Or use direct value when not reused */
.special-card {
  background: #fff;
}
```

**Warning signs:** Unexpected color changes in nested components, debugging reveals cascaded custom property value

### Pitfall 5: Spacing Inconsistency Between Content Types

**What goes wrong:** Blog posts have generous spacing, but blog index cards also inherit that generous spacing making them too loose

**Why it happens:** Single spacing scale applied universally without considering context

**How to avoid:**
- Use contextual spacing scales (`--space-content-*` vs `--space-ui-*`)
- Apply content spacing only to `.post-content` scope
- Apply UI spacing to `.blog-card`, `.nav-links`, etc.
- Document which scale applies to which contexts

**Warning signs:** Blog index feels too sparse, navigation feels cramped, mobile layouts don't compress proportionally

### Pitfall 6: PrismJS Theme Conflicts with Site Colors

**What goes wrong:** PrismJS default theme uses neutral backgrounds/colors that clash with vibrant pink background and green accent

**Why it happens:** PrismJS themes assume white/dark backgrounds, not colored backgrounds

**How to avoid:**
```css
/* Don't use PrismJS theme as-is, override with custom tokens */
pre[class*="language-"],
code[class*="language-"] {
  background: transparent !important;  /* Sit directly on pink */
  color: var(--color-text);
  font-family: var(--font-code);
  font-size: 0.95rem;
}

pre[class*="language-"] {
  border: 2px solid var(--color-interactive);  /* Green border */
  border-radius: 8px;
  padding: 1rem;
}

/* Override token colors with vibrant palette */
.token.comment { color: #6b7280; }
.token.keyword { color: #d946ef; }  /* Vibrant magenta */
.token.string { color: #0ea5e9; }   /* Bright blue */
.token.function { color: #f59e0b; } /* Orange */
.token.number { color: #8b5cf6; }   /* Purple */
```

**Warning signs:** Code blocks have gray backgrounds, syntax colors look muted, code doesn't feel integrated with site aesthetic

### Pitfall 7: Desktop-First Media Queries Applied Too Broadly

**What goes wrong:** Mobile styles cascade from desktop, creating overwrites everywhere or bloated mobile CSS

**Why it happens:** Desktop-first means mobile inherits everything, requiring careful override strategy

**How to avoid:**
- Structure media queries from largest to smallest (desktop → laptop → tablet → mobile)
- Use component-scoped overrides not global resets
- Test mobile-first to ensure simplified experience actually works
- Document what gets simplified/removed on mobile vs desktop

**Example structure:**
```css
/* Base: Desktop (1440px+) */
.component { /* full complexity */ }

/* Simplify progressively */
@media (max-width: 1440px) { /* laptop: minor adjustments */ }
@media (max-width: 1024px) { /* tablet: remove secondary features */ }
@media (max-width: 768px) { /* tablet portrait: single column */ }
@media (max-width: 480px) { /* mobile: minimal, thumb-optimized */ }
```

**Warning signs:** Mobile CSS is 50%+ of desktop CSS size, excessive `!important` flags, debugging requires tracing through 4+ media query layers

## Code Examples

Verified patterns from official sources:

### Modern CSS Custom Properties (Design Tokens)
```css
/* Source: https://web.dev/learn/css/custom-properties */
:root {
  /* Color palette */
  --color-background: #fdc3c6;
  --color-interactive: #00a36c;
  --color-text: #333;
  
  /* Typography */
  --font-heading: 'DM Serif Display', serif;
  --font-body: 'Inter', sans-serif;
  --font-code: 'JetBrains Mono', monospace;
  
  /* Fluid type scale */
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --text-xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
  --text-2xl: clamp(2rem, 1.7rem + 1.5vw, 2.5rem);
  
  /* Spacing scales */
  --space-content-sm: 1rem;
  --space-content-md: 1.5rem;
  --space-content-lg: 2rem;
  --space-ui-sm: 0.5rem;
  --space-ui-md: 0.75rem;
  --space-ui-lg: 1rem;
}

body {
  background-color: var(--color-background);
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-text);
}

h1 {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  margin-bottom: var(--space-content-lg);
}

code {
  font-family: var(--font-code);
  color: var(--color-interactive);
}
```

### Fluid Typography with clamp()
```css
/* Source: https://web.dev/learn/css/functions */
:root {
  /* Headings: larger scale, more dramatic scaling */
  --text-h1: clamp(2rem, 1.7rem + 1.5vw, 2.5rem);
  --text-h2: clamp(1.5rem, 1.3rem + 1vw, 2rem);
  --text-h3: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  
  /* Body: subtle scaling for readability */
  --text-body: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --text-small: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  
  /* UI: minimal scaling to maintain density */
  --text-ui: clamp(0.875rem, 0.85rem + 0.125vw, 0.95rem);
}

h1 { font-size: var(--text-h1); }
h2 { font-size: var(--text-h2); }
h3 { font-size: var(--text-h3); }
p { font-size: var(--text-body); }
.nav-links a { font-size: var(--text-ui); }
```

### OKLCH Color Palette
```css
/* Source: Modern CSS color spaces (OKLCH browser support 2023+) */
:root {
  /* Base colors in OKLCH (better perceptual uniformity than HSL) */
  --color-pink-oklch: oklch(82% 0.08 15);      /* Lightness 82%, chroma 0.08, hue 15° */
  --color-green-oklch: oklch(55% 0.15 160);    /* Lightness 55%, chroma 0.15, hue 160° */
  
  /* Generate palette variants */
  --color-green-light: oklch(65% 0.15 160);    /* Increase lightness */
  --color-green-dark: oklch(45% 0.15 160);     /* Decrease lightness */
  
  /* Harmonious palette (using hue rotation) */
  --color-accent-blue: oklch(60% 0.15 230);    /* +70° hue rotation */
  --color-accent-yellow: oklch(75% 0.12 90);   /* -70° hue rotation */
  
  /* Fallback for older browsers */
  --color-interactive: oklch(55% 0.15 160);
  --color-interactive: #00a36c;  /* Hex fallback */
}
```

### PrismJS Custom Theme Integration
```html
<!-- Source: https://prismjs.com -->
<!-- Load PrismJS core + basic theme (will be overridden) -->
<link href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>
```

```css
/* Override PrismJS theme for pink background + vibrant colors */
pre[class*="language-"],
code[class*="language-"] {
  background: transparent !important;
  color: #333;
  font-family: var(--font-code);
  font-size: 0.95rem;
  line-height: 1.5;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  tab-size: 4;
}

/* Block code: green border, transparent bg */
pre[class*="language-"] {
  background: transparent !important;
  border: 2px solid var(--color-interactive);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  overflow: auto;
}

/* Inline code: vibrant color, no bg */
:not(pre) > code[class*="language-"] {
  background: transparent;
  color: var(--color-interactive);
  padding: 0.2em 0.4em;
  border-radius: 4px;
}

/* Vibrant syntax highlighting for pink background */
.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #6b7280;  /* Muted gray - still visible */
}

.token.punctuation {
  color: #333;
}

.token.property,
.token.tag,
.token.boolean,
.token.constant {
  color: #d946ef;  /* Vibrant magenta */
}

.token.string,
.token.attr-value {
  color: #0ea5e9;  /* Bright blue */
}

.token.keyword,
.token.selector {
  color: #8b5cf6;  /* Purple */
}

.token.function {
  color: #f59e0b;  /* Orange */
}

.token.number {
  color: #10b981;  /* Emerald green */
}

.token.attr-name,
.token.class-name {
  color: #06b6d4;  /* Cyan */
}
```

### Contextual Spacing Scales
```css
/* Source: Design system research, base-8 for content, base-4 for UI */
:root {
  /* Content spacing: generous, base-8 progression */
  --space-content-xs: 0.5rem;   /* 8px */
  --space-content-sm: 1rem;     /* 16px */
  --space-content-md: 1.5rem;   /* 24px */
  --space-content-lg: 2rem;     /* 32px */
  --space-content-xl: 3rem;     /* 48px */
  --space-content-2xl: 4rem;    /* 64px */
  
  /* UI spacing: tight, base-4 progression */
  --space-ui-xs: 0.25rem;    /* 4px */
  --space-ui-sm: 0.5rem;     /* 8px */
  --space-ui-md: 0.75rem;    /* 12px */
  --space-ui-lg: 1rem;       /* 16px */
  --space-ui-xl: 1.5rem;     /* 24px */
  --space-ui-2xl: 2rem;      /* 32px */
}

/* Content context: blog posts */
.post-content h2 {
  margin-top: var(--space-content-xl);     /* 3rem above */
  margin-bottom: var(--space-content-md);  /* 1.5rem below */
}

.post-content p {
  margin-bottom: var(--space-content-sm);  /* 1rem between paragraphs */
}

.post-content ul {
  margin: var(--space-content-sm) 0;
}

/* UI context: navigation */
.nav-links {
  gap: var(--space-ui-xl);  /* 1.5rem between links */
}

.nav-links a {
  padding: var(--space-ui-sm) var(--space-ui-lg);  /* 0.5rem vertical, 1rem horizontal */
}

/* UI context: blog cards */
.blog-card {
  padding: var(--space-ui-xl);  /* 1.5rem padding */
}

.blog-card-content {
  gap: var(--space-ui-lg);  /* 1rem gap between elements */
}

/* Mobile: reduce content spacing more aggressively */
@media (max-width: 768px) {
  :root {
    --space-content-xl: 2rem;   /* 3rem → 2rem */
    --space-content-lg: 1.5rem; /* 2rem → 1.5rem */
    --space-content-md: 1rem;   /* 1.5rem → 1rem */
  }
}
```

### Desktop-First Responsive Pattern
```css
/* Source: Existing site patterns, desktop-first approach */

/* Base styles: Desktop (1440px+) */
.page-container {
  width: 100%;
  max-width: 900px;
  padding: 20px;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.card {
  width: 80%;
  max-width: 850px;
  aspect-ratio: 1.586;  /* Golden ratio, landscape */
}

/* Laptop: 1024-1440px */
@media (max-width: 1440px) {
  .blog-grid {
    gap: 1.2rem;
  }
}

/* Tablet: 768-1024px */
@media (max-width: 1024px) {
  .card {
    width: 90%;
  }
}

/* Tablet portrait: 480-768px */
@media (max-width: 768px) {
  .page-container {
    padding: 15px;
  }
  
  .blog-grid {
    grid-template-columns: 1fr;  /* Single column */
    gap: 1.2rem;
  }
  
  .card {
    width: 95%;
    aspect-ratio: 0.8;  /* More vertical */
  }
}

/* Mobile: < 480px */
@media (max-width: 480px) {
  .page-container {
    padding: 10px;
  }
  
  .blog-grid {
    gap: 1rem;
  }
  
  .card {
    width: 100%;
    aspect-ratio: 0.6;  /* Very vertical for thumbs */
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Sass/Less variables | CSS custom properties | 2016-present | Native browser support, runtime manipulation, no build tools needed |
| Fixed font sizes + media queries | Fluid typography (clamp) | 2020-present | Smooth scaling, fewer breakpoints, better accessibility |
| HSL color space | OKLCH color space | 2023-present | Perceptually uniform, better lightness control, predictable palette generation |
| Build-time font loading | font-display: swap + preconnect | 2019-present | Better loading performance, reduced FOUT/FOIT |
| Highlight.js auto-detection | PrismJS explicit language | Ongoing preference | Lighter weight, more control, better for static sites |
| Mobile-first responsive | Desktop-first (when appropriate) | Depends on audience | If desktop is primary, desktop-first reduces mobile complexity |
| Universal spacing scale | Contextual spacing scales | Emerging pattern | Content and UI have different density needs |

**Deprecated/outdated:**
- **Roboto Mono for code**: Too generic, low x-height makes it harder to read on colored backgrounds. Replace with JetBrains Mono, Source Code Pro, or Fira Code.
- **Pixel-based media queries (320px, 375px, 414px)**: Device landscape changes constantly. Use semantic breakpoints (mobile, tablet, laptop, desktop).
- **HSL for palette generation**: Poor perceptual uniformity (HSL 50% lightness isn't perceptually 50%). Use OKLCH instead.
- **@import for Google Fonts**: Blocks rendering. Use `<link>` with `preconnect`.
- **Fixed line-height ratios (1.5 everywhere)**: Different font families need different line-heights. Headings want 1.2, body wants 1.75, code wants 1.5.

## Open Questions

1. **Specific font choices for three-font system**
   - What we know: Need bold serif ultra-wide (headings), neutral sans-serif (body), distinctive monospace (code)
   - What's unclear: Exact Google Fonts pairing that achieves visual personality without performance issues
   - Recommendation: Test combinations like DM Serif Display + Inter + JetBrains Mono, evaluate loading performance and visual hierarchy. Document final choice in PLAN.md with rationale.

2. **Artistic palette colors beyond pink/green**
   - What we know: Need cohesive, bold palette that harmonizes with salmon pink (#fdc3c6) and green (#00a36c)
   - What's unclear: How many additional colors needed, which hue angles create "bold" while maintaining harmony
   - Recommendation: Use OKLCH color space with hue rotations (analogous: ±30°, complementary: 180°, triadic: ±120°). Test 3-4 additional colors with similar chroma (0.12-0.15) and varying lightness. Prioritize high chroma for vibrancy.

3. **Mobile spacing reduction strategy**
   - What we know: Mobile needs selectively tighter spacing, more aggressive reduction than tablet
   - What's unclear: How much reduction is "more aggressive"? Which elements reduce and which preserve spacing?
   - Recommendation: Test reducing content spacing by 33% on mobile (3rem → 2rem, 2rem → 1.5rem), UI spacing by 20% (1rem → 0.8rem). Preserve minimum touch target sizes (44x44px). Document reduction ratios in spacing tokens.

4. **Syntax highlighting theme customization for pink background**
   - What we know: Need vibrant colors that pop against pink, transparent backgrounds, green borders
   - What's unclear: Which specific PrismJS theme to start from (if any), exact color values for each token type
   - Recommendation: Start with PrismJS "Tomorrow Night" theme colors, increase saturation by 20-30%, test contrast ratios. Override background/border styles completely. Create custom theme in CSS, don't rely on PrismJS theme files.

## Sources

### Primary (HIGH confidence)
- **web.dev Learn CSS** (https://web.dev/learn/css/) - Official Google documentation on modern CSS features including custom properties, typography, spacing, and responsive design patterns
- **web.dev Custom Properties** (https://web.dev/learn/css/custom-properties) - CSS custom properties API, @property rule, inheritance, and fallback patterns
- **web.dev Typography** (https://web.dev/learn/css/typography) - Font loading strategies, @font-face, font-display, fluid typography patterns
- **PrismJS Official Documentation** (https://prismjs.com) - Syntax highlighting library documentation, 297 languages, theme system, plugin architecture
- **Google Fonts** (https://fonts.google.com) - Web font delivery service, 1000+ font families, pairing suggestions, performance metrics
- **Existing site code** (style.css, index.html) - Current implementation using Roboto Mono, salmon pink background #fdc3c6, green accent #00a36c

### Secondary (MEDIUM confidence)
- **Rudeops.com** (https://rudeops.com) - Inspiration reference for clean typography and newsletter style
- **Peggy Gou site** (https://peggygou.com) - Inspiration reference for bold visual personality and immersive design
- **MDN CSS Reference** (https://developer.mozilla.org/en-US/docs/Web/CSS) - Browser compatibility data for CSS features

### Tertiary (LOW confidence — general knowledge)
- Modular scale theory (1.25 minor third for content, 1.125 major second for UI) - industry standard ratios
- WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text) - accessibility standard
- Base-8 spacing scale for content, base-4 for UI - common design system pattern
- 70ch max-width for optimal readability - typography research consensus

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - CSS custom properties, Google Fonts, and PrismJS are industry-standard, well-documented solutions with verified compatibility
- Architecture: HIGH - Patterns sourced from official web.dev documentation and existing site implementation
- Typography system: HIGH - Fluid typography with clamp() is standard practice, font loading strategies documented by Google
- Color system: MEDIUM - OKLCH color space is newer (2023+), fallback to hex ensures compatibility
- Spacing system: MEDIUM - Contextual spacing approach is emerging best practice, not universally documented
- Pitfalls: HIGH - Based on known issues with CSS custom properties, font loading, PrismJS integration

**Research date:** 2026-02-20
**Valid until:** 60 days (stable domain, CSS specifications change slowly, PrismJS stable)

**Next steps for planner:**
1. Break down into executable plans: (a) CSS custom properties setup, (b) Typography implementation, (c) Color palette definition, (d) Spacing system, (e) PrismJS integration, (f) Responsive refinement
2. Each plan should reference specific code examples from this research
3. Verification criteria should check contrast ratios, font loading performance, mobile spacing reduction, syntax highlighting visibility
4. Plans should preserve existing site structure (single style.css, no build tools)
