/**
 * Builds the <head> tags for each prerendered page. Called at build time by scripts/prerender.mjs
 * (via src/entry-server.tsx) and by the dev-server plugin in vite.config.ts, so crawlers get every
 * tag in the initial HTML response — nothing here depends on client-side JavaScript.
 *
 * Static, page-independent tags (charset, viewport, font preload, favicons) live in index.html.
 */
import { absoluteUrl, site } from "../config/site";
import { homeStructuredData } from "./structured-data";

export type PageId = "home" | "404";

export interface HeadOptions {
  /** ISO 8601 date the homepage content last changed (from git). Omitted when unknown. */
  dateModified?: string;
  /** Google Search Console HTML-tag verification token (GOOGLE_SITE_VERIFICATION). */
  googleSiteVerification?: string;
  /** Bing Webmaster Tools verification token (BING_SITE_VERIFICATION). */
  bingSiteVerification?: string;
  /** GA4 measurement ID, e.g. G-XXXXXXXXXX (GA_MEASUREMENT_ID). */
  gaMeasurementId?: string;
}

interface PageMeta {
  title: string;
  description: string;
  robots: string;
  /** Canonical path; omitted for pages that must not be indexed. */
  canonicalPath?: string;
}

export const pages: Record<PageId, PageMeta> = {
  home: {
    title: site.title,
    description: site.description,
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    canonicalPath: "/",
  },
  "404": {
    title: `Page not found | ${site.name}`,
    description: `This page doesn't exist. Visit ${site.name}'s portfolio for projects, skills and contact details.`,
    robots: "noindex, follow",
  },
};

const escapeAttr = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** JSON for a <script> element: escape "<" so no value can close the tag early. */
const jsonForScript = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

const meta = (attr: "name" | "property", key: string, content: string) =>
  `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`;

/** Only well-formed IDs/tokens are ever written into the page. */
export const isValidGaId = (v?: string): v is string => !!v && /^G-[A-Z0-9]{4,20}$/.test(v);
export const isValidToken = (v?: string): v is string => !!v && /^[A-Za-z0-9_-]{8,100}$/.test(v);

export function buildHead(page: PageId, opts: HeadOptions = {}): string {
  const p = pages[page];
  const canonical = p.canonicalPath ? absoluteUrl(p.canonicalPath) : undefined;
  const ogImage = absoluteUrl(site.ogImage.path);
  const tags: string[] = [];

  tags.push(`<title>${escapeAttr(p.title)}</title>`);
  tags.push(meta("name", "description", p.description));
  tags.push(meta("name", "robots", p.robots));
  tags.push(meta("name", "author", site.name));
  if (canonical) tags.push(`<link rel="canonical" href="${canonical}" />`);

  if (page === "home") {
    // Open Graph (Facebook, LinkedIn, WhatsApp, Slack…) — `profile` is the OG type for a person's page.
    tags.push(
      meta("property", "og:type", "profile"),
      meta("property", "og:site_name", site.name),
      meta("property", "og:title", p.title),
      meta("property", "og:description", site.summary),
      meta("property", "og:url", canonical!),
      meta("property", "og:locale", site.ogLocale),
      meta("property", "og:image", ogImage),
      meta("property", "og:image:secure_url", ogImage),
      meta("property", "og:image:type", "image/png"),
      meta("property", "og:image:width", String(site.ogImage.width)),
      meta("property", "og:image:height", String(site.ogImage.height)),
      meta("property", "og:image:alt", site.ogImage.alt),
      meta("property", "profile:first_name", "Kelvin"),
      meta("property", "profile:last_name", "Mukaria"),
      // X / Twitter
      meta("name", "twitter:card", "summary_large_image"),
      meta("name", "twitter:site", site.twitterHandle),
      meta("name", "twitter:creator", site.twitterHandle),
      meta("name", "twitter:title", p.title),
      meta("name", "twitter:description", site.summary),
      meta("name", "twitter:image", ogImage),
      meta("name", "twitter:image:alt", site.ogImage.alt),
    );
  }

  if (isValidToken(opts.googleSiteVerification)) {
    tags.push(meta("name", "google-site-verification", opts.googleSiteVerification));
  }
  if (isValidToken(opts.bingSiteVerification)) {
    tags.push(meta("name", "msvalidate.01", opts.bingSiteVerification));
  }

  if (page === "home") {
    tags.push(
      `<script type="application/ld+json">${jsonForScript(homeStructuredData({ dateModified: opts.dateModified }))}</script>`,
    );
  }

  if (isValidGaId(opts.gaMeasurementId)) tags.push(gaSnippet(opts.gaMeasurementId));

  return tags.join("\n    ");
}

/**
 * GA4, loaded only when GA_MEASUREMENT_ID is set. gtag.js (~150 KB) is fetched after the `load`
 * event so it never competes with the page's own resources; calls made before then are queued
 * in dataLayer and sent once it arrives.
 */
function gaSnippet(id: string): string {
  return `<script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag("js", new Date());
      gtag("config", "${id}");
      addEventListener("load", function () {
        var s = document.createElement("script");
        s.async = true;
        s.src = "https://www.googletagmanager.com/gtag/js?id=${id}";
        document.head.appendChild(s);
      });
    </script>`;
}
