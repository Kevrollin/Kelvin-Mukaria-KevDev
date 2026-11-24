/**
 * Build-time (and dev-time) server entry. Bundled by `vite build --ssr` and used by
 * scripts/prerender.mjs to write fully rendered HTML, head tags, sitemap.xml and robots.txt into dist/.
 * Never shipped to the browser.
 */
import { renderToString } from "react-dom/server";
import App from "./App";
import NotFound from "./pages/NotFound";
import type { PageId } from "./seo/head";

export { buildHead, pages, isValidGaId, isValidToken } from "./seo/head";
export { buildSitemap, buildRobots, sitemapEntries } from "./seo/files";
export { homeStructuredData } from "./seo/structured-data";
export { SITE_URL, absoluteUrl, sections, site } from "./config/site";

export function renderPage(page: PageId): string {
  return renderToString(page === "home" ? <App /> : <NotFound />);
}
