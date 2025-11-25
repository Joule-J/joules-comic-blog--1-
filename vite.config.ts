import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages üzerinde repo adınız ne olursa olsun çalışması için
  // base yolunu './' (relative) yapıyoruz.
  base: './',
})