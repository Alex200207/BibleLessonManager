import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ajustes adicionales
  base: '/', // Asegúrate de que esto esté configurado correctamente
  server: {
    port: 5173, // Asegúrate de que este puerto esté libre
    open: true, // Abre el navegador automáticamente al iniciar el servidor
  },
  build: {
    outDir: 'dist', // Asegúrate de que este directorio coincida con tu configuración de Render
    sourcemap: true, // Opcional, pero útil para depuración
  },
});
