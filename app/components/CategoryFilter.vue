<script setup lang="ts">
defineProps<{
  categories: string[]
}>()

const selectedCategory = defineModel<string>({ default: '' })
</script>

<template>
  <div class="category-filter">
    <label for="category">Category:</label>

    <select id="category" v-model="selectedCategory">
      <option value="">All Categories</option>

      <option
        v-for="category in categories"
        :key="category"
        :value="category"
      >
        {{ category }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.category-filter {
  margin: 20px 0;
}

select {
  margin-left: 10px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}
</style>
