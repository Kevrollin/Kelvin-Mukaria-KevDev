import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sections, site } from "@/config/site";

/**
 * Prerendered to dist/404.html at build time. Vercel serves that file with a real HTTP 404 for any
 * unknown path, with `noindex` in its <head> and no JS bundle (a tiny inline script fills in the
 * requested path). In dev, main.tsx client-renders this component for non-home paths instead.
 */
const NotFound = () => {
  // Unknown at build time; filled in after mount (or by the inline script in the static 404.html).
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(window.location.pathname);
    document.title = `Page not found | ${site.name}`;
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg py-16">
        <p className="text-sm font-semibold text-accent-strong uppercase tracking-widest mb-3">Error 404</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">Page not found</h1>
        <p className="text-sm sm:text-base text-muted-foreground mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has moved. You can head back to {site.name}'s
          portfolio or jump straight to a section below.
        </p>

        <div className="font-mono text-xs sm:text-sm bg-secondary rounded-lg p-4 mb-8 overflow-x-auto" aria-hidden="true">
          <div className="whitespace-nowrap">
            <span className="text-accent">$</span> cd <span data-404-path>{path}</span>
          </div>
          <div className="text-muted-foreground whitespace-nowrap">cd: no such file or directory</div>
        </div>

        <Button asChild size="lg" className="gap-2 mb-8">
          <a href="/">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to home
          </a>
        </Button>

        <nav aria-label="Portfolio sections">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`/#${s.id}`}
                  className="font-medium text-muted-foreground hover:text-foreground underline-offset-4 hover:underline transition-colors"
                >
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.resume}
                className="font-medium text-muted-foreground hover:text-foreground underline-offset-4 hover:underline transition-colors"
              >
                Resume (PDF)
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
};

export default NotFound;
