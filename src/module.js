import { existsSync } from 'fs'
import { resolve } from 'path'
import { defineNuxtModule, addPlugin, addImports, addTemplate } from '@nuxt/kit'
import glob from 'glob'

function makeStore (storeModule, namespaces, alias) {
  if (!namespaces.length) {
    return storeModule
  }

  const namespace = namespaces.shift()

  storeModule.modules[namespace] = storeModule.modules[namespace] || {}
  storeModule.modules[namespace].alias = storeModule.modules[namespace].alias || alias
  storeModule.modules[namespace].modules = storeModule.modules[namespace].modules || {}

  return makeStore(storeModule.modules[namespace], namespaces, alias)
}

function makeEntriesString (modules) {
  if (! modules) {return}
  const entries = Object.entries(modules)

  return '{' + entries.map(([key, val]) => {
    return `
      ${key}: {
        ...${val.alias},
        namespaced: true,
        modules: ${makeEntriesString(val.modules)}
      }
    `
  }) + '},'
}

export const register = {
  vuexStores ({ fullStoreDir, exclude = [] }) {
    const pattern = `${fullStoreDir}/**/*+(.mjs|.ts|.js)`
    const storeDefinitionFiles = (glob.sync(pattern))
      .filter(file => ! exclude.includes(file))

    const _imports = [], _aliases = []
    let rootStore
    const store = {
      modules: {}
    }

    storeDefinitionFiles.forEach((f) => {
      const path = f
        .replace(fullStoreDir, '')
        .replace(/^\//g, '')

      const nsp = path.replace(/(\/|\.js|\.mjs|\.ts)/g, '')

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
        const namespace = path.replace(/\.(js|mjs)$/, '')
        const namespaces = namespace.split('/')
        makeStore(store, namespaces, alias)
      }
    })

    addImports(_imports)

    let VuexStoreStr = '{\n'
    if (rootStore) {
      VuexStoreStr += `  ...${rootStore},\n`
    }

    const entries = makeEntriesString(store.modules)
    VuexStoreStr += `  modules: ${entries} \n  }`

    const contents = [
      `import {\n  ${_aliases.join(',\n  ')} \n} from "#imports"`,
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


