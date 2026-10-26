<script setup lang="ts">
const searchTerm = defineModel<string>({default:''})
</script>

<template>
    <div class="search">

        <input
            id="product-search"
            v-model="searchTerm"
            type="search"
            placeholder="Search by product name..."
        />
    </div>
</template>

<style scoped>
.search {
    display: flex;
    justify-content: flex-end;
    margin: 20px 0;
}

input {
    width: 100%;
    max-width: 350px;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 25px;
    font-size: 14px;
    outline: none;
}

input:focus {
    border-color: #999;
}
</style>