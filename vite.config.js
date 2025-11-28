import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimisation pour matériel moins puissant
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Enlever console.log en production
        drop_debugger: true
      }
    },
    // Code splitting pour charger seulement ce qui est nécessaire
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        }
      }
    },
    // Réduire la taille des chunks
    chunkSizeWarningLimit: 1000
  },
  // Optimisation du serveur de dev
  server: {
    hmr: {
      overlay: false // Désactiver l'overlay d'erreurs pour meilleures perfs
    }
  }
})
