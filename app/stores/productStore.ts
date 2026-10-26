import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '../types/product'
import { getProducts } from '../services/productService'

export const useProductStore = defineStore('products',() => {
    const products = ref<Product[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    async function fetchProducts() {
        if (products.value.length > 0) {
            return
        }
        
        loading.value = true
        error.value = null

        try {
            products.value = await getProducts()
        } catch {
            error.value = 'Failed to load products'
        } finally {
            loading.value = false
        }
    }

    function searchProducts(searchTerm: string): Product[] {
        const term = searchTerm.trim().toLowerCase()

        if (!term) {
            return products.value
        }

        return products.value.filter((product) =>
            product.title.toLowerCase().includes(term)
        )
    }

    return {
        products,
        loading,
        error,
        fetchProducts,
        searchProducts
    }
})
