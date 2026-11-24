/**
 * Verifies the production build's SEO output (run after `npm run build`):
 *
 *   npm run seo:verify            checks dist/ (metadata, JSON-LD, links, sitemap, robots, 404, OG image)
 *   npm run seo:verify -- --live  also checks the deployed site's status codes and redirects
 *
 * No dependencies; exits non-zero if any check fails.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "https://kelvin.ardena.co.ke";
const OLD_HOST = "kelvinmukaria.vercel.app";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
let failures = 0;
const ok = (cond, msg, detail = "") => {
  if (cond) console.log(`  ✓ ${msg}`);
  else {
    failures++;
    console.log(`  ✗ ${msg}${detail ? ` — ${detail}` : ""}`);
  }
  return cond;
};
const read = (f) => readFileSync(path.join(dist, f), "utf8");
const all = (re, s) => [...s.matchAll(re)];
const metaContent = (html, attr, key) =>
  html.match(new RegExp(`<meta ${attr}="${key.replace(/[.:]/g, "\\$&")}" content="([^"]*)"`))?.[1];
const decode = (s) => s?.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
/** Path in dist/ for a site-relative URL, or null if it isn't a local file URL. */
const distFile = (url) => {
  const u = new URL(url, SITE + "/");
  if (u.origin !== SITE) return null;
  const p = decodeURIComponent(u.pathname);
  return path.join(dist, p === "/" ? "index.html" : p);
};

if (!existsSync(path.join(dist, "index.html"))) {
  console.error("dist/ not found — run `npm run build` first.");
  process.exit(1);
}

// --- Homepage -----------------------------------------------------------------------------------
console.log("\nHomepage (dist/index.html)");
const home = read("index.html");
const body = home.slice(home.indexOf('<div id="root">'));

const title = decode(home.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
ok(all(/<title>/g, home).length === 1, "exactly one <title>");
ok(title.includes("Kelvin Mukaria") && title.length <= 65, `title has name and ≤ 65 chars (${title.length}): "${title}"`);
const desc = decode(metaContent(home, "name", "description") ?? "");
ok(desc.length >= 70 && desc.length <= 160, `meta description 70–160 chars (${desc.length})`);
ok(/^<!DOCTYPE html>/i.test(home) && /<html lang="en"/.test(home), "doctype + <html lang>");
ok(/<meta charset="UTF-8"/i.test(home) && /<meta name="viewport"/.test(home), "charset + viewport");
ok(home.includes(`<link rel="canonical" href="${SITE}/" />`), "canonical → https://kelvin.ardena.co.ke/");
const robots = metaContent(home, "name", "robots") ?? "";
ok(robots.startsWith("index, follow") && !robots.includes("noindex"), `robots meta allows indexing ("${robots}")`);

for (const k of ["og:type", "og:title", "og:description", "og:url", "og:image", "og:image:alt", "og:image:width", "og:image:height", "og:site_name", "og:locale"]) {
  ok(!!metaContent(home, "property", k), `${k} present`);
}
for (const k of ["twitter:card", "twitter:title", "twitter:description", "twitter:image", "twitter:image:alt"]) {
  ok(!!metaContent(home, "name", k), `${k} present`);
}
const ogImage = metaContent(home, "property", "og:image");
ok(ogImage?.startsWith(SITE + "/"), "og:image is absolute on the canonical host");
ok(metaContent(home, "property", "og:url") === `${SITE}/`, "og:url matches canonical");

// Prerendered content (what crawlers see without running JS)
const h1s = all(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g, body);
ok(h1s.length === 1 && /Kelvin[\s\S]*Mukaria/.test(h1s[0]?.[1] ?? ""), "one prerendered <h1> with the name");
for (const id of ["home", "about", "skills", "projects", "contact", "main"]) ok(body.includes(`id="${id}"`), `section #${id} is in the initial HTML`);
ok(all(/<h2\b/g, body).length >= 4, "section <h2> headings are prerendered");
ok(all(/<article\b/g, body).length >= 10, `project cards prerendered (${all(/<article\b/g, body).length})`);
ok(/<main\b/.test(body) && /<header\b/.test(body) && /<footer\b/.test(body) && /<nav\b/.test(body), "landmarks: header, nav, main, footer");

const ids = all(/\sid="([^"]+)"/g, body).map((m) => m[1]);
const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
ok(dupIds.length === 0, "no duplicate element ids", dupIds.join(", "));

