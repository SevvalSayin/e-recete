import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',  
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://eu-central-1.aws.data.mongodb-api.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/app/data-nauitwn/endpoint/data/v1'),
      },
    },
  },
});
