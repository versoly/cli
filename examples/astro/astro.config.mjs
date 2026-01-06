// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { SITE_CONFIG } from "./src/config/site.mjs";

export default defineConfig({
  site: "http://localhost:4321/",
  trailingSlash: "never",
  build: {
    format: "directory",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: SITE_CONFIG.redirects,
});
