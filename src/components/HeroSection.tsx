import { ArrowRight, Download, MapPin, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { contactLinks, profiles, site } from "@/config/site";

const heroSocials = [
  { icon: Github, label: "GitHub", href: profiles.github, testId: "link-github" },
  { icon: Linkedin, label: "LinkedIn", href: profiles.linkedin, testId: "link-linkedin" },
  { icon: Mail, label: "Email", href: contactLinks.email, testId: "link-email" },
  { icon: MessageCircle, label: "WhatsApp", href: contactLinks.whatsapp, testId: "link-whatsapp" },
];

const HeroSection = () => {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="pt-28 md:pt-36 pb-16 md:pb-24 bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* CSS-only entrance: starts on first paint (no JS timer delaying LCP), skipped for reduced motion */}
          <div className="max-w-3xl motion-safe:animate-fade-in-up">
            {/* Location + availability */}
            <div className="flex flex-wrap items-center gap-2 mb-6" data-testid="text-location">
              <MapPin className="h-4 w-4 text-accent flex-shrink-0" aria-hidden="true" />
              <span className="text-sm text-muted-foreground">{site.country.name}</span>
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium"
                data-testid="status-availability"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" aria-hidden="true" />
                Open for collaboration
              </span>
            </div>

            {/* Name */}
            <h1
              id="hero-heading"
              className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-5 leading-none"
              data-testid="text-hero-name"
            >
              Kelvin<br />
              <span className="text-accent">Mukaria</span>
            </h1>

            {/* Tagline */}
            <p
              className="text-base sm:text-lg md:text-2xl text-muted-foreground mb-6 max-w-2xl leading-relaxed"
              data-testid="text-hero-tagline"
            >
              {site.tagline}
            </p>

            {/* Description */}
            <p
              className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed"
              data-testid="text-hero-description"
            >
              Software engineer and AI &amp; automation builder based in Kenya. Co-founder &amp; COO of{" "}
              <a
                href={site.organization.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline decoration-accent/40 underline-offset-4 hover:decoration-accent transition-colors"
              >
                {site.organization.name}
              </a>{" "}
              — building production-grade web and mobile apps, intelligent systems, and secure digital
              infrastructure.
            </p>

            {/* Skill badges */}
            <ul className="flex flex-wrap gap-2 mb-8" aria-label="Core technologies" data-testid="list-domains">
              {["React", "Node.js", "TypeScript", "Python", "Cybersecurity", "AI Automation", "Flutter", "Firebase"].map(
                (tag) => (
                  <li key={tag}>
                    <Badge variant="secondary" className="text-xs font-medium" data-testid={`badge-skill-${tag}`}>
                      {tag}
                    </Badge>
                  </li>
                )
              )}
            </ul>

            {/* CTAs — real links so crawlers (and middle-click) can follow them; CSS handles smooth scrolling */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 sm:items-center">
              <Button size="lg" asChild data-testid="button-view-work" className="gap-2 w-full sm:w-auto">
                <a href="#projects">
                  View My Work <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                data-testid="button-get-in-touch"
                className="w-full sm:w-auto"
              >
                <a href="#contact">Get in Touch</a>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                asChild
                data-testid="button-download-resume"
                className="w-full sm:w-auto gap-2"
              >
                <a href={site.resume} target="_blank" rel="noopener noreferrer" download>
                  Resume <Download className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>

              {/* Social icons row — separate line on mobile */}
              <div className="flex items-center gap-4 mt-2 sm:mt-0 sm:ml-auto">
                {heroSocials.map((s) => {
                  const external = s.href.startsWith("http");
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={s.testId}
                      aria-label={s.label}
                    >
                      <s.icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