const hrefs = all(/<a\b[^>]*\shref="([^"]*)"/g, body).map((m) => decode(m[1]));
const badAnchors = hrefs.filter((h) => h.startsWith("#") && (h === "#" || !ids.includes(h.slice(1))));
ok(badAnchors.length === 0, "every #anchor link targets an existing id", [...new Set(badAnchors)].join(", "));
const localRefs = [
  ...hrefs.filter((h) => h.startsWith("/")),
  ...all(/<(?:img|link|script)\b[^>]*\s(?:src|href)="(\/[^"]*)"/g, home).map((m) => m[1]),
  ...all(/\ssrcSet="([^"]*)"|\ssrcset="([^"]*)"/g, body).flatMap((m) => (m[1] ?? m[2]).split(",").map((c) => c.trim().split(/\s+/)[0])),
];
const missing = [...new Set(localRefs)].filter((u) => {
  const f = distFile(u);
  return f && !existsSync(f);
});
ok(missing.length === 0, `all ${new Set(localRefs).size} local links/assets exist in dist/`, missing.join(", "));

const imgs = all(/<img\b[^>]*>/g, body).map((m) => m[0]);
ok(imgs.every((t) => /\salt="/.test(t)), `all ${imgs.length} <img> have alt attributes`);
ok(imgs.every((t) => /\swidth="\d+"/.test(t) && /\sheight="\d+"/.test(t)), "all <img> have width/height (no layout shift)");
const externalBlank = all(/<a\b[^>]*target="_blank"[^>]*>/g, body).map((m) => m[0]);
ok(externalBlank.every((t) => /rel="[^"]*noopener/.test(t)), "target=_blank links use rel=noopener");

// --- Structured data ----------------------------------------------------------------------------
console.log("\nStructured data (JSON-LD)");
const ldBlocks = all(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, home);
ok(ldBlocks.length === 1, "single JSON-LD block");
let graph = [];
try {
  const data = JSON.parse(ldBlocks[0][1]);
  graph = data["@graph"] ?? [];
  ok(data["@context"] === "https://schema.org", "@context is https://schema.org");
} catch (e) {
  ok(false, "JSON-LD parses", e.message);
}
const types = graph.map((n) => n["@type"]);
for (const t of ["WebSite", "ProfilePage", "Person", "Organization", "ItemList"]) ok(types.includes(t), `${t} entity present`);
ok(types.filter((t) => t === "Person").length === 1, "exactly one Person entity");
const definedIds = new Set(graph.map((n) => n["@id"]));
const refs = [];
JSON.stringify(graph, (k, v) => {
  if (v && typeof v === "object" && !Array.isArray(v) && Object.keys(v).length === 1 && v["@id"]) refs.push(v["@id"]);
  return v;
});
const dangling = refs.filter((r) => !definedIds.has(r));
ok(dangling.length === 0, `all ${refs.length} @id references resolve`, dangling.join(", "));
const person = graph.find((n) => n["@type"] === "Person") ?? {};
ok(person.name === "Kelvin Mukaria" && person.url === `${SITE}/`, "Person name + canonical url");
ok(Array.isArray(person.sameAs) && person.sameAs.every((u) => /^https:\/\//.test(u) && !u.includes("ardena.co.ke")), "Person sameAs lists only his own profiles");
const forbidden = ["aggregateRating", "review", "offers", "ratingValue"];
const ld = ldBlocks[0]?.[1] ?? "";
ok(forbidden.every((f) => !ld.includes(`"${f}"`)), "no ratings/reviews/offers in markup");
const projectNodes = graph.find((n) => n["@type"] === "ItemList")?.itemListElement ?? [];
ok(projectNodes.length === all(/<article\b/g, body).length, `ItemList matches visible project cards (${projectNodes.length})`);

// --- 404 ---------------------------------------------------------------------------------------
console.log("\n404 page (dist/404.html)");
ok(existsSync(path.join(dist, "404.html")), "404.html exists");
const nf = read("404.html");
ok(/<meta name="robots" content="noindex/.test(nf), "404 is noindex");
ok(!/rel="canonical"/.test(nf), "404 has no canonical");
ok(!/<script type="module"/.test(nf), "404 ships no app bundle");
ok(/<h1\b[^>]*>Page not found<\/h1>/.test(nf), "404 has a prerendered <h1>");
ok(/href="\/"/.test(nf) && /href="\/#projects"/.test(nf), "404 links back to home and sections");
ok(!/application\/ld\+json/.test(nf), "404 has no structured data");

// --- Crawl files -------------------------------------------------------------------------------
console.log("\nrobots.txt + sitemap.xml");
const robotsTxt = read("robots.txt");
ok(/^User-agent: \*$/m.test(robotsTxt) && !/^Disallow: \/\s*$/m.test(robotsTxt), "robots.txt allows crawling");
ok(robotsTxt.includes(`Sitemap: ${SITE}/sitemap.xml`), "robots.txt references the canonical sitemap");
const sitemap = read("sitemap.xml");
ok(sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>') && /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/.test(sitemap), "sitemap XML header + namespace");
ok(all(/<url>/g, sitemap).length === all(/<\/url>/g, sitemap).length, "sitemap <url> elements balanced");
const locs = all(/<loc>([^<]+)<\/loc>/g, sitemap).map((m) => m[1]);
ok(locs.length > 0 && locs.every((l) => l.startsWith(SITE + "/")), `all ${locs.length} sitemap URLs are on the canonical host`);
ok(new Set(locs).size === locs.length, "no duplicate sitemap URLs");
ok(locs.every((l) => existsSync(distFile(l))), "every sitemap URL maps to a built file");
const imageLocs = all(/<image:loc>([^<]+)<\/image:loc>/g, sitemap).map((m) => m[1]);
ok(imageLocs.every((l) => l.startsWith(SITE + "/") && existsSync(distFile(l))), `all ${imageLocs.length} sitemap images exist`);
ok(!/<changefreq>|<priority>/.test(sitemap), "no changefreq/priority");
ok(all(/<lastmod>([^<]+)<\/lastmod>/g, sitemap).every((m) => /^\d{4}-\d{2}-\d{2}/.test(m[1])), "lastmod values are W3C dates");

// --- Social image + leftovers -------------------------------------------------------------------
console.log("\nAssets");
const og = readFileSync(distFile(ogImage ?? "/og-image.png"));
const [w, h] = [og.readUInt32BE(16), og.readUInt32BE(20)];
ok(og.slice(1, 4).toString() === "PNG" && w === 1200 && h === 630, `og-image.png is 1200×630 PNG (${w}×${h}, ${Math.round(og.length / 1024)} KB)`);
const stale = ["index.html", "404.html", "robots.txt", "sitemap.xml", "site.webmanifest"].filter((f) => read(f).includes(OLD_HOST));
ok(stale.length === 0, `no references to ${OLD_HOST}`, stale.join(", "));
ok(!/google-site-verification" content="google[0-9a-f]{16}"/.test(home), "no file-name used as a meta verification token");

// --- Live deployment (optional) -----------------------------------------------------------------
if (process.argv.includes("--live")) {
  console.log(`\nLive (${SITE})`);
  const probe = async (url, init = {}) => {
    try {
      return await fetch(url, { redirect: "manual", ...init });
    } catch (e) {
      return { status: 0, headers: new Headers(), text: async () => String(e) };
    }
  };
  const r = await probe(`${SITE}/`);
  ok(r.status === 200, `GET / → ${r.status}`);
  const liveHtml = r.status === 200 ? await r.text() : "";
  ok(liveHtml.includes(`<link rel="canonical" href="${SITE}/"`), "live canonical points at the canonical host");
  ok(/<h1\b/.test(liveHtml), "live HTML contains the prerendered <h1>");
  for (const p of ["/robots.txt", "/sitemap.xml", "/og-image.png", "/Kelvin_Mukaria_Resume.pdf"]) {
    const res = await probe(SITE + p, { method: "HEAD" });
    ok(res.status === 200, `GET ${p} → ${res.status}`);
  }
  const nfRes = await probe(`${SITE}/this-page-does-not-exist-${Date.now()}`);
  ok(nfRes.status === 404, `unknown path → ${nfRes.status} (expected 404)`);
  const idx = await probe(`${SITE}/index.html`);
  ok([301, 308].includes(idx.status) && idx.headers.get("location")?.replace(SITE, "") === "/", `/index.html → ${idx.status} ${idx.headers.get("location") ?? ""}`);
  const http = await probe(`http://kelvin.ardena.co.ke/`);
  ok([301, 308].includes(http.status) && http.headers.get("location") === `${SITE}/`, `http:// → ${http.status} ${http.headers.get("location") ?? ""}`);
  const old = await probe(`https://${OLD_HOST}/`);
  ok([301, 308].includes(old.status) && old.headers.get("location")?.startsWith(SITE), `${OLD_HOST} → ${old.status} ${old.headers.get("location") ?? ""}`);
}

console.log(failures ? `\n${failures} check(s) failed.\n` : "\nAll SEO checks passed.\n");
process.exit(failures ? 1 : 0);
