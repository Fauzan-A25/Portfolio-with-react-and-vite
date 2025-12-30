import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  // ✅ VERCEL: base = '/' (root domain)
  base: '/',
  
  server: {
    host: '127.0.0.1',
    port: 3000,
    open: true,
    strictPort: false,
  },
  
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'swiper-vendor': ['swiper'],
        },
      },
    },
  },
});
