import { existsSync } from 'fs'
import { resolve } from 'path'
import { defineNuxtModule, addPlugin, addImports, addTemplate, createResolver } from '@nuxt/kit'
import glob from 'glob'

function addModule (storeModule, namespaces, alias) {
  if (!namespaces.length) {
    return storeModule
  }

  const namespace = namespaces.shift()

  storeModule.modules[namespace] = storeModule.modules[namespace] || {}
  storeModule.modules[namespace].alias = storeModule.modules[namespace].alias || alias
  storeModule.modules[namespace].modules = storeModule.modules[namespace].modules || {}

  return addModule(storeModule.modules[namespace], namespaces, alias)
}

function makeModulesString (modules) {
  if (! modules) {return}
  const entries = Object.entries(modules)

  return '{' + entries.map(([key, val]) => {
    return `
      ${key}: {
        ...${val.alias},
        namespaced: true,
        modules: ${makeModulesString(val.modules)}
      }
    `
  }) + '},'
}

export const register = {
  vuexStores ({ fullStoreDir, exclude = [] }) {
    const imports = [], aliases = [], store = { modules: {} }
    let rootStore
    const pattern = `${fullStoreDir}/**/!(*.test)*+(.mjs|.ts|.js)`
    const storeDefinitionFiles = (glob.sync(pattern))
      .filter(file => ! exclude.includes(file))

    storeDefinitionFiles.forEach((f) => {
      const path = f
        .replace(fullStoreDir, '')
        .replace(/^\//g, '')

      const nsp = path.replace(/(\/|\.js|\.mjs|\.ts)/g, '')

      const alias = nsp + 'VuexStore'
      imports.push({ from: f, name: '*', as: alias })
      aliases.push(alias)

      if (! rootStore && alias === 'indexVuexStore') {
        // Root
        rootStore = alias
      } else {
        // Modules
        const namespace = path.replace(/\.(js|mjs|ts)$/, '')
        const namespaces = namespace.split('/')
        addModule(store, namespaces, alias)
      }
    })

    addImports(imports)

    let vuexStoreStr = '{\n'
    if (rootStore) {
      vuexStoreStr += `  ...${rootStore},\n`
    }

    const modulesStr = makeModulesString(store.modules)
    vuexStoreStr += `  modules: ${modulesStr} \n  }`

    const contents = [
      `import {\n  ${aliases.join(',\n  ')} \n} from "#imports"`,
      `const VuexStore = ${vuexStoreStr}`,
      `export default VuexStore`,
    ].join('\n')

    addTemplate({ filename: 'vuexStore.js', getContents: () => contents })
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
      const { resolve } = createResolver(import.meta.url)
      register.vuexStores({ fullStoreDir, exclude })
      addPlugin({
        src: resolve('./plugin.js'),
      })
    }
  },
})
