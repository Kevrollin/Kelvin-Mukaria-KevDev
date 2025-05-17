
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Skill {
  name: string;
  level: string;
  caption: string;
  icon: string;
  category: 'frontend' | 'backend' | 'mobile' | 'security' | 'tools';
}

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const skills: Skill[] = [
    { 
      name: 'HTML5', 
      level: 'Advanced', 
      caption: 'My web pages are so semantic they could write their own SEO.',
      icon: '📄', 
      category: 'frontend'
    },
    { 
      name: 'CSS3', 
      level: 'Advanced', 
      caption: 'My layouts don\'t just work — they vibe across breakpoints.',
      icon: '🎨', 
      category: 'frontend' 
    },
    { 
      name: 'JavaScript (ES6+)', 
      level: 'Advanced', 
      caption: 'I talk to the DOM like it owes me money.',
      icon: '🔧', 
      category: 'frontend'
    },
    { 
      name: 'Tailwind CSS', 
      level: 'Advanced', 
      caption: 'Custom CSS? Nah, I tailwind through styles like a design ninja.',
      icon: '💨', 
      category: 'frontend'
    },
    { 
      name: 'React.js', 
      level: 'Intermediate', 
      caption: 'I make components so reusable, even React is impressed.',
      icon: '⚛️', 
      category: 'frontend'
    },
    { 
      name: 'Node.js + Express', 
      level: 'Intermediate', 
      caption: 'I route requests like a bouncer at a high-end club.',
      icon: '🚂', 
      category: 'backend'
    },
    { 
      name: 'Firebase', 
      level: 'Advanced', 
      caption: "No backend? No problem. Firebase's my sidekick.",
      icon: '🔥', 
      category: 'backend'
    },
    { 
      name: 'Supabase', 
      level: 'Intermediate', 
      caption: 'SQL with swagger. I love my data relational and real-time.',
      icon: '⚡', 
      category: 'backend'
    },
    { 
      name: 'Flutter', 
      level: 'Intermediate', 
      caption: "One codebase, two platforms. Flutter's how I keep it cross-platform and chill.",
      icon: '📱', 
      category: 'mobile'
    },
    { 
      name: 'Git & GitHub', 
      level: 'Advanced', 
      caption: 'I commit with confidence. My version control is cleaner than your desk.',
      icon: '🔄', 
      category: 'tools'
    },
    { 
      name: 'Ethical Hacking', 
      level: 'Intermediate', 
      caption: "I don't break laws. I break assumptions and insecure networks.",
      icon: '🔍', 
      category: 'security'
    },
    { 
      name: 'Linux CLI', 
      level: 'Intermediate', 
      caption: 'Terminal is my playground. GUI is just for screenshots.',
      icon: '🐧', 
      category: 'tools'
    },
  ];

  const filterSkills = (category: string | null) => {
    return category 
      ? skills.filter(skill => skill.category === category)
      : skills;
  };

  const displayedSkills = filterSkills(activeCategory);

  return (
    <section id="skills" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          My <span className="text-accent">Skills</span>
        </h2>
        
        <p className="text-center text-lg mb-10 max-w-2xl mx-auto">
          A collection of technologies I work with daily. Hover over each card to see my honest (and slightly cheeky) assessment.
        </p>
        
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === null ? 'bg-accent text-white' : 'bg-secondary hover:bg-secondary/80'}`}
            onClick={() => setActiveCategory(null)}
          >
            All
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === 'frontend' ? 'bg-accent text-white' : 'bg-secondary hover:bg-secondary/80'}`}
            onClick={() => setActiveCategory('frontend')}
          >
            Frontend
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === 'backend' ? 'bg-accent text-white' : 'bg-secondary hover:bg-secondary/80'}`}
            onClick={() => setActiveCategory('backend')}
          >
            Backend
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === 'mobile' ? 'bg-accent text-white' : 'bg-secondary hover:bg-secondary/80'}`}
            onClick={() => setActiveCategory('mobile')}
          >
            Mobile
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === 'security' ? 'bg-accent text-white' : 'bg-secondary hover:bg-secondary/80'}`}
            onClick={() => setActiveCategory('security')}
          >
            Security
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === 'tools' ? 'bg-accent text-white' : 'bg-secondary hover:bg-secondary/80'}`}
            onClick={() => setActiveCategory('tools')}
          >
            Tools
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedSkills.map((skill) => (
            <Card key={skill.name} className="skill-card group overflow-hidden border border-accent/10 hover:border-accent/30">
              <CardContent className="p-6 relative">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{skill.icon}</span>
                  <div>
                    <h3 className="font-bold">{skill.name}</h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      skill.level === 'Advanced' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                </div>
                
                <div className="h-24 overflow-hidden rounded-md relative bg-secondary/20">
                  <div className="transform transition-all duration-300 group-hover:opacity-0 absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 flex items-center justify-center">
                      <span className="text-4xl">{skill.icon}</span>
                    </div>
                  </div>
                  <div className="transform transition-all duration-300 opacity-0 group-hover:opacity-100 absolute inset-0 bg-accent/10 p-4 backdrop-blur-sm">
                    <p className="text-sm italic">{skill.caption}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
