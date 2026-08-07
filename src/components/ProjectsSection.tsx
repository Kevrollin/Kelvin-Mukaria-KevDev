import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Status = "all" | "live" | "beta";

interface Project {
  id: number;
  name: string;
  description: string;
  tags: string[];
  image: string;
  github?: string;
  demo?: string;
  status: "live" | "beta";
}

const projects: Project[] = [
   {
    id: 1,
    name: "Ardena Platform Africa – Car Rental Marketplace",
    description:
      "Peer-to-peer car rental platform connecting verified vehicle owners with renters across Kenya. Transparent pricing, seamless booking, and multi-channel access including mobile apps.",
    tags: ["React", "Node.js", "Mobile Apps", "Fintech", "Kenya"],
    image: "/ardena.png",
    demo: "https://ardena.co.ke/",
    status: "live",
  },

  {
    id: 2,
    name: "Hicacy Destinations – Purpose-Led Travel in Western Kenya",
    description:
      "Community-led travel platform for discovering Western Kenya — from Kakamega Forest and Mt. Elgon to Ruma National Park and Ndere Island. Each trip supports regenerative agriculture and local community projects.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "React Router", "Framer Motion"],
    image: "/hicacy.png",
    demo: "https://hicacy.com/",
    status: "live",
  },
 
  {
    id: 3,
    name: "DPPM Ltd – Dairy Processing & Packaging Machines",
    description:
      "Corporate website for Dairy Processing and Packaging Machines Ltd — a leading Kenyan provider of dairy machinery supply, installation, and commissioning services.",
    tags: ["React", "Tailwind CSS", "Vite", "Corporate"],
    image: "/dppm.png",
    demo: "https://dppmltd.com/",
    status: "live",
  },

  {
    id: 4,
    name: "Randa Construction Enterprise",
    description:
      "Building construction contractor based in Nakuru, Kenya, working across residential, commercial, and industrial construction, roofing, renovation, and project management services.",
    tags: ["React", "Vite", "Tailwind CSS", "Construction", "Kenya"],
    image: "/randa.png",
    demo: "https://randaenterprise.co.ke",
    status: "live",
  },

  {
    id: 5,
    name: "Dalmas Creations – Media, Storytelling & Digital Influence",
    description:
      "Nairobi-based media and storytelling company helping ambitious brands connect with the audiences that matter through strategic storytelling, media production, and influence.",
    tags: ["Next.js", "Tailwind CSS", "Media", "Kenya"],
    image: "/dalmas.png",
    demo: "https://dalmascreationsdemo.vercel.app/",
    status: "live",
  },

  {
    id: 6,
    name: "Gerusabejo Building & Construction Company",
    description:
      "Built on Integrity. Driven by Craft. Gerusabejo Building & Construction Company was founded on a single belief — that every client deserves a quality structure delivered with complete transparency and professionalism.\n\nLicensed and fully insured. Transparent pricing, no surprises. Dedicated site manager on every project.",
    tags: ["Construction", "Engineering", "Kenya", "Commercial", "Residential"],
    image: "/gerusabejo.png",
    demo: "https://www.gerusabejoconstruction.com/",
    status: "live",
  },

  {
    id: 7,
    name: "Tucha's Auto Spares",
    description:
      "Tucha's Auto Spares — Supplier of quality auto parts and accessories across Kenya. Customer-focused service with competitive pricing and fast delivery.",
    tags: ["E-Commerce", "Auto Parts", "Kenya", "Retail"],
    image: "/tuchas.png",
    demo: "https://www.tuchasautospares.com/",
    status: "live",
  },

  {
    id: 8,
    name: "JamoSec AI – Cybersecurity Platform",
    description:
      "AI-powered platform for real-time threat detection, vulnerability analysis, and digital defense. Built with a dedicated team.",
    tags: ["AI", "Cybersecurity", "React", "Node.js", "Python", "Supabase"],
    image: "/jambosec.png",
    github: "https://github.com/Kevrollin",
    demo: "https://jambosecaiio.vercel.app/",
    status: "live",
  },
  {
    id: 9,
    name: "MK GitPilot – Developer Automation Tool",
    description:
      "Smart CLI tool that automates Git workflows — init, branch, commit, push, sync. Eliminates repetitive dev tasks and boosts shipping speed.",
    tags: ["Python", "Node.js", "React", "Supabase"],
    image: "/mkgitpilot.png",
    github: "https://github.com/Kevrollin",
    demo: "http://mkgitpilot-dev.vercel.app/",
    status: "live",
  },
  {
    id: 10,
    name: "PatchNotes – Release & Dev Blog Platform",
    description:
      "Developer-focused platform for publishing patch notes, product updates, and long-form dev blogs.",
    tags: ["Next.js", "Supabase", "Tailwind CSS", "MDX"],
    image: "/patchnotes.png",
    github: "https://github.com/Kevrollin",
    demo: "https://patch-notes-dev.vercel.app/",
    status: "live",
  },
  {
    id: 11,
    name: "Palinesco – Construction Company Website",
    description:
      "Modern, responsive website for a construction company in Meru, Kenya — services, projects, and a client contact portal.",
    tags: ["React", "shadcn/ui", "Tailwind CSS", "Vite"],
    image: "/palinesco-overview-site.JPG",
    github: "https://github.com/Kevrollin/palinesco-plan-build-company",
    demo: "https://palinesco-plan-build-company.vercel.app/",
    status: "live",
  },

  {
    id: 12,
    name: "Caffeinated Thoughts – Tech Blog",
    description:
      "Personal tech blog with M-Pesa Daraja API integration for a Buy Me a Coffee feature. Fully responsive.",
    tags: ["React", "shadcn/ui", "Tailwind CSS", "M-Pesa API"],
    image: "/caffeinated-thoughts.png",
    github: "https://github.com/Kevrollin/caffeinated-thoughts-alpha",
    demo: "https://caffeinated-thoughts-alpha.vercel.app/",
    status: "live",
  },
  {
    id: 13,
    name: "Transport Booking – Matatu App",
    description:
      "Mobile platform for Kenyan commuters to book matatu seats and receive digital tickets. Flutter + Firebase.",
    tags: ["Flutter", "Firebase", "Google Maps API"],
    image: "https://images.unsplash.com/photo-1592853598064-a829ed372c0c?auto=format&fit=crop&w=600&h=400&q=80",
    github: "https://github.com/Kevrollin",
    demo: "https://transport-booking-matatu-app.vercel.app/",
    status: "beta",
  },
];

