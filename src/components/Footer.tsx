import { Github, Linkedin, Mail, MessageCircle, Phone, Twitter } from "lucide-react";
import { contactLinks, profiles, site } from "@/config/site";

const footerSocials = [
  { icon: Github, label: "GitHub", href: profiles.github, testId: "link-footer-github" },
  { icon: Linkedin, label: "LinkedIn", href: profiles.linkedin, testId: "link-footer-linkedin" },
  { icon: Twitter, label: "X (Twitter)", href: profiles.x, testId: "link-footer-twitter" },
  { icon: MessageCircle, label: "WhatsApp", href: contactLinks.whatsapp, testId: "link-footer-whatsapp" },
  { icon: Phone, label: "Phone", href: contactLinks.phone, testId: "link-footer-phone" },
  { icon: Mail, label: "Email", href: contactLinks.email, testId: "link-footer-email" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background" data-testid="footer">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:justify-between sm:items-center">
          <div className="text-left">
            <a
              href="#home"
              className="font-bold text-lg tracking-tight"
              aria-label={`${site.name} — back to top`}
              data-testid="link-footer-logo"
            >
              Kelvin<span className="text-accent">.</span>
            </a>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Software Engineer · AI Builder · Co-founder, {site.organization.name}
            </p>
          </div>

          <div className="flex items-center gap-5" data-testid="list-footer-socials">
            {footerSocials.map((s) => {
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
                  <s.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              );
            })}
          </div>

          {/* Year comes from the build when prerendered; suppress the warning if it rolls over before a rebuild. */}
          <p
            className="text-xs text-muted-foreground text-left sm:text-right"
            data-testid="text-copyright"
            suppressHydrationWarning
          >
            © {year} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
