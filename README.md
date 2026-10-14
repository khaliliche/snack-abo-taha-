# Snack Abo Taha — Frontend

Next.js (App Router) + Tailwind CSS v4 + TypeScript. **No animation dependency added**: every motion is CSS + `IntersectionObserver` + `requestAnimationFrame`.

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Where things live
- `src/app/globals.css` — palette (olive / ivory / saffron / harissa), buttons, marquee, floating-food layers, reduced-motion rules
- `src/components/FoodField.tsx` — data-driven floating food engine (entrance, idle float, scroll + pointer parallax)
- `src/components/Food.tsx` — vector food illustrations (swap for real cut-out photos: render `<img>` instead of `<FoodArt>`)
- `src/data/showcase.ts` — art-directed layouts per row (desktop + `m` mobile composition)
- `src/components/Showcase.tsx` — the three big serif category rows from the brief
- `src/components/MenuSection.tsx` — full interactive menu (reads `src/data/menu.ts`)
- `src/data/site.ts`, `src/data/menu.ts` — your original content, unchanged

## Floating-food animation (per the brief)
3 independent layers so transforms never fight: `.food` (position + parallax) → `.food__in` (fade/scale/translate/rotate entrance, stagger 0.05–0.36s, ease `cubic-bezier(.16,1,.3,1)`) → `.food__art` (4–8px idle float, alternating durations). Triggered once at 25% visibility. `prefers-reduced-motion` shows the final state with no movement.

## To verify
Placeholders from the original data are kept (`address`, `hours`, WhatsApp number).
