import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Increase the warning limit so local dev builds don't spam warnings
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // Split large vendor libraries into separate chunks
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          const parts = id.split('node_modules/')[1].split('/');
          const pkg = parts[0].startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];

          // Prioritize known large packages
          if (pkg === 'react-icons') return 'icons-vendor';
          if (pkg === 'jspdf') return 'jspdf-vendor';
          if (pkg === 'react-dom') return 'react-dom-vendor';
          if (pkg === 'react') return 'react-vendor';

          // Create a vendor chunk per package to avoid a single huge vendor bundle
          return `vendor.${pkg}`;
        }
      }
    }
  }
})
