import { defineConfig } from 'vite';

// GitHub Pages の独自ドメイン（https://norimono-radar.doitmyself.net/）のルートで配信する
export default defineConfig({
  base: '/',
  // MapLibre 本体が約1MBあるため
  build: { chunkSizeWarningLimit: 1500 },
});
