import { useState, useEffect } from "react";
import { ArrowRight, MapPin, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="pt-28 md:pt-36 pb-16 md:pb-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div
            className={`max-w-3xl transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {/* Location + availability */}
            <div className="flex flex-wrap items-center gap-2 mb-6" data-testid="text-location">
              <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
              <span className="text-sm text-muted-foreground">Kenya</span>
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium"
                data-testid="status-availability"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                Open for collaboration
              </span>
            </div>

            {/* Name */}
            <h1
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
              Software Engineer · AI & Automation · Entrepreneur
            </p>

            {/* Description */}
            <p
              className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed"
              data-testid="text-hero-description"
            >
              Software Engineer, AI & Automation Builder, and young entrepreneur. Co-founder &amp; COO
              of <span className="font-medium text-foreground">Ardena Platform Africa</span> — building
              production-grade software, intelligent systems, and secure digital infrastructure.
            </p>

            {/* Skill badges */}
            <div className="flex flex-wrap gap-2 mb-8" data-testid="list-domains">
              {["React", "Node.js", "TypeScript", "Python", "Cybersecurity", "AI Automation", "Flutter", "Firebase"].map(
                (tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs font-medium" data-testid={`badge-skill-${tag}`}>
                    {tag}
                  </Badge>
                )
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 sm:items-center">
              <Button
                size="lg"
                onClick={() => scrollTo("projects")}
                data-testid="button-view-work"
                className="gap-2 w-full sm:w-auto"
              >
                View My Work <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollTo("contact")}
                data-testid="button-get-in-touch"
                className="w-full sm:w-auto"
              >
                Get in Touch
              </Button>

              {/* Social icons row — separate line on mobile */}
              <div className="flex items-center gap-4 mt-2 sm:mt-0 sm:ml-auto">
                <a
                  href="https://github.com/Kevrollin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-github"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-linkedin"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:kelvinmukaria2023@gmail.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-email"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
                <a
                  href="https://wa.me/254757086742"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-whatsapp"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
