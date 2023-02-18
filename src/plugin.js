// @ts-nocheck
import { createStore } from 'vuex'
import { defineNuxtPlugin } from '#app'
import VuexStore from '#build/vuexStore.js'

const store = createStore(VuexStore)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store) // Vue.use the store so that Vue dev tools can inspect it..
  return {
    provide: {
      store,
    },
  }
})
