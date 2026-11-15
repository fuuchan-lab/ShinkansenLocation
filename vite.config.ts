import { defineConfig } from 'vite';

// GitHub Pages（https://<user>.github.io/norimono-radar/）で配信するため base を指定
export default defineConfig({
  base: '/norimono-radar/',
  // MapLibre 本体が約1MBあるため
  build: { chunkSizeWarningLimit: 1500 },
});
