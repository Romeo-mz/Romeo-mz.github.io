# Phase 1: Design Foundation - Context

**Gathered:** 2026-02-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Build cohesive design system with color palette, typography, spacing, and CSS variables. This phase establishes the visual foundation for all subsequent phases — the palette, font choices, spacing philosophy, responsive breakpoints, and code aesthetic that will be applied to portfolio, blog, and interactive elements.

</domain>

<decisions>
## Implementation Decisions

### Color Palette
- Site-wide salmon/pastel pink background (warm, approachable tone)
- Green as primary interactive color (buttons, links, hover states)
- Additional colors should form an artistic palette that harmonizes with pink/green foundation
- Researcher should explore color combinations that feel cohesive and bold

### Typography System
- Three-font system with distinct roles:
  - **Headings**: Bold serif ultra-wide typeface (strong visual impact)
  - **Body text**: Neutral sans-serif (readable, unobtrusive)
  - **Code**: Distinctive monospace (NOT Roboto Mono — replace entirely)
- Moving completely away from Roboto Mono across the site
- Font choices should create clear hierarchy and personality

### Spacing Philosophy
- **Generous spacing**: Around headings and within blog post content (breathable, immersive)
- **Tight/compact spacing**: Navigation, UI elements, and blog index cards (dense, scannable)
- **Mobile spacing**: Selectively tighter — reduce spacing more aggressively on small screens
- **Contextual approach**: Each component type has its own spacing scale (not one universal system)

### Responsive Approach
- Desktop-first design (1440px+ optimal experience)
- Mobile is functional but deliberately simplified
- Flippable business card interaction preserved on mobile (scaled but same behavior)
- Blog index gets different designs: desktop emphasizes rich visuals, mobile optimized for thumb-scrolling
- Blog posts simplify interactions on mobile (keep structure, reduce complexity)

### Code Block Aesthetic
- **Syntax highlighting**: Vibrant/saturated colors that pop against the pink background
- **Background**: Transparent or minimal — vibrant syntax colors sit directly on pink page background
- **Borders**: Subtle green border for visual containment (ties to accent color system)
- **Inline code**: Matches code blocks — monospace with vibrant color, transparent background, no additional styling

### Claude's Discretion
- Exact font pairings (within the three-font system constraints)
- Specific color values for artistic palette (as long as they harmonize with pink/green)
- Precise spacing scale values (as long as philosophy is followed: generous in content, tight in UI)
- Exact responsive breakpoints (as long as desktop-first approach is maintained)

</decisions>

<specifics>
## Specific Ideas

**Inspiration references:**
- **Rudeops** (rudeops.com): Clean typography, newsletter style, effective hierarchy
- **Zeroday/Substack**: Structured blog layout, clear post cards
- **Peggy Gou** (peggygou.com): Bold visual personality, immersive design, strong color use

**Core identity:**
- Must preserve flippable business card as signature interaction
- Green accent is brand anchor that should evolve into fuller palette
- Site is DevOps/tech content but should feel bold and artistic (not generic developer blog)

**Code presentation:**
- Bold choice: Vibrant syntax highlighting directly on pink background with green borders
- This creates distinctive technical aesthetic that matches the site's overall personality

</specifics>

<deferred>
## Deferred Ideas

- Scroll animations and transitions — Phase 5 (Interactions & Polish)
- Blog post narrative structure and chapter breaks — Phase 4 (Immersive Reading Experience)
- Business card visual refinement — Phase 2 (Portfolio Transformation)
- Blog index search and filtering UI — Phase 3 (Blog Index Experience)

</deferred>

---

*Phase: 01-design-foundation*
*Context gathered: 2026-02-20*
