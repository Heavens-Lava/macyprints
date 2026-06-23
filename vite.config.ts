import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite dev server proxies /api -> the Express API (server/index.js) so the
// client can call the Stripe checkout endpoint with same-origin requests.
export default defineConfig({
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
});
