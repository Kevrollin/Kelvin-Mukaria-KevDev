import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background" data-testid="footer">
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <a href="#" className="font-bold text-lg tracking-tight" data-testid="link-footer-logo">
              Kelvin<span className="text-accent">.</span>
            </a>
            <p className="text-sm text-muted-foreground mt-1">
              Full-Stack Engineer · Cybersecurity · AI & Automation
            </p>
          </div>

          <div className="flex items-center gap-4" data-testid="list-footer-socials">
            <a
              href="https://github.com/Kevrollin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-footer-github"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-footer-linkedin"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-footer-twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="mailto:kelvinmukaria@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-footer-email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>

          <p className="text-xs text-muted-foreground" data-testid="text-copyright">
            © {year} Kelvin Mukaria. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
