import { GraduationCap, Code2, Shield, Cpu } from "lucide-react";

const pillars = [
  {
    icon: Code2,
    title: "Full-Stack Engineering",
    description:
      "End-to-end web and mobile apps. Pixel-perfect frontends with React to robust Node.js backends, REST APIs, and real-time databases.",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Security-first mindset. Ethical hacking, network analysis, Kali Linux, and building systems hardened from the ground up.",
  },
  {
    icon: Cpu,
    title: "AI & Automation",
    description:
      "AI-powered tools. Workflow automation, developer productivity, and intelligent systems integrated into real products.",
  },
  {
    icon: GraduationCap,
    title: "Entrepreneurship",
    description:
      "Founder mindset — I build, launch, and iterate fast. Multiple live products, all designed and deployed independently.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Left: bio + stats */}
            <div>
              <p
                className="text-sm font-semibold text-accent uppercase tracking-widest mb-3"
                data-testid="text-about-label"
              >
                About
              </p>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-tight"
                data-testid="text-about-heading"
              >
                Engineer. Builder.<br />Entrepreneur.
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed" data-testid="text-about-body">
                <p>
                  I'm a Software Engineer and AI & Automation Builder by profession — designing and
                  shipping production-grade software, intelligent systems, and secure digital
                  infrastructure across the full stack.
                </p>
                <p>
                  As <span className="font-medium text-foreground">Co-founder & COO of Ardena Platform Africa</span>,
                  I'm building technology that solves real problems on the continent — combining
                  engineering execution with strategic product vision.
                </p>
                <p>
                  I don't just write code. I ship products. Live SaaS tools, AI-integrated platforms,
                  a cybersecurity startup, client websites — all designed, built, and deployed by me.
                </p>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4" data-testid="list-stats">
                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold" data-testid="stat-projects">8+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">Live Projects</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold" data-testid="stat-domains">4</div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">Core Domains</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold" data-testid="stat-stacks">10+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">Technologies</div>
                </div>
              </div>
            </div>

            {/* Right: pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4" data-testid="list-pillars">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="p-4 md:p-5 rounded-xl border border-border hover:border-accent/40 hover:shadow-md transition-all duration-200 bg-background"
                  data-testid={`card-pillar-${p.title.split(" ")[0].toLowerCase()}`}
                >
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                    <p.icon className="h-4 w-4 text-accent" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1.5">{p.title}</h3>
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
