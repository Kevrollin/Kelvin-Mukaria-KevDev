
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Github } from 'lucide-react';
import { useState } from 'react';

interface Project {
  id: number;
  name: string;
  description: string;
  caption: string;
  tags: string[];
  image: string;
  github?: string;
  demo?: string;
  status: 'live' | 'beta' | 'concept';
}

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects: Project[] = [
    {
      id: 1,
      name: 'Student Productivity Dashboard',
      description: 'A responsive web app to manage tasks, track progress, set reminders, and boost academic productivity.',
      caption: 'Built for students by a student who gets the grind.',
      tags: ['React', 'Firebase', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=600&h=400&q=80',
      github: 'https://github.com',
      demo: 'https://example.com',
      status: 'live'
    },
    {
      id: 2,
      name: 'Palinesco PlanBuild Company Website',
      description: 'A modern, responsive construction company site showcasing services, completed projects, and a user-friendly contact portal for clients across Tigania East, Meru-Kenya.',
      caption: 'Designed to elevate local construction services with digital presence and client-focused UX.',
      tags: ['React', 'ShadCN UI', 'Tailwind CSS', 'Vite'],
      image: '/palinesco-overview-site.JPG',
      github: 'https://github.com/Kevrollin/palinesco-plan-build-company',
      demo: 'https://palinesco-plan-build-company.vercel.app/',
      status: 'live'
    },


    {
      id: 2,
      name: 'Caffeinated Thoughts | Bloging site',
      description: 'Personal Bloging site with Mpesa Daraja API integration for buy me coffe button. Fully responsive and functional',
      caption: 'Made with coffe and love - Tech content.',
      tags: ['React', 'ShadCN UI', 'Tailwind CSS', 'Vite'],
      image: '/caffeinated-thoughts.png',
      github: 'https://github.com/Kevrollin/caffeinated-thoughts-alpha',
      demo: 'https://caffeinated-thoughts-alpha.vercel.app/',
      status: 'live'
    },
    
    {
      id: 3,
      name: 'Finance Dashboard',
      description: 'Personal finance tracker with budgets, expense categories, charts, and dark mode.',
      caption: 'Where your money goes to get its act together.',
      tags: ['React', 'Chart.js', 'Supabase'],
      image: 'https://images.unsplash.com/photo-1579621970590-9d624316904b?auto=format&fit=crop&w=600&h=400&q=80',
      github: 'https://github.com',
      status: 'beta'
    },
    {
      id: 4,
      name: 'Tech Services Agency Site',
      description: 'Sleek website for a tech startup with animations, a hire-dev modal form, and WhatsApp integration.',
      caption: 'Because hiring devs should be smart and sexy.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&h=400&q=80',
      demo: 'https://example.com',
      status: 'live'
    },
    {
      id: 5,
      name: 'Transport App for Matatu Booking',
      description: 'A platform for commuters to connect with nearby matatus, book seats, and get digital tickets.',
      caption: 'Kenya\'s Uber? Nah — Matatu\'s going digital, Kev-style.',
      tags: ['Flutter', 'Firebase', 'Google Maps API'],
      image: 'https://images.unsplash.com/photo-1592853598064-a829ed372c0c?auto=format&fit=crop&w=600&h=400&q=80',
      github: 'https://github.com',
      status: 'beta'
    },
    {
      id: 6,
      name: 'Cybersecurity Chrome Extension',
      description: 'Scans Wi-Fi networks, triggers VPN on public networks, logs data securely.',
      caption: 'Your browser\'s bodyguard with hacker energy.',
      tags: ['JavaScript', 'Chrome API', 'Security'],
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=600&h=400&q=80',
      github: 'https://github.com',
      status: 'concept'
    },
    {
      id: 7,
      name: 'University Source Code Marketplace',
      description: 'Platform for uni students to sell/share source code projects.',
      caption: 'Your code, your coin. Hustle with hex.',
      tags: ['React', 'Node.js', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&h=400&q=80',
      github: 'https://github.com',
      status: 'concept'
    },
  ];

  const filterProjects = (filter: string) => {
    if (filter === 'all') return projects;
    return projects.filter(project => project.status === filter);
  };

  const filteredProjects = filterProjects(activeFilter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return <Badge className="bg-green-500 hover:bg-green-600">🔥 Live</Badge>;
      case 'beta':
        return <Badge className="bg-amber-500 hover:bg-amber-600">🧪 Beta</Badge>;
      case 'concept':
        return <Badge className="bg-blue-500 hover:bg-blue-600">⚡ Concept</Badge>;
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          My <span className="text-accent">Projects</span>
        </h2>
        
        <p className="text-center text-lg mb-10 max-w-2xl mx-auto">
          A selection of my recent work. Each project is built with love, caffeine, and a touch of debugging tears.
        </p>
        
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === 'all' ? 'bg-accent text-white' : 'bg-secondary hover:bg-secondary/80'}`}
            onClick={() => setActiveFilter('all')}
          >
            All Projects
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === 'live' ? 'bg-accent text-white' : 'bg-secondary hover:bg-secondary/80'}`}
            onClick={() => setActiveFilter('live')}
          >
            Live
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === 'beta' ? 'bg-accent text-white' : 'bg-secondary hover:bg-secondary/80'}`}
            onClick={() => setActiveFilter('beta')}
          >
            Beta
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === 'concept' ? 'bg-accent text-white' : 'bg-secondary hover:bg-secondary/80'}`}
            onClick={() => setActiveFilter('concept')}
          >
            Concept
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="project-card overflow-hidden border border-border">
              <div className="relative aspect-video overflow-hidden bg-secondary">
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                />
                <div className="absolute top-2 right-2">
                  {getStatusBadge(project.status)}
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <p className="text-sm italic mb-4">"{project.caption}"</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-md bg-secondary text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  {project.github && (
                    <Button variant="outline" size="sm">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <Github className="mr-1 h-4 w-4" /> Code
                      </a>
                    </Button>
                  )}
                  
                  {project.demo && (
                    <Button size="sm">
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <ExternalLink className="mr-1 h-4 w-4" /> Demo
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-muted-foreground mb-4">More projects on GitHub</p>
          <Button variant="outline" size="lg">
            <a href="https://github.com/Kevrollin/" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <Github className="mr-2 h-5 w-5" /> View All Projects
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
