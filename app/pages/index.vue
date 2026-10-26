<script setup lang="ts">
import { useProductStore } from '../stores/productStore'
import ProductSearch from '../components/ProductSearch.vue'

const productStore = useProductStore()

await useAsyncData('home-products', () => productStore.fetchProducts())

const products = computed(() => productStore.products)
const loading = computed(() => productStore.loading)
const error = computed(() => productStore.error)

const searchTerm = ref('')

const filteredProducts = computed(() => 
  productStore.searchProducts(searchTerm.value)
)
</script>

<template>
  <main>
    <h1>Product Catalog</h1>
    <p>Browse our products below.</p>

    <ProductSearch v-model="searchTerm" />

    <p v-if="loading">Loading products...</p>

    <p v-else-if="error">
      {{ error }}
    </p>

    <section v-else class="product-list">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </section>
  </main>
</template>

<style scoped>
main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}
</style>