import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Github, Linkedin, Mail, MessageCircle, Phone, Twitter } from "lucide-react";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/Kevrollin" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com" },
  { icon: Mail, label: "Email", href: "mailto:kelvinmukaria2023@gmail.com" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/254757086742" },
];

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        "service_ej3wqaq",
        "template_134wyxx",
        { from_name: form.name, from_email: form.email, subject: form.subject, message: form.message },
        "OEzF15RYCvBQI8hwR"
      );

        toast({ title: "Message sent", description: "Thanks! I'll get back to you shortly." });
        setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast({
        title: "Failed to send",
        description: "Something went wrong. Try WhatsApp or email directly.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const sendWhatsApp = () => {
    const text = `Hi Kelvin,\n\nName: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.open(`https://wa.me/254757086742?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-secondary/20 dark:bg-secondary/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <p
            className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 text-left"
            data-testid="text-contact-label"
          >
            Contact
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-left mb-3"
            data-testid="text-contact-heading"
          >
            Let's Work Together
          </h2>
          <p
            className="text-left text-sm sm:text-base text-muted-foreground mb-10 sm:mb-14 max-w-xl"
            data-testid="text-contact-description"
          >
            Open to freelance projects, full-time roles, and interesting collaborations.
            I'll respond within 24 hours.
          </p>

          <div className="grid md:grid-cols-5 gap-8 md:gap-12">
            {/* Form — full width on mobile, 3/5 on desktop */}
            <div className="md:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-contact">
                {/* Name + Email — stacked on mobile, side-by-side on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium block mb-1.5">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      data-testid="input-name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium block mb-1.5">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      data-testid="input-email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="text-sm font-medium block mb-1.5">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="e.g. Freelance project, Job opportunity..."
                    value={form.subject}
                    onChange={handleChange}
                    required
                    data-testid="input-subject"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="text-sm font-medium block mb-1.5">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                    data-testid="textarea-message"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <Button
                    type="submit"
                    disabled={sending}
                    className="w-full sm:flex-1"
                    data-testid="button-send-email"
                  >
                    {sending ? "Sending..." : "Send Message"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={sendWhatsApp}
                    className="w-full sm:w-auto gap-2"
                    data-testid="button-send-whatsapp"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </Button>
                </div>
              </form>
            </div>

            {/* Sidebar — stacks below on mobile */}
            <div className="md:col-span-2 flex flex-col gap-8 mt-2 md:mt-0">
              {/* Direct contact */}
              <div>
                <h3 className="font-semibold text-base mb-4" data-testid="text-contact-info-heading">
                  Direct Contact
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent" />
                    <div>
                      <span className="font-medium text-foreground block">Email</span>
                      <a
                        href="mailto:kelvinmukaria2023@gmail.com"
                        className="hover:text-accent transition-colors break-all"
                        data-testid="link-email-direct"
                      >
                        kelvinmukaria2023@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MessageCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent" />
                    <div>
                      <span className="font-medium text-foreground block">WhatsApp</span>
                      <a
                        href="https://wa.me/254757086742"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-colors"
                        data-testid="link-whatsapp-direct"
                      >
                        +254 757 086 742
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent" />
                    <div>
                      <span className="font-medium text-foreground block">Phone</span>
                      <a
                        href="tel:+254117103255"
                        className="hover:text-accent transition-colors"
                        data-testid="link-phone-direct"
                      >
                        +254 117 103 255
                      </a>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground pt-1">📍 Kenya (Nakuru / Meru)</p>
                </div>
              </div>

              {/* Socials */}
              <div>
                <h3 className="font-semibold text-base mb-4" data-testid="text-socials-heading">
                  Find Me Online
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3" data-testid="list-socials">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                      data-testid={`link-social-${s.label.toLowerCase().replace(/[^a-z]/g, "-")}`}
                    >
                      <span className="w-8 h-8 rounded-lg border border-border group-hover:border-accent/40 flex items-center justify-center transition-colors flex-shrink-0">
                        <s.icon className="h-4 w-4" />
                      </span>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
