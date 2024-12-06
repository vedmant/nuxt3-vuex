export default {
  state: () => ({
    one: false,
    two: false,
  }),
  actions: {
    async pageOne ({ commit }) {
      commit('pageONE')
    },
  },
  mutations: {
    pageONE (state) {
      state.one = true
    },
  },
}
