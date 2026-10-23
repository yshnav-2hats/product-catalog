<script setup lang="ts">
import type { Product } from '../types/product'

defineProps<{
  product: Product
}>()
</script>

<template>
  <article class="product-card">
    <img
      :src="product.thumbnail"
      :alt="product.title"
      width="200"
      height="150"
    />

    <h2>{{ product.title }}</h2>
    <p>{{ product.description }}</p>
    <p><strong>Price:</strong> ${{ product.price }}</p>
    <p><strong>Category:</strong> {{ product.category }}</p>
    <p><strong>Stock:</strong> {{ product.stock }}</p>
  </article>
</template>

<style scoped>
.product-card {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.product-card img {
  width: 100%;
  height: 180px;
  object-fit: contain;
}

.product-card h2 {
  font-size: 18px;
}
</style>