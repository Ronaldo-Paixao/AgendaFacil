import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  root: './client',

  plugins: [react()],

  resolve: {
    alias: [
      {
        find: '@/_core',
        replacement: path.resolve(__dirname, './client/_core'),
      },
      {
        find: '@/lib',
        replacement: path.resolve(__dirname, './client/src/lib'),
      },
      {
        find: '@/components',
        replacement: path.resolve(__dirname, './client/src/components'),
      },
      {
        find: '@/pages',
        replacement: path.resolve(__dirname, './client/src/pages'),
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, './client/src'),
      },
      {
        find: '@shared',
        replacement: path.resolve(__dirname, './shared'),
      },
      {
        find: '@server',
        replacement: path.resolve(__dirname, './server'),
      },
    ],
  },

  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
})