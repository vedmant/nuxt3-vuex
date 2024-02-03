import { describe, it, expect } from 'vitest'
import { useNuxtApp } from 'nuxt/app'

describe('vuex', () => {
  it('loads actions and mutations', () => {
    const store = useNuxtApp().$store

    expect(Object.keys(store._actions)).toEqual([
      'auth/one',
      'auth/two',
      'merchant/one',
      'merchant/two',
      'merchant/orders/one',
      'merchant/orders/two',
      'merchant/catalog/one',
      'merchant/catalog/two',
      'merchant/catalog/bundles/one',
      'merchant/catalog/bundles/two',
      'merchant/catalog/categories/one',
      'merchant/catalog/categories/two',
    ])

    expect(Object.keys(store._mutations)).toEqual([
      'auth/ONE',
      'auth/TWO',
      'merchant/ONE',
      'merchant/TWO',
      'merchant/orders/ONE',
      'merchant/orders/TWO',
      'merchant/catalog/ONE',
      'merchant/catalog/TWO',
      'merchant/catalog/bundles/ONE',
      'merchant/catalog/bundles/TWO',
      'merchant/catalog/categories/ONE',
      'merchant/catalog/categories/TWO',
    ])
  })
})
