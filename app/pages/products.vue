<script setup lang="ts">
import { getProducts } from '../services/productService'

const { data: products, pending, error } = await useAsyncData(
  'products',
  getProducts
)
</script>

<template>
  <main>
    <h1>Our Products</h1>

    <p v-if="pending">Loading products...</p>

    <p v-else-if="error">
      Sorry, we couldn't load the products. Please try again later.
    </p>

    <section v-else class="product-list">
      <article
        v-for="product in products"
        :key="product.id"
        class="product-card"
      >
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