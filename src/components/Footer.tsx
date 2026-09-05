import { Github, Linkedin, Mail, MessageCircle, Phone, Twitter } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background" data-testid="footer">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:justify-between sm:items-center">
          <div className="text-left">
            <a href="#" className="font-bold text-lg tracking-tight" data-testid="link-footer-logo">
              Kelvin<span className="text-accent">.</span>
            </a>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Software Engineer · AI Builder · Co-founder, Ardena Platform Africa
            </p>
          </div>

          <div className="flex items-center gap-5" data-testid="list-footer-socials">
            <a
              href="https://github.com/Kevrollin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-footer-github"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/kelvin-mukaria-mk-98008b230"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-footer-linkedin"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://x.com/kelvinmukariaa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-footer-twitter"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/254757086742"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-footer-whatsapp"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href="tel:+254117103255"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-footer-phone"
              aria-label="Phone"
            >
              <Phone className="h-4 w-4" />
            </a>
            <a
              href="mailto:kelvincodes25@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-footer-email"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>

          <p className="text-xs text-muted-foreground text-left sm:text-right" data-testid="text-copyright">
            © {year} Kelvin Mukaria
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
