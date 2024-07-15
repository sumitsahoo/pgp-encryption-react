import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(async ({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  console.log(env);

  return {
    base: env.VITE_APP_BASE_PATH, // Use the base path from environment variable
    plugins: [react()],
    define: {
      "process.env": env,
    },
    optimizeDeps: {
      exclude: ["@undecaf/barcode-detector-polyfill", "@undecaf/zbar-wasm"],
    },
    preview: {
      port: 8080,
      strictPort: true,
    },
    server: {
      port: 8080,
      strictPort: true,
      host: true,
      //origin: "http://0.0.0.0:8080",
    },
  };
});
