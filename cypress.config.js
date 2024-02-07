import { defineConfig } from 'cypress'
import { initPlugin } from '@frsource/cypress-plugin-visual-regression-diff/plugins'

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,

  env: {
    pluginVisualRegressionDiffConfig: { threshold: 0.1 }
  },

  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'https://all-smiles-dentistry.netlify.app/',
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
