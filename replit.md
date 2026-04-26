# Kelvin Mukaria | KevDev — Professional Portfolio

## Overview
A minimal, professional digital portfolio for Kelvin Mukaria (KevDev) — Full-Stack Engineer, Cybersecurity, AI & Automation, Entrepreneur. Built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite 5
- **Styling**: Tailwind CSS, shadcn/ui (Radix UI components)
- **Routing**: React Router DOM v6
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
    NavBar.tsx               - Fixed nav with theme toggle dropdown + mobile menu
    HeroSection.tsx          - Name, tagline, CTA buttons, social links
    AboutSection.tsx         - Bio, stats, 4-domain pillar cards
    SkillsSection.tsx        - Filterable skills grid with proficiency badges
    ProjectsSection.tsx      - Filterable project cards (live/beta)
    ContactSection.tsx       - Email + WhatsApp contact form + socials
    Footer.tsx               - Minimal footer with links
    ui/                      - shadcn/ui component library
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
- Full meta tag suite: title, description, keywords, canonical, Open Graph, Twitter Card
- Geo/local SEO tags targeting Nakuru, Meru, Kenya (ISO KE-31)
- JSON-LD structured data: Person, WebSite, Organization (Ardena), BreadcrumbList schemas
- `public/robots.txt` — allows all bots, references sitemap
- `public/sitemap.xml` — all sections with images and lastmod dates
- `vercel.json` — SPA rewrites + security headers + asset cache headers
- Target domain: `https://kelvinmukaria.vercel.app`

## Running
```bash
npm run dev    # Dev server on port 5000
npm run build  # Production build
```
