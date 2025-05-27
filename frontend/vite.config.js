// vite.config.js
import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      "/api": {
        target: "https://newsev.vercel.app",
        changeOrigin: true,
      },
    },
    // proxy: {
    //   "/api/getTodos": {
    //     target: "https://newsev.vercel.app",
    //     changeOrigin: true,
    //   },
    // },
  },
});
