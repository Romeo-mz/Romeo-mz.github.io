# Phase 2: Portfolio Transformation - Context

**Gathered:** 2026-02-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Refine the flippable business card showcase with the new design system (Phase 1 foundation) while maintaining the signature flip interaction. Apply new color palette, typography, and visual treatment to both card sides. Ensure smooth, polished flip animation and responsive adaptation across all screen sizes.

</domain>

<decisions>
## Implementation Decisions

### Card Visual Style
- Transparent/minimal card background — content floats directly on the pink page background
- Subtle green border frames the card (solid thin line, 1-2px)
- Sharp, clean border treatment (no rounded corners mentioned, keep crisp)
- Contrasting visual treatment between front and back sides to signal the flip

### Flip Animation Character
- Quick start, smooth finish — ease-out easing (snappy initiation, gentle landing)
- Medium duration: 0.5-0.6 seconds (balanced, smooth, easy to follow)
- Identical animation timing across mobile and desktop (consistent experience)
- Animation should feel polished and refined

### Claude's Discretion
- Flip axis direction (horizontal vs vertical) — choose what works best with layout
- Specific contrast approach between front/back visual treatment (which side gets more prominence, how to create visual difference)
- Exact border thickness within 1-2px range
- Card content layout refinements using new typography system
- Responsive scaling and breakpoint adaptations
- Mobile interaction details (tap target size, touch feedback)

</decisions>

<specifics>
## Specific Ideas

**Animation feel:**
- "Fast first then smooth with ease" — user wants snappy start with controlled finish
- Not linear or mechanical — should feel intentional and polished

**Visual integration:**
- Card should feel integrated with the bold pink background (not traditional white card)
- Green border ties to accent color system established in Phase 1
- Minimal container approach supports bold, modern aesthetic

**Current structure to preserve:**
- Flip-on-click interaction (core identity)
- Front side: intro, role, "What I Do", social links
- Back side: Tech Stack and Soft Skills sections
- Basic responsive behavior (adapts to screen sizes)

</specifics>

<deferred>
## Deferred Ideas

**3D Tilt Interaction (Phase 5: Interactions & Polish):**
- Mouse movement creates subtle 3D tilt/perspective shifts on desktop
- Touch/thumb movement creates similar tilt effect on mobile
- Requires tilt physics, mouse/touch tracking, 3D transform system
- This is a new interaction capability beyond refining the existing flip

**Content hierarchy and layout decisions:**
- Which content stays/goes/changes on front and back
- Information density adjustments
- Typography scale application specifics
- These were not discussed — planner and executor have flexibility

**Responsive behavior specifics:**
- Detailed mobile vs desktop differences
- Orientation handling
- Scaling strategy across breakpoints
- Not discussed — planner determines based on Phase 1 responsive approach

</deferred>

---

*Phase: 02-portfolio-transformation*
*Context gathered: 2026-02-20*
