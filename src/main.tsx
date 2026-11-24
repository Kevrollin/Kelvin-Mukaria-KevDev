import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;
const isHome = ["/", "/index.html"].includes(window.location.pathname);

if (isHome) {
  // Production HTML is prerendered (scripts/prerender.mjs), so attach to it instead of re-rendering.
  // The dev server serves an empty #root, so render from scratch there.
  if (container.firstElementChild) hydrateRoot(container, <App />);
  else createRoot(container).render(<App />);
} else {
  // In production Vercel answers unknown paths with the static, prerendered 404.html (real 404 status,
  // no JS). This branch covers the dev server and any host that falls back to index.html instead.
  import("./pages/NotFound").then(({ default: NotFound }) => {
    document.querySelector('meta[name="robots"]')?.setAttribute("content", "noindex, follow");
    createRoot(container).render(<NotFound />);
  });
}
