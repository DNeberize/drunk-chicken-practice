import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import svgrPlugin from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgrPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@utils': path.resolve(import.meta.dirname, './src/utils'),
      '@store': path.resolve(import.meta.dirname, './src/store'),
      '@game': path.resolve(import.meta.dirname, './src/components/game'),
      '@scenes': path.resolve(import.meta.dirname, './src/components/game/scenes'),
    },
  },
});
