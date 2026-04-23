# Spec: Full Rebuild — dousanmiao.com Aesthetic + Motion System

**Date:** 2026-04-23  
**Scope:** Complete teardown and rebuild of visual design + motion system to match dousanmiao.com  
**Reference site:** https://www.dousanmiao.com/ (Framer, Framer Motion, lottie-web)  
**Stack:** Next.js 15, TypeScript, Framer Motion (already installed), Lenis (to add)

---

## 1. Goals

- Match the light, minimal aesthetic of dousanmiao.com exactly: white/off-white background, near-black text, generous whitespace
- Replace the current dark-first motion system with a ground-up rebuild using dousanmiao.com interaction patterns
- Every animation, scroll behaviour, hover state, cursor, and transition must match the reference site's feel
- Preserve all existing content (projects, case studies, contact form) — only visual design and motion change

---

## 2. Visual Design System

### 2.1 Color Tokens (globals.css `:root`)

Replace current dark defaults. The site renders light by default — remove `.dark` class application from `layout.tsx`.

| Token | Old value | New value |
|---|---|---|
| `--background` | `#fefefd` | `#ffffff` |
| `--foreground` | `#0a0a0a` | `#111111` |
| `--primary` | `#16a34a` | `#111111` |
| `--secondary` | `#6b7280` | `#888888` |
| `--surface` | `rgba(0,0,0,0.03)` | `#f9f9f7` |
| `--surface-hover` | `rgba(0,0,0,0.06)` | `#f3f3f1` |
| `--border` | `rgba(0,0,0,0.08)` | `#e8e8e6` |

Remove: `--primary` green, grain overlay, orb effects, glass-bg. Remove the `.dark` class override entirely — the site is light-only.

### 2.2 Typography

Keep **Syne** (display) and **Space Grotesk** (body) — they are clean grotesques close to dousanmiao.com's Neue Montreal. No new font imports needed.

Update type scale to match dousanmiao.com's proportions:
- Hero heading: `clamp(2rem, 4vw, 3.5rem)` — tighter, editorial, not oversized
- Section labels: `11px`, `0.15em` letter-spacing, `#aaa` — identical to reference
- Body: `15px` / `1.6` line-height
- Project titles: `15px` medium weight

### 2.3 Layout

Switch from card-based project grid to **horizontal list rows** matching dousanmiao.com:
- Each project: full-width row, `border-top: 1px solid var(--border)`
- Row: project title left + year, arrow `↗` right
- On hover: row background becomes `var(--surface)`, arrow rotates to 45°, thumbnail appears (absolute positioned)
- "SHIPPED" / "CONFIDENTIAL" tags in green/grey pill

Remove: glassmorphism cards, gradient borders, green accent glow, grain texture, ambient orbs.

---

## 3. Motion System Rebuild

### 3.1 Motion Token File (`src/lib/motion.ts`)

Complete replacement:

```ts
// Easing — matches dousanmiao.com Framer curves
export const ease = {
  out:     [0.0, 0.0, 0.2, 1]   as [number,number,number,number],
  inOut:   [0.4, 0, 0.2, 1]     as [number,number,number,number],
  premium: [0.16, 1, 0.3, 1]    as [number,number,number,number],  // signature Framer ease
  sharp:   [0.27, 0, 0.51, 1]   as [number,number,number,number],
}

export const spring = {
  default: { type: 'spring', stiffness: 400, damping: 30, mass: 1 },
  gentle:  { type: 'spring', stiffness: 150, damping: 20, mass: 0.8 },
}

export const duration = { fast: 0.2, base: 0.5, slow: 0.8, xslow: 1.2 }

// Base variants
export const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.premium } },
}

export const stagger = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

export const clipReveal = {
  hidden:  { clipPath: 'inset(0 0 100% 0)' },
  visible: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.8, ease: ease.premium } },
}
```

### 3.2 Smooth Scroll — Lenis

Install `lenis` package. Create `src/components/SmoothScroll.tsx` — a client component that wraps the app, initialises Lenis on mount, and passes the scroll instance to Framer Motion's `useScroll` via a ref. Mount in `layout.tsx` wrapping `{children}`.

Config:
```ts
new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
```

### 3.3 Custom Cursor — Rebuild

Replace existing `CustomCursor.tsx` entirely. New behaviour matches dousanmiao.com:
- **Default state:** 8px filled circle, `#111`, `mix-blend-mode: normal`
- **Hover state (links, buttons):** scales to 40px, `border: 1.5px solid #111`, fill transparent — ring cursor
- **Click state:** scales to 6px momentarily
- Uses `useMotionValue` + `useSpring` for lag (stiffness 400 damping 28)
- `data-cursor="hover"` attribute triggers the ring state — add to all interactive elements
- Hidden on touch devices (`pointer: coarse`)