const filters: { key: Status; label: string }[] = [
  { key: "all", label: "All Projects" },
  { key: "live", label: "Live" },
  { key: "beta", label: "Beta" },
];

const statusColors: Record<Project["status"], string> = {
  live: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  beta: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

const ProjectsSection = () => {
  const [active, setActive] = useState<Status>("all");

  const filtered = active === "all" ? projects : projects.filter((p) => p.status === active);

  return (
    <section id="projects" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <p
            className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 text-center"
            data-testid="text-projects-label"
          >
            Work
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center mb-3"
            data-testid="text-projects-heading"
          >
            Selected Projects
          </h2>
          <p
            className="text-center text-sm sm:text-base text-muted-foreground mb-10 max-w-xl mx-auto"
            data-testid="text-projects-description"
          >
            Real products I've built, shipped, and maintain.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8" data-testid="list-project-filters">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 whitespace-nowrap ${
                  active === f.key
                    ? "bg-accent text-white shadow-sm"
                    : "bg-background border border-border text-muted-foreground hover:text-foreground hover:border-accent/40"
                }`}
                data-testid={`button-filter-${f.key}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Project grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" data-testid="list-projects">
            {filtered.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col rounded-2xl border border-border overflow-hidden bg-background hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                data-testid={`card-project-${project.id}`}
              >
                <div className="relative aspect-video overflow-hidden bg-secondary/30 flex-shrink-0">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&h=400&q=80";
                    }}
                  />
                  <span
                    className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusColors[project.status]}`}
                    data-testid={`badge-status-${project.id}`}
                  >
                    {project.status === "live" ? "Live" : "Beta"}
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-4 sm:p-5">
                  <h3
                    className="font-semibold text-sm sm:text-base mb-2 leading-snug line-clamp-2"
                    data-testid={`text-project-name-${project.id}`}
                  >
                    {project.name}
                  </h3>
                  <p
                    className="text-xs sm:text-sm text-muted-foreground mb-3 leading-relaxed line-clamp-3"
                    data-testid={`text-project-desc-${project.id}`}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4 overflow-hidden max-h-[3.25rem]" data-testid={`list-project-tags-${project.id}`}>
                    {project.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px] sm:text-xs whitespace-nowrap">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 4 && (
                      <Badge variant="outline" className="text-[10px] sm:text-xs whitespace-nowrap text-muted-foreground">
                        +{project.tags.length - 4}
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2 mt-auto pt-1">
                    {project.github && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="text-xs h-8 px-3"
                        data-testid={`button-github-${project.id}`}
                      >
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5"
                        >
                          <Github className="h-3.5 w-3.5" /> Code
                        </a>
                      </Button>
                    )}
                    {project.demo && (
                      <Button
                        size="sm"
                        asChild
                        className="text-xs h-8 px-3"
                        data-testid={`button-demo-${project.id}`}
                      >
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5"
                        >
                          <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild data-testid="button-view-all-github">
              <a
                href="https://github.com/Kevrollin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" /> More on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
