export const state = () => ({
  one: false,
  two: false,
})

export const actions = {
  async merchantCatalogBundlesOne ({ commit }) {
    commit('merchantCatalogBundlesONE')
  },

  async merchantCatalogBundlesTwo ({ commit }) {
    commit('merchantCatalogBundlesTWO')
  },
}

export const mutations = {
  merchantCatalogBundlesONE (state) {
    state.one = true
  },

  merchantCatalogBundlesTWO (state) {
    state.two = true
  },
}
