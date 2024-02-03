import { fileURLToPath } from 'node:url'
import { defineVitestConfig } from 'nuxt-vitest/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        rootDir: fileURLToPath(new URL('./tests/playground', import.meta.url)),
        overrides: {
          // other Nuxt config you want to pass
        },
      },
    },
  },
})
