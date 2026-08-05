import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { compression } from "vite-plugin-compression2";

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: "brotliCompress",
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
    compression({
      algorithm: "gzip",
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
  ],
  server: {
    port: 5174,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:7000",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist",
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Heavy 3D engine in its own chunk (lazy loaded)
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-vendor';
            }
            // React icons in their own chunk
            if (id.includes('react-icons')) {
              return 'icons-vendor';
            }
            // React core + router + redux in main vendor
            return 'vendor';
          }
        },
      },
    },
    minify: "esbuild",
    cssMinify: true,
  },
});
