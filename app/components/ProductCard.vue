<script setup lang="ts">
import type { Product } from '../types/product'
import { useCartStore } from '../stores/cartStore'

defineProps<{
  product: Product
}>()

const cartStore = useCartStore()
</script>

<template>
  <article class="product-card">
    <NuxtLink :to="`/products/${product.id}`">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        width="200"
        height="150"
        loading="lazy"
      />
    </NuxtLink>

    <h2>
      <NuxtLink
        :to="`/products/${product.id}`"
        class="product-link"
      >
        {{ product.title }}
      </NuxtLink>
    </h2>
    <p>{{ product.description }}</p>
    <p><strong>Price:</strong> ${{ product.price }}</p>
    <button @click="cartStore.addToCart(product)">
      Add to Cart
    </button>
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

button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  background: #222;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #444;
}

.product-link {
  color: inherit;
  text-decoration: none;
}

.product-link:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>