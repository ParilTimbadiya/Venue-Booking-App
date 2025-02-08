import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// https://vitejs.dev/config/
// export default defineConfig({
//   optimizeDeps: {
//     include: ['react-player'],
//   },
//   plugins: [react()],
//   server: {
//     port:3000
//   },
//   define: {
//     global: "globalThis",
//   },
// })import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   optimizeDeps: {
//     include: ['react-player'],
//   },
//   plugins: [react()],
//   server: {
//     port:3000
//   },
//   define: {
//     global: "globalThis",
//   },
// })import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/crickhero': {
        target: 'http://localhost:8076', // Backend URL
        changeOrigin: true,
      },
    },
  },
});

