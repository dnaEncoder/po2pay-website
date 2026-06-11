# PO2PAY Frontend — Context

## Overview
Marketing/landing site for PO2PAY, an AI-native platform for financial document
intelligence (invoices, purchase orders, contracts). Single-page app built with
React 19 + Vite + Tailwind v4.

## Tech Stack
- **React 19** + **react-router-dom v7** (routing, currently single route `/`)
- **Vite 8** (`@vitejs/plugin-react`)
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (used alongside CSS Modules)
- **GSAP** (+ `@gsap/react`'s `useGSAP`, `ScrollTrigger`) for scroll/entrance animations
- **lucide-react** for icons (most icons are hand-rolled inline SVGs though)
- ESLint flat config (`eslint.config.js`) — JS recommended + react-hooks + react-refresh

## Scripts
- `npm run dev` — Vite dev server
- `npm run build` — production build (output in `dist/`)
- `npm run lint` — ESLint
- `npm run preview` — preview production build

## Entry Points
- `index.html` → `src/main.jsx` → `src/App.jsx` (BrowserRouter, single `/` route → `Home`)
- `src/pages/Home.jsx` — composes the full landing page from section components in order:
  1. `Header` (layout)
  2. `Hero`
  3. `PlatformOverview`
  4. `IndustryProblem`
  5. `AnalysisCTA`
  6. `ProductsIntro`
  7. `InvoiceIQ` (Overview, Features, ROI)
  8. `ContractIQ` (Overview, Features, ROI)
  9. `PlatformROI`
  10. `Clients`
  11. `CaseStudy`
  12. `FAQ`
  13. `FooterCTA`
  14. `Footer` (layout)

## Directory Structure
```
src/
├── App.jsx              # Router setup
├── main.jsx             # React root, imports global styles
├── pages/Home.jsx        # Composes all sections
├── assets/               # logo, hero image, vite svg
├── styles/
│   ├── tokens.css        # CSS custom properties (design tokens) — single source of truth
│   └── globals.css       # Tailwind import + token import + base resets, typography
│                          #   utility classes (.h1-.h4, .body-*, .eyebrow, .btn, .container, .section)
├── components/
│   ├── layout/
│   │   ├── Header.jsx (+ .module.css)   # Sticky nav, mega menu, mobile hamburger
│   │   └── Footer.jsx (+ .module.css)
│   ├── shared/
│   │   └── WaveROI.jsx (+ .module.css)  # Reusable animated canvas "wave" ROI section
│   │                                      #   props: { eyebrow, copy, stats }
│   └── sections/
│       ├── Hero/                 # Animated canvas grid hero w/ GSAP entrance anim
│       ├── PlatformOverview/
│       ├── IndustryProblem/
│       ├── AnalysisCTA/
│       ├── ProductsIntro/
│       ├── InvoiceIQ/ (Overview, Features, ROI)
│       ├── ContractIQ/ (Overview, Features, ROI)
│       ├── PlatformROI/          # likely uses shared WaveROI
│       ├── Clients/
│       ├── CaseStudy/
│       ├── FAQ/
│       └── FooterCTA/
```

## Conventions
- **CSS Modules** per component (`Component.module.css`), imported as `styles` and
  combined with global utility classes from `globals.css` (e.g. `btn btn-primary`,
  `eyebrow eyebrow-dark`, `h1`, `body-lg`, `container`, `section section-pad`).
- **Design tokens** (`src/styles/tokens.css`) define brand colors (`--c-brand-*`),
  neutrals, gradients (`--g-brand`, `--g-vibrant`), typography scale, spacing
  (`--sp-*`), radii (`--r-*`), shadows, transitions, and z-index scale. Use these
  tokens instead of hardcoding values where possible.
- **Dark sections** use `eyebrow-dark` / `btn-ghost-dark` variants and dark surface
  tokens (`--c-surface-dark*`).
- Section components follow naming pattern: feature folder under
  `components/sections/<Name>/` containing `<Name>.jsx` + `<Name>.module.css`
  (product sections like InvoiceIQ/ContractIQ split into `Overview.jsx`,
  `Features.jsx`, `ROI.jsx`).
- Canvas-based animated backgrounds (Hero, WaveROI) follow a pattern: `useRef` for
  canvas/section, resize handling with `devicePixelRatio`, `gsap.ticker` for the
  render loop, cleanup on unmount.
- `useGSAP` + `ScrollTrigger` used for scroll-triggered entrance/counter animations.
- Anchor links in Header (`#invoiceiq`, `#contractiq`, `#roi`, `#case`, `#faq`) imply
  sections should have matching `id` attributes for in-page navigation (verify when
  adding/renaming sections).

## Notes
- Not currently a git repository.
- `dist/` contains a built output (checked in / present locally — likely from a
  previous build, not source of truth).
