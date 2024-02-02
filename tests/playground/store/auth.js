export const state = () => ({
  one: false,
  two: false,
})

export const actions = {
  async authOne ({ commit }) {
    commit('authONE')
  },

  async authTwo ({ commit }) {
    commit('authTWO')
  },
}

export const mutations = {
  authONE (state) {
    state.one = true
  },

  authTWO (state) {
    state.two = true
  },
}
