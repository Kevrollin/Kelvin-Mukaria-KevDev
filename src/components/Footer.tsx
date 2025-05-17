
import { useState } from 'react';
import { Terminal, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Array of developer jokes
const devJokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'",
  "Why don't programmers like nature? It has too many bugs and no debugging tool.",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
  "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
  "What's a programmer's favorite hangout place? The Foo Bar.",
  "Why did the developer go broke? Because he used up all his cache.",
  "Why do Java developers wear glasses? Because they don't C#.",
  "What's the best thing about a Boolean? Even if you're wrong, you're only off by a bit.",
  "What do you call a programmer from Finland? Nerdic."
];

const Footer = () => {
  const [hackerMode, setHackerMode] = useState(false);
  
  const activateHackerMode = () => {
    setHackerMode(true);
    document.body.classList.add('hacker-mode');
    setTimeout(() => {
      document.body.classList.remove('hacker-mode');
      setHackerMode(false);
    }, 5000);
  };

  const showDevJoke = () => {
    const randomJoke = devJokes[Math.floor(Math.random() * devJokes.length)];
    
    toast({
      title: "🤣 Dev Joke",
      description: randomJoke,
      duration: 5000,
    });
  };

  return (
    <footer className="bg-secondary py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <span className="font-jetbrains text-2xl font-bold mr-2">Kelvin</span>
            <span className="text-accent text-2xl font-bold">Dev</span>
          </div>
          
          <p className="mb-8 text-muted-foreground">
            Building digital experiences with code, caffeine, and a touch of chaos.
          </p>
          
          <div className="flex justify-center space-x-6 mb-8">
            <button
              onClick={activateHackerMode}
              className={`px-4 py-2 rounded-md font-jetbrains text-sm transition-colors flex items-center ${hackerMode ? 'bg-green-500 text-black' : 'bg-secondary hover:bg-secondary/80'}`}
            >
              <Terminal className="mr-2 h-4 w-4" />
              {hackerMode ? 'HACKED!' : 'Hacker Mode'}
            </button>
            
            <button
              onClick={showDevJoke}
              className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-md text-sm transition-colors flex items-center"
            >
              <Zap className="mr-2 h-4 w-4" />
              Dev Joke
            </button>
          </div>
          
          <div className="border-t border-muted pt-6">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Kelvin Dev. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Built with React & Tailwind CSS. No semicolons were harmed in the making of this site.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
