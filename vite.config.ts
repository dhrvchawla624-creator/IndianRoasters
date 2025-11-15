import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  
  // Define global variables for browser compatibility
  define: {
    global: 'globalThis',
    'process.env': {}
  },
  
  // Resolve aliases for Node.js polyfills
  resolve: {
    alias: {
      buffer: 'buffer'
    }
  },
  
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
          
          // Markdown and blog utilities
          if (id.includes('node_modules/marked')) {
            return 'vendor-markdown';
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
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (_proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        }
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
      'react-router-dom',
      'marked'
    ],
        exclude: [
      'firebase',
      'firebase/app',
      'firebase/auth',
      'firebase/firestore'
    ],
    esbuildOptions: {
      // Define global for esbuild
      define: {
        global: 'globalThis'
      }
    }
  }
});
