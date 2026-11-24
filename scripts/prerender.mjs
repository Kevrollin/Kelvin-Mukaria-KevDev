/**
 * Build-time prerender. Runs after the client build (dist/) and the SSR build (dist-ssr/):
 *
 *   dist/index.html  homepage HTML + all SEO head tags, hydrated in the browser by src/main.tsx
 *   dist/404.html    static "not found" page (noindex, no JS bundle); Vercel serves it with HTTP 404
 *   dist/sitemap.xml generated from src/config/site.ts + src/data/projects.ts
 *   dist/robots.txt  points at the sitemap on the canonical domain
 *
 * Optional build env vars (Vercel project settings or a local .env file — never commit real values):
 *   GA_MEASUREMENT_ID       GA4 measurement ID (G-XXXXXXXXXX). Omit to ship no analytics.
 *   GOOGLE_SITE_VERIFICATION  Search Console "HTML tag" token (only the content="" value).
 *   BING_SITE_VERIFICATION    Bing Webmaster Tools msvalidate.01 token.
 */
import fs from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { loadEnv } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");
const ssrEntry = path.join(ssrDir, "entry-server.js");

const fail = (msg) => {
  console.error(`\n[prerender] ${msg}\n`);
  process.exit(1);
};

if (!existsSync(path.join(dist, "index.html"))) fail("dist/index.html missing — run `vite build` first.");
if (!existsSync(ssrEntry)) fail("dist-ssr/entry-server.js missing — run `vite build --ssr src/entry-server.tsx --outDir dist-ssr` first.");

const ssr = await import(pathToFileURL(ssrEntry).href);

// --- Build-time options -------------------------------------------------------------------------

const env = loadEnv("production", root, "");
const pick = (name, isValid) => {
  const value = env[name]?.trim();
  if (!value) return undefined;
  if (!isValid(value)) {
    console.warn(`[prerender] Ignoring ${name}: value doesn't look valid.`);
    return undefined;
  }
  return value;
};

/**
 * Date of the last commit touching `paths`, or undefined when it can't be known for certain
 * (no git, or a shallow clone whose boundary commit would wrongly appear to touch every file).
 */
function gitLastModified(paths) {
  try {
    const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    const out = git("log", "-1", "--format=%H %cI", "--", ...paths);
    if (!out) return undefined;
    const [hash, date] = out.split(" ");
    const shallowFile = path.resolve(root, git("rev-parse", "--git-path", "shallow"));
    if (existsSync(shallowFile) && readFileSync(shallowFile, "utf8").includes(hash)) return undefined;
    return date;
  } catch {
    return undefined;
  }
}

const homeModified = gitLastModified(["src", "index.html", "public"]);
const resumeModified = gitLastModified([`public${ssr.site.resume}`]);

const headOptions = {
  dateModified: homeModified,
  gaMeasurementId: pick("GA_MEASUREMENT_ID", ssr.isValidGaId),
  googleSiteVerification: pick("GOOGLE_SITE_VERIFICATION", ssr.isValidToken),
  bingSiteVerification: pick("BING_SITE_VERIFICATION", ssr.isValidToken),
};

// --- Pages --------------------------------------------------------------------------------------

let template = await fs.readFile(path.join(dist, "index.html"), "utf8");
for (const marker of ["<!--app-head-->", "<!--app-html-->"]) {
  if (!template.includes(marker)) fail(`index.html template is missing the ${marker} marker.`);
}

// Inline the stylesheet: it's small (~7 KB gzipped) and this is a one-page site, so embedding it
// removes a render-blocking round trip before first paint. Skipped if the CSS ever grows large.
const INLINE_CSS_LIMIT = 60 * 1024;
for (const [tag, href] of [...template.matchAll(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/g)]) {
  const css = await fs.readFile(path.join(dist, href), "utf8");
  if (css.length > INLINE_CSS_LIMIT || css.includes("</style")) {
    console.warn(`[prerender] Not inlining ${href} (${Math.round(css.length / 1024)} KB).`);
    continue;
  }
  template = template.replace(tag, () => `<style>${css}</style>`);
}

const fill = (page) =>
  template.replace("<!--app-head-->", () => ssr.buildHead(page, headOptions)).replace("<!--app-html-->", () => ssr.renderPage(page));

await fs.writeFile(path.join(dist, "index.html"), fill("home"));

// The 404 page needs no React: drop the app bundle and its preloads, keep the CSS and theme script.
// A tiny inline script shows the requested path (textContent, so it can't inject markup).
let notFound = fill("404")
  .replace(/\s*<script type="module"[^>]*><\/script>/g, "")
  .replace(/\s*<link rel="modulepreload"[^>]*>/g, "");
notFound = notFound.replace(
  "</body>",
  `  <script>document.querySelectorAll("[data-404-path]").forEach(function (el) { el.textContent = location.pathname; });</script>\n  </body>`,
);
if (/<script type="module"/.test(notFound)) fail("404.html still references the app bundle.");
await fs.writeFile(path.join(dist, "404.html"), notFound);

// --- Crawl files --------------------------------------------------------------------------------

const toDay = (iso) => iso?.slice(0, 10);
await fs.writeFile(
  path.join(dist, "sitemap.xml"),
  ssr.buildSitemap(ssr.sitemapEntries({ home: toDay(homeModified), resume: toDay(resumeModified) })),
);
await fs.writeFile(path.join(dist, "robots.txt"), ssr.buildRobots());

await fs.rm(ssrDir, { recursive: true, force: true });

const enabled = Object.entries({ GA4: headOptions.gaMeasurementId, "Google verification": headOptions.googleSiteVerification, "Bing verification": headOptions.bingSiteVerification })
  .map(([k, v]) => `${k}: ${v ? "on" : "off"}`)
  .join(", ");
console.log(`[prerender] ${ssr.SITE_URL} → index.html, 404.html, sitemap.xml, robots.txt`);
console.log(`[prerender] lastmod: ${toDay(homeModified) ?? "unknown (omitted)"}; ${enabled}`);
