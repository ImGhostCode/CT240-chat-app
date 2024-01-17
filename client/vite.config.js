import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
require('dotenv').config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 3052,
    proxy: {
      "/api/v1/": {
        target: process.env.VITE_API_URL,
        // changeOrigin: true,
      },
    },
  },
});
