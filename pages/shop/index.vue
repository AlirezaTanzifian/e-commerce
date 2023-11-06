<template>
  <div>
    <Header />
    <div class="max-w-[1440px] md:mx-auto">
      <div class="mt-12 p-4 md:p-8 flex">
        <div class="grid grid-cols-2 md:w-3/4 md:flex md:flex-wrap gap-4">
          <div class="w-full text-center text-lg font-bold mt-32" v-if="products.length == 0">Loading ...</div>
          <ProductCard v-for="(item, index) in filterProducts.length !== 0 ? filterProducts : products" :data="item" :key="index" v-else />
        </div>
        <div class="hidden md:block md:w-1/4 p-4 h-fit border rounded-md">
          <div>Product Filter</div>
          <ADivider class="!my-4" />
          <div class="flex gap-4">
            <AInput />
            <AButton class="bg-blue-500" type="primary">search</AButton>
          </div>
          <ADivider class="!my-4" />
          <div class="flex flex-col">
            <div>Category</div>
            <ACheckboxGroup v-model:value="selectedCategory" style="width: 100%">
              <div class="flex flex-col mt-4">
                <ACheckbox v-for="item in categoryItem" :value="item">{{ item }}</ACheckbox>
              </div>
            </ACheckboxGroup>
          </div>
          <ADivider class="!my-4" />
          <div class="flex flex-col">
            <div>Price</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const products = ref([])
const filterProducts = ref([])

const categoryItem = [ 'men\'s clothing', 'jewelery', 'electronics', 'women\'s clothing' ]

const selectedCategory = ref([])
const selectedPrice= ref([])


watch([selectedCategory, selectedPrice], async () => {
  await applyFilter()
})

const applyFilter = () => {
  filterProducts.value = []
  products.value.forEach((item) => {
    if (selectedCategory.value.indexOf(item.category) !== -1) {
      filterProducts.value.push(item)
    }
  })
}

onMounted(async() => {
  const { data } = await useFetch('https://fakestoreapi.com/products')
  products.value = data.value
})

</script>

<style scoped>

</style>