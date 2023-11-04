import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root:"./src/pages",
  server:{
    host:"localhost"
  },
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets":path.resolve(__dirname, "./src/assets")
    },
  },
});
