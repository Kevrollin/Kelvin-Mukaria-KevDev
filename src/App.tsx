import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";

/** The homepage. Prerendered to dist/index.html at build time and hydrated by main.tsx. */
const App = () => (
  <ThemeProvider>
    <Toaster />
    <Index />
  </ThemeProvider>
);

export default App;
