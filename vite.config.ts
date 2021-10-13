import { defineConfig } from "vite";
import path from "path"
const resolve = (dir:string)=> path.resolve(__dirname,dir)
export default defineConfig({
  resolve: {
    alias: {
      "browser": resolve('packages/browser'),
      "core": resolve('packages/core'),
      "shared": resolve('packages/shared'),
      "utils": resolve('packages/utils'),
    }
  }
})