import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * Dev-only: fill index.html's <!--app-head--> with the same tags the production prerender writes
 * (scripts/prerender.mjs), so the dev server shows the real title/meta/JSON-LD.
 */
const devSeoHead = (): Plugin => ({
  name: "dev-seo-head",
  apply: "serve",
  async transformIndexHtml(html, ctx) {
    if (!ctx.server) return html;
    const { buildHead } = await ctx.server.ssrLoadModule("/src/seo/head.ts");
    return html.replace("<!--app-head-->", buildHead("home")).replace("<!--app-html-->", "");
  },
});

export default defineConfig(({ isSsrBuild }) => ({
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true,
  },
  plugins: [react(), devSeoHead()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // The SSR bundle (dist-ssr/) only feeds the prerender script; don't copy 13 MB of /public into it.
    copyPublicDir: !isSsrBuild,
  },
}));
