
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const AboutSection = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  
  const devQuotes = [
    "Programming is like writing a book... except if you miss a single comma on page 126, the whole thing makes no sense.",
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "The best thing about a boolean is even if you are wrong, you are only off by a bit.",
    "I'm not lazy, I'm just on energy saving mode.",
    "Copy-and-paste was programmed by programmers for programmers.",
    "There are only 10 types of people in the world: those who understand binary and those who don't.",
    "Real programmers count from 0.",
    "A UI is like a joke. If you have to explain it, it's not that good.",
  ];
  
  const handleQuoteChange = () => {
    setQuoteIndex((prev) => (prev + 1) % devQuotes.length);
    toast({
      title: "Dev Wisdom",
      description: devQuotes[(quoteIndex + 1) % devQuotes.length],
      duration: 5000,
    });
  };

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            About <span className="text-accent">Me</span>
          </h2>
          
          <div className="space-y-6 text-lg">
            <p>
              I'm a web dev, Computer Scientist & cybersecurity Enthusiast at Egerton Uni. 
              I turn caffeine into code, lose sleep over semicolons, and cry over broken builds 
              (just kidding... kinda).
            </p>
            
            <Card className="overflow-hidden border-accent/20 hover:border-accent/50 transition-colors">
              <CardContent className="p-0">
                <div className="bg-accent/5 p-4 text-base font-jetbrains relative">
                  <span className="absolute top-2 left-3 h-3 w-3 rounded-full bg-destructive mr-2"></span>
                  <span className="absolute top-2 left-8 h-3 w-3 rounded-full bg-amber-400 mr-2"></span>
                  <span className="absolute top-2 left-13 h-3 w-3 rounded-full bg-green-400 mr-2"></span>
                  <div className="pt-4">
                    <span className="text-muted-foreground select-none">$ </span>
                    <span className="typing-container">cat about-kelvin.md</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <p className="font-medium">🧑🏽‍💻 Fullstack Web Developer with solid Mobile App Dev foundations and growing Cybersecurity Engineering instincts.</p>
                    <p>👨‍💻 Learning hard, shipping fast, designing better.</p>
                    <p>🚀 KevDev = Frontend first, Backend ready, Security-minded, Future-driven.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p>
              I build products fast, design with purpose, and secure your stack from the ground up.
              I've worked with real-time databases, authentication flows, responsive design, 
              and ethical hacking principles — that's a triple crown most devs don't wear.
            </p>
            
            <div className="mt-8">
              <h3 className="font-bold text-xl mb-6">🛠 Tech Stack</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-all duration-300 hover:border-accent/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-accent/20 p-3 rounded-full">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="Frontend" className="w-8 h-8" />
                      </div>
                      <h4 className="text-lg font-bold">Frontend</h4>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="text-accent">▹</span> HTML5, CSS3, JavaScript (ES6+)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-accent">▹</span> Tailwind CSS, Bootstrap
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-accent">▹</span> React.js
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-all duration-300 hover:border-accent/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-accent/20 p-3 rounded-full">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Backend" className="w-8 h-8" />
                      </div>
                      <h4 className="text-lg font-bold">Backend</h4>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="text-accent">▹</span> Node.js, Express.js
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-accent">▹</span> Firebase, Supabase (Postgres)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-accent">▹</span> REST APIs
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-all duration-300 hover:border-accent/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-accent/20 p-3 rounded-full">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" alt="Mobile" className="w-8 h-8" />
                      </div>
                      <h4 className="text-lg font-bold">Mobile</h4>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="text-accent">▹</span> Flutter (Dart)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-accent">▹</span> PWA Concepts
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-all duration-300 hover:border-accent/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-accent/20 p-3 rounded-full">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" alt="Tools" className="w-8 h-8" />
                      </div>
                      <h4 className="text-lg font-bold">Tools & Security</h4>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="text-accent">▹</span> Git, GitHub, VS Code
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-accent">▹</span> Linux CLI, Postman
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-accent">▹</span> Kali Linux, Wi-Fi scanning
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="mt-8">
              <Card className="bg-background hover:bg-secondary/50 transition-all duration-300 cursor-pointer" onClick={handleQuoteChange}>
                <CardContent className="p-6">
                  <blockquote className="font-jetbrains text-lg italic">
                    "{devQuotes[quoteIndex]}"
                  </blockquote>
                  <p className="text-right mt-2 text-sm text-muted-foreground">
                    (Click for more dev wisdom)
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-center mt-10">
              <Button size="lg">
                <a href="#skills" className="flex items-center">
                  Check Out My Skills
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
