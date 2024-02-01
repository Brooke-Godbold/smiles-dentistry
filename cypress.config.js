import { defineConfig } from 'cypress'
import { initPlugin } from '@frsource/cypress-plugin-visual-regression-diff/plugins'
import { mergeConfig } from 'vite'
import viteConfig from './vite.config.js'
import { CypressEsm } from '@cypress/vite-plugin-cypress-esm'

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,

  env: {
    pluginVisualRegressionDiffConfig: { threshold: 0.1 }
  },

  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      initPlugin(on, config)
    }
  },

  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite'
    },
    setupNodeEvents(on, config) {
      initPlugin(on, config)
    }
  }
})

/*
viteConfig: () => {
        return mergeConfig(viteConfig, {
          plugins: [CypressEsm()]
        })
      }
*/
