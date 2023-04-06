import { createStore } from 'vuex'
import { defineNuxtPlugin } from '#app'
import VuexStore from '#build/vuexStore.js'

export default defineNuxtPlugin((nuxtApp) => {
  const store = createStore(VuexStore)
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
