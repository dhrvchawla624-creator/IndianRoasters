import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  css: {
    transformer: 'lightningcss'
  },
  build: {
    // Target modern browsers for smaller bundle
    target: 'es2020',
    
    // Use terser for minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      },
      format: {
        comments: false
      }
    },
    
    // Code splitting configuration
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: (id) => {
          // React and React ecosystem
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') || 
              id.includes('node_modules/react-router')) {
            return 'vendor-react';
          }
          
          // Firebase
          if (id.includes('node_modules/firebase')) {
            return 'vendor-firebase';
          }
          
          // UI libraries
          if (id.includes('node_modules/rc-slider')) {
            return 'vendor-ui';
          }
          
          // Analytics
          if (id.includes('@vercel/analytics') || 
              id.includes('@vercel/speed-insights')) {
            return 'analytics';
          }
        },
        
        // Optimize chunk file names for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    
    // Chunk size warning limit (in KB)
    chunkSizeWarningLimit: 500,
    
    // CSS code splitting (separate CSS per route)
    cssCodeSplit: true,
    
    // Disable source maps in production for smaller bundle
    sourcemap: false,
    
    // Asset inlining threshold (in bytes)
    assetsInlineLimit: 4096, // 4kb - inline small assets as base64
    
    // Clear output dir before build
    emptyOutDir: true
  },
  
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    },
    // Speed up HMR (Hot Module Replacement)
    hmr: {
      overlay: true
    }
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom'
    ]
  }
});
