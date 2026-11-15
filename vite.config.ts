import { defineConfig } from 'vite';

// GitHub Pages の独自ドメイン（https://norimono-radar.doitmyself.net/）のルートで配信する
export default defineConfig({
  base: '/',
  build: {
    // MapLibre 本体が約1MBあるため
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // MapLibre は別のファイルにする。アプリを更新しても、利用者のブラウザに残った MapLibre をそのまま使える
        manualChunks: (id: string) => (id.includes('node_modules/maplibre-gl/') ? 'maplibre' : undefined),
      },
    },
  },
});
