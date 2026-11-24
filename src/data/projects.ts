/**
 * Portfolio projects. Display order is array order.
 *
 * Shared by the Projects section and the build-time structured data / image sitemap
 * (src/seo/*), so a project added here shows up everywhere at once.
 */
export interface Project {
  /** Stable slug — used for React keys and test ids, so reordering never changes them. */
  id: string;
  name: string;
  description: string;
  tags: string[];
  /** Path under /public. Screenshots are 960×540 WebP. */
  image: string;
  /** Alt text override; defaults to a description of the homepage screenshot. */
  imageAlt?: string;
  github?: string;
  demo?: string;
  status: "live" | "beta";
}

export const projectImageAlt = (p: Project) => p.imageAlt ?? `Homepage of ${p.name}`;

/**
 * srcset for WebP screenshots: a 480w copy (created by `npm run images`) for one-column-of-three
 * desktop cards at 1x, the 960w original for phones and high-DPI screens. SVGs scale on their own.
 */
export const projectImageSrcSet = (p: Project) =>
  p.image.endsWith(".webp") ? `${p.image.replace(/\.webp$/, "-480.webp")} 480w, ${p.image} 960w` : undefined;

/** Rendered card widths: 1 column below 640px, 2 columns below 1024px, then 3 in a 64rem container. */
export const projectImageSizes = "(min-width: 1024px) 330px, (min-width: 640px) 50vw, 100vw";

