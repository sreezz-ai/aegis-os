# Aegis OS

> "Security isn't just what I study. It's what I build."

Sreelesh SK's portfolio system — built in phases, not generated all at once.

## Stack

React 18 · Vite 5 · TypeScript (strict) · Tailwind CSS · Framer Motion · React Router 6 · React Helmet Async · React Icons

## Project Structure

```
aegis-os/
├── public/                  # robots.txt, sitemap.xml, manifest.json, favicon
├── src/
│   ├── app/router.tsx       # Route table + lazy loading
│   ├── App.tsx              # Provider composition root
│   ├── main.tsx             # React DOM entry point
│   ├── animations/          # Framer Motion variant presets (single source of motion truth)
│   ├── components/
│   │   ├── ui/              # Button, Card, Badge, Input, Textarea, Modal, Drawer,
│   │   │                    # Tabs, Accordion, Pagination, Dropdown, Avatar, Tooltip,
│   │   │                    # StatCard, Timeline, Eyebrow
│   │   ├── layout/          # AppLayout, Navbar, Footer, Container, Section, PageHeader
│   │   ├── cards/           # ProjectCard, SkillCard, CertificateCard, ExperienceCard
│   │   ├── background/      # AnimatedBackground, MouseGlow
│   │   ├── motion/          # BootSequence, PageTransition, Reveal
│   │   ├── feedback/        # ErrorBoundary, Loader, Toast
│   │   └── seo/              # SEO (react-helmet-async wrapper)
│   ├── constants/           # routes.ts, site.ts — single source of truth
│   ├── contexts/            # ThemeContext, RecruiterModeContext, ToastContext, NavigationContext
│   ├── data/                # Mock data: projects, skills, experience, timeline, certificates,
│   │                        # blog, navigation, socials
│   ├── features/
│   │   ├── terminal/        # Terminal Mode (Ctrl+Shift+T) — commands.ts + TerminalWindow
│   │   └── commandPalette/  # Command Palette (Ctrl+K)
│   ├── hooks/                # useTypewriter, usePrefersReducedMotion, useMousePosition,
│   │                        # useScrollTo, useAsyncData
│   ├── pages/                # One file per route
│   ├── seo/jsonld.ts         # JSON-LD structured data builders
│   ├── services/             # Placeholder API layer (projectService, skillService, blogService,
│   │                        # certificateService, contactService, analyticsService,
│   │                        # visitorService, authService) — all async, all mock
│   ├── styles/                # tokens.css (design tokens) + globals.css (Tailwind layers + utilities)
│   ├── types/                 # Project, Skill, Experience, Certificate, Blog, common types
│   └── utils/                  # cn, formatDate, readingTime
├── eslint.config.js
├── tailwind.config.ts          # Every color/radius/font is a CSS variable — no hardcoded values
├── tsconfig*.json               # Strict mode, noUncheckedIndexedAccess, no implicit any
└── vite.config.ts
```

## Design System

Every color, radius, and font in `tailwind.config.ts` resolves to a CSS custom property defined in
`src/styles/tokens.css`. Recruiter Mode works by swapping the `[data-recruiter="true"]` attribute on
`<html>`, which flips every token to a light, print-friendly palette — no component re-styling needed.

## Features implemented this phase

- Real routing via React Router (`createBrowserRouter`), with every route lazy-loaded behind `Suspense`
- Boot sequence, typewriter hero, mouse glow, animated grid background — all Framer Motion / CSS,
  all disabled automatically under `prefers-reduced-motion` and in Recruiter Mode
- Recruiter Mode (`ThemeProvider`-adjacent `RecruiterModeContext`) — light theme, print-ready, motion off
- Command Palette (`Ctrl/Cmd+K`) — fuzzy-free substring search across pages and projects
- Terminal Mode (`Ctrl/Cmd+Shift+T`) — `help`, `whoami`, `projects`, `skills`, `resume`, `contact`,
  `history`, `clear`, `ascii`, `sudo hire sreelesh`, `exit`
- Full page set: Home, About, Projects (+ detail), Skills, Experience, Timeline, Certificates,
  Blog (+ post), Contact (mock form + OTP-unlock demo), Resume (printable), Terminal, Admin
  (UI-only dashboard), 404, 500, Maintenance
- Service layer with simulated latency (`resolveAfter`) so every page already codes against a real
  async contract — swapping in a real backend later means editing `services/`, not every page
- `ErrorBoundary` at the root, SEO via `react-helmet-async` (title, description, canonical, OG,
  Twitter card, JSON-LD) on every page, `robots.txt` + `sitemap.xml` + `manifest.json`

## What's mock / placeholder

- All content in `src/data/*` — real project links, certificates, and blog posts are placeholders
- `contactService`, `analyticsService`, `visitorService`, `authService` — UI-only, no backend
- Résumé PDF download button is disabled pending an actual file

## Setup

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run typecheck  # tsc -b --noEmit
npm run lint        # eslint . --max-warnings 0
npm run build        # tsc -b && vite build → dist/
npm run preview       # serve the production build locally
```

> **Note on this deliverable:** this project was written in a sandboxed environment without npm
> registry access, so `npm install` / `npm run build` could not be executed here to produce a
> verified build log. What *was* done instead: every `@/` import was statically resolved against
> the real file tree (no broken/mistyped paths), and the full `src/` tree was run through `tsc`
> under a strict config (matching this project's `tsconfig.app.json`) against hand-written stub
> types for `react`, `react-router-dom`, `framer-motion`, `react-helmet-async`, and `react-icons` —
> that pass found zero unresolved references and zero unused locals across all ~90 files, plus a
> couple of real issues that are now fixed (`@eslint/js` was missing from `package.json`;
> `globals.css` had `@import` after `@tailwind`, which is invalid CSS ordering). What that pass
> *can't* catch: exact prop signatures from the real npm packages, since it used permissive stub
> types rather than the actual `@types/react` etc. Please run the four commands below after
> `npm install` and fix anything version-specific your local toolchain surfaces.

## Deployment

### Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import the repo at vercel.com → New Project.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy. `vercel.json` (already included) handles the SPA rewrite so client-side routes don't 404 on refresh.

### Netlify

1. Push this repo to GitHub/GitLab/Bitbucket.
2. New site from Git at app.netlify.com.
3. Build command: `npm run build`. Publish directory: `dist`.
4. `public/_redirects` (already included) handles the SPA fallback.

## Final Checklist

- [x] Real routing (React Router, lazy-loaded)
- [x] Reusable component library (`components/ui`)
- [x] Strict TypeScript, no `any`
- [x] Clean architecture (types → data → services → components → pages)
- [x] Responsive (mobile-first Tailwind breakpoints throughout)
- [x] Accessible (labels, `aria-*`, focus rings, keyboard nav, `prefers-reduced-motion`)
- [x] SEO-ready (Helmet, OG, Twitter cards, JSON-LD, robots.txt, sitemap.xml, manifest.json)
- [x] Lazy loading + Suspense
- [x] Error Boundary
- [x] Theme Provider + Recruiter Mode
- [x] Design tokens only — no hardcoded colors anywhere in components
- [x] Mock data separated from services; service layer with placeholder async APIs
- [ ] `npm install` / `npm run build` executed and verified — **do this locally**, see note above
- [ ] Real project links, certificates, blog content, and résumé PDF — still placeholders
