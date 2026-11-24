
# KelvinDev Portfolio

![KelvinDev Portfolio Screenshot](./My%20portfolio.JPG)

A professional developer portfolio with a twist of humor and personality. This portfolio showcases skills, projects, and contact information in a visually engaging way with subtle animations and interactive elements.

## ✨ Features

- **Responsive Design**: Fully optimized for all screen sizes with a custom mobile navigation
- **Dark/Light Mode**: Toggle between themes with humorous tooltips
- **Interactive Elements**: 
  - Typing animations
  - Hover effects
  - Toast notifications
  - Easter eggs in the console
  - "Hacker Mode" theme toggle
  - Random Dev jokes with toast notifications
- **WhatsApp Integration**: Send messages directly via WhatsApp
- **Custom Components**:
  - Project cards with hover effects
  - Skills section with interactive card layout
  - Tech stack visualization
  - Contact form with WhatsApp integration
  - Custom 404 page with humor
- **Performance Optimized**: Fast loading and smooth animations

## 🚀 Technologies Used

- **React**: Component-based UI development
- **TypeScript**: Type-safe code
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Shadcn UI**: Accessible UI components
- **Lucide Icons**: Simple and consistent icon set
- **EmailJS**: Contact form delivery (loaded on demand)
- **Vite**: Fast and optimized frontend build tool

## 🔧 Wanna Clone the File??

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/kelvindev-portfolio.git
   cd kelvindev-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📱 WhatsApp Integration

The portfolio includes WhatsApp integration for easy communication:

1. **Contact Form**: Messages sent via the contact form open WhatsApp with pre-filled content
2. **"Hire Me" Button**: Direct link to start a conversation about potential work
3. **Collaboration Button**: Quick way to discuss project collaborations

To configure your WhatsApp number:
- Update the phone number in `NavBar.tsx` and `ContactSection.tsx`
- Format should include country code without '+' (e.g., 254757086742 for Kenya)

## 🎨 Customization

### Personal Information
Edit the following files to customize your information:
- `src/components/HeroSection.tsx`: Update name, title and introduction
- `src/components/AboutSection.tsx`: Modify your bio and personal details
- `src/components/SkillsSection.tsx`: Update your skills data
- `src/components/ProjectsSection.tsx`: Change project information and links
- `src/components/ContactSection.tsx`: Update contact details

### Theme Colors
Modify the theme colors in `src/index.css` within the `:root` and `.dark` selectors.

### Images
Replace placeholder images in the public directory with your own images.

## 📦 Build & Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Deploy to Vercel

The portfolio is optimized for deployment on Vercel:

1. Push your code to a GitHub repository
2. Sign up for [Vercel](https://vercel.com) and connect your repository
3. Vercel will automatically detect the Vite configuration and deploy your site

## 🌐 SEO, Prerendering & Deployment

Canonical site: **https://kelvin.ardena.co.ke** (Vercel). The page is a Vite + React SPA that is
**prerendered at build time**, so crawlers and link previews get the full content and every meta tag
in the initial HTML; React then hydrates it in the browser.

`npm run build` runs three steps:

1. `vite build` — client bundle → `dist/`
2. `vite build --ssr src/entry-server.tsx` — server bundle → `dist-ssr/` (temporary)
3. `node scripts/prerender.mjs` — writes `dist/index.html` (rendered page + head tags + JSON-LD),
   `dist/404.html` (static, `noindex`, served by Vercel with a real HTTP 404), `dist/sitemap.xml`
   and `dist/robots.txt`

| What | Where |
| --- | --- |
| Name, domain, titles, descriptions, contact details, social profiles | `src/config/site.ts` |
| Projects (cards, structured data, image sitemap) | `src/data/projects.ts` |
| `<head>` tags (title, canonical, robots, Open Graph, X card, verification, GA4) | `src/seo/head.ts` |
| JSON-LD `@graph` (WebSite, ProfilePage, Person, Organization, projects ItemList) | `src/seo/structured-data.ts` |
| sitemap.xml / robots.txt | `src/seo/files.ts` |
| Redirects (`kelvinmukaria.vercel.app` → canonical, `/index.html` → `/`), headers | `vercel.json` |

**Adding a project:** add it to `src/data/projects.ts`, put a 960×540 WebP screenshot in `public/`,
run `npm run images` to create its 480w variant, then `npm run build && npm run seo:verify`.

**Optional build settings** (Vercel → Settings → Environment Variables; see `.env.example`):
`GA_MEASUREMENT_ID` (GA4, loaded after page load), `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`.
Nothing is injected when they're unset.

**Checks:**

```bash
npm run typecheck && npm run lint
npm run build && npm run seo:verify   # 70+ checks on dist/: metadata, JSON-LD, links, sitemap, 404…
npm run seo:verify -- --live          # also checks status codes/redirects on the deployed site
```

**Asset scripts** (need a local Chrome/Edge; set `CHROME_PATH` if not found):
`npm run og:image` regenerates `public/og-image.png` (1200×630) and `npm run images` creates the
480w project screenshots and the 64px nav avatar.

## 🧩 Project Structure

```
kelvindev-portfolio/
├── public/                # Public assets and images
├── src/
│   ├── components/        # UI components
│   │   ├── ui/            # Shadcn UI components
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── NavBar.tsx
│   │   └── Footer.tsx
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   ├── App.tsx            # App root component
│   ├── index.css          # Global styles
│   └── main.tsx           # Entry point
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 📝 License

MIT License © Kelvin Mukaria | KevDev

---

Built with 💻 and ☕ by [KevDev](https://github.com/Kevrollin)
