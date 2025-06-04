import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/layout": path.resolve(__dirname, "./src/components/layout"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@services": path.resolve(__dirname, "./src/services"),
      // roles import aliases 
      "@roles": path.resolve(__dirname, "./src/pages/roles"),
      "@branchManager": path.resolve(__dirname, "./src/pages/roles/branch-manager"),
      "@accountExecutive": path.resolve(__dirname, "./src/pages/roles/account-executive"),
      "@urderwritingManager" : path.resolve(__dirname, "./src/pages/roles/urderwriting"),
      "@lender" : path.resolve(__dirname, "./src/pages/roles/lender"),
      "@borrower" : path.resolve(__dirname, "./src/pages/roles/borrower"),
      "@broker" : path.resolve(__dirname, "./src/pages/roles/broker"),
      // roles import aliases ends here
    },
  },
})
