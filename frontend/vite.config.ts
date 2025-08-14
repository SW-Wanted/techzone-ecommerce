import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Qualquer pedido que comece com /api será redirecionado
      '/api': {
        target: 'http://localhost:5001', // O endereço do nosso backend
        changeOrigin: true, // Necessário para evitar erros de CORS/origem
      },
      // Qualquer pedido que comece com /uploads também será redirecionado
      '/uploads': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
})