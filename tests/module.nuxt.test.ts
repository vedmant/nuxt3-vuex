import { describe, it, expect } from 'vitest'
import { useNuxtApp } from 'nuxt/app'

describe('vuex', () => {
  it('loads actions and mutations', () => {
    const store = useNuxtApp().$store

    expect(Object.keys(store._actions)).toEqual([
      'auth/authOne',
      'auth/authTwo',
      'pages/pageOne',
      'merchant/orders/merchantOrdersOne',
      'merchant/orders/merchantOrdersTwo',
      'merchant/catalog/merchantCatalogIndexOne',
      'merchant/catalog/merchantCatalogIndexTwo',
      'merchant/catalog/bundles/merchantCatalogBundlesOne',
      'merchant/catalog/bundles/merchantCatalogBundlesTwo',
      'merchant/catalog/categories/merchantCatalogCategoriesOne',
      'merchant/catalog/categories/merchantCatalogCategoriesTwo',
    ])

    expect(Object.keys(store._mutations)).toEqual([
      'auth/authONE',
      'auth/authTWO',
      'pages/pageONE',
      'merchant/orders/merchantOrdersONE',
      'merchant/orders/merchantOrdersTWO',
      'merchant/catalog/merchantCatalogIndexONE',
      'merchant/catalog/merchantCatalogIndexTWO',
      'merchant/catalog/bundles/merchantCatalogBundlesONE',
      'merchant/catalog/bundles/merchantCatalogBundlesTWO',
      'merchant/catalog/categories/merchantCatalogCategoriesONE',
      'merchant/catalog/categories/merchantCatalogCategoriesTWO',
    ])
  })
})
