import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeMenu from "@/components/ThemeMenu";
import { sections, site } from "@/config/site";

const navLinks = sections.map((s) => ({ label: s.label, href: `#${s.id}` }));

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); // page may load already scrolled (refresh, #anchor link)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Full-screen mobile menu: lock background scroll and close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto flex items-center justify-between h-16">
            <a
              href="#home"
              className="flex items-center gap-2.5 font-bold text-lg tracking-tight"
              aria-label={`${site.name} — back to top`}
              data-testid="link-logo"
            >
              <img
                src={site.avatarSmall}
                alt=""
                width={32}
                height={32}
                decoding="async"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-accent/30"
              />
              <span>
                Kelvin<span className="text-accent">.</span>
              </span>
            </a>

            <nav aria-label="Primary" className="hidden md:flex items-center gap-8" data-testid="nav-desktop">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  data-testid={`link-nav-${l.label.toLowerCase()}`}
                >
                  {l.label}
                </a>
              ))}
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-nav-resume"
              >
                Resume
              </a>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <ThemeMenu testId="button-theme-toggle" />

              <Button size="sm" asChild data-testid="button-hire-me">
                <a href="#contact">Hire Me</a>
              </Button>
            </div>

            <div className="flex md:hidden items-center gap-2">
              <ThemeMenu testId="button-theme-toggle-mobile" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMenuOpen(!menuOpen)}
                data-testid="button-mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        className={`fixed inset-0 z-40 bg-background/98 backdrop-blur-lg flex flex-col justify-center items-center gap-8 md:hidden transition-all duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {navLinks.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={closeMenu}
            className="text-2xl font-semibold hover:text-accent transition-colors"
            data-testid={`link-mobile-${l.label.toLowerCase()}`}
          >
            {l.label}
          </a>
        ))}
        <a
          href={site.resume}
          target="_blank"
          rel="noopener noreferrer"
          download
          onClick={closeMenu}
          className="text-2xl font-semibold hover:text-accent transition-colors"
          data-testid="link-mobile-resume"
        >
          Resume
        </a>
        <Button size="lg" className="mt-4 w-40" asChild data-testid="button-hire-me-mobile">
          <a href="#contact" onClick={closeMenu}>
            Hire Me
          </a>
        </Button>
      </nav>
    </>
  );
};

export default NavBar;
