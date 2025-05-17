
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-7xl font-jetbrains font-bold mb-6">
            <span className="text-destructive">4</span>
            <span className="text-accent">0</span>
            <span className="text-destructive">4</span>
          </h1>
          
          <div className="font-jetbrains text-lg mb-4 bg-secondary p-4 rounded-md">
            <div className="text-left">
              <div className="text-primary mb-2">{"> ERROR"}</div>
              <div className="text-muted-foreground">
                Page not found. Probably debugging in production.
              </div>
              <div className="text-muted-foreground">
                <span className="blink">_</span>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <img 
              src="https://media.giphy.com/media/xTiN0L7EW5trfOvEk0/giphy.gif" 
              alt="Frustrated developer" 
              className="max-w-full h-auto mx-auto rounded-lg shadow-lg"
            />
          </div>
          
          <Button size="lg">
            <a href="/" className="flex items-center">
              Return to Home
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
