import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    port: 5178,
    host: "127.0.0.1",
  },
  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },
});
