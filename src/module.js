import { existsSync } from 'fs'
import { resolve } from 'path'
import { defineNuxtModule, addPlugin, addImports, addTemplate } from '@nuxt/kit'
import glob from 'glob'

export const register = {
  vuexStores ({ fullStoreDir, exclude = [] }) {
    const pattern = `${fullStoreDir}/**/*+(.mjs|.ts|.js)`
    const storeDefinitionFiles = (glob.sync(pattern))
      .filter(file => ! exclude.includes(file))
    const _imports = [], _aliases = [], vuexModules = []
    let rootStore
    storeDefinitionFiles.forEach((f) => {
      const nsp = f
        .replace(fullStoreDir, '')
        .replace(/(\/|\.js|\.mjs|\.ts)/g, '')
      const alias = nsp + 'VuexStore'
      _imports.push({
        from: f,
        name: '*',
        as: alias,
      })
      _aliases.push(alias)
      if (! rootStore && alias === 'indexVuexStore') {
        // Root
        rootStore = alias
      } else {
        // Module
        vuexModules.push({ nsp, alias })
      }
    })
    addImports(_imports)
    let VuexStoreStr = '{\n'
    if (rootStore) {
      VuexStoreStr += `  ...${rootStore},\n`
    }
    if (vuexModules.length > 0) {
      const entries = vuexModules.map(({ nsp, alias }) => {
        return `  ${nsp}: { ...${alias}, namespaced: true }`
      }).join(',\n  ')
      VuexStoreStr += `  modules: {\n  ${entries} \n  }`
    }

    VuexStoreStr += '\n}'

    const contents = [
      `import {\n  ${_aliases.join(',\n  ')} \n\} from "#imports"`,
      `const VuexStore = ${VuexStoreStr}`,
      `export default VuexStore`,
    ].join('\n')
    addTemplate({
      filename: 'vuexStore.js',
      getContents: () => contents,
    })
  },
}

export default defineNuxtModule({
  setup (moduleOptions = {}, nuxt) {
    const {
      storeDir = 'store',
      exclude = [],
    } = moduleOptions
    const fullStoreDir = resolve(nuxt.options.srcDir, storeDir)
    if (existsSync(fullStoreDir)) {
      register.vuexStores({ fullStoreDir, exclude })
      addPlugin({
        src: resolve(__dirname, 'plugin.js'),
      })
    }
  },
})
