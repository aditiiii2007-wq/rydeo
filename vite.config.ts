import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  return {
    base: '/rydeo/',
    plugins: [react()],
    build: {
      outDir: 'docs',
    },
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GOOGLE_MAPS_PLATFORM_KEY': JSON.stringify(env.GOOGLE_MAPS_PLATFORM_KEY || ""),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
      },
    },
    server: {
      hmr: {
        overlay: false,
      },
    },
  };
});