<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()
</script>

<template>
    <main>
        <h1>Shopping Cart</h1>

        <p v-if="cartStore.items.length === 0">
            Your cart is empty.
        </p>

        <section v-else>
            <article
                v-for="product in cartStore.items"
                :key="product.id"
                class="cart-item"
            >
                <img :src="product.thumbnail" :alt="product.title" />

                <div>
                    <h2>{{ product.title }}</h2>
                    <p>${{ product.price.toFixed(2) }}</p>

                    <button @click="cartStore.removeFromCart(product.id)">
                        Remove
                    </button>
                </div>
            </article>

            <h2>Total: ${{ cartStore.cartTotal.toFixed(2) }}</h2>

            <NuxtLink to="/products">Continue Shopping</NuxtLink>
        </section>
    </main>
</template>

<style scoped>
main {
    max-width: 1000px;
    margin: 0 auto;
    padding: 24px;
}

.cart-item {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 16px 0;
    border-bottom: 1px solid #ddd;
}


.cart-item img {
    width: 100px;
    height: 100px;
    object-fit: contain;
}

button {
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    background: #222;
    color: white;
    cursor: pointer;
}

button:hover {
    background: #444;
}

@media (max-width: 600px) {
    .cart-item {
        align-items: flex-start;
        gap: 12px;
    }

    .cart-item img {
        width: 75px;
        height: 75px;
    }
}
</style>