<script setup lang="ts">
import type { Product } from '../../types/product'
import { useProductStore } from '../../stores/productStore'
import { useCartStore } from '../../stores/cartStore'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()

const productId = route.params.id

const { data: product, pending, error } = await useFetch<Product>(
  `https://dummyjson.com/products/${productId}`
)

const relatedProducts = computed(() =>
  productStore.products
    .filter(
      item =>
        item.category === product.value?.category &&
        item.id !== product.value?.id
    )
    .slice(0, 4)
)
</script>

<template>
  <main class="product-detail">
    <p v-if="pending">Loading product details...</p>

    <p v-else-if="error || !product">
      Product not found.
    </p>

    <div v-else>
      <div class="product-content">
        <img :src="product.thumbnail" :alt="product.title" />

        <div class="product-info">
          <h1>{{ product.title }}</h1>

          <p>{{ product.description }}</p>

          <p><strong>Price:</strong> ${{ product.price }}</p>

          <p><strong>Category:</strong> {{ product.category }}</p>

          <p>
            <strong>Stock:</strong>
            {{ product.stock > 0 ? 'In Stock' : 'Out of Stock' }}
          </p>

          <button
            :disabled="product.stock <= 0"
            @click="cartStore.addToCart(product)"
          >
            Add to Cart
          </button>

          <p>
            <NuxtLink to="/">Back to Products</NuxtLink>
          </p>
        </div>
      </div>

      <section v-if="relatedProducts.length" class="related-products">
        <h2>Related Products</h2>

        <div class="related-list">
          <article
            v-for="item in relatedProducts"
            :key="item.id"
            class="related-card"
          >
            <NuxtLink :to="`/products/${item.id}`" class="related-link">
              <img :src="item.thumbnail" :alt="item.title" loading="lazy" />

              <h3>{{ item.title }}</h3>
            </NuxtLink>

            <p>${{ item.price }}</p>

            <button @click="cartStore.addToCart(item)">
              Add to Cart
            </button>
          </article>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.product-detail {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
}

.product-content {
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

.product-content > img {
  width: 45%;
  max-height: 400px;
  object-fit: contain;
}

.product-info {
  flex: 1;
}

.product-info h1 {
  font-size: 28px;
}

button {
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  background: #222;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #444;
}

button:disabled {
  background: #999;
  cursor: not-allowed;
}

.related-products {
  margin-top: 50px;
}

.related-products h2 {
  margin-bottom: 20px;
}

.related-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.related-card {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.related-card img {
  width: 100%;
  height: 150px;
  object-fit: contain;
}

.related-card h3 {
  font-size: 16px;
}

.related-link {
  color: inherit;
  text-decoration: none;
}

.related-link:hover h3 {
  text-decoration: underline;
}

.related-card p {
  font-weight: bold;
}

@media (max-width: 700px) {
  .product-content {
    flex-direction: column;
  }

  .product-content > img {
    width: 100%;
  }

  .related-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 400px) {
  .related-list {
    grid-template-columns: 1fr;
  }
}
</style>