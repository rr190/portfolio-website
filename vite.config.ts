import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// Two entry pages: the home page and the shared case-study template
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        project: resolve(import.meta.dirname, 'project.html'),
      },
    },
  },
})
