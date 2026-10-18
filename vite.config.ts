import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
export default defineConfig(({ command, isPreview }) => ({
  plugins: [react()],
  base:
    process.env.VITE_BASE_PATH ||
    (command === "build" || isPreview ? "/India-Accountability/" : "/"),
  server: { host: "0.0.0.0", port: 4173, strictPort: true },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        evidence: resolve(__dirname, "economy-evidence.html"),
      },
    },
  },
}));
