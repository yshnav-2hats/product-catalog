<script setup lang="ts">
import { useProductStore } from '../stores/productStore'

const productStore = useProductStore()

await useAsyncData('products-page', () => productStore.fetchProducts())

const products = computed(() => productStore.products)
const loading = computed(() => productStore.loading)
const error = computed(() => productStore.error)
</script>

<template>
  <main>
    <h1>Our Products</h1>

    <p v-if="loading">Loading products...</p>

    <p v-else-if="error">
      {{ error }}
    </p>

    <section v-else class="product-list">
      <ProductCard
        v-for="product in products"
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