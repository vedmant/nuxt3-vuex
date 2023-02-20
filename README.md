# nuxt3-vuex-module

> Vuex stores feature for Nuxt3 

[![npm version](https://badge.fury.io/js/nuxt3-vuex-module.svg)](https://badge.fury.io/js/nuxt3-vuex-module)

This should read all your `store` folder the same way as Nuxt 2 does.

It reads `store` folder, supports nested modules and SSR.  
It however doesn't support separated files `actions.js`, `mutations.js`, etc.

## Install

```bash
yarn add nuxt3-vuex-module
```

Add to your Nuxt 3 config file as following:

```js
export default defineNuxtConfig({
  modules: [
    'nuxt3-vuex-module',
  ],
})
```
