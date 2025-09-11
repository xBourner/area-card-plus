import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      // Entspricht deinem Webpack-Entry
      entry: path.resolve(__dirname, "src/index.ts"),
      fileName: () => "area-card-plus.js", // Output-Dateiname
      formats: ["es"], // Home Assistant braucht ES-Module
    },
    outDir: "dist", // Entspricht Webpack output.path
    emptyOutDir: true,
    rollupOptions: {
      external: [],
    },
  },
  resolve: {
    extensions: [".ts", ".js"], // Wie in deiner Webpack config
  },
});
