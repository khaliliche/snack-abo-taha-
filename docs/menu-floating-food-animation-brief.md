# Reverse-engineering notes: floating food imagery around a menu

## Goal

Recreate the motion shown in `IMG_6729.mp4`: an elegant, editorial restaurant-menu section on a muted olive/green background. Large, refined serif category names remain centered while cut-out food photographs float around them. The food images enter, drift into place, and settle; the page itself and the typography are comparatively stable.

This is an implementation brief for the coding agent, not a request to embed the source video as the animation.

## What is visible in the reference

- A single vertically stacked menu composition with three centered categories: **MENU**, **SUSHI**, and **BOISSON**.
- Small uppercase eyebrow text above the first category, fine horizontal rules separating rows, and a small outlined CTA under the categories.
- A soft olive/khaki green background with low-contrast texture or a subtle gradient.
- Category headings use a thin, high-contrast editorial serif, pale ivory text, generous tracking, and centered alignment.
- Food images are isolated rectangular/organic cut-outs, with rounded corners or transparent-looking edges depending on the asset. They are deliberately asymmetric in size and placement rather than arranged as a conventional grid.
- Images sit partly beside and partly overlap the visual space around the headings, without making the words impossible to read.
- Motion is restrained: images fade/scale/translate into their positions, with a gentle floating quality. The headings, separators, and CTA do not visibly perform large entrance movements.
- The recording shows one cluster around MENU/SUSHI first, then the arrangement around BOISSON changes as the animation/scroll progresses. The exact trigger cannot be established from this screen recording alone; implement it as scroll-triggered if the section is part of a scrolling page, and use a one-time entrance trigger if it is an isolated hero/menu block.

## Layout specification

Build a section with a centered content column and three category rows.

1. **Section shell**
   - Full-width olive green background.
   - Content max-width around `900–1100px` on desktop, with generous top/bottom padding.
   - Use a subtle background gradient/noise only if the project already has a suitable texture; avoid a strong pattern that competes with the food.
   - Keep the menu content in normal document flow. Use a positioned inner wrapper for the decorative food images.

2. **Category row**
   - Three rows stacked vertically, separated by thin low-opacity ivory rules.
   - Each row has a centered title, one short subtitle, and optionally a small CTA where shown in the reference.
   - Typography should be the visual anchor: large uppercase serif, thin weight, slightly expanded letter spacing.
   - Keep each title above the image layer (`z-index`) so its legibility is deliberate, not accidental.
   - Do not force all rows to have identical image placements. Each row should have its own composition.

3. **Food-image layer**
   - Use real food photography assets with transparent backgrounds where possible. If transparent cut-outs are unavailable, use carefully cropped images with no heavy card chrome.
   - Place images absolutely within the category row or a shared decorative layer. Give each image a stable target position relative to its row.
   - Vary image sizes: a few small images and one or two larger accents. Keep sufficient negative space around the heading.
   - Images may overlap the row separators slightly, as in the reference, but should not cover the main text.
   - Use `pointer-events: none` on purely decorative images and meaningful `alt=""` for decorative assets. If the images are content, use useful alt text instead.

## Animation model

Use a data-driven animation for each image. Each image needs:
- a final `x/y` position (CSS `left/top` or `transform`),
- a starting offset (roughly 20–80px from its final position),
- a starting scale (roughly `0.72–0.9`),
- a starting opacity (`0` or very low),
- a final scale (`1`, with only slight variation),
- a small rotation (about `-8deg` to `8deg`) that settles to a designed final angle.

### Entrance sequence

For each image:
1. Start transparent and slightly smaller.
2. Translate from its own offset toward its final position.
3. Fade in while scaling up.
4. Settle with a soft ease-out; avoid a springy overshoot unless the site already uses a restrained spring.
5. Stagger neighboring images by approximately `70–140ms`, so they do not all pop in simultaneously.

