import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from "kimi-plugin-inspect-react"

// https://vite.dev/config/
export default defineConfig({
  /**
   * IMPORTANT:
   * When deploying to GitHub Pages:
   * https://Dew20241990.github.io/khenchela-employment-platform/
   */
  base: "/khenchela-employment-platform/",

  plugins: [
    inspectAttr(),
    react()
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },

  build: {
    outDir: "dist",
    sourcemap: false,
    emptyOutDir: true
  }
})
