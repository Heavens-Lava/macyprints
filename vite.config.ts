import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// In production (GitHub Pages) the site is served from /macyprints/.
// In dev it stays at the root and proxies /api -> the Express API.
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/macyprints/" : "/",
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
}));
