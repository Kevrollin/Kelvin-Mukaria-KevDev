import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { profiles } from "@/config/site";
import { projects, projectImageAlt, projectImageSizes, projectImageSrcSet, type Project } from "@/data/projects";

type Status = "all" | Project["status"];

const filters: { key: Status; label: string }[] = [
  { key: "all", label: "All Projects" },
  { key: "live", label: "Live" },
  { key: "beta", label: "Beta" },
];

// Badges sit on top of the screenshot (not the page background), so they stay solid in both themes.
const statusColors: Record<Project["status"], string> = {
  live: "bg-green-100 text-green-800 ring-green-700/20",
  beta: "bg-amber-100 text-amber-800 ring-amber-700/20",
};

const ProjectsSection = () => {
  const [active, setActive] = useState<Status>("all");

  const filtered = active === "all" ? projects : projects.filter((p) => p.status === active);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <p
            className="text-sm font-semibold text-accent-strong uppercase tracking-widest mb-3 text-left"
            data-testid="text-projects-label"
          >
            Work
          </p>
          <h2
            id="projects-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-left mb-3"
            data-testid="text-projects-heading"
          >
            Selected Projects
          </h2>
          <p
            className="text-left text-sm sm:text-base text-muted-foreground mb-10 max-w-xl"
            data-testid="text-projects-description"
          >
            Real products I've built, shipped, and maintain — from client websites and e-commerce to
            AI and cybersecurity platforms.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-start gap-2 mb-8" data-testid="list-project-filters">
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setActive(f.key)}
                aria-pressed={active === f.key}
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 whitespace-nowrap ${
                  active === f.key
                    ? "bg-accent-strong text-accent-foreground shadow-sm"
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
              <article
                key={project.id}
                className="group flex flex-col rounded-2xl border border-border overflow-hidden bg-background hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                data-testid={`card-project-${project.id}`}
              >
                <div className="relative aspect-video overflow-hidden bg-secondary/30 flex-shrink-0">
                  <img
                    src={project.image}
                    srcSet={projectImageSrcSet(project)}
                    sizes={projectImageSrcSet(project) ? projectImageSizes : undefined}
                    alt={projectImageAlt(project)}
                    width={960}
                    height={540}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.src.endsWith("/placeholder.svg")) return;
                      img.removeAttribute("srcset"); // otherwise the browser keeps picking the broken candidate
                      img.src = "/placeholder.svg";
                    }}
                  />
                  <span
                    className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-sm ring-1 ${statusColors[project.status]}`}
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

                  {/* Visually hidden suffixes keep "Code" / "Live Demo" distinguishable for screen readers and crawlers. */}
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
                          <Github className="h-3.5 w-3.5" aria-hidden="true" /> Code
                          <span className="sr-only"> for {project.name} on GitHub</span>
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
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /> Live Demo
                          <span className="sr-only"> of {project.name}</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-left mt-10">
            <Button variant="outline" size="lg" asChild data-testid="button-view-all-github">
              <a
                href={profiles.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" aria-hidden="true" /> More projects on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
