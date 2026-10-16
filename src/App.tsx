import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";

// The 404 page is rarely seen, so keep it out of the main bundle.
const NotFound = lazy(() => import("./pages/NotFound"));

// Single-page site: vercel.json rewrites every path to index.html, so any path other than "/" is a 404.
const isHome = ["/", "/index.html"].includes(window.location.pathname);

const App = () => (
  <ThemeProvider>
    <Toaster />
    {isHome ? (
      <Index />
    ) : (
      <Suspense fallback={null}>
        <NotFound />
      </Suspense>
    )}
  </ThemeProvider>
);

export default App;
