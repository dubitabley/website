import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { Features } from "lightningcss";
import deno from "@deno/vite-plugin";

export default defineConfig({
  plugins: [sveltekit(), deno()],
  css: {
    lightningcss: {
      // https://github.com/vitejs/vite/issues/21911 this sucks - don't transform light-dark
      // https://lightningcss.dev/transpilation.html#feature-flags
      exclude: Features.LightDark,
    },
  },
});
