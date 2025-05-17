
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Terminal } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const HeroSection = () => {
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [showConsoleError, setShowConsoleError] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Hey, I'm Kelvin";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setIsTypingDone(true), 500);
      }
    }, 120);

    // Log easter egg to console
    console.log("%cHey hacker 👀 — want to collab? Email me!", "color: #4ade80; font-size: 20px; font-weight: bold;");

    return () => clearInterval(typingInterval);
  }, []);

  const triggerFakeError = () => {
    setShowConsoleError(true);
    toast({
      title: "System Error",
      description: "Uncaught TypeError: Cannot read properties of undefined (reading 'talent')",
      variant: "destructive",
    });
    setTimeout(() => setShowConsoleError(false), 4000);
  };

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-accent/5"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
              Web Developer & Ethical Hacker
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <div className="mb-2 h-16">
              <span>{typedText}</span>
              <span className="inline-block w-[3px] h-8 ml-1 bg-accent animate-pulse"></span>
            </div>
            <div className={`font-jetbrains text-2xl md:text-3xl mt-4 text-accent transition-all duration-1000 ${isTypingDone ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Web Developer, Ethical Hacker, Console Whisperer 👨‍💻
            </div>
          </h1>

          <p className={`text-lg md:text-xl mt-6 text-muted-foreground transition-all duration-1000 delay-300 ${isTypingDone ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            I build cool sites/apps and debug even cooler bugs.
          </p>
          
          {showConsoleError && (
            <div className="console-error mx-auto mt-6 max-w-md text-left animate-fade-in-up">
              <div className="flex items-center">
                <Terminal size={14} className="mr-2" />
                <span className="font-bold">ERROR:</span>
              </div>
              <code className="block mt-1">Uncaught TypeError: Cannot read properties of undefined (reading 'talent')</code>
              <span className="block mt-1 text-xs">at HireKelvin.js:42</span>
            </div>
          )}

          <div className={`mt-8 flex flex-col sm:flex-row justify-center gap-4 transition-all duration-1000 delay-500 ${isTypingDone ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Button size="lg" className="font-medium">
              <a href="#projects">See My Work <ArrowRight className="ml-2 w-4 h-4" /></a>
            </Button>
            <Button variant="outline" size="lg" onClick={triggerFakeError} className="font-medium">
              Break Something
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
