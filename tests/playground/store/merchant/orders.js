export const state = () => ({
  one: false,
  two: false,
})

export const actions = {
  async merchantOrdersOne ({ commit }) {
    commit('merchantOrdersONE')
  },

  async merchantOrdersTwo ({ commit }) {
    commit('TWO')
  },
}

export const mutations = {
  merchantOrdersONE (state) {
    state.one = true
  },

  merchantOrdersTWO (state) {
    state.two = true
  },
}
