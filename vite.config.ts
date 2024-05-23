/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: './',
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/setupTest.ts'],
  },
  resolve: {
    alias: {
      'node-fetch': 'isomorphic-fetch',
    },
  },
  build: {
    chunkSizeWarningLimit: 700,
  },
});
