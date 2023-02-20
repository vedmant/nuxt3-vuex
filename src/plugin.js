import { createStore } from 'vuex'
import { defineNuxtPlugin } from '#app'
import VuexStore from '#build/vuexStore.js'

const store = createStore(VuexStore)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store)

  if (process.server) {
    nuxtApp.payload.vuex = store.state
  } else if (nuxtApp.payload && nuxtApp.payload.vuex) {
    store.replaceState(nuxtApp.payload.vuex)
  }

  return {
    provide: {
      store,
    },
  }
})
