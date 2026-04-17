# Kelvin-Mukaria | KevDev Portfolio

## Overview
A personal portfolio website for Kelvin Mukaria (KevDev), built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui components. Originally created in Lovable, migrated to Replit.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui (Radix UI components)
- **Routing**: React Router DOM v6
- **Forms**: React Hook Form + Zod validation
- **Email**: EmailJS browser SDK
- **Charts**: Recharts
- **Theme**: next-themes (dark/light mode support)

## Project Structure
```
src/
  App.tsx         - Main app with routing
  main.tsx        - Entry point
  pages/          - Page components
  components/     - Reusable UI components
  hooks/          - Custom React hooks
  lib/            - Utility functions
```

## Running the App
```bash
npm run dev    # Start dev server on port 5000
npm run build  # Production build
```

## Migration Notes (Lovable → Replit)
- Removed `lovable-tagger` plugin from Vite config (Lovable-specific)
- Removed Lovable CDN script from `index.html`
- Updated Vite server config: `host: "0.0.0.0"`, `port: 5000`, `allowedHosts: true`
- Configured workflow to run `npm run dev` on port 5000 (webview)
