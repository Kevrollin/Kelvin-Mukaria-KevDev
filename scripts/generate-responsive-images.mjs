/**
 * Creates the smaller image variants the page serves via srcset:
 *
 *   public/<name>.webp (960×540 project screenshot) → public/<name>-480.webp (480×270)
 *   public/kelvin-avatar.png (100×100)              → public/kelvin-avatar-64.webp (64×64, nav logo)
 *
 * Uses headless Chrome's canvas encoder over the DevTools protocol, so no image library or npm
 * dependency is needed. Only missing or outdated variants are regenerated. Run after adding a
 * project screenshot (`npm run images`); requires Chrome/Chromium/Edge (set CHROME_PATH if needed).
 */
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = path.join(root, "public");

const jobs = [
  ...readdirSync(pub)
    .filter((f) => f.endsWith(".webp") && !/-\d+\.webp$/.test(f))
    .map((f) => ({ src: f, out: f.replace(/\.webp$/, "-480.webp"), width: 480, height: 270 })),
  { src: "kelvin-avatar.png", out: "kelvin-avatar-64.webp", width: 64, height: 64 },
].filter((j) => {
  const out = path.join(pub, j.out);
  return !existsSync(out) || statSync(out).mtimeMs < statSync(path.join(pub, j.src)).mtimeMs || process.argv.includes("--force");
});

if (!jobs.length) {
  console.log("All responsive image variants are up to date.");
  process.exit(0);
}

const chrome = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((p) => p && existsSync(p));
if (!chrome) {
  console.error("Chrome/Chromium/Edge not found. Set CHROME_PATH to its executable.");
  process.exit(1);
}

const port = 9300 + Math.floor(Math.random() * 500);
const profile = mkdtempSync(path.join(os.tmpdir(), "img-variants-"));
const proc = spawn(chrome, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "--no-first-run", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  let wsUrl;
  for (let i = 0; i < 50 && !wsUrl; i++) {
    await sleep(200);
    try {
      const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      wsUrl = targets.find((t) => t.type === "page")?.webSocketDebuggerUrl;
    } catch {
      // Chrome not listening yet
    }
  }
  if (!wsUrl) throw new Error("Could not connect to headless Chrome.");

  const ws = new WebSocket(wsUrl);
  await new Promise((r) => ws.addEventListener("open", r));
  let id = 0;
  const pending = new Map();
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    pending.get(m.id)?.(m);
    pending.delete(m.id);
  });
  const evaluate = (expression) =>
    new Promise((resolve) => {
      const i = ++id;
      pending.set(i, (m) => resolve(m.result));
      ws.send(JSON.stringify({ id: i, method: "Runtime.evaluate", params: { expression, awaitPromise: true, returnByValue: true } }));
    });

  for (const job of jobs) {
    const mime = job.src.endsWith(".png") ? "image/png" : "image/webp";
    const dataUrl = `data:${mime};base64,${readFileSync(path.join(pub, job.src)).toString("base64")}`;
    const result = await evaluate(`(async () => {
      const img = new Image();
      img.src = ${JSON.stringify(dataUrl)};
      await img.decode();
      const canvas = new OffscreenCanvas(${job.width}, ${job.height});
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, ${job.width}, ${job.height});
      const blob = await canvas.convertToBlob({ type: "image/webp", quality: 0.82 });
      const bytes = new Uint8Array(await blob.arrayBuffer());
      let bin = "";
      for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
      return btoa(bin);
    })()`);
    if (result.exceptionDetails || typeof result.result?.value !== "string") {
      throw new Error(`Failed on ${job.src}: ${JSON.stringify(result.exceptionDetails ?? result)}`);
    }
    const buf = Buffer.from(result.result.value, "base64");
    writeFileSync(path.join(pub, job.out), buf);
    console.log(`${job.out.padEnd(34)} ${job.width}×${job.height}  ${Math.round(buf.length / 1024)} KB`);
  }
  ws.close();
} finally {
  const exited = new Promise((r) => proc.once("exit", r));
  proc.kill();
  await Promise.race([exited, sleep(3000)]);
  try {
    // Windows can hold Chrome's profile files briefly after exit.
    rmSync(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 });
  } catch {
    console.warn(`Couldn't remove temporary profile ${profile}; safe to delete manually.`);
  }
}