export const projects: Project[] = [
  {
    id: "ardena",
    name: "Ardena Platform Africa – Car Rental Marketplace",
    description:
      "Peer-to-peer car rental platform connecting verified vehicle owners with renters across Kenya. Transparent pricing, seamless booking, and multi-channel access including mobile apps.",
    tags: ["React", "Node.js", "Mobile Apps", "Fintech", "Kenya"],
    image: "/ardena.webp",
    demo: "https://ardena.co.ke/",
    status: "live",
  },

  {
    id: "hicacy",
    name: "Hicacy Destinations – Purpose-Led Travel in Western Kenya",
    description:
      "Community-led travel platform for discovering Western Kenya — from Kakamega Forest and Mt. Elgon to Ruma National Park and Ndere Island. Each trip supports regenerative agriculture and local community projects.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "React Router", "Framer Motion"],
    image: "/hicacy.webp",
    demo: "https://hicacy.com/",
    status: "live",
  },
 
  {
    id: "dppm",
    name: "DPPM Ltd – Dairy Processing & Packaging Machines",
    description:
      "Corporate website for Dairy Processing and Packaging Machines Ltd — a leading Kenyan provider of dairy machinery supply, installation, and commissioning services.",
    tags: ["React", "Tailwind CSS", "Vite", "Corporate"],
    image: "/dppm.webp",
    demo: "https://dppmltd.com/",
    status: "live",
  },

  {
    id: "tumana",
    name: "Tumana – Local Marketplace & Errands",
    description:
      "Multi-vendor marketplace and errands platform for Kenya. Shop trusted local businesses, pay with M-Pesa, and track delivery to your door in real time — with vendor dashboards, payouts, and admin tooling built in.",
    tags: ["React", "Supabase", "M-Pesa", "PWA", "TanStack Query", "Realtime"],
    image: "/tumana.webp",
    demo: "https://tumana.store/",
    status: "live",
  },

  {
    id: "atei",
    name: "ATEI – Africa Transformative Ecosystem Initiative",
    description:
      "Youth-led environmental research and conservation organisation working with communities, researchers, and governments to protect and restore Africa's ecosystems.",
    tags: ["React", "Vite", "Tailwind CSS", "Conservation", "Non-Profit", "Africa"],
    image: "/atei.webp",
    demo: "https://www.atei.africa",
    status: "live",
  },

  {
    id: "randa",
    name: "Randa Construction Enterprise",
    description:
      "Building construction contractor based in Nakuru, Kenya, working across residential, commercial, and industrial construction, roofing, renovation, and project management services.",
    tags: ["React", "Vite", "Tailwind CSS", "Construction", "Kenya"],
    image: "/randa.webp",
    demo: "https://randaenterprise.co.ke",
    status: "live",
  },

  {
    id: "dalmas",
    name: "Dalmas Creations – Media, Storytelling & Digital Influence",
    description:
      "Nairobi-based media and storytelling company helping ambitious brands connect with the audiences that matter through strategic storytelling, media production, and influence.",
    tags: ["Next.js", "Tailwind CSS", "Media", "Kenya"],
    image: "/dalmas.webp",
    demo: "https://dalmascreationsdemo.vercel.app/",
    status: "live",
  },

  {
    id: "gerusabejo",
    name: "Gerusabejo Building & Construction Company",
    description:
      "Website for a licensed, fully insured Kenyan building and construction company — residential and commercial projects, transparent pricing, and a dedicated site manager on every build.",
    tags: ["Construction", "Engineering", "Kenya", "Commercial", "Residential"],
    image: "/gerusabejo.webp",
    demo: "https://www.gerusabejoconstruction.com/",
    status: "live",
  },

  {
    id: "tuchas",
    name: "Tucha's Auto Spares",
    description:
      "E-commerce site for a Kenyan supplier of quality auto parts and accessories — competitive pricing, customer-focused service, and fast delivery nationwide.",
    tags: ["E-Commerce", "Auto Parts", "Kenya", "Retail"],
    image: "/tuchas.webp",
    demo: "https://www.tuchasautospares.com/",
    status: "live",
  },

  {
    id: "jambosec",
    name: "JamboSec AI – Cybersecurity Platform",
    description:
      "AI-powered platform for real-time threat detection, vulnerability analysis, and digital defense. Built with a dedicated team.",
    tags: ["AI", "Cybersecurity", "React", "Node.js", "Python", "Supabase"],
    image: "/jambosec.webp",
    github: "https://github.com/Kevrollin",
    demo: "https://jambosecaiio.vercel.app/",
    status: "live",
  },
  {
    id: "mkgitpilot",
    name: "MK GitPilot – Developer Automation Tool",
    description:
      "Smart CLI tool that automates Git workflows — init, branch, commit, push, sync. Eliminates repetitive dev tasks and boosts shipping speed.",
    tags: ["Python", "Node.js", "React", "Supabase"],
    image: "/mkgitpilot.webp",
    github: "https://github.com/Kevrollin",
    demo: "http://mkgitpilot-dev.vercel.app/",
    status: "live",
  },
  {
    id: "patchnotes",
    name: "PatchNotes – Release & Dev Blog Platform",
    description:
      "Developer-focused platform for publishing patch notes, product updates, and long-form dev blogs.",
    tags: ["Next.js", "Supabase", "Tailwind CSS", "MDX"],
    image: "/patchnotes.webp",
    github: "https://github.com/Kevrollin",
    demo: "https://patch-notes-dev.vercel.app/",
    status: "live",
  },
  {
    id: "palinesco",
    name: "Palinesco – Construction Company Website",
    description:
      "Modern, responsive website for a construction company in Meru, Kenya — services, projects, and a client contact portal.",
    tags: ["React", "shadcn/ui", "Tailwind CSS", "Vite"],
    image: "/palinesco-overview-site.webp",
    github: "https://github.com/Kevrollin/palinesco-plan-build-company",
    demo: "https://palinesco-plan-build-company.vercel.app/",
    status: "live",
  },

  {
    id: "caffeinated-thoughts",
    name: "Caffeinated Thoughts – Tech Blog",
    description:
      "Personal tech blog with M-Pesa Daraja API integration for a Buy Me a Coffee feature. Fully responsive.",
    tags: ["React", "shadcn/ui", "Tailwind CSS", "M-Pesa API"],
    image: "/caffeinated-thoughts.webp",
    github: "https://github.com/Kevrollin/caffeinated-thoughts-alpha",
    demo: "https://caffeinated-thoughts-alpha.vercel.app/",
    status: "live",
  },
  {
    id: "matatu",
    name: "Transport Booking – Matatu App",
    description:
      "Mobile platform for Kenyan commuters to book matatu seats and receive digital tickets. Flutter + Firebase.",
    tags: ["Flutter", "Firebase", "Google Maps API"],
    image: "/matatu.svg",
    imageAlt: "Illustration of a Kenyan matatu for the Transport Booking app",
    github: "https://github.com/Kevrollin",
    // Demo link removed: transport-booking-matatu-app.vercel.app returns DEPLOYMENT_NOT_FOUND. Re-add once redeployed.
    status: "beta",
  },
];