Suggested timing:
- Duration: `700–1100ms`.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` or the project's equivalent smooth ease-out.
- Stagger: `0.08–0.14s` per image.
- Keep the title and divider mostly static. If a heading entrance is needed, use only a subtle opacity reveal and a few pixels of vertical movement.

### Floating / idle motion

Once an image reaches its final position, give it a very small ambient float:
- vertical travel: `4–8px`,
- duration: `3.5–5.5s`,
- easing: `ease-in-out`,
- alternate direction and duration across images,
- use different delays so the movement feels organic rather than synchronized.

The float should be almost subliminal. Do not rotate continuously or make the images bob aggressively. If using CSS keyframes, animate a nested element: one wrapper handles the entrance transform, and an inner element handles idle float. This prevents the entrance transform from fighting the idle animation.

### Scroll behavior

If the section is reached by scrolling:
- Use `IntersectionObserver`, Framer Motion `whileInView`, or GSAP ScrollTrigger (whichever is already installed in the project).
- Trigger the entrance when the section is around `20–30%` visible.
- Prefer `once: true` so images do not repeatedly restart as the user scrolls a few pixels up/down.
- If the reference's later image rearrangement is meant to be scroll-driven, use scroll progress to interpolate between two *authored* image layouts. Do not randomly move images on every scroll event.
- Avoid pinning the entire page or adding a complex scroll hijack for this effect.

## Recommended implementation approach

First inspect the project and reuse its existing animation library. Do not add a new dependency just for this.

### React/Framer Motion example pattern

Keep the image layout in an array so each image has a clear, deterministic target. The code below is illustrative; adapt class names, assets, and API to the existing project.

```tsx
const foodImages = [
  {
    src: "/images/menu-food-1.webp",
    alt: "",
    className: "food food--menu-left",
    delay: 0.00,
    fromX: -42,
    fromY: 24,
    rotate: -5,
  },
  {
    src: "/images/menu-food-2.webp",
    alt: "",
    className: "food food--sushi-right",
    delay: 0.10,
    fromX: 38,
    fromY: 18,
    rotate: 4,
  },
];

{foodImages.map((item) => (
  <motion.div
    key={item.src}
    className={item.className}
    initial={{
      opacity: 0,
      x: item.fromX,
      y: item.fromY,
      scale: 0.82,
      rotate: item.rotate - 3,
    }}
    whileInView={{
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: item.rotate,
    }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{
      duration: 0.9,
      delay: item.delay,
      ease: [0.16, 1, 0.3, 1],
    }}
  >
    <motion.img
      src={item.src}
      alt={item.alt}
      animate={{ y: [0, -5, 0] }}
      transition={{
        duration: 4.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: item.delay,
      }}
    />
  </motion.div>
))}
```

Important: in production, make sure the parent wrapper's entrance transform and the child image's idle float are independent. Check for transform conflicts, and do not use `whileInView` on an element that is already visible at initial page load if it causes a visible flash.

## Responsive behavior

- Desktop: use the full asymmetric composition.
- Tablet: reduce image sizes by roughly `15–25%` and pull images closer to the center.
- Mobile: simplify the composition rather than merely shrinking every image. Keep one or two food accents per row, prevent overlap with the heading/subtitle, and disable or reduce idle float if it harms readability/performance.
- Use `clamp()` for heading size and image dimensions.
- Ensure no horizontal overflow from absolutely positioned images.
- Recalculate positions per breakpoint with CSS classes or container queries; avoid hard-coded desktop pixel coordinates that break on narrow screens.

## Accessibility and performance

- Respect `prefers-reduced-motion`: show images in their final positions with no float or stagger.
- Animate only `transform` and `opacity` where possible.
- Provide explicit image dimensions or `aspect-ratio` to avoid layout shift.
- Use optimized WebP/AVIF assets and avoid loading huge transparent PNGs.
- Lazy-load assets if the section is below the fold, but preload the most prominent images if it is the first viewport.
- Do not let decorative images intercept clicks or keyboard input.
- Keep text contrast high enough against the olive background.

## Visual tuning checklist

- [ ] The typography is the focal point; food imagery is secondary.
- [ ] The images appear to drift in and settle, rather than pop abruptly.
- [ ] Stagger is visible but subtle.
- [ ] Idle movement is only a few pixels and never distracts from reading.
- [ ] Image placement feels deliberately art-directed and asymmetric.
- [ ] The category text stays legible at every animation state.
- [ ] Dividers and CTA remain stable.
- [ ] Mobile layout has no collisions or horizontal scrolling.
- [ ] Reduced-motion mode disables entrance and ambient movement.
- [ ] No new animation dependency was added unnecessarily.

## Uncertainties

This is a screen recording of a display, not the original source or a clean capture of the website. The reference establishes the visual composition and the general fade/scale/translation behavior, but it does not prove whether the original was implemented with CSS, Framer Motion, GSAP, a scroll timeline, or a pre-rendered animation. Match the *perceived result*, not an assumed original implementation.
