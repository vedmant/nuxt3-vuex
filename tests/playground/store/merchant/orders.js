export const state = () => ({
  one: false,
  two: false,
})

export const actions = {
  async one ({ commit }) {
    commit('ONE')
  },

  async two ({ commit }) {
    commit('TWO')
  },
}

export const mutations = {
  ONE (state) {
    state.one = true
  },

  TWO (state) {
    state.two = true
  },
}
