import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

const plugins = [react()];

export default defineConfig({
  plugins,
  server: {
    port: 5175,
    host: true
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./setupTests.ts",
    include: ["tests/**/*.test.{js,jsx,ts,tsx}"]
  }
});
