export const state = () => ({
  one: false,
  two: false,
})

export const actions = {
  async merchantCatalogIndexOne ({ commit }) {
    commit('merchantCatalogIndexONE')
  },

  async merchantCatalogIndexTwo ({ commit }) {
    commit('merchantCatalogIndexTWO')
  },
}

export const mutations = {
  merchantCatalogIndexONE (state) {
    state.one = true
  },

  merchantCatalogIndexTWO (state) {
    state.two = true
  },
}
