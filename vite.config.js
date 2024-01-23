import path from 'path'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import siteData from './data/site-data.json'

export default defineConfig({
  build: {
    rollupOption: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      }
    }
  },
  plugins: [
    handlebars({
      partialDirectory: path.resolve(__dirname, 'includes'),
      context(page) {
        return siteData
      }
    }),
  ],
})