import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // aiases
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@views": path.resolve(__dirname, "./src/views"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@ds": path.resolve(__dirname, "./src/@ds"),
      "@data": path.resolve(__dirname, "./data"),
      "@seed": path.resolve(__dirname, "./seed"),
    },
  },
  base: "/web-app-assets/pokemon/",

  build: {
    rollupOptions: {
      output: {
        entryFileNames: "index.js",
        chunkFileNames: "index.js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && /\.css$/.test(assetInfo.name)) {
            return "index.css";
          } else if (
            assetInfo.name &&
            /\.(png|jpe?g|svg|gif|tiff|bmp|webp)$/i.test(assetInfo.name)
          ) {
            return "assets/[name][extname]";
          }
          return "[name][extname]";
        },
      },
    },
  },
});
