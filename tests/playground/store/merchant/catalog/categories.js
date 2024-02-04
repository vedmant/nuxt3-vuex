export const state = () => ({
  one: false,
  two: false,
})

export const actions = {
  async merchantCatalogCategoriesOne ({ commit }) {
    commit('merchantCatalogCategoriesONE')
  },

  async merchantCatalogCategoriesTwo ({ commit }) {
    commit('merchantCatalogCategoriesTWO')
  },
}

export const mutations = {
  merchantCatalogCategoriesONE (state) {
    state.one = true
  },

  merchantCatalogCategoriesTWO (state) {
    state.two = true
  },
}
