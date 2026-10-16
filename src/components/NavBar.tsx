import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeMenu from "@/components/ThemeMenu";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const resumeHref = "/Kelvin_Mukaria_Resume.pdf";

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
            <a href="#" className="flex items-center gap-2.5 font-bold text-lg tracking-tight" data-testid="link-logo">
              <img
                src="/kelvin-avatar.png"
                alt="Kelvin Mukaria"
                width={32}
                height={32}
                decoding="async"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-accent/30"
              />
              Kelvin<span className="text-accent">.</span>
            </a>

            <nav className="hidden md:flex items-center gap-8" data-testid="nav-desktop">
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
                href={resumeHref}
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

              <Button
                size="sm"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                data-testid="button-hire-me"
              >
                Hire Me
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
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div
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
          href={resumeHref}
          target="_blank"
          rel="noopener noreferrer"
          download
          onClick={closeMenu}
          className="text-2xl font-semibold hover:text-accent transition-colors"
          data-testid="link-mobile-resume"
        >
          Resume
        </a>
        <Button
          size="lg"
          className="mt-4 w-40"
          onClick={() => {
            closeMenu();
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          data-testid="button-hire-me-mobile"
        >
          Hire Me
        </Button>
      </div>
    </>
  );
};

export default NavBar;
