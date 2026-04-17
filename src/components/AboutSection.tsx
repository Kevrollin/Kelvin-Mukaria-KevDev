import { GraduationCap, Code2, Shield, Cpu } from "lucide-react";

const pillars = [
  {
    icon: Code2,
    title: "Full-Stack Engineering",
    description:
      "Building end-to-end web and mobile applications. From pixel-perfect frontends with React to robust Node.js backends, REST APIs, and real-time databases.",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Security-first development mindset. Ethical hacking foundations, network analysis, Kali Linux tooling, and building systems that are hardened from the ground up.",
  },
  {
    icon: Cpu,
    title: "AI & Automation",
    description:
      "Leveraging AI to build smarter tools. Workflow automation, developer productivity tools, and integrating intelligent systems into real-world products.",
  },
  {
    icon: GraduationCap,
    title: "Entrepreneurship",
    description:
      "Turning ideas into shipped products. Founder mindset — I build, launch, and iterate fast. Multiple live products, all built and deployed independently.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-4" data-testid="text-about-label">
                About
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight" data-testid="text-about-heading">
                Engineer. Builder.<br />Security-Minded.
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed" data-testid="text-about-body">
                <p>
                  I'm a Computer Science student at Egerton University, Kenya — building production-grade
                  software across the full stack while deepening expertise in cybersecurity and AI-powered automation.
                </p>
                <p>
                  I don't just write code. I ship products. My portfolio includes live SaaS tools, AI-integrated
                  platforms, a cybersecurity startup, and client websites — all designed, built, and deployed by me.
                </p>
                <p>
                  If you need a developer who moves fast, thinks about security, and delivers polished results —
                  that's exactly what I do.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-6" data-testid="list-stats">
                <div>
                  <div className="text-3xl font-bold" data-testid="stat-projects">8+</div>
                  <div className="text-sm text-muted-foreground">Live Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-bold" data-testid="stat-domains">4</div>
                  <div className="text-sm text-muted-foreground">Core Domains</div>
                </div>
                <div>
                  <div className="text-3xl font-bold" data-testid="stat-stacks">10+</div>
                  <div className="text-sm text-muted-foreground">Technologies</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-testid="list-pillars">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="p-5 rounded-xl border border-border hover:border-accent/40 hover:shadow-md transition-all duration-200 bg-background"
                  data-testid={`card-pillar-${p.title.split(" ")[0].toLowerCase()}`}
                >
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                    <p.icon className="h-4 w-4 text-accent" />
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{p.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
