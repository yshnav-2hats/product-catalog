import type { Product } from '../types/product'

const API_URL = 'https://dummyjson.com/products'

interface ProductApiResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export async function getProducts(): Promise<Product[]> {
  const data = await $fetch<ProductApiResponse>(API_URL)

  return data.products
}