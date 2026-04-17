import { useState } from "react";

type Category = "all" | "frontend" | "backend" | "security" | "ai" | "tools";

interface Skill {
  name: string;
  category: Exclude<Category, "all">;
  level: "Expert" | "Proficient" | "Familiar";
}

const skills: Skill[] = [
  { name: "React.js", category: "frontend", level: "Proficient" },
  { name: "TypeScript", category: "frontend", level: "Proficient" },
  { name: "Tailwind CSS", category: "frontend", level: "Expert" },
  { name: "HTML5 / CSS3", category: "frontend", level: "Expert" },
  { name: "JavaScript ES6+", category: "frontend", level: "Expert" },
  { name: "Flutter (Dart)", category: "frontend", level: "Proficient" },
  { name: "Node.js", category: "backend", level: "Proficient" },
  { name: "Express.js", category: "backend", level: "Proficient" },
  { name: "Firebase", category: "backend", level: "Expert" },
  { name: "Supabase / PostgreSQL", category: "backend", level: "Proficient" },
  { name: "REST APIs", category: "backend", level: "Expert" },
  { name: "Ethical Hacking", category: "security", level: "Proficient" },
  { name: "Kali Linux", category: "security", level: "Proficient" },
  { name: "Network Analysis", category: "security", level: "Familiar" },
  { name: "Security Auditing", category: "security", level: "Familiar" },
  { name: "Python", category: "ai", level: "Proficient" },
  { name: "AI Integration", category: "ai", level: "Proficient" },
  { name: "Workflow Automation", category: "ai", level: "Proficient" },
  { name: "Prompt Engineering", category: "ai", level: "Proficient" },
  { name: "Git & GitHub", category: "tools", level: "Expert" },
  { name: "Linux CLI", category: "tools", level: "Proficient" },
  { name: "Postman", category: "tools", level: "Proficient" },
  { name: "VS Code", category: "tools", level: "Expert" },
];

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "frontend", label: "Frontend & Mobile" },
  { key: "backend", label: "Backend" },
  { key: "security", label: "Cybersecurity" },
  { key: "ai", label: "AI & Automation" },
  { key: "tools", label: "Tools" },
];

const levelColor: Record<Skill["level"], string> = {
  Expert: "bg-accent/15 text-accent",
  Proficient: "bg-primary/10 text-primary dark:text-primary-foreground dark:bg-primary/20",
  Familiar: "bg-secondary text-muted-foreground",
};

const SkillsSection = () => {
  const [active, setActive] = useState<Category>("all");

  const filtered = active === "all" ? skills : skills.filter((s) => s.category === active);

  return (
    <section id="skills" className="py-24 bg-secondary/20 dark:bg-secondary/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-4 text-center" data-testid="text-skills-label">
            Skills
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-4" data-testid="text-skills-heading">
            What I Work With
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto" data-testid="text-skills-description">
            Technologies and tools I use to build, secure, and automate.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-10" data-testid="list-skill-filters">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
                  active === c.key
                    ? "bg-accent text-white shadow-sm"
                    : "bg-background border border-border text-muted-foreground hover:text-foreground hover:border-accent/40"
                }`}
                data-testid={`button-filter-${c.key}`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center" data-testid="list-skills">
            {filtered.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background hover:border-accent/40 hover:shadow-sm transition-all duration-150"
                data-testid={`tag-skill-${skill.name.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}`}
              >
                <span className="text-sm font-medium">{skill.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor[skill.level]}`}>
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
