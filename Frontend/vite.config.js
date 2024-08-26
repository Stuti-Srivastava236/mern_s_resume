import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5176, // Frontend port
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Backend URL and port
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: adjust the API prefix
      },
    },
  },
});
