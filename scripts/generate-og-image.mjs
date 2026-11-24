/**
 * Regenerates public/og-image.png — the 1200×630 social card used for og:image / twitter:image.
 *
 * Renders an HTML card with the site's own font (self-hosted Inter), avatar and brand colours in
 * headless Chrome, so no image library or extra npm dependency is needed. Requires a local Chrome,
 * Chromium or Edge; set CHROME_PATH if it isn't found automatically.
 *
 *   npm run og:image
 *
 * Keep the copy in sync with src/config/site.ts (name, tagline, role, location, domain).
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdtempSync, rmSync, statSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = path.join(root, "public");
const out = path.join(pub, "og-image.png");

const card = {
  first: "Kelvin",
  last: "Mukaria",
  tagline: ["Software Engineer", "AI & Automation Builder", "Entrepreneur"],
  role: "Co-founder & COO, Ardena Platform Africa",
  location: "Nakuru & Meru, Kenya",
  skills: ["React", "Node.js", "TypeScript", "Python", "AI Automation", "Cybersecurity"],
  domain: "kelvin.ardena.co.ke",
};

// Brand colours from src/index.css (light theme).
const c = { bg: "#fcfcfc", fg: "#0f1729", muted: "#5e6d82", accent: "#00a2ad", accentStrong: "#00727a", blue: "#1672f3" };

const chromeCandidates = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);
const chrome = chromeCandidates.find((p) => existsSync(p));
if (!chrome) {
  console.error("Chrome/Chromium/Edge not found. Set CHROME_PATH to its executable.");
  process.exit(1);
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const fontUrl = pathToFileURL(path.join(pub, "fonts", "inter-latin-wght-normal.woff2")).href;
const avatarUrl = pathToFileURL(path.join(pub, "kelvin-avatar.png")).href;

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<style>
  @font-face { font-family: Inter; src: url("${fontUrl}") format("woff2"); font-weight: 100 900; }
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body { font-family: Inter, sans-serif; background: ${c.bg}; color: ${c.fg}; position: relative; -webkit-font-smoothing: antialiased; }
  .blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: .16; }
  .b1 { width: 620px; height: 620px; right: -200px; top: -220px; background: ${c.accent}; }
  .b2 { width: 480px; height: 480px; left: -220px; bottom: -280px; background: ${c.blue}; opacity: .10; }
  .wrap { position: absolute; inset: 0; padding: 72px 84px 0; display: flex; flex-direction: column; }
  .top { display: flex; justify-content: space-between; align-items: center; }
  .avatar { width: 112px; height: 112px; border-radius: 50%; object-fit: cover; box-shadow: 0 0 0 4px ${c.bg}, 0 0 0 7px ${c.accent}; }
  .badge { display: inline-flex; align-items: center; gap: 12px; padding: 12px 22px; border-radius: 999px; background: #e8f9ee; color: #15803d; font-weight: 700; font-size: 21px; letter-spacing: .06em; }
  .dot { width: 12px; height: 12px; border-radius: 50%; background: #16a34a; }
  h1 { margin-top: 34px; font-size: 96px; font-weight: 800; letter-spacing: -0.035em; line-height: 1; }
  h1 span { color: ${c.accent}; }
  .tagline { margin-top: 26px; font-size: 32px; color: ${c.muted}; font-weight: 450; }
  .tagline i { font-style: normal; color: ${c.accent}; padding: 0 14px; }
  .role { margin-top: 12px; font-size: 30px; font-weight: 550; }
  .role em { font-style: normal; color: ${c.muted}; font-weight: 450; }
  .skills { margin-top: 30px; display: flex; gap: 12px; }
  .skill { padding: 9px 20px; border-radius: 999px; border: 1.5px solid #dfe4ea; background: #f3f5f7; font-size: 21px; font-weight: 500; }
  .foot { position: absolute; left: 84px; right: 84px; bottom: 44px; border-top: 2px solid #e5e9ee; padding-top: 22px; display: flex; justify-content: space-between; align-items: center; }
  .domain { font-size: 26px; font-weight: 700; color: ${c.accentStrong}; }
  .portfolio { font-size: 21px; color: ${c.muted}; font-weight: 500; letter-spacing: .12em; text-transform: uppercase; }
</style></head>
<body>
  <div class="blob b1"></div><div class="blob b2"></div>
  <div class="wrap">
    <div class="top">
      <img class="avatar" src="${avatarUrl}" alt="">
      <span class="badge"><span class="dot"></span>OPEN FOR COLLABORATION</span>
    </div>
    <h1>${esc(card.first)} <span>${esc(card.last)}</span></h1>
    <p class="tagline">${card.tagline.map(esc).join("<i>·</i>")}</p>
    <p class="role">${esc(card.role)} <em>— ${esc(card.location)}</em></p>
    <div class="skills">${card.skills.map((s) => `<span class="skill">${esc(s)}</span>`).join("")}</div>
  </div>
  <div class="foot"><span class="domain">${esc(card.domain)}</span><span class="portfolio">Portfolio</span></div>
</body></html>`;

const tmp = mkdtempSync(path.join(os.tmpdir(), "og-image-"));
const htmlPath = path.join(tmp, "card.html");
const pngPath = path.join(tmp, "card.png");
writeFileSync(htmlPath, html);

try {
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      "--window-size=1200,630",
      "--allow-file-access-from-files",
      "--virtual-time-budget=3000", // let the web font load before capturing
      `--user-data-dir=${path.join(tmp, "profile")}`,
      `--screenshot=${pngPath}`,
      pathToFileURL(htmlPath).href,
    ],
    { stdio: "ignore" },
  );
  if (!existsSync(pngPath)) throw new Error("Chrome did not produce a screenshot.");
  copyFileSync(pngPath, out);
  console.log(`Wrote ${path.relative(root, out)} (${Math.round(statSync(out).size / 1024)} KB)`);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
