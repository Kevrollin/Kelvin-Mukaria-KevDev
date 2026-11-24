import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "kev-theme";
const isTheme = (v: unknown): v is Theme => v === "light" || v === "dark" || v === "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // The page is prerendered at build time, so the first client render must match the server HTML:
  // start from the default theme and pick up the saved choice right after mount. The inline script
  // in index.html has already applied the `dark` class before first paint, so nothing flashes.
  const [theme, setThemeState] = useState<Theme>("light");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isTheme(saved)) setThemeState(saved);
    } catch {
      // Storage blocked (private mode, disabled cookies): keep the default.
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return; // don't overwrite the saved choice with the default before it's been read

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () =>
      document.documentElement.classList.toggle("dark", theme === "dark" || (theme === "system" && mq.matches));
    apply();
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore
    }

    if (theme !== "system") return;
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [theme, loaded]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
