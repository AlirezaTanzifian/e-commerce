<template>
  <div>
    <Header />
    <div class="mt-12 p-4 flex justify-center">
      <div v-if="!product">Loading ...</div>
      <div class="border p-4 rounded-md flex flex-col md:flex-row md:items-center gap-4 w-[90%]" v-else>
        <img class="w-80" :src="product.image" alt="">
        <div class="md:border md:p-4 md:rounded-md flex flex-col gap-2 w-full h-fit">
          <h3 class="font-bold text-blue-500">{{ product.title }}</h3>
          <div>{{ product.description }}</div>
          <div class="flex gap-2">
            <span class="text-yellow-500 font-medium">category:</span>
            <span>{{ product.category }}</span>
          </div>
          <div class="flex items-center justify-between mt-7">
            <div class="bg-green-400 p-2 text-white flex gap-2 rounded-md">
              <span>Price:</span>
              <span>{{ product.price }} $</span>
            </div>
            <AButton class="bg-blue-500" size="large" type="primary" @click="$router.back()">Back to Shop</AButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type {Product} from "~/model/product";

const product: Product = ref([])

const id = computed(() => {
  return useRouter().currentRoute.value.params.id
})

onMounted(async () => {
  const { data } = await useFetch(`https://fakestoreapi.com/products/${id.value}`)
  product.value = await data.value
})

</script>

<style scoped>

</style>