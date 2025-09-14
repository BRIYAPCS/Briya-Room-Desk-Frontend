import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 👈 expose to LAN
    port: 5173, // 👈 pick a port (default is 5173)
  },
});
