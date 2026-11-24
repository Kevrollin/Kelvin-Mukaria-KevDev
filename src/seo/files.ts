/**
 * sitemap.xml and robots.txt, generated at build time from the same config as the pages so the
 * domain and URLs can never disagree with the canonical tags.
 */
import { absoluteUrl, site } from "../config/site";
import { projects } from "../data/projects";

export interface SitemapEntry {
  path: string;
  /** W3C date (YYYY-MM-DD or full ISO). Only included when actually known. */
  lastmod?: string;
  images?: string[];
}

const xmlEscape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

/**
 * Every indexable URL. The site is a single page with #section anchors (fragments are not separate
 * URLs to search engines), plus the résumé PDF, which is linked from the nav and is useful for
 * "Kelvin Mukaria resume/CV" searches. changefreq/priority are deliberately omitted: Google ignores them.
 */
export function sitemapEntries(lastmod: { home?: string; resume?: string } = {}): SitemapEntry[] {
  return [
    {
      path: "/",
      lastmod: lastmod.home,
      images: [site.avatar.path, ...projects.map((p) => p.image)],
    },
    { path: site.resume, lastmod: lastmod.resume },
  ];
}

export function buildSitemap(entries: SitemapEntry[]): string {
  const urls = entries.map((e) => {
    const lines = [`    <loc>${xmlEscape(absoluteUrl(e.path))}</loc>`];
    if (e.lastmod) lines.push(`    <lastmod>${xmlEscape(e.lastmod)}</lastmod>`);
    for (const img of e.images ?? []) {
      lines.push(`    <image:image><image:loc>${xmlEscape(absoluteUrl(img))}</image:loc></image:image>`);
    }
    return `  <url>\n${lines.join("\n")}\n  </url>`;
  });
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
    ...urls,
    `</urlset>`,
    ``,
  ].join("\n");
}

/**
 * Everything on the site is public, so nothing is disallowed. The 404 page is kept out of the index
 * with `noindex` (a robots.txt block would stop crawlers from ever seeing that directive).
 */
export function buildRobots(): string {
  return [`User-agent: *`, `Allow: /`, ``, `Sitemap: ${absoluteUrl("/sitemap.xml")}`, ``].join("\n");
}
