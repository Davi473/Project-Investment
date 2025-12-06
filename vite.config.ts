import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

const plugins = [react()];

const test = {
  environment: "jsdom",
  globals: true,
  setupFiles: "./setupTests.ts",
  include: ["tests/**/*.test.{js,jsx,ts,tsx}"]
}

const server = {
  port: 5175,
  host: true
}

const resolve = {
  alias: {
    "@": path.resolve(import.meta.dirname, "src"),
  },
}

export default defineConfig({
  plugins,
  server,
  resolve,
  test
});
