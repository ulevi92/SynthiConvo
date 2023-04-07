import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import sass from "sass";
import viteSassPlugin from "vite-plugin-sass";

export default defineConfig({
  plugins: [react(), viteSassPlugin({ implementation: sass })],
});