### 3.4 Page Load Sequence

Remove all existing hero animations. New sequence in `page.tsx`:

1. **t=0:** page background fades from white (instant)
2. **t=0 → 0.3s:** nav items fade in, staggered 50ms each
3. **t=0.2s → 0.8s:** hero name (small label) slides up, opacity 0→1
4. **t=0.4s → 1.0s:** hero heading — word-by-word clip-path reveal (each word in a `overflow:hidden` span, slides up from bottom)
5. **t=0.7s → 1.1s:** hero subtext fades in
6. **t=0.9s → 1.2s:** CTA / scroll indicator fades in

Implemented with `AnimatePresence` + `initial` variants. No `whileInView` on hero — fires once on mount.

### 3.5 Word-by-Word Text Reveal

New `WordReveal` component (replaces `SplitLines`):
- Splits `children` string by spaces
- Each word wrapped in `overflow: hidden` div
- Inner `motion.span` animates `y: 100% → 0` with `clipPath: inset(0 0 0% 0)`
- Stagger: 0.06s between words
- Used on hero heading and section headings

### 3.6 Scroll-Triggered Reveals

All page sections use `motion.div` with:
```ts
initial="hidden"
whileInView="visible"
viewport={{ once: true, margin: '-80px' }}
variants={fadeUp}
```

Stagger containers use `variants={stagger}` with children using `variants={fadeUp}`.

Remove `whileInView` with `once: false` — all reveals fire once (matches reference site).

### 3.7 Project Row Hover

Each project row:
- `motion.div` with `whileHover` → background `var(--surface)`
- Arrow `↗` icon: `motion.span` with `whileHover={{ rotate: 45, x: 2, y: -2 }}`
- Thumbnail: absolute positioned `motion.div`, `opacity: 0 → 1` + `scale: 0.95 → 1` on row hover
- Border top always visible; no border on hover (row fill creates separation)

### 3.8 Nav Link Hover

Each nav link:
- Relative positioned container
- `motion.span` underline: `scaleX: 0 → 1`, `transformOrigin: left`, duration 0.3s
- Active section: underline stays visible (detected via `IntersectionObserver`)

### 3.9 Page Transitions

Keep existing `PageTransition.tsx` but simplify:
- Remove slide-in — use opacity only: `opacity: 0 → 1`, duration 0.4s, ease `[0.0, 0.0, 0.2, 1]`
- Exit: `opacity: 1 → 0`, duration 0.2s
- No `y` offset on transitions (matches Framer's default crossfade)

---

## 4. Components to Delete

Remove entirely (replaced by simpler versions above):
- `KineticSkill.tsx` — replaced by plain text with `fadeUp`
- `KineticText.tsx` — replaced by `WordReveal`
- `ScrollHighlightText.tsx` — not in dousanmiao.com
- `ScrollingMarquee.tsx` — not in dousanmiao.com
- `ParallaxImage.tsx` — not in dousanmiao.com
- `Magnetic.tsx` — not in dousanmiao.com
- `ImageFollowCursor.tsx` — replaced by inline thumbnail on row hover

## 5. Components to Keep / Modify

- `CustomCursor.tsx` — full rebuild (same file, new code)
- `PageTransition.tsx` — simplify to opacity only
- `SplitLines.tsx` → rename/replace with `WordReveal.tsx`
- `ProcessStep.tsx` — keep, update colors only

---

## 6. Files Touched

| File | Change |
|---|---|
| `src/app/globals.css` | New color tokens, remove dark mode, remove grain/orb |
| `src/app/layout.tsx` | Remove `.dark` class, add `SmoothScroll` wrapper |
| `src/app/page.tsx` | Full rewrite of hero, project list, all sections |
| `src/lib/motion.ts` | Full replacement of token file |
| `tailwind.config.ts` | Remove dark mode toggle, update font tokens |
| `src/components/CustomCursor.tsx` | Full rebuild |
| `src/components/SmoothScroll.tsx` | New file |
| `src/components/WordReveal.tsx` | New file (replaces SplitLines) |
| `src/components/PageTransition.tsx` | Simplify |
| `src/components/KineticSkill.tsx` | Delete |
| `src/components/KineticText.tsx` | Delete |
| `src/components/ScrollHighlightText.tsx` | Delete |
| `src/components/ScrollingMarquee.tsx` | Delete |
| `src/components/ParallaxImage.tsx` | Delete |
| `src/components/Magnetic.tsx` | Delete |
| `src/components/ImageFollowCursor.tsx` | Delete |
| `package.json` | Add `lenis` |

---

## 7. Out of Scope

- Case study page content — unchanged
- Contact form logic — unchanged
- SEO / metadata — unchanged
- Dark mode support — removed intentionally
- Lottie animations — not needed (dousanmiao uses them but only for minor icons)
