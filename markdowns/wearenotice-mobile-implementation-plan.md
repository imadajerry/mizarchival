# Wearenotice Mobile Reference Implementation Plan

## Goal

Build the first version of the MizArch one-page portfolio using the `wearenotice.com_pages_about-us_mobile.png` reference as the primary visual direction. The Craftwork reference is out of scope for this phase.

The page should feel editorial, image-led, bold, and mobile-first, while still adapting cleanly to desktop later.

## Recommended Stack

- HTML for page structure
- CSS for layout, typography, responsive behavior, and visual styling
- Vanilla JavaScript for small interactions

No framework is needed for the first version. The page is static, single-page, and does not currently require routing, state management, reusable data-driven templates, or a CMS.

## Reference Breakdown

Primary reference:

- `references/wearenotice.com_pages_about-us_mobile.png`

Key visual traits to carry over:

- Full-screen hero with a photographic background
- Very large uppercase headline layered over the image
- Minimal top/bottom decorative navigation marks
- Horizontal ticker/marquee band below the hero
- Off-white content background
- Strong black typography
- Large stacked section heading
- Centered visual/product/project image block
- Long editorial paragraph section
- Dark disclaimer-style band
- Bright, high-contrast footer/contact section
- Mobile bottom navigation bar

## Content Structure

### 1. Hero

Purpose: Create immediate identity and visual impact.

Implementation notes:

- Use a full viewport-height mobile hero.
- Place a large background image with `object-fit: cover`.
- Add a subtle dark overlay so white type remains readable.
- Use oversized uppercase headline text split over multiple lines.
- Add small eyebrow copy above the headline.
- Add simple corner/arrow-style decorative marks if they fit MizArch branding.

Potential portfolio adaptation:

- Eyebrow: `I DESIGN`
- Headline: `SPACES THAT DEMAND ATTENTION`
- Background: architecture/interior/project photograph

### 2. Marquee Band

Purpose: Add motion and brand attitude without heavy interaction.

Implementation notes:

- Black horizontal strip directly after the hero.
- White uppercase repeated text.
- CSS animation for continuous horizontal scrolling.
- Respect reduced-motion preferences by disabling animation.

Potential text:

- `ARCHITECTURE - INTERIORS - OBJECTS - SPACES - MIZARCH -`

### 3. Intro Section

Purpose: Establish the studio or personal portfolio position.

Implementation notes:

- Off-white background.
- Large black uppercase heading.
- Tight line height.
- Mobile-first spacing.

Potential heading:

- `BUILDING SPACES MADE TO CHALLENGE THE ORDINARY`

### 4. Featured Visual Section

Purpose: Replace the red object collage from the reference with architecture/project imagery.

Implementation notes:

- Use one strong centered image or a simple overlapping image cluster.
- Keep the layout image-led, not card-heavy.
- Avoid nested cards or decorative panels.
- Use stable image dimensions to avoid layout shifts.

### 5. About / Statement

Purpose: Provide the core portfolio description.

Implementation notes:

- Large, readable paragraph text.
- Left-aligned on mobile.
- Keep line length comfortable on desktop.
- Use confident editorial copy rather than explanatory UI text.

Content placeholder:

> MizArch creates architectural and interior spaces with a focus on atmosphere, proportion, material presence, and memorable detail.

### 6. Dark Text Band

Purpose: Add a dense graphic moment similar to the Notice disclaimer area.

Implementation notes:

- Black or near-black background.
- Low-contrast uppercase text.
- Use this for a short manifesto, services list, or project philosophy.
- Keep it decorative but still readable enough to avoid looking broken.

### 7. Sticky Bottom Navigation

Purpose: Mirror the mobile reference while keeping navigation usable.

Implementation notes:

- Fixed bottom bar on mobile.
- Include menu, centered wordmark, and contact/search-style action.
- Use icon buttons with accessible labels.
- Add enough bottom padding to the page content so the bar does not cover footer content.

Suggested nav items:

- Menu
- MizArch wordmark
- Contact

### 8. Footer / Contact

Purpose: End with a strong contact block.

Implementation notes:

- Use a bright high-contrast footer color, but adapt it to MizArch identity.
- Include email, Instagram, location, and copyright.
- Use a large wordmark treatment.
- Ensure footer remains usable behind the fixed bottom nav on mobile.

## Interaction Plan

Keep interactions minimal for version one:

- Mobile menu open/close
- Smooth scrolling to sections
- Marquee animation
- Hover/focus states for links and buttons
- Optional image reveal on scroll only if implemented cleanly

Avoid for now:

- Complex page transitions
- Heavy scroll-jacking
- 3D scenes
- CMS integration
- Framework state management

## File Structure

Recommended static structure:

```text
index.html
src/
  styles.css
  main.js
assets/
  images/
    hero.jpg
    featured-01.jpg
    featured-02.jpg
references/
  wearenotice.com_pages_about-us_mobile.png
markdowns/
  wearenotice-mobile-implementation-plan.md
```

If using Vite later, keep the same structure and add `package.json` only when a dev server/build pipeline is needed.

## CSS Approach

- Mobile-first layout
- CSS custom properties for color, spacing, and typography
- Use `clamp()` sparingly for large display headings
- Avoid viewport-width-based body text scaling
- Use `position: sticky` or `fixed` only where the behavior is intentional
- Add `prefers-reduced-motion` support
- Use responsive image rules: `width: 100%`, `height: auto`, and stable aspect ratios

## Accessibility Requirements

- Semantic page landmarks: `header`, `main`, `section`, `footer`, `nav`
- Descriptive `alt` text for portfolio images
- Visible focus states
- Real buttons for menu controls
- Sufficient contrast for primary text
- `aria-expanded` on the mobile menu toggle
- Reduced-motion fallback for marquee

## Implementation Phases

### Phase 1: Static Mobile Page

- Create `index.html`
- Add page sections
- Add responsive CSS
- Add placeholder assets or temporary local image references
- Match mobile reference composition closely

### Phase 2: Basic Interaction

- Add menu toggle
- Add smooth section navigation
- Add marquee behavior via CSS
- Add reduced-motion handling

### Phase 3: Desktop Adaptation

- Expand the layout beyond mobile
- Keep the same visual language but adjust hero typography and section grids
- Ensure the page does not become a generic landing page

### Phase 4: Content Replacement

- Replace placeholder copy with final MizArch positioning
- Replace placeholder images with actual portfolio/project imagery
- Add real social/contact links

## Acceptance Criteria

- The first viewport strongly resembles the mobile Notice reference in structure and impact.
- The page works as a single static portfolio page.
- The page opens directly in a browser without a required build step.
- Mobile layout is the primary design target.
- Desktop layout remains clean and readable.
- No framework dependency is introduced.
- Craftwork reference is not used for this phase.
