import { createLogger } from 'vuex'

export const plugins = []

if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger({
    transformer (state) {
      if (process.server) {
        return ''
      } // To reduce console data
      return state
    },
    mutationTransformer ({ type, payload }) {
      if (process.server) {
        return type
      }
      return { type, payload }
    },
    actionTransformer ({ type, payload }) {
      if (process.server) {
        return type
      }
      return { type, payload }
    },
  }))
}
