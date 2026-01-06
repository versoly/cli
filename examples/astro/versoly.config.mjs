// @ts-check
import { defineConfig } from "@versoly/cli";

export default defineConfig({
  token: process.env.VERSOLY_ACCESS_TOKEN || "",
  siteId: "a813080b-2e29-4a1e-838f-dc510e49290a",

  // rootDir: "./examples/astro",
  // srcDir: "./src",
  // publicDir: "./public",
  // pagesDir: "./pages",
  // componentsDir: "./components",
  // pluginsDir: "./scripts/plugins",
  // "exclude": ["public/robots.txt"],
});
