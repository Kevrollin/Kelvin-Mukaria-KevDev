import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const path = window.location.pathname;

  useEffect(() => {
    document.title = "Page not found | Kelvin Mukaria";
    // The SPA answers every path with 200, so tell crawlers not to index this soft 404.
    document.querySelector('meta[name="robots"]')?.setAttribute("content", "noindex, follow");
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg">
        <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Error 404</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">Page not found</h1>
        <p className="text-sm sm:text-base text-muted-foreground mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has moved.
        </p>

        <div className="font-mono text-xs sm:text-sm bg-secondary rounded-lg p-4 mb-8 overflow-x-auto" aria-hidden="true">
          <div className="whitespace-nowrap">
            <span className="text-accent">$</span> cd {path}
          </div>
          <div className="text-muted-foreground whitespace-nowrap">cd: no such file or directory</div>
        </div>

        <Button asChild size="lg" className="gap-2">
          <a href="/">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </a>
        </Button>
      </div>
    </main>
  );
};

export default NotFound;
