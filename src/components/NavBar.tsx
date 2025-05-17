
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Code, Menu, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const NavBar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  // Check for saved theme preference or prefer-color-scheme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // When closing, add a closing animation
    if (isMenuOpen) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
  };

  // Handle nav item click on mobile
  const handleNavClick = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  // Function to open WhatsApp chat with a pre-filled message
  const openHireMeChat = () => {
    toast({
      title: "Opening WhatsApp",
      description: "Taking you to WhatsApp to discuss your project...",
    });
    window.open(`https://wa.me/254757086742?text=${encodeURIComponent("Hi Kelvin! I'd like to hire you for a project.")}`, "_blank");
  };

  const openCollaborateChat = () => {
    toast({
      title: "Opening WhatsApp",
      description: "Taking you to WhatsApp to discuss collaboration...",
    });
    window.open(`https://wa.me/254757086742?text=${encodeURIComponent("Hi Kelvin! I'd like to collaborate with you on a project.")}`, "_blank");
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : ''}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-2 text-lg font-bold z-20">
          <Code className="text-accent" size={24} />
          <span className="font-jetbrains">Kev<span className="text-accent">Dev</span></span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#about" className="text-sm font-medium hover:text-accent transition-colors">About</a>
          <a href="#skills" className="text-sm font-medium hover:text-accent transition-colors">Skills</a>
          <a href="#projects" className="text-sm font-medium hover:text-accent transition-colors">Projects</a>
          <a href="#contact" className="text-sm font-medium hover:text-accent transition-colors">Contact</a>
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="relative group"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 bg-background border shadow-sm px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              {isDark ? 'Let there be light! 💡' : 'Save my retina! 🌙'}
            </span>
          </Button>
          
          <Button variant="outline" className="hidden md:inline-flex">
            <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
          
          <Button className="hidden md:inline-flex font-medium" onClick={openCollaborateChat}>
            Let's Collaborate
          </Button>

          <Button variant="default" className="hidden md:inline-flex font-medium bg-accent hover:bg-accent/80" onClick={openHireMeChat}>
            Hire Me!
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-3 md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X size={24} className="animate-in fade-in spin-in-90" />
            ) : (
              <Menu size={24} className="animate-in fade-in spin-in-90" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-background/95 backdrop-blur-lg flex flex-col justify-center items-center transition-all duration-300 ease-in-out z-10 md:hidden
        ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      >
        <nav className="flex flex-col items-center space-y-8">
          <a 
            href="#about" 
            className="text-xl font-medium hover:text-accent transition-all hover:scale-110 transform"
            onClick={handleNavClick}
          >
            About
          </a>
          <a 
            href="#skills" 
            className="text-xl font-medium hover:text-accent transition-all hover:scale-110 transform"
            onClick={handleNavClick}
          >
            Skills
          </a>
          <a 
            href="#projects" 
            className="text-xl font-medium hover:text-accent transition-all hover:scale-110 transform"
            onClick={handleNavClick}
          >
            Projects
          </a>
          <a 
            href="#contact" 
            className="text-xl font-medium hover:text-accent transition-all hover:scale-110 transform"
            onClick={handleNavClick}
          >
            Contact
          </a>
          
          <div className="pt-6 flex flex-col gap-4 items-center w-64">
            <Button variant="outline" className="w-full" onClick={() => {
              window.open("https://github.com/yourgithub", "_blank");
              handleNavClick();
            }}>
              GitHub
            </Button>
            
            <Button className="w-full" onClick={() => {
              openCollaborateChat();
              handleNavClick();
            }}>
              Let's Collaborate
            </Button>

            <Button variant="default" className="w-full bg-accent hover:bg-accent/80" onClick={() => {
              openHireMeChat();
              handleNavClick();
            }}>
              Hire Me!
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
