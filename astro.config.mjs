import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import threePlugin from 'vite-plugin-three';
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://FranCavelli.github.io',
  base: '/portfolio2/',
  vite: {
    plugins: [threePlugin()],
  },
  integrations: [tailwind(), react()]
});