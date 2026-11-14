import { defineConfig } from 'vite';

// GitHub Pages（https://<user>.github.io/ShinkansenLocation/）で配信するため base を指定
export default defineConfig({
  base: '/ShinkansenLocation/',
  // MapLibre 本体が約1MBあるため
  build: { chunkSizeWarningLimit: 1500 },
});
