# Kelvin Mukaria | KevDev — Professional Portfolio

## Overview
A minimal, professional digital portfolio for Kelvin Mukaria (KevDev) — Full-Stack Engineer, Cybersecurity, AI & Automation, Entrepreneur. Built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite 5
- **Styling**: Tailwind CSS, shadcn/ui (Radix UI components)
- **Routing**: none needed — `/` is the page; unknown paths get the prerendered static `404.html` (see `main.tsx`)
- **Fonts**: self-hosted variable Inter in `public/fonts/` (preloaded; no Google Fonts request)
- **Forms + Email**: React Hook Form, EmailJS browser SDK
- **Theme**: Custom ThemeProvider with light/dark/system support

## Structure
```
src/
  App.tsx                    - Root app with ThemeProvider wrapping
  main.tsx                   - Entry point
  index.css                  - Global styles, CSS variables, smooth scroll
  pages/
    Index.tsx                - Main single-page layout
    NotFound.tsx             - 404 page
  components/
    ThemeProvider.tsx        - Light/dark/system theme context
    NavBar.tsx               - Fixed nav with theme menu + mobile menu
    ThemeMenu.tsx            - Lightweight Light/Dark/System picker (no Radix dropdown)
    HeroSection.tsx          - Name, tagline, CTA buttons, social links
    AboutSection.tsx         - Bio, stats, 4-domain pillar cards
    SkillsSection.tsx        - Filterable skills grid with proficiency badges
    ProjectsSection.tsx      - Filterable project cards (live/beta)
    ContactSection.tsx       - Email + WhatsApp contact form + socials
    Footer.tsx               - Minimal footer with links
    ui/                      - shadcn/ui components actually in use (add more with `npx shadcn@latest add <name>`)
```

## Theme Support
- Light mode (default)
- Dark mode
- System preference detection
- Persisted to localStorage under `kev-theme`

## Contact / Email
- EmailJS integration: service_ej3wqaq / template_134wyxx
- WhatsApp direct link to +254 757 086 742

## SEO
- Canonical domain `https://kelvin.ardena.co.ke`; `kelvinmukaria.vercel.app` 308-redirects to it (`vercel.json`)
- Build-time prerender (`src/entry-server.tsx` + `scripts/prerender.mjs`): full HTML, head tags and JSON-LD in the initial response; React hydrates it
- Single source of truth for SEO copy and identity: `src/config/site.ts`; projects: `src/data/projects.ts`
- JSON-LD `@graph`: WebSite, ProfilePage, Person, Organization (Ardena), ItemList of CreativeWork projects
- `sitemap.xml`, `robots.txt` and a static `404.html` (real 404, noindex) are generated into `dist/` at build time
- `npm run seo:verify` checks the build output; see README "SEO, Prerendering & Deployment"

## Running
```bash
npm run dev    # Dev server on port 5000
npm run build  # Production build
```
