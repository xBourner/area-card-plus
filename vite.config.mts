import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: () => "area-card-plus.js",
    },
    outDir: "dist",
    rolldownOptions: {
      output: {
        codeSplitting: false,
      },
    },
  },
});
