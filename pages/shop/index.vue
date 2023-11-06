<template>
  <div>
    <Header />
    <div class="max-w-[1440px] md:mx-auto">
      <div class="mt-12 p-4 md:p-8 flex">
        <div class="grid grid-cols-2 md:w-3/4 md:flex md:flex-wrap gap-4">
          <ProductCard v-for="(item, index) in products" :data="item" :key="index" />
        </div>
        <div class="hidden md:block md:w-1/4 p-4 h-fit border rounded-md">
          <div>Product Filter</div>
          <ADivider class="!my-4" />
          <div class="flex gap-4">
            <AInput />
            <AButton class="bg-blue-500" type="primary">search</AButton>
          </div>
          <ADivider class="!my-4" />
          <ACollapse>
            <ACollapsePanel key="1"></ACollapsePanel>
            <ACollapsePanel key="2"></ACollapsePanel>
          </ACollapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const products = ref([])

onMounted(async() => {
  const { data } = await useFetch('https://fakestoreapi.com/products')
  products.value = data.value
})

</script>

<style scoped>

</style>