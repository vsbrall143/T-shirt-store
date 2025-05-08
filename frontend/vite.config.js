 


// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Proxy /api/* to your backend at localhost:5000
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
// import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'
// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//   ],
// })