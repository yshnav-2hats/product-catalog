import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Product } from '../types/product'

export const useCartStore = defineStore('cart', () => {
  const items = ref<Product[]>([])

  // Load saved cart items in the browser
  if (import.meta.client) {
    const savedCart = localStorage.getItem('cart-items')

    if (savedCart) {
      items.value = JSON.parse(savedCart) as Product[]
    }

    watch(
      items,
      (newItems) => {
        localStorage.setItem('cart-items', JSON.stringify(newItems))
      },
      { deep: true }
    )
  }

  function addToCart(product: Product) {
    items.value.push(product)
  }

  function removeFromCart(productId: number) {
    items.value = items.value.filter(
      product => product.id !== productId
    )
  }

  const cartCount = computed(() => items.value.length)

  const cartTotal = computed(() =>
    items.value.reduce((total, product) => total + product.price, 0)
  )

  return {
    items,
    addToCart,
    removeFromCart,
    cartCount,
    cartTotal
  }
})