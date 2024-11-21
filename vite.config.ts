import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Define all routes that need static HTML files
const routes = [
  '/',
  '/wdrozenie-erp',
  '/koszt-wdrozenia-erp', 
  '/systemy-erp',
  '/porownaj-systemy-erp',
  '/admin/login',
  '/admin/systemy'
];

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  base: '',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...routes.reduce((acc, route) => ({
          ...acc,
          [route.replace(/\//g, '-').slice(1) || 'home']: resolve(
            __dirname,
            route === '/' ? 'index.html' : `${route}/index.html`
          ),
        }), {})
      },
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `[name][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    }
  }
});