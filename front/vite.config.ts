import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

const plugins = [react()];

export default defineConfig({
  plugins,
  server: {
    port: 5175,
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
});
