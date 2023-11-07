<template>
  <div>
    <Header class="z-20" />
    <div class="max-w-[1440px] md:mx-auto">
      <AAffix class="bg-white" offset-top="4">
        <div class="md:hidden shadow-md mb-4 pt-4 pb-2 px-5 bg-white">
          <span class="flex items-center gap-2 w-fit cursor-pointer" @click="showModal = true">
            <span class="font-bold text-sm">Filter</span>
            <img class="w-6" src="~/assets/img/filter.svg" alt="filter-icon">
          </span>
        </div>
      </AAffix>
      <div class="mt-10 p-4 md:p-8 flex flex-col md:flex-row">
        <div class="w-full text-center text-lg font-bold mt-32" v-if="products.length == 0">Loading ...</div>
        <div class="grid grid-cols-2 md:w-3/4 md:flex md:flex-wrap gap-4" v-else>
          <ProductCard v-for="(item, index) in filterProducts.length !== 0 ? filterProducts : products" :product="item" :key="index" />
        </div>
        <div class="hidden md:block md:w-1/4 p-4 h-fit border rounded-md">
          <div>Product Filter</div>
          <ADivider class="!my-4" />
          <div class="flex gap-4">
            <AInput v-model:value="input" type="text" placeholder="Enter product name" />
            <AButton class="bg-blue-500" type="primary" @click="nameFilter">search</AButton>
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
            <ARadioGroup v-model:value="radio">
              <div class="flex flex-col mt-4">
                <ARadio :value="1">Ascending</ARadio>
                <ARadio :value="2">Descending</ARadio>
                <ARadio :value="3">None</ARadio>
              </div>
            </ARadioGroup>
          </div>
        </div>
      </div>
    </div>
    <AModal v-model:visible="showModal" title="Product Filters">
      <div class="pt-2">
        <div class="flex gap-4">
          <AInput v-model:value="input" type="text" placeholder="Enter product name" />
          <AButton class="bg-blue-500" type="primary" @click="nameFilter">search</AButton>
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
          <ARadioGroup v-model:value="radio">
            <div class="flex flex-col mt-4">
              <ARadio :value="1">Ascending</ARadio>
              <ARadio :value="2">Descending</ARadio>
              <ARadio :value="3">None</ARadio>
            </div>
          </ARadioGroup>
        </div>
      </div>
      <template #footer>
        <a-button key="back" @click="handleCancel">close</a-button>
      </template>
    </AModal>
  </div>
</template>

<script setup lang="ts">
import type {Product} from "~/model/product";

const products = ref([])
const filterProducts = ref([])
const input = ref<string>('')
const radio = ref<number>(3)
const showModal = ref<boolean>(false)

const handleCancel = () => {
  showModal.value = false;
};

const categoryItem = [ 'men\'s clothing', 'jewelery', 'electronics', 'women\'s clothing' ]

const selectedCategory = ref([])

watch(selectedCategory, async () => {
  await applyFilter()
})

const applyFilter = () => {
  filterProducts.value = []
  products.value.forEach((item: Product) => {
    if (selectedCategory.value.indexOf(item.category) !== -1) {
      filterProducts.value.push(item)
    }
  })
}

const nameFilter = () => {
  filterProducts.value = []
  products.value.forEach((item: Product) => {
    if (item.title.includes(input.value)) {
      filterProducts.value.push(item)
    }
  })
  if (filterProducts.value.length === 0) {
    message.error('No product with this specification was found')
  }
}

watch(radio, () => {
  filterProducts.value = []
  filterProducts.value = [...products.value]
  switch (radio.value) {
    case 1:
      filterProducts.value.sort((x: Product, y: Product) => x.price - y.price)
      break
    case 2:
      filterProducts.value.sort((x: Product, y: Product) => y.price - x.price)
      break
    case 3:
      filterProducts.value = products.value
      break
    default:
      filterProducts.value = products.value
      break
  }
})

onMounted(async() => {
  const { data } = await useFetch('https://fakestoreapi.com/products')
  products.value = data.value
})

</script>

<style scoped>

</style>